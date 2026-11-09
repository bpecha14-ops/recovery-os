// ---------------------------------------------------------------------------
// RecoveryOS — The World Library
// A living registry of official unclaimed-money databases, market by market.
//
// Every entry points to an official / government-backed service.
// Figures compiled from official disclosures and major press, late 2026:
//   US NAUPA · Bank of Canada · UK PPI/PensionBee · Moneysmart (ASIC) ·
//   DW (Germany) · Ciclade/CDC (France) · Swiss Banking Ombudsman ·
//   NTMA (Ireland) · RBI UDGAM / IEPFA (India) · Banco Central SVR (Brazil) ·
//   ASISA/FSCA (South Africa) · KIFIN (South Korea) · IRD (New Zealand)
// ---------------------------------------------------------------------------

export type Region = "americas" | "europe" | "asia-pacific" | "africa-me";

export type SourceType =
  | "state"        // state unclaimed property programs
  | "central-bank" // central bank registers
  | "pension"      // pensions & retirement
  | "securities"   // shares, dividends, investments
  | "tax"          // tax refunds
  | "insurance"    // life insurance / deposits guarantee
  | "deposits"     // dormant bank deposits
  | "court";       // class actions / estates

export type AccessLevel =
  | "online"    // free public online search
  | "register"  // searchable register / claim via portal
  | "request"   // free, but via formal request
  | "offline";  // contact institution directly

export interface RegistrySource {
  id: string;
  title: string;
  operator: string;
  url: string;
  amount: string;
  type: SourceType;
  access: AccessLevel;
  minutes: string;
  note: string;
}

export interface CountryEntry {
  code: string;
  name: string;
  flag: string;
  region: Region;
  status: "live" | "researching";
  total: string;      // headline figure, local currency
  totalUSDB?: number; // conservative USD billions (used for the global sum)
  summary: string;
  sources: RegistrySource[];
}

export const REGIONS: { id: Region | "all"; label: string }[] = [
  { id: "all", label: "All markets" },
  { id: "americas", label: "Americas" },
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia-Pacific" },
  { id: "africa-me", label: "Africa & Middle East" },
];

