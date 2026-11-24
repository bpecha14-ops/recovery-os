import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink, ShieldQuestion } from "lucide-react";
import type { Program } from "@/lib/programs-data";
import { packageForProgram } from "@/lib/rights-packages";

/**
 * Civic Futurism shared primitives — the vocabulary every page speaks:
 * SourceChip, FreshnessBadge, PhaseTag, QuoteBlock, VerifierCard,
 * StatCard. Data discipline: if a field is missing, the component shows
 * the labeled PENDING state — it never invents a value.
 */

/* ------------------------------------------------------------------ */
/* SourceChip — mono, domain, checked date; opens the official page.   */
/* ------------------------------------------------------------------ */

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourceChip({
  url,
  checkedAt,
  label,
  className = "",
}: {
  url: string;
  checkedAt?: string;
  label?: string;
  className?: string;
}) {
  const domain = domainOf(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full items-center gap-1.5 rounded-md border border-cf-line bg-cf-deep/70 px-2 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:border-cf-cyan/40 hover:text-cf-cyan ${className}`}
    >
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span className="truncate">
        {label ?? `Source: ${domain}`}
        {checkedAt ? ` · checked ${checkedAt}` : ""}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* FreshnessBadge — Verified (teal) / Needs re-check (amber).          */
/* Expired content is hidden entirely upstream — never badged red.     */
/* ------------------------------------------------------------------ */

export function FreshnessBadge({ program }: { program: Program }) {
  const verified = program.verification.status === "verified";
  const month = program.verification.lastChecked.slice(0, 7);
  const [y, m] = month.split("-");
  const monthName = new Date(Number(y), Number(m) - 1, 1).toLocaleString(
    "en-US",
    { month: "short" },
  );
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        verified
          ? "border-cf-teal/30 bg-cf-teal/10 text-cf-teal"
          : "border-amber-400/30 bg-amber-400/10 text-amber-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${verified ? "bg-cf-teal" : "bg-amber-400"}`}
        aria-hidden="true"
      />
      {verified
        ? `Verified · ${monthName} ${y}`
        : "Needs re-check · auto-extracted"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* PhaseTag — Live / Next / Partner-gated pilot.                       */
/* ------------------------------------------------------------------ */

export function PhaseTag({ phase }: { phase: "live" | "next" | "partner" }) {
  const map = {
    live: { label: "Live", cls: "border-cf-teal/30 bg-cf-teal/10 text-cf-teal" },
    next: { label: "Next", cls: "border-cf-cyan/30 bg-cf-cyan/10 text-cf-cyan" },
    partner: {
      label: "Partner-gated pilot",
      cls: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    },
  } as const;
  const v = map[phase];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${v.cls}`}
    >
      {v.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* QuoteBlock — serif italic official quote with a gold left rule.     */
/* Rendered ONLY when the record carries an exact quote; otherwise the */
/* section is hidden (never guessed).                                  */
/* ------------------------------------------------------------------ */

export function QuoteBlock({
  quote,
  url,
  checkedAt,
}: {
  quote?: string;
  url: string;
  checkedAt?: string;
}) {
  return (
    <figure className="rounded-xl border border-cf-line bg-cf-base/60 p-5">
      {quote ? (
        <blockquote className="border-l-2 border-cf-gold pl-4 font-serif text-base italic leading-relaxed text-zinc-200">
          “{quote}”
        </blockquote>
      ) : (
        <p className="pl-4 font-serif text-sm italic leading-relaxed text-zinc-400">
          Exact source quote pending verification — the link and the checked
          date below are live.
        </p>
      )}
      <figcaption className="mt-3">
        <SourceChip url={url} checkedAt={checkedAt} />
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* VerifierCard — seal-gold ring, name, role, org, date.               */
/* Verifier names are never invented: until a package is signed by a    */
/* named local verifier, the card shows the PENDING state.             */
/* ------------------------------------------------------------------ */

export function VerifierCard({
  program,
  validUntil,
}: {
  program: Program;
  validUntil: string;
}) {
  const pkg = packageForProgram(program);
  const verifier = pkg?.verifier ?? null;
  return (
    <div className="flex items-start gap-4 rounded-xl border border-cf-line bg-cf-base/60 p-5">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cf-gold/50 bg-cf-gold/10 font-serif text-lg text-cf-gold shadow-[0_0_18px_-6px_rgba(217,164,65,0.5)]"
      >
        {verifier ? verifier.name.charAt(0) : "—"}
      </span>
      <div className="min-w-0">
        {verifier ? (
          <>
            <p className="text-sm font-semibold text-zinc-100">
              {verifier.name}
            </p>
            <p className="text-xs text-zinc-400">
              {verifier.role}
              {verifier.org ? ` · ${verifier.org}` : ""}
            </p>
            <p className="mt-1 font-mono text-[11px] text-zinc-500">
              verified this package on {verifier.verified_at}
            </p>
          </>
        ) : (
          <p className="flex items-start gap-2 text-sm text-zinc-400">
            <ShieldQuestion
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80"
              aria-hidden="true"
            />
            <span>
              <span className="font-medium text-amber-300">
                PENDING — hidden until verified.
              </span>{" "}
              This package still awaits a named local verifier (legal aid
              attorney, paralegal or clinic). Every figure above links to its
              official source and check date.
            </span>
          </p>
        )}
        {pkg && (
          <p className="mt-2 font-mono text-[11px] text-zinc-500">
            Package: {pkg.package_id} · valid until {validUntil}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StatCard — big mono number + label + as-of date + method link.      */
/* ------------------------------------------------------------------ */

export function StatCard({
  value,
  label,
  asOf,
  href = "/method#counts",
}: {
  value: ReactNode;
  label: string;
  asOf: string;
  href?: string;
}) {
  return (
    <div className="panel-black rounded-xl p-5">
      <p className="tabular font-mono text-3xl font-semibold text-zinc-50">
        {value}
      </p>
      <p className="mt-1.5 text-sm text-zinc-300">{label}</p>
      <p className="mt-2 font-mono text-[11px] text-zinc-500">
        as of {asOf} ·{" "}
        <Link href={href} className="text-cf-cyan hover:underline">
          how we count
        </Link>
      </p>
    </div>
  );
}
