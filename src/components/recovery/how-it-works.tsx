"use client";

import { UploadCloud, FileCheck2, Banknote } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, GoldenStream } from "./effects";

const STEP_ICONS = [UploadCloud, FileCheck2, Banknote];
const STEP_NUMBERS = ["01", "02", "03"];

export function HowItWorks() {
  const { t, tArr } = useI18n();
  const steps = tArr<{ title: string; text: string }>("how.steps");

  return (
    <section id="how" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.5} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("how.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("how.headingA")}{" "}
            <span className="text-gradient-gold">{t("how.headingGold")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("how.lead")}
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting stream — gold dashes flowing between the steps */}
          <div
            aria-hidden="true"
            className="flow-line absolute left-0 right-0 top-[52px] hidden h-[2px] opacity-70 md:block"
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? UploadCloud;
              return (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="group relative">
                    <div className="relative mb-6 flex items-end gap-4 md:mb-8">
                      <span className="tabular bg-zinc-950 text-7xl font-bold leading-none tracking-tighter text-amber-400/[0.09] transition-colors duration-500 group-hover:text-amber-400/30">
                        {STEP_NUMBERS[i] ?? String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute -left-2 top-6 h-16 w-16 rounded-full bg-amber-400/10 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07] transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/40">
                        <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
