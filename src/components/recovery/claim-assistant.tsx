"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/context";
import { PROGRAMS, Program } from "@/lib/programs-data";
import { Reveal } from "./effects";
import { VerificationBadge } from "./program-card";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  ListChecks,
  Printer,
} from "lucide-react";

const COUNTRIES = [...new Set(PROGRAMS.map((p) => p.country))].sort();

const PROGRESS_KEY = "civicclaim.claim-progress";

function loadProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}") as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function ClaimAssistant({
  preselected,
  onConsumed,
}: {
  preselected: Program | null;
  onConsumed?: () => void;
}) {
  const { t } = useI18n();
  const [country, setCountry] = useState<string>("all");
  const [programId, setProgramId] = useState<string>("");
  // Lazy-init from localStorage: the checklist only renders after a client-side
  // selection, so there is no SSR markup to mismatch.
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    loadProgress(),
  );

  // Accept external preselection (from search / wizard) via render-phase
  // adjustment — no setState-in-effect cascades.
  const [applied, setApplied] = useState<Program | null>(null);
  if (preselected && preselected.id !== applied?.id) {
    setApplied(preselected);
    setCountry(preselected.country);
    setProgramId(preselected.id);
    if (onConsumed) setTimeout(() => onConsumed(), 0);
  }

  // Scroll to the checklist when a program arrives from another module.
  useEffect(() => {
    if (!preselected) return;
    document
      .getElementById("claim")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [preselected]);

  const programs = useMemo(
    () => PROGRAMS.filter((p) => country === "all" || p.country === country),
    [country],
  );

  const program = useMemo(() => PROGRAMS.find((p) => p.id === programId) ?? null, [programId]);

  const stepsDone = program
    ? program.steps.filter((_, i) => done[`${program.id}:${i}`]).length
    : 0;

  const toggle = (key: string, v: boolean) => {
    setDone((d) => {
      const next = { ...d, [key]: v };
      try {
        window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  };

  return (
    <section id="claim" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("civic.claim.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("civic.claim.headingA")}{" "}
            <span className="text-gradient-gold">{t("civic.claim.headingGold")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("civic.claim.lead")}
          </p>
        </Reveal>

        {/* Picker */}
        <Reveal delay={0.08}>
          <div className="panel-black mt-10 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-60">
              <label className="sr-only" htmlFor="claim-country">
                {t("civic.search.country")}
              </label>
              <Select
                value={country}
                onValueChange={(v) => {
                  setCountry(v);
                  setProgramId("");
                }}
              >
                <SelectTrigger id="claim-country" className="w-full border-amber-400/20 bg-zinc-900/60 text-zinc-200">
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
            <div className="w-full flex-1">
              <label className="sr-only" htmlFor="claim-program">
                {t("civic.claim.pick")}
              </label>
              <Select value={programId} onValueChange={setProgramId}>
                <SelectTrigger id="claim-program" className="w-full border-amber-400/20 bg-zinc-900/60 text-zinc-200">
                  <SelectValue placeholder={t("civic.claim.pick")} />
                </SelectTrigger>
                <SelectContent className="max-h-72 border-amber-400/20 bg-zinc-900 text-zinc-200">
                  {programs.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} · {p.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="hidden text-xs text-zinc-500 xl:block w-64">{t("civic.claim.pickHint")}</p>
          </div>
        </Reveal>

        {/* Checklist */}
        {program && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Steps */}
            <Card className="panel-black rounded-2xl lg:col-span-2">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <VerificationBadge program={program} />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{program.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{program.agency}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                    onClick={() => window.print()}
                  >
                    <Printer className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    {t("civic.claim.print")}
                  </Button>
                </div>

                <div className="mt-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ListChecks className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    {t("civic.claim.stepsTitle")}
                    <span className="ml-auto text-xs font-normal text-zinc-500">
                      {t("civic.claim.progress", { done: stepsDone, total: program.steps.length })}
                    </span>
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all"
                      style={{
                        width: `${Math.round((stepsDone / program.steps.length) * 100)}%`,
                      }}
                    />
                  </div>
                  <ol className="mt-5 space-y-3">
                    {program.steps.map((s, i) => {
                      const key = `${program.id}:${i}`;
                      const checked = !!done[key];
                      return (
                        <li key={key}>
                          <Label
                            htmlFor={`step-${key}`}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed transition-all ${
                              checked
                                ? "border-emerald-400/30 bg-emerald-400/[0.05] text-zinc-400 line-through"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-200 hover:border-amber-400/30"
                            }`}
                          >
                            <Checkbox
                              id={`step-${key}`}
                              checked={checked}
                              onCheckedChange={(v) => toggle(key, v === true)}
                              className="mt-0.5"
                              aria-label={`Step ${i + 1}`}
                            />
                            <span>
                              <span className="mr-1.5 font-semibold text-amber-400/90">
                                {i + 1}.
                              </span>
                              {s}
                            </span>
                          </Label>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="mt-8">
                  <a href={program.applyUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="btn-shimmer w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] hover:brightness-110 sm:w-auto">
                      {t("civic.claim.applyCta")}
                      <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </a>
                  <p className="mt-3 text-xs text-zinc-500">
                    {t("civic.claim.sourceNote")}:{" "}
                    <a
                      href={program.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300/80 underline decoration-amber-400/30 underline-offset-2 hover:text-amber-200"
                    >
                      {program.agency}
                    </a>{" "}
                    ·{" "}
                    {program.verification.status === "verified"
                      ? t("civic.claim.sourceVerified", { date: program.verification.lastChecked })
                      : t("civic.claim.sourceAuto")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents + deadlines */}
            <div className="space-y-6">
              <Card className="panel-black rounded-2xl">
                <CardContent className="p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <FileText className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    {t("civic.claim.docsTitle")}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {program.documents.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="panel-black rounded-2xl">
                <CardContent className="p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CalendarClock className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    {t("civic.claim.deadlineTitle")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{program.deadlines}</p>
                  <p className="mt-3 flex items-start gap-1.5 text-xs text-zinc-500">
                    <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {t("civic.claim.printHint")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
