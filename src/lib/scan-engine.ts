// RecoveryOS scan engine — isomorphic (runs on server & client, no node APIs).
// Parses a purchases export (CSV / TSV), matches rows against every recovery
// channel in recovery-data.ts and produces conservative estimates.

import {
  SETTLEMENTS,
  IEEPA_KEYWORDS,
  DRAWBACK_KEYWORDS,
  IEEPA_INFO,
  claimStatus,
  type SettlementDef,
  type ClaimStatus,
  type ClaimKind,
} from "./recovery-data";

export interface PurchaseRow {
  date: string; // ISO yyyy-mm-dd
  description: string;
  amount: number; // absolute value, USD
}

export interface MatchedLine {
  date: string;
  description: string;
  amount: number;
}

export interface ScanMatch {
  id: string;
  name: string;
  kind: ClaimKind;
  status: ClaimStatus;
  daysLeft: number | null;
  claimDeadline: string | null;
  matched: MatchedLine[];
  matchedTotal: number;
  estimateLow: number;
  estimateHigh: number;
  fundSize?: string;
  caseRef?: string;
  eligibleNote?: string;
  evidenceNote?: string;
  payoutNote: string;
  adminUrl?: string;
  adminName?: string;
  verifyNote?: string;
  summary?: string;
}

export interface ScanResults {
  rowsParsed: number;
  usableRows: number;
  totalSpend: number;
  matches: ScanMatch[];
  openTotalLow: number;
  openTotalHigh: number;
  missedTotalLow: number;
  missedTotalHigh: number;
  ieepaLow: number;
  ieepaHigh: number;
  drawbackHint: boolean;
  scanDate: string;
}

// ---------------------------------------------------------------------------
// CSV / TSV parsing
// ---------------------------------------------------------------------------

const MAX_ROWS = 5000;

function splitLine(line: string, delimiter: "," | "\t"): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

function parseDate(raw: string): string | null {
  const s = raw.trim().replace(/^"|"$/g, "");
  if (!s) return null;
  // ISO yyyy-mm-dd (optionally with time)
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return iso(Number(m[1]), Number(m[2]), Number(m[3]));
  // US m/d/yyyy or m/d/yy
  m = s.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{2,4})/);
  if (m) {
    let year = Number(m[3]);
    if (year < 100) year += year < 50 ? 2000 : 1900;
    return iso(year, Number(m[1]), Number(m[2]));
  }
  // "15 Mar 2021" / "Mar 15, 2021" via Date fallback
  const t = Date.parse(s);
  if (!Number.isNaN(t)) {
    const d = new Date(t);
    return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }
  return null;
}

