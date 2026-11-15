/**
 * CivicClaim OS — slim registry module for the overview page.
 *
 * The main page must NOT ship the full PROGRAMS array (141 KB). It only
 * needs regions, the data-source registry, headline stats and program
 * counts — so those live here, separate from the fat programs list.
 *
 * PROGRAM_COUNTS is precomputed. When you edit PROGRAMS in
 * ./programs-data.ts, refresh these numbers (see scripts/counts.mjs or
 * recount with a one-liner). A mismatch only affects displayed numbers,
 * never logic.
 */

export type RegionCode = "US" | "CA" | "EU" | "AU" | "ME" | "AS" | "AF";

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
  {
    code: "ME",
    name: "Middle East & Egypt",
    flag: "ME",
    countries: ["Israel", "Türkiye", "Saudi Arabia", "United Arab Emirates", "Qatar", "Egypt"],
    note: "Social welfare programs, pensions, cash transfers (Takaful & Karama)",
  },
  {
    code: "AS",
    name: "Asia",
    flag: "AS",
    countries: ["India", "Singapore", "Japan", "South Korea", "Malaysia", "Philippines", "Indonesia", "Pakistan", "Bangladesh", "Thailand"],
    note: "Scheme aggregators, direct transfers, dormant deposits, welfare cards",
  },
  {
    code: "AF",
    name: "Africa",
    flag: "AF",
    countries: ["South Africa", "Kenya", "Nigeria", "Ghana", "Morocco"],
    note: "Social grants, unclaimed assets registries, cash transfer programs",
  },
];

/** Precomputed from PROGRAMS (74 programs, 28 countries — Nov 2026). */
export const PROGRAM_COUNTS = {
  total: 74,
  byRegion: { US: 15, CA: 9, EU: 9, AU: 8, ME: 9, AS: 16, AF: 8 } as Record<RegionCode, number>,
  byCountry: {
    "United States": 15,
    Canada: 9,
    "European Union": 4,
    "United Kingdom": 2,
    Germany: 1,
    France: 2,
    Australia: 8,
    Israel: 2,
    "Türkiye": 2,
    "Saudi Arabia": 1,
    "United Arab Emirates": 1,
    Qatar: 1,
    Egypt: 2,
    India: 4,
    Singapore: 3,
    Japan: 1,
    "South Korea": 1,
    Malaysia: 1,
    Philippines: 2,
    Indonesia: 1,
    Pakistan: 1,
    Bangladesh: 1,
    Thailand: 1,
    "South Africa": 3,
    Kenya: 2,
    Nigeria: 1,
    Ghana: 1,
    Morocco: 1,
  } as Record<string, number>,
};

