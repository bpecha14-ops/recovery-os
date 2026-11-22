import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  Landmark,
} from "lucide-react";
import { PROGRAMS } from "@/lib/programs-data";
import {
  DOMAIN_BY_CATEGORY,
  DOMAIN_LABELS,
  DOMAIN_PHASE,
  FRESHNESS_DAYS,
  livePackages,
  packageForProgram,
  programHref,
  slugify,
} from "@/lib/rights-packages";
import {
  FreshnessBadge,
  PhaseTag,
  QuoteBlock,
  VerifierCard,
} from "@/components/civic/primitives";
import { ReportError } from "@/components/civic/report-error";

/**
 * /programs/[country]/[name] — one honest page per program, generated
 * from its package record. Missing fields hide their section; expired
 * packages show the re-verification state with a direct official link.
 */

const SITUATION_LABELS: Record<string, string> = {
  senior: "retirement age",
  disability: "a disability or long-term condition",
  veteran: "veteran or serving status",
  parent: "children in the household",
  newcomer: "newcomer status",
  disaster: "a recent disaster",
  farmer: "farming or cultivable land",
};

const RESIDENCY_LABELS: Record<string, string> = {
  citizen: "citizens",
  "permanent-resident": "permanent residents",
  "valid-visa": "valid visa / permit holders",
  any: "any residency status",
};

const EMPLOYMENT_LABELS: Record<string, string> = {
  employed: "employed",
  unemployed: "unemployed",
  retired: "retired",
  student: "studying",
  any: "any employment",
};

