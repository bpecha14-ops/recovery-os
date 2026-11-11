"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Spotlight, GoldenStream } from "./effects";
import { Check, HandHeart, LineChart } from "lucide-react";

// Non-text plan data — aligned by index with civic.sponsor.layers in the dictionary.
const LAYER_META = [{ highlight: true, ctaHref: "#search" }, { highlight: false, ctaHref: "#waitlist" }, { highlight: false, ctaHref: "#waitlist" }];

export function Sponsorship() {
  const { t, tArr } = useI18n();
  const layers = tArr<{
    name: string;
    price: string;
    cadence: string;
    cta: string;
    features: string[];
  }>("civic.sponsor.layers");
  const metrics = tArr<string>("civic.sponsor.metrics");

  return (
    <section id="sponsor" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
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
            {t("civic.sponsor.eyebrow")}
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("civic.sponsor.headingA")}{" "}
            <span className="text-gradient-gold">{t("civic.sponsor.headingGold")}</span>
            {t("civic.sponsor.headingB")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            {t("civic.sponsor.lead")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {layers.map((l, i) => {
            const meta = LAYER_META[i];
            if (!meta) return null;
            return (
              <Reveal key={l.name} delay={i * 0.1} className="h-full">
                <Spotlight
                  className={`relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    meta.highlight
                      ? "animate-glow panel-black panel-beam"
                      : "panel-black hover:border-amber-400/30"
                  }`}
                >
                  <CardContent className="flex h-full flex-col p-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{l.name}</h3>
                      {meta.highlight && (
                        <Badge className="shrink-0 bg-gradient-to-b from-amber-300 to-amber-500 font-semibold text-zinc-950 hover:from-amber-300 hover:to-amber-500">
                          {t("civic.sponsor.alwaysFreeBadge")}
                        </Badge>
                      )}
                    </div>
                    <p className="tabular mt-4 text-4xl font-bold tracking-tight text-white">
                      {l.price}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{l.cadence}</p>
                    <ul className="mt-7 flex-1 space-y-3">
                      {l.features.map((f) => (
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
                        {l.cta}
                      </Button>
                    </a>
                  </CardContent>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        {/* Donor metrics */}
        <Reveal delay={0.15}>
          <div className="panel-black mt-12 rounded-2xl p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <LineChart className="h-4 w-4 text-amber-400" aria-hidden="true" />
              {t("civic.sponsor.metricsTitle")}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-zinc-400">
                  <HandHeart className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/70" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
