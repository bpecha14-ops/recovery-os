"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Building2,
  Check,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  HandHeart,
  ShieldCheck,
  Landmark,
  PiggyBank,
  LineChart,
  Receipt,
  Search,
  Wallet,
  Gavel,
  Loader2,
  FlaskConical,
  X,
} from "lucide-react";
import {
  WORLD_COUNTRIES,
  REGIONS,
  TYPE_META,
  ACCESS_META,
  WORLD_SOURCE_COUNT,
  WORLD_VERIFIED_USD_B,
  type CountryEntry,
  type MatchedSource,
  type Region,
  type SourceType,
} from "@/lib/world-registry";
import { Reveal, Spotlight, CountUp, LiveClock, Marquee, TypeCycle, GoldenStream } from "./effects";

const TYPE_ICONS: Record<SourceType, typeof Landmark> = {
  state: Building2,
  "central-bank": Landmark,
  pension: PiggyBank,
  securities: LineChart,
  tax: Receipt,
  insurance: ShieldCheck,
  deposits: Wallet,
  court: Gavel,
};

const PRINCIPLES = [
  {
    icon: HandHeart,
    title: "Free forever — DIY-first",
    text: "We tell you exactly how to file yourself, in minutes. No middleman required, ever. No paid tiers for people, period.",
  },
  {
    icon: ShieldCheck,
    title: "Official links only",
    text: "Every entry points to the government database, central bank or court-appointed administrator. No lookalikes.",
  },
  {
    icon: RefreshCw,
    title: "Living data",
    text: "New registries go live every quarter. The library tracks them continuously so your checklist never goes stale.",
  },
];

interface ScanResult {
  countries: string[];
  matches: MatchedSource[];
  totalSources: number;
}

const MONEY_WORDS = [
  "dormant accounts",
  "lost pensions",
  "unclaimed dividends",
  "ownerless estates",
  "forgotten deposits",
  "uncashed checks",
];

const COUNTRY_TICKER = WORLD_COUNTRIES.map(
  (c) => `${c.flag} ${c.name}${c.status === "live" ? " — live" : " — in the lab"}`
);

