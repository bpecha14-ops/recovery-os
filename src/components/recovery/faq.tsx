"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./effects";

const FAQS = [
  {
    q: "I'm an individual, not a business — is this for me?",
    a: "Yes — through the Living Library, free forever. Individuals can dig out unclaimed property, matured savings bonds, unclaimed pensions, tax refunds and consumer class action funds themselves in minutes: every entry shows who's eligible, what evidence is needed and links to the official free tool. The paid engine (scanning, claim preparation, filing) exists for businesses, where claim sizes justify the work — for personal claims, DIY through the library is almost always the fastest route.",
  },
  {
    q: "Is this legal advice? Are you a law firm?",
    a: "No. RecoveryOS is not a law firm and does not provide legal advice. We do data work: parsing, matching, evidence packaging, validation and tracking. Claims are filed with the official court-appointed administrators, and where a jurisdiction requires licensed counsel, we partner with them. You can always file any claim yourself for free — we link every administrator site so you can.",
  },
  {
    q: "How accurate are the estimates?",
    a: "They are deliberately conservative ranges based on published fund sizes and typical payout ratios for comparable antitrust and tariff recoveries. Your final payout depends on your documented purchase volume, claim quality and how many claims the fund receives. We quote a written success fee per claim before you commit to anything.",
  },
  {
    q: "What data do you need, and what happens to it?",
    a: "A purchase export — Date, Description, Amount — from QuickBooks, Stripe, Xero or your bank. The free scan stores only aggregate stats (rows scanned, matches found). Your row-level data is never sold or shared, and it is deleted on request. For filing, you share evidence only with the official administrator.",
  },
  {
    q: "When and how do I pay?",
    a: "Nothing upfront. When a recovery lands in your account, our success fee (8–15%, typically 12%) is invoiced. Monitoring is a flat $99/mo subscription you can cancel anytime — launch partners get 12 months free. Funds from settlements and CBP always flow directly to your business account, never through us.",
  },
  {
    q: "Why not just hire a law firm?",
    a: "Great question — sometimes you should. Trade counsel runs $300–800/hour and still needs your data organized. We do the data layer at zero financial risk, and our claim packs make any lawyer cheaper to use. For simple fund claims, the administrator route with a prepared pack usually needs no lawyer at all.",
  },
  {
    q: "Which channels are live today, and what's next?",
    a: "Live now: class action settlement claims, IEEPA tariff refund preparation, and duty drawback screening. Q1 2027 adds freight & parcel audit recovery and R&D tax credit pre-screening. Q2 2027 adds B2B unclaimed property sweeps. Every channel runs on the same connected purchase data — no extra work for you.",
  },
  {
    q: "We're based outside the US. Does this apply to us?",
    a: "If you exported to or imported from the US, you can be affected: IEEPA refunds cover any importer of record, and antitrust funds cover purchases made in US commerce. We're building EU/UK refund channels next. Tell us where you operate and we'll flag what applies.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            FAQ
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            Fair questions, straight answers.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="panel-black panel-beam mt-12 rounded-2xl p-4 sm:p-6">
            <Accordion type="single" collapsible>
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={Math.min(i * 0.05, 0.3)}>
                  <AccordionItem value={f.q} className="border-amber-400/[0.10] transition-colors data-[state=open]:border-amber-400/25">
                    <AccordionTrigger className="text-left text-base font-medium text-zinc-100 hover:text-amber-300 hover:no-underline data-[state=open]:text-amber-200 [&>svg]:text-amber-400/80">
                      <span className="flex items-center gap-3">
                        <span className="tabular text-xs font-semibold text-amber-400/50" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-zinc-400">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
