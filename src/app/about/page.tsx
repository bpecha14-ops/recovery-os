import type { Metadata } from "next";
import Link from "next/link";
import { globalStats } from "@/lib/rights-packages";

/**
 * /about — the mission, why it's free, the three growth phases, the
 * team so far, contact.
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "An open layer of verified rights: the mission, why it's free for individuals, the three growth phases and how to reach us.",
};

const PHASES = [
  {
    tag: "Live" as const,
    title: "Phase 1 — money & benefits",
    body: "Benefits, compensations, tax credits, refunds and unclaimed money: the domains where official open data is densest and a wrong answer is easiest to catch.",
  },
  {
    tag: "Next" as const,
    title: "Phase 2 — pensions & social insurance",
    body: "Stable, well-documented sources with long notice periods — the natural second layer.",
  },
  {
    tag: "Partner-gated pilot" as const,
    title: "Phase 3 — housing, land, inheritance, labor",
    body: "Only with a named local lawyer-partner. Land rights launch as a single-country pilot, never a worldwide promise.",
  },
];

export default function AboutPage() {
  const stats = globalStats();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        About CivicClaim.
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-400">
        CivicClaim is an open layer of verified citizens&apos; rights and
        entitlements. A person answers a few questions and receives every
        right the law may give them — money and benefits now, pensions
        next, housing and land later — each with an official source, a
        verification date and a concrete next step. No source, no result.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-50">
          Why it&apos;s free for individuals
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Rights information is public by law — the only fair product is
          one where individuals never pay. The free citizen layer is
          funded by institutions (agencies, insurers, researchers) who pay
          for API access, bulk data and service guarantees, and by
          sponsors who finance new countries and languages. Individual
          requests are never sold. The data and the code are public, so
          the layer can outlive any single team.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-50">The growth phases</h2>
        <div className="mt-5 space-y-4">
          {PHASES.map((phase) => (
            <div
              key={phase.title}
              className="panel-black rounded-xl p-5"
            >
              <p className="text-sm font-semibold text-zinc-100">
                {phase.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {phase.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-50">
          The team and verifiers so far
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The project is built and maintained by a small independent team;
          the data layer carries{" "}
          <span className="tabular font-mono text-zinc-200">
            {stats.programs}
          </span>{" "}
          programs across{" "}
          <span className="tabular font-mono text-zinc-200">
            {stats.countries}
          </span>{" "}
          countries, checked against{" "}
          <span className="tabular font-mono text-zinc-200">
            {stats.sources}
          </span>{" "}
          official sources. Named local verifiers — legal aid attorneys,
          paralegals and clinics — sign packages one by one; until they
          do, packages carry the labeled PENDING state rather than an
          invented signature. If you can verify a country or domain,{" "}
          <Link href="/contribute" className="text-cf-cyan hover:underline">
            join the verifier list →
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-50">Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Questions, corrections and partnership proposals: open an issue
          in the{" "}
          <a
            href="https://github.com/bpecha14-ops/recovery-os"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cf-cyan hover:underline"
          >
            public repository
          </a>{" "}
          — that is the fastest channel and everything stays on the
          record.
        </p>
      </section>
    </div>
  );
}