export const WORLD_COUNTRIES: CountryEntry[] = [
  // ------------------------------------------------------------- AMERICAS ---
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "americas",
    status: "live",
    total: "$100–150B held by states",
    totalUSDB: 100,
    summary:
      "The deepest unclaimed-money system on Earth: 50 state programs plus federal channels for bonds, pensions, tax refunds, bank failures and court funds. 1 in 10 Americans is on a list.",
    sources: [
      {
        id: "us-states",
        title: "State unclaimed property",
        operator: "NAUPA — state treasurers",
        url: "https://www.missingmoney.com",
        amount: "$100–150B",
        type: "state",
        access: "online",
        minutes: "~5 min",
        note: "Search every state you've lived in — including maiden and business names.",
      },
      {
        id: "us-bonds",
        title: "Matured savings bonds",
        operator: "U.S. Treasury",
        url: "https://www.treasurydirect.gov",
        amount: "$25B+",
        type: "securities",
        access: "online",
        minutes: "~2 min",
        note: "Bonds that stopped earning interest decades ago — Treasury Hunt finds them by SSN.",
      },
      {
        id: "us-pensions",
        title: "Unclaimed pensions",
        operator: "PBGC",
        url: "https://www.pbgc.gov",
        amount: "~$300M",
        type: "pension",
        access: "online",
        minutes: "~3 min",
        note: "Try parents and grandparents too — benefits can pass to survivors.",
      },
      {
        id: "us-refunds",
        title: "Unclaimed tax refunds",
        operator: "IRS",
        url: "https://www.irs.gov/refunds",
        amount: "$1B+/yr",
        type: "tax",
        access: "online",
        minutes: "~10 min",
        note: "Refunds survive three years after the due date — then they're gone. Late filing is free.",
      },
      {
        id: "us-fha",
        title: "FHA mortgage insurance refunds",
        operator: "HUD",
        url: "https://www.hud.gov",
        amount: "$100M+",
        type: "insurance",
        access: "online",
        minutes: "~5 min",
        note: "Especially relevant for FHA loans paid off after 2000.",
      },
      {
        id: "us-fdic",
        title: "Deposits at failed banks",
        operator: "FDIC",
        url: "https://www.fdic.gov",
        amount: "varies",
        type: "deposits",
        access: "register",
        minutes: "~5 min",
        note: "Unclaimed insured deposits from bank failures since 1992 sit at the FDIC.",
      },
      {
        id: "us-sec",
        title: "Investor restitution",
        operator: "SEC",
        url: "https://www.sec.gov",
        amount: "varies",
        type: "securities",
        access: "register",
        minutes: "~5 min",
        note: "Money recovered in SEC enforcement cases, waiting for harmed investors.",
      },
      {
        id: "us-class",
        title: "Class action funds",
        operator: "Court-appointed administrators",
        url: "#settlements",
        amount: "$100M+ open",
        type: "court",
        access: "online",
        minutes: "varies",
        note: "Pork ($117M), turkey ($71.5M+), tuna and dozens more — household buyers qualify too.",
      },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    region: "americas",
    status: "live",
    total: "CA$1.6B in 3.6M balances",
    totalUSDB: 1.17,
    summary:
      "The Bank of Canada holds CA$1.60 billion across 3.6 million unclaimed balances — dormant accounts from federally regulated banks. BC runs its own provincial program.",
    sources: [
      {
        id: "ca-boc",
        title: "Unclaimed bank balances",
        operator: "Bank of Canada",
        url: "https://www.unclaimedproperties.bankofcanada.ca",
        amount: "CA$1.60B · 3.6M balances",
        type: "central-bank",
        access: "online",
        minutes: "~3 min",
        note: "Balances inactive 10+ years (30 for small ones) transfer to the central bank — search is free.",
      },
      {
        id: "ca-bc",
        title: "BC unclaimed property",
        operator: "BC Unclaimed (province)",
        url: "https://bcunclaimed.ca",
        amount: "~CA$149M",
        type: "state",
        access: "online",
        minutes: "~3 min",
        note: "British Columbia is the only province with its own public register.",
      },
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    region: "americas",
    status: "live",
    total: "R$5.65B waiting",
    totalUSDB: 1.05,
    summary:
      "The Central Bank's SVR (Sistema de Valores a Receber) shows forgotten money in banks, consórcios and financial institutions. Over R$16 billion has already been returned since launch.",
    sources: [
      {
        id: "br-svr",
        title: "Valores a Receber",
        operator: "Banco Central do Brasil",
        url: "https://valoresareceber.bcb.gov.br",
        amount: "R$5.65B",
        type: "central-bank",
        access: "online",
        minutes: "~5 min",
        note: "Login with CPF via gov.br — covers banks, consórcios, insurers and payment institutions.",
      },
    ],
  },
  {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    region: "americas",
    status: "researching",
    total: "Mapping now",
    summary:
      "Condusef and IPAB channels for dormant accounts and failed-bank deposits. Our researchers are mapping the claim paths — it goes live soon.",
    sources: [],
  },

  // --------------------------------------------------------------- EUROPE ---
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "europe",
    status: "live",
    total: "£31.1B in lost pensions alone",
    totalUSDB: 40,
    summary:
      "Britain's monster: £31.1 billion in lost, inactive or unclaimed pension pots — up 60% since 2018. Add dormant bank accounts, unclaimed Premium Bond prizes and ownerless estates.",
    sources: [
      {
        id: "uk-pensions",
        title: "Lost pension pots",
        operator: "Pension Tracing Service — gov.uk",
        url: "https://www.gov.uk/find-pension-contact-details",
        amount: "£31.1B",
        type: "pension",
        access: "online",
        minutes: "~10 min",
        note: "Free tracing service finds old workplace and personal pensions from employer names alone.",
      },
      {
        id: "uk-accounts",
        title: "Dormant bank accounts",
        operator: "My Lost Account (UK banks)",
        url: "https://www.mylostaccount.org.uk",
        amount: "varies",
        type: "deposits",
        access: "online",
        minutes: "~10 min",
        note: "One free form searches every UK bank and building society you ever used.",
      },
      {
        id: "uk-nsi",
        title: "Premium Bonds prizes",
        operator: "NS&I",
        url: "https://www.nsandi.com",
        amount: "millions £/yr",
        type: "securities",
        access: "online",
        minutes: "~2 min",
        note: "Millions in unclaimed prizes — some worth £100,000+.",
      },
      {
        id: "uk-bona",
        title: "Unclaimed estates (bona vacantia)",
        operator: "Government Legal Department",
        url: "https://www.gov.uk/guidance/unclaimed-estates-bona-vacantia",
        amount: "varies",
        type: "court",
        access: "online",
        minutes: "~15 min",
        note: "Estates of people who died without heirs — searchable list, claimable by relatives.",
      },
      {
        id: "uk-dormant",
        title: "Dormant Assets Scheme",
        operator: "Reclaim Fund Ltd (HMT)",
        url: "https://www.gov.uk/guidance/dormant-and-lost-financial-assets",
        amount: "£557M moved since 2022",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Money transferred to the scheme is still yours — reclaim via your original institution.",
      },
    ],
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    region: "europe",
    status: "live",
    total: "€4.2–9B (estimates)",
    totalUSDB: 4.6,
    summary:
      "Billions sleep in dormant German accounts — but there is no central public register. Claims run through each bank directly, and heirs need a certificate of inheritance (Erbschein). We map the path.",
    sources: [
      {
        id: "de-banks",
        title: "Dormant account search",
        operator: "Your banks — directly",
        url: "https://www.verbraucherzentrale.de",
        amount: "€4.2–9B (est.)",
        type: "deposits",
        access: "request",
        minutes: "varies",
        note: "Write to every German bank you ever used — data protection blocks central searching.",
      },
      {
        id: "de-heirs",
        title: "Inheritance claims (Erbschein)",
        operator: "Nachlassgericht — probate courts",
        url: "https://www.justiz.de",
        amount: "varies",
        type: "court",
        access: "offline",
        minutes: "weeks",
        note: "Heirs claim dormant accounts with a certificate of inheritance from the local probate court.",
      },
    ],
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    region: "europe",
    status: "live",
    total: "€7.87B at the CDC",
    totalUSDB: 8.6,
    summary:
      "€7.87 billion sleeps at the Caisse des Dépôts: inactive bank accounts, forgotten livrets, employee savings, unclaimed life insurance. Ciclade is the single free official door to all of it.",
    sources: [
      {
        id: "fr-ciclade",
        title: "Ciclade",
        operator: "Caisse des Dépôts",
        url: "https://ciclade.caissedesdepots.fr",
        amount: "€7.87B",
        type: "central-bank",
        access: "online",
        minutes: "~10 min",
        note: "Also searches for deceased relatives' assets — life insurance, savings, inactive accounts.",
      },
    ],
  },
  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    region: "europe",
    status: "live",
    total: "central register via Ombudsman",
    summary:
      "Swiss banks keep a centralized register of dormant accounts and safe-deposit boxes. Only the Banking Ombudsman's claims office may query it — on your behalf, for free, even decades later.",
    sources: [
      {
        id: "ch-ombudsman",
        title: "Dormant assets search",
        operator: "Swiss Banking Ombudsman",
        url: "https://www.dormantaccounts.ch",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Free search request — no 60-year wait required. Covers accounts and safe-deposit boxes.",
      },
    ],
  },
  {
    code: "IE",
    name: "Ireland",
    flag: "🇮🇪",
    region: "europe",
    status: "live",
    total: "€246.6M in the fund",
    totalUSDB: 0.27,
    summary:
      "Dormant accounts (15 years, no activity) transfer to the Dormant Accounts Fund managed by the NTMA — €246.6 million held, and the money never stops being yours.",
    sources: [
      {
        id: "ie-dormant",
        title: "Dormant Accounts Fund",
        operator: "NTMA — via your institution",
        url: "https://www.ntma.ie/business-areas/funding-and-debt-management/other/dormant-accounts",
        amount: "€246.6M",
        type: "state",
        access: "request",
        minutes: "~15 min",
        note: "Claim through the original bank, building society or An Post — they handle it from there.",
      },
    ],
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "europe",
    status: "researching",
    total: "Mapping now",
    summary:
      "No central public register yet — Dutch banks hold dormant balances under privacy rules. We're charting which institutions accept direct search requests.",
    sources: [],
  },
  {
    code: "UA",
    name: "Ukraine",
    flag: "🇺🇦",
    region: "europe",
    status: "live",
    total: "Unclaimed deposits register",
    summary:
      "The Deposit Guarantee Fund (Фонд гарантування вкладів) publishes unclaimed deposits from liquidated banks — check the register if you ever held accounts at banks that failed.",
    sources: [
      {
        id: "ua-fgv",
        title: "Незатребувані вклади",
        operator: "Fund of Guaranteeing Deposits (FGV)",
        url: "https://www.fgv.org.ua",
        amount: "varies",
        type: "insurance",
        access: "register",
        minutes: "~10 min",
        note: "Register of unclaimed deposits from liquidated banks — claims go through the liquidation estate.",
      },
    ],
  },

  // --------------------------------------------------------- ASIA-PACIFIC ---
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    region: "asia-pacific",
    status: "live",
    total: "A$3B+ lost money",
    totalUSDB: 2,
    summary:
      "Around A$3 billion in lost shares, bank accounts and life insurance sits with ASIC — plus every state revenue office runs its own unclaimed money register.",
    sources: [
      {
        id: "au-asic",
        title: "Lost money — shares, banks, insurance",
        operator: "ASIC via Moneysmart",
        url: "https://moneysmart.gov.au/find-unclaimed-money",
        amount: "~A$3B",
        type: "central-bank",
        access: "online",
        minutes: "~5 min",
        note: "One search covers bank accounts, shares and life policies transferred to ASIC.",
      },
      {
        id: "au-nsw",
        title: "State registers",
        operator: "State revenue offices (NSW, VIC, QLD…)",
        url: "https://www.revenue.nsw.gov.au/unclaimed-money",
        amount: "varies",
        type: "state",
        access: "online",
        minutes: "~5 min",
        note: "Each state holds its own unclaimed money — check every state you lived or worked in.",
      },
    ],
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    region: "asia-pacific",
    status: "live",
    total: "₹67,000 crore in banks alone",
    totalUSDB: 8.6,
    summary:
      "₹67,000 crore of unclaimed deposits across banks (July 2025), plus shares and dividends parked with IEPF. Three official doors: UDGAM, IEPFA and EPFO.",
    sources: [
      {
        id: "in-udgam",
        title: "Unclaimed deposits — UDGAM",
        operator: "Reserve Bank of India",
        url: "https://udgam.rbi.org.in",
        amount: "₹67,000 crore",
        type: "central-bank",
        access: "online",
        minutes: "~5 min",
        note: "RBI's portal searches unclaimed deposits across all participating banks at once.",
      },
      {
        id: "in-iepf",
        title: "Unclaimed shares & dividends",
        operator: "IEPF Authority",
        url: "https://iepfa.gov.in",
        amount: "~₹5,600 crore",
        type: "securities",
        access: "online",
        minutes: "~15 min",
        note: "Dividends unclaimed 7 years transfer to IEPF — along with the underlying shares.",
      },
      {
        id: "in-epfo",
        title: "Provident Fund balance",
        operator: "EPFO",
        url: "https://passbook.epfindia.gov.in",
        amount: "varies",
        type: "pension",
        access: "online",
        minutes: "~5 min",
        note: "Old employer PF accounts keep accruing interest — track every UAN you ever had.",
      },
    ],
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    region: "asia-pacific",
    status: "live",
    total: "¥80B goes dormant yearly",
    summary:
      "Roughly ¥80 billion in bank accounts falls dormant every year. Since the 2018 dormant deposits law, flows fund nonprofits — but the underlying money stays claimable at your bank.",
    sources: [
      {
        id: "jp-banks",
        title: "Dormant deposit claims",
        operator: "Your bank — directly",
        url: "https://www.dic.go.jp",
        amount: "¥80B/yr flow",
        type: "deposits",
        access: "request",
        minutes: "varies",
        note: "Ask each bank you used; accounts dormant 10+ years need identity documents.",
      },
      {
        id: "jp-dic",
        title: "Failed-bank payouts",
        operator: "Deposit Insurance Corporation",
        url: "https://www.dic.go.jp",
        amount: "varies",
        type: "insurance",
        access: "request",
        minutes: "varies",
        note: "Unclaimed payouts from failed financial institutions sit with the DIC.",
      },
    ],
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    region: "asia-pacific",
    status: "live",
    total: "₩14T dormant · 340M accounts",
    totalUSDB: 10.4,
    summary:
      "₩14 trillion across 340 million dormant accounts. Korea Inclusive Finance Agency lets you search and reclaim 24/7 — even via the Toss app for small amounts.",
    sources: [
      {
        id: "kr-kifin",
        title: "Dormant deposits search",
        operator: "Korea Inclusive Finance Agency",
        url: "https://www.kifin.or.kr",
        amount: "₩14T total",
        type: "central-bank",
        access: "online",
        minutes: "~5 min",
        note: "Deposits ≤ ₩10M are checkable 24/7; refunds hit ₩373B last year and are rising.",
      },
    ],
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    region: "asia-pacific",
    status: "researching",
    total: "Mapping now",
    summary:
      "Housing provident fund (公积金) balances and dormant social-security accounts across provinces. No unified national search exists yet — we're building the provincial index.",
    sources: [],
  },
  {
    code: "HK",
    name: "Hong Kong",
    flag: "🇭🇰",
    region: "asia-pacific",
    status: "live",
    total: "banks hold dormant funds indefinitely",
    summary:
      "Hong Kong banks generally retain dormant funds indefinitely rather than transferring them to the government — and tens of thousands of MPF pension accounts sit unclaimed.",
    sources: [
      {
        id: "hk-mpf",
        title: "MPF accounts",
        operator: "MPFA",
        url: "https://www.mpfa.org.hk",
        amount: "55,000+ accounts",
        type: "pension",
        access: "register",
        minutes: "~15 min",
        note: "Consolidate and claim old MPF accounts via trustees — people average HK$59,000 lost.",
      },
      {
        id: "hk-banks",
        title: "Dormant bank accounts",
        operator: "Your banks — directly",
        url: "https://www.hkma.gov.hk",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "varies",
        note: "Funds never transfer to the state — contact each bank with identity documents.",
      },
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    region: "asia-pacific",
    status: "researching",
    total: "Mapping now",
    summary:
      "Under the Unclaimed Moneys Act, unclaimed balances move to the Consolidated Fund after 15 years — claim paths by institution are being mapped.",
    sources: [],
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "asia-pacific",
    status: "live",
    total: "held by the IRD",
    summary:
      "Money untouched in banks, solicitors' trust accounts and other holders eventually lands with Inland Revenue — searchable in myIR, claimable anytime.",
    sources: [
      {
        id: "nz-ird",
        title: "Unclaimed money",
        operator: "Inland Revenue (IRD)",
        url: "https://www.ird.govt.nz/unclaimedmoney",
        amount: "varies",
        type: "state",
        access: "online",
        minutes: "~5 min",
        note: "Free search inside myIR — claims are paid into your bank account.",
      },
    ],
  },

  // ------------------------------------------------------ AFRICA & MIDDLE EAST ---
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    region: "africa-me",
    status: "live",
    total: "R88.56B unclaimed assets",
    totalUSDB: 4.9,
    summary:
      "R88.56 billion in unclaimed assets — 53% of it retirement benefits. 4.45 million South Africans and migrant workers are owed money they never collected.",
    sources: [
      {
        id: "za-fsca",
        title: "Unclaimed benefits",
        operator: "FSCA",
        url: "https://www.fsca.co.za",
        amount: "R47B retirement funds",
        type: "pension",
        access: "register",
        minutes: "~15 min",
        note: "Search the FSCA register — migrant workers who returned home are heavily affected.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export const LIVE_COUNTRIES = WORLD_COUNTRIES.filter((c) => c.status === "live");
export const RESEARCHING_COUNTRIES = WORLD_COUNTRIES.filter(
  (c) => c.status === "researching"
);

/** Conservative verified total, USD billions (low bounds, only priced markets). */
export const WORLD_VERIFIED_USD_B = Math.round(
  WORLD_COUNTRIES.reduce((sum, c) => sum + (c.totalUSDB ?? 0), 0)
);

export const WORLD_SOURCE_COUNT = WORLD_COUNTRIES.reduce(
  (sum, c) => sum + c.sources.length,
  0
);

export const COUNTRY_BY_CODE = new Map(WORLD_COUNTRIES.map((c) => [c.code, c]));

export interface MatchedSource extends RegistrySource {
  countryCode: string;
  countryName: string;
  flag: string;
}

/** Collect the checklist of official sources for a set of countries. */
export function matchSourcesForCountries(codes: string[]): MatchedSource[] {
  const out: MatchedSource[] = [];
  for (const code of codes) {
    const country = COUNTRY_BY_CODE.get(code.toUpperCase());
    if (!country) continue;
    for (const s of country.sources) {
      out.push({
        ...s,
        countryCode: country.code,
        countryName: country.name,
        flag: country.flag,
      });
    }
  }
  return out;
}

/** Popular quick-pick chips for the free search form. */
export const QUICK_PICKS = ["US", "UK", "CA", "AU", "DE", "IN", "FR", "BR"];

export const TYPE_META: Record<
  SourceType,
  { label: string; icon: "state" | "bank" | "piggy" | "chart" | "tax" | "shield" | "wallet" | "gavel" }
> = {
  state: { label: "State program", icon: "state" },
  "central-bank": { label: "Central bank", icon: "bank" },
  pension: { label: "Pension", icon: "piggy" },
  securities: { label: "Shares & bonds", icon: "chart" },
  tax: { label: "Tax refund", icon: "tax" },
  insurance: { label: "Insurance", icon: "shield" },
  deposits: { label: "Bank deposits", icon: "wallet" },
  court: { label: "Court / estates", icon: "gavel" },
};

export const ACCESS_META: Record<
  AccessLevel,
  { label: string; className: string }
> = {
  online: {
    label: "Free online search",
    className: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
  },
  register: {
    label: "Register / portal",
    className: "border-sky-400/25 bg-sky-400/[0.08] text-sky-300",
  },
  request: {
    label: "Free request",
    className: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
  },
  offline: {
    label: "By mail / in person",
    className: "border-zinc-400/25 bg-zinc-400/[0.08] text-zinc-300",
  },
};
