"use client";

import { UploadCloud, FileCheck2, Banknote } from "lucide-react";
import { Reveal, GoldenStream } from "./effects";

const STEPS = [
  {
    icon: UploadCloud,
    step: "01",
    title: "Connect your data",
    text: "Drop a purchase export — QuickBooks CSV, Stripe/bank statement, or forty rows you paste in. Takes about four minutes. Nothing leaves your browser until you hit scan.",
  },
  {
    icon: FileCheck2,
    step: "02",
    title: "We match every line",
    text: "The engine compares each purchase against open class windows, tariff lines and drawback rules — then shows what matched, why, and a conservative estimate before you commit to anything.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Checks arrive — then we get paid",
    text: "Claims go through official administrators or licensed partners. Funds flow directly to your account. Our success fee is quoted in writing and charged only when money lands.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.5} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            Every business has an AP team.{" "}
            <span className="text-gradient-gold">None has a recoveries team.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Accounts payable watches what goes out. Nobody watches what comes
            back — refunds, settlements, drawback, fee corrections. RecoveryOS
            is that missing department, priced so it only exists when it pays
            for itself.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting stream — gold dashes flowing between the steps */}
          <div
            aria-hidden="true"
            className="flow-line absolute left-0 right-0 top-[52px] hidden h-[2px] opacity-70 md:block"
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.12}>
                <div className="group relative">
                  <div className="relative mb-6 flex items-end gap-4 md:mb-8">
                    <span className="tabular bg-zinc-950 text-7xl font-bold leading-none tracking-tighter text-amber-400/[0.09] transition-colors duration-500 group-hover:text-amber-400/30">
                      {s.step}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 top-6 h-16 w-16 rounded-full bg-amber-400/10 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07] transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/40">
                      <s.icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
