import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runScan } from "@/lib/scan-engine";
import { db } from "@/lib/db";

const BodySchema = z.object({
  csv: z.string().min(5).max(2_000_000),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Send { csv: string } with your purchase export." },
        { status: 400 }
      );
    }

    const results = runScan(parsed.data.csv);

    if (results.usableRows === 0) {
      return NextResponse.json(
        {
          error:
            "No usable rows found. Expected columns like Date, Description, Amount (CSV or TSV, exported from QuickBooks, Stripe or your bank).",
        },
        { status: 422 }
      );
    }

    // Persist an anonymized aggregate for the founder dashboard (no row data).
    try {
      await db.scanRun.create({
        data: {
          rowsParsed: results.rowsParsed,
          matchesFound: results.matches.length,
          estimateLow: results.openTotalLow + results.ieepaLow,
          estimateHigh: results.openTotalHigh + results.ieepaHigh,
        },
      });
    } catch (dbErr) {
      console.error("scanRun persist failed (non-fatal):", dbErr);
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("scan failed:", err);
    return NextResponse.json(
      { error: "Scan failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