function iso(y: number, m: number, d: number): string {
  if (m < 1 || m > 12 || d < 1 || d > 31) return "";
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseAmount(raw: string): number | null {
  const s = raw.trim().replace(/[$€£\s,]/g, "");
  if (!s || s === "-") return null;
  const neg = /^\((.*)\)$/.test(s);
  const cleaned = neg ? s.slice(1, -1) : s;
  const n = Number(cleaned);
  if (Number.isNaN(n)) return null;
  return Math.abs(n);
}

const DATE_RE = /date/i;
const AMOUNT_RE = /amount|total|value|usd|charge/i;
const DESC_RE = /desc|memo|vendor|payee|merchant|name|detail|narrative/i;

export function parsePurchases(text: string): { rows: PurchaseRow[]; skipped: number } {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return { rows: [], skipped: 0 };

  const delimiter: "," | "\t" = (lines[0].match(/\t/g) || []).length >
    (lines[0].match(/,/g) || []).length
    ? "\t"
    : ",";

  const cells = splitLine(lines[0], delimiter);
  const header = cells.join(" ");

  let dateIdx = 0;
  let descIdx = 1;
  let amountIdx = 2;
  let startLine = 0;

  const hasHeader = DATE_RE.test(header) && AMOUNT_RE.test(header);
  if (hasHeader) {
    dateIdx = cells.findIndex((c) => DATE_RE.test(c));
    amountIdx = cells.findIndex((c) => AMOUNT_RE.test(c));
    descIdx = cells.findIndex((c) => DESC_RE.test(c));
    if (descIdx === -1) {
      descIdx = cells.findIndex((c, i) => i !== dateIdx && i !== amountIdx);
    }
    startLine = 1;
    if (dateIdx === -1 || amountIdx === -1) {
      dateIdx = 0;
      descIdx = 1;
      amountIdx = 2;
      startLine = 0;
    }
  }

  const rows: PurchaseRow[] = [];
  let skipped = 0;

  for (let i = startLine; i < lines.length && rows.length < MAX_ROWS; i++) {
    const c = splitLine(lines[i], delimiter);
    if (c.length < 2) {
      skipped++;
      continue;
    }
    const date = parseDate(c[dateIdx] ?? "");
    const amount = parseAmount(c[amountIdx] ?? c[c.length - 1] ?? "");
    const description = (c[descIdx] ?? c[1] ?? "").trim();
    if (!date || amount === null || !description) {
      skipped++;
      continue;
    }
    rows.push({ date, description, amount });
  }
  return { rows, skipped };
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

function tokenize(desc: string): { tokens: Set<string>; flat: string } {
  const flat = desc
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = new Set(flat.split(" ").filter(Boolean));
  return { tokens, flat };
}

function hitsKeyword(keywords: string[], desc: string, tokens: Set<string>, flat: string): boolean {
  for (const k of keywords) {
    // Normalize the keyword the same way descriptions are normalized.
    const kNorm = k.toLowerCase().replace(/[-_]/g, " ").trim();
    if (kNorm.includes(" ")) {
      if (flat.includes(kNorm)) return true;
    } else if (kNorm && tokens.has(kNorm)) {
      return true;
    }
  }
  return false;
}

function inWindow(rowDate: string, start: string, end: string): boolean {
  return rowDate >= start && rowDate <= end;
}

const STATUS_ORDER: Record<ClaimStatus, number> = {
  "closing-soon": 0,
  open: 1,
  verify: 2,
  closed: 3,
};

export function matchSettlements(rows: PurchaseRow[], now: Date = new Date()): ScanMatch[] {
  const matches: ScanMatch[] = [];

  for (const s of SETTLEMENTS) {
    const matched: MatchedLine[] = [];
    for (const row of rows) {
      const { tokens, flat } = tokenize(row.description);
      if (!hitsKeyword(s.keywords, row.description, tokens, flat)) continue;
      if (!inWindow(row.date, s.windowStart, s.windowEnd)) continue;
      matched.push({ date: row.date, description: row.description, amount: row.amount });
    }
    if (matched.length === 0) continue;
    const matchedTotal = matched.reduce((a, r) => a + r.amount, 0);
    const [lo, hi] = s.estimateRate;
    matches.push({
      id: s.id,
      name: s.name,
      kind: "settlement",
      status: claimStatus(s.claimDeadline, now),
      daysLeft: s.claimDeadline ? daysLeftSafe(s.claimDeadline, now) : null,
      claimDeadline: s.claimDeadline,
      matched,
      matchedTotal,
      estimateLow: matchedTotal * lo,
      estimateHigh: matchedTotal * hi,
      fundSize: s.fundSize,
      caseRef: s.caseRef,
      eligibleNote: s.eligibleNote,
      evidenceNote: s.evidenceNote,
      payoutNote: "Pro-rata share of the fund, driven by your documented purchases.",
      adminUrl: s.adminUrl,
      adminName: s.adminName,
      verifyNote: s.verifyNote,
      summary: s.summary,
    });
  }

  // IEEPA tariff refund channel
  const ieepaRows: MatchedLine[] = [];
  const drawbackRows: MatchedLine[] = [];
  for (const row of rows) {
    const { tokens, flat } = tokenize(row.description);
    const isIeepa = hitsKeyword(IEEPA_KEYWORDS, row.description, tokens, flat);
    const isDrawback = hitsKeyword(DRAWBACK_KEYWORDS, row.description, tokens, flat);
    if (isIeepa && row.date >= "2025-01-01") {
      ieepaRows.push({ date: row.date, description: row.description, amount: row.amount });
    } else if (isDrawback && !isIeepa) {
      drawbackRows.push({ date: row.date, description: row.description, amount: row.amount });
    }
  }

  if (ieepaRows.length > 0) {
    const principal = ieepaRows.reduce((a, r) => a + r.amount, 0);
    const rate = IEEPA_INFO.defaultInterestRate / 100;
    let interest = 0;
    for (const r of ieepaRows) {
      const years = (now.getTime() - new Date(`${r.date}T00:00:00Z`).getTime()) / (365 * 86_400_000);
      if (years > 0) interest += r.amount * rate * years;
    }
    matches.push({
      id: "ieepa-refunds",
      name: "IEEPA Tariff Refunds",
      kind: "ieepa",
      status: "open",
      daysLeft: null,
      claimDeadline: null,
      matched: ieepaRows,
      matchedTotal: principal,
      estimateLow: principal,
      estimateHigh: principal + interest,
      fundSize: IEEPA_INFO.totalRefunds,
      caseRef: IEEPA_INFO.case,
      eligibleNote:
        "Importers that paid IEEPA tariffs (China / Canada / Mexico routes, 2025+) — refunds run through CBP CAPE.",
      evidenceNote:
        "ACE statements / CBP Form 7501 data. ~2M entries already failed validation — correct preparation matters.",
      payoutNote:
        "100% of the duty back, plus statutory interest (≈" +
        IEEPA_INFO.defaultInterestRate +
        "%/yr) accruing until paid.",
      verifyNote: `Filing windows run into ${IEEPA_INFO.deadlines} — entry-level deadlines depend on liquidation status.`,
      summary: IEEPA_INFO.headline,
    });
  }

  if (drawbackRows.length > 0) {
    const spend = drawbackRows.reduce((a, r) => a + r.amount, 0);
    matches.push({
      id: "drawback-review",
      name: "Duty Drawback Review",
      kind: "drawback",
      status: "open",
      daysLeft: null,
      claimDeadline: null,
      matched: drawbackRows,
      matchedTotal: spend,
      estimateLow: 0,
      estimateHigh: spend * 0.5, // needs eligibility review; duties portion unknown from a purchases export
      caseRef: "19 U.S.C. §1313 — unused manufacturing drawback",
      eligibleNote:
        "Importers whose goods (or goods made from imported materials) were later exported or destroyed.",
      evidenceNote: "Entry summaries + export documents. We build the claim with your broker.",
      payoutNote:
        "Up to 99% of duties reclaimable on qualifying goods — estimate capped at 50% of matched spend pending review.",
      verifyNote: "Rough screen only — drawback eligibility needs an entry-level review.",
      summary:
        "Your import lines look like potential drawback candidates. ~$15B/yr goes unclaimed nationally.",
    });
  }

  matches.sort((a, b) => {
    const so = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (so !== 0) return so;
    if (a.daysLeft !== null && b.daysLeft !== null) return a.daysLeft - b.daysLeft;
    return b.estimateHigh - a.estimateHigh;
  });

  return matches;
}

function daysLeftSafe(deadline: string, now: Date): number | null {
  const d = new Date(`${deadline}T23:59:59Z`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
}

export function runScan(text: string, now: Date = new Date()): (ScanResults & { skipped: number }) {
  const { rows, skipped } = parsePurchases(text);
  const matches = matchSettlements(rows, now);
  const totalSpend = rows.reduce((a, r) => a + r.amount, 0);

  let openTotalLow = 0;
  let openTotalHigh = 0;
  let missedTotalLow = 0;
  let missedTotalHigh = 0;
  let ieepaLow = 0;
  let ieepaHigh = 0;
  let drawbackHint = false;

  for (const m of matches) {
    if (m.status === "closed") {
      missedTotalLow += m.estimateLow;
      missedTotalHigh += m.estimateHigh;
      continue;
    }
    if (m.kind === "ieepa") {
      ieepaLow += m.estimateLow;
      ieepaHigh += m.estimateHigh;
      continue;
    }
    if (m.kind === "drawback") {
      drawbackHint = true;
      continue;
    }
    openTotalLow += m.estimateLow;
    openTotalHigh += m.estimateHigh;
  }

  return {
    rowsParsed: rows.length + skipped,
    usableRows: rows.length,
    totalSpend,
    matches,
    openTotalLow,
    openTotalHigh,
    missedTotalLow,
    missedTotalHigh,
    ieepaLow,
    ieepaHigh,
    drawbackHint,
    scanDate: now.toISOString(),
    skipped,
  };
}

// ---------------------------------------------------------------------------
// Demo data — crafted to exercise every matcher
// ---------------------------------------------------------------------------

export const SAMPLE_CSV = `Date,Description,Amount
2015-04-18,"Whole pork shoulder picnic case x40 — Sysco",2380.00
2016-09-02,"Bacon slab 500 lb — Smithfield invoice #88431",4120.50
2017-11-14,"Frozen whole turkey 120 ct — Butterball distributor",3180.00
2016-08-30,"Fresh chicken broiler case x60 — Tyson",1560.75
2016-07-22,"Ground beef 80/20 300 lb — JBS",2790.00
2013-06-05,"Ready-mix concrete 4000 psi — foundation pour, Iowa supplier",18400.00
2013-08-22,"Broiler grow-out services payment — Koch Foods",5000.00
2019-05-10,"Canned tuna 48 ct — StarKist distributor",640.00
2025-02-04,"IEEPA tariff — China ceramic mugs entry CHN-88231",18500.00
2025-04-15,"IEEPA tariff Canada — plywood import entry",28700.00
2025-06-02,"Customs brokerage + entry fee ocean import DDP",4210.00
2025-12-03,"AWS hosting — production",780.00
2026-01-08,"Google Ads spend Q1",2400.00
2024-02-11,"Office rent — downtown",3500.00`;