export function Library() {
  // --- free global search state ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");

  // --- library browsing state ---
  const [region, setRegion] = useState<Region | "all">("all");
  const [openCountry, setOpenCountry] = useState<CountryEntry | null>(null);

  const liveCount = useMemo(
    () => WORLD_COUNTRIES.filter((c) => c.status === "live").length,
    []
  );

  const filteredCountries = useMemo(
    () =>
      region === "all"
        ? WORLD_COUNTRIES
        : WORLD_COUNTRIES.filter((c) => c.region === region),
    [region]
  );

  const pickerCountries = useMemo(() => {
    const q = pickerQuery.trim().toLowerCase();
    if (!q) return WORLD_COUNTRIES;
    return WORLD_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q
    );
  }, [pickerQuery]);

  const toggleCountry = (code: string) => {
    setResult(null);
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : prev.length >= 8 ? prev : [...prev, code]
    );
  };

  const runSearch = async () => {
    setError(null);
    if (fullName.trim().length < 2) {
      setError("Tell us the name to search for.");
      return;
    }
    if (selected.length === 0) {
      setError("Pick at least one country you've lived, worked or banked in.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/people-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          countries: selected,
          referrer: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Search failed. Try again.");
        return;
      }
      setResult(json as ScanResult);
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  };

  const grouped = useMemo(() => {
    if (!result) return [];
    const map = new Map<string, MatchedSource[]>();
    for (const m of result.matches) {
      const list = map.get(m.countryName) ?? [];
      list.push(m);
      map.set(m.countryName, list);
    }
    return [...map.entries()];
  }, [result]);

  return (
    <section id="library" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="aurora-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 36% at 88% 8%, rgba(251,191,36,0.08) 0%, transparent 62%)",
        }}
      />
      <GoldenStream density={0.55} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            The World Library
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            Every official unclaimed-money database on Earth.{" "}
            <span className="text-gradient-gold">Free forever.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Not just America, and not just businesses. Money sits forgotten under
            bureaucracy in every major economy —{" "}
            <span className="font-medium text-amber-200">
              <TypeCycle words={MONEY_WORDS} />
            </span>
            . The World Library indexes the official door to each one, for
            anyone, for $0.
          </p>
        </Reveal>

        {/* Live stat band — the library, counted live */}
        <Reveal delay={0.08}>
          <div className="tabular mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-amber-400/[0.14] bg-amber-400/[0.10] lg:grid-cols-4">
            {[
              {
                value: WORLD_COUNTRIES.length,
                format: (n: number) => Math.round(n).toString(),
                label: "markets indexed",
                live: true,
              },
              {
                value: liveCount,
                format: (n: number) => Math.round(n).toString(),
                label: "registries live today",
                live: true,
              },
              {
                value: WORLD_SOURCE_COUNT,
                format: (n: number) => Math.round(n).toString(),
                label: "official sources verified",
                live: false,
              },
              {
                value: WORLD_VERIFIED_USD_B,
                format: (n: number) => `$${Math.round(n)}B+`,
                label: "verified waiting to be claimed",
                live: false,
              },
            ].map((s, i) => (
              <div key={s.label} className="relative bg-[#0a0a0c] p-5">
                <div className="tabular text-3xl font-bold tracking-tight text-gradient-gold">
                  <CountUp to={s.value} format={s.format} delay={0.15 + i * 0.1} />
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-xs leading-relaxed text-zinc-400">
                  {s.live && (
                    <span
                      className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                      aria-hidden="true"
                    />
                  )}
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* The world, rolling — flags never sleep */}
        <Reveal delay={0.12} className="mt-5">
          <Marquee
            items={COUNTRY_TICKER.map((t) => (
              <span key={t} className="flex items-center gap-2.5 text-xs tracking-wide text-amber-200/50">
                <span className="h-1 w-1 rounded-full bg-amber-400/70" aria-hidden="true" />
                {t}
              </span>
            ))}
            itemClassName="pr-10"
          />
        </Reveal>

        {/* ------------------------------------------------ FREE GLOBAL SEARCH */}
        <Reveal delay={0.12}>
          <div className="panel-black panel-beam relative mt-10 overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 80% at 92% 6%, rgba(251,191,36,0.14) 0%, transparent 58%)",
              }}
            />
            <div
              aria-hidden="true"
              className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Find the money bureaucracy forgot —{" "}
                  <span className="text-gradient-gold">under your own name.</span>
                </h3>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-400/25 bg-black px-3 py-1 text-[11px] font-medium text-amber-200/80">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                  <LiveClock />
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                One name, your countries. We&apos;ll build your personal checklist of
                official databases to search — every entry free, every link official.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div>
                  <label htmlFor="lib-name" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Name to search
                  </label>
                  <Input
                    id="lib-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maria Gonzalez"
                    className="mt-2 h-11 border-amber-400/20 bg-[#050506] text-white placeholder:text-zinc-600 focus-visible:ring-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="lib-email" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Email — optional, for new-registry alerts
                  </label>
                  <Input
                    id="lib-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 h-11 border-amber-400/20 bg-[#050506] text-white placeholder:text-zinc-600 focus-visible:ring-amber-400"
                  />
                </div>
              </div>

              {/* Country picker */}
              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Countries you&apos;ve lived, worked or banked in
                  </label>
                  <span className="tabular text-xs text-zinc-500">
                    {selected.length}/8 selected
                  </span>
                </div>
                <div className="mt-2 well-black rounded-xl p-4">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" aria-hidden="true" />
                    <Input
                      value={pickerQuery}
                      onChange={(e) => setPickerQuery(e.target.value)}
                      placeholder="Search 20 markets — USA, UK, India, Brazil…"
                      className="h-10 border-amber-400/15 bg-[#050506] pl-9 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pickerCountries.map((c) => {
                      const active = selected.includes(c.code);
                      return (
                        <button
                          key={c.code}
                          onClick={() => toggleCountry(c.code)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            active
                              ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                              : "border-amber-400/[0.14] bg-black text-amber-200/50 hover:border-amber-400/45 hover:text-amber-200"
                          }`}
                        >
                          <span aria-hidden="true">{c.flag}</span>
                          {c.name}
                          {active && <Check className="h-3 w-3" aria-hidden="true" />}
                        </button>
                      );
                    })}
                    {pickerCountries.length === 0 && (
                      <p className="px-1 py-1.5 text-xs text-zinc-600">
                        No market matches “{pickerQuery}” — try the full name, e.g. “Japan”.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-lg border border-red-400/25 bg-red-400/[0.07] px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  size="lg"
                  onClick={() => void runSearch()}
                  disabled={loading}
                  className="btn-shimmer h-12 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 px-7 text-base font-semibold text-zinc-950 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  Build my free checklist
                </Button>
                <p className="max-w-sm text-xs leading-relaxed text-zinc-500">
                  Free forever, no tiers. We keep your search on file so we can alert
                  you when new registries go live for your countries — that&apos;s the
                  entire model. Delete anytime.
                </p>
              </div>

              {/* Results — the personal checklist */}
              {result && (
                <div className="mt-6 rounded-xl border border-amber-400/25 bg-[#050506] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Checklist ready for {result.countries.length}{" "}
                        {result.countries.length === 1 ? "country" : "countries"}
                      </p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                        <span className="tabular">{result.totalSources}</span>{" "}
                        <span className="text-gradient-gold">official databases</span>{" "}
                        to search
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Search saved{email.trim() ? " — we'll email you when new registries go live" : ""}.
                        Work through the list — most entries take under 10 minutes.
                      </p>
                    </div>
                    <button
                      onClick={() => setResult(null)}
                      className="rounded-md p-1 text-amber-200/50 transition-colors hover:bg-amber-400/10 hover:text-amber-200"
                      aria-label="Close results"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-5 space-y-5">
                    {grouped.map(([countryName, sources]) => (
                      <div key={countryName}>
                        <p className="flex items-center gap-2 text-sm font-semibold text-white">
                          <span aria-hidden="true">{sources[0].flag}</span>
                          {countryName}
                          <span className="text-xs font-normal text-zinc-500">
                            · {sources.length} databases
                          </span>
                        </p>
                        <ul className="mt-2 divide-y divide-white/[0.05]">
                          {sources.map((s) => (
                            <li
                              key={s.id}
                              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-zinc-200">
                                  {s.title}
                                  <span className="ml-2 tabular text-xs text-amber-300/80">
                                    {s.amount}
                                  </span>
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-500">
                                  {s.operator} · {s.minutes} · {ACCESS_META[s.access].label}
                                </p>
                              </div>
                              {s.url.startsWith("http") ? (
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-400/[0.14]"
                                >
                                  Open official search
                                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                </a>
                              ) : (
                                <a
                                  href={s.url}
                                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-400/[0.14]"
                                >
                                  Open tracker
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------ REGION TABS */}
        <Reveal delay={0.1} className="mt-14">
          <div
            className="inline-flex flex-wrap rounded-full border border-amber-400/[0.18] bg-black p-1"
            role="tablist"
            aria-label="World regions"
          >
            {REGIONS.map((r) => {
              const count =
                r.id === "all"
                  ? WORLD_COUNTRIES.length
                  : WORLD_COUNTRIES.filter((c) => c.region === r.id).length;
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={region === r.id}
                  onClick={() => setRegion(r.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 ${
                    region === r.id
                      ? "bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 text-zinc-950 shadow-[0_0_24px_-8px_rgba(251,191,36,0.6)]"
                      : "text-amber-200/50 hover:text-amber-200"
                  }`}
                >
                  {r.label}
                  <span
                    className={`tabular rounded-full px-1.5 text-[11px] ${
                      region === r.id ? "bg-amber-400/20 text-amber-200" : "bg-amber-400/10 text-amber-300/80"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ------------------------------------------------ COUNTRY GRID */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((c, i) => (
            <Reveal key={c.code} delay={Math.min(i, 8) * 0.05}>
              <Spotlight
                className={`group h-full rounded-2xl p-6 transition-colors duration-300 ${
                  c.status === "live"
                    ? "panel-black panel-beam hover:border-amber-400/30"
                    : "well-black border border-dashed border-amber-400/[0.16]"
                }`}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">
                        {c.flag}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                          {c.sources.length > 0
                            ? `${c.sources.length} official ${c.sources.length === 1 ? "source" : "sources"}`
                            : "In the lab"}
                        </p>
                      </div>
                    </div>
                    {c.status === "live" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/[0.16] bg-amber-400/[0.05] px-2.5 py-1 text-[11px] font-medium text-amber-200/60">
                        <FlaskConical className="h-3 w-3" aria-hidden="true" />
                        Researching
                      </span>
                    )}
                  </div>

                  <p
                    className={`tabular mt-4 text-xl font-bold tracking-tight ${
                      c.status === "live" ? "text-gradient-gold" : "text-amber-200/60"
                    }`}
                  >
                    {c.total}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {c.summary}
                  </p>

                  <div className="mt-auto pt-5">
                    {c.status === "live" && c.sources.length > 0 ? (
                      <button
                        onClick={() => setOpenCountry(c)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
                      >
                        View the sources
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <p className="text-xs text-zinc-600">
                        Launches here as we verify the claim paths.
                      </p>
                    )}
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        {/* Referral loop — the bridge from people to business */}
        <Reveal delay={0.15}>
          <div className="panel-black panel-beam relative mt-12 overflow-hidden rounded-2xl p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 85% at 90% 8%, rgba(251,191,36,0.13) 0%, transparent 58%)",
              }}
            />
            <div
              aria-hidden="true"
              className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
            />
            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300/90">
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Found $40 for yourself?
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Your business is owed{" "}
                  <span className="text-gradient-gold">100× more.</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  The same bureaucracy, at company scale: tariff refunds on every
                  import, class actions on every purchase order, drawback on every
                  re-export. Point the scanner at your company&apos;s books and see
                  the real number.
                </p>
              </div>
              <a href="#scanner" className="w-full shrink-0 lg:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 px-7 text-base font-semibold text-zinc-950 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110 lg:w-auto"
                >
                  Run the business scan
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Principles strip */}
        <div className="mt-14 grid gap-6 border-t border-white/[0.06] pt-10 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07]">
                <p.icon className="h-4.5 w-4.5 text-amber-300" aria-hidden="true" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
            <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/60" aria-hidden="true" />
            Figures compiled from official program disclosures and major press as of
            late 2026 — Bank of Canada, UK Pension Policy Institute, ASIC Moneysmart,
            Ciclade/CDC, RBI UDGAM, IEPFA, Banco Central (SVR), ASISA/FSCA, KIFIN,
            NTMA, IRD. Always verify on the official site before acting.
          </p>
        </Reveal>
      </div>

      {/* ------------------------------------------------ COUNTRY DETAIL DIALOG */}
      <Dialog open={openCountry !== null} onOpenChange={(o) => !o && setOpenCountry(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-amber-400/[0.16] bg-[#0a0a0c] text-zinc-100">
          {openCountry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-left">
                  <span className="text-3xl" aria-hidden="true">
                    {openCountry.flag}
                  </span>
                  <span>
                    {openCountry.name}
                    <span className="ml-2 text-sm font-normal text-zinc-500">
                      {openCountry.sources.length} official sources
                    </span>
                  </span>
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-zinc-400">
                {openCountry.summary}
              </p>
              <div className="mt-2 space-y-3">
                {openCountry.sources.map((s) => {
                  const TypeIcon = TYPE_ICONS[s.type];
                  return (
                    <div
                      key={s.id}
                      className="well-black rounded-xl p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/[0.16] bg-amber-400/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-amber-200/70">
                              <TypeIcon className="h-3 w-3" aria-hidden="true" />
                              {TYPE_META[s.type].label}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${ACCESS_META[s.access].className}`}
                            >
                              {ACCESS_META[s.access].label}
                            </span>
                            <span className="tabular text-[11px] text-zinc-500">
                              {s.minutes}
                            </span>
                          </div>
                          <h4 className="mt-2.5 text-base font-semibold text-white">
                            {s.title}
                          </h4>
                          <p className="text-xs text-zinc-500">
                            {s.operator} · <span className="tabular text-amber-300/80">{s.amount}</span>
                          </p>
                        </div>
                        {s.url.startsWith("http") && (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-400/[0.14]"
                          >
                            Official site
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <p className="mt-3 rounded-lg border border-amber-400/[0.10] bg-black px-3 py-2 text-xs leading-relaxed text-zinc-500">
                        {s.note}
                      </p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  if (!selected.includes(openCountry.code)) toggleCountry(openCountry.code);
                  setOpenCountry(null);
                  document
                    .getElementById("library")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all hover:brightness-110"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Add {openCountry.name} to my free search
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
