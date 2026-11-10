import type { Dictionary } from "./en";

const nl: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Voer een gratis scan uit",
    openMenu: "Menu openen",
    language: "Taal",
    closeMenu: "Menu sluiten",
  },
  header: {
    nav: [
      "Hoe het werkt",
      "Wereldbibliotheek",
      "Kanalen",
      "Gratis scanner",
      "Open claims",
      "Douaneterugvordering",
      "Prijzen",
      "FAQ",
    ],
    ariaMainNav: "Hoofdnavigatie",
    ariaMobileNav: "Mobiele navigatie",
    ariaHome: "Startpagina van RecoveryOS",
  },
  hero: {
    pill: "Het Hooggerechtshof vernietigde de IEEPA-invoerrechten met 6–3",
    titleA: "De wereld heeft ",
    titleGold: "geld",
    titleB: " te goed dat ze allang kwijt is.",
    subtitle:
      "RecoveryOS brengt elke officiële database met ongeclaimd geld ter wereld in kaart — voor uw bedrijf en voor uw eigen naam — en dient vervolgens claims in en volgt ze tot het geld op uw rekening binnenkomt.",
    ctaScan: "Voer een gratis scan uit",
    ctaLibrary: "Verken de wereldbibliotheek — gratis",
    trustNoFee: "Geen succes, geen kosten",
    trustOfficial: "Elke officiële beheerder gelinkt",
    trustDelete: "Aankoopgegevens op verzoek gewist",
    deadlineLead: "Sluit deze week:",
    deadlineBody:
      "Varkensvleesfonds ($117M) — 29 okt. · Kalkoenfondsen ($71.5M+) — 30 okt. Rente over lopende IEEPA-terugbetalingen loopt op met ongeveer {interest}/maand — deadlines zijn de reden dat bedrijven elk jaar terugvorderbaar geld laten liggen.",
    stat1: "aan lopende IEEPA-terugbetalingen na de uitspraak van het Hooggerechtshof",
    stat2:
      "aan geverifieerd ongeclaimd geld, verspreid over de {markets} wereldmarkten die wij indexeren",
    stat3: "aan niet-geclaimde drawback, volgens schattingen van CBP",
    stat4: "CAPE-aanvragen in de eerste 6 dagen — de goudkoorts is echt",
    ticker: [
      "Terugbetaling IEEPA-invoerrechten — $166B",
      "Verloren pensioenen VK — £31.1B",
      "Frankrijk Ciclade — €7.87B",
      "India UDGAM — ₹67,000 crore",
      "Korea slapende tegoeden — ₩14T",
      "Brazilië SVR — R$5.65B",
      "Zuid-Afrika — R88.5B",
      "Antitrustfonds varkensvlees — $117M",
      "Teruggaaf van invoerrechten — $15B/yr",
      "Turkije antitrust — $71.5M+",
      "Australië verloren geld — A$3B",
      "Canada slapende tegoeden — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Hoe het werkt",
    headingA: "Elk bedrijf heeft een crediteurenadministratie.",
    headingGold: "Niet één een terugvorderingsafdeling.",
    lead:
      "De crediteurenadministratie let op wat er uitgaat. Niemand let op wat er terugkomt — terugbetalingen, schikkingen, drawback, correcties op kosten. RecoveryOS is die ontbrekende afdeling, zo geprijsd dat hij er alleen is als hij zichzelf terugverdient.",
    steps: [
      {
        title: "Koppel uw gegevens",
        text: "Laad een aankoopexport — een CSV uit QuickBooks, een Stripe- of bankafschrift, of veertig regels die u zelf plakt. Duurt ongeveer vier minuten. Niets verlaat uw browser totdat u op scan klikt.",
      },
      {
        title: "Wij matchen elke regel",
        text: "De motor vergelijkt elke aankoop met openstaande klassenactietermijnen, tariefregels en drawbackregels — en toont daarna wat er matchte, waarom, en een conservatieve schatting voordat u ergens mee instemt.",
      },
      {
        title: "Eerst komt het geld binnen — dan pas worden wij betaald",
        text: "Claims verlopen via officiële beheerders of gelicenseerde partners. Gelden vloeien rechtstreeks naar uw rekening. Onze succesvergoeding wordt schriftelijk vastgelegd en pas in rekening gebracht als het geld binnenkomt.",
      },
    ],
  },
  library: {
    eyebrow: "De wereldbibliotheek",
    heading: "Elke officiële database met ongeclaimd geld op aarde.",
    headingGold: "Voor altijd gratis.",
    leadBefore:
      "Niet alleen Amerika, en niet alleen bedrijven. Geld ligt vergeten onder de bureaucratie in elke grote economie —",
    leadAfter:
      ". De wereldbibliotheek indexeert voor elk ervan de officiële deur, voor iedereen, voor $0.",
    moneyWords: [
      "slapende rekeningen",
      "verloren pensioenen",
      "ongeclaimde dividenden",
      "eigenaarloze nalatenschappen",
      "vergeten stortingen",
      "niet-geïnde cheques",
    ],
    stats: [
      { label: "geïndexeerde markten" },
      { label: "registers die nu live zijn" },
      { label: "geverifieerde officiële bronnen" },
      { label: "geverifieerd en wachtend om geclaimd te worden" },
    ],
    tickerLive: " — live",
    tickerInLab: " — in het lab",
    searchTitle: "Vind het geld dat de bureaucratie vergeten is —",
    searchTitleGold: "onder uw eigen naam.",
    searchLead:
      "Eén naam, uw landen. Wij bouwen uw persoonlijke checklist met officiële databases om te doorzoeken — elke vermelding gratis, elke link officieel.",
    nameLabel: "Naam om mee te zoeken — blijft in uw browser, wordt nergens heen gestuurd",
    namePlaceholder: "bijv. Maria Gonzalez",
    countriesLabel: "Landen waar u hebt gewoond, gewerkt of gebankierd",
    selectedCount: "{count}/8 geselecteerd",
    pickerPlaceholder: "Zoek in {count} markten — VS, VK, Kenia, Maleisië…",
    pickerNoMatch:
      "Geen enkele markt matcht “{query}” — probeer de volledige naam, bijv. “Japan”.",
    buildChecklist: "Stel mijn gratis checklist samen",
    searchPrivacy:
      "Voor altijd gratis, geen abonnementsniveaus. Wij bewaren uw zoekopdracht zodat wij u kunnen waarschuwen zodra er nieuwe registers live gaan voor uw landen — dat is het hele verdienmodel. Verwijderen kan altijd.",
    errorNameRequired: "Vermeld de naam waarop wij moeten zoeken.",
    errorNoCountries:
      "Kies minimaal één land waar u hebt gewoond, gewerkt of gebankierd.",
    errorSearchFailed: "Zoekopdracht mislukt. Probeer het opnieuw.",
    errorNetwork: "Netwerkfout — probeer het opnieuw.",
    closeResults: "Resultaten sluiten",
    checklistReadyOne: "Checklist klaar voor {count} land",
    checklistReadyMany: "Checklist klaar voor {count} landen",
    officialDatabases: "officiële databases",
    toSearch: "om te doorzoeken",
    resultPrivacy:
      "Er is niets opgeslagen — alleen u kunt deze checklist zien. Werk de lijst af — de meeste items kosten minder dan 10 minuten.",
    databasesCount: "{count} databases",
    openOfficialSearch: "Open officiële zoekpagina",
    openTracker: "Tracker openen",
    regionsAriaLabel: "Werelddelen",
    sourceCountOne: "{count} officiële bron",
    sourceCountMany: "{count} officiële bronnen",
    inTheLab: "In het lab",
    badgeLive: "Live",
    badgeResearching: "In onderzoek",
    viewSources: "Bekijk de bronnen",
    launchesHere: "Gaat hier live zodra wij de claimroutes hebben geverifieerd.",
    referralEyebrow: "Zelf $40 gevonden?",
    referralTitle: "Uw bedrijf heeft",
    referralTitleGold: "100× meer te goed.",
    referralText:
      "Dezelfde bureaucratie, op bedrijfsschaal: invoerrechterugbetalingen op elke import, klassenacties op elke inkooporder, drawback op elke herexport. Richt de scanner op de administratie van uw bedrijf en zie het echte bedrag.",
    runBusinessScan: "Voer de bedrijfsscan uit",
    principles: [
      {
        title: "Voor altijd gratis — eerst zelf doen",
        text: "Wij vertellen u precies hoe u zelf indient, binnen enkele minuten. Nooit een tussenpersoon nodig. Geen betaalde abonnementsniveaus voor particulieren, punt.",
      },
      {
        title: "Alleen officiële links",
        text: "Elke vermelding verwijst naar de overheidsdatabase, de centrale bank of de door de rechtbank aangestelde beheerder. Geen lookalikes.",
      },
      {
        title: "Levende data",
        text: "Elk kwartaal gaan nieuwe registers live. De bibliotheek volgt ze doorlopend, zodat uw checklist nooit veroudert.",
      },
    ],
    officialSourcesCount: "{count} officiële bronnen",
    officialSite: "Officiële website",
    addToSearch: "Voeg {country} toe aan mijn gratis zoekopdracht",
    footnoteIntro:
      "Cijfers samengesteld uit officiële programmakennisgevingen en grote mediabronnen per eind 2026 —",
    footnoteOutro: "Controleer altijd op de officiële website voordat u handelt.",
  },
  channels: {
    eyebrow: "Kanalen",
    headingA: "Eén motor, elk kanaal waar",
    headingGold: "bedrijfsgeld vastloopt.",
    lead:
      "Elk kanaal is op zichzelf saai — hier een paar procent, daar een gemist fonds. Zet ze naast dezelfde aankoopgegevens en ze stapelen zich op tot een terugkerende stroom van terugvorderingen.",
    items: [
      {
        title: "Schikkingen uit klassenacties",
        stat: "Miljarden",
        statLabel: "ongeclaimd in openstaande fondsen",
        description:
          "Antitrustschikkingen betalen bedrijven terug voor te veel betaalde prijzen op alles van varkens- en kalkoenvlees tot beton en verpakkingen. Claimpercentages zijn miniem — de meeste kopers dienen nooit een claim in.",
        statusNote: "Nu live — 5+ fondsen gevolgd",
      },
      {
        title: "Terugbetaling van IEEPA-invoerrechten",
        stat: "$166B",
        statLabel: "bevolen terug te betalen aan 330.000 importeurs",
        description:
          "Het Hooggerechtshof heeft de IEEPA-invoerrechten met 6–3 vernietigd. Elk onder deze rechten betaald bedrag is met rente terugvorderbaar via het CAPE-portaal van CBP — de deadlines lopen door tot 2027–2028.",
        statusNote: "Nu live — calculator hieronder",
      },
      {
        title: "Drawback van invoerrechten",
        stat: "~$15B/yr",
        statLabel: "ongeclaimd, volgens schattingen van CBP",
        description:
          "Tot 99% van de invoerrechten op geïmporteerde goederen die later werden geëxporteerd of vernietigd, is terugvorderbaar. De meeste mkb'ers hebben nog nooit één drawback-claim ingediend.",
        statusNote: "Nu live — beoordeling inbegrepen bij de scan",
      },
      {
        title: "Vracht- en pakketaudits",
        stat: "$1B+",
        statLabel: "industrie die te veel betaalde verzendkosten terugvordert",
        description:
          "Late leveringen, dubbele toeslagen en afmetingsfouten lekken 1–3% van het verzendbudget weg. Auditbureaus rekenen 25–50% van de opbrengst — wij vegen het samen in één platform.",
        statusNote: "Q1 2027",
      },
      {
        title: "R&D-belastingkredieten",
        stat: "De meeste",
        statLabel: "in aanmerking komende mkb'ers dienen nooit een claim in",
        description:
          "Kredietprogramma's in de VS, het VK en de EU blijven routinematig ongeclaimd bij kleine bedrijven die ervoor in aanmerking komen. Wij screenen uw R&D-uitgaven vooraf en leveren kant-en-klare dossiers aan bij een erkende fiscalist.",
        statusNote: "Q1 2027",
      },
      {
        title: "Ongeclaimd vermogen (B2B)",
        stat: "$100–150B",
        statLabel: "in handen van Amerikaanse staten, bedrijven inbegrepen",
        description:
          "Vergeten leverancierskredieten, niet-geïnde terugbetalingen, oude stortingen — de versterving van slapende tegoeden neemt elk jaar geruisloos bedrijfsgeld in. Wij houden het doorlopend in de gaten.",
        statusNote: "Q2 2027",
      },
    ],
    ticker: [
      "Hooggerechtshof 6–3 — IEEPA-invoerrechten onrechtmatig",
      "CAPE: 75.300 aanvragen in de eerste 6 dagen",
      "Rente loopt op met ≈ $650M/maand over openstaande terugbetalingen",
      "Drawback: tot 99% van de invoerrechten terugvorderbaar",
      "Claimpercentages bij klassenacties: meestal onder de 10%",
      "1 op de 10 Amerikanen staat op een lijst voor ongeclaimd geld",
      "Varkensvleesfonds $117M — deadline gevolgd",
      "Kalkoenfondsen $71.5M+ — deadline gevolgd",
    ],
  },
  scanner: {
    eyebrow: "Gratis scanner",
    headingA: "Laat ons uw aankopen zien.",
    headingGold: "Wij vinden het geld.",
    lead:
      "Geen account, geen upload naar derden — plak een export uit QuickBooks, Stripe of uw bank en de motor matcht elke regel met de actieve terugvorderingskanalen.",
    tabs: {
      upload: "CSV uploaden",
      paste: "Gegevens plakken",
    },
    upload: {
      chooseAriaLabel: "Kies een CSV-bestand met aankopen",
      choose: "Klik om een CSV-/TSV-bestand te kiezen",
      expectedColumns: "Verwachte kolommen: Date, Description, Amount",
    },
    paste: {
      label: "Plak aankoopregels",
      placeholder:
        "Date,Description,Amount\n2025-04-18,IEEPA-invoerrecht — onderdelen China,28500\n2016-09-02,Spekblok — Smithfield,4120.50",
      hint: "CSV of TSV, één aankoop per regel. Exporten uit QuickBooks, Stripe, Xero en de meeste banken werken direct.",
    },
    loadSample: "Geen gegevens bij de hand? Laad een realistische voorbeeldset",
    privacyNote: "Wij slaan alleen geaggregeerde scanstatistieken op — nooit uw regels.",
    preview: {
      usableRowsLabel: "bruikbare regels",
      skipped: "{count} overgeslagen",
      totalSpendLabel: "Totale uitgaven:",
      colDate: "Datum",
      colDescription: "Omschrijving",
      colAmount: "Bedrag",
      moreRows: "…en nog {count} regels worden gescand.",
    },
    actions: {
      run: "Scan uitvoeren",
      scanning: "Kanalen scannen…",
      scanningAriaLabel: "Scannen",
      clear: "Wissen",
    },
    toasts: {
      fileTooLargeTitle: "Bestand te groot",
      fileTooLargeBody: "Houd exporten onder de 5 MB (~100.000 regels).",
      sampleLoadedTitle: "Voorbeelddata geladen",
      sampleLoadedBody: "14 regels van een fictieve middelgrote voedseldistributeur en importeur.",
    },
    errors: {
      noUsableRows:
        "Geen bruikbare regels gevonden. Verwachte kolommen zoals Date, Description, Amount (CSV of TSV, geëxporteerd uit QuickBooks, Stripe of uw bank).",
    },
    results: {
      complete: "Scan voltooid — {count} regels geanalyseerd",
      foundLabel: "Gevonden:",
      matchedChannelsOne: "Over {count} gematcht kanaal.",
      matchedChannelsMany: "Over {count} gematchte kanalen.",
      conservativeNote:
        "Conservatieve ranges — de uiteindelijke uitbetaling hangt af van uw bewijsstukken en het totaal aan claims dat bij elk fonds wordt ingediend.",
      ieepaIncluded:
        "Inclusief IEEPA-terugbetalingen van {low}–{high} (invoerrechten terug + wettelijke rente, vóór indieningskosten).",
      missedClosed:
        "U miste daarnaast {low}–{high} aan claims die al gesloten zijn. Monitoring zorgt ervoor dat dat nooit meer gebeurt.",
      claimCta: "Claimen met RecoveryOS",
      scanAnother: "Nog een bestand scannen",
    },
    match: {
      finalDay: "Laatste dag",
      daysLeft: "Nog {count} dagen",
      fundBadge: "Fonds: {size}",
      matchedPurchases: "Gematchte aankopen ({count})",
      moreLines: "+ nog {count} regels",
      matchedVolumeLabel: "Gematcht volume:",
      estimatedRecovery: "Geschatte terugvordering",
      whoCanClaimLabel: "Wie kan claimen: ",
      evidenceLabel: "Bewijs: ",
      claimCta: "Claimen met RecoveryOS",
      closedCta: "Gesloten — op de watchlist",
      officialSite: "Officiële website",
    },
    disclaimer:
      "Schattingen zijn rekenmodellen, geen garanties of juridisch advies. Uitbetalingen hangen af van de claimkwaliteit, het bewijs en het totaal aan claims dat elk fonds ontvangt. U kunt altijd rechtstreeks indienen bij de officiële beheerder — links vindt u bij elk fonds.",
  },
  settlements: {
    eyebrow: "Live claimtracker",
    heading: "Open fondsen, echte deadlines.",
    lead:
      "Elk fonds hieronder is een publiekelijk ingediende rechtszaak met een officiële beheerder. Wij volgen ze, zodat uw bedrijf nooit pas een week nadat het is verlopen hoort over gratis geld.",
    filterAria: "Fondsen filteren",
    filters: [
      { label: "Alle fondsen" },
      { label: "Sluit binnenkort" },
      { label: "Open" },
      { label: "Verificatieperiode" },
      { label: "Gesloten (gemist)" },
    ],
    statusOpen: "Open",
    statusClosingSoon: "Sluit binnenkort",
    statusClosed: "Gesloten — gemist",
    statusVerify: "Verificatieperiode",
    deadlineVerify: "Claimtermijn — verifieer bij de beheerder",
    daysMonitor: "monitoren",
    daysPast: "{days} dagen verstreken",
    lastDay: "laatste dag",
    daysLeftCount: "Nog {days} dagen",
    fundBadge: "Fonds: {fund}",
    purchasesLabel: "Aankopen:",
    deadlineTerm: "Deadline:",
    eligibleLabel: "Wie kan claimen:",
    testInScanner: "Test in de scanner",
    officialSite: "Officiële website",
    disclaimer:
      "Fondsfeiten, klassenactietermijnen en deadlines zijn samengesteld uit openbare stukken en beheerdersberichten per eind oktober 2026. Deadlines veranderen — bevestig altijd op de officiële schikkingswebsite voordat u op een datum vertrouwt, of laat onze monitoringwatchlist het doorlopend doen.",
  },
  ieepa: {
    eyebrow: "Kanaal in de schijnwerpers — IEEPA",
    heading: "Het Hooggerechtshof heeft de invoerrechten vernietigd. Nu moet het geld terug.",
    lead:
      "Op 20 februari 2026 oordeelde het Hof met 6–3 dat de IEEPA-invoerrechten onrechtmatig waren ({case}). Ruwweg {totalRefunds}, betaald door {importers} importeurs over {entries} aangiften, moet met rente worden terugbetaald via het CAPE-portaal van CBP — de deadlines lopen door tot {deadlines}.",
    capeLivePre: "CAPE ging live op {date}. In de eerste zes dagen ontving het",
    capeLivePost:
      "aanvragen goed voor 11,2 miljoen aangiften — mkb'ers die snel zijn, worden het eerst betaald.",
    interestPre: "De rente stapelt zich op met ruwweg {rate}% per jaar — ongeveer",
    interestPost:
      "per maand loopt op over alle openstaande terugbetalingen terwijl aanvragen in de wachtrij staan.",
    failedValidationPre: "Ongeveer",
    failedValidationPost:
      "aangiften zijn bij de eerste indiening al door de CAPE-validatie afgekeurd — een correcte datavoorbereiding is het hele spel.",
    servicesText:
      "Wij bereiden aangiften voor, lossen validatiefouten op, genereren CAPE-klare bestanden en volgen elke deadline. Het indienen blijft bij u of uw erkende douane-expediteur — geen licentiespelletjes.",
    estimatorTitle: "Calculator voor terugbetaling + rente",
    estimatorNote: "Alleen een richtlijn — uw aangiften bepalen het exacte bedrag.",
    principalLabel: "Totaal betaalde IEEPA-invoerrechten (USD)",
    dateLabel: "Laatste invoerrechtbetaling",
    rateLabel: "Rentepercentage (% per jaar)",
    includeInterestLabel: "Rente tot vandaag meerekenen (standaard ≈{rate}% per jaar)",
    dutiesBackLabel: "Invoerrechten terug",
    interestLabel: "Rente",
    totalLabel: "Totaal",
    dripLine:
      "Rente die is opgelopen over de openstaande IEEPA-terugbetalingen in de VS sinds u deze pagina opende:",
    ctaButton: "Bereid mijn CAPE-claim voor",
    disclaimer:
      "Geldt alleen voor op de IEEPA gebaseerde invoerrechten (routes China / Canada / Mexico). Invoerrechten uit sectie 232/301 worden niet geraakt door de uitspraak.",
  },
  pricing: {
    eyebrow: "Prijzen",
    headingA: "Gratis voor particulieren. Een vergoeding pas als",
    headingGold: "het geld stroomt.",
    lead:
      "De wereldbibliotheek zal nooit één cent kosten — elke zoekopdracht maakt de kaart van verloren geld scherper, en met die kaart verdienen wij ons geld. Bedrijven betalen een succesvergoeding, en alleen over geld dat daadwerkelijk terugkomt.",
    alwaysFreeBadge: "Altijd gratis",
    plans: [
      {
        name: "Particulieren — de wereldbibliotheek",
        price: "$0",
        cadence: "voor altijd gratis · geen niveaus, geen creditcard, geen addertje",
        cta: "Doorzoek 20 landen",
        features: [
          "Elke officiële database met ongeclaimd geld die wij indexeren, wereldwijd",
          "Persoonlijke checklistbouwer — naam erin, bronnen eruit",
          "Meldingen bij nieuwe registers voor uw landen",
          "Directe links naar de officiële zoekomgeving — wij staan u nooit in de weg",
          "Zoek voor uzelf, uw ouders, uw grootouders",
        ],
      },
      {
        name: "Zakelijke terugvordering",
        price: "$0 vooraf",
        cadence: "daarna 8–15% van de teruggevorderde bedragen",
        cta: "Voer een gratis scan uit",
        features: [
          "Claimvoorbereiding & het samenstellen van bewijsstukken",
          "CAPE-klare bestanden + validatieherstel",
          "Indienen via officiële beheerders of gelicenseerde partners",
          "Deadlinetracking tot de gelden binnen zijn",
          "Schriftelijk vastgelegd voordat u toehapt — geen succes, geen kosten",
        ],
      },
      {
        name: "Partners & data",
        price: "Op maat",
        cadence: "omzetdeling · API · inzichten",
        cta: "Neem contact op",
        features: [
          "Voor douane-expediteurs, bureaus en brancheverenigingen",
          "Claimvoorbereiding in bulk voor klantenbestanden",
          "API-toegang tot de matchingmotor",
          "Geaggregeerde registerdekking naarmate wij markten uitbreiden",
          "U behoudt de klantrelatie — wij draaien de machine",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading: "Terechte vragen, klare antwoorden.",
    items: [
      {
        question: "Ik ben particulier, geen bedrijf — is dit iets voor mij?",
        answer:
          "Ja — via de levende bibliotheek, voor altijd gratis. Particulieren kunnen zelf, binnen enkele minuten, ongeclaimd vermogen, vervallen spaarobligaties, ongeclaimde pensioenen, belastingteruggaven en fondsen uit consumentenklassenacties opdiepen: bij elke vermelding staat wie in aanmerking komt, welk bewijs nodig is en de link naar de officiële gratis tool. De betaalde motor (scannen, claimvoorbereiding, indienen) bestaat voor bedrijven, waar de claimomvang het werk rechtvaardigt — voor persoonlijke claims is het zelf doen via de bibliotheek vrijwel altijd de snelste route.",
      },
      {
        question: "Is dit juridisch advies? Bent u een advocatenkantoor?",
        answer:
          "Nee. RecoveryOS is geen advocatenkantoor en geeft geen juridisch advies. Wij doen datawerk: parsen, matchen, bewijs samenstellen, valideren en volgen. Claims worden ingediend bij de officiële, door de rechtbank aangestelde beheerders, en waar een jurisdictie een beëdigd advocaat vereist, werken wij met hen samen. U kunt elke claim altijd zelf en gratis indienen — wij linken elke beheerderssite, zodat u dat kunt doen.",
      },
      {
        question: "Hoe nauwkeurig zijn de schattingen?",
        answer:
          "Het zijn bewust conservatieve ranges, gebaseerd op gepubliceerde fondsomvang en gebruikelijke uitbetalingsratio's bij vergelijkbare antitrust- en invoerrechterugvorderingen. Uw uiteindelijke uitbetaling hangt af van uw gedocumenteerde aankoopvolume, de claimkwaliteit en het aantal claims dat het fonds ontvangt. Wij leggen vóór uw toezegging een schriftelijke succesvergoeding per claim vast.",
      },
      {
        question: "Welke gegevens hebt u nodig, en wat gebeurt ermee?",
        answer:
          "Een aankoopexport — Date, Description, Amount — uit QuickBooks, Stripe, Xero of uw bank. De gratis scan slaat alleen geaggregeerde statistieken op (gescande regels, gevonden matches). Uw gegevens op regelniveau worden nooit verkocht of gedeeld en worden op verzoek verwijderd. Voor het indienen deelt u bewijs alleen met de officiële beheerder.",
      },
      {
        question: "Wanneer en hoe betaal ik?",
        answer:
          "Niets vooraf. Zodra een terugvordering op uw rekening binnenkomt, factureren wij onze succesvergoeding (8–15%, doorgaans 12%). Monitoring is een vast abonnement van $99/maand dat u elk moment kunt opzeggen — launchpartners krijgen 12 maanden gratis. Gelden uit schikkingen en van de CBP vloeien altijd rechtstreeks naar uw zakelijke rekening, nooit via ons.",
      },
      {
        question: "Waarom niet gewoon een advocatenkantoor inhuren?",
        answer:
          "Goede vraag — soms moet dat ook. Een handelsadvocaat rekent $300–800 per uur en heeft uw gegevens alsnog op orde nodig. Wij doen de datalaag zonder financieel risico, en met onze claimdossiers wordt elke advocaat goedkoper in te zetten. Voor eenvoudige fondsclaims heeft u met een voorbereid dossier via de beheerder meestal geen advocaat nodig.",
      },
      {
        question: "Welke kanalen zijn er nu live, en wat komt er hierna?",
        answer:
          "Nu live: claims uit klassenactieschikkingen, voorbereiding van IEEPA-terugbetalingen en screenings voor drawback. Q1 2027 voegt vracht- en pakketaudits en prescreening van R&D-belastingkredieten toe. Q2 2027 voegt het opschonen van ongeclaimd vermogen (B2B) toe. Elk kanaal draait op dezelfde gekoppelde aankoopgegevens — geen extra werk voor u.",
      },
      {
        question: "Wij zijn buiten de VS gevestigd. Geldt dit voor ons?",
        answer:
          "Als u naar de VS exporteerde of vanuit de VS importeerde, kan dit u raken: IEEPA-terugbetalingen dekken elke importeur van record, en antitrustfondsen dekken aankopen die in de Amerikaanse handel zijn gedaan. Wij bouwen daarna aan terugvorderingskanalen voor de EU en het VK. Vertel ons waar u actief bent en wij vlaggen wat voor u geldt.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Launchlijst",
    headingA: "Gevonden geld moet",
    headingGold: "u het eerst vinden.",
    lead:
      "Launchplekken omvatten 12 maanden gratis monitoring, succesvergoedingstarieven voor oprichtende leden (8%) en een eerste scan van uw aankopen uit 2024–2026 tegen elk open fonds.",
    perks: ["Geen creditcard, geen verbintenis", "Opzeggen kan altijd zodra wij live zijn"],
    spotsClaimed: "Launchplekken geclaimd",
    spotsNote:
      "Plekken worden toegekend op volgorde van aanmelding — de balk beweegt maar in één richting.",
    successTitle: "U bent binnen. Welkom aan boord.",
    successText:
      "Wij sturen u uw launch-onboarding en de documentenchecklist voor de fondsen die het eerst sluiten. Als u iets importeerde onder de invoerrechten van 2025, antwoord met een globale invoerrecht-indicatie en wij starten de IEEPA-schatting.",
    emailLabel: "Zakelijk e-mailadres *",
    emailPlaceholder: "cfo@bedrijf.nl",
    companyLabel: "Bedrijf",
    companyPlaceholder: "Bedrijfsnaam",
    volumeLabel: "Maandelijks aankoopvolume",
    volumePlaceholder: "Kies een bereik",
    volumeOptions: ["Onder $10K", "$10–50K", "$50–250K", "$250K–1M", "Boven $1M"],
    channelsLabel: "Welke terugvorderingen interesseren u?",
    channelOptions: [
      "Schikkingen uit klassenacties",
      "Terugbetaling van IEEPA-invoerrechten",
      "Drawback van invoerrechten",
      "Vracht- en pakketaudits",
    ],
    submitLabel: "Claim mijn launchplek",
    savingLabel: "Opslaan…",
    privacyNote: "Wij e-mailen over uw geld, over niets anders. Eén klik om te vertrekken.",
    invalidEmailTitle: "Vul een geldig e-mailadres in",
    invalidEmailDescription: "Eén adres is genoeg.",
    joinedToastTitle: "U staat op de lijst",
    joinedToastDescription:
      "Launchplekken gaan op volgorde van aanmelding. Houd uw inbox in de gaten.",
    errorToastTitle: "Er ging iets mis",
    errorToastDescription: "Probeer het zo dadelijk opnieuw.",
  },
  footer: {
    about:
      "De terugvorderingsafdeling voor het mkb — en een gratis levende bibliotheek van vergeten geld voor alle anderen. Wij brengen elk kanaal in kaart waar geld vastloopt: klassenacties, invoerrechterugbetalingen, drawback, ongeclaimd vermogen. U betaalt pas als de uitbetalingen binnenkomen.",
    productTitle: "Product",
    channelsTitle: "Kanalen",
    product: [
      "Hoe het werkt",
      "Wereldbibliotheek",
      "Gratis scanner",
      "Open claims",
      "IEEPA-calculator",
      "Prijzen",
    ],
    channelsNav: [
      "Alle kanalen",
      "Klassenacties",
      "Douaneterugvorderingen",
      "Drawback van invoerrechten",
      "Launchlijst",
    ],
    legal1:
      "RecoveryOS is geen advocatenkantoor, geen accountantskantoor en geen erkend douane-expediteur, en niets op deze site is juridisch, fiscaal of financieel advies. De levende bibliotheek linkt naar officiële overheidsdatabases en door de rechtbank aangestelde beheerders — particulieren kunnen altijd zelf en gratis indienen. Herstelschattingen zijn rekenmodellen, gebaseerd op openbare stukken en historische uitbetalingsratio's; werkelijke terugvorderingen hangen af van uw bewijs, uw aanspraak en het totaal aan claims dat elk fonds ontvangt.",
    legal2:
      "Feiten over schikkingsfondsen, klassenactietermijnen en deadlines zijn samengesteld uit openbare rechtsstukken en officiële beheerdersberichten per eind oktober 2026 en kunnen zonder kennisgeving wijzigen. Verifieer deadlines altijd bij de officiële schikkingsbeheerder voordat u erop vertrouwt. Claims worden altijd door u ingediend of via behoorlijk gelicenseerde partners, en gelden vloeien rechtstreeks naar uw rekening.",
    copyright: "© 2026 RecoveryOS. Alle rechten voorbehouden.",
    ariaProduct: "Product",
    ariaChannels: "Kanalen",
  },
  claim: {
    title: "Claimen met RecoveryOS",
    titleDone: "Claimdossier aangevraagd",
    descriptionDone:
      "Kijk in uw inbox — wij vragen alleen om de documenten die de beheerder werkelijk vereist.",
    descriptionContext:
      "Wij verzorgen de documenten voor {context} en bevestigen elke deadline met de officiële beheerder. U betaalt pas als de gelden binnenkomen.",
    descriptionDefault:
      "Wij bereiden de documenten voor, bevestigen de deadlines met de officiële beheerder en blijven indienen tot de gelden binnenkomen. U betaalt pas als het geld op uw rekening staat.",
    nextStepsTitle: "Vervolgstappen",
    nextSteps: [
      "Stuur ons uw aankoopbewijs (facturen / exports).",
      "Wij valideren de claim en leggen de succesvergoeding schriftelijk vast.",
      "Gelden vloeien altijd rechtstreeks naar uw zakelijke rekening.",
    ],
    emailLabel: "Zakelijk e-mailadres",
    emailPlaceholder: "cfo@bedrijf.nl",
    companyLabel: "Bedrijf",
    companyPlaceholder: "Bedrijfsnaam",
    submit: "Ontvang mijn claimdossier",
    submitting: "Opslaan…",
    footerNote:
      "Geen succes, geen kosten. U kunt altijd zelf indienen via de officiële beheerder — wij linken elk fonds.",
    invalidEmailTitle: "Vul een geldig e-mailadres in",
    invalidEmailBody: "Wij hebben één adres nodig om uw claimdossier naartoe te sturen.",
    queuedTitle: "U staat in de wachtrij",
    queuedBody:
      "Wij nemen contact met u op met uw claimdossier en de exact benodigde documenten.",
    errorTitle: "Er ging iets mis",
    errorBody: "Probeer het zo dadelijk opnieuw.",
  },
  assistant: {
    openChat: "Open Goldie AI-chat",
    closeChat: "Sluit Goldie-chat",
    chatDialog: "Chat met de Goldie AI-assistent",
    askGoldie: "Vraag Goldie alles",
    online: "Online · antwoordt in elke taal",
    aiScout: "AI-scout",
    reset: "Gesprek resetten",
    send: "Bericht verzenden",
    placeholder: "Vraag Goldie alles…",
    disclaimer:
      "AI-antwoorden kunnen imperfect zijn — verifieer fondsgegevens bij de officiële beheerders die op deze pagina gelinkt zijn.",
    greeting:
      "Hallo! Ik ben **Goldie**, uw RecoveryOS-scout. Vraag me alles over ongeclaimd geld — de wereldbibliotheek, deadlines van schikkingen, invoerrechterugbetalingen of hoe de scanner werkt. Ik antwoord in elke taal die u maar wilt.",
    suggestions: [
      "Hoe vind ik gratis ongeclaimd geld?",
      "Wat is de IEEPA-terugbetaling van $166B?",
      "Is de scanner echt privé?",
      "Wat is ongeclaimd geld?",
    ],
  },
  guide: {
    welcome:
      "Welkom! Ik ben Scout — ik zwerf rond op deze site en geef tips terwijl u scrolt. Klik wanneer u maar wilt op mij om te chatten met Goldie, onze AI-assistent.",
    dismiss: "Tip sluiten",
    mute: "Tips uitschakelen voor dit bezoek",
    unmute: "Tips uit — inschakelen",
    avatarLabel: "Scout, de gids van deze site — klik om met Goldie te chatten",
    askGoldie: "Vraag Goldie naar deze sectie",
    tips: {
      how: [
        "Nieuw hier? Deze strook toont de hele flow — scannen, verifiëren, claimen. Om iets te proberen hoeft u zich nergens te registreren.",
        "Drie stappen, nul kosten om te verkennen. De scanner heeft zelfs een realistische voorbeeldset die u met één klik kunt draaien.",
      ],
      library: [
        "Psst — de naam die u hier typt, verlaat nooit uw browser. Kies uw landen en ontvang een gratis checklist met officiële registers.",
        "50 markten, 66+ officiële bronnen. Kies eens Turkije of de VAE — de dekking reikt veel verder dan Amerika.",
      ],
      channels: [
        "Hier huizen zes terugvorderingskanalen. Alleen de oplichtende IEEPA-kaart al is $166B aan terugvorderbare invoerrechten.",
        "Alleen drawback van invoerrechten is ~$15B per jaar dat op tafel blijft liggen. Vrachtcontroles, R&D-kredieten — de meeste bedrijven kijken er nooit naar.",
      ],
      scanner: [
        "Probeer “Laad een realistische voorbeeldset” — 14 regels demoaankopen vinden ongeveer $47K. Uw bestand verlaat deze browser nooit.",
        "De scanner ontleedt uw CSV gewoon hier, in de browser — geen upload, geen account, niets opgeslagen.",
      ],
      settlements: [
        "Deadlines zijn het hele spel. Sorteer op resterende dagen — het Ready-Mix-fonds van Iowa sluit op 16 november.",
        "Elke kaart linkt rechtstreeks naar de door de rechtbank aangestelde beheerder. Geen tussenpersonen, geen bemiddelingskosten.",
      ],
      ieepa: [
        "In 2025 of later invoerrechten betaald? Het Hooggerechtshof heeft de IEEPA-heffingen vernietigd — elke dollar is terugvorderbaar met rente. Probeer eens $120,000 in de calculator.",
        "Rente over openstaande IEEPA-terugbetalingen loopt op met ruwweg $650M per maand. Wachten is duur.",
      ],
      pricing: [
        "De bibliotheek is voor altijd gratis — particulieren betalen nooit. Bedrijven betalen alleen 8–15% als er echt geld binnenkomt.",
        "Geen succes, geen kosten — het staat in het businessplan geschreven. Schriftelijk vastgelegd voordat u toehapt.",
      ],
      faq: [
        "Hier leven de goede vragen — waaronder “is dit juridisch advies?” (spoiler: nee, wij zijn geen advocatenkantoor).",
        "De FAQ behandelt privacy, de voorwaarden om te claimen en wat er na het indienen gebeurt. Twee minuten goed besteed.",
      ],
      waitlist: [
        "Laatste stop! Sluit u aan bij de launchlijst — of vraag mijn collega Goldie gewoon alles. Zij is de munt in de hoek.",
        "Gaat u weg? Neem de checklist mee — via de launchlijst ontvangt u meldingen bij nieuwe registers voor uw landen.",
      ],
    },
    ask: {
      how: "Leg in eenvoudige termen uit hoe RecoveryOS werkt.",
      library: "Hoe werkt de zoekfunctie van de wereldbibliotheek, en is die echt gratis?",
      channels: "Welk terugvorderingskanaal past het beste bij mijn bedrijf?",
      scanner: "Hoe matcht de scanner mijn aankopen met schikkingsfondsen?",
      settlements: "Welke schikkingsfondsen zijn nog open en sluiten binnenkort?",
      ieepa: "Hoe claim ik IEEPA-terugbetalingen via CBP CAPE?",
      pricing: "Wat kost RecoveryOS, en wanneer betaal ik?",
      faq: "Is RecoveryOS betrouwbaar, en is het juridisch advies?",
      waitlist: "Wat krijg ik wanneer ik me aanmeld voor de launchlijst?",
    },
  },
};

export default nl;
