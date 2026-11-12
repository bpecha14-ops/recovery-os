/**
 * CivicClaim OS — deterministic eligibility engine.
 *
 * The engine evaluates structured criteria from programs-data against an
 * anonymous user profile. It NEVER sends the profile anywhere: matching runs
 * in the browser. Every result carries per-criterion reasons so the UI can
 * explain WHY a program matches (transparency requirement).
 */

import {
  Program,
  ProgramCategory,
  RegionCode,
  PROGRAMS,
} from "./programs-data";

export interface Profile {
  region: RegionCode | null;
  country: string | null;
  categories: ProgramCategory[];
  age: number | null;
  residency: string | null; // citizen | permanent-resident | valid-visa | other
  income: string | null; // low | medium | high | unsure
  household: string | null; // children | no-children
  employment: string | null; // employed | unemployed | retired | student
  situations: string[]; // senior | disability | veteran | parent | newcomer | disaster
  housing: string | null; // renter | homeowner | other
}

export type CriterionKey =
  | "residency"
  | "age"
  | "income"
  | "household"
  | "employment"
  | "situation"
  | "housing"
  | "country";

export interface CriterionResult {
  key: CriterionKey;
  /** true = satisfied, false = not satisfied, null = unknown/needs confirmation */
  ok: boolean | null;
}

export interface MatchResult {
  program: Program;
  criteria: CriterionResult[];
  unmet: CriterionResult[];
  unknowns: CriterionResult[];
  /** match = all hard criteria satisfied; near-miss = exactly one unmet */
  verdict: "match" | "near-miss" | "no";
}

const RESIDENCY_ORDER = ["valid-visa", "permanent-resident", "citizen", "any"];

function residencyOk(required: string[] | undefined, answer: string | null): boolean | null {
  if (!required || required.includes("any")) return true;
  if (!answer) return null;
  if (required.includes(answer)) return true;
  return false;
}

function ageOk(p: Program, age: number | null): boolean | null {
  const { ageMin, ageMax } = p.criteria;
  if (ageMin === undefined && ageMax === undefined) return true;
  if (age === null || Number.isNaN(age)) return null;
  if (ageMin !== undefined && age < ageMin) return false;
  if (ageMax !== undefined && age > ageMax) return false;
  return true;
}

function incomeOk(required: "low" | "any" | undefined, answer: string | null): boolean | null {
  if (!required || required === "any") return true;
  if (required === "low") {
    if (answer === "low") return true;
    if (answer === "unsure" || answer === null) return null;
    return false;
  }
  return true;
}

function householdOk(required: "children" | "any" | undefined, answer: string | null): boolean | null {
  if (!required || required === "any") return true;
  if (answer === null) return null;
  return required === answer;
}

function employmentOk(required: string[] | undefined, answer: string | null): boolean | null {
  if (!required || required.includes("any")) return true;
  if (!answer) return null;
  return required.includes(answer);
}

function situationOk(required: string[] | undefined, answers: string[]): boolean | null {
  if (!required || required.length === 0) return true;
  if (answers.length === 0) return null;
  return required.some((s) => answers.includes(s));
}

function housingOk(required: "renter" | "any" | undefined, answer: string | null): boolean | null {
  if (!required || required === "any") return true;
  if (answer === null) return null;
  return required === answer;
}

export function evaluateProgram(p: Program, profile: Profile): MatchResult {
  const criteria: CriterionResult[] = [];

  const countryOk = !profile.country || p.country === profile.country;
  criteria.push({ key: "country", ok: countryOk });

  criteria.push({ key: "residency", ok: residencyOk(p.criteria.residency, profile.residency) });
  criteria.push({ key: "age", ok: ageOk(p, profile.age) });
  criteria.push({ key: "income", ok: incomeOk(p.criteria.income, profile.income) });
  criteria.push({ key: "household", ok: householdOk(p.criteria.household, profile.household) });
  criteria.push({ key: "employment", ok: employmentOk(p.criteria.employment, profile.employment) });
  criteria.push({ key: "situation", ok: situationOk(p.criteria.situations, profile.situations) });
  criteria.push({ key: "housing", ok: housingOk(p.criteria.housing, profile.housing) });

  const unmet = criteria.filter((c) => c.ok === false);
  const unknowns = criteria.filter((c) => c.ok === null);

  let verdict: MatchResult["verdict"] = "no";
  if (unmet.length === 0) verdict = "match";
  else if (unmet.length === 1 && unknowns.length <= 2) verdict = "near-miss";

  return { program: p, criteria, unmet, unknowns, verdict };
}

export function findMatches(profile: Profile): MatchResult[] {
  if (!profile.country) return [];
  const shortlist = PROGRAMS.filter(
    (p) =>
      p.country === profile.country &&
      (profile.categories.length === 0 || profile.categories.includes(p.category)),
  );
  return shortlist
    .map((p) => evaluateProgram(p, profile))
    .filter((r) => r.verdict !== "no")
    .sort((a, b) => {
      const rank = { match: 0, "near-miss": 1, no: 2 } as const;
      if (rank[a.verdict] !== rank[b.verdict]) return rank[a.verdict] - rank[b.verdict];
      return a.unmet.length + a.unknowns.length - (b.unmet.length + b.unknowns.length);
    });
}

/** Human label for a criterion result — keys map to dictionary strings. */
export function criterionLabelKey(key: CriterionKey): string {
  return key;
}

export const emptyProfile: Profile = {
  region: null,
  country: null,
  categories: [],
  age: null,
  residency: null,
  income: null,
  household: null,
  employment: null,
  situations: [],
  housing: null,
};
