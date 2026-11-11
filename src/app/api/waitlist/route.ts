import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";

const BodySchema = z.object({
  email: z.string().email().max(200),
  company: z.string().max(200).optional().nullable(),
  volume: z.string().max(50).optional().nullable(),
  channels: z.string().max(400).optional().nullable(),
  source: z.string().max(80).optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email, company, volume, channels, source } = parsed.data;

    try {
      const db = await getDb();
      const entry = await db.waitlistEntry.upsert({
        where: { email },
        update: {
          company: company ?? undefined,
          volume: volume ?? undefined,
          channels: channels ?? undefined,
          source: source ?? undefined,
        },
        create: { email, company, volume, channels, source },
      });
      return NextResponse.json({ ok: true, id: entry.id });
    } catch (dbErr) {
      // Serverless (Vercel /tmp SQLite, cold instances): persistence may be
      // unavailable. Never surface an error to the visitor — log and accept.
      console.error("waitlist persist failed (accepted, see logs):", {
        email,
        company,
        source,
        dbErr,
      });
      return NextResponse.json({ ok: true, persisted: false });
    }
  } catch (err) {
    console.error("waitlist failed:", err);
    return NextResponse.json(
      { error: "Could not save your spot. Please try again." },
      { status: 500 }
    );
  }
}
