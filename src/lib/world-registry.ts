// ---------------------------------------------------------------------------
// RecoveryOS — The World Library
// A living registry of official unclaimed-money databases, market by market.
//
// Every entry points to an official / government-backed service.
// Figures compiled from official disclosures and major press, late 2026:
//   US NAUPA · Bank of Canada · Banco Central SVR (Brazil) · CMF (Chile) ·
//   Superfinanciera (Colombia) · IPAB/Condusef (Mexico) · My Lost Account /
//   NS&I (UK) · NTMA (Ireland) · Ciclade/CDC (France) · Verbraucherzentrale
//   NRW (Germany) · Swiss Banking Ombudsman · MEF (Italy) · CDC (Belgium) ·
//   Riksbanken (Sweden) · ФГВФО (Ukraine) · ASIC Moneysmart (Australia) ·
//   RBI UDGAM / IEPFA (India) · DICJ (Japan) · KIFIN (Korea) · MPFA (HK) ·
//   IRD (NZ) · eGUMIS (Malaysia) · BTr (Philippines) · LPS (Indonesia) ·
//   FSCA (South Africa) · UFAA (Kenya) · NDIC (Nigeria) · Bank of Ghana ·
//   CBE (Egypt) · CBUAE · SAMA (Saudi) · CBB (Bahrain) · QCB (Qatar) ·
//   KCC/Maqasa (Kuwait) · CBO (Oman) · CBI (Iraq) · CBI (Iran) · PMA
//   (Palestine) · JODIC (Jordan) · BDL (Lebanon) · CDG (Morocco) ·
//   Banque d'Algérie · CMF/BCT (Tunisia) · TMSF (Türkiye)
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
    status: "live",
    total: "Guarantee: 400,000 UDIS per bank",
    summary:
      "No public dormant-account register — but two official doors pay out: IPAB returns guaranteed savings of failed banks through its payment portal, and Condusef forces banks to release inactive balances on complaint.",
    sources: [
      {
        id: "mx-ipab",
        title: "Failed-bank savings — Portal de Pagos",
        operator: "IPAB",
        url: "https://www.gob.mx/ipab",
        amount: "up to 400,000 UDIS (~MX$3M+)",
        type: "insurance",
        access: "register",
        minutes: "~15 min",
        note: "CIBanco entered liquidation in 2026 — register on the IPAB payment portal with the details your bank last had on file.",
      },
      {
        id: "mx-condusef",
        title: "Dormant accounts & complaints",
        operator: "Condusef",
        url: "https://www.condusef.gob.mx",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~10 min",
        note: "If a bank won't release an inactive balance, a Condusef complaint forces a formal response.",
      },
    ],
  },
  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    region: "americas",
    status: "live",
    total: "CLP 98B+ in forgotten deposits",
    totalUSDB: 0.1,
    summary:
      "Chilean banks publish forgotten deposits — acreencias bancarias — with the CMF, and the list runs past 98 billion pesos. Search by name or RUT, then claim at the bank holding the money.",
    sources: [
      {
        id: "cl-cmf",
        title: "Acreencias bancarias search",
        operator: "CMF — Comisión para el Mercado Financiero",
        url: "https://www.chileatiende.gob.cl/fichas/2620-depositos-olvidados-en-bancos-acreencias-bancarias-sujetas-a-caducidad",
        amount: "CLP 98B+",
        type: "deposits",
        access: "online",
        minutes: "~5 min",
        note: "The CMF finder lists deposits banks still hold — claims go directly to the institution.",
      },
    ],
  },
  {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    region: "americas",
    status: "live",
    total: "claimable with no time limit",
    summary:
      "Balances on inactive accounts (six months or more) move to special codes supervised by the Superfinanciera — but they stay claimable by the holder or heirs indefinitely, with no prescription deadline.",
    sources: [
      {
        id: "co-sfc",
        title: "Cuentas inactivas",
        operator: "Superfinanciera",
        url: "https://www.superfinanciera.gov.co",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Request the reactivation or withdrawal at the bank — successors can claim with inheritance documents.",
      },
    ],
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    region: "americas",
    status: "researching",
    total: "Mapping now",
    summary:
      "Argentina is the exception in Latin America: no specific dormant-account escheat regime exists, and BCRA resolves claims case by case. We're mapping which channels actually recover balances.",
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

  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    region: "europe",
    status: "live",
    total: "dormant funds escheat after 10 years",
    summary:
      "Italian banks and insurers must hand dormant relationships (10+ years without moves) to the State, and the Ministry of Economy publishes the list — deposits, bank drafts and life policies can still be reclaimed from the Tesoro.",
    sources: [
      {
        id: "it-mef",
        title: "Depositi dormienti — State list",
        operator: "Ministero dell'Economia e delle Finanze",
        url: "https://www.mef.gov.it",
        amount: "varies — lists updated regularly",
        type: "deposits",
        access: "online",
        minutes: "~15 min",
        note: "Dormant bank drafts and life-insurance policies appear on the MEF list; claims are filed with the Ministry.",
      },
    ],
  },
  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    region: "europe",
    status: "live",
    total: "no central register — bank by bank",
    summary:
      "The Banco de España confirms there is no public central register of inactive accounts. Claims run bank by bank, and long-dormant balances eventually transfer to the State — we map both paths.",
    sources: [
      {
        id: "es-banks",
        title: "Cuentas inactivas — bank claims",
        operator: "Your banks — under Banco de España rules",
        url: "https://clientebancario.bde.es",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "varies",
        note: "Write to each bank you ever used — Spain has no official central search.",
      },
    ],
  },
  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    region: "europe",
    status: "live",
    total: "678,000 dormant accounts",
    summary:
      "Assets inactive for five years move to the State's Deposits and Consignments Fund (CDC) — where they are kept for 30 more years, fully claimable. About 678,000 accounts and contracts are waiting right now.",
    sources: [
      {
        id: "be-cdc",
        title: "Avoirs dormants — CDC",
        operator: "SPF Finances — Caisse des Dépôts et Consignations",
        url: "https://finances.belgium.be/fr/pai/avoirs-dormants",
        amount: "678,000 accounts",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "After five inactive years funds move to the CDC and stay claimable for 30 more — banks must search for holders first.",
      },
    ],
  },
  {
    code: "SE",
    name: "Sweden",
    flag: "🇸🇪",
    region: "europe",
    status: "live",
    total: "kept at banks — no state escheat",
    summary:
      "Sweden has no central dormant register and balances never expire to the state — claim directly at each bank you used. The Riksbank also redeems invalidated banknote series, online with BankID.",
    sources: [
      {
        id: "se-banks",
        title: "Dormant account claims",
        operator: "Your banks — directly",
        url: "https://www.riksbank.se",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "varies",
        note: "No central register — Swedish banks keep dormant funds indefinitely; ask each bank directly.",
      },
      {
        id: "se-notes",
        title: "Redeem invalid banknotes",
        operator: "Sveriges Riksbank",
        url: "https://www.riksbank.se/sv/betalningar--kontanter/sedlar--mynt/sedlar/att-losa-in-ogiltiga-sedlar",
        amount: "varies",
        type: "securities",
        access: "online",
        minutes: "~10 min",
        note: "Withdrawn banknote series can still be redeemed via the Riksbank's online application with BankID.",
      },
    ],
  },
  {
    code: "PL",
    name: "Poland",
    flag: "🇵🇱",
    region: "europe",
    status: "researching",
    total: "Mapping now",
    summary:
      "Billions of złoty sit in dormant accounts and unclaimed pension benefits, but Poland has no public central register. We're charting which institutions accept direct search requests.",
    sources: [],
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

  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "asia-pacific",
    status: "live",
    total: "RM13–14B unclaimed",
    totalUSDB: 2.8,
    summary:
      "Over RM13 billion in unclaimed moneys — old salaries, refunds, dividends, utility deposits — is lodged with the Accountant General. The eGUMIS portal searches it all by IC or company number.",
    sources: [
      {
        id: "my-egumis",
        title: "eGUMIS — unclaimed moneys",
        operator: "Jabatan Akauntan Negara Malaysia",
        url: "https://egumis.anm.gov.my",
        amount: "RM13–14B",
        type: "state",
        access: "register",
        minutes: "~10 min",
        note: "The public search shows how many records match your ID; register and log in to claim online.",
      },
    ],
  },
  {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    region: "asia-pacific",
    status: "live",
    total: "dormant 10-year accounts escheat",
    summary:
      "Under the Unclaimed Balances Act, accounts dormant for ten years escheat to the Bureau of the Treasury — but the Treasury's reactivation circular lets holders and heirs reclaim the money.",
    sources: [
      {
        id: "ph-treasury",
        title: "Dormant accounts & escheats",
        operator: "Bureau of the Treasury / your bank",
        url: "https://www.treasury.gov.ph",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Banks must notify holders before escheat; Treasury Circular 01-2010 sets the reactivation procedure.",
      },
    ],
  },
  {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "asia-pacific",
    status: "live",
    total: "payouts on liquidated banks",
    summary:
      "If your Indonesian bank was closed — dozens have been since 1998 — the deposit insurer LPS pays out insured balances. Claims run through LPS offices long after the closure.",
    sources: [
      {
        id: "id-lps",
        title: "Liquidated bank deposits",
        operator: "LPS — Lembaga Penjamin Simpanan",
        url: "https://lps.go.id",
        amount: "Rp trillions paid",
        type: "insurance",
        access: "register",
        minutes: "~20 min",
        note: "LPS has paid trillions of rupiah on liquidated banks — claim windows stay open for years.",
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
  {
    code: "TR",
    name: "Türkiye",
    flag: "🇹🇷",
    region: "africa-me",
    status: "live",
    total: "failed-bank claims via TMSF",
    summary:
      "TMSF, the Savings Deposit Insurance Fund, runs claims for banks taken over or liquidated — including online applications through e-Devlet and qualified-share queries.",
    sources: [
      {
        id: "tr-tmsf",
        title: "TMSF savings claims",
        operator: "Tasarruf Mevduatı Sigorta Fonu",
        url: "https://www.tmsf.org.tr",
        amount: "varies",
        type: "insurance",
        access: "register",
        minutes: "~15 min",
        note: "File via e-Devlet's Investor Compensation Center or TMSF's online services for qualified shareholders.",
      },
    ],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "africa-me",
    status: "live",
    total: "5-year dormant balances to CBUAE",
    summary:
      "Under the Central Bank's Dormant Accounts and Unclaimed Funds Regulation — reissued in late 2025 with a wider scope — balances dormant for five years move to an unclaimed balances account at the CBUAE; customers and heirs reclaim through their bank.",
    sources: [
      {
        id: "ae-cbuae",
        title: "Dormant & unclaimed funds",
        operator: "Central Bank of the UAE",
        url: "https://www.centralbank.ae",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Banks must keep full records and settle customer claims once the CBUAE returns the funds.",
      },
    ],
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "africa-me",
    status: "live",
    total: "rules under SAMA's rulebook",
    summary:
      "SAMA's rulebook defines dormant (2 years), unclaimed (5) and abandoned (10–15) accounts; balances move to suspense accounts and ultimately the Ministry of Finance — reclaim via your bank.",
    sources: [
      {
        id: "sa-sama",
        title: "Dormant account rules",
        operator: "Saudi Central Bank (SAMA)",
        url: "https://rulebook.sama.gov.sa",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Claims are settled by the bank under SAMA rules — balances transferred to the state remain recoverable.",
      },
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    region: "africa-me",
    status: "live",
    total: "KSh 137B held by UFAA",
    totalUSDB: 1.0,
    summary:
      "The Unclaimed Financial Assets Authority holds roughly KSh 137 billion in bank deposits, SACCO shares, insurance and pensions — searchable online, on *361# or at any Huduma centre.",
    sources: [
      {
        id: "ke-ufaa",
        title: "UFAA asset search",
        operator: "Unclaimed Financial Assets Authority",
        url: "https://www.ufaa.go.ke",
        amount: "KSh 137B",
        type: "state",
        access: "online",
        minutes: "~10 min",
        note: "Search by name or ID number — payouts have topped KSh 2.8 billion so far.",
      },
    ],
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "africa-me",
    status: "live",
    total: "₦71.28B unclaimed at NDIC",
    totalUSDB: 0.05,
    summary:
      "₦71.28 billion in unclaimed liquidation dividends and deposits from failed banks sits with the NDIC — claims are filed through its claims-settlement department.",
    sources: [
      {
        id: "ng-ndic",
        title: "Failed-bank claims",
        operator: "Nigeria Deposit Insurance Corporation",
        url: "https://ndic.gov.ng",
        amount: "₦71.28B",
        type: "insurance",
        access: "register",
        minutes: "~20 min",
        note: "If your bank was closed by the CBN, NDIC reimburses insured deposits — file via the claims-settlement guides.",
      },
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    region: "africa-me",
    status: "live",
    total: "dormant funds transferred to BoG",
    summary:
      "Under the Unclaimed Balances and Dormant Account Directive, banks and special deposit-takers transfer dormant balances to the Bank of Ghana — holders and legal representatives can trace them on the BoG portal.",
    sources: [
      {
        id: "gh-bog",
        title: "Unclaimed balances portal",
        operator: "Bank of Ghana",
        url: "https://www.bog.gov.gh/supervision-regulation/unclaimed-balances",
        amount: "varies",
        type: "central-bank",
        access: "online",
        minutes: "~10 min",
        note: "Trace funds already transferred to the central bank — claims are settled through the original institution.",
      },
    ],
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    region: "africa-me",
    status: "live",
    total: "dormant accounts stay at banks",
    summary:
      "The Central Bank of Egypt's unified rules define dormant accounts and bar fee-deductions that drain them to zero — balances stay at your bank and are reactivated on written request.",
    sources: [
      {
        id: "eg-cbe",
        title: "Dormant account reactivation",
        operator: "Your banks — under CBE rules",
        url: "https://www.cbe.org.eg",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "A written request plus balance authentication reactivates a dormant Egyptian account.",
      },
    ],
  },
  {
    code: "BH",
    name: "Bahrain",
    flag: "🇧🇭",
    region: "africa-me",
    status: "live",
    total: "dormant balances stay claimable",
    summary:
      "The CBB rulebook governs dormant accounts and unclaimed balances: banks must keep them identifiable, must not absorb them into income, and settle customer claims on request.",
    sources: [
      {
        id: "bh-cbb",
        title: "Dormant accounts & unclaimed balances",
        operator: "Central Bank of Bahrain",
        url: "https://www.cbb.gov.bh",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Rulebook module BC, section 4.20 — claims are settled by your bank; the rulebook explicitly bars transferring such balances to bank income.",
      },
    ],
  },
  {
    code: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    region: "africa-me",
    status: "live",
    total: "KWD 35M+ in investor accounts",
    summary:
      "Dividends and sale proceeds investors never collected sit in investor accounts at the Kuwait Clearing Company — local press reports more than KWD 35 million waiting for its owners.",
    sources: [
      {
        id: "kw-kcc",
        title: "Unclaimed dividends & investor balances",
        operator: "Kuwait Clearing Company (Maqasa)",
        url: "https://www.maqasa.com",
        amount: "KWD 35M+ reported",
        type: "securities",
        access: "request",
        minutes: "~15 min",
        note: "Old dividends and scattered balances remain in KCC investor accounts — claim through Maqasa or your broker with your investor number and ID.",
      },
    ],
  },
  {
    code: "OM",
    name: "Oman",
    flag: "🇴🇲",
    region: "africa-me",
    status: "live",
    total: "dormant accounts under CBO safeguards",
    summary:
      "The Central Bank of Oman's revised instructions on dormant accounts and unclaimed funds set controls and safeguards over balances nobody has touched — the money stays protected and reclaimable through your bank.",
    sources: [
      {
        id: "om-cbo",
        title: "Dormant accounts & unclaimed funds",
        operator: "Central Bank of Oman",
        url: "https://cbo.gov.om",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Banks follow CBO circulars on dormant and unclaimed funds — a written reactivation request with ID settles the claim.",
      },
    ],
  },
  {
    code: "QA",
    name: "Qatar",
    flag: "🇶🇦",
    region: "africa-me",
    status: "live",
    total: "dormant deposits per QCB instructions",
    summary:
      "Qatar Central Bank instructions (chapter five) govern dormant deposits and unclaimed accounts: balances are preserved by the bank, and dormant deposits pass to the Estate and Minor Affairs Department — owners and heirs still reclaim through their bank.",
    sources: [
      {
        id: "qa-qcb",
        title: "Dormant deposits & unclaimed accounts",
        operator: "Qatar Central Bank",
        url: "https://www.qcb.gov.qa",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Chapter five of the QCB bank instructions — claims run through your bank; heirs coordinate with the Estate and Minor Affairs Department.",
      },
    ],
  },
  {
    code: "IQ",
    name: "Iraq",
    flag: "🇮🇶",
    region: "africa-me",
    status: "live",
    total: "dormant accounts & abandoned properties",
    summary:
      "The Central Bank of Iraq's instructions on dormant accounts and abandoned properties define how banks hold and report deposits nobody has touched — the money stays with the bank and is returned on a validated claim.",
    sources: [
      {
        id: "iq-cbi",
        title: "Dormant accounts & abandoned properties",
        operator: "Central Bank of Iraq",
        url: "https://www.cbi.iq",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Claims are filed with the bank holding the deposit under CBI instructions — identity documents and proof of connection to the account are required.",
      },
    ],
  },
  {
    code: "IR",
    name: "Iran",
    flag: "🇮🇷",
    region: "africa-me",
    status: "researching",
    total: "banks must settle dormant deposits",
    summary:
      "Parliament has obliged banks and credit institutions to settle dormant deposit accounts — reaching the holder first. No public central register exists yet; claims run directly with the bank.",
    sources: [
      {
        id: "ir-cbi",
        title: "Dormant deposit accounts",
        operator: "Your banks — under Central Bank of Iran rules",
        url: "https://www.cbi.ir",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Contact the bank holding the account — banks are mandated to resolve dormant deposits with their holders before any closure.",
      },
    ],
  },
  {
    code: "PS",
    name: "Palestine",
    flag: "🇵🇸",
    region: "africa-me",
    status: "researching",
    total: "accounts stay with the banks",
    summary:
      "The Palestine Monetary Authority supervises the banking sector and has stated accounts may not be closed or frozen without legal basis — dormant balances stay at your bank and are reactivated on request.",
    sources: [
      {
        id: "ps-pma",
        title: "Dormant account claims",
        operator: "Palestine Monetary Authority — supervised banks",
        url: "https://www.pma.ps",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "PMA banking instructions govern account handling — file the reactivation request with your bank and escalate to the PMA if needed.",
      },
    ],
  },
  {
    code: "JO",
    name: "Jordan",
    flag: "🇯🇴",
    region: "africa-me",
    status: "researching",
    total: "insured deposits via JODIC",
    summary:
      "If a Jordanian member bank is liquidated, JODIC — the Deposit Insurance Corporation — pays out the insured deposits. Dormant balances at operating banks are reactivated directly with the bank.",
    sources: [
      {
        id: "jo-jodic",
        title: "Insured deposits at liquidated banks",
        operator: "Jordan Deposit Insurance Corporation",
        url: "https://www.dic.gov.jo",
        amount: "varies",
        type: "insurance",
        access: "request",
        minutes: "~20 min",
        note: "JODIC pays the insured sum to depositors of liquidated member banks; dormant accounts at operating banks go through the bank under Central Bank of Jordan rules.",
      },
    ],
  },
  {
    code: "LB",
    name: "Lebanon",
    flag: "🇱🇧",
    region: "africa-me",
    status: "researching",
    total: "deposit repayment under BDL measures",
    summary:
      "Banque du Liban sets the measures for repaying deposits as the banking sector restructures — claims and transfers run through your bank under BDL circulars.",
    sources: [
      {
        id: "lb-bdl",
        title: "Deposit repayment measures",
        operator: "Banque du Liban",
        url: "https://www.bdl.gov.lb",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~30 min",
        note: "Check the BDL repayment measures and your bank's circular-based options before filing any claim.",
      },
    ],
  },
  {
    code: "TN",
    name: "Tunisia",
    flag: "🇹🇳",
    region: "africa-me",
    status: "live",
    total: "inactive holdings route to the state",
    summary:
      "Tunisia is formalizing dormant money: law 2024-48 governs unclaimed securities, and the 2025 finance law routes bank holdings inactive for 15+ years to the Trésor public — owners keep their claim rights.",
    sources: [
      {
        id: "tn-cmf",
        title: "Unclaimed securities",
        operator: "CMF — Conseil du Marché Financier",
        url: "https://www.cmf.org.tn",
        amount: "varies",
        type: "securities",
        access: "request",
        minutes: "~20 min",
        note: "Under law 2024-48, institutions must declare and transfer unclaimed securities — coordinate the claim with the CMF and your financial intermediary.",
      },
      {
        id: "tn-banks",
        title: "Inactive bank accounts",
        operator: "Your banks — under BCT rules",
        url: "https://www.bct.gov.tn",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~15 min",
        note: "Accounts inactive for 15+ years move to the Trésor public under the 2025 finance law — reactivation starts with your bank.",
      },
    ],
  },
  {
    code: "DZ",
    name: "Algeria",
    flag: "🇩🇿",
    region: "africa-me",
    status: "researching",
    total: "balances stay with the banks",
    summary:
      "No public central register exists yet — dormant balances remain with the banks under Banque d'Algérie banking rules, and holders or heirs reclaim them by request with identity and account proof.",
    sources: [
      {
        id: "dz-ba",
        title: "Dormant account claims",
        operator: "Your banks — under Banque d'Algérie rules",
        url: "https://www.bank-of-algeria.dz",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "File the request with the bank holding the account — the Banque d'Algérie framework governs banking conditions and account handling.",
      },
    ],
  },
  {
    code: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    region: "africa-me",
    status: "researching",
    total: "consignations held at CDG",
    summary:
      "Consigned amounts — uncashed instruments and balances whose holders never came forward — are held by the Caisse de Dépôt et de Gestion, which answers validly formulated requests. Bank accounts follow Bank Al-Maghrib rules.",
    sources: [
      {
        id: "ma-cdg",
        title: "Consignations & unclaimed balances",
        operator: "CDG — Caisse de Dépôt et de Gestion",
        url: "https://www.cdg.ma",
        amount: "varies",
        type: "deposits",
        access: "request",
        minutes: "~20 min",
        note: "Submit a valid request to the CDG for consigned funds; dormant bank accounts are handled with your bank under Bank Al-Maghrib directives.",
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
export const QUICK_PICKS = ["US", "UK", "CA", "AU", "DE", "IN", "FR", "BR", "AE", "EG"];

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
