/**
 * i18n parity checker — verifies that every locale file mirrors the English
 * dictionary: same key paths, same array lengths, same {placeholders},
 * preserved leading/trailing spaces.
 *
 * Usage: bun scripts/check-i18n.ts [locale ...]
 * - No args: checks every locale registered in dictionaries/index.ts.
 * - With args: checks those locale codes, dynamically importing
 *   src/lib/i18n/dictionaries/<code>.ts even if not registered yet.
 */
import { en } from "../src/lib/i18n/dictionaries/en";
import { dictionaries } from "../src/lib/i18n/dictionaries";

type Issue = string;

function checkStructure(
  enNode: unknown,
  locNode: unknown,
  path: string,
  issues: Issue[]
): void {
  if (typeof enNode === "string") {
    if (typeof locNode !== "string") {
      issues.push(
        `${path}: expected string, got ${locNode === undefined ? "MISSING" : typeof locNode}`
      );
      return;
    }
    const ph = (s: string) =>
      Array.from(s.matchAll(/\{(\w+)\}/g))
        .map((m) => m[1])
        .sort()
        .join(",");
    if (ph(enNode) !== ph(locNode)) {
      issues.push(
        `${path}: placeholders differ (en: {${ph(enNode)}} vs locale: {${ph(locNode)}})`
      );
    }
    if (locNode.trim().length === 0) {
      issues.push(`${path}: empty translation`);
    }
    const edge = (s: string) =>
      `${s.startsWith(" ") ? "lead " : ""}${s.endsWith(" ") ? "trail " : ""}`.trim();
    if (edge(enNode) !== edge(locNode)) {
      issues.push(
        `${path}: whitespace edge differs (en: "${edge(enNode) || "none"}" vs locale: "${edge(locNode) || "none"}")`
      );
    }
    return;
  }
  if (Array.isArray(enNode)) {
    if (!Array.isArray(locNode)) {
      issues.push(
        `${path}: expected array, got ${locNode === undefined ? "MISSING" : typeof locNode}`
      );
      return;
    }
    if (enNode.length !== locNode.length) {
      issues.push(`${path}: array length ${enNode.length} vs ${locNode.length}`);
    }
    const n = Math.min(enNode.length, locNode.length);
    for (let i = 0; i < n; i++)
      checkStructure(enNode[i], locNode[i], `${path}[${i}]`, issues);
    return;
  }
  if (enNode && typeof enNode === "object") {
    if (!locNode || typeof locNode !== "object" || Array.isArray(locNode)) {
      issues.push(
        `${path}: expected object, got ${locNode === undefined ? "MISSING" : typeof locNode}`
      );
      return;
    }
    for (const key of Object.keys(enNode)) {
      checkStructure(
        (enNode as Record<string, unknown>)[key],
        (locNode as Record<string, unknown>)[key],
        path ? `${path}.${key}` : key,
        issues
      );
    }
    for (const key of Object.keys(locNode)) {
      if (!(key in enNode))
        issues.push(`${path ? path + "." : ""}${key}: EXTRA key not in English`);
    }
    return;
  }
  if (enNode !== locNode)
    issues.push(`${path}: literal mismatch ${String(enNode)} vs ${String(locNode)}`);
}

function countStrings(node: unknown): number {
  if (typeof node === "string") return 1;
  if (Array.isArray(node))
    return node.reduce((a: number, x) => a + countStrings(x), 0);
  if (node && typeof node === "object")
    return Object.values(node).reduce((a: number, x) => a + countStrings(x), 0);
  return 0;
}

async function loadLocale(code: string): Promise<unknown> {
  const registered = (dictionaries as Record<string, unknown>)[code];
  if (registered) return registered;
  if (!/^[a-z]{2,3}$/.test(code)) return undefined;
  try {
    const mod = (await import(
      `../src/lib/i18n/dictionaries/${code}.ts`
    )) as { default?: unknown };
    return mod.default;
  } catch {
    return undefined;
  }
}

const requested = process.argv.slice(2).filter((a) => a !== "en");
const codes =
  requested.length > 0
    ? requested
    : Object.keys(dictionaries).filter((c) => c !== "en");

const enCount = countStrings(en);
let failed = 0;
for (const code of codes) {
  const dict = await loadLocale(code);
  if (dict === undefined) {
    console.log(`✗ ${code}: file not found`);
    failed++;
    continue;
  }
  const issues: Issue[] = [];
  checkStructure(en, dict, "", issues);
  const n = countStrings(dict);
  if (issues.length > 0) {
    failed++;
    console.log(`\n✗ ${code}: ${issues.length} issue(s) [${n}/${enCount} strings]`);
    for (const i of issues.slice(0, 40)) console.log(`   - ${i}`);
    if (issues.length > 40)
      console.log(`   ... and ${issues.length - 40} more`);
  } else {
    console.log(`✓ ${code}: OK [${n}/${enCount} strings]`);
  }
}
process.exit(failed > 0 ? 1 : 0);
