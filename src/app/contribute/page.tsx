import type { Metadata } from "next";
import Link from "next/link";
import { ReportError } from "@/components/civic/report-error";

/**
 * /contribute — add your country or domain. Three paths: report an
 * error, suggest a program, become a named verifier or partner. Plus
 * the no-programmer authoring flow and the published response times.
 */

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Add your country or domain: report an error, suggest a program, or become a named verifier. The authoring flow needs no programmer.",
};

const REPO_URL = "https://github.com/bpecha14-ops/recovery-os";

const FLOW = [
  "Take the package template (facts.json)",
  "Fill in the rules, quotes from official sources and the expiry",
  "The automated validator checks: links alive, quote text unchanged, verifier present",
  "A named human verifier signs the package",
  "The package goes live — search, wizard, API",
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        Add your country or domain.
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-400">
        CivicClaim grows one verified package at a time. Legal clinics,
        NGOs and diaspora communities author them — no programmer needed.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Report an error",
            body: "Found a figure that disagrees with the official page? Every program page has the button; we respond within 5 working days.",
            cta: { href: "/coverage#programs", label: "Browse programs" },
          },
          {
            title: "Suggest a program",
            body: "A program we don't list yet? Open an issue with the official source link — that's all we need to start.",
            cta: { href: `${REPO_URL}/issues/new`, label: "Open an issue" },
          },
          {
            title: "Become a verifier",
            body: "Legal aid attorneys, paralegals and clinics sign packages for their country or domain — name, role and date on every page.",
            cta: { href: "mailto:civicclaim-reports@users.noreply.github.com", label: "Talk to us" },
          },
        ].map((card) => (
          <div key={card.title} className="panel-black rounded-xl p-5">
            <h2 className="text-sm font-semibold text-zinc-100">
              {card.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {card.body}
            </p>
            <a
              href={card.cta.href}
              className="mt-3 inline-block text-xs font-medium text-cf-cyan hover:underline"
            >
              {card.cta.label} →
            </a>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-50">The authoring flow</h2>
        <ol className="mt-5 space-y-3">
          {FLOW.map((step, i) => (
            <li
              key={step}
              className="panel-black flex items-start gap-4 rounded-xl p-4"
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cf-gold/40 font-mono text-xs text-cf-gold"
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-zinc-300">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          The format is OpenFisca-compatible and documented in{" "}
          <Link href="/data#schema" className="text-cf-cyan hover:underline">
            the schema
          </Link>
          . Download an existing package from{" "}
          <Link href="/data#downloads" className="text-cf-cyan hover:underline">
            the data page
          </Link>{" "}
          as a starting point.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-50">
          Repository, license, conduct
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-400">
          <li>
            Repository:{" "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cf-cyan hover:underline"
            >
              github.com/bpecha14-ops/recovery-os
            </a>
          </li>
          <li>Data compilation: CC BY 4.0 · code: open source</li>
          <li>
            Conduct: be constructive, cite sources, assume good faith —
            issues that don&apos;t, get closed.
          </li>
          <li>
            Published response times: error reports within 5 working days;
            program suggestions within 10.
          </li>
        </ul>
      </section>

      <div id="report" className="mt-12 scroll-mt-24">
        <ReportError programId="general" programName="CivicClaim" />
      </div>
    </div>
  );
}
