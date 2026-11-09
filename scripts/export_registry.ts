// Dump the world registry to JSON for the XLSX/CSV export pipeline.
// Run: bun scripts/export_registry.ts
import { WORLD_COUNTRIES, WORLD_SOURCE_COUNT, WORLD_VERIFIED_USD_B } from "../src/lib/world-registry";
import { writeFileSync, mkdirSync } from "fs";

mkdirSync("scripts/out", { recursive: true });

const payload = {
  exportedAt: new Date().toISOString(),
  stats: {
    countries: WORLD_COUNTRIES.length,
    sources: WORLD_SOURCE_COUNT,
    verifiedUSDBillions: WORLD_VERIFIED_USD_B,
  },
  countries: WORLD_COUNTRIES.map((c) => ({
    code: c.code,
    name: c.name,
    region: c.region,
    status: c.status,
    total: c.total,
    totalUSDB: c.totalUSDB ?? null,
    summary: c.summary,
    sources: c.sources.map((s) => ({
      country: c.name,
      countryCode: c.code,
      title: s.title,
      operator: s.operator,
      url: s.url,
      amount: s.amount,
      type: s.type,
      access: s.access,
      minutes: s.minutes,
      note: s.note,
    })),
  })),
};

writeFileSync("scripts/out/world-registry.json", JSON.stringify(payload, null, 2));
console.log(
  `OK — ${payload.stats.countries} countries, ${payload.stats.sources} sources, $${payload.stats.verifiedUSDBillions}B verified → scripts/out/world-registry.json`
);
