import type { Metadata } from "next";
import Link from "next/link";
import { DATA_SOURCES } from "@/lib/data-sources";
import { PROGRAMS } from "@/lib/programs-data";
import { FRESHNESS_DAYS, globalStats, PACKAGES } from "@/lib/rights-packages";

/**
 * /data — open data: downloads, the schema, licenses and the read-only
 * API. The changelog is rendered from the history embedded in the data
 * files (updatedNote + lastChecked per program).
 */

export const metadata: Metadata = {
  title: "Open data",
  description:
    "Download every rights package as JSON or CSV, read the schema, the per-source license table and the read-only API. No key required for individuals.",
};

const REPO_URL = "https://github.com/bpecha14-ops/recovery-os";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function DataPage() {
  const stats = globalStats();
  const changelog = [...PROGRAMS]
    .sort((a, b) =>
      b.verification.lastChecked.localeCompare(a.verification.lastChecked),
    )
    .slice(0, 8);
  const liveSources = DATA_SOURCES.filter((s) => s.status === "live");

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Open data.
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400">
          The rules, the sources and the code are public. Every package is
          downloadable in the facts.json format, machine-readable and
          OpenFisca-compatible in spirit. No key required for individuals;
          fair-use rate limits apply.
        </p>
      </header>

      {/* Downloads */}
      <section id="downloads" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">Downloads</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <a
            href="/api/open-data/packages"
            className="panel-black group rounded-xl p-5 transition-colors hover:border-cf-cyan/30"
          >
            <p className="font-mono text-sm font-semibold text-cf-cyan group-hover:underline">
              Full dataset — JSON
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              {stats.packages} packages · {stats.programs} programs ·
              generated on request
            </p>
          </a>
          <a
            href="/api/open-data/csv"
            className="panel-black group rounded-xl p-5 transition-colors hover:border-cf-cyan/30"
          >
            <p className="font-mono text-sm font-semibold text-cf-cyan group-hover:underline">
              Full dataset — CSV
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              one row per program, all {stats.programs} programs
            </p>
          </a>
          <a
            href="/api/open-data/schema"
            className="panel-black group rounded-xl p-5 transition-colors hover:border-cf-cyan/30"
          >
            <p className="font-mono text-sm font-semibold text-cf-cyan group-hover:underline">
              JSON schema
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              facts.json format, documented from the real types
            </p>
          </a>
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          Per-package download: add{" "}
          <code className="rounded bg-cf-deep/70 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
            ?country=United%20States&amp;domain=benefits
          </code>{" "}
          to the JSON endpoint.
        </p>
      </section>

      {/* Schema documentation */}
      <section id="schema" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">The format</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Each package is a country × domain bundle: an OpenFisca-compatible
          variable prefix, a verifier signature, a{" "}
          <span className="font-mono text-xs text-zinc-300">
            valid_until
          </span>{" "}
          date ({FRESHNESS_DAYS} days after the last check), and the program
          records with their official sources. Legal clinics, NGOs and
          diaspora communities can author packages without a programmer.
        </p>
        <div className="panel-black mt-5 overflow-x-auto rounded-2xl">
          <table className="gold-table w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-cf-line">
                <th scope="col" className="px-5 py-3">Field</th>
                <th scope="col" className="px-5 py-3">Required</th>
                <th scope="col" className="px-5 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["package_id", "yes", "country-domain-quarter of the last check"],
                ["country / domain / language", "yes", "the bundle this package covers"],
                ["openfisca", "yes", "compatibility flag + variable prefix"],
                ["verifier", "sign-off", "named local verifier — null means PENDING"],
                ["valid_until", "yes", "expiry; expired packages auto-hide"],
                ["programs[].source", "yes", "url + checked_at + check status"],
                ["programs[].amount", "no", "display string; numeric value when verified"],
                ["programs[].eligibility", "yes", "deterministic rules the engine runs"],
                ["programs[].steps / documents / deadline", "no", "claiming path"],
                ["programs[].updated_at / updated_note", "yes", "changelog entry"],
              ].map(([field, req, meaning]) => (
                <tr key={field} className="border-b border-cf-line/60">
                  <td className="px-5 py-2.5 font-mono text-xs text-cf-gold">
                    {field}
                  </td>
                  <td className="px-5 py-2.5 text-zinc-400">{req}</td>
                  <td className="px-5 py-2.5 text-zinc-300">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Licenses */}
      <section id="licenses" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">Licenses</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          <li>
            <span className="font-medium text-zinc-100">Code:</span> open
            source —{" "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cf-cyan hover:underline"
            >
              github.com/bpecha14-ops/recovery-os
            </a>
          </li>
          <li>
            <span className="font-medium text-zinc-100">
              Data compilation &amp; metadata:
            </span>{" "}
            CC BY 4.0.
          </li>
          <li>
            <span className="font-medium text-zinc-100">
              Underlying official texts:
            </span>{" "}
            remain under their sources&apos; terms — see the table below.
          </li>
        </ul>

        <div className="panel-black mt-5 max-h-96 overflow-auto rounded-2xl">
          <table className="gold-table w-full min-w-[560px] text-left text-sm">
            <thead className="sticky top-0 bg-cf-base">
              <tr className="border-b border-cf-line">
                <th scope="col" className="px-5 py-3">Source</th>
                <th scope="col" className="px-5 py-3">Agency</th>
                <th scope="col" className="px-5 py-3">License</th>
                <th scope="col" className="px-5 py-3">Terms</th>
              </tr>
            </thead>
            <tbody>
              {liveSources.map((s) => (
                <tr key={s.id} className="border-b border-cf-line/60">
                  <td className="px-5 py-2.5 text-zinc-200">{s.name}</td>
                  <td className="px-5 py-2.5 text-xs text-zinc-400">
                    {s.agency}
                  </td>
                  <td className="px-5 py-2.5 text-xs text-zinc-400">
                    {s.license}
                  </td>
                  <td className="px-5 py-2.5">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-cf-cyan hover:underline"
                    >
                      {domainOf(s.url)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* API */}
      <section id="api" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">API (read-only)</h2>
        <div className="panel-black mt-5 space-y-3 rounded-2xl p-5 font-mono text-xs leading-relaxed text-zinc-300">
          <p>
            <span className="text-cf-cyan">GET</span> /api/open-data/packages
            <span className="text-zinc-500">
              {" "}
              — full facts.json dataset (filters: country, domain)
            </span>
          </p>
          <p>
            <span className="text-cf-cyan">GET</span> /api/open-data/csv
            <span className="text-zinc-500"> — one row per program</span>
          </p>
          <p>
            <span className="text-cf-cyan">GET</span> /api/open-data/schema
            <span className="text-zinc-500"> — the JSON schema</span>
          </p>
        </div>
        <p className="mt-3 text-sm text-zinc-400">
          No key required for individuals and non-profits. Rate limits:
          fair use — responses are cached for an hour; institutional SLAs
          and bulk feeds are covered on{" "}
          <Link href="/business" className="text-cf-cyan hover:underline">
            /business
          </Link>
          .
        </p>
      </section>

      {/* Changelog from the data files */}
      <section id="changelog" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-zinc-50">Recent changes</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Rendered from the history embedded in the data files — every
          program carries its update note and check date.
        </p>
        <ul className="mt-5 space-y-3">
          {changelog.map((p) => (
            <li
              key={p.id}
              className="panel-black rounded-xl p-4 text-sm leading-relaxed"
            >
              <span className="font-medium text-zinc-100">{p.name}</span>
              <span className="ml-2 font-mono text-[11px] text-zinc-500">
                {p.country} · checked {p.verification.lastChecked}
              </span>
              <p className="mt-1 text-zinc-400">{p.updatedNote}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 font-mono text-[11px] text-zinc-600">
        {PACKAGES.length} packages · {stats.programs} programs ·{" "}
        {liveSources.length} live sources — computed from the data files,
        never hardcoded.
      </p>
    </div>
  );
}