function regionFlag(code: string): string {
  if (code.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

function eligibilityBullets(criteria: {
  residency?: string[];
  ageMin?: number;
  ageMax?: number;
  income?: string;
  household?: string;
  employment?: string[];
  situations?: string[];
  housing?: string;
}): string[] {
  const out: string[] = [];
  if (criteria.residency?.length)
    out.push(
      `Residency: ${criteria.residency.map((r) => RESIDENCY_LABELS[r] ?? r).join(", ")}`,
    );
  if (criteria.ageMin !== undefined && criteria.ageMax !== undefined)
    out.push(`Age between ${criteria.ageMin} and ${criteria.ageMax}`);
  else if (criteria.ageMin !== undefined)
    out.push(`Age ${criteria.ageMin} or older`);
  else if (criteria.ageMax !== undefined)
    out.push(`Age ${criteria.ageMax} or younger`);
  if (criteria.income === "low")
    out.push("Means-tested — low or modest household income");
  if (criteria.household === "children")
    out.push("Children under 18 in the household");
  if (criteria.employment?.length && !criteria.employment.includes("any"))
    out.push(
      `Employment: ${criteria.employment.map((e) => EMPLOYMENT_LABELS[e] ?? e).join(", ")}`,
    );
  if (criteria.situations?.length)
    out.push(
      `Applies if you are: ${criteria.situations.map((s) => SITUATION_LABELS[s] ?? s).join(" · ")}`,
    );
  if (criteria.housing === "renter") out.push("Renting your home");
  if (out.length === 0) out.push("No special conditions published — check the official page");
  return out;
}

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({
    country: slugify(p.country),
    name: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const program = PROGRAMS.find((p) => p.id === name);
  if (!program) return { title: "Program" };
  return {
    title: `${program.name} — ${program.country}`,
    description: `${program.summary} Official source and verification date included.`,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ country: string; name: string }>;
}) {
  const { country, name } = await params;
  const program = PROGRAMS.find(
    (p) => p.id === name && slugify(p.country) === country,
  );
  if (!program) notFound();

  const pkg = packageForProgram(program);
  const domain = DOMAIN_BY_CATEGORY[program.category];
  const phase = DOMAIN_PHASE[domain];
  const isLive = pkg ? livePackages().some((x) => x.package_id === pkg.package_id) : false;

  // Expired package — honest re-verification state with the official link.
  if (!isLive && pkg) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <div className="panel-black rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-50">{program.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            This package is being re-verified against its official source —
            it is temporarily hidden from search and results. It was last
            verified on {pkg.lastChecked}; the validity window is{" "}
            {FRESHNESS_DAYS} days.
          </p>
          <a
            href={program.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-cf-cyan/40 bg-cf-cyan/10 px-4 py-2 text-sm font-medium text-cf-cyan hover:bg-cf-cyan/20"
          >
            Go to the official source now
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  const bullets = eligibilityBullets(program.criteria);
  const related = (pkg?.programs ?? [])
    .filter((p) => p.id !== program.id)
    .slice(0, 3);
  const applyDomain = (() => {
    try {
      return new URL(program.applyUrl).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      {/* 1. Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="text-2xl">
            {regionFlag(pkg?.region ?? "US")}
          </span>
          <FreshnessBadge program={program} />
          <PhaseTag phase={phase} />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {program.name}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">
          {program.summary}
        </p>
        <p className="mt-2 font-mono text-xs text-zinc-500">
          {program.country} · {program.jurisdiction} · {program.agency}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {/* 2. Am I eligible? */}
        <section id="eligibility" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <CheckCircle2 className="h-4 w-4 text-cf-teal" aria-hidden="true" />
            Am I eligible? You may qualify if…
          </h2>
          <ul className="panel-black mt-4 space-y-2.5 rounded-2xl p-5 text-sm text-zinc-300">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cf-gold"
                />
                {b}
              </li>
            ))}
          </ul>
          <Link
            href={`/tools?program=${program.id}#eligibility`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cf-cyan hover:underline"
          >
            Check in the wizard — your answers stay in your browser
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>

        {/* 3. How much */}
        <section id="amount" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-zinc-50">How much</h2>
          <div className="panel-black mt-4 rounded-2xl p-5">
            <p className="font-mono text-sm leading-relaxed text-zinc-100">
              {program.amount}
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              as of {program.verification.lastChecked} · figures follow the
              official source; exact amounts depend on your situation
            </p>
          </div>
        </section>

        {/* 4. How to claim */}
        <section id="claim" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
            <ClipboardList className="h-4 w-4 text-cf-cyan" aria-hidden="true" />
            How to claim
          </h2>
          <ol className="panel-black mt-4 space-y-3 rounded-2xl p-5 text-sm leading-relaxed text-zinc-300">
            {program.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cf-cyan/40 font-mono text-[11px] text-cf-cyan"
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="panel-black rounded-2xl p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <FileText className="h-4 w-4 text-cf-gold" aria-hidden="true" />
                What to prepare
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {program.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500"
                    />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel-black flex flex-col rounded-2xl p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <CalendarClock className="h-4 w-4 text-cf-gold" aria-hidden="true" />
                Deadlines
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {program.deadlines}
              </p>
              <a
                href={program.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 rounded-lg border border-cf-gold/40 bg-cf-gold/10 px-4 py-2.5 pt-2.5 text-sm font-semibold text-amber-200 transition-colors hover:bg-cf-gold/20 hover:text-amber-100"
                style={{ marginTop: "auto" }}
              >
                <Landmark className="h-4 w-4" aria-hidden="true" />
                Apply on the official site
                {applyDomain && (
                  <span className="font-mono text-[11px] font-normal text-zinc-500">
                    {applyDomain}
                  </span>
                )}
              </a>
            </div>
          </div>
        </section>

        {/* 5. From the official source */}
        <section id="source" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-zinc-50">
            From the official source
          </h2>
          <div className="mt-4">
            <QuoteBlock
              url={program.sourceUrl}
              checkedAt={program.verification.lastChecked}
            />
            <a
              href={program.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-cf-cyan hover:underline"
            >
              See the full source page
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* 6. Verified by */}
        <section id="verifier" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-zinc-50">Verified by</h2>
          <div className="mt-4">
            <VerifierCard
              program={program}
              validUntil={pkg?.valid_until ?? program.verification.lastChecked}
            />
          </div>
        </section>

        {/* 7. Report an error */}
        <ReportError programId={program.id} programName={program.name} />

        {/* 8. Changes */}
        <section id="changes" className="scroll-mt-24">
          <h2 className="text-lg font-semibold text-zinc-50">Changes</h2>
          <div className="panel-black mt-4 rounded-2xl p-5">
            <p className="text-sm leading-relaxed text-zinc-300">
              {program.updatedNote}
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              last checked {program.verification.lastChecked} · status:{" "}
              {program.verification.status}
            </p>
          </div>
        </section>

        {/* 9. Related programs from the same package */}
        {related.length > 0 && (
          <section id="related" className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-zinc-50">
              Related programs — {pkg?.country}, {DOMAIN_LABELS[domain]}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={programHref(p)}
                  className="panel-black group rounded-xl p-4 transition-colors hover:border-cf-cyan/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-zinc-100 group-hover:text-cf-cyan">
                      {p.name}
                    </p>
                    <FreshnessBadge program={p} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                    {p.summary}
                  </p>
                  {/* Plain mono source line — a nested <a> inside the card
                      link would be invalid HTML and break hydration. */}
                  <p className="mt-3 font-mono text-[11px] text-zinc-500">
                    {new URL(p.sourceUrl).hostname.replace(/^www\./, "")} ·
                    checked {p.verification.lastChecked}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
