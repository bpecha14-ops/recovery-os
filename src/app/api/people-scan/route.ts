import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  matchSourcesForCountries,
  COUNTRY_BY_CODE,
} from "@/lib/world-registry";

const BodySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Tell us the name to search for")
    .max(80),
  email: z
    .union([z.string().trim().email().max(120), z.literal("")])
    .optional(),
  countries: z
    .array(z.string().length(2))
    .min(1, "Pick at least one country")
    .max(8, "Up to 8 countries per search"),
  referrer: z.string().max(300).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const { fullName, email, countries, referrer } = parsed.data;
    const codes = [...new Set(countries.map((c) => c.toUpperCase()))];

    // Unknown country codes are dropped silently.
    const valid = codes.filter((c) => COUNTRY_BY_CODE.has(c));
    if (valid.length === 0) {
      return NextResponse.json(
        { error: "None of the selected countries are in the library yet." },
        { status: 400 }
      );
    }

    const matches = matchSourcesForCountries(valid);

    // Persist the lead — the data asset. Non-fatal on failure.
    let savedId: string | null = null;
    try {
      const row = await db.peopleScan.create({
        data: {
          fullName,
          email: email && email.length > 0 ? email : null,
          countries: JSON.stringify(valid),
          matchIds: JSON.stringify(matches.map((m) => m.id)),
          matches: matches.length,
          referrer: referrer ?? null,
        },
      });
      savedId = row.id;
    } catch (dbErr) {
      console.error("peopleScan persist failed (non-fatal):", dbErr);
    }

    return NextResponse.json({
      id: savedId,
      countries: valid,
      matches,
      totalSources: matches.length,
      liveCountries: valid.filter(
        (c) => COUNTRY_BY_CODE.get(c)?.status === "live"
      ).length,
    });
  } catch (err) {
    console.error("people-scan failed:", err);
    return NextResponse.json(
      { error: "Search failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
