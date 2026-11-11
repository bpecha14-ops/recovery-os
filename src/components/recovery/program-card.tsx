"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  CircleDollarSign,
  FileText,
  ShieldQuestion,
} from "lucide-react";
import { Program } from "@/lib/programs-data";
import { useI18n } from "@/lib/i18n/context";

export function VerificationBadge({ program }: { program: Program }) {
  const { t } = useI18n();
  const verified = program.verification.status === "verified";
  return (
    <Badge
      variant="outline"
      className={`gap-1 border-amber-400/30 px-2 py-0.5 text-[11px] font-medium ${
        verified
          ? "bg-amber-400/10 text-amber-200"
          : "bg-zinc-800/80 text-zinc-400"
      }`}
      title={verified ? t("civic.search.verified") : t("civic.search.autoExtracted")}
    >
      {verified ? (
        <BadgeCheck className="h-3 w-3" aria-hidden="true" />
      ) : (
        <ShieldQuestion className="h-3 w-3" aria-hidden="true" />
      )}
      {verified ? t("civic.search.verified") : t("civic.search.autoExtracted")}
    </Badge>
  );
}

export function ProgramCard({
  program,
  onOpenClaim,
  reasons,
  missing,
}: {
  program: Program;
  onOpenClaim?: (p: Program) => void;
  reasons?: string[];
  missing?: string[];
}) {
  const { t } = useI18n();
  return (
    <Card className="panel-black h-full transition-colors hover:border-amber-400/30">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-zinc-800/80 font-medium text-zinc-300 hover:bg-zinc-800/80">
            {program.country} · {program.jurisdiction}
          </Badge>
          <VerificationBadge program={program} />
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
          {program.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{program.summary}</p>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" aria-hidden="true" />
            <div>
              <dt className="sr-only">{t("civic.search.amountLabel")}</dt>
              <dd className="text-zinc-300">{program.amount}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" aria-hidden="true" />
            <div>
              <dt className="sr-only">{t("civic.search.deadlineLabel")}</dt>
              <dd className="text-zinc-300">{program.deadlines}</dd>
            </div>
          </div>
        </dl>

        {(reasons?.length ?? 0) > 0 && (
          <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/90">
              {t("civic.wizard.whyHeading")}
            </p>
            <ul className="mt-1.5 space-y-1">
              {reasons!.map((r) => (
                <li key={r} className="flex items-start gap-1.5 text-xs text-zinc-300">
                  <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {(missing?.length ?? 0) > 0 && (
          <div className="mt-3 rounded-lg border border-rose-400/20 bg-rose-400/[0.05] p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-300/90">
              {t("civic.wizard.whyMissing")}
            </p>
            <ul className="mt-1.5 space-y-1">
              {missing!.map((r) => (
                <li key={r} className="flex items-start gap-1.5 text-xs text-zinc-300">
                  <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 text-[11px] text-zinc-500">
          {t("civic.search.checkedOn", { date: program.verification.lastChecked })} ·{" "}
          {program.agency}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 pt-2">
          <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-amber-400/25 bg-transparent text-amber-200 hover:bg-amber-400/[0.06] hover:text-amber-100">
              <FileText className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              {t("civic.search.sourceLabel")}
              <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
            </Button>
          </a>
          {onOpenClaim && (
            <Button
              size="sm"
              variant="outline"
              className="border-amber-400/25 bg-transparent text-amber-200 hover:bg-amber-400/[0.06] hover:text-amber-100"
              onClick={() => onOpenClaim(program)}
            >
              {t("civic.search.openClaim")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
