/**
 * CivicClaim OS — global programs database (first-echelon markets).
 *
 * Every record points to an OFFICIAL government source (no middlemen).
 * Verification model:
 *  - "verified"      — key facts cross-checked against the official source on lastChecked
 *  - "auto-extracted" — extracted from official pages, pending human re-check
 * Amounts are always shown together with the source so users can confirm.
 */

export type RegionCode = "US" | "CA" | "EU" | "AU";

export type ProgramCategory =
  | "benefit"
  | "compensation"
  | "refund"
  | "pension"
  | "tax-credit"
  | "healthcare"
  | "housing"
  | "unclaimed"
  | "disaster";

export type VerificationStatus = "verified" | "auto-extracted";

export interface EligibilityRule {
  /** residency statuses that qualify; "any" = no residency restriction */
  residency?: Array<"citizen" | "permanent-resident" | "valid-visa" | "any">;
  ageMin?: number;
  ageMax?: number;
  /** income band required; "low" = means-tested */
  income?: "low" | "any";
  household?: "children" | "any";
  employment?: Array<"employed" | "unemployed" | "retired" | "student" | "any">;
  /** life situations — matched if the user reports ANY of these (OR semantics) */
  situations?: Array<"senior" | "disability" | "veteran" | "parent" | "newcomer" | "disaster">;
  housing?: "renter" | "any";
}

export interface Program {
  id: string;
  region: RegionCode;
  country: string;
  jurisdiction: string;
  category: ProgramCategory;
  name: string;
  summary: string;
  agency: string;
  sourceUrl: string;
  applyUrl: string;
  amount: string;
  deadlines: string;
  documents: string[];
  steps: string[];
  criteria: EligibilityRule;
  verification: { status: VerificationStatus; lastChecked: string };
  updatedNote: string;
}

export const REGIONS: Array<{
  code: RegionCode;
  name: string;
  flag: string;
  countries: string[];
  note: string;
}> = [
  {
    code: "US",
    name: "United States",
    flag: "US",
    countries: ["United States"],
    note: "Federal + state programs, unclaimed property, tax credits, disaster aid",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "CA",
    countries: ["Canada"],
    note: "CRC benefits, pensions, dental care, unclaimed balances",
  },
  {
    code: "EU",
    name: "Europe",
    flag: "EU",
    countries: ["European Union", "United Kingdom", "Germany", "France"],
    note: "EU-wide passenger & consumer rights plus national programs",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "AU",
    countries: ["Australia"],
    note: "Payments, lost super, unclaimed money",
  },
];

export const CATEGORY_LABELS: Record<ProgramCategory, string> = {
  benefit: "Benefits & allowances",
  compensation: "Compensation",
  refund: "Refunds",
  pension: "Pensions",
  "tax-credit": "Tax credits",
  healthcare: "Healthcare",
  housing: "Housing",
  unclaimed: "Unclaimed money",
  disaster: "Disaster relief",
};

const D = (d: string) => d; // lastChecked shortcut

