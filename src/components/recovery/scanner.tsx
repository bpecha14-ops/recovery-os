"use client";

import { useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ClaimDialog } from "./claim-dialog";
import { Reveal, CountUp, GoldenStream } from "./effects";
import {
  parsePurchases,
  runScan,
  SAMPLE_CSV,
  type ScanResults,
} from "@/lib/scan-engine";
import { fmtUSD, fmtDate, STATUS_META } from "@/lib/recovery-data";
import { useI18n } from "@/lib/i18n/context";
import {
  UploadCloud,
  FileWarning,
  Loader2,
  RotateCcw,
  Play,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Hourglass,
} from "lucide-react";

export function Scanner() {
  const [csvText, setCsvText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScanResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [claimFor, setClaimFor] = useState<string | null>(null);
  const [claimOpen, setClaimOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();
  const { toast } = useToast();

  const preview = useMemo(() => {
    if (!csvText.trim()) return null;
    return parsePurchases(csvText);
  }, [csvText]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5_000_000) {
      toast({
        title: t("scanner.toasts.fileTooLargeTitle"),
        description: t("scanner.toasts.fileTooLargeBody"),
      });
      return;
    }
    const text = await file.text();
    setCsvText(text);
    setFileName(file.name);
    setResults(null);
    setError(null);
  }

  function loadSample() {
    setCsvText(SAMPLE_CSV);
    setFileName("sample-purchases.csv");
    setResults(null);
    setError(null);
    toast({
      title: t("scanner.toasts.sampleLoadedTitle"),
      description: t("scanner.toasts.sampleLoadedBody"),
    });
  }

  // Runs entirely in the browser: the export never leaves this page.
  // Only two anonymous counters (rows parsed, matches found) are posted.
  function handleScan() {
    if (!csvText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = runScan(csvText);
      if (data.usableRows === 0) {
        setError(t("scanner.errors.noUsableRows"));
        return;
      }
      setResults(data);
      void fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rowsParsed: data.rowsParsed,
          matchesFound: data.matches.length,
        }),
      }).catch(() => {
        /* counters are best-effort; ignore network failures */
      });
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setCsvText("");
    setFileName(null);
    setResults(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const totalFoundLow =
    results === null ? 0 : results.openTotalLow + results.ieepaLow;
  const totalFoundHigh =
    results === null ? 0 : results.openTotalHigh + results.ieepaHigh;

  return (
    <section id="scanner" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.45} />
      <div
        aria-hidden="true"
        className="aurora-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 30% at 50% 0%, rgba(251,191,36,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("scanner.eyebrow")}
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("scanner.headingA")}{" "}
            <span className="text-gradient-gold">{t("scanner.headingGold")}</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            {t("scanner.lead")}
          </p>
        </div>

        <Card className="panel-black panel-beam mt-12 shadow-[0_0_80px_-40px_rgba(251,191,36,0.25)]">
          <CardContent className="relative p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
            />
            {results === null ? (
              <div className="space-y-6">
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">{t("scanner.tabs.upload")}</TabsTrigger>
                    <TabsTrigger value="paste">{t("scanner.tabs.paste")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-amber-400/[0.28] bg-black px-6 py-12 text-amber-200/50 transition-all hover:border-amber-400/55 hover:bg-amber-400/[0.04] hover:text-amber-300"
                      aria-label={t("scanner.upload.chooseAriaLabel")}
                    >
                      <UploadCloud className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
                      <span className="text-sm font-medium">
                        {fileName ?? t("scanner.upload.choose")}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {t("scanner.upload.expectedColumns")}
                      </span>
                    </button>
                    <Input
                      ref={inputRef}
                      id="csv-file"
                      type="file"
                      accept=".csv,.tsv,.txt"
                      className="hidden"
                      onChange={handleFile}
                    />
                  </TabsContent>
                  <TabsContent value="paste" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="csv-paste" className="sr-only">
                        {t("scanner.paste.label")}
                      </Label>
                      <Textarea
                        id="csv-paste"
                        placeholder={t("scanner.paste.placeholder")}
                        rows={7}
                        value={csvText}
                        onChange={(e) => {
                          setCsvText(e.target.value);
                          setFileName(null);
                        }}
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-zinc-500">
                        {t("scanner.paste.hint")}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={loadSample}
                    className="text-amber-300 hover:bg-amber-400/10 hover:text-amber-200"
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    {t("scanner.loadSample")}
                  </Button>
                  <span className="text-xs text-zinc-600">
                    {t("scanner.privacyNote")}
                  </span>
                </div>

                {preview && (
                  <div className="well-black rounded-xl p-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                      <span className="text-zinc-400">
                        <strong className="tabular text-amber-200">{preview.rows.length}</strong>{" "}
                        {t("scanner.preview.usableRowsLabel")}
                      </span>
                      {preview.skipped > 0 && (
                        <span className="text-zinc-500">
                          {t("scanner.preview.skipped", { count: preview.skipped })}
                        </span>
                      )}
                      <span className="text-zinc-400">
                        {t("scanner.preview.totalSpendLabel")}{" "}
                        <strong className="tabular text-amber-200">
                          {fmtUSD(preview.rows.reduce((a, r) => a + r.amount, 0))}
                        </strong>
                      </span>
                      {preview.rows.length > 0 && (
                        <span className="text-zinc-500">
                          {preview.rows[0].date} →{" "}
                          {preview.rows[preview.rows.length - 1].date}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 max-h-44 overflow-y-auto rounded-lg border border-amber-400/[0.10] bg-[#050506]">
                      <table className="gold-table w-full text-left text-xs">
                        <thead className="sticky top-0 bg-black text-[11px] uppercase tracking-wide">
                          <tr>
                            <th className="px-3 py-2">{t("scanner.preview.colDate")}</th>
                            <th className="px-3 py-2">{t("scanner.preview.colDescription")}</th>
                            <th className="px-3 py-2 text-right">{t("scanner.preview.colAmount")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.rows.slice(0, 50).map((r, i) => (
                            <tr key={i} className="border-t border-amber-400/[0.07]">
                              <td className="whitespace-nowrap px-3 py-1.5 font-mono text-zinc-500">
                                {r.date}
                              </td>
                              <td className="max-w-[280px] truncate px-3 py-1.5 text-zinc-300">
                                {r.description}
                              </td>
                              <td className="tabular whitespace-nowrap px-3 py-1.5 text-right font-mono text-amber-200/90">
                                {fmtUSD(r.amount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {preview.rows.length > 50 && (
                      <p className="mt-2 text-xs text-zinc-600">
                        {t("scanner.preview.moreRows", { count: preview.rows.length - 50 })}
                      </p>
                    )}
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Button
                        onClick={handleScan}
                        disabled={loading || preview.rows.length === 0}
                        size="lg"
                        className="btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                        )}
                        {loading ? t("scanner.actions.scanning") : t("scanner.actions.run")}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={reset}
                        className="border-amber-400/25 bg-transparent text-zinc-300 hover:bg-amber-400/[0.06] hover:text-white"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                        {t("scanner.actions.clear")}
                      </Button>
                    </div>
                    {loading && (
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-amber-400/[0.08]" role="status" aria-label={t("scanner.actions.scanningAriaLabel")}>
                        <div
                          className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                          style={{ animation: "scan-sweep 1.1s ease-in-out infinite" }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <p className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    <FileWarning className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Result summary — the golden moment */}
                <div className="panel-black panel-beam relative overflow-hidden rounded-xl p-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(70% 90% at 85% 0%, rgba(251,191,36,0.16) 0%, transparent 58%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
                  />
                  <div className="relative">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-300/90">
                      {t("scanner.results.complete", { count: results.usableRows })}
                    </p>
                    <p className="tabular text-gradient-gold mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                      {t("scanner.results.foundLabel")}{" "}
                      <CountUp to={totalFoundLow} format={(n) => fmtUSD(n)} duration={1.4} />
                      {" \u2013 "}
                      <CountUp to={totalFoundHigh} format={(n) => fmtUSD(n)} duration={1.8} delay={0.15} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {t(
                        results.matches.length === 1
                          ? "scanner.results.matchedChannelsOne"
                          : "scanner.results.matchedChannelsMany",
                        { count: results.matches.length }
                      )}{" "}
                      {t("scanner.results.conservativeNote")}
                    </p>
                    {results.ieepaLow > 0 && (
                      <p className="mt-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">
                        {t("scanner.results.ieepaIncluded", {
                          low: fmtUSD(results.ieepaLow),
                          high: fmtUSD(results.ieepaHigh),
                        })}
                      </p>
                    )}
                    {results.missedTotalHigh > 0 && (
                      <p className="mt-3 rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-sm text-amber-200/90">
                        {t("scanner.results.missedClosed", {
                          low: fmtUSD(results.missedTotalLow),
                          high: fmtUSD(results.missedTotalHigh),
                        })}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        className="btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                        onClick={() => {
                          setClaimFor(null);
                          setClaimOpen(true);
                        }}
                      >
                        {t("scanner.results.claimCta")}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-amber-400/25 bg-transparent text-zinc-300 hover:bg-amber-400/[0.06] hover:text-white"
                        onClick={reset}
                      >
                        {t("scanner.results.scanAnother")}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Match cards */}
                <div className="space-y-4">
                  {results.matches.map((m, idx) => {
                    const meta = STATUS_META[m.status];
                    return (
                      <Reveal key={m.id} delay={Math.min(idx * 0.07, 0.5)}>
                      <Card
                        className={`panel-black ${
                          m.kind === "ieepa" ? "panel-beam border-amber-400/35" : ""
                        }`}
                      >
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={meta.className}>
                              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${meta.dotClass}`} aria-hidden="true" />
                              {meta.label}
                            </Badge>
                            {m.daysLeft !== null && m.daysLeft >= 0 && (
                              <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 font-normal text-amber-300">
                                <Hourglass className="mr-1 h-3 w-3" aria-hidden="true" />
                                {m.daysLeft === 0
                                  ? t("scanner.match.finalDay")
                                  : t("scanner.match.daysLeft", { count: m.daysLeft })}
                              </Badge>
                            )}
                            {m.fundSize && (
                              <Badge variant="outline" className="border-amber-400/25 bg-amber-400/[0.07] font-normal text-amber-300">
                                {t("scanner.match.fundBadge", { size: m.fundSize })}
                              </Badge>
                            )}
                          </div>

                          <h3 className="mt-3 text-lg font-semibold text-white">
                            {m.name}
                          </h3>
                          {m.caseRef && (
                            <p className="mt-0.5 font-mono text-xs text-zinc-600">
                              {m.caseRef}
                            </p>
                          )}
                          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{m.summary}</p>

                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div className="well-black rounded-lg p-3">
                              <p className="text-xs font-medium uppercase tracking-wide text-amber-300/70">
                                {t("scanner.match.matchedPurchases", { count: m.matched.length })}
                              </p>
                              <ul className="mt-2 space-y-1 text-sm">
                                {m.matched.slice(0, 3).map((line, i) => (
                                  <li key={i} className="flex items-baseline justify-between gap-3">
                                    <span className="truncate text-zinc-400">
                                      <span className="font-mono text-xs text-zinc-600">
                                        {fmtDate(line.date)}
                                      </span>{" "}
                                      {line.description}
                                    </span>
                                    <span className="tabular whitespace-nowrap font-mono text-xs text-zinc-300">
                                      {fmtUSD(line.amount)}
                                    </span>
                                  </li>
                                ))}
                                {m.matched.length > 3 && (
                                  <li className="text-xs text-zinc-600">
                                    {t("scanner.match.moreLines", { count: m.matched.length - 3 })}
                                  </li>
                                )}
                              </ul>
                              <p className="tabular mt-2 text-xs text-zinc-500">
                                {t("scanner.match.matchedVolumeLabel")}{" "}
                                <strong className="text-zinc-200">{fmtUSD(m.matchedTotal)}</strong>
                              </p>
                            </div>
                            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-3">
                              <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
                                {t("scanner.match.estimatedRecovery")}
                              </p>
                              <p className="tabular mt-2 text-2xl font-bold text-emerald-300">
                                <CountUp to={m.estimateLow} format={(n) => fmtUSD(n)} duration={1.2} delay={0.2 + idx * 0.06} />
                                {" \u2013 "}
                                <CountUp to={m.estimateHigh} format={(n) => fmtUSD(n)} duration={1.5} delay={0.35 + idx * 0.06} />
                              </p>
                              <p className="mt-1 text-xs text-zinc-500">{m.payoutNote}</p>
                            </div>
                          </div>

                          {m.eligibleNote && (
                            <p className="mt-3 text-sm text-zinc-400">
                              <span className="font-medium text-zinc-200">{t("scanner.match.whoCanClaimLabel")}</span>
                              {m.eligibleNote}
                            </p>
                          )}
                          {m.evidenceNote && (
                            <p className="mt-1 text-sm text-zinc-400">
                              <span className="font-medium text-zinc-200">{t("scanner.match.evidenceLabel")}</span>
                              {m.evidenceNote}
                            </p>
                          )}
                          {m.verifyNote && (
                            <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-xs leading-relaxed text-sky-300">
                              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              {m.verifyNote}
                            </p>
                          )}

                          <div className="mt-5 flex flex-wrap gap-3">
                            <Button
                              size="sm"
                              className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 transition-all hover:brightness-110"
                              disabled={m.status === "closed"}
                              onClick={() => {
                                setClaimFor(m.name);
                                setClaimOpen(true);
                              }}
                            >
                              {m.status === "closed"
                                ? t("scanner.match.closedCta")
                                : t("scanner.match.claimCta")}
                            </Button>
                            {m.adminUrl && (
                              <a href={m.adminUrl} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-amber-400/25 bg-transparent text-zinc-300 hover:bg-amber-400/[0.06] hover:text-white"
                                >
                                  {t("scanner.match.officialSite")}
                                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      </Reveal>
                    );
                  })}
                </div>

                <p className="text-xs leading-relaxed text-zinc-600">
                  {t("scanner.disclaimer")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ClaimDialog
        open={claimOpen}
        onOpenChange={setClaimOpen}
        context={claimFor ?? undefined}
        source={claimFor ? `scan:${claimFor}` : "scan:all"}
      />
    </section>
  );
}
