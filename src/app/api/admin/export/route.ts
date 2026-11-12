import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  WORLD_COUNTRIES,
  WORLD_SOURCE_COUNT,
  WORLD_VERIFIED_USD_B,
} from "@/lib/world-registry";

// ---------------------------------------------------------------------------
// Founder data access — GET /api/admin/export?token=...&format=json|csv
// Everything the platform has collected: people scans (the World Library
// asset), waitlist entries and business scan runs.
// ---------------------------------------------------------------------------

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  return lines.join("\n");
}

type TableName = "people-scans" | "waitlist" | "scan-runs";

async function loadTable(table: TableName): Promise<Record<string, unknown>[]> {
  switch (table) {
    case "people-scans": {
      const rows = await db.peopleScan.findMany({
        orderBy: { createdAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        fullName: r.fullName,
        email: r.email ?? "",
        countries: r.countries,
        matchIds: r.matchIds,
        matches: r.matches,
        referrer: r.referrer ?? "",
        createdAt: r.createdAt.toISOString(),
      }));
    }
    case "waitlist": {
      const rows = await db.waitlistEntry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        email: r.email,
        company: r.company ?? "",
        volume: r.volume ?? "",
        channels: r.channels ?? "",
        source: r.source ?? "",
        createdAt: r.createdAt.toISOString(),
      }));
    }
    case "scan-runs": {
      const rows = await db.scanRun.findMany({
        orderBy: { createdAt: "desc" },
      });
      return rows.map((r) => ({
        id: r.id,
        rowsParsed: r.rowsParsed,
        matchesFound: r.matchesFound,
        estimateLow: r.estimateLow,
        estimateHigh: r.estimateHigh,
        email: r.email ?? "",
        createdAt: r.createdAt.toISOString(),
      }));
    }
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN is not configured on the server." },
      { status: 500 }
    );
  }
  if (token !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const format = req.nextUrl.searchParams.get("format") === "csv" ? "csv" : "json";
  const tableParam = req.nextUrl.searchParams.get("table") ?? "all";
  const tables: TableName[] =
    tableParam === "all"
      ? ["people-scans", "waitlist", "scan-runs"]
      : (["people-scans", "waitlist", "scan-runs"] as TableName[]).includes(
          tableParam as TableName
        )
      ? [tableParam as TableName]
      : [];

  if (tables.length === 0) {
    return NextResponse.json(
      { error: "Unknown table. Use people-scans | waitlist | scan-runs | all." },
      { status: 400 }
    );
  }

  try {
    const data: Record<string, Record<string, unknown>[]> = {};
    for (const t of tables) {
      data[t] = await loadTable(t);
    }

    const stats = {
      peopleScans: await db.peopleScan.count(),
      waitlist: await db.waitlistEntry.count(),
      scanRuns: await db.scanRun.count(),
      registry: {
        countries: WORLD_COUNTRIES.length,
        sources: WORLD_SOURCE_COUNT,
        verifiedUSDBillions: WORLD_VERIFIED_USD_B,
      },
      exportedAt: new Date().toISOString(),
    };

    if (format === "csv") {
      const t = tables[0];
      const csv = toCsv(data[t] ?? []);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="recoveryos-${t}.csv"`,
        },
      });
    }

    return NextResponse.json({ stats, data });
  } catch (err) {
    console.error("admin export failed:", err);
    return NextResponse.json(
      { error: "Export failed. Check server logs." },
      { status: 500 }
    );
  }
}
