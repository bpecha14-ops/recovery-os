export default {
  eyebrow: "Free scanner",
  headingA: "Point us at your purchases.",
  headingGold: "We'll find the money.",
  lead: "No account, no upload to third parties — paste an export from QuickBooks, Stripe or your bank and the engine matches every line against live recovery channels.",
  tabs: {
    upload: "Upload CSV",
    paste: "Paste data",
  },
  upload: {
    chooseAriaLabel: "Choose a purchases CSV file",
    choose: "Click to choose a CSV / TSV file",
    expectedColumns: "Expected columns: Date, Description, Amount",
  },
  paste: {
    label: "Paste purchase rows",
    placeholder:
      "Date,Description,Amount\n2025-04-18,IEEPA tariff — China parts,28500\n2016-09-02,Bacon slab — Smithfield,4120.50",
    hint: "CSV or TSV, one purchase per line. QuickBooks, Stripe, Xero and most bank exports work as-is.",
  },
  loadSample: "No data handy? Load a realistic sample",
  privacyNote: "We store aggregate scan stats only — never your rows.",
  preview: {
    usableRowsLabel: "usable rows",
    skipped: "{count} skipped",
    totalSpendLabel: "Total spend:",
    colDate: "Date",
    colDescription: "Description",
    colAmount: "Amount",
    moreRows: "…and {count} more rows will be scanned.",
  },
  actions: {
    run: "Run the scan",
    scanning: "Scanning channels…",
    scanningAriaLabel: "Scanning",
    clear: "Clear",
  },
  toasts: {
    fileTooLargeTitle: "File too large",
    fileTooLargeBody: "Keep exports under 5 MB (~100k rows).",
    sampleLoadedTitle: "Sample data loaded",
    sampleLoadedBody:
      "14 rows from a fictional mid-size food distributor & importer.",
  },
  errors: {
    noUsableRows:
      "No usable rows found. Expected columns like Date, Description, Amount (CSV or TSV, exported from QuickBooks, Stripe or your bank).",
  },
  results: {
    complete: "Scan complete — {count} rows analyzed",
    foundLabel: "Found:",
    matchedChannelsOne: "Across {count} matched channel.",
    matchedChannelsMany: "Across {count} matched channels.",
    conservativeNote:
      "Conservative ranges — final payout depends on your evidence and total claims submitted to each fund.",
    ieepaIncluded:
      "Includes IEEPA tariff refunds of {low}–{high} (duties back + statutory interest, before filing costs).",
    missedClosed:
      "You also missed {low}–{high} in claims that already closed. Monitoring makes sure that never happens again.",
    claimCta: "Claim with RecoveryOS",
    scanAnother: "Scan another file",
  },
  match: {
    finalDay: "Final day",
    daysLeft: "{count} days left",
    fundBadge: "Fund: {size}",
    matchedPurchases: "Matched purchases ({count})",
    moreLines: "+ {count} more lines",
    matchedVolumeLabel: "Matched volume:",
    estimatedRecovery: "Estimated recovery",
    whoCanClaimLabel: "Who can claim: ",
    evidenceLabel: "Evidence: ",
    claimCta: "Claim with RecoveryOS",
    closedCta: "Closed — join watchlist",
    officialSite: "Official site",
  },
  disclaimer:
    "Estimates are modeling aids, not guarantees or legal advice. Payouts depend on claim quality, evidence and the total claims each fund receives. You can always file directly with the official administrator — links provided on every fund.",
};
