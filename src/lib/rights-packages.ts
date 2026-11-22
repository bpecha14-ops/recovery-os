/**
 * CivicClaim — "Rights Packages" data layer.
 *
 * Every country × domain bundle is an open rights package in the spirit of
 * the facts.json format: an OpenFisca-compatible variable prefix, a
 * verifier signature, a valid_until date and the program records with
 * their official sources. Packages are DERIVED from programs-data.ts at
 * module load — counts and dates are always computed, never hardcoded.
 *
 * Honesty rules baked in:
 * - verifier is null until a named local verifier signs the package
 *   (the UI shows the labeled PENDING state — a name is never invented);
 * - valid_until = lastChecked + 180 days (the freshness policy published
 *   on /method); packages past valid_until are excluded by livePackages();
 * - no aggregate money figures are computed here — only program counts
 *   and dates, which are fully traceable.
 */

import {
  PROGRAMS,
  type Program,
  type ProgramCategory,
  type RegionCode,
  REGIONS,
} from "./programs-data";

export type Domain = "benefits" | "pensions" | "housing";

export const DOMAIN_BY_CATEGORY: Record<ProgramCategory, Domain> = {
  benefit: "benefits",
  compensation: "benefits",
  refund: "benefits",
  "tax-credit": "benefits",
  unclaimed: "benefits",
  disaster: "benefits",
  healthcare: "benefits",
  pension: "pensions",
  housing: "housing",
};

export const DOMAIN_LABELS: Record<Domain, string> = {
  benefits: "Money & benefits",
  pensions: "Pensions & social insurance",
  housing: "Housing rights",
};

/** Roadmap phases shown with PhaseTag across the site. */
export const DOMAIN_PHASE: Record<Domain, "live" | "next" | "partner"> = {
  benefits: "live",
  pensions: "next",
  housing: "partner",
};

export const FRESHNESS_DAYS = 180;

export interface Verifier {
  name: string;
  role: string;
  org: string;
  verified_at: string;
}

export interface RightsPackage {
  package_id: string;
  country: string;
  region: RegionCode;
  domain: Domain;
  language: string;
  openfisca: { compatible: true; variable_prefix: string };
  /** null until a named local verifier signs the package (PENDING). */
  verifier: Verifier | null;
  valid_until: string;
  lastChecked: string;
  programs: Program[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function regionOfCountry(country: string): RegionCode {
  for (const r of REGIONS) if (r.countries.includes(country)) return r.code;
  return REGIONS[0].code;
}

function prefixOf(country: string, domain: Domain): string {
  const words = slugify(country).split("-").slice(0, 2).join("_");
  return `${words}_${domain}`;
}

function quarterOf(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCFullYear()}q${Math.floor(d.getUTCMonth() / 3) + 1}`;
}

/* ------------------------------------------------------------------ */
/* Package construction                                                */
/* ------------------------------------------------------------------ */

function buildPackages(): RightsPackage[] {
  const groups = new Map<string, Program[]>();
  for (const p of PROGRAMS) {
    const domain = DOMAIN_BY_CATEGORY[p.category];
    const key = `${p.country}::${domain}`;
    const list = groups.get(key);
    if (list) list.push(p);
    else groups.set(key, [p]);
  }

  const packages: RightsPackage[] = [];
  for (const [key, programs] of groups) {
    const [country, domain] = key.split("::") as [string, Domain];
    const lastChecked = programs
      .map((p) => p.verification.lastChecked)
      .sort()
      .at(-1)!;
    packages.push({
      package_id: `${slugify(country)}-${domain}-${quarterOf(lastChecked)}`,
      country,
      region: regionOfCountry(country),
      domain,
      language: "en",
      openfisca: { compatible: true, variable_prefix: prefixOf(country, domain) },
      verifier: null, // PENDING — a named verifier signs packages manually
      valid_until: addDays(lastChecked, FRESHNESS_DAYS),
      lastChecked,
      programs: [...programs].sort((a, b) => a.name.localeCompare(b.name)),
    });
  }
  return packages.sort((a, b) => a.country.localeCompare(b.country));
}

export const PACKAGES: RightsPackage[] = buildPackages();

/** Packages whose freshness window is still open (used by every list). */
export function livePackages(today = new Date()): RightsPackage[] {
  const now = today.toISOString().slice(0, 10);
  return PACKAGES.filter((p) => p.valid_until >= now);
}

export function packageForProgram(p: Program): RightsPackage | undefined {
  return PACKAGES.find(
    (pkg) =>
      pkg.country === p.country && pkg.domain === DOMAIN_BY_CATEGORY[p.category],
  );
}

export function getProgram(id: string): Program | undefined {
  return PROGRAMS.find((p) => p.id === id);
}

export function programHref(p: Program): string {
  return `/programs/${slugify(p.country)}/${p.id}`;
}

/* ------------------------------------------------------------------ */
/* Coverage matrix & stats — computed, never hardcoded                  */
/* ------------------------------------------------------------------ */

export interface CoverageRow {
  country: string;
  region: RegionCode;
  domains: Partial<Record<Domain, number>>;
  livePrograms: number;
  lastChecked: string;
}

export function coverageMatrix(today?: Date): CoverageRow[] {
  const rows = new Map<string, CoverageRow>();
  for (const pkg of livePackages(today)) {
    let row = rows.get(pkg.country);
    if (!row) {
      row = {
        country: pkg.country,
        region: pkg.region,
        domains: {},
        livePrograms: 0,
        lastChecked: pkg.lastChecked,
      };
      rows.set(pkg.country, row);
    }
    row.domains[pkg.domain] = pkg.programs.length;
    row.livePrograms += pkg.programs.length;
    if (pkg.lastChecked > row.lastChecked) row.lastChecked = pkg.lastChecked;
  }
  return [...rows.values()].sort(
    (a, b) => b.livePrograms - a.livePrograms || a.country.localeCompare(b.country),
  );
}

export function globalStats(today?: Date) {
  const live = livePackages(today);
  const programs = live.reduce((n, p) => n + p.programs.length, 0);
  const countries = new Set(live.map((p) => p.country)).size;
  const sources = new Set(
    live.flatMap((p) => p.programs.map((pr) => pr.sourceUrl)),
  ).size;
  const lastChecked = live.map((p) => p.lastChecked).sort().at(-1) ?? "";
  return { programs, countries, sources, packages: live.length, lastChecked };
}

/* ------------------------------------------------------------------ */
/* Verdict language — maps the deterministic engine onto the public     */
/* vocabulary: Eligible / Likely eligible / Borderline — check officially */
/* ------------------------------------------------------------------ */

export type PublicVerdict = "eligible" | "likely" | "borderline";

export function publicVerdict(m: {
  verdict: "match" | "near-miss" | "no";
  unknowns: unknown[];
}): PublicVerdict {
  if (m.verdict === "no") throw new Error("no-match results are never shown");
  if (m.verdict === "near-miss") return "borderline";
  return m.unknowns.length > 0 ? "likely" : "eligible";
}

export const VERDICT_LABELS: Record<PublicVerdict, string> = {
  eligible: "Eligible",
  likely: "Likely eligible",
  borderline: "Borderline — check officially",
};

export const VERDICT_STYLES: Record<PublicVerdict, string> = {
  eligible: "border-cf-teal/40 bg-cf-teal/10 text-cf-teal",
  likely: "border-cf-teal/30 bg-cf-teal/5 text-cf-teal/90",
  borderline: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};
