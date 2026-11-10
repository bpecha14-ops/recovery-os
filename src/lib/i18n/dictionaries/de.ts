import type { Dictionary } from "./en";

const de: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Kostenlosen Scan starten",
    openMenu: "Menü öffnen",
    language: "Sprache",
    closeMenu: "Menü schließen",
  },
  header: {
    nav: [
      "So funktioniert es",
      "Weltbibliothek",
      "Kanäle",
      "Gratis-Scanner",
      "Offene Ansprüche",
      "Zollerstattung",
      "Preise",
      "FAQ",
    ],
    ariaMainNav: "Hauptnavigation",
    ariaMobileNav: "Mobile Navigation",
    ariaHome: "RecoveryOS-Startseite",
  },
  hero: {
    pill: "Der Supreme Court hat die IEEPA-Zölle mit 6:3 gekippt",
    titleA: "Der Welt steht ",
    titleGold: "Geld",
    titleB: " zu, das sie vergessen hat.",
    subtitle:
      "RecoveryOS kartiert jede offizielle Datenbank für unbeanspruchtes Geld weltweit — für Ihr Unternehmen und für Ihren eigenen Namen — reicht Ansprüche ein und verfolgt sie, bis die Schecks auf Ihrem Konto eingehen.",
    ctaScan: "Kostenlosen Scan starten",
    ctaLibrary: "Weltbibliothek entdecken — kostenlos",
    trustNoFee: "Keine Erstattung, keine Gebühr",
    trustOfficial: "Jeder offizielle Verwalter verlinkt",
    trustDelete: "Kaufdaten auf Wunsch gelöscht",
    deadlineLead: "Schließt diese Woche:",
    deadlineBody:
      "Schweinefonds ($117M) — 29. Okt. · Putenfonds ($71.5M+) — 30. Okt. Zinsen auf ausstehende IEEPA-Erstattungen laufen mit etwa {interest}/Monat — Fristen sind der Grund, warum Unternehmen jedes Jahr rückholbares Geld verlieren.",
    stat1: "ausstehende IEEPA-Erstattungen nach dem Urteil des Supreme Court",
    stat2:
      "verifiziertes unbeanspruchtes Geld über die {markets} Weltmärkte, die wir indexieren",
    stat3: "unbeanspruchter Zolldrawback laut CBP-Schätzungen",
    stat4: "CAPE-Erstattungsanträge in den ersten 6 Tagen — der Goldrausch ist real",
    ticker: [
      "IEEPA-Zollerstattungen — $166B",
      "UK: verlorene Renten — £31.1B",
      "Frankreich: Ciclade — €7.87B",
      "Indien: UDGAM — ₹67,000 crore",
      "Korea: ruhende Guthaben — ₩14T",
      "Brasilien: SVR — R$5.65B",
      "Südafrika — R88.5B",
      "Kartellfonds Schweinefleisch — $117M",
      "Zolldrawback — $15B/yr",
      "Kartellfonds Türkei — $71.5M+",
      "Australien: verlorenes Geld — A$3B",
      "Kanada: ruhende Guthaben — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "So funktioniert es",
    headingA: "Jedes Unternehmen hat eine Kreditorenbuchhaltung.",
    headingGold: "Keines hat eine Rückholungs-Abteilung.",
    lead:
      "Die Kreditorenbuchhaltung behält im Blick, was rausgeht. Niemand behält im Blick, was zurückkommt — Erstattungen, Vergleiche, Drawback, Gebührenkorrekturen. RecoveryOS ist genau diese fehlende Abteilung und kostet erst, wenn sie sich rechnet.",
    steps: [
      {
        title: "Daten verbinden",
        text: "Fügen Sie einen Export Ihrer Einkäufe ein — eine QuickBooks-CSV, einen Stripe- oder Bankauszug oder vierzig Zeilen, die Sie einfach hineinkopieren. Dauert etwa vier Minuten. Nichts verlässt Ihren Browser, bevor Sie den Scan starten.",
      },
      {
        title: "Wir gleichen jede Zeile ab",
        text: "Die Engine vergleicht jeden Einkauf mit offenen Sammelklage-Fenstern, Zollpositionen und Drawback-Regeln — und zeigt Ihnen, was matchte, warum es matchte und eine konservative Schätzung, bevor Sie sich auf irgendetwas festlegen.",
      },
      {
        title: "Schecks kommen an — dann werden wir bezahlt",
        text: "Ansprüche laufen über offizielle Verwalter oder lizenzierte Partner. Gelder fließen direkt auf Ihr Konto. Unsere Erfolgsprovision wird schriftlich genannt und erst fällig, wenn Geld ankommt.",
      },
    ],
  },
  library: {
    eyebrow: "Die Weltbibliothek",
    heading: "Jede offizielle Datenbank für unbeanspruchtes Geld weltweit.",
    headingGold: "Für immer kostenlos.",
    leadBefore:
      "Nicht nur Amerika, und nicht nur Unternehmen. In jeder großen Volkswirtschaft liegt Geld vergessen unter der Bürokratie —",
    leadAfter:
      ". Die Weltbibliothek indexiert die offizielle Tür zu jeder einzelnen — für jeden, für $0.",
    moneyWords: [
      "ruhende Konten",
      "verlorene Renten",
      "nicht beanspruchte Dividenden",
      "herrenlose Nachlässe",
      "vergessene Einlagen",
      "nicht eingelöste Schecks",
    ],
    stats: [
      { label: "indexierte Märkte" },
      { label: "heute aktive Register" },
      { label: "verifizierte offizielle Quellen" },
      { label: "verifiziert und wartet auf Abholung" },
    ],
    tickerLive: " — live",
    tickerInLab: " — im Labor",
    searchTitle: "Finden Sie das Geld, das die Bürokratie vergessen hat —",
    searchTitleGold: "auf Ihren eigenen Namen.",
    searchLead:
      "Ein Name, Ihre Länder. Wir erstellen Ihre persönliche Checkliste offizieller Datenbanken für die Suche — jeder Eintrag kostenlos, jeder Link offiziell.",
    nameLabel: "Zu suchender Name — bleibt in Ihrem Browser, wird nie irgendwohin gesendet",
    namePlaceholder: "z. B. Maria Gonzalez",
    countriesLabel: "Länder, in denen Sie gelebt, gearbeitet oder ein Konto hatten",
    selectedCount: "{count}/8 ausgewählt",
    pickerPlaceholder: "{count} Märkte durchsuchen — USA, UK, Kenia, Malaysia…",
    pickerNoMatch:
      "Kein Markt passt zu „{query}“ — versuchen Sie den vollständigen Namen, z. B. „Japan“.",
    buildChecklist: "Meine kostenlose Checkliste erstellen",
    searchPrivacy:
      "Für immer kostenlos, ohne Stufen. Wir merken uns Ihre Suche, um Sie zu benachrichtigen, wenn neue Register für Ihre Länder live gehen — das ist das ganze Geschäftsmodell. Jederzeit löschbar.",
    errorNameRequired: "Nennen Sie uns den Namen, nach dem wir suchen sollen.",
    errorNoCountries:
      "Wählen Sie mindestens ein Land, in dem Sie gelebt, gearbeitet oder ein Konto hatten.",
    errorSearchFailed: "Suche fehlgeschlagen. Bitte erneut versuchen.",
    errorNetwork: "Netzwerkfehler — bitte erneut versuchen.",
    closeResults: "Ergebnisse schließen",
    checklistReadyOne: "Checkliste fertig für {count} Land",
    checklistReadyMany: "Checkliste fertig für {count} Länder",
    officialDatabases: "offizielle Datenbanken",
    toSearch: "zu durchsuchen",
    resultPrivacy:
      "Es wurde nichts gespeichert — nur Sie können diese Checkliste sehen. Arbeiten Sie die Liste ab — die meisten Einträge dauern weniger als 10 Minuten.",
    databasesCount: "{count} Datenbanken",
    openOfficialSearch: "Offizielle Suche öffnen",
    openTracker: "Tracker öffnen",
    regionsAriaLabel: "Weltregionen",
    sourceCountOne: "{count} offizielle Quelle",
    sourceCountMany: "{count} offizielle Quellen",
    inTheLab: "Im Labor",
    badgeLive: "Live",
    badgeResearching: "In Recherche",
    viewSources: "Quellen ansehen",
    launchesHere: "Startet hier, sobald wir die Antragswege verifiziert haben.",
    referralEyebrow: "Selbst $40 gefunden?",
    referralTitle: "Ihrem Unternehmen stehen",
    referralTitleGold: "100× mehr zu.",
    referralText:
      "Dieselbe Bürokratie, im Unternehmensmaßstab: Zollerstattungen bei jedem Import, Sammelklagen bei jeder Bestellung, Drawback bei jeder Wiederausfuhr. Richten Sie den Scanner auf die Bücher Ihres Unternehmens und sehen Sie die echte Zahl.",
    runBusinessScan: "Unternehmens-Scan starten",
    principles: [
      {
        title: "Für immer kostenlos — Selbermachen zuerst",
        text: "Wir zeigen Ihnen genau, wie Sie in wenigen Minuten selbst einreichen. Kein Vermittler nötig, niemals. Keine kostenpflichtigen Stufen für Privatpersonen, Punkt.",
      },
      {
        title: "Nur offizielle Links",
        text: "Jeder Eintrag verweist auf die Regierungsdatenbank, die Zentralbank oder den vom Gericht bestellten Verwalter. Keine Nachahmer.",
      },
      {
        title: "Lebendige Daten",
        text: "Neue Register gehen jedes Quartal live. Die Bibliothek verfolgt sie laufend, damit Ihre Checkliste nie veraltet.",
      },
    ],
    officialSourcesCount: "{count} offizielle Quellen",
    officialSite: "Offizielle Website",
    addToSearch: "{country} zu meiner kostenlosen Suche hinzufügen",
    footnoteIntro:
      "Zahlen zusammengestellt aus offiziellen Programmangaben und großen Medien, Stand Ende 2026 —",
    footnoteOutro: "Prüfen Sie alles immer auf der offiziellen Website, bevor Sie handeln.",
  },
  channels: {
    eyebrow: "Kanäle",
    headingA: "Eine Engine, jeder Kanal, in dem",
    headingGold: "Unternehmensgeld feststeckt.",
    lead:
      "Jeder Kanal ist für sich genommen langweilig — ein paar Prozent hier, ein verpasster Fonds dort. Stapeln Sie sie über denselben Einkaufsdaten, wachsen sie zu einem wiederkehrenden Rückholungsstrom zusammen.",
    items: [
      {
        title: "Sammelklage-Vergleiche",
        stat: "Milliarden",
        statLabel: "liegen unbeansprucht in offenen Fonds",
        description:
          "Kartellvergleiche zahlen Unternehmen Überpreise zurück — für alles von Schweine- und Putenfleisch über Beton bis Verpackung. Die Antragsquoten sind winzig — die meisten Käufer reichen nie etwas ein.",
        statusNote: "Jetzt live — 5+ Fonds im Blick",
      },
      {
        title: "IEEPA-Zollerstattungen",
        stat: "$166B",
        statLabel: "zur Rückzahlung an 330.000 Importeure angeordnet",
        description:
          "Der Supreme Court hat die IEEPA-Zölle mit 6:3 gekippt. Jede darunter gezahlte Abgabe ist über das CAPE-Portal der CBP verzinst erstattungsfähig — die Fristen reichen bis 2027–2028.",
        statusNote: "Jetzt live — Rechner unten",
      },
      {
        title: "Zolldrawback",
        stat: "~$15B/yr",
        statLabel: "unbeansprucht, laut CBP-Schätzungen",
        description:
          "Bis zu 99 % der Zölle auf importierte Waren, die später ausgeführt oder vernichtet wurden, lassen sich zurückholen. Die meisten KMU haben noch nie einen einzigen Drawback-Antrag gestellt.",
        statusNote: "Jetzt live — Prüfung im Scan enthalten",
      },
      {
        title: "Fracht- und Paketaudits",
        stat: "$1B+",
        statLabel: "Branche, die Überberechnungen im Versand zurückholt",
        description:
          "Verspätete Lieferungen, doppelte Zuschläge und Maßfehler lassen 1–3 % der Versandkosten versickern. Auditfirmen nehmen 25–50 % Erfolgsprovision — wir bündeln alles in einer Plattform.",
        statusNote: "Q1 2027",
      },
      {
        title: "F&E-Steuergutschriften",
        stat: "Die meisten",
        statLabel: "berechtigte KMU reichen nie einen Antrag ein",
        description:
          "US-, UK- und EU-Förderprogramme bleiben bei kleinen berechtigten Firmen routinemäßig unbeansprucht. Wir prüfen Ihre Entwicklungsausgaben vorab und übergeben die Unterlagen einem lizenzierten Steuerberater.",
        statusNote: "Q1 2027",
      },
      {
        title: "Unbeanspruchtes Vermögen (B2B)",
        stat: "$100–150B",
        statLabel: "gehalten von US-Bundesstaaten, Unternehmen inklusive",
        description:
          "Vergessene Lieferantengutschriften, nicht eingelöste Erstattungen, alte Einlagen — der stille Heimfall ruhender Guthaben schluckt jedes Jahr Unternehmensgeld. Wir durchkämmen alles fortlaufend.",
        statusNote: "Q2 2027",
      },
    ],
    ticker: [
      "SCOTUS 6:3 — IEEPA-Zölle rechtswidrig",
      "CAPE: 75.300 Anträge in den ersten 6 Tagen",
      "Zinsen von ≈ $650M/Monat auf ausstehende Erstattungen",
      "Drawback: bis zu 99 % der Zölle zurückholbar",
      "Antragsquoten bei Sammelklagen: meist unter 10 %",
      "1 von 10 Amerikanern steht auf einer Liste für unbeanspruchtes Geld",
      "Schweinefonds $117M — Frist wird verfolgt",
      "Putenfonds $71.5M+ — Frist wird verfolgt",
    ],
  },
  scanner: {
    eyebrow: "Gratis-Scanner",
    headingA: "Richten Sie uns auf Ihre Einkäufe.",
    headingGold: "Wir finden das Geld.",
    lead:
      "Kein Konto, kein Upload an Dritte — fügen Sie einen Export aus QuickBooks, Stripe oder Ihrer Bank ein, und die Engine gleicht jede Zeile mit aktiven Rückholungskanälen ab.",
    tabs: {
      upload: "CSV hochladen",
      paste: "Daten einfügen",
    },
    upload: {
      chooseAriaLabel: "CSV-Datei mit Einkäufen auswählen",
      choose: "Klicken Sie, um eine CSV-/TSV-Datei auszuwählen",
      expectedColumns: "Erwartete Spalten: Date, Description, Amount",
    },
    paste: {
      label: "Einkaufszeilen einfügen",
      placeholder:
        "Date,Description,Amount\n2025-04-18,IEEPA-Zoll — Teile aus China,28500\n2016-09-02,Bauchspeck — Smithfield,4120.50",
      hint: "CSV oder TSV, ein Einkauf pro Zeile. Exporte aus QuickBooks, Stripe, Xero und den meisten Banken funktionieren unverändert.",
    },
    loadSample: "Keine Daten zur Hand? Realistisches Beispiel laden",
    privacyNote: "Wir speichern nur aggregierte Scan-Statistiken — nie Ihre Zeilen.",
    preview: {
      usableRowsLabel: "nutzbare Zeilen",
      skipped: "{count} übersprungen",
      totalSpendLabel: "Gesamtausgaben:",
      colDate: "Datum",
      colDescription: "Beschreibung",
      colAmount: "Betrag",
      moreRows: "…und {count} weitere Zeilen werden gescannt.",
    },
    actions: {
      run: "Scan starten",
      scanning: "Kanäle werden gescannt…",
      scanningAriaLabel: "Scan läuft",
      clear: "Leeren",
    },
    toasts: {
      fileTooLargeTitle: "Datei zu groß",
      fileTooLargeBody: "Halten Sie Exporte unter 5 MB (~100.000 Zeilen).",
      sampleLoadedTitle: "Beispieldaten geladen",
      sampleLoadedBody:
        "14 Zeilen eines fiktiven mittelständischen Lebensmittelgroßhändlers und -importeurs.",
    },
    errors: {
      noUsableRows:
        "Keine nutzbaren Zeilen gefunden. Erwartet werden Spalten wie Date, Description, Amount (CSV oder TSV, exportiert aus QuickBooks, Stripe oder Ihrer Bank).",
    },
    results: {
      complete: "Scan abgeschlossen — {count} Zeilen analysiert",
      foundLabel: "Gefunden:",
      matchedChannelsOne: "Über {count} passenden Kanal.",
      matchedChannelsMany: "Über {count} passende Kanäle.",
      conservativeNote:
        "Konservative Spannen — die Auszahlung hängt von Ihren Nachweisen und den insgesamt bei jedem Fonds eingereichten Ansprüchen ab.",
      ieepaIncluded:
        "Enthält IEEPA-Zollerstattungen von {low}–{high} (Zölle zurück + gesetzliche Zinsen, vor Einreichungskosten).",
      missedClosed:
        "Außerdem entgingen Ihnen {low}–{high} an bereits geschlossenen Ansprüchen. Monitoring stellt sicher, dass das nie wieder passiert.",
      claimCta: "Mit RecoveryOS beantragen",
      scanAnother: "Weitere Datei scannen",
    },
    match: {
      finalDay: "Letzter Tag",
      daysLeft: "noch {count} Tage",
      fundBadge: "Fonds: {size}",
      matchedPurchases: "Übereinstimmende Einkäufe ({count})",
      moreLines: "+ {count} weitere Zeilen",
      matchedVolumeLabel: "Übereinstimmendes Volumen:",
      estimatedRecovery: "Geschätzte Rückholung",
      whoCanClaimLabel: "Wer kann beantragen: ",
      evidenceLabel: "Nachweise: ",
      claimCta: "Mit RecoveryOS beantragen",
      closedCta: "Geschlossen — auf die Watchlist setzen",
      officialSite: "Offizielle Website",
    },
    disclaimer:
      "Schätzungen sind Modellierungshilfen, keine Garantien oder Rechtsberatung. Auszahlungen hängen von der Antragsqualität, den Nachweisen und der Gesamtzahl der Ansprüche je Fonds ab. Sie können immer direkt beim offiziellen Verwalter einreichen — Links finden Sie bei jedem Fonds.",
  },
  settlements: {
    eyebrow: "Live-Tracker offener Ansprüche",
    heading: "Offene Fonds, echte Fristen.",
    lead:
      "Jeder Fonds weiter unten ist ein öffentlich eingereichter Fall mit offiziellem Verwalter. Wir verfolgen sie, damit Ihr Unternehmen nie erst eine Woche nach Ablauf von Gratisgeld erfährt.",
    filterAria: "Fonds filtern",
    filters: [
      { label: "Alle Fonds" },
      { label: "Schließen bald" },
      { label: "Offen" },
      { label: "Verifikationsfenster" },
      { label: "Geschlossen (verpasst)" },
    ],
    statusOpen: "Offen",
    statusClosingSoon: "Schließt bald",
    statusClosed: "Geschlossen — verpasst",
    statusVerify: "Verifikationsfenster",
    deadlineVerify: "Antragsfenster — beim Verwalter verifizieren",
    daysMonitor: "überwachen",
    daysPast: "seit {days} Tagen abgelaufen",
    lastDay: "letzter Tag",
    daysLeftCount: "noch {days} Tage",
    fundBadge: "Fonds: {fund}",
    purchasesLabel: "Einkäufe:",
    deadlineTerm: "Frist:",
    eligibleLabel: "Wer kann beantragen:",
    testInScanner: "Im Scanner testen",
    officialSite: "Offizielle Website",
    disclaimer:
      "Fondsdaten, Sammelklage-Fenster und Fristen stammen aus öffentlichen Gerichtseinreichungen und Verwaltermitteilungen, Stand Ende Oktober 2026. Fristen ändern sich — bestätigen Sie jedes Datum immer auf der offiziellen Vergleichs-Website, oder überlassen Sie es unserer Monitoring-Watchlist.",
  },
  ieepa: {
    eyebrow: "Kanal im Fokus — IEEPA",
    heading: "Der Supreme Court hat die Zölle gekippt. Jetzt muss das Geld zurück.",
    lead:
      "Am 20. Februar 2026 urteilte das Gericht mit 6:3, dass die IEEPA-Zölle rechtswidrig waren ({case}). Rund {totalRefunds}, gezahlt von {importers} Importeuren über {entries} Einträge, müssen verzinst zurückgezahlt werden — über das CAPE-Portal der CBP, mit Fristen bis {deadlines}.",
    capeLivePre: "CAPE ging am {date} live. In den ersten sechs Tagen erhielt das Portal",
    capeLivePost:
      "Anträge mit 11,2 Mio. Einträgen — KMU, die schnell handeln, bekommen ihr Geld zuerst.",
    interestPre: "Der Zinseszins läuft mit rund {rate}%/Jahr — etwa",
    interestPost:
      "pro Monat läuft über alle ausstehenden Erstattungen an, während Anträge in den Warteschlangen liegen.",
    failedValidationPre: "Etwa",
    failedValidationPost:
      "Einträge haben die CAPE-Validierung bereits bei der ersten Einreichung nicht bestanden — eine saubere Datenaufbereitung ist das A und O.",
    servicesText:
      "Wir bereiten Einträge auf, beheben Validierungsfehler, erzeugen CAPE-fertige Dateien und verfolgen jede Frist. Die Einreichung bleibt bei Ihnen oder Ihrem lizenzierten Zollbroker — keine Lizenzspielchen.",
    estimatorTitle: "Erstattungs- und Zinsrechner",
    estimatorNote: "Nur eine Faustregel — Ihre Einträge bestimmen die genaue Zahl.",
    principalLabel: "Gezahlte IEEPA-Zölle gesamt (USD)",
    dateLabel: "Letzte Zollzahlung",
    rateLabel: "Zinssatz (%/Jahr)",
    includeInterestLabel: "Bis heute aufgelaufene Zinsen einbeziehen (Standard ≈{rate}%/Jahr)",
    dutiesBackLabel: "Zölle zurück",
    interestLabel: "Zinsen",
    totalLabel: "Gesamt",
    dripLine:
      "Zinsen, die seit dem Öffnen dieser Seite auf die ausstehenden IEEPA-Erstattungen der USA auflaufen:",
    ctaButton: "Meinen CAPE-Antrag vorbereiten",
    disclaimer:
      "Betrifft nur IEEPA-basierte Zölle (Routen China / Kanada / Mexiko). Zölle nach Section 232/301 bleiben vom Urteil unberührt.",
  },
  pricing: {
    eyebrow: "Preise",
    headingA: "Für Menschen kostenlos. Eine Gebühr erst, wenn",
    headingGold: "Geld fließt.",
    lead:
      "Die Weltbibliothek wird nie einen Cent kosten — jede Suche macht die Karte des verlorenen Geldes schärfer, und mit dieser Karte verdienen wir. Unternehmen zahlen eine Erfolgsprovision, und nur auf Geld, das tatsächlich zurückkommt.",
    alwaysFreeBadge: "Immer kostenlos",
    plans: [
      {
        name: "Privatpersonen — die Weltbibliothek",
        price: "$0",
        cadence: "für immer kostenlos · ohne Stufen, ohne Karte, ohne Haken",
        cta: "20 Länder durchsuchen",
        features: [
          "Jede offizielle Datenbank für unbeanspruchtes Geld, die wir indexieren — weltweit",
          "Persönlicher Checklisten-Builder — Name rein, Quellen raus",
          "Alerts für neue Register in Ihren Ländern",
          "Direkte Links zur offiziellen Suche — wir stehen Ihnen nie im Weg",
          "Suchen Sie für sich, Ihre Eltern, Ihre Großeltern",
        ],
      },
      {
        name: "Unternehmens-Rückholung",
        price: "$0 im Voraus",
        cadence: "danach 8–15 % der zurückgeholten Gelder",
        cta: "Kostenlosen Scan starten",
        features: [
          "Antragsvorbereitung & Nachweis-Pakete",
          "CAPE-fertige Dateien + Validierungskorrekturen",
          "Einreichung über offizielle Verwalter oder lizenzierte Partner",
          "Fristen-Tracking, bis die Gelder ankommen",
          "Schriftliches Angebot, bevor Sie sich festlegen — keine Erstattung, keine Gebühr",
        ],
      },
      {
        name: "Partner & Daten",
        price: "Individuell",
        cadence: "Umsatzbeteiligung · API · Einblicke",
        cta: "Sprechen Sie mit uns",
        features: [
          "Für Zollbroker, Agenturen und Verbände",
          "Serien-Antragsvorbereitung für Kundenbestände",
          "API-Zugang zur Matching-Engine",
          "Aggregierte Registerabdeckung beim Marktausbau",
          "Sie behalten die Kundenbeziehung — wir betreiben die Maschine",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Berechtigte Fragen, klare Antworten.",
    items: [
      {
        question: "Ich bin Privatperson, kein Unternehmen — ist das etwas für mich?",
        answer:
          "Ja — über die Lebende Bibliothek, für immer kostenlos. Privatpersonen können unbeanspruchtes Vermögen, fällige Sparbriefe, nicht beanspruchte Renten, Steuererstattungen und Verbraucher-Sammelklagefonds in wenigen Minuten selbst hervorholen: Jeder Eintrag zeigt, wer berechtigt ist, welche Nachweise nötig sind, und verlinkt das offizielle Gratis-Tool. Die kostenpflichtige Engine (Scannen, Antragsvorbereitung, Einreichung) existiert für Unternehmen, bei denen die Anspruchshöhe den Aufwand rechtfertigt — für persönliche Ansprüche ist DIY über die Bibliothek fast immer der schnellste Weg.",
      },
      {
        question: "Ist das Rechtsberatung? Sind Sie eine Kanzlei?",
        answer:
          "Nein. RecoveryOS ist keine Anwaltskanzlei und leistet keine Rechtsberatung. Wir machen Datenarbeit: Parsen, Matching, Nachweis-Pakete, Validierung und Tracking. Ansprüche werden bei den offiziellen, vom Gericht bestellten Verwaltern eingereicht, und wo eine Rechtsordnung lizenzierte Anwälte verlangt, arbeiten wir mit ihnen zusammen. Sie können jeden Anspruch immer selbst und kostenlos einreichen — wir verlinken jede Verwalter-Website, damit Sie es können.",
      },
      {
        question: "Wie genau sind die Schätzungen?",
        answer:
          "Es sind bewusst konservative Spannen auf Basis veröffentlichter Fondsgrößen und typischer Auszahlungsquoten vergleichbarer Kartell- und Zollrückholungen. Ihre endgültige Auszahlung hängt von Ihrem dokumentierten Einkaufsvolumen, der Antragsqualität und der Zahl der Ansprüche ab, die der Fonds erhält. Wir nennen Ihnen eine schriftliche Erfolgsprovision je Anspruch, bevor Sie sich auf irgendetwas festlegen.",
      },
      {
        question: "Welche Daten brauchen Sie, und was passiert damit?",
        answer:
          "Einen Export Ihrer Einkäufe — Date, Description, Amount — aus QuickBooks, Stripe, Xero oder Ihrer Bank. Der kostenlose Scan speichert nur aggregierte Statistiken (gescannte Zeilen, gefundene Treffer). Ihre Zeilendaten werden nie verkauft oder weitergegeben und auf Wunsch gelöscht. Für die Einreichung teilen Sie Nachweise ausschließlich mit dem offiziellen Verwalter.",
      },
      {
        question: "Wann und wie zahle ich?",
        answer:
          "Nichts im Voraus. Wenn eine Rückholung auf Ihrem Konto ankommt, stellen wir unsere Erfolgsprovision (8–15 %, typischerweise 12 %) in Rechnung. Monitoring ist ein Pauschal-Abo über $99/mo, jederzeit kündbar — Launch-Partner erhalten 12 Monate gratis. Gelder aus Vergleichen und von der CBP fließen immer direkt auf Ihr Geschäftskonto, nie über uns.",
      },
      {
        question: "Warum nicht einfach eine Kanzlei beauftragen?",
        answer:
          "Gute Frage — manchmal sollten Sie das. Außenhandelsanwälte kosten $300–800/Stunde und brauchen trotzdem Ihre Daten aufbereitet. Wir übernehmen die Datenschicht ohne finanzielles Risiko, und unsere Anspruchspakete machen jeden Anwalt günstiger. Bei einfachen Fondsansprüchen braucht der Weg über den Verwalter mit vorbereitetem Paket meist gar keinen Anwalt.",
      },
      {
        question: "Welche Kanäle sind heute live, und was kommt als Nächstes?",
        answer:
          "Jetzt live: Ansprüche aus Sammelklage-Vergleichen, die Vorbereitung von IEEPA-Zollerstattungen und Drawback-Screening. Q1 2027 ergänzt Fracht- und Paket-Audits sowie das Vorab-Screening von F&E-Steuergutschriften. Q2 2027 ergänzt die Durchsuchung unbeanspruchten B2B-Vermögens. Jeder Kanal läuft auf denselben verknüpften Einkaufsdaten — kein zusätzlicher Aufwand für Sie.",
      },
      {
        question: "Wir sitzen außerhalb der USA. Betrifft das uns?",
        answer:
          "Wenn Sie in die USA exportiert oder aus den USA importiert haben, kann es Sie betreffen: IEEPA-Erstattungen gelten für jeden eingetragenen Importeur, und Kartellfonds decken Einkäufe im US-Handel ab. Als Nächstes bauen wir Erstattungskanäle für EU und UK. Sagen Sie uns, wo Sie tätig sind — wir markieren, was auf Sie zutrifft.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Launch-Liste",
    headingA: "Gefundenes Geld sollte",
    headingGold: "Sie zuerst finden.",
    lead:
      "Launch-Plätze enthalten 12 Monate Monitoring gratis, Erfolgsprovisionen zum Gründungsmitglieder-Preis (8 %) und einen Erst-Scan Ihrer Einkäufe 2024–2026 gegen jeden offenen Fonds.",
    perks: ["Keine Karte, keine Verpflichtung", "Nach dem Start jederzeit kündbar"],
    spotsClaimed: "Launch-Plätze beansprucht",
    spotsNote:
      "Plätze werden in Reihenfolge der Anmeldung vergeben — der Balken bewegt sich nur in eine Richtung.",
    successTitle: "Sie sind dabei. Willkommen an Bord.",
    successText:
      "Wir senden Ihnen Ihr Launch-Onboarding und die Dokumenten-Checkliste für die Fonds, die als Nächstes schließen. Wenn Sie irgendetwas unter den Zöllen von 2025 importiert haben, antworten Sie mit einer groben Zollsumme — wir starten die IEEPA-Schätzung.",
    emailLabel: "Geschäftliche E-Mail *",
    emailPlaceholder: "cfo@firma.de",
    companyLabel: "Unternehmen",
    companyPlaceholder: "Firmenname",
    volumeLabel: "Monatliches Einkaufsvolumen",
    volumePlaceholder: "Bereich auswählen",
    volumeOptions: [
      "Unter $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Über $1M",
    ],
    channelsLabel: "Welche Rückholungen interessieren Sie?",
    channelOptions: [
      "Sammelklage-Vergleiche",
      "IEEPA-Zollerstattungen",
      "Zolldrawback",
      "Fracht- und Paketaudits",
    ],
    submitLabel: "Meinen Launch-Platz sichern",
    savingLabel: "Speichern…",
    privacyNote: "Wir mailen über Ihr Geld — über nichts anderes. Ein Klick zum Ausstieg.",
    invalidEmailTitle: "Gültige E-Mail-Adresse eingeben",
    invalidEmailDescription: "Eine Adresse genügt.",
    joinedToastTitle: "Sie sind auf der Liste",
    joinedToastDescription:
      "Launch-Plätze werden in Reihenfolge der Anmeldung vergeben. Behalten Sie Ihr Postfach im Auge.",
    errorToastTitle: "Etwas ist schiefgelaufen",
    errorToastDescription: "Bitte versuchen Sie es gleich erneut.",
  },
  footer: {
    about:
      "Die Rückholungs-Abteilung für kleine Unternehmen — und eine kostenlose Lebende Bibliothek vergessenen Gelds für alle anderen. Wir kartieren jeden Kanal, in dem Geld feststeckt: Sammelklagen, Zollerstattungen, Drawback, unbeanspruchtes Vermögen. Sie zahlen erst, wenn Schecks ankommen.",
    productTitle: "Produkt",
    channelsTitle: "Kanäle",
    product: [
      "So funktioniert es",
      "Weltbibliothek",
      "Gratis-Scanner",
      "Offene Ansprüche",
      "IEEPA-Rechner",
      "Preise",
    ],
    channelsNav: [
      "Alle Kanäle",
      "Sammelklagen",
      "Zollerstattungen",
      "Zolldrawback",
      "Launch-Liste",
    ],
    legal1:
      "RecoveryOS ist keine Anwaltskanzlei, kein Steuerberater und kein lizenzierter Zollbroker, und nichts auf dieser Website ist Rechts-, Steuer- oder Anlageberatung. Die Lebende Bibliothek verlinkt offizielle Regierungsdatenbanken und gerichtlich bestellte Verwalter — Privatpersonen können immer direkt und kostenlos einreichen. Rückholungsschätzungen sind Modellierungshilfen auf Basis öffentlicher Einreichungen und historischer Auszahlungsquoten; tatsächliche Rückholungen hängen von Ihren Nachweisen, Ihrer Berechtigung und der Gesamtzahl der Ansprüche je Fonds ab.",
    legal2:
      "Fondsdaten, Sammelklage-Fenster und Fristen werden aus öffentlichen Gerichtseinreichungen und offiziellen Verwaltermitteilungen Stand Ende Oktober 2026 kompiliert und können sich ohne Vorankündigung ändern. Prüfen Sie Fristen immer beim offiziellen Vergleichs-Verwalter, bevor Sie sich auf sie verlassen. Ansprüche reichen immer Sie selbst ein oder ordnungsgemäß lizenzierte Partner, und die Gelder fließen direkt auf Ihr Konto.",
    copyright: "© 2026 RecoveryOS. Alle Rechte vorbehalten.",
    ariaProduct: "Produkt",
    ariaChannels: "Kanäle",
  },
  claim: {
    title: "Mit RecoveryOS beantragen",
    titleDone: "Anspruchspaket angefordert",
    descriptionDone:
      "Prüfen Sie Ihr Postfach — wir fragen nur die Dokumente ab, die der Verwalter wirklich verlangt.",
    descriptionContext:
      "Wir bereiten die Unterlagen für {context} vor und bestätigen jede Frist mit dem offiziellen Verwalter. Sie zahlen erst, wenn die Gelder ankommen.",
    descriptionDefault:
      "Wir bereiten die Unterlagen vor, bestätigen Fristen mit dem offiziellen Verwalter und reichen ein, bis die Gelder ankommen. Sie zahlen erst, wenn Geld auf Ihrem Konto eingeht.",
    nextStepsTitle: "Nächste Schritte",
    nextSteps: [
      "Senden Sie uns Ihre Einkaufsnachweise (Rechnungen / Exporte).",
      "Wir validieren den Anspruch und nennen die Erfolgsprovision schriftlich.",
      "Gelder fließen immer direkt auf Ihr Geschäftskonto.",
    ],
    emailLabel: "Geschäftliche E-Mail",
    emailPlaceholder: "cfo@firma.de",
    companyLabel: "Unternehmen",
    companyPlaceholder: "Firmenname",
    submit: "Mein Anspruchspaket anfordern",
    submitting: "Speichern…",
    footerNote:
      "Keine Erstattung, keine Gebühr. Sie können immer selbst über den offiziellen Verwalter einreichen — wir verlinken jeden Fonds.",
    invalidEmailTitle: "Gültige E-Mail-Adresse eingeben",
    invalidEmailBody: "Wir brauchen eine Adresse für Ihr Anspruchspaket.",
    queuedTitle: "Sie sind in der Warteschlange",
    queuedBody: "Wir melden uns mit Ihrem Anspruchspaket und den genau benötigten Dokumenten.",
    errorTitle: "Etwas ist schiefgelaufen",
    errorBody: "Bitte versuchen Sie es gleich erneut.",
  },
  assistant: {
    openChat: "Goldie-KI-Chat öffnen",
    closeChat: "Goldie-Chat schließen",
    chatDialog: "Chat mit der KI-Assistentin Goldie",
    askGoldie: "Fragen Sie Goldie alles",
    online: "Online · antwortet in jeder Sprache",
    aiScout: "KI-Scout",
    reset: "Konversation zurücksetzen",
    send: "Nachricht senden",
    placeholder: "Fragen Sie Goldie alles…",
    disclaimer:
      "KI-Antworten können unvollkommen sein — prüfen Sie Fonds-Details bei den offiziellen Verwaltern, die auf dieser Seite verlinkt sind.",
    greeting:
      "Hallo! Ich bin **Goldie**, Ihre Kundschafterin bei RecoveryOS. Fragen Sie mich alles über unbeanspruchtes Geld — die Weltbibliothek, Vergleichs-Fristen, Zollerstattungen oder wie der Scanner funktioniert. Ich antworte in jeder Sprache, die Sie mögen.",
    suggestions: [
      "Wie finde ich kostenlos unbeanspruchtes Geld?",
      "Was ist die IEEPA-Erstattung von $166B?",
      "Ist der Scanner wirklich privat?",
      "Was ist unbeanspruchtes Geld?",
    ],
  },
  guide: {
    welcome:
      "Willkommen! Ich bin Scout — ich streife durch diese Seite und hinterlasse Tipps, während Sie scrollen. Klicken Sie mich jederzeit an, um mit Goldie zu chatten, unserer KI-Assistentin.",
    dismiss: "Tipp ausblenden",
    mute: "Tipps für diesen Besuch stummschalten",
    unmute: "Tipps aus — einschalten",
    avatarLabel: "Scout, der Seiten-Guide — anklicken, um mit Goldie zu chatten",
    askGoldie: "Goldie zu diesem Abschnitt fragen",
    tips: {
      how: [
        "Neu hier? Dieser Streifen zeigt den ganzen Ablauf — scannen, prüfen, beantragen. Zum Ausprobieren ist keine Anmeldung nötig.",
        "Drei Schritte, null Kosten beim Erkunden. Der Scanner hat sogar ein realistisches Beispiel, das Sie mit einem Klick starten können.",
      ],
      library: [
        "Psst — der Name, den Sie hier eintippen, verlässt nie Ihren Browser. Wählen Sie Ihre Länder und erhalten Sie eine kostenlose Checkliste offizieller Register.",
        "50 Märkte, 66+ offizielle Quellen. Wählen Sie doch mal die Türkei oder die VAE — die Abdeckung reicht weit über Amerika hinaus.",
      ],
      channels: [
        "Sechs Rückholungskanäle leben hier. Allein auf der leuchtenden IEEPA-Karte warten $166B an erstattungsfähigen Zöllen.",
        "Allein der Zolldrawback sind ~$15B pro Jahr, die auf dem Tisch liegen bleiben. Frachtaudits, F&E-Gutschriften — die meisten Unternehmen prüfen das nie.",
      ],
      scanner: [
        "Probieren Sie „Realistisches Beispiel laden“ — 14 Zeilen Demo-Einkäufe finden rund $47K. Ihre Datei verlässt diesen Browser nie.",
        "Der Scanner analysiert Ihre CSV direkt hier im Browser — kein Upload, kein Konto, nichts gespeichert.",
      ],
      settlements: [
        "Fristen sind das ganze Spiel. Sortieren Sie nach verbleibenden Tagen — der Iowa-Ready-Mix-Fonds schließt am 16. November.",
        "Jede Karte verlinkt direkt zum gerichtlich bestellten Verwalter. Keine Zwischenhändler, keine Findergebühren.",
      ],
      ieepa: [
        "Zölle ab 2025 gezahlt? Der Supreme Court hat die IEEPA-Abgaben gekippt — jeder Dollar ist verzinst erstattungsfähig. Probieren Sie $120,000 im Rechner.",
        "Zinsen auf ausstehende IEEPA-Erstattungen laufen mit rund $650M pro Monat auf. Warten ist teuer.",
      ],
      pricing: [
        "Die Bibliothek ist für immer kostenlos — Menschen zahlen nie. Unternehmen zahlen nur 8–15 %, wenn tatsächlich Geld ankommt.",
        "Keine Erstattung, keine Gebühr — das steht so im Businessplan. Schriftlich kalkuliert, bevor Sie sich festlegen.",
      ],
      faq: [
        "Hier leben die guten Fragen — auch „ist das Rechtsberatung?“ (Spoiler: nein, wir sind keine Kanzlei).",
        "Die FAQ behandeln Datenschutz, Berechtigung und was nach der Einreichung passiert. Zwei gut investierte Minuten.",
      ],
      waitlist: [
        "Letzte Station! Treten Sie der Launch-Liste bei — oder fragen Sie einfach meine Kollegin Goldie alles. Sie ist die Münze in der Ecke.",
        "Auf dem Weg? Nehmen Sie die Checkliste mit — die Launch-Liste erhält Alerts zu neuen Registern in Ihren Ländern.",
      ],
    },
    ask: {
      how: "Erklären Sie mir einfach, wie RecoveryOS funktioniert.",
      library: "Wie funktioniert die Suche in der Weltbibliothek — und ist sie wirklich kostenlos?",
      channels: "Welcher Rückholungskanal passt am besten zu meinem Unternehmen?",
      scanner: "Wie gleicht der Scanner meine Einkäufe mit Vergleichs-Fonds ab?",
      settlements: "Welche Vergleichs-Fonds sind noch offen und schließen bald?",
      ieepa: "Wie beantrage ich IEEPA-Zollerstattungen über CBP CAPE?",
      pricing: "Was kostet RecoveryOS — und wann zahle ich?",
      faq: "Ist RecoveryOS seriös — und ist es Rechtsberatung?",
      waitlist: "Was bringt mir der Beitritt zur Launch-Liste?",
    },
  },
};

export default de;
