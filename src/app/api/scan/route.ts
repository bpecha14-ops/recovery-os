import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Anonymous usage counter for the scanner.
 * The CSV itself is parsed in the browser and never sent here —
 * this endpoint only receives two integers (rows parsed, matches found),
 * with no file content, no identifiers and no amounts.
 */
const BodySchema = z.object({
  rowsParsed: z.number().int().min(0).max(10_000_000),
  matchesFound: z.number().int().min(0).max(10_000_000),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid counters. Send { rowsParsed, matchesFound }." },
        { status: 400 }
      );
    }

    try {
      await db.scanRun.create({ data: parsed.data });
    } catch (dbErr) {
      console.error("scan counter persist failed (non-fatal):", dbErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("scan counter failed:", err);
    return NextResponse.json(
      { error: "Counter failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
