// RecoveryOS — recovery channel data layer.
// Every settlement below is a real, publicly filed case. Facts verified Oct 2026.
// Deadlines and windows must be re-verified against official administrator sites
// before any claim is filed (the product's core job is exactly that tracking).

export type ClaimStatus = "open" | "closing-soon" | "closed" | "verify";
export type ClaimKind = "settlement" | "ieepa" | "drawback";

export interface SettlementDef {
  id: string;
  name: string;
  caseRef: string;
  fundSize: string;
  category: "antitrust" | "tariff" | "logistics" | "other";
  eligibleNote: string;
  windowStart: string; // ISO yyyy-mm-dd
  windowEnd: string; // ISO yyyy-mm-dd
  claimDeadline: string | null; // null → verify with administrator
  keywords: string[]; // single tokens or multi-word phrases
  estimateRate: [number, number]; // share of matched purchase volume
  adminName: string;
  adminUrl: string;
  summary: string;
  evidenceNote: string;
  verifyNote?: string;
}

// ---------------------------------------------------------------------------
// Open / recently closed commercial settlement funds (US antitrust)
// ---------------------------------------------------------------------------

export const SETTLEMENTS: SettlementDef[] = [
  {
    id: "pork-ipp-2026",
    name: "Pork Price-Fixing — Indirect Purchasers",
    caseRef: "In re Pork Antitrust Litig., D. Minn. (IPP funds)",
    fundSize: "$117M",
    category: "antitrust",
    eligibleNote:
      "Any business or person that bought raw pork products in the U.S. — restaurants, grocers, distributors, processors.",
    windowStart: "2014-06-28",
    windowEnd: "2018-06-30",
    claimDeadline: "2026-10-29",
    keywords: [
      "pork", "bacon", "ham", "sausage", "loin", "chops", "lard",
      "smithfield", "hormel",
    ],
    estimateRate: [0.015, 0.04],
    adminName: "porkantitrustlitigation.com / overchargedforpork.com",
    adminUrl: "https://www.overchargedforpork.com",
    summary:
      "Major pork producers paid $117M to settle claims of fixing the price of raw pork. Businesses that bought pork for resale or food preparation file as indirect purchasers.",
    evidenceNote:
      "Invoices or purchase records during the window earn pro-rata payouts; claims without proof receive a reduced flat amount.",
  },
  {
    id: "turkey-2026",
    name: "Turkey Antitrust — Butterball & other producers",
    caseRef: "In re Turkey Antitrust Litig., D. Minn. (D. Minn. No. 1:19-cv-08318)",
    fundSize: "$34M Butterball + $37.5M others",
    category: "antitrust",
    eligibleNote:
      "Purchasers of fresh or frozen uncooked turkey — including restaurants, caterers, processors and distributors.",
    windowStart: "2014-01-01",
    windowEnd: "2019-12-31",
    claimDeadline: "2026-10-30",
    keywords: [
      "turkey", "butterball", "jennie", "farbest", "prestage", "perdue",
    ],
    estimateRate: [0.02, 0.05],
    adminName: "turkeylitigation.com",
    adminUrl: "https://www.turkeylitigation.com",
    summary:
      "Butterball ($34M) and additional producers settled price-fixing claims over fresh/frozen uncooked turkey. New defendant funds (HRF, Prestage, Farbest, Perdue) received preliminary approval in 2026.",
    evidenceNote:
      "Proof of turkey purchases (invoices, POS records) during the class window maximizes the payout.",
    verifyNote:
      "Exact class windows vary by defendant fund — confirm the current notice on the administrator site.",
  },
  {
    id: "readymix-2026",
    name: "Ready-Mix Concrete (Iowa)",
    caseRef: "In re Iowa Ready-Mix Concrete Antitrust Litig.",
    fundSize: "$18.5M+ (cumulative funds)",
    category: "antitrust",
    eligibleNote:
      "Individuals and businesses that bought ready-mix concrete in Iowa — contractors, builders, developers.",
    windowStart: "2010-01-01",
    windowEnd: "2016-12-31",
    claimDeadline: "2026-11-16",
    keywords: [
      "ready-mix", "ready mix", "concrete", "cement", "aggregate",
    ],
    estimateRate: [0.01, 0.03],
    adminName: "Settlement administrator (see listing)",
    adminUrl: "https://www.claimdepot.com/settlements",
    summary:
      "Purchasers of ready-mix concrete in Iowa between 2010 and 2016 may qualify for cash from antitrust settlement funds. A pure B2B claim — almost every buyer is a business.",
    evidenceNote:
      "Concrete invoices / delivery tickets from the window are the key evidence.",
    verifyNote:
      "Confirm the current fund status and administrator with the official notice before filing.",
  },
  {
    id: "broiler-growers",
    name: "Broiler Grower Settlements",
    caseRef: "In re Broiler Chicken Antitrust Litig. (grower funds)",
    fundSize: "Koch Foods fund + co-defendant funds",
    category: "antitrust",
    eligibleNote:
      "Farmers and contractors paid to provide broiler grow-out services.",
    windowStart: "2013-01-27",
    windowEnd: "2019-12-31",
    claimDeadline: null,
    keywords: ["grower", "grow-out", "growout", "grow out"],
    estimateRate: [0.02, 0.04],
    adminName: "broilergrowersantitrustsettlement.com",
    adminUrl: "https://www.broilergrowersantitrustsettlement.com",
    summary:
      "A dedicated settlement track for poultry growers (not buyers). If you raised broilers under contract during the window, this is your lane.",
    evidenceNote: "Grow-out contracts and settlement payment records.",
    verifyNote:
      "Per-defendant filing windows differ; verify the open funds on the settlement site.",
  },
  {
    id: "beef-dpp-2026",
    name: "Beef Antitrust — Direct Purchasers (Tyson)",
    caseRef: "In re Cattle/Beef Antitrust Litig. (D. Minn. 19-md-2898)",
    fundSize: "$82.5M (Tyson, Jan 2026)",
    category: "antitrust",
    eligibleNote:
      "Direct purchasers of cattle/beef — grocers, distributors, meat processors.",
    windowStart: "2015-01-01",
    windowEnd: "2019-12-31",
    claimDeadline: null,
    keywords: [
      "beef", "cattle", "steer", "steak", "brisket", "hamburger",
      "ground beef", "jbs", "national beef",
    ],
    estimateRate: [0.01, 0.03],
    adminName: "Court-appointed administrator (claims process forming)",
    adminUrl: "https://www.reuters.com/legal/government/tyson-foods-settles-us-beef-price-fixing-lawsuit-825-million-2026-01-02",
    summary:
      "Tyson settled with grocers and other direct beef buyers for $82.5M in January 2026. The claims process for this fund is being established — monitoring matters here.",
    evidenceNote: "Direct purchase invoices from beef packers during the window.",
    verifyNote:
      "Claims window not yet announced — this is exactly the type of fund our monitoring watchlist tracks for you.",
  },
  {
    id: "beef-ipp-closed",
    name: "Beef Price-Fixing — End Purchasers",
    caseRef: "In re Cattle/Beef Antitrust Litig. (IPP funds)",
    fundSize: "$87.5M",
    category: "antitrust",
    eligibleNote: "Businesses and consumers who bought beef products for their own use or resale.",
    windowStart: "2014-08-01",
    windowEnd: "2019-12-31",
    claimDeadline: "2026-06-30",
    keywords: ["beef", "cattle", "steak", "brisket", "hamburger", "ground beef"],
    estimateRate: [0.01, 0.02],
    adminName: "overchargedforbeef.com",
    adminUrl: "https://www.overchargedforbeef.com",
    summary:
      "The $87.5M end-purchaser beef fund closed on June 30, 2026. Most eligible businesses never filed — a textbook example of money expiring silently.",
    evidenceNote: "The window is closed — shown here to demonstrate what unmonitored recoveries cost.",
  },
  {
    id: "chicken-closed",
    name: "Broiler Chicken Antitrust (all classes)",
    caseRef: "In re Broiler Chicken Antitrust Litig., N.D. Ill.",
    fundSize: "$181M+",
    category: "antitrust",
    eligibleNote: "Buyers of broiler chicken meat, incl. Commercial Food Preparers (restaurants, caterers).",
    windowStart: "2010-01-01",
    windowEnd: "2019-12-31",
    claimDeadline: "2025-07-31",
    keywords: ["chicken", "tyson", "perdue", "sanderson", "wayne farms"],
    estimateRate: [0.01, 0.03],
    adminName: "overchargedforchicken.com / mcaginc.com",
    adminUrl: "https://www.overchargedforchicken.com",
    summary:
      "One of the largest food antitrust funds ever — over $181M across defendants. The Commercial Food Preparer subclass alone covered thousands of restaurants. Claims closed in 2025.",
    evidenceNote: "Closed — retained as the canonical 'missed money' reference.",
  },
  {
    id: "tuna-closed",
    name: "Packaged Seafood (Tuna) — End Purchasers",
    caseRef: "In re Packaged Seafood Products Antitrust Litig., S.D. Cal.",
    fundSize: "$152M",
    category: "antitrust",
    eligibleNote: "End purchasers of packaged tuna (canned/pouched).",
    windowStart: "2011-12-01",
    windowEnd: "2015-07-01",
    claimDeadline: "2024-12-31",
    keywords: ["tuna", "starkist", "bumble bee", "chicken of the sea"],
    estimateRate: [0.01, 0.02],
    adminName: "tunaendpurchasersettlement.com",
    adminUrl: "https://www.tunaendpurchasersettlement.com",
    summary:
      "$152M for packaged tuna buyers. Claims closed December 31, 2024 — most restaurant and deli buyers never knew the fund existed.",
    evidenceNote: "Closed fund, shown as a missed-recovery example.",
  },
];

