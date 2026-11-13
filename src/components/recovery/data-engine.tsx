"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n/context";
import { DATA_SOURCES } from "@/lib/data-sources";
import { Reveal } from "./effects";
import { ArrowUpRight, Database, Download, FileSearch, Timer } from "lucide-react";

const ACCESS_ICONS = {
  "open-api": Download,
  "public-page": FileSearch,
  "request-access": Database,
} as const;

export function DataEngine() {
  const { t } = useI18n();
  return (
    <section id="engine" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("civic.engine.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("civic.engine.headingA")}{" "}
            <span className="text-gradient-gold">{t("civic.engine.headingGold")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("civic.engine.lead")}
          </p>
        </Reveal>

        {/* Access legend */}
        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {(Object.keys(ACCESS_ICONS) as Array<keyof typeof ACCESS_ICONS>).map((k) => {
              const Icon = ACCESS_ICONS[k];
              return (
                <div key={k} className="panel-black rounded-xl p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                    <Icon className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    {t(`civic.engine.access.${k}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Sources table */}
        <Reveal delay={0.12}>
          <div className="panel-black mt-8 overflow-hidden rounded-2xl">
            <div className="max-h-[520px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-amber-200/90">{t("civic.engine.columns.source")}</TableHead>
                    <TableHead className="text-amber-200/90">{t("civic.engine.columns.agency")}</TableHead>
                    <TableHead className="text-amber-200/90">{t("civic.engine.columns.access")}</TableHead>
                    <TableHead className="hidden text-amber-200/90 md:table-cell">{t("civic.engine.columns.license")}</TableHead>
                    <TableHead className="hidden text-amber-200/90 sm:table-cell">{t("civic.engine.columns.cadence")}</TableHead>
                    <TableHead className="text-amber-200/90">{t("civic.engine.columns.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DATA_SOURCES.map((s) => {
                    const Icon = ACCESS_ICONS[s.access];
                    return (
                      <TableRow key={s.id} className="border-zinc-800/70">
                        <TableCell className="max-w-[240px]">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-1.5 text-sm font-medium text-zinc-200 hover:text-amber-200"
                          >
                            {s.name}
                            <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                          </a>
                          <span className="text-[11px] text-zinc-500">{s.region}</span>
                        </TableCell>
                        <TableCell className="max-w-[200px] text-sm text-zinc-400">{s.agency}</TableCell>
                        <TableCell className="text-sm">
                          <span className="flex items-center gap-1.5 text-zinc-300">
                            <Icon className="h-3.5 w-3.5 text-amber-400/70" aria-hidden="true" />
                            {t(`civic.engine.access.${s.access}`).split("—")[0].trim()}
                          </span>
                        </TableCell>
                        <TableCell className="hidden max-w-[180px] text-sm text-zinc-400 md:table-cell">
                          {s.license}
                        </TableCell>
                        <TableCell className="hidden text-sm text-zinc-400 sm:table-cell">
                          {s.cadence}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              s.status === "live"
                                ? "border-emerald-400/25 bg-emerald-400/[0.06] text-[11px] text-emerald-300/90"
                                : "border-zinc-600 bg-zinc-800/60 text-[11px] text-zinc-400"
                            }
                          >
                            {s.status === "live" ? t("civic.engine.statusLive") : t("civic.engine.statusPlanned")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </Reveal>

        {/* SLA */}
        <Reveal delay={0.16}>
          <div className="panel-black mt-8 rounded-2xl border-l-4 border-l-amber-400/70 p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Timer className="h-4 w-4 text-amber-400" aria-hidden="true" />
              {t("civic.engine.slaTitle")}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
              {t("civic.engine.slaBody")}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-amber-300/80">
              {t("civic.engine.openLicense")}{" "}
              <a
                href={t("civic.engine.repoUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-amber-400/40 underline-offset-2 transition-colors hover:text-amber-200 hover:decoration-amber-300"
              >
                {t("civic.engine.openCode")}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
