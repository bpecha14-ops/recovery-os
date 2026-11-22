import { NextRequest, NextResponse } from "next/server";
import { PACKAGES, FRESHNESS_DAYS, type RightsPackage } from "@/lib/rights-packages";

/**
 * Read-only open data API — the full dataset in facts.json format.
 * No key required for individuals; fair-use rate limits apply.
 * Filter per package: ?country=United+States&domain=benefits
 */

function packageToFacts(p: RightsPackage) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    package_id: p.package_id,
    country: p.country,
    domain: p.domain,
    language: p.language,
    openfisca: p.openfisca,
    verifier: p.verifier, // null until a named local verifier signs (PENDING)
    valid_until: p.valid_until,
    status: p.valid_until >= today ? "live" : "expired",
    last_checked: p.lastChecked,
    programs: p.programs.map((pr) => ({
      id: pr.id,
      title: pr.name,
      summary: pr.summary,
      category: pr.category,
      agency: pr.agency,
      source: {
        url: pr.sourceUrl,
        quote: null, // exact quotes land with named-verifier sign-off
        checked_at: pr.verification.lastChecked,
        check: pr.verification.status,
      },
      amount: { display: pr.amount, value: null, currency: null, period: null },
      eligibility: pr.criteria,
      steps: pr.steps,
      documents: pr.documents,
      deadline: pr.deadlines,
      apply_url: pr.applyUrl,
      updated_note: pr.updatedNote,
      updated_at: pr.verification.lastChecked,
    })),
  };
}

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const domain = searchParams.get("domain");

  let list = PACKAGES;
  if (country) list = list.filter((p) => p.country === country);
  if (domain) list = list.filter((p) => p.domain === domain);

  return NextResponse.json(
    {
      generated_at: new Date().toISOString(),
      freshness_policy_days: FRESHNESS_DAYS,
      license: "CC BY 4.0 (compilation and metadata); official texts remain under their sources' terms",
      packages: list.map(packageToFacts),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