// ---------------------------------------------------------------------------
// IEEPA tariff refund channel (from the TariffRefund OS research, Oct 2026)
// ---------------------------------------------------------------------------

export const IEEPA_INFO = {
  case: "Learning Resources v. Trump — U.S. Supreme Court, 6–3, Feb 20, 2026",
  headline: "IEEPA tariffs were ruled unlawful. $166B must flow back to importers.",
  totalRefunds: "$166B",
  importers: "330,000+",
  entries: "53M",
  interestPerMonth: "~$650M",
  capeLive: "Apr 20, 2026",
  filingsFirst6Days: "75,300",
  failedValidation: "2,000,000",
  deadlines: "2027–2028",
  defaultInterestRate: 4.7, // % per year, approximate published rate — editable in the calculator
} as const;

// Rows whose description hits these tokens are treated as IEEPA tariff lines
// (China / Canada / Mexico IEEPA tariffs of 2025+, not Section 232/301 duties).
export const IEEPA_KEYWORDS = ["tariff", "ieepa"];

// Rows hitting these tokens get a duty-drawback review hint.
export const DRAWBACK_KEYWORDS = [
  "customs", "duty", "duties", "import", "imports", "broker", "entry fee",
];

// ---------------------------------------------------------------------------
// The Living Library — individual (consumer) channels.
// Free forever, DIY-first: every entry links to the official free tool.
// ---------------------------------------------------------------------------