export function countriesForRegion(region: RegionCode): string[] {
  return REGIONS.find((r) => r.code === region)?.countries ?? [];
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
  { id: "ca-boc", region: "CA", name: "Unclaimed Properties Office registry", agency: "Bank of Canada", access: "request-access", url: "https://unclaimedproperties.bankofcanada.ca/", license: "Public search", cadence: "Monthly", status: "live" },
  { id: "eu-your-europe", region: "EU", name: "Your Europe — citizen rights", agency: "European Commission", access: "public-page", url: "https://europa.eu/youreurope/citizens/index_en.htm", license: "EU reuse policy", cadence: "Weekly", status: "live" },
  { id: "eu-data", region: "EU", name: "data.europa.eu", agency: "European Commission", access: "open-api", url: "https://data.europa.eu/en", license: "Per-dataset (mostly CC-BY)", cadence: "Monthly", status: "planned" },
  { id: "uk-govuk", region: "EU", name: "GOV.UK benefits & pensions", agency: "HM Government", access: "public-page", url: "https://www.gov.uk/browse/benefits", license: "Open Government Licence v3", cadence: "Weekly", status: "live" },
  { id: "au-services", region: "AU", name: "Services Australia payment guides", agency: "Services Australia", access: "public-page", url: "https://www.servicesaustralia.gov.au/", license: "CC-BY 4.0", cadence: "Weekly", status: "live" },
  { id: "au-data", region: "AU", name: "data.gov.au", agency: "Australian Government", access: "open-api", url: "https://data.gov.au/", license: "CC-BY 4.0", cadence: "Monthly", status: "planned" },
  { id: "au-ato", region: "AU", name: "ATO SuperSeeker (lost super)", agency: "Australian Taxation Office", access: "request-access", url: "https://superseeker.ato.gov.au/", license: "Public search (myGov)", cadence: "Monthly", status: "live" },
  { id: "au-asic", region: "AU", name: "ASIC unclaimed money", agency: "ASIC", access: "public-page", url: "https://moneysmart.gov.au/find-unclaimed-money", license: "CC-BY 4.0", cadence: "Monthly", status: "live" },

  // Middle East
  { id: "me-il-btl", region: "ME", name: "Bituach Leumi benefits & rates", agency: "National Insurance Institute of Israel", access: "public-page", url: "https://www.btl.gov.il", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "me-tr-aile", region: "ME", name: "Social assistance rates (65 Yaş, Engelli)", agency: "Ministry of Family and Social Services (Türkiye)", access: "public-page", url: "https://www.aile.gov.tr", license: "Government site", cadence: "Semi-annual", status: "live" },
  { id: "me-sa-citizensaccount", region: "ME", name: "Citizen Account portal", agency: "Citizen Account Program (KSA)", access: "public-page", url: "https://www.citizensaccount.gov.sa", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "me-ae-moce", region: "ME", name: "Social welfare services (u.ae / moce.gov.ae)", agency: "UAE Government", access: "public-page", url: "https://www.moce.gov.ae/en", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "me-eg-moss", region: "ME", name: "Takaful & Karama program pages", agency: "Ministry of Social Solidarity (Egypt)", access: "public-page", url: "https://www.moss.gov.eg", license: "Government site", cadence: "Quarterly", status: "live" },

  // Asia
  { id: "as-in-pmkisan", region: "AS", name: "PM-KISAN portal & beneficiary lists", agency: "Ministry of Agriculture and Farmers Welfare (India)", access: "public-page", url: "https://pmkisan.gov.in", license: "Government site (GIGM)", cadence: "Monthly", status: "live" },
  { id: "as-in-myscheme", region: "AS", name: "myScheme — 3,000+ scheme aggregator", agency: "National e-Governance Division (India)", access: "public-page", url: "https://www.myscheme.gov.in", license: "Government site", cadence: "Weekly", status: "live" },
  { id: "as-in-mgnrega", region: "AS", name: "MGNREGA public dashboard", agency: "Ministry of Rural Development (India)", access: "open-api", url: "https://dashboard.dord.gov.in/dashboardnew/mgnrega.aspx", license: "Open Government Data (India)", cadence: "Daily", status: "live" },
  { id: "as-sg-govbenefits", region: "AS", name: "govbenefits.gov.sg scheme pages", agency: "Ministry of Finance (Singapore)", access: "public-page", url: "https://www.govbenefits.gov.sg", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "as-sg-cdc", region: "AS", name: "CDC Vouchers portal", agency: "MOF / CDCs (Singapore)", access: "public-page", url: "https://vouchers.cdc.gov.sg", license: "Government site", cadence: "Per tranche", status: "live" },
  { id: "as-jp-dicj", region: "AS", name: "Dormant deposits (DICJ)", agency: "Deposit Insurance Corporation of Japan", access: "public-page", url: "https://www.dic.go.jp/english/", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "as-kr-mohw", region: "AS", name: "Basic Pension portal (기초연금)", agency: "Ministry of Health and Welfare (Korea)", access: "public-page", url: "https://basicpension.mohw.go.kr", license: "Government site", cadence: "Semi-annual", status: "live" },
  { id: "as-my-egumis", region: "AS", name: "eGUMIS unclaimed moneys registry", agency: "Accountant General's Department (Malaysia)", access: "public-page", url: "https://egumis.anm.gov.my/?lang=en", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "as-ph-dswd", region: "AS", name: "4Ps grant matrix & advisories", agency: "DSWD (Philippines)", access: "public-page", url: "https://pantawid.dswd.gov.ph", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "as-id-kemensos", region: "AS", name: "PKH program pages", agency: "Ministry of Social Affairs (Indonesia)", access: "public-page", url: "https://www.kemensos.go.id", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "as-pk-bisp", region: "AS", name: "BISP payments & eligibility", agency: "Benazir Income Support Programme (Pakistan)", access: "public-page", url: "https://bisp.gov.pk", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "as-bd-dss", region: "AS", name: "Social Services allowances", agency: "Department of Social Services (Bangladesh)", access: "public-page", url: "https://dss.gov.bd", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "as-th-msociety", region: "AS", name: "State welfare card registration", agency: "M-Society (Thailand)", access: "public-page", url: "https://www.m-society.go.th", license: "Government site", cadence: "Per round", status: "live" },

  // Africa
  { id: "af-za-sassa", region: "AF", name: "SASSA grant rates & application guides", agency: "South African Social Security Agency", access: "public-page", url: "https://www.sassa.gov.za", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "af-ke-spd", region: "AF", name: "Inua Jamii program pages", agency: "State Department for Social Protection (Kenya)", access: "public-page", url: "https://www.socialprotection.go.ke", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "af-ke-ufaa", region: "AF", name: "UFAA unclaimed assets e-register", agency: "Unclaimed Financial Assets Authority (Kenya)", access: "public-page", url: "https://www.ufaa.or.ke", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "af-ng-ndic", region: "AF", name: "NDIC claims & failed-bank lists", agency: "Nigeria Deposit Insurance Corporation", access: "public-page", url: "https://ndic.gov.ng/claims", license: "Government site", cadence: "Monthly", status: "live" },
  { id: "af-gh-leap", region: "AF", name: "LEAP program updates", agency: "Ministry of Gender, Children and Social Protection (Ghana)", access: "public-page", url: "https://leap.gov.gh", license: "Government site", cadence: "Quarterly", status: "live" },
  { id: "af-ma-rsu", region: "AF", name: "Unified Social Registry (RSU) enrolment", agency: "Ministry of Economy and Finance (Morocco)", access: "public-page", url: "https://www.rsu.ma", license: "Government site", cadence: "Quarterly", status: "planned" },
];

/** Headline stats for hero/coverage (all cross-checked Nov 2026). */
export const GLOBAL_STATS = [
  { value: "$70B", label: "unclaimed property held by US states (NAUPA)" },
  { value: "1 in 4", label: "eligible workers who never claim the EITC (IRS)" },
  { value: "A$21.2B", label: "lost superannuation in Australia (ATO)" },
  { value: "KSh 137B", label: "unclaimed financial assets in Kenya (UFAA)" },
];
