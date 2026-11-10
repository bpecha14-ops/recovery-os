"use client";

import { useMemo, useState } from "react";
import { ExternalLink, AlertTriangle, ScanSearch, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SETTLEMENTS,
  STATUS_META,
  claimStatus,
  daysUntil,
  fmtDate,
  type ClaimStatus,
} from "@/lib/recovery-data";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Spotlight, Countdown, Marquee, GoldenStream } from "./effects";

type Filter = "all" | ClaimStatus;

// Semantic filter ids — display labels come from the i18n dictionary,
// aligned by index (see `settlements.filters` in the dictionaries).
const FILTER_IDS: Filter[] = ["all", "closing-soon", "open", "verify", "closed"];

const ORDER: Record<ClaimStatus, number> = {
  "closing-soon": 0,
  open: 1,
  verify: 2,
  closed: 3,
};

interface Row {
  id: string;
  name: string;
  caseRef: string;
  fundSize: string;
  eligibleNote: string;
  window: string;
  deadlineIso: string | null;
  status: ClaimStatus;
  daysLeft: number | null;
  summary: string;
  adminUrl: string;
  adminName: string;
  verifyNote?: string;
}

function buildRows(now: Date): Row[] {
  return SETTLEMENTS.map((s) => ({
    id: s.id,
    name: s.name,
    caseRef: s.caseRef,
    fundSize: s.fundSize,
    eligibleNote: s.eligibleNote,
    window: `${fmtDate(s.windowStart)} – ${fmtDate(s.windowEnd)}`,
    deadlineIso: s.claimDeadline,
    status: claimStatus(s.claimDeadline, now),
    daysLeft: daysUntil(s.claimDeadline, now),
    summary: s.summary,
    adminUrl: s.adminUrl,
    adminName: s.adminName,
    verifyNote: s.verifyNote,
  })).sort((a, b) => {
    const byStatus = ORDER[a.status] - ORDER[b.status];
    if (byStatus !== 0) return byStatus;
    if (a.daysLeft !== null && b.daysLeft !== null) return a.daysLeft - b.daysLeft;
    return 0;
  });
}

