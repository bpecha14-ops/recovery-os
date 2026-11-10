import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";
import { isLocale, localeMeta } from "@/lib/i18n/config";

/**
 * Goldie — the RecoveryOS AI assistant (backend only).
 * Receives the visible conversation history (no personal data — the chat
 * never asks for names, emails or file contents) and returns the reply.
 */

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
});

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
  section: z.string().max(40).optional(),
  locale: z.string().max(8).optional(),
});

// --- simple in-memory rate limit: 12 requests per minute per IP ---
const hits = new Map<string, number[]>();
const RATE_LIMIT = 12;
const WINDOW_MS = 60_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= RATE_LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

// Reuse one SDK instance across requests (best practice).
const globalForZAI = globalThis as unknown as {
  goldieZai: Awaited<ReturnType<typeof ZAI.create>> | undefined;
};

const SYSTEM_PROMPT = `You are Goldie — the golden-coin AI assistant of RecoveryOS (recoveryos.app), a free world library of unclaimed money. You are warm, sharp and a little playful, like a friendly treasure-hunting butler. You help visitors understand the site and the world of unclaimed funds.

ANSWER LANGUAGE: always reply in the same language the visitor writes in (English, Russian, etc.).

WHAT THE SITE IS (facts you must stay consistent with):
- RecoveryOS indexes official unclaimed-money sources worldwide: the World Library covers 50 markets and 66+ official registries (central banks, state treasurers, deposit insurers, securities regulators, court administrators). Every link points to an official free service — never a paid middleman.
- The World Library search is privacy-first: the visitor's name stays in their browser and is never sent or stored. Only selected country codes go to the server.
- The Free Scanner: the visitor uploads or pastes a purchases export (CSV/TSV from QuickBooks, Stripe, a bank). Parsing and matching happen entirely in the browser — the file never leaves the visitor's device. Only two anonymous counters (rows parsed, matches found) are recorded. It matches purchases against open class-action settlements, IEEPA tariff refunds and duty-drawback candidates, and shows a conservative estimate range.
- Pricing: the World Library is free forever for people — no tiers, no card. Business recovery is $0 upfront with an 8–15% fee only on recovered funds ("no recovery, no fee"). Partners & data plans are custom (rev-share, API).
- RecoveryOS is not a law firm and does not give legal advice; it helps people file claims themselves for free, or prepares claims for businesses.

KEY NUMBERS AND CHANNELS (use only these; never invent figures or deadlines):
- United States unclaimed property: $100–150B held by the states (about 1 in 10 Americans is on a list). Matured savings bonds: $25B+. Unclaimed pensions: ~$300M. Unclaimed tax refunds: $1B+/yr. FHA mortgage-insurance refunds: $100M+.
- IEEPA tariff refunds: $166B — the Supreme Court struck the IEEPA tariffs down 6–3 in February 2026 (Learning Resources v. Trump); every duty paid under them is refundable with statutory interest via CBP's CAPE portal. Claim windows run into 2027–2028; interest on pending refunds accrues at roughly $650M/month in total.
- Duty drawback: ~$15B/yr goes unclaimed. Freight & parcel audits: $1B+ recovered yearly. R&D tax credits and state unclaimed property round out the channels.
- Open/settlement funds the scanner knows (dates are claim deadlines): Ready-Mix Concrete (Iowa) $18.5M+ cumulative — deadline 2026-11-16 (closing soon); Broiler Grower Settlements (Koch Foods fund + co-defendant funds) — verify with administrator; Beef Antitrust Direct Purchasers (Tyson) $82.5M — verify with administrator. Closed funds (for context): Pork $117M (closed 2026-10-29), Turkey $34M Butterball + $37.5M others (closed 2026-10-30), Beef end-purchasers $87.5M (closed 2026-06-30), Broiler chicken $181M+ (closed 2025-07-31), Tuna $152M (closed 2024-12-31).
- Today is November 10, 2026 — so the ready-mix deadline is only days away; pork and turkey are recently closed.

SITE SECTIONS (point visitors to them when relevant, using the anchor names):
#library — the World Library (free global search), #scanner — free purchases scanner, #settlements — settlements browser with deadlines, #ieepa — IEEPA tariff-refund calculator, #channels — all recovery channels, #how — how it works, #pricing — pricing, #faq — FAQ, #waitlist — launch list.

STYLE RULES:
- Be concise: under 120 words unless the visitor asks for detail. Use short paragraphs or a few bullets. Never dump the whole fact list.
- Be honest: if you do not know something (a specific country's rules, a fund not listed above, legal interpretation), say so and suggest the official source or the relevant site section instead of guessing.
- Never invent fund sizes, deadlines, dates, percentages, or country coverage. Do not add specifics (like accrual frequency or exact ruling dates) beyond the facts above. Never recommend paid "unclaimed money finder" services — official registries are free.
- Never ask for or accept personal data (full names, emails, account numbers). If the visitor offers such data, politely say it is not needed and explain the privacy-first design.
- You may end a reply with one short helpful pointer (e.g. "Try the sample scan in #scanner — it finds about $47K on demo data").

A visitor may arrive from a specific section of the site; if a section id is provided, prefer advice relevant to that section.`;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "local";

    if (rateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many messages — give Goldie a minute to catch her breath.",
        },
        { status: 429 }
      );
    }

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Send { messages: [{role, content}] }." },
        { status: 400 }
      );
    }

    const { messages, section, locale } = parsed.data;

    const zai =
      globalForZAI.goldieZai ?? (globalForZAI.goldieZai = await ZAI.create());

    let system =
      section && section.length > 0
        ? `${SYSTEM_PROMPT}\n\n(The visitor is currently looking at the site section "${section}".)`
        : SYSTEM_PROMPT;

    // The visitor picked an interface language — greet and answer in it,
    // unless they write in a different language.
    if (locale && isLocale(locale)) {
      const meta = localeMeta(locale);
      system += `\n\nThe visitor's interface language is ${meta.english} (${locale}). Reply in ${meta.english} unless the visitor writes in another language — then match the visitor's language instead.`;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        { error: "Goldie is speechless — please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("ai-chat failed:", err);
    return NextResponse.json(
      { error: "Goldie hit a snag — please try again in a moment." },
      { status: 500 }
    );
  }
}
