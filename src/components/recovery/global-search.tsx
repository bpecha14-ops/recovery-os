"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/context";
import {
  CATEGORY_LABELS,
  Program,
  ProgramCategory,
  PROGRAMS,
} from "@/lib/programs-data";
import { Reveal } from "./effects";
import { ProgramCard } from "./program-card";
import { SearchX } from "lucide-react";

const CATEGORY_VALUES = Object.keys(CATEGORY_LABELS) as ProgramCategory[];
const COUNTRIES = [...new Set(PROGRAMS.map((p) => p.country))];

export function GlobalSearch({
  onOpenClaim,
}: {
  onOpenClaim: (p: Program) => void;
}) {
  const { t } = useI18n();
  const [country, setCountry] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROGRAMS.filter((p) => {
      if (country !== "all" && p.country !== country) return false;
      if (category !== "all" && p.category !== category) return false;
      if (q) {
        const hay = `${p.name} ${p.summary} ${p.agency} ${p.amount}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [country, category, query]);

  return (
    <section id="search" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("civic.search.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("civic.search.headingA")}{" "}
            <span className="text-gradient-gold">{t("civic.search.headingGold")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("civic.search.lead")}
          </p>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.1}>
          <div className="panel-black mt-10 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-56">
              <label className="sr-only" htmlFor="search-country">
                {t("civic.search.country")}
              </label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="search-country" className="w-full border-amber-400/20 bg-zinc-900/60 text-zinc-200">
                  <SelectValue placeholder={t("civic.search.country")} />
                </SelectTrigger>
                <SelectContent className="border-amber-400/20 bg-zinc-900 text-zinc-200">
                  <SelectItem value="all">{t("civic.search.allCountries")}</SelectItem>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-64">
              <label className="sr-only" htmlFor="search-category">
                {t("civic.search.category")}
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="search-category" className="w-full border-amber-400/20 bg-zinc-900/60 text-zinc-200">
                  <SelectValue placeholder={t("civic.search.category")} />
                </SelectTrigger>
                <SelectContent className="border-amber-400/20 bg-zinc-900 text-zinc-200">
                  <SelectItem value="all">{t("civic.search.allCategories")}</SelectItem>
                  {CATEGORY_VALUES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="sr-only" htmlFor="search-query">
                {t("civic.search.searchPlaceholder")}
              </label>
              <Input
                id="search-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("civic.search.searchPlaceholder")}
                className="w-full border-amber-400/20 bg-zinc-900/60 text-zinc-200 placeholder:text-zinc-500"
              />
            </div>
            {(country !== "all" || category !== "all" || query) && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-amber-400/25 bg-transparent text-amber-200 hover:bg-amber-400/[0.06] hover:text-amber-100"
                onClick={() => {
                  setCountry("all");
                  setCategory("all");
                  setQuery("");
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-zinc-500" aria-live="polite">
          {t("civic.search.resultsCount", { count: results.length })}
        </p>

        {/* Results */}
        {results.length === 0 ? (
          <div className="panel-black mt-4 flex flex-col items-center rounded-2xl p-12 text-center">
            <SearchX className="h-10 w-10 text-zinc-600" aria-hidden="true" />
            <p className="mt-4 max-w-md text-sm text-zinc-400">{t("civic.search.empty")}</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 0.05} className="h-full">
                <ProgramCard program={p} onOpenClaim={onOpenClaim} />
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-8 border-t border-zinc-800/80 pt-4 text-xs text-zinc-500">
          {t("civic.search.disclaimer")}
        </p>
      </div>
    </section>
  );
}