export const PROGRAMS: Program[] = [
  // ---------------------------------------------------------------- US
  {
    id: "us-snap",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "benefit",
    name: "SNAP (Supplemental Nutrition Assistance)",
    summary:
      "Monthly food benefits loaded on an EBT card for low-income households. The largest food-support program in the US.",
    agency: "USDA Food and Nutrition Service",
    sourceUrl: "https://www.fns.usda.gov/snap/recipient/eligibility",
    applyUrl: "https://www.fns.usda.gov/snap/state-directory",
    amount: "Monthly benefit on EBT card — depends on household size and income",
    deadlines: "Apply any time; emergency benefits can be expedited within 7 days",
    documents: ["Proof of identity", "Proof of income", "Proof of residency", "Social Security numbers for household members"],
    steps: [
      "Check the eligibility guidelines for your state (income limits vary by household size).",
      "Gather identity, income and residency documents.",
      "Apply online or in person through your state SNAP office (state directory link).",
      "Complete the eligibility interview (usually by phone).",
      "Receive your EBT card and monthly benefits.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; conditions follow USDA FNS guidelines.",
  },
  {
    id: "us-medicaid",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "healthcare",
    name: "Medicaid",
    summary:
      "Free or very low-cost health coverage for low-income adults, children, pregnant women, elderly and people with disabilities.",
    agency: "Centers for Medicare & Medicaid Services",
    sourceUrl: "https://www.medicaid.gov/medicaid/eligibility/index.html",
    applyUrl: "https://www.healthcare.gov/medicaid/",
    amount: "Free or near-free coverage (small copays in some states)",
    deadlines: "Apply any time — no enrollment window",
    documents: ["Proof of identity and citizenship/status", "Proof of income", "Proof of residency"],
    steps: [
      "Check whether your state expanded Medicaid (income limits differ).",
      "Apply through HealthCare.gov or your state Medicaid agency.",
      "Submit income and residency documentation.",
      "Choose a health plan if your state requires it.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; state variation flagged for verification.",
  },
  {
    id: "us-chip",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "healthcare",
    name: "CHIP (Children's Health Insurance Program)",
    summary:
      "Low-cost health coverage for children in families with income too high for Medicaid but too low to afford private insurance.",
    agency: "US Department of Health & Human Services",
    sourceUrl: "https://www.insurekidsnow.gov/",
    applyUrl: "https://www.insurekidsnow.gov/coverage/index.html",
    amount: "Free or low-cost premiums and copays by state",
    deadlines: "Apply any time",
    documents: ["Child's birth certificate", "Proof of household income", "Proof of residency"],
    steps: [
      "Confirm your state's CHIP income limits.",
      "Apply via HealthCare.gov or the state program.",
      "Submit income documentation for the household.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-wic",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "benefit",
    name: "WIC (Women, Infants and Children)",
    summary:
      "Nutrition support for pregnant women, new mothers and children under 5: food packages, breastfeeding support and referrals.",
    agency: "USDA Food and Nutrition Service",
    sourceUrl: "https://www.fns.usda.gov/wic",
    applyUrl: "https://www.fns.usda.gov/wic/wic-contacts",
    amount: "Monthly food package, infant formula and nutrition counseling",
    deadlines: "Apply during pregnancy or before the child turns 5",
    documents: ["Proof of identity", "Proof of income", "Proof of pregnancy or child's age"],
    steps: [
      "Find your local WIC office (state contacts link).",
      "Schedule an eligibility appointment.",
      "Bring income, identity and pregnancy/age documents.",
      "Receive your WIC card or vouchers.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-eitc",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "tax-credit",
    name: "Earned Income Tax Credit (EITC)",
    summary:
      "Refundable federal tax credit for workers with low to moderate income. About 1 in 4 eligible workers never claims it.",
    agency: "Internal Revenue Service",
    sourceUrl: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
    applyUrl: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
    amount: "Up to $7,830 (tax year 2024) depending on children and filing status",
    deadlines: "Claim with your federal return; up to 3 prior years via amended return",
    documents: ["Social Security numbers", "W-2s or self-employment records", "Prior-year returns if amending"],
    steps: [
      "Check the IRS EITC Assistant for your eligibility and credit amount.",
      "File your federal return (free file options available).",
      "Claim EITC on the return — the credit is refundable even if you owe no tax.",
      "For missed years, file Form 1040-X within 3 years.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      employment: ["employed", "unemployed"],
      income: "low",
    },
    verification: { status: "verified", lastChecked: D("2026-11-12") },
    updatedNote: "Take-up gap (1 in 4) cross-checked with IRS statistics, Nov 2026.",
  },
  {
    id: "us-aca-ptc",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "healthcare",
    name: "ACA Premium Tax Credit",
    summary:
      "Monthly subsidy that lowers Marketplace health insurance premiums for households above Medicaid limits.",
    agency: "HealthCare.gov / IRS",
    sourceUrl: "https://www.healthcare.gov/lower-costs/",
    applyUrl: "https://www.healthcare.gov/",
    amount: "Depends on income vs. benchmark plan price — can cover most of the premium",
    deadlines: "Open enrollment (Nov 1 – Jan 15); special periods after life events",
    documents: ["Household income estimate", "Social Security numbers", "Current coverage info"],
    steps: [
      "Create a HealthCare.gov account (or your state marketplace).",
      "Enter household size and income estimate.",
      "Compare plans with the subsidy applied automatically.",
      "Report income changes during the year to avoid repayment.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-ssi",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "benefit",
    name: "Supplemental Security Income (SSI)",
    summary:
      "Monthly cash payments for people 65+ or with disabilities who have little income and few resources.",
    agency: "Social Security Administration",
    sourceUrl: "https://www.ssa.gov/benefits/ssi/",
    applyUrl: "https://www.ssa.gov/benefits/ssi/how-to-apply",
    amount: "Federal base up to ~$967/month for an individual (2025) plus state supplements",
    deadlines: "Apply as soon as eligible — payments start after approval",
    documents: ["Social Security card", "Medical records for disability claims", "Income and resource statements", "Proof of age"],
    steps: [
      "Use the SSA BEST tool to screen eligibility.",
      "Gather medical and financial documentation.",
      "Apply online (disability) or by phone/in office (age 65+).",
      "Complete the disability interview if applicable.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      situations: ["senior", "disability"],
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; amount re-check pending.",
  },
  {
    id: "us-ssa-retirement",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "pension",
    name: "Social Security Retirement",
    summary:
      "Lifetime monthly retirement benefit based on your work history. You can start from age 62 (reduced) up to 70 (increased).",
    agency: "Social Security Administration",
    sourceUrl: "https://www.ssa.gov/retirement",
    applyUrl: "https://www.ssa.gov/retirement/steps-to-apply",
    amount: "Average ~$1,976/month (2025); depends on lifetime earnings and claiming age",
    deadlines: "Apply up to 4 months before you want payments to start",
    documents: ["Social Security card", "Birth certificate", "Marriage/divorce records if claiming on a spouse", "Bank details for direct deposit"],
    steps: [
      "Create a my Social Security account and review your statement.",
      "Decide the claiming age (62–70) using the online calculators.",
      "Apply online — takes about 15 minutes for most people.",
      "Submit required documents if requested.",
    ],
    criteria: {
      residency: ["any"],
      ageMin: 62,
      employment: ["retired", "employed"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-tanf",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "benefit",
    name: "TANF (Temporary Assistance for Needy Families)",
    summary:
      "Time-limited cash assistance and work support for families with children in need.",
    agency: "Administration for Children and Families (HHS)",
    sourceUrl: "https://www.acf.hhs.gov/ofa/programs/helping-families-achieve-self-sufficiency/tanf",
    applyUrl: "https://www.acf.hhs.gov/ofa/help-for-families-find-support",
    amount: "Monthly cash grant — varies by state and family size",
    deadlines: "Apply through your state human services agency",
    documents: ["Proof of children's ages", "Income records", "Immunization and school records (some states)"],
    steps: [
      "Contact your state TANF office (family support link).",
      "Complete the application and interview.",
      "Meet work-requirement rules where they apply.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-liheap",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / state-administered",
    category: "benefit",
    name: "LIHEAP (energy assistance)",
    summary:
      "Help paying heating and cooling bills, and emergency help avoiding shutoffs, for low-income households.",
    agency: "Administration for Children and Families (HHS)",
    sourceUrl: "https://www.acf.hhs.gov/ocs/programs/liheap",
    applyUrl: "https://www.acf.hhs.gov/ocs/liheap-state-and-territory-contact-listing",
    amount: "One-time or seasonal payments to your utility — varies by state",
    deadlines: "Windows vary by state; crisis assistance available year-round in most states",
    documents: ["Recent utility bill", "Proof of income", "Proof of residency"],
    steps: [
      "Find your state LIHEAP office (contact listing link).",
      "Apply during the open window (often autumn).",
      "Submit the utility bill and income proof.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-hud-voucher",
    region: "US",
    country: "United States",
    jurisdiction: "Federal / local",
    category: "housing",
    name: "Housing Choice Voucher (Section 8)",
    summary:
      "Rental subsidy that lets very low-income families rent on the private market, paying about 30% of income toward rent.",
    agency: "US Department of Housing and Urban Development",
    sourceUrl: "https://www.hud.gov/topics/housing_choice_voucher_program",
    applyUrl: "https://www.hud.gov/topics/rental_assistance/phn_contact_tools",
    amount: "Pays the rent above ~30% of your income",
    deadlines: "Waitlists open intermittently — apply when your local PHA list opens",
    documents: ["Income statements", "ID for all household members", "Current lease (if any)"],
    steps: [
      "Find your local Public Housing Agency (PHA).",
      "Check whether the voucher waitlist is open.",
      "Submit the application and required documents.",
      "Wait for your position on the list; respond to all PHA mail.",
    ],
    criteria: {
      residency: ["any"],
      income: "low",
      housing: "renter",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-fema-ia",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "disaster",
    name: "FEMA Individual Assistance",
    summary:
      "After a federal disaster declaration: money for temporary housing, repairs, and serious unmet needs not covered by insurance.",
    agency: "Federal Emergency Management Agency",
    sourceUrl: "https://www.fema.gov/assistance/individual",
    applyUrl: "https://www.disasterassistance.gov/",
    amount: "Varies by damage — serious needs and lodging can be covered",
    deadlines: "Apply within 60 days of the disaster declaration (extensions possible)",
    documents: ["Proof of address in the disaster area", "Photos of damage", "Insurance information", "ID"],
    steps: [
      "Confirm your county is in the declared disaster area.",
      "Document all damage before cleanup (photos/videos).",
      "Apply at DisasterAssistance.gov or 1-800-621-3362.",
      "Schedule the property inspection when contacted.",
      "Appeal in writing if denied — many first decisions are reversed.",
    ],
    criteria: {
      residency: ["any"],
      situations: ["disaster"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-unclaimed",
    region: "US",
    country: "United States",
    jurisdiction: "State-level registries",
    category: "unclaimed",
    name: "State Unclaimed Property",
    summary:
      "Forgotten bank accounts, deposits, refunds, wages and securities held by state treasuries — about $70B total; roughly 1 in 10 Americans is on a list.",
    agency: "State treasurers via NAUPA",
    sourceUrl: "https://unclaimed.org/",
    applyUrl: "https://www.missingmoney.com/",
    amount: "Any amount owed to you — median successful claim is in the hundreds of dollars",
    deadlines: "No deadline in most states — money is held until claimed",
    documents: ["Proof of identity", "Proof of connection to the last known address"],
    steps: [
      "Search your name (and maiden/old names) on MissingMoney.com.",
      "Search every state you have lived in — each has its own registry (unclaimed.org).",
      "File the claim on the official state site (never pay a finder fee upfront).",
      "Submit ID and any requested proof of address.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "verified", lastChecked: D("2026-11-12") },
    updatedNote: "$70B estimate cross-checked with NAUPA reporting, Nov 2026.",
  },
  {
    id: "us-ftc-refunds",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "refund",
    name: "FTC Refund Programs",
    summary:
      "When the FTC wins a fraud case, it sends money back to affected consumers. If you ever paid a scammy company, check the active refund programs.",
    agency: "Federal Trade Commission",
    sourceUrl: "https://www.ftc.gov/refunds",
    applyUrl: "https://www.ftc.gov/refunds",
    amount: "Varies by case — from tens to thousands of dollars",
    deadlines: "Each program has its own claim window; payments auto-send in some cases",
    documents: ["Proof of payment to the company (bank/card statement)"],
    steps: [
      "Browse active refund programs on ftc.gov/refunds.",
      "Check whether your case matches your past purchases.",
      "File a claim within the window or confirm your address for auto-payments.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "us-sec-fairfunds",
    region: "US",
    country: "United States",
    jurisdiction: "Federal",
    category: "compensation",
    name: "SEC Fair Funds",
    summary:
      "Money from SEC enforcement actions distributed to harmed investors — often automatically, sometimes via claim.",
    agency: "US Securities and Exchange Commission",
    sourceUrl: "https://www.sec.gov/enforcement-litigation/fair-funds",
    applyUrl: "https://www.sec.gov/enforcement-litigation/fair-funds",
    amount: "Varies by case and your transaction volume",
    deadlines: "Case-specific; distribution plans are published per fund",
    documents: ["Brokerage records for the affected period"],
    steps: [
      "Check the Fair Funds list for cases matching your investments.",
      "Follow the distribution plan for that fund.",
      "Contact the fund administrator if you believe you were missed.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },

  // ---------------------------------------------------------------- Canada
  {
    id: "ca-ccb",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal (CRA)",
    category: "benefit",
    name: "Canada Child Benefit (CCB)",
    summary:
      "Tax-free monthly payment to families with children under 18 — one of the most generous child benefits in the world.",
    agency: "Canada Revenue Agency",
    sourceUrl: "https://www.canada.ca/en/services/benefits/family/child-benefit.html",
    applyUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html",
    amount: "Up to ~C$619/month per child under 6 (indexed; phases down with income)",
    deadlines: "Apply as soon as the child is born or starts living with you",
    documents: ["Social Insurance Number", "Child's birth certificate", "CRA My Account access"],
    steps: [
      "File your taxes (required to receive the benefit).",
      "Apply online via CRA My Account or form RC66.",
      "Keep your household income info up to date.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "any",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; current-year max pending re-check.",
  },
  {
    id: "ca-gsthst",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal (CRA)",
    category: "tax-credit",
    name: "GST/HST Credit",
    summary:
      "Tax-free quarterly payment that offsets sales tax for low- and modest-income people. Automatically assessed when you file taxes.",
    agency: "Canada Revenue Agency",
    sourceUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gsthstc.html",
    applyUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gsthstc.html",
    amount: "Up to ~C$519/year (single) plus per-child amounts; paid quarterly",
    deadlines: "File your tax return each year — even with zero income",
    documents: ["SIN", "Filed tax return"],
    steps: [
      "File your annual tax return (mandatory, even with no income).",
      "The credit is assessed automatically and paid quarterly.",
      "Confirm direct-deposit details in CRA My Account.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "ca-oas",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal",
    category: "pension",
    name: "Old Age Security (OAS)",
    summary:
      "Monthly pension for people 65+, based on years lived in Canada — no work history required.",
    agency: "Employment and Social Development Canada",
    sourceUrl: "https://www.canada.ca/en/services/benefits/publicpensions/cpp.html",
    applyUrl: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html",
    amount: "Up to ~C$727/month at 65–74 (indexed quarterly)",
    deadlines: "Apply 6 months before your 65th birthday to avoid delays",
    documents: ["SIN", "Proof of legal status", "Bank details"],
    steps: [
      "Check your eligibility age and residence years via My Service Canada Account.",
      "Apply online (auto-enrolment applies to many).",
      "Confirm banking and tax filing status.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      ageMin: 65,
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; quarterly rate pending re-check.",
  },
  {
    id: "ca-gis",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal",
    category: "pension",
    name: "Guaranteed Income Supplement (GIS)",
    summary:
      "Extra monthly payment on top of OAS for low-income seniors — the most commonly missed Canadian senior benefit.",
    agency: "Employment and Social Development Canada",
    sourceUrl: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/guaranteed-income-supplement.html",
    applyUrl: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/guaranteed-income-supplement.html",
    amount: "Up to ~C$1,086/month for a single low-income senior",
    deadlines: "Renew annually by filing taxes; apply when you start OAS",
    documents: ["SIN", "OAS number", "Income information"],
    steps: [
      "Confirm you receive (or qualify for) OAS.",
      "Apply via My Service Canada Account or form ISP-3025.",
      "File taxes every year to auto-renew.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      ageMin: 65,
      income: "low",
      situations: ["senior"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "ca-cwb",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal (CRA)",
    category: "tax-credit",
    name: "Canada Workers Benefit (CWB)",
    summary:
      "Refundable tax credit that tops up earnings of low-income workers — including an amount for people with disabilities.",
    agency: "Canada Revenue Agency",
    sourceUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-workers-benefit.html",
    applyUrl: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-workers-benefit.html",
    amount: "Up to ~C$1,511/year (single) — advance payments available",
    deadlines: "Claim with your tax return; advance applications by August",
    documents: ["Filed tax return", "Employment income records"],
    steps: [
      "File your tax return with employment income reported.",
      "Claim the CWB schedule; request advance payments (Form RC201) if desired.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      employment: ["employed"],
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "ca-ei",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal",
    category: "benefit",
    name: "Employment Insurance (EI)",
    summary:
      "Temporary income replacement if you lose your job, can't work (sickness, caregiving, parental), between jobs or upgrading skills.",
    agency: "Service Canada",
    sourceUrl: "https://www.canada.ca/en/services/benefits/ei.html",
    applyUrl: "https://www.canada.ca/en/services/benefits/ei/ei-apply.html",
    amount: "About 55% of insurable earnings, up to a weekly maximum",
    deadlines: "Apply as soon as employment ends — delays reduce benefits",
    documents: ["SIN", "ROE (Record of Employment)", "Bank details"],
    steps: [
      "Get your Record of Employment from the employer.",
      "Apply online via My Service Canada Account within days of job loss.",
      "Complete bi-weekly reports while claiming.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      employment: ["unemployed", "employed"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "ca-cdcp",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal",
    category: "healthcare",
    name: "Canadian Dental Care Plan (CDCP)",
    summary:
      "Public dental coverage for residents without private dental insurance, phased in by age groups.",
    agency: "Health Canada / Service Canada",
    sourceUrl: "https://www.canada.ca/en/services/benefits/dental.html",
    applyUrl: "https://www.canada.ca/en/services/benefits/dental.html",
    amount: "Coverage for checkups, cleanings, fillings, dentures — cost-shared by income",
    deadlines: "Applications invited by age cohort (letters from Service Canada)",
    documents: ["SIN", "Tax return filed", "No private dental insurance"],
    steps: [
      "Confirm your age cohort and adjusted family income (under ~$90k).",
      "Wait for the invitation letter or apply via the online portal when eligible.",
      "Book services with a participating dentist.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      income: "low",
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; rollout cohorts change — verify before applying.",
  },
  {
    id: "ca-dtc",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal (CRA)",
    category: "tax-credit",
    name: "Disability Tax Credit (DTC)",
    summary:
      "Non-refundable credit reducing tax for people with prolonged impairments — unlocks other benefits like the RDSP.",
    agency: "Canada Revenue Agency",
    sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html",
    applyUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html",
    amount: "Up to ~C$10k+ in credit value per year; retroactive up to 10 years",
    deadlines: "No deadline; retroactive claims possible",
    documents: ["Form T2201 certified by a medical practitioner", "Medical records"],
    steps: [
      "Discuss eligibility with your doctor/practitioner.",
      "Submit Form T2201 to the CRA for certification.",
      "Claim the credit on returns (retroactive up to 10 years).",
      "Use DTC status to open an RDSP.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      situations: ["disability"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "ca-unclaimed",
    region: "CA",
    country: "Canada",
    jurisdiction: "Federal",
    category: "unclaimed",
    name: "Bank of Canada Unclaimed Balances",
    summary:
      "Dormant bank accounts, GICs, drafts and Canada Savings Bonds transferred to the Bank of Canada — about C$1.6B and 3.6 million records.",
    agency: "Bank of Canada, Unclaimed Properties Office",
    sourceUrl: "https://www.unclaimedproperties.bankofcanada.ca/",
    applyUrl: "https://www.unclaimedproperties.bankofcanada.ca/app/claim-search",
    amount: "Any amount owed to you — held indefinitely",
    deadlines: "No deadline; balances held for 100 years after transfer",
    documents: ["Proof of identity", "Proof of connection to the account"],
    steps: [
      "Search your name (and old names) in the Claim Search tool.",
      "Start the claim on the official portal.",
      "Upload identity documentation as instructed.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "verified", lastChecked: D("2026-11-12") },
    updatedNote: "C$1.6B / 3.6M records cross-checked with BoC data, Nov 2026.",
  },

  // ---------------------------------------------------------------- Europe
  {
    id: "eu-air261",
    region: "EU",
    country: "European Union",
    jurisdiction: "EU-wide (Regulation 261/2004)",
    category: "compensation",
    name: "Air Passenger Compensation (EU261)",
    summary:
      "Fixed cash compensation of €250–€600 for denied boarding, cancellations or 3h+ delays on flights departing from (or arriving into the EU on EU carriers).",
    agency: "Your national enforcement body (per EU Regulation 261/2004)",
    sourceUrl: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm",
    applyUrl: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm",
    amount: "€250 (≤1,500 km) · €400 (intra-EU >1,500 km) · €600 (>3,500 km)",
    deadlines: "Ask the airline first; national limitation periods (usually 2–6 years) apply",
    documents: ["Boarding pass / booking confirmation", "Delay or cancellation confirmation", "Receipts for expenses"],
    steps: [
      "Keep the boarding pass and any delay/cancellation confirmation.",
      "Submit a written claim to the airline (EU261 form on their site).",
      "If refused or ignored after ~2 months, escalate to the national enforcement body or an approved ADR scheme.",
      "Small-claims court is a further option — no lawyer needed in most states.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "verified", lastChecked: D("2026-11-12") },
    updatedNote: "Amounts are fixed by Regulation 261/2004 — stable.",
  },
  {
    id: "eu-rail",
    region: "EU",
    country: "European Union",
    jurisdiction: "EU-wide (CIV regulation)",
    category: "compensation",
    name: "Rail Passenger Rights",
    summary:
      "Compensation of 25–50% of the ticket price for train delays over 60 minutes, plus meals and accommodation during long waits.",
    agency: "Railway operator / national enforcement body",
    sourceUrl: "https://europa.eu/youreurope/citizens/travel/passenger-rights/rail/index_en.htm",
    applyUrl: "https://europa.eu/youreurope/citizens/travel/passenger-rights/rail/index_en.htm",
    amount: "25% refund for 60–119 min delay; 50% for 120+ min",
    deadlines: "Submit the claim to the railway company within its claim window (often 3–12 months)",
    documents: ["Ticket / booking confirmation", "Delay confirmation from staff or the operator"],
    steps: [
      "Get a delay confirmation at the station or from the operator's app.",
      "Submit the compensation claim on the operator's website.",
      "Escalate to the national enforcement body if refused.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "eu-ehic",
    region: "EU",
    country: "European Union",
    jurisdiction: "EU/EEA-wide",
    category: "healthcare",
    name: "European Health Insurance Card (EHIC)",
    summary:
      "Free card giving you medically necessary state healthcare at local rates (usually free) across the EU/EEA, Switzerland and the UK.",
    agency: "Your national health insurer",
    sourceUrl: "https://europa.eu/youreurope/citizens/health/health-insurance-card/index_en.htm",
    applyUrl: "https://europa.eu/youreurope/citizens/health/health-insurance-card/index_en.htm",
    amount: "Free card; healthcare at the same cost as locals",
    deadlines: "Apply before travel; cards are valid up to 5 years",
    documents: ["National health insurance number / ID"],
    steps: [
      "Request the card from your national health insurer (online in most countries).",
      "Carry it on every trip in Europe.",
      "Present it at the provider before treatment.",
    ],
    criteria: { residency: ["citizen", "permanent-resident", "valid-visa"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "eu-consumer",
    region: "EU",
    country: "European Union",
    jurisdiction: "EU-wide",
    category: "refund",
    name: "EU Consumer Rights (14-day return & 2-year guarantee)",
    summary:
      "Online purchases anywhere in the EU can be returned within 14 days; goods carry a minimum 2-year legal guarantee.",
    agency: "Your national consumer protection authority",
    sourceUrl: "https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm",
    applyUrl: "https://europa.eu/youreurope/citizens/consumers/problem/index_en.htm",
    amount: "Full refund within 14 days of return; free repairs/replacement under guarantee",
    deadlines: "14 days to withdraw from a distance purchase; 2 years to enforce guarantee rights",
    documents: ["Order confirmation / receipt", "Correspondence with the seller"],
    steps: [
      "Send a withdrawal notice within 14 days (template exists on Your Europe).",
      "Return the item and get a full refund within 14 days of the seller receiving it.",
      "For defects, demand repair or replacement under the 2-year guarantee.",
      "Escalate to the national consumer centre or the EU ODR platform.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "de-kindergeld",
    region: "EU",
    country: "Germany",
    jurisdiction: "National",
    category: "benefit",
    name: "Kindergeld (child benefit)",
    summary:
      "Monthly payment from the German state for every child, paid until 18 (or 25 if in education).",
    agency: "Familienkasse (Federal Employment Agency)",
    sourceUrl: "https://www.familien-wegweiser.de/",
    applyUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
    amount: "€255 per child per month (2025)",
    deadlines: "Apply in writing; retroactive payment limited to 6 months",
    documents: ["Tax ID (Steuer-ID)", "Birth certificates", "Residence registration (Meldebescheinigung)"],
    steps: [
      "Gather the tax IDs of parent(s) and child(ren).",
      "Submit the Kindergeld application (KG1 form) to the Familienkasse.",
      "Respond to any follow-up from the Familienkasse.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "any",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; 2025 rate noted, verify at application.",
  },
  {
    id: "fr-apl",
    region: "EU",
    country: "France",
    jurisdiction: "National",
    category: "housing",
    name: "APL (aide personnalisée au logement)",
    summary:
      "Housing benefit paid directly to the landlord to reduce rent for low-income residents.",
    agency: "Caisse d'Allocations Familiales (CAF)",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F1200",
    applyUrl: "https://wwwd.caf.fr/",
    amount: "Depends on rent, income and household — often a significant share of rent",
    deadlines: "Apply as soon as you move in; retroactive limited",
    documents: ["Rental contract", "Bank details (RIB)", "Income declaration", "ID/residence permit"],
    steps: [
      "Create an account on caf.fr.",
      "File the housing-aid application online.",
      "Send/confirm documents (rental contract, RIB).",
      "Payments go directly to the landlord; you pay the remainder.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      income: "low",
      housing: "renter",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "fr-rsa",
    region: "EU",
    country: "France",
    jurisdiction: "National",
    category: "benefit",
    name: "RSA (revenu de solidarité active)",
    summary:
      "Minimum income for residents 25+ (or younger parents) with little or no income — tops up earnings if you work.",
    agency: "Caisse d'Allocations Familiales (CAF)",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F19978",
    applyUrl: "https://wwwd.caf.fr/",
    amount: "Up to ~€650/month for a single person without income (2025 scale)",
    deadlines: "Apply any time; reviewed quarterly",
    documents: ["ID / residence permit", "Housing details", "Income and bank statements"],
    steps: [
      "Check the current scale on service-public.fr.",
      "Apply via caf.fr or the departmental council.",
      "Declare resources every quarter.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      ageMin: 25,
      income: "low",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "uk-pension-credit",
    region: "EU",
    country: "United Kingdom",
    jurisdiction: "National",
    category: "pension",
    name: "Pension Credit (UK)",
    summary:
      "Top-up for people over State Pension age guaranteeing a minimum weekly income — about a million eligible UK pensioners don't claim it.",
    agency: "HM Government (gov.uk)",
    sourceUrl: "https://www.gov.uk/pension-credit",
    applyUrl: "https://www.gov.uk/pension-credit/how-to-claim",
    amount: "Guarantees ~£218/week single (2025-26) plus savings credit for some",
    deadlines: "Apply when you reach State Pension age; backdating limited",
    documents: ["National Insurance number", "Income and pension details", "Housing costs"],
    steps: [
      "Use the gov.uk Pension Credit calculator.",
      "Apply online, by phone or post.",
      "Report income changes promptly.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      ageMin: 66,
      income: "low",
      situations: ["senior"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "uk-mylostaccount",
    region: "EU",
    country: "United Kingdom",
    jurisdiction: "National",
    category: "unclaimed",
    name: "UK Lost Accounts & Pensions",
    summary:
      "Free tracing services for dormant bank accounts, savings and lost workplace pensions.",
    agency: "My Lost Account / Pension Tracing Service (gov.uk)",
    sourceUrl: "https://www.mylostaccount.org.uk/",
    applyUrl: "https://www.gov.uk/find-pension-contact-details",
    amount: "Any amount owed to you — UK lost pensions alone are worth billions",
    deadlines: "No deadline",
    documents: ["Proof of identity", "Any old account or employer details"],
    steps: [
      "Search My Lost Account for bank/building society accounts.",
      "Use the Pension Tracing Service for old workplace pensions.",
      "Claim directly with the provider once found.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },

  // ---------------------------------------------------------------- Australia
  {
    id: "au-age-pension",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "pension",
    name: "Age Pension",
    summary:
      "Fortnightly payment for people at pension age, means-tested on income and assets — the core Australian retirement safety net.",
    agency: "Services Australia (Centrelink)",
    sourceUrl: "https://www.servicesaustralia.gov.au/age-pension",
    applyUrl: "https://www.servicesaustralia.gov.au/age-pension/eligibility",
    amount: "Fortnightly means-tested payment (rates indexed twice a year)",
    deadlines: "Claim when you reach Age Pension age; up to 3 months early claim",
    documents: ["Proof of age/identity", "Income and asset statements", "Bank details"],
    steps: [
      "Check the current Age Pension age (rising to 67).",
      "Gather income and asset records.",
      "Claim online via myGov linked to Centrelink.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      ageMin: 67,
      situations: ["senior"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "au-ftb",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "benefit",
    name: "Family Tax Benefit",
    summary:
      "Two-part payment helping families with the cost of raising children (Part A per child, Part B for single-income families).",
    agency: "Services Australia",
    sourceUrl: "https://www.servicesaustralia.gov.au/family-tax-benefit",
    applyUrl: "https://www.servicesaustralia.gov.au/family-tax-benefit/how-to-claim",
    amount: "Income-tested; paid fortnightly or yearly",
    deadlines: "Claim within 12 months of the end of the financial year",
    documents: ["Tax returns (or non-lodgement advice)", "Child care cost records"],
    steps: [
      "Confirm your myGov link to Centrelink.",
      "Lodge your tax return (or non-lodgement advice).",
      "Claim FTB online; keep child-care costs current.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "any",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "au-jobseeker",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "benefit",
    name: "JobSeeker Payment",
    summary:
      "Income support while you look for work or are temporarily unable to work — with mutual obligation requirements.",
    agency: "Services Australia (Centrelink)",
    sourceUrl: "https://www.servicesaustralia.gov.au/jobseeker-payment",
    applyUrl: "https://www.servicesaustralia.gov.au/jobseeker-payment/how-to-claim",
    amount: "Fortnightly means-tested payment (indexed)",
    deadlines: "Claim as soon as your income drops",
    documents: ["Proof of identity", "Income details", "Job separation certificate"],
    steps: [
      "Set up/confirm myGov linked to Centrelink.",
      "Lodge the claim online and report income fortnightly.",
      "Meet mutual obligations (job searches, appointments).",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      ageMin: 22,
      employment: ["unemployed", "employed"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "au-medicare",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "healthcare",
    name: "Medicare Enrollment",
    summary:
      "Free or subsidised doctor visits, tests and hospital care for Australian residents — some migrants must enroll explicitly.",
    agency: "Services Australia (Medicare)",
    sourceUrl: "https://www.servicesaustralia.gov.au/medicare",
    applyUrl: "https://www.servicesaustralia.gov.au/medicare-card",
    amount: "Free enrollment; subsidised treatment thereafter",
    deadlines: "Enroll after arrival / becoming eligible",
    documents: ["Passport / visa", "Proof of residence"],
    steps: [
      "Complete the Medicare enrollment form.",
      "Visit a service centre with ID.",
      "Receive your Medicare card.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      employment: ["any"],
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "au-ccs",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "benefit",
    name: "Child Care Subsidy",
    summary:
      "Government pays part of approved child-care fees directly to the provider — percentage depends on family income.",
    agency: "Services Australia",
    sourceUrl: "https://www.servicesaustralia.gov.au/child-care-subsidy",
    applyUrl: "https://www.servicesaustralia.gov.au/child-care-subsidy/how-to-claim",
    amount: "Up to 90% of fees for lower incomes (2024 rules)",
    deadlines: "Claim before/when care starts to avoid losing subsidy",
    documents: ["Child immunisation records", "Activity hours estimate", "Income details"],
    steps: [
      "Confirm your child's immunisation is up to date.",
      "Estimate your combined activity hours.",
      "Claim online; update income/activity changes within 14 days.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident", "valid-visa"],
      household: "children",
      income: "any",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
  {
    id: "au-fhog",
    region: "AU",
    country: "Australia",
    jurisdiction: "State/territory",
    category: "benefit",
    name: "First Home Owner Grant",
    summary:
      "One-off payment to first home buyers building or buying a new home — administered by each state revenue office.",
    agency: "State revenue offices (firsthome.gov.au gateway)",
    sourceUrl: "https://www.firsthome.gov.au/",
    applyUrl: "https://www.firsthome.gov.au/",
    amount: "Typically A$10,000–A$30,000 depending on state and property",
    deadlines: "Apply within 12 months of completion/settlement (state-specific)",
    documents: ["Contract of sale/building contract", "Proof of no prior property", "ID"],
    steps: [
      "Check your state's grant amount and property caps on firsthome.gov.au.",
      "Lodge the application with your state revenue office (often via the conveyancer).",
      "Receive payment after eligibility checks.",
    ],
    criteria: {
      residency: ["citizen", "permanent-resident"],
      housing: "any",
      income: "any",
    },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11; state variation flagged.",
  },
  {
    id: "au-lost-super",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "unclaimed",
    name: "Lost Superannuation (SuperSeeker)",
    summary:
      "A$21.2 billion in lost and ATO-held super across ~7.5 million accounts. Finding and consolidating it is free via myGov.",
    agency: "Australian Taxation Office",
    sourceUrl: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/looking-up-your-lost-super",
    applyUrl: "https://superseeker.ato.gov.au/",
    amount: "Any amount held in your name — average accounts are thousands of dollars",
    deadlines: "No deadline; consolidation recommended before retirement",
    documents: ["myGov login linked to ATO", "TFN"],
    steps: [
      "Log in to myGov linked to the ATO.",
      "Search SuperSeeker for lost accounts in your name/TFN.",
      "Consolidate chosen accounts into your preferred fund (watch insurance in old funds).",
    ],
    criteria: { residency: ["citizen", "permanent-resident", "valid-visa"] },
    verification: { status: "verified", lastChecked: D("2026-11-12") },
    updatedNote: "A$21.2B / 7.5M accounts cross-checked with ATO data (30 Jun 2026), Nov 2026.",
  },
  {
    id: "au-asic-unclaimed",
    region: "AU",
    country: "Australia",
    jurisdiction: "Federal",
    category: "unclaimed",
    name: "ASIC Unclaimed Money",
    summary:
      "Money from dormant bank accounts, life policies and unclaimed shares held by companies — searchable in one place.",
    agency: "ASIC (Moneysmart)",
    sourceUrl: "https://moneysmart.gov.au/find-unclaimed-money",
    applyUrl: "https://moneysmart.gov.au/find-unclaimed-money",
    amount: "Any amount owed to you — held by ASIC after transfer",
    deadlines: "No deadline for most categories",
    documents: ["Proof of identity", "Proof of connection to the original account"],
    steps: [
      "Search your name on the Moneysmart unclaimed-money tool.",
      "Identify the original holder of the funds.",
      "Claim directly with the institution or ASIC as instructed.",
    ],
    criteria: { residency: ["any"] },
    verification: { status: "auto-extracted", lastChecked: D("2026-11-12") },
    updatedNote: "Record created 2026-11.",
  },
];

/** Counts for the coverage section. */
export function programCounts() {
  const byRegion: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  for (const p of PROGRAMS) {
    byRegion[p.region] = (byRegion[p.region] ?? 0) + 1;
    byCountry[p.country] = (byCountry[p.country] ?? 0) + 1;
  }
  return { total: PROGRAMS.length, byRegion, byCountry };
}

export function countriesForRegion(region: RegionCode): string[] {
  return REGIONS.find((r) => r.code === region)?.countries ?? [];
}

export function programsFor(country: string | null, category: ProgramCategory | null): Program[] {
  return PROGRAMS.filter(
    (p) =>
      (country === null || p.country === country) &&
      (category === null || p.category === category),
  );
}

/**
 * Open Data Engine — registry of the sources we ingest from.
 * access: how a fresh dataset can be picked up:
 *  - "open-api"      — public API / bulk download, auto-ingested on a schedule
 *  - "public-page"   — official pages, monitored with robots.txt compliance
 *  - "request-access" — free official search/registry, access via documented request
 */
export interface DataSource {
  id: string;
  region: RegionCode;
  name: string;
  agency: string;
  access: "open-api" | "public-page" | "request-access";
  url: string;
  license: string;
  cadence: string;
  status: "live" | "planned";
}

export const DATA_SOURCES: DataSource[] = [
  { id: "us-benefit-finder", region: "US", name: "usa.gov Benefit Finder", agency: "US General Services Administration", access: "public-page", url: "https://www.usa.gov/benefit-finder", license: "US public domain", cadence: "Weekly", status: "live" },
  { id: "us-naupa", region: "US", name: "NAUPA / MissingMoney", agency: "State treasurers (NAUPA)", access: "request-access", url: "https://unclaimed.org/", license: "Per-state terms", cadence: "Monthly", status: "live" },
  { id: "us-irs", region: "US", name: "IRS EITC & credit pages", agency: "Internal Revenue Service", access: "public-page", url: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc", license: "US public domain", cadence: "Weekly", status: "live" },
  { id: "us-fema", region: "US", name: "Disaster declarations & assistance", agency: "FEMA", access: "open-api", url: "https://www.fema.gov/about/openfema", license: "OpenFEMA terms", cadence: "Daily", status: "planned" },
  { id: "us-ftc", region: "US", name: "FTC refund programs", agency: "Federal Trade Commission", access: "public-page", url: "https://www.ftc.gov/refunds", license: "US public domain", cadence: "Weekly", status: "live" },
  { id: "us-sec", region: "US", name: "SEC Fair Funds", agency: "Securities and Exchange Commission", access: "public-page", url: "https://www.sec.gov/enforcement-litigation/fair-funds", license: "US public domain", cadence: "Monthly", status: "live" },
  { id: "us-access-nyc", region: "US", name: "ACCESS NYC Benefits Screening API", agency: "NYC Opportunity", access: "open-api", url: "https://access.nyc.gov/about/", license: "Open data (NYC)", cadence: "Daily", status: "planned" },
  { id: "ca-benefits", region: "CA", name: "canada.ca benefits directory", agency: "Government of Canada", access: "public-page", url: "https://www.canada.ca/en/services/benefits.html", license: "Open Government Licence – Canada", cadence: "Weekly", status: "live" },
  { id: "ca-open", region: "CA", name: "open.canada.ca datasets", agency: "Government of Canada", access: "open-api", url: "https://open.canada.ca/en/open-data", license: "OGL-Canada 2.0", cadence: "Monthly", status: "planned" },
  { id: "ca-boc", region: "CA", name: "Unclaimed Properties Office registry", agency: "Bank of Canada", access: "request-access", url: "https://www.unclaimedproperties.bankofcanada.ca/", license: "Public search", cadence: "Monthly", status: "live" },
  { id: "eu-your-europe", region: "EU", name: "Your Europe — citizen rights", agency: "European Commission", access: "public-page", url: "https://europa.eu/youreurope/citizens/index_en.htm", license: "EU reuse policy", cadence: "Weekly", status: "live" },
  { id: "eu-data", region: "EU", name: "data.europa.eu", agency: "European Commission", access: "open-api", url: "https://data.europa.eu/en", license: "Per-dataset (mostly CC-BY)", cadence: "Monthly", status: "planned" },
  { id: "uk-govuk", region: "EU", name: "GOV.UK benefits & pensions", agency: "HM Government", access: "public-page", url: "https://www.gov.uk/browse/benefits", license: "Open Government Licence v3", cadence: "Weekly", status: "live" },
  { id: "au-services", region: "AU", name: "Services Australia payment guides", agency: "Services Australia", access: "public-page", url: "https://www.servicesaustralia.gov.au/", license: "CC-BY 4.0", cadence: "Weekly", status: "live" },
  { id: "au-data", region: "AU", name: "data.gov.au", agency: "Australian Government", access: "open-api", url: "https://data.gov.au/", license: "CC-BY 4.0", cadence: "Monthly", status: "planned" },
  { id: "au-ato", region: "AU", name: "ATO SuperSeeker (lost super)", agency: "Australian Taxation Office", access: "request-access", url: "https://superseeker.ato.gov.au/", license: "Public search (myGov)", cadence: "Monthly", status: "live" },
  { id: "au-asic", region: "AU", name: "ASIC unclaimed money", agency: "ASIC", access: "public-page", url: "https://moneysmart.gov.au/find-unclaimed-money", license: "CC-BY 4.0", cadence: "Monthly", status: "live" },
];

/** Headline stats for hero/coverage (all cross-checked Nov 2026). */
export const GLOBAL_STATS = [
  { value: "$70B", label: "unclaimed property held by US states (NAUPA)" },
  { value: "1 in 4", label: "eligible workers who never claim the EITC (IRS)" },
  { value: "A$21.2B", label: "lost superannuation in Australia (ATO)" },
  { value: "C$1.6B", label: "unclaimed balances at the Bank of Canada" },
];