export interface LibraryItem {
  id: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  action: string;
  url: string;
  urlLabel: string;
  minutes: string;
  note: string;
}

export const PEOPLE_CHANNELS: LibraryItem[] = [
  {
    id: "unclaimed-states",
    title: "State unclaimed property",
    stat: "$100–150B",
    statLabel: "held by US states — 1 in 10 Americans is on a list",
    description:
      "Old bank accounts, uncashed paychecks, forgotten deposits, utility credits. States hold them until claimed — most states have no deadline, but the money earns nothing for you.",
    action: "Search your names, free",
    url: "https://www.missingmoney.com",
    urlLabel: "missingmoney.com",
    minutes: "~5 min",
    note: "Search every state you've lived in — including maiden and business names.",
  },
  {
    id: "savings-bonds",
    title: "Matured savings bonds",
    stat: "$25B+",
    statLabel: "in Treasury bonds that stopped earning interest",
    description:
      "Paper bonds from decades ago — many were never redeemed and no longer earn interest. The Treasury will replace or pay them out, but you have to ask.",
    action: "Run Treasury Hunt",
    url: "https://www.treasurydirect.gov",
    urlLabel: "treasurydirect.gov",
    minutes: "~2 min",
    note: "You'll need the bond serial number or the owner's SSN for the search.",
  },
  {
    id: "pensions",
    title: "Unclaimed pensions",
    stat: "~$300M",
    statLabel: "held by PBGC for 80,000+ people",
    description:
      "When employers go under, their pensions move to PBGC, the federal pension guarantee agency. People lose track — especially after moves and name changes.",
    action: "Search the PBGC database",
    url: "https://www.pbgc.gov",
    urlLabel: "pbgc.gov — unclaimed pensions search",
    minutes: "~3 min",
    note: "Try parents and grandparents too — benefits can pass to survivors.",
  },
  {
    id: "tax-refunds",
    title: "Unclaimed tax refunds",
    stat: "$1B+/yr",
    statLabel: "returned to the Treasury when people don't file",
    description:
      "Didn't file a return because your income was low? The refund is still yours — but only for three years after the due date. After that it's gone.",
    action: "Check with the IRS",
    url: "https://www.irs.gov/refunds",
    urlLabel: "irs.gov/refunds",
    minutes: "~10 min",
    note: "Filing a late return for a refund year is free — even years later.",
  },
  {
    id: "fha-refunds",
    title: "FHA mortgage insurance refunds",
    stat: "$100M+",
    statLabel: "in unreturned premiums held at HUD",
    description:
      "If you paid off an FHA-insured mortgage, part of the upfront insurance premium may be refundable. HUD holds the money until the borrower claims it.",
    action: "Search HUD's database",
    url: "https://www.hud.gov",
    urlLabel: "hud.gov",
    minutes: "~5 min",
    note: "Especially relevant for FHA loans paid off after 2000.",
  },
  {
    id: "consumer-cases",
    title: "Consumer class actions",
    stat: "$100M+",
    statLabel: "in open funds covering everyday purchases",
    description:
      "The pork, turkey and tuna antitrust funds cover household buyers, not just businesses. If you bought groceries during the class windows, you qualify.",
    action: "Browse the live tracker",
    url: "#settlements",
    urlLabel: "our live fund tracker",
    minutes: "varies",
    note: "Small household claims often need no proof — a signed form is enough.",
  },
];

