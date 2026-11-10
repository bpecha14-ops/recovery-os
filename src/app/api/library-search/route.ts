import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  matchSourcesForCountries,
  COUNTRY_BY_CODE,
} from "@/lib/world-registry";

/**
 * World Library search.
 * Privacy by design: the visitor's name is used only in the browser to
 * personalize the on-screen checklist and is never sent to this endpoint.
 * We receive the selected country codes, return the matched official
 * registries, and store nothing — no names, no emails, no referrers.
 */
const BodySchema = z.object({
  countries: z
    .array(z.string().length(2))
    .min(1, "Pick at least one country")
    .max(8, "Up to 8 countries per search"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const codes = [...new Set(parsed.data.countries.map((c) => c.toUpperCase()))];

    // Unknown country codes are dropped silently.
    const valid = codes.filter((c) => COUNTRY_BY_CODE.has(c));
    if (valid.length === 0) {
      return NextResponse.json(
        { error: "None of the selected countries are in the library yet." },
        { status: 400 }
      );
    }

    const matches = matchSourcesForCountries(valid);

    return NextResponse.json({
      countries: valid,
      matches,
      totalSources: matches.length,
      liveCountries: valid.filter(
        (c) => COUNTRY_BY_CODE.get(c)?.status === "live"
      ).length,
    });
  } catch (err) {
    console.error("library search failed:", err);
    return NextResponse.json(
      { error: "Search failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
