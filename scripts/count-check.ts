import { PROGRAMS, REGIONS, DATA_SOURCES } from "../src/lib/programs-data";
import { WORLD_COUNTRIES } from "../src/lib/world-registry";

const ids = PROGRAMS.map((p) => p.id);
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
const byRegion: Record<string, number> = {};
const byCountry: Record<string, string[]> = {};
for (const p of PROGRAMS) {
  byRegion[p.region] = (byRegion[p.region] ?? 0) + 1;
  byCountry[p.country] = [...(byCountry[p.country] ?? []), p.id];
}
const regionCountries = new Set(REGIONS.flatMap((r) => r.countries));
const orphanCountries = Object.keys(byCountry).filter((c) => !regionCountries.has(c));
const badUrl = PROGRAMS.filter((p) => !p.sourceUrl.startsWith("http"));
const missingField = PROGRAMS.filter(
  (p) => !p.name || !p.agency || !p.amount || p.documents.length === 0 || p.steps.length === 0,
);
const sourcesByRegion: Record<string, number> = {};
for (const s of DATA_SOURCES) sourcesByRegion[s.region] = (sourcesByRegion[s.region] ?? 0) + 1;

console.log("PROGRAMS:", PROGRAMS.length);
console.log("by region:", byRegion);
console.log("countries with programs:", Object.keys(byCountry).length);
console.log("REGIONS:", REGIONS.map((r) => `${r.code}(${r.countries.length})`).join(" "));
console.log("DATA_SOURCES:", DATA_SOURCES.length, "by region:", sourcesByRegion);
console.log("duplicate ids:", dupIds.length ? dupIds : "none");
console.log("orphan countries (not in REGIONS):", orphanCountries.length ? orphanCountries : "none");
console.log("bad sourceUrl:", badUrl.length ? badUrl.map((p) => p.id) : "none");
console.log("missing core fields:", missingField.length ? missingField.map((p) => p.id) : "none");
console.log("world library markets:", WORLD_COUNTRIES.length);
console.log("farm programs:", PROGRAMS.filter((p) => p.criteria.situations?.includes("farmer")).map((p) => p.id));
