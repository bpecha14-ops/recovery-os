import { NextResponse } from "next/server";
import { FRESHNESS_DAYS } from "@/lib/rights-packages";

/**
 * Read-only open data API — the JSON schema of the rights-package
 * format (facts.json), documented from the actual TypeScript types.
 */

export function GET() {
  return NextResponse.json(
    {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      title: "CivicClaim rights package (facts.json)",
      type: "object",
      required: [
        "package_id",
        "country",
        "domain",
        "language",
        "openfisca",
        "valid_until",
        "programs",
      ],
      properties: {
        package_id: {
          type: "string",
          pattern: "^[a-z0-9-]+-[a-z]+-\\d{4}q[1-4]$",
          description: "country-domain-quarter of the last check",
        },
        country: { type: "string" },
        domain: {
          type: "string",
          enum: ["benefits", "pensions", "housing"],
        },
        language: { type: "string", default: "en" },
        openfisca: {
          type: "object",
          required: ["compatible", "variable_prefix"],
          properties: {
            compatible: { const: true },
            variable_prefix: { type: "string" },
          },
        },
        verifier: {
          type: ["object", "null"],
          description:
            "null = PENDING — a named local verifier (legal aid attorney, paralegal, clinic) must sign before the package counts as verified",
          required: ["name", "role", "org", "verified_at"],
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            org: { type: "string" },
            verified_at: { type: "string", format: "date" },
          },
        },
        valid_until: {
          type: "string",
          format: "date",
          description: `lastChecked + ${FRESHNESS_DAYS} days; expired packages auto-hide from search and results until re-verified`,
        },
        last_checked: { type: "string", format: "date" },
        programs: {
          type: "array",
          items: {
            type: "object",
            required: [
              "id",
              "title",
              "summary",
              "source",
              "eligibility",
              "steps",
              "updated_at",
            ],
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              summary: { type: "string" },
              category: { type: "string" },
              agency: { type: "string" },
              source: {
                type: "object",
                required: ["url", "checked_at", "check"],
                properties: {
                  url: { type: "string", format: "uri" },
                  page_title: { type: "string" },
                  quote: { type: ["string", "null"] },
                  checked_at: { type: "string", format: "date" },
                  check: {
                    type: "string",
                    enum: ["verified", "auto-extracted"],
                  },
                  page_hash: { type: "string" },
                },
              },
              amount: {
                type: "object",
                properties: {
                  display: { type: ["string", "null"] },
                  value: { type: ["number", "null"] },
                  currency: { type: ["string", "null"] },
                  period: { type: ["string", "null"] },
                  basis: { type: "string" },
                },
              },
              eligibility: { type: "object" },
              steps: { type: "array", items: { type: "string" } },
              documents: { type: "array", items: { type: "string" } },
              deadline: { type: "string" },
              apply_url: { type: "string", format: "uri" },
              updated_note: { type: "string" },
              updated_at: { type: "string", format: "date" },
            },
          },
        },
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
}
