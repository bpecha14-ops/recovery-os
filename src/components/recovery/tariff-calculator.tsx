"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ClaimDialog } from "./claim-dialog";
import { AnimatedMoney, GoldenStream } from "./effects";
import { IEEPA_INFO, fmtUSD } from "@/lib/recovery-data";
import { useI18n } from "@/lib/i18n/context";
import { Landmark, Percent, CalendarClock, FileCheck2, Timer } from "lucide-react";

export function TariffCalculator() {
  const { t, tArr } = useI18n();
  const [principal, setPrincipal] = useState<string>("50000");
  const [lastPayDate, setLastPayDate] = useState<string>("2026-04-15");
  const [ratePct, setRatePct] = useState<string>(String(IEEPA_INFO.defaultInterestRate));
  const [includeInterest, setIncludeInterest] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const calc = useMemo(() => {
    const p = Math.max(0, Number(principal) || 0);
    const rate = Math.max(0, Number(ratePct) || 0) / 100;
    const last = new Date(`${lastPayDate}T00:00:00Z`);
    const now = new Date();
    let interest = 0;
    if (includeInterest && !Number.isNaN(last.getTime())) {
      const years = (now.getTime() - last.getTime()) / (365 * 86_400_000);
      interest = p * rate * Math.max(0, years);
    }
    return { principal: p, interest, total: p + interest, rate };
  }, [principal, ratePct, lastPayDate, includeInterest]);

  // Live interest drip — statutory interest never sleeps: ≈$650M/month
  // accrues across all pending IEEPA refunds. Watch it pile up live.
  const [drip, setDrip] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const perMs = 650_000_000 / (30.44 * 24 * 3_600_000);
    const id = setInterval(() => {
      setDrip((Date.now() - start) * perMs);
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="ieepa" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-16 text-white sm:py-24">
      <GoldenStream density={0.5} />
      <div
        aria-hidden="true"
        className="aurora-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 34% at 78% 22%, rgba(251,191,36,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            {t("ieepa.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("ieepa.heading")}
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            {t("ieepa.lead", {
              case: IEEPA_INFO.case,
              totalRefunds: IEEPA_INFO.totalRefunds,
              importers: IEEPA_INFO.importers,
              entries: IEEPA_INFO.entries,
              deadlines: IEEPA_INFO.deadlines,
            })}
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="text-zinc-300">
                {t("ieepa.capeLivePre", { date: IEEPA_INFO.capeLive })}{" "}
                <strong className="text-white">{IEEPA_INFO.filingsFirst6Days}</strong>{" "}
                {t("ieepa.capeLivePost")}
              </span>
            </li>
            <li className="flex gap-3">
              <Percent className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="text-zinc-300">
                {t("ieepa.interestPre", { rate: IEEPA_INFO.defaultInterestRate })}{" "}
                <strong className="text-white">{IEEPA_INFO.interestPerMonth}</strong>{" "}
                {t("ieepa.interestPost")}
              </span>
            </li>
            <li className="flex gap-3">
              <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="text-zinc-300">
                {t("ieepa.failedValidationPre")}{" "}
                <strong className="text-white">{IEEPA_INFO.failedValidation}</strong>{" "}
                {t("ieepa.failedValidationPost")}
              </span>
            </li>
            <li className="flex gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="text-zinc-300">{t("ieepa.servicesText")}</span>
            </li>
          </ul>
        </div>

        <div>
          <Card className="panel-black panel-beam animate-glow text-white">
            <CardContent className="relative p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
              />
              <h3 className="text-xl font-semibold">{t("ieepa.estimatorTitle")}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {t("ieepa.estimatorNote")}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="ieepa-principal">{t("ieepa.principalLabel")}</Label>
                  <Input
                    id="ieepa-principal"
                    type="number"
                    min="0"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="tabular border-amber-400/[0.16] bg-[#050506] text-amber-100 focus-visible:ring-amber-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ieepa-date">{t("ieepa.dateLabel")}</Label>
                  <Input
                    id="ieepa-date"
                    type="date"
                    value={lastPayDate}
                    onChange={(e) => setLastPayDate(e.target.value)}
                    className="border-amber-400/[0.16] bg-[#050506] text-amber-100 focus-visible:ring-amber-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ieepa-rate">{t("ieepa.rateLabel")}</Label>
                  <Input
                    id="ieepa-rate"
                    type="number"
                    step="0.1"
                    min="0"
                    value={ratePct}
                    onChange={(e) => setRatePct(e.target.value)}
                    className="tabular border-amber-400/[0.16] bg-[#050506] text-amber-100 focus-visible:ring-amber-400/50"
                  />
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Checkbox
                    id="ieepa-include"
                    checked={includeInterest}
                    onCheckedChange={(v) => setIncludeInterest(v === true)}
                  />
                  <Label htmlFor="ieepa-include" className="cursor-pointer text-sm text-zinc-300">
                    {t("ieepa.includeInterestLabel", {
                      rate: IEEPA_INFO.defaultInterestRate,
                    })}
                  </Label>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="well-black rounded-lg p-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-amber-300/60">{t("ieepa.dutiesBackLabel")}</p>
                  <p className="tabular mt-1 text-lg font-bold text-emerald-300 sm:text-xl">
                    <AnimatedMoney value={calc.principal} format={(n) => fmtUSD(n)} />
                  </p>
                </div>
                <div className="well-black rounded-lg p-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-amber-300/60">{t("ieepa.interestLabel")}</p>
                  <p className="tabular mt-1 text-lg font-bold text-amber-300 sm:text-xl">
                    <AnimatedMoney value={calc.interest} format={(n) => fmtUSD(n)} />
                  </p>
                </div>
                <div className="rounded-lg border border-amber-400/35 bg-amber-400/10 p-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-amber-400">{t("ieepa.totalLabel")}</p>
                  <p className="tabular text-gradient-gold mt-1 text-lg font-bold sm:text-xl">
                    <AnimatedMoney value={calc.total} format={(n) => fmtUSD(n)} />
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-amber-400/[0.14] bg-black px-3 py-2">
                <Timer className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                <p className="text-xs text-zinc-400">
                  {t("ieepa.dripLine")}{" "}
                  <span className="tabular font-semibold text-amber-300">
                    {fmtUSD(drip)}
                  </span>
                </p>
                <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
              </div>

              <Button
                className="btn-shimmer mt-5 w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                size="lg"
                onClick={() => setDialogOpen(true)}
              >
                {t("ieepa.ctaButton")}
              </Button>
              <p className="mt-3 text-center text-xs text-zinc-500">
                {t("ieepa.disclaimer")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ClaimDialog open={dialogOpen} onOpenChange={setDialogOpen} source="ieepa-calculator" />
    </section>
  );
}
