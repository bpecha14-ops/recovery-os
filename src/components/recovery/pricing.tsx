"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Spotlight, GoldenStream } from "./effects";

// Non-text plan data — aligned by index with pricing.plans in the dictionary.
const PLAN_META = [
  { highlight: true, ctaHref: "#library" },
  { highlight: false, ctaHref: "#scanner" },
  { highlight: false, ctaHref: "#waitlist" },
];

export function Pricing() {
  const { t, tArr } = useI18n();
  const plans = tArr<{
    name: string;
    price: string;
    cadence: string;
    cta: string;
    features: string[];
  }>("pricing.plans");

  return (
    <section id="pricing" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.45} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 28% at 50% 0%, rgba(251,191,36,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("pricing.eyebrow")}
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("pricing.headingA")}{" "}
            <span className="text-gradient-gold">{t("pricing.headingGold")}</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            {t("pricing.lead")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => {
            const meta = PLAN_META[i];
            if (!meta) return null;
            return (
              <Reveal key={p.name} delay={i * 0.1} className="h-full">
                <Spotlight
                  className={`relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    meta.highlight
                      ? "animate-glow panel-black panel-beam"
                      : "panel-black hover:border-amber-400/30"
                  }`}
                >
                  <CardContent className="flex h-full flex-col p-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                      {meta.highlight && (
                        <Badge className="shrink-0 bg-gradient-to-b from-amber-300 to-amber-500 font-semibold text-zinc-950 hover:from-amber-300 hover:to-amber-500">
                          {t("pricing.alwaysFreeBadge")}
                        </Badge>
                      )}
                    </div>
                    <p className="tabular mt-4 text-4xl font-bold tracking-tight text-white">
                      {p.price}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{p.cadence}</p>
                    <ul className="mt-7 flex-1 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href={meta.ctaHref} className="mt-8">
                      <Button
                        className={`w-full ${
                          meta.highlight
                            ? "btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                            : "border-amber-400/25 bg-transparent text-amber-200 hover:bg-amber-400/[0.06] hover:text-amber-100"
                        }`}
                        variant={meta.highlight ? "default" : "outline"}
                      >
                        {p.cta}
                      </Button>
                    </a>
                  </CardContent>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
