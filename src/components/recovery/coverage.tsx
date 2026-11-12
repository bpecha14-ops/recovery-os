"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Spotlight } from "./effects";
import {
  DATA_SOURCES,
  GLOBAL_STATS,
  PROGRAM_COUNTS,
  REGIONS,
} from "@/lib/data-sources";
import { Database, Globe2, Landmark, ShieldCheck } from "lucide-react";

const REGION_ICONS = [Landmark, Landmark, Globe2, Landmark];

export function Coverage() {
  const { t } = useI18n();
  const counts = PROGRAM_COUNTS;
  const liveSources = DATA_SOURCES.filter((s) => s.status === "live").length;

  return (
    <section id="coverage" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("civic.coverage.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("civic.coverage.headingA")}{" "}
            <span className="text-gradient-gold">{t("civic.coverage.headingGold")}</span>
            {t("civic.coverage.headingB")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("civic.coverage.lead")}
          </p>
        </Reveal>

        {/* Global stats strip */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GLOBAL_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="panel-black h-full rounded-2xl p-5">
                <p className="tabular text-3xl font-bold tracking-tight text-gradient-gold">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Market cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {REGIONS.map((r, i) => {
            const Icon = REGION_ICONS[i] ?? Landmark;
            return (
              <Reveal key={r.code} delay={i * 0.08} className="h-full">
                <Spotlight className="panel-black h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07]">
                      <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                    </span>
                    <Badge
                      variant="outline"
                      className="border-amber-400/25 bg-amber-400/[0.08] px-2 py-0.5 text-[11px] font-medium text-amber-300/90"
                    >
                      {counts.byRegion[r.code] ?? 0} programs
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{r.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.note}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                    <Database className="h-3.5 w-3.5 text-amber-400/70" aria-hidden="true" />
                    {DATA_SOURCES.filter((s) => s.region === r.code).length}{" "}
                    {t("civic.coverage.sourcesTitle").toLowerCase()}
                  </p>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <p className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-amber-400/80" aria-hidden="true" />
            {t("civic.coverage.freeNote")}
            <Badge
              variant="outline"
              className="border-emerald-400/25 bg-emerald-400/[0.06] px-2 py-0.5 text-[11px] text-emerald-300/90"
            >
              {counts.total} programs · {liveSources} live sources
            </Badge>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
