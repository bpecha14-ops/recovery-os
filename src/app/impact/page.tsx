import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/programs-data";
import { globalStats } from "@/lib/rights-packages";

/**
 * /impact — honest by design. Until real usage exists, the page shows a
 * clearly labeled pre-launch state; no usage numbers are fabricated.
 * The public "Errors we found and fixed" feed renders from the
 * changelog embedded in the data files.
 */

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Honest by design: a labeled pre-launch state and a public feed of errors we found and fixed, rendered from the changelog.",
};

export default function ImpactPage() {
  const stats = globalStats();
  const fixes = [...PROGRAMS]
    .sort((a, b) =>
      b.verification.lastChecked.localeCompare(a.verification.lastChecked),
    )
    .slice(0, 10);
  const verifiedCount = PROGRAMS.filter(
    (p) => p.verification.status === "verified",
  ).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        Impact.
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-400">
        Trust is built on honesty about what has and has not happened.
        This page will never show a number it cannot source.
      </p>

      {/* Pre-launch state — clearly labeled */}
      <section className="mt-10">
        <div className="rounded-2xl border border-cf-cyan/30 bg-cf-cyan/[0.06] p-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-cf-cyan/40 bg-cf-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cf-cyan">
            Pre-launch
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            The platform has not launched publicly, so there are no usage
            numbers yet — none are invented here. When CivicClaim is live,
            this page will carry anonymous aggregates only: runs by
            country and domain, result counts, pilot outcomes with dates
            and participant counts, and the error-report record below.
            Each figure will carry its own as-of date.
          </p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Programs in the open data
              </dt>
              <dd className="tabular mt-1 font-mono text-2xl font-semibold text-cf-gold">
                {stats.programs}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Human-verified records
              </dt>
              <dd className="tabular mt-1 font-mono text-2xl font-semibold text-cf-gold">
                {verifiedCount}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Countries covered
              </dt>
              <dd className="tabular mt-1 font-mono text-2xl font-semibold text-cf-gold">
                {stats.countries}
              </dd>
            </div>
          </dl>
          <p className="mt-4 font-mono text-[11px] text-zinc-500">
            as of {stats.lastChecked} · computed from the data files ·{" "}
            <a href="/method#counts" className="text-cf-cyan hover:underline">
              how we count
            </a>
          </p>
        </div>
      </section>

      {/* Errors we found and fixed — from the changelog */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-50">
          Errors we found and fixed
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Rendered from the changelog embedded in the data files — the same
          feed as the open-data downloads. This is what builds trust with
          funders and users: not the absence of errors, but the visible
          handling of them.
        </p>
        <ul className="mt-5 space-y-3">
          {fixes.map((p) => (
            <li key={p.id} className="panel-black rounded-xl p-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium text-zinc-100">{p.name}</span>
                <span className="font-mono text-[11px] text-zinc-500">
                  {p.verification.lastChecked}
                </span>
              </div>
              <p className="mt-1 leading-relaxed text-zinc-400">
                {p.updatedNote}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