// ---------------------------------------------------------------------------
// Channel overview cards
// ---------------------------------------------------------------------------

export interface ChannelCard {
  id: string;
  title: string;
  stat: string;
  /** Optional numeric twin of `stat` — lets the card count up live. */
  statValue?: number;
  statFormat?: (n: number) => string;
  statLabel: string;
  description: string;
  status: "live" | "roadmap";
  statusNote: string;
}

export const CHANNELS: ChannelCard[] = [
  {
    id: "class-actions",
    title: "Class Action Settlements",
    stat: "Billions",
    statLabel: "sitting unclaimed across open funds",
    description:
      "Antitrust settlements pay businesses for overcharges on everything from pork and turkey to concrete and packaging. Claim rates are tiny — most buyers never file.",
    status: "live",
    statusNote: "Live now — 5+ funds tracked",
  },
  {
    id: "ieepa",
    title: "IEEPA Tariff Refunds",
    stat: "$166B",
    statValue: 166,
    statFormat: (n) => `$${Math.round(n)}B`,
    statLabel: "ordered back to 330K importers",
    description:
      "The Supreme Court struck down IEEPA tariffs 6–3. Every duty paid under them is refundable with interest via CBP's CAPE portal — deadlines run into 2027–2028.",
    status: "live",
    statusNote: "Live now — calculator below",
  },
  {
    id: "drawback",
    title: "Duty Drawback",
    stat: "~$15B/yr",
    statValue: 15,
    statFormat: (n) => `~$${Math.round(n)}B/yr`,
    statLabel: "unclaimed, per CBP estimates",
    description:
      "Up to 99% of duties on imported goods that were later exported or destroyed can be reclaimed. Most SMBs have never filed a single drawback claim.",
    status: "live",
    statusNote: "Live now — review included in scan",
  },
  {
    id: "freight",
    title: "Freight & Parcel Audits",
    stat: "$1B+",
    statLabel: "industry recovering shipping overcharges",
    description:
      "Late deliveries, duplicate surcharges and dimension errors leak 1–3% of shipping spend. Audit firms take 25–50% contingency — we'll fold it into one platform.",
    status: "roadmap",
    statusNote: "Q1 2027",
  },
  {
    id: "rnd",
    title: "R&D Tax Credits",
    stat: "Most",
    statLabel: "eligible SMBs never file a claim",
    description:
      "US, UK and EU credit programs routinely go unclaimed by small companies that qualify. We pre-screen your engineering spend and hand packs to a licensed preparer.",
    status: "roadmap",
    statusNote: "Q1 2027",
  },
  {
    id: "unclaimed",
    title: "Unclaimed Property (B2B)",
    stat: "$100–150B",
    statValue: 150,
    statFormat: (n) => `$100–${Math.round(n)}B`,
    statLabel: "held by US states, businesses included",
    description:
      "Forgotten vendor credits, uncashed refunds, old deposits — dormancy escheatment silently absorbs business money every year. We sweep it continuously.",
    status: "roadmap",
    statusNote: "Q2 2027",
  },
];

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function fmtUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  }).format(n);
}

export function fmtDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

export function daysUntil(deadline: string | null, now: Date = new Date()): number | null {
  if (!deadline) return null;
  const d = new Date(`${deadline}T23:59:59Z`);
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
}

export function claimStatus(deadline: string | null, now: Date = new Date()): ClaimStatus {
  const days = daysUntil(deadline, now);
  if (days === null) return "verify";
  if (days < 0) return "closed";
  if (days <= 14) return "closing-soon";
  return "open";
}

export const STATUS_META: Record<
  ClaimStatus,
  { label: string; className: string; dotClass: string }
> = {
  open: {
    label: "Open",
    className: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30",
    dotClass: "bg-emerald-400",
  },
  "closing-soon": {
    label: "Closing soon",
    className: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    dotClass: "bg-amber-400",
  },
  closed: {
    label: "Closed — missed",
    className: "bg-white/[0.04] text-zinc-500 border-white/10",
    dotClass: "bg-zinc-600",
  },
  verify: {
    label: "Verify window",
    className: "bg-sky-400/10 text-sky-300 border-sky-400/30",
    dotClass: "bg-sky-400",
  },
};
