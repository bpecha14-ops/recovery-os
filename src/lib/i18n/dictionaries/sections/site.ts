/**
 * CivicClaim "site" strings — the Civic Futurism layer: global header,
 * footer and the home page. English is the source of truth; other
 * locales fall back per-key (machine translations are labeled in the
 * footer).
 */
export default {
  header: {
    nav: ["Programs", "Coverage", "Method", "Data", "About"],
    cta: "Check what I'm owed",
    menu: "Open menu",
    home: "CivicClaim — home",
  },
  footer: {
    licenseNote:
      "An open layer of verified citizens' rights. Data compilation and metadata are published under CC BY 4.0; official texts remain under their sources' terms. Code is open source.",
    translatedNote:
      "Machine-translated interface — English is the source language.",
    privacy: "Privacy",
    terms: "Terms",
    report: "Report an error",
    method: "Method",
    data: "Open data",
    impact: "Impact",
    contribute: "Contribute",
    organizations: "For organizations",
    infoNote:
      "Information about rights, not legal advice. Every figure links to its official source and verification date.",
  },
  home: {
    hero: {
      title: "Find out what you're owed under official programs.",
      subtitle:
        "Free and private. Every answer carries an official source, a verification date, and the next step. No source — no result.",
      ctaPrimary: "Check what I'm owed",
      ctaSecondary: "Browse programs",
      trust: [
        "Free forever for individuals",
        "Official source on every result",
        "Eligibility runs in your browser",
      ],
    },
    example: {
      eyebrow: "A real result",
      title: "What an answer looks like",
      verdict: "Likely eligible",
      matchedRule: "Means-tested — low income household",
      deadline: "Deadline",
      seeBreakdown: "See full breakdown",
      pending: "PENDING — hidden until verified",
    },
    how: {
      title: "How it works",
      steps: [
        {
          title: "Answer 8 questions — no name, no email, no ID.",
          body: "The wizard asks only what the rules need: country, household, rough bands. Nothing identifying, nothing stored.",
        },
        {
          title:
            "Deterministic rules — written and checked by humans, not AI — match you to rights.",
          body: "Eligibility is decided by plain rule files in the open data layer. The same answers always give the same result.",
        },
        {
          title:
            "Every result shows the official quote, the date it was checked, and your next step.",
          body: "No source, no result: each figure carries its link, its verification date and the concrete next step to claim it.",
        },
      ],
    },
    coverage: {
      title: "What we cover",
      lead: "Live program counts, computed from the open data files — never hardcoded.",
      full: "Full coverage →",
      programs: "programs",
      lastChecked: "last checked",
    },
    data: {
      title: "The rules, the sources, and the code are public.",
      lead: "Download every package, read the verification method, or help us cover the next country.",
      download: "Download the data",
      method: "Read the method",
      contribute: "Contribute or become a verifier",
    },
    faq: {
      title: "Questions people ask",
      items: [
        {
          q: "Is this free?",
          a: "Yes — free forever for individuals. Institutions (agencies, insurers, researchers) pay for API access and guarantees; that funds the free citizen layer. Individuals never pay.",
        },
        {
          q: "Is this legal advice?",
          a: "No. CivicClaim is information about rights with official sources. Complex cases route to free local legal help — we never give case strategy or predict outcomes.",
        },
        {
          q: "Do you store my answers?",
          a: "No. The wizard runs in your browser; answers live in memory only and are wiped on reload. There are no accounts and no tracking cookies.",
        },
        {
          q: "What if information is outdated?",
          a: "Every package carries a validity window. Expired content is automatically hidden from search and results until a human re-verifies it against the official source.",
        },
        {
          q: "Who verifies the rules?",
          a: "Named local verifiers — legal aid attorneys, paralegals and clinics — sign every package; their name, role and date are visible on the package and its program pages.",
        },
        {
          q: "How do you make money?",
          a: "Institutions pay for API access, bulk data and service guarantees; sponsors finance new countries and languages. Individual requests are never sold.",
        },
      ],
    },
  },
  wizardExtras: {
    introTitle: "Check what you're owed",
    neverAsk: "What we never ask",
    neverAskItems: [
      "Your name",
      "Email or phone",
      "ID numbers",
      "Income documents",
    ],
    offline: "Works offline after the page loads — answers never leave this browser.",
    start: "Start",
    print: "Print / save as PDF",
    copy: "Copy summary",
    copied: "Copied",
    legalNote: "Information, not legal advice.",
    legalHelp: "Complex case? Find free local legal help →",
    negatives:
      "Based on your answers you don't match {count} programs — see why",
    prefill: "Answer a few questions about yourself — only what the rules need.",
  },
};
