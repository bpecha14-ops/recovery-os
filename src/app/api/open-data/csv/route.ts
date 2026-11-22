import { NextRequest, NextResponse } from "next/server";
import { PROGRAMS } from "@/lib/programs-data";
import { DOMAIN_BY_CATEGORY, packageForProgram } from "@/lib/rights-packages";

/**
 * Read-only open data API — the full program catalog as CSV.
 * No key required for individuals; fair-use rate limits apply.
 */

function csvEscape(value: string | number | null): string {
  const s = value === null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const HEADERS = [
  "package_id",
  "country",
  "domain",
  "program_id",
  "title",
  "category",
  "agency",
  "summary",
  "amount",
  "deadline",
  "source_url",
  "checked_at",
  "check",
  "valid_until",
  "apply_url",
];

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  const rows = PROGRAMS.filter((p) => !country || p.country === country).map(
    (p) => {
      const pkg = packageForProgram(p);
      return [
        pkg?.package_id ?? "",
        p.country,
        DOMAIN_BY_CATEGORY[p.category],
        p.id,
        p.name,
        p.category,
        p.agency,
        p.summary,
        p.amount,
        p.deadlines,
        p.sourceUrl,
        p.verification.lastChecked,
        p.verification.status,
        pkg?.valid_until ?? "",
        p.applyUrl,
      ]
        .map(csvEscape)
        .join(",");
    },
  );

  const csv = [HEADERS.join(","), ...rows].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="civicclaim-programs.csv"',
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
