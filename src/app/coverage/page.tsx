import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  coverageMatrix,
  DOMAIN_LABELS,
  DOMAIN_PHASE,
  globalStats,
  type Domain,
} from "@/lib/rights-packages";
import { StatCard, PhaseTag } from "@/components/civic/primitives";
import { CoveragePrograms } from "@/components/civic/coverage-programs";

/**
 * /coverage — what we cover, honestly. Every number is computed from
 * the live packages; the only aggregate figures are the officially
 * published ones, each with its own as-of date.
 */

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "What we cover, honestly: a live country × domain matrix computed from the open data files, plus the explicit list of what is not covered yet.",
};

const DOMAINS: Domain[] = ["benefits", "pensions", "housing"];

const NOT_COVERED = [
  {
    domain: "Pensions & social insurance",
    phase: "next" as const,
    note: "Next phase — stable, well-documented official sources.",
  },
  {
    domain: "Housing rights",
    phase: "partner" as const,
    note: "Partner-gated — only with a named local lawyer-partner.",
  },
  {
    domain: "Land rights",
    phase: "partner" as const,
    note: "Single-country pilot first — never a worldwide launch.",
  },
  {
    domain: "Inheritance & labor rights",
    phase: "partner" as const,
    note: "Partner-gated — complex, jurisdiction-heavy domains.",
  },
];

export default function CoveragePage() {
  const rows = coverageMatrix();
  const stats = globalStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          What we cover, honestly.
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400">
          Every number on this page is computed from the open data files at
          render time and clicks through to its source. Money & benefits are
          live; pensions come next; housing, land, inheritance and labor
          rights launch only with a named local legal partner.
        </p>
      </header>

      {/* Computed aggregates — each with its as-of date. */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          value={stats.programs}
          label="Live programs"
          asOf={stats.lastChecked}
        />
        <StatCard
          value={stats.countries}
          label="Countries covered"
          asOf={stats.lastChecked}
        />
        <StatCard
          value={stats.sources}
          label="Distinct official sources"
          asOf={stats.lastChecked}
        />
        <StatCard
          value={stats.packages}
          label="Rights packages"
          asOf={stats.lastChecked}
        />
      </div>

      {/* The matrix */}
      <section id="matrix" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">
          Country × domain matrix
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Live program counts per country and domain, with the last checked
          date per row. Zero means the package is not live yet.
        </p>
        <div className="panel-black mt-5 overflow-x-auto rounded-2xl">
          <table className="gold-table w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-cf-line">
                <th scope="col" className="px-5 py-3.5">Country</th>
                {DOMAINS.map((d) => (
                  <th key={d} scope="col" className="px-5 py-3.5 text-right">
                    {DOMAIN_LABELS[d]}
                  </th>
                ))}
                <th scope="col" className="px-5 py-3.5 text-right">Total</th>
                <th scope="col" className="px-5 py-3.5 text-right">Last checked</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.country} className="border-b border-cf-line/60">
                  <td className="px-5 py-3 font-medium text-zinc-100">
                    {row.country}
                  </td>
                  {DOMAINS.map((d) => (
                    <td
                      key={d}
                      className={`tabular px-5 py-3 text-right font-mono ${
                        row.domains[d] ? "text-cf-gold" : "text-zinc-600"
                      }`}
                    >
                      {row.domains[d] ?? 0}
                    </td>
                  ))}
                  <td className="tabular px-5 py-3 text-right font-mono font-semibold text-zinc-100">
                    {row.livePrograms}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-xs text-zinc-500">
                    {row.lastChecked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Not covered yet */}
      <section id="roadmap" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">Not covered yet</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {NOT_COVERED.map((item) => (
            <div
              key={item.domain}
              className="panel-black flex items-start justify-between gap-4 rounded-xl p-5"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-100">
                  {item.domain}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {item.note}
                </p>
              </div>
              <PhaseTag phase={item.phase} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          Want your country or domain next?{" "}
          <Link href="/contribute" className="text-cf-cyan hover:underline">
            Contribute or become a verifier →
          </Link>
        </p>
      </section>

      {/* Program browser */}
      <section id="programs" className="mt-6 scroll-mt-24">
        <CoveragePrograms />
      </section>
    </div>
  );
}