export function SettlementsBrowser() {
  const { t, tArr } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  // Day counts depend on the visitor's clock; computed once per session.
  // Pinned to the start of the current UTC day so SSR and hydration always
  // derive identical day labels (no hydration mismatch except across
  // UTC midnight, which self-heals on the next tick).
  const [rows] = useState<Row[]>(() => {
    const dayStartMs = Math.floor(Date.now() / 86_400_000) * 86_400_000;
    return buildRows(new Date(dayStartMs));
  });

  const filters = tArr<{ label: string }>("settlements.filters");

  // Status badge text — styling still comes from STATUS_META in the data layer.
  const statusLabels: Record<ClaimStatus, string> = {
    open: t("settlements.statusOpen"),
    "closing-soon": t("settlements.statusClosingSoon"),
    closed: t("settlements.statusClosed"),
    verify: t("settlements.statusVerify"),
  };

  // Locale-reactive display labels; raw dates and day counts live in `rows`.
  const deadlineLabel = (r: Row) =>
    r.deadlineIso ? fmtDate(r.deadlineIso) : t("settlements.deadlineVerify");

  const daysLabel = (r: Row) => {
    const days = r.daysLeft;
    if (days === null) return t("settlements.daysMonitor");
    if (days < 0) return t("settlements.daysPast", { days: Math.abs(days) });
    if (days === 0) return t("settlements.lastDay");
    return t("settlements.daysLeftCount", { days });
  };

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter]
  );

  return (
    <section id="settlements" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.5} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
              <span className="hairline-gold w-8" aria-hidden="true" />
              {t("settlements.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
              {t("settlements.heading")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              {t("settlements.lead")}
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("settlements.filterAria")}>
            {FILTER_IDS.map((id, i) => (
              <button
                key={id}
                role="tab"
                aria-selected={filter === id}
                onClick={() => setFilter(id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  filter === id
                    ? "border-amber-400/60 bg-gradient-to-b from-amber-300 to-amber-500 font-semibold text-zinc-950"
                    : "border-amber-400/[0.14] bg-black text-amber-200/50 hover:border-amber-400/35 hover:text-amber-200"
                }`}
              >
                {filters[i]?.label ?? id}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline ticker — the clock never stops on open funds */}
        <Reveal delay={0.1} className="mt-8">
          <Marquee
            items={rows
            .filter((r) => r.deadlineIso && r.status !== "closed")
            .map((r) => (
              <span key={r.id} className="flex items-center gap-2.5 text-xs tracking-wide text-amber-200/60">
                <Hourglass className="h-3 w-3 text-amber-400/80" aria-hidden="true" />
                <span className="font-medium text-amber-200/80">{r.name}</span>
                <span className="text-zinc-500">· {deadlineLabel(r)} ·</span>
                <Countdown to={r.deadlineIso!} compact className="text-amber-300/90" />
              </span>
            ))}
            itemClassName="pr-12"
          />
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {visible.map((r, i) => {
            const meta = STATUS_META[r.status];
            return (
              <Reveal key={r.id} delay={Math.min(i * 0.05, 0.3)}>
                <Spotlight
                  className={`h-full rounded-2xl transition-colors duration-300 ${
                    r.status === "closed"
                      ? "panel-black opacity-60"
                      : r.status === "closing-soon"
                        ? "panel-black panel-beam hover:border-amber-400/30"
                        : "panel-black hover:border-amber-400/30"
                  }`}
                >
                  <div className="flex h-full flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={meta.className}>
                        <span className={`pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${meta.dotClass}`} aria-hidden="true" />
                        {statusLabels[r.status]}
                      </Badge>
                      <Badge variant="outline" className="border-amber-400/20 bg-amber-400/[0.06] font-normal text-amber-200/80">
                        {daysLabel(r)}
                      </Badge>
                      <Badge variant="outline" className="border-amber-400/25 bg-amber-400/[0.07] font-normal text-amber-300">
                        {t("settlements.fundBadge", { fund: r.fundSize })}
                      </Badge>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {r.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-zinc-600">{r.caseRef}</p>

                    <dl className="mt-3 space-y-1.5 text-sm">
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="font-medium text-zinc-300">{t("settlements.purchasesLabel")}</dt>
                        <dd className="text-zinc-400">{r.window}</dd>
                      </div>
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="font-medium text-zinc-300">{t("settlements.deadlineTerm")}</dt>
                        <dd className={r.status === "closing-soon" ? "font-semibold text-amber-300" : "text-zinc-400"}>
                          {deadlineLabel(r)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-zinc-300">{t("settlements.eligibleLabel")}</dt>
                        <dd className="text-zinc-400">{r.eligibleNote}</dd>
                      </div>
                    </dl>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {r.summary}
                    </p>

                    {r.verifyNote && (
                      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-xs leading-relaxed text-sky-300">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {r.verifyNote}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-3 pt-1 md:mt-auto">
                      <a href="#scanner" className="flex-1 sm:flex-none">
                        <Button
                          size="sm"
                          className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 transition-all hover:brightness-110"
                        >
                          <ScanSearch className="mr-1.5 h-4 w-4" aria-hidden="true" />
                          {t("settlements.testInScanner")}
                        </Button>
                      </a>
                      <a href={r.adminUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-amber-400/25 bg-transparent text-amber-200/80 hover:bg-amber-400/[0.06] hover:text-amber-100"
                        >
                          {t("settlements.officialSite")}
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                        </Button>
                      </a>
                      <span className="hidden text-xs text-amber-300/50 sm:block">
                        {r.adminName}
                      </span>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-zinc-600">
          {t("settlements.disclaimer")}
        </p>
      </div>
    </section>
  );
}
