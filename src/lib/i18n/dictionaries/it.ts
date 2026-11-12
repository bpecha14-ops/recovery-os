import type { Dictionary } from "./en";

const it: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Esegui una scansione gratuita",
    openMenu: "Apri il menu",
    language: "Lingua",
    closeMenu: "Chiudi il menu",
  },
  header: {
    nav: [
      "Come funziona",
      "Libreria mondiale",
      "Canali",
      "Scanner gratuito",
      "Richieste aperte",
      "Rimborso dazi",
      "Prezzi",
      "FAQ",
    ],
    ariaMainNav: "Navigazione principale",
    ariaMobileNav: "Navigazione mobile",
    ariaHome: "Home di RecoveryOS",
  },
  hero: {
    pill: "La Corte Suprema ha respinto i dazi IEEPA per 6–3",
    titleA: "Il mondo ha diritto a ",
    titleGold: "denaro",
    titleB: " che ha dimenticato.",
    subtitle:
      "RecoveryOS mappa ogni database ufficiale di denaro non reclamato al mondo — per la sua azienda e per il suo nome — poi prepara e segue le richieste finché gli assegni non arrivano sul suo conto.",
    ctaScan: "Esegui una scansione gratuita",
    ctaLibrary: "Esplora la libreria mondiale — gratis",
    trustNoFee: "Nessun recupero, nessuna commissione",
    trustOfficial: "Link a ogni amministratore ufficiale",
    trustDelete: "Dati di acquisto eliminati su richiesta",
    deadlineLead: "In scadenza questa settimana:",
    deadlineBody:
      "Fondo antitrust sul maiale ($117M) — 29 ott. · Fondi antitrust sul tacchino ($71.5M+) — 30 ott. Gli interessi sui rimborsi IEEPA in sospeso maturano a circa {interest}/mese — le scadenze sono il motivo per cui le aziende perdono ogni anno denaro recuperabile.",
    stat1: "Rimborsi IEEPA in sospeso dopo la sentenza della Corte Suprema",
    stat2:
      "di denaro non reclamato verificato nei {markets} mercati mondiali che indicizziamo",
    stat3: "di drawback doganale non reclamato, secondo le stime del CBP",
    stat4:
      "domande di rimborso su CAPE nei primi 6 giorni — la corsa all'oro è reale",
    ticker: [
      "Rimborsi dazi IEEPA — $166B",
      "Pensioni smarrite UK — £31.1B",
      "Francia Ciclade — €7.87B",
      "India UDGAM — ₹67,000 crore",
      "Corea conti dormienti — ₩14T",
      "Brasile SVR — R$5.65B",
      "Sudafrica — R88.5B",
      "Fondo antitrust maiale — $117M",
      "Duty Drawback — $15B/yr",
      "Antitrust tacchino — $71.5M+",
      "Australia denaro smarrito — A$3B",
      "Canada conti dormienti — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Come funziona",
    headingA: "Ogni azienda ha un ufficio contabilità fornitori.",
    headingGold: "Nessuna ha un ufficio recuperi.",
    lead:
      "La contabilità fornitori controlla ciò che esce. Nessuno controlla ciò che rientra — rimborsi, accordi transattivi, drawback, correzioni di commissioni. RecoveryOS è quel dipartimento mancante, con un prezzo pensato perché esista solo quando si ripaga da solo.",
    steps: [
      {
        title: "Collega i dati",
        text: "Carichi un export degli acquisti — un CSV di QuickBooks, un estratto Stripe o bancario, oppure quaranta righe incollate a mano. Bastano circa quattro minuti. Nulla lascia il suo browser finché non avvia la scansione.",
      },
      {
        title: "Analizziamo ogni riga",
        text: "Il motore confronta ogni acquisto con le finestre di classe aperte, le voci doganali e le regole di drawback — poi mostra cosa ha trovato, perché e una stima prudenziale prima di qualsiasi impegno da parte sua.",
      },
      {
        title: "Gli assegni arrivano — poi veniamo pagati",
        text: "Le richieste passano dagli amministratori ufficiali o da partner autorizzati. I fondi affluiscono direttamente sul suo conto. Il nostro compenso di successo è preventivato per iscritto e addebitato solo quando il denaro arriva.",
      },
    ],
  },
  library: {
    eyebrow: "La Libreria mondiale",
    heading: "Ogni database ufficiale di denaro non reclamato al mondo.",
    headingGold: "Gratis per sempre.",
    leadBefore:
      "Non solo l'America, e non solo le aziende. Il denaro giace dimenticato sotto la burocrazia in ogni grande economia —",
    leadAfter:
      ". La Libreria mondiale indicizza la porta ufficiale di ciascuno, per chiunque, a $0.",
    moneyWords: [
      "conti dormienti",
      "pensioni smarrite",
      "dividendi non riscossi",
      "patrimoni senza eredi",
      "depositi dimenticati",
      "assegni non incassati",
    ],
    stats: [
      { label: "mercati indicizzati" },
      { label: "registri attivi oggi" },
      { label: "fonti ufficiali verificate" },
      { label: "verificato in attesa di essere reclamato" },
    ],
    tickerLive: " — attivo",
    tickerInLab: " — in laboratorio",
    searchTitle: "Trovi il denaro che la burocrazia ha dimenticato —",
    searchTitleGold: "a nome suo.",
    searchLead:
      "Un nome, i suoi paesi. Costruiremo la sua checklist personale di database ufficiali da consultare — ogni voce gratuita, ogni link ufficiale.",
    nameLabel: "Nome da cercare — resta nel suo browser, mai inviato altrove",
    namePlaceholder: "ad es. Maria Gonzalez",
    countriesLabel: "Paesi in cui ha vissuto, lavorato o avuto un conto",
    selectedCount: "{count}/8 selezionati",
    pickerPlaceholder: "Cerca tra {count} mercati — USA, UK, Kenya, Malaysia…",
    pickerNoMatch:
      "Nessun mercato corrisponde a «{query}» — provi il nome completo, ad es. «Giappone».",
    buildChecklist: "Crea la tua checklist gratuita",
    searchPrivacy:
      "Gratis per sempre, nessun livello a pagamento. Conserviamo la sua ricerca per avvisarla quando nuovi registri diventano attivi nei suoi paesi — è questo, tutto il modello. Eliminabile in qualsiasi momento.",
    errorNameRequired: "Ci indichi il nome da cercare.",
    errorNoCountries:
      "Scelga almeno un paese in cui ha vissuto, lavorato o avuto un conto.",
    errorSearchFailed: "Ricerca non riuscita. Riprovi.",
    errorNetwork: "Errore di rete — riprovi.",
    closeResults: "Chiudi i risultati",
    checklistReadyOne: "Checklist pronta per {count} paese",
    checklistReadyMany: "Checklist pronta per {count} paesi",
    officialDatabases: "database ufficiali",
    toSearch: "da consultare",
    resultPrivacy:
      "Non è stato salvato nulla — questa checklist è visibile solo a lei. Proceda lungo la lista — la maggior parte delle voci richiede meno di 10 minuti.",
    databasesCount: "{count} database",
    openOfficialSearch: "Apri la ricerca ufficiale",
    openTracker: "Apri il tracker",
    regionsAriaLabel: "Regioni del mondo",
    sourceCountOne: "{count} fonte ufficiale",
    sourceCountMany: "{count} fonti ufficiali",
    inTheLab: "In laboratorio",
    badgeLive: "Attivo",
    badgeResearching: "In ricerca",
    viewSources: "Vedi le fonti",
    launchesHere:
      "Lancerà qui mano a mano che verifichiamo i percorsi di richiesta.",
    referralEyebrow: "Ha trovato $40 per sé?",
    referralTitle: "Alla sua azienda spettano",
    referralTitleGold: "100× di più.",
    referralText:
      "La stessa burocrazia, ma su scala aziendale: rimborsi dazi su ogni importazione, class action su ogni ordine d'acquisto, drawback su ogni riesportazione. Punti lo scanner sulla contabilità della sua azienda e scopra il numero reale.",
    runBusinessScan: "Esegui la scansione aziendale",
    principles: [
      {
        title: "Gratis per sempre — prima il fai da te",
        text: "Le spieghiamo esattamente come presentare la richiesta in autonomia, in pochi minuti. Nessun intermediario richiesto, mai. Nessun livello a pagamento per le persone, punto.",
      },
      {
        title: "Solo link ufficiali",
        text: "Ogni voce rimanda al database governativo, alla banca centrale o all'amministratore nominato dal tribunale. Nessuna imitazione.",
      },
      {
        title: "Dati vivi",
        text: "Nuovi registri diventano attivi ogni trimestre. La libreria li monitora costantemente, così la sua checklist non diventa mai obsoleta.",
      },
    ],
    officialSourcesCount: "{count} fonti ufficiali",
    officialSite: "Sito ufficiale",
    addToSearch: "Aggiungi {country} alla tua ricerca gratuita",
    footnoteIntro:
      "Cifre compilate da comunicazioni ufficiali dei programmi e dalla stampa di riferimento a fine 2026 —",
    footnoteOutro: "Verifichi sempre sul sito ufficiale prima di agire.",
  },
  channels: {
    eyebrow: "Canali",
    headingA: "Un solo motore, ogni canale in cui",
    headingGold: "il denaro aziendale si blocca.",
    lead:
      "Ogni canale preso da solo è modesto — qualche punto percentuale qui, un fondo mancato là. Sommati sugli stessi dati d'acquisto, compongono un flusso di recupero ricorrente.",
    items: [
      {
        title: "Accordi transattivi di class action",
        stat: "Miliardi",
        statLabel: "che giacciono non reclamati nei fondi aperti",
        description:
          "Gli accordi antitrust pagano le aziende per i sovrapprezzi su tutto, dal maiale e dal tacchino al calcestruzzo e agli imballaggi. I tassi di richiesta sono minuscoli — la maggior parte degli acquirenti non presenta mai domanda.",
        statusNote: "Attivo ora — 5+ fondi tracciati",
      },
      {
        title: "Rimborsi dazi IEEPA",
        stat: "$166B",
        statLabel: "da restituire a 330K importatori",
        description:
          "La Corte Suprema ha respinto i dazi IEEPA per 6–3. Ogni dazio pagato sotto di essi è rimborsabile con interessi tramite il portale CAPE del CBP — le scadenze si estendono fino al 2027–2028.",
        statusNote: "Attivo ora — calcolatore qui sotto",
      },
      {
        title: "Duty drawback",
        stat: "~$15B/yr",
        statLabel: "non reclamato, secondo le stime del CBP",
        description:
          "Fino al 99% dei dazi su beni importati poi esportati o distrutti può essere recuperato. La maggior parte delle PMI non ha mai presentato una sola domanda di drawback.",
        statusNote: "Attivo ora — verifica inclusa nella scansione",
      },
      {
        title: "Audit di trasporti e spedizioni",
        stat: "$1B+",
        statLabel: "settore che recupera i sovrapprezzi di spedizione",
        description:
          "Consegne in ritardo, sovraccarichi duplicati ed errori di dimensionamento fanno perdere l'1–3% della spesa di spedizione. Le società di audit trattengono il 25–50% a contingenza — noi lo integreremo in un'unica piattaforma.",
        statusNote: "Q1 2027",
      },
      {
        title: "Crediti d'imposta R&S",
        stat: "La maggior parte",
        statLabel: "delle PMI idonee non presenta mai domanda",
        description:
          "I programmi di credito di USA, UK ed EU regolarmente restano non reclamati dalle piccole aziende idonee. Pre-verifichiamo la sua spesa di ingegneria e affidiamo i dossier a un preparatore abilitato.",
        statusNote: "Q1 2027",
      },
      {
        title: "Proprietà non reclamata (B2B)",
        stat: "$100–150B",
        statLabel: "detenuta dagli stati USA, aziende incluse",
        description:
          "Crediti fornitori dimenticati, rimborsi non incassati, vecchi depositi — l'escheatment per dormanza assorbe silenziosamente denaro aziendale ogni anno. Lo setacciamo in modo continuo.",
        statusNote: "Q2 2027",
      },
    ],
    ticker: [
      "Corte Suprema 6–3 — dazi IEEPA illegittimi",
      "CAPE: 75.300 domande nei primi 6 giorni",
      "Gli interessi maturano ≈ $650M/mese sui rimborsi in sospeso",
      "Drawback: recuperabile fino al 99% dei dazi",
      "Tassi di richiesta nelle class action: di norma sotto il 10%",
      "1 americano su 10 è in una lista di denaro non reclamato",
      "Fondo maiale $117M — scadenza tracciata",
      "Fondi tacchino $71.5M+ — scadenza tracciata",
    ],
  },
  scanner: {
    eyebrow: "Scanner gratuito",
    headingA: "Ci indichi i suoi acquisti.",
    headingGold: "Troveremo il denaro.",
    lead:
      "Nessun account, nessun caricamento verso terzi — incolli un export da QuickBooks, Stripe o dalla sua banca e il motore confronta ogni riga con i canali di recupero attivi.",
    tabs: {
      upload: "Carica CSV",
      paste: "Incolla i dati",
    },
    upload: {
      chooseAriaLabel: "Scegli un file CSV degli acquisti",
      choose: "Clicca per scegliere un file CSV / TSV",
      expectedColumns: "Colonne previste: Date, Description, Amount",
    },
    paste: {
      label: "Incolla le righe di acquisto",
      placeholder:
        "Date,Description,Amount\n2025-04-18,Dazio IEEPA — ricambi Cina,28500\n2016-09-02,Pancetta — Smithfield,4120.50",
      hint: "CSV o TSV, un acquisto per riga. Gli export di QuickBooks, Stripe, Xero e della maggior parte delle banche funzionano così come sono.",
    },
    loadSample: "Nessun dato a portata di mano? Carica un esempio realistico",
    privacyNote:
      "Conserviamo solo statistiche aggregate di scansione — mai le sue righe.",
    preview: {
      usableRowsLabel: "righe utilizzabili",
      skipped: "{count} scartate",
      totalSpendLabel: "Spesa totale:",
      colDate: "Data",
      colDescription: "Descrizione",
      colAmount: "Importo",
      moreRows: "…e altre {count} righe saranno scansionate.",
    },
    actions: {
      run: "Esegui la scansione",
      scanning: "Scansione dei canali…",
      scanningAriaLabel: "Scansione in corso",
      clear: "Svuota",
    },
    toasts: {
      fileTooLargeTitle: "File troppo grande",
      fileTooLargeBody: "Mantenga gli export sotto i 5 MB (~100k righe).",
      sampleLoadedTitle: "Dati di esempio caricati",
      sampleLoadedBody:
        "14 righe di un fittizio distributore-importatore alimentare di medie dimensioni.",
    },
    errors: {
      noUsableRows:
        "Nessuna riga utilizzabile trovata. Sono previste colonne come Date, Description, Amount (CSV o TSV, esportati da QuickBooks, Stripe o dalla sua banca).",
    },
    results: {
      complete: "Scansione completata — {count} righe analizzate",
      foundLabel: "Trovato:",
      matchedChannelsOne: "Su {count} canale corrispondente.",
      matchedChannelsMany: "Su {count} canali corrispondenti.",
      conservativeNote:
        "Fasce prudenziali — l'importo finale dipende dalle sue prove e dal totale delle domande presentate a ogni fondo.",
      ieepaIncluded:
        "Include rimborsi dazi IEEPA per {low}–{high} (dazi restituiti + interessi di legge, al lordo dei costi di presentazione).",
      missedClosed:
        "Le sono inoltre sfuggiti {low}–{high} in richieste già chiuse. Il monitoraggio garantisce che non accada mai più.",
      claimCta: "Richiedi con RecoveryOS",
      scanAnother: "Scansiona un altro file",
    },
    match: {
      finalDay: "Ultimo giorno",
      daysLeft: "{count} giorni rimasti",
      fundBadge: "Fondo: {size}",
      matchedPurchases: "Acquisti corrispondenti ({count})",
      moreLines: "+ {count} altre righe",
      matchedVolumeLabel: "Volume corrispondente:",
      estimatedRecovery: "Recupero stimato",
      whoCanClaimLabel: "Chi può richiedere: ",
      evidenceLabel: "Prove: ",
      claimCta: "Richiedi con RecoveryOS",
      closedCta: "Chiuso — entra nella watchlist",
      officialSite: "Sito ufficiale",
    },
    disclaimer:
      "Le stime sono strumenti di modellazione, non garanzie né consulenza legale. Gli importi dipendono dalla qualità della richiesta, dalle prove e dal totale delle domande ricevute da ogni fondo. Può sempre presentare la domanda direttamente all'amministratore ufficiale — link disponibile per ogni fondo.",
  },
  settlements: {
    eyebrow: "Tracker delle richieste dal vivo",
    heading: "Fondi aperti, scadenze reali.",
    lead:
      "Ogni fondo qui sotto è un caso depositato pubblicamente con un amministratore ufficiale. Li tracciamo perché la sua azienda non scopra mai il denaro gratis una settimana dopo la scadenza.",
    filterAria: "Filtra i fondi",
    filters: [
      { label: "Tutti i fondi" },
      { label: "In chiusura" },
      { label: "Aperti" },
      { label: "Finestra di verifica" },
      { label: "Chiusi (mancati)" },
    ],
    statusOpen: "Aperto",
    statusClosingSoon: "In chiusura",
    statusClosed: "Chiuso — mancato",
    statusVerify: "Finestra di verifica",
    deadlineVerify: "Finestra di richiesta — verifichi con l'amministratore",
    daysMonitor: "monitor",
    daysPast: "scaduta da {days} giorni",
    lastDay: "ultimo giorno",
    daysLeftCount: "{days} giorni rimasti",
    fundBadge: "Fondo: {fund}",
    purchasesLabel: "Acquisti:",
    deadlineTerm: "Scadenza:",
    eligibleLabel: "Chi può richiedere:",
    testInScanner: "Prova nello scanner",
    officialSite: "Sito ufficiale",
    disclaimer:
      "Dati sui fondi, finestre di classe e scadenze sono compilati da atti pubblici e avvisi degli amministratori a fine ottobre 2026. Le scadenze cambiano — confermi sempre sul sito ufficiale dell'accordo prima di fare affidamento su qualsiasi data, oppure lasci che la nostra watchlist di monitoraggio lo faccia in modo continuo.",
  },
  ieepa: {
    eyebrow: "Canale in evidenza — IEEPA",
    heading: "La Corte Suprema ha respinto i dazi. Ora il denaro deve tornare.",
    lead: "Il 20 febbraio 2026 la Corte ha stabilito per 6–3 che i dazi IEEPA erano illegittimi ({case}). Circa {totalRefunds} pagati da {importers} importatori su {entries} voci doganali devono essere restituiti con interessi, tramite il portale CAPE del CBP — le scadenze arrivano fino al {deadlines}.",
    capeLivePre:
      "CAPE è diventato operativo {date}. Nei primi sei giorni ha ricevuto",
    capeLivePost:
      "domande che coprono 11.2M voci doganali — le PMI veloci vengono pagate per prime.",
    interestPre: "Gli interessi si capitalizzano a circa {rate}%/anno — circa",
    interestPost:
      "al mese maturano su tutti i rimborsi in sospeso mentre le domande restano in coda.",
    failedValidationPre: "Circa",
    failedValidationPost:
      "voci doganali non hanno superato la validazione CAPE al primo invio — preparare correttamente i dati è tutto il gioco.",
    servicesText:
      "Prepariamo le voci doganali, correggiamo gli errori di validazione, generiamo file pronti per CAPE e tracciamo ogni scadenza. Il deposito resta suo o del suo broker autorizzato — nessun giochetto di licenze.",
    estimatorTitle: "Calcolatore di rimborso + interessi",
    estimatorNote:
      "Solo una regola pratica — le sue voci doganali determinano la cifra esatta.",
    principalLabel: "Totale dazi IEEPA pagati (USD)",
    dateLabel: "Ultimo pagamento dazi",
    rateLabel: "Tasso di interesse (%/anno)",
    includeInterestLabel:
      "Includi gli interessi maturati a oggi (≈{rate}%/anno predefinito)",
    dutiesBackLabel: "Dazi restituiti",
    interestLabel: "Interessi",
    totalLabel: "Totale",
    dripLine:
      "Interessi maturati sui rimborsi IEEPA in sospeso negli USA da quando ha aperto questa pagina:",
    ctaButton: "Prepara la tua domanda CAPE",
    disclaimer:
      "Copre solo i dazi basati sull'IEEPA (rotte Cina / Canada / Messico). I dazi ai sensi della Sezione 232/301 non sono interessati dalla sentenza.",
  },
  pricing: {
    eyebrow: "Prezzi",
    headingA: "Gratis per le persone. Una commissione solo quando",
    headingGold: "il denaro si muove.",
    lead:
      "La Libreria mondiale non costerà mai un centesimo — ogni ricerca rende più nitida la mappa del denaro perduto, e quella mappa è il nostro guadagno. Le aziende pagano un compenso di successo, e solo su denaro che torna davvero.",
    alwaysFreeBadge: "Sempre gratis",
    plans: [
      {
        name: "Persone — la Libreria mondiale",
        price: "$0",
        cadence: "gratis per sempre · nessun livello, nessuna carta, nessun trucco",
        cta: "Cerca in 20 paesi",
        features: [
          "Ogni database ufficiale di denaro non reclamato che indicizziamo, in tutto il mondo",
          "Generatore di checklist personale — inserisca il nome, ottenga le fonti",
          "Avvisi sui nuovi registri per i suoi paesi",
          "Link diretti alla ricerca ufficiale — non ci mettiamo mai in mezzo",
          "Cerca per sé, per i suoi genitori, per i suoi nonni",
        ],
      },
      {
        name: "Recupero aziendale",
        price: "$0 di anticipo",
        cadence: "poi l'8–15% dei fondi recuperati",
        cta: "Esegui una scansione gratuita",
        features: [
          "Preparazione delle richieste e raccolta delle prove",
          "File pronti per CAPE + correzioni di validazione",
          "Deposito tramite amministratori ufficiali o partner autorizzati",
          "Tracciamento delle scadenze fino all'arrivo dei fondi",
          "Preventivo per iscritto prima dell'impegno — nessun recupero, nessuna commissione",
        ],
      },
      {
        name: "Partner e dati",
        price: "Su misura",
        cadence: "rev-share · API · insight",
        cta: "Ne parliamo",
        features: [
          "Per spedizionieri doganali, agenzie e associazioni",
          "Preparazione di richieste in serie per portafogli clienti",
          "Accesso API al motore di corrispondenza",
          "Copertura aggregata dei registri man mano che espandiamo i mercati",
          "Il rapporto con il cliente resta suo — la macchina la gestiamo noi",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Domande legittime, risposte dirette.",
    items: [
      {
        question: "Sono una persona fisica, non un'azienda — fa per me?",
        answer:
          "Sì — tramite la Libreria Viva, gratis per sempre. Le persone fisiche possono recuperare da sole, in pochi minuti, proprietà non reclamate, buoni di risparmio giunti a scadenza, pensioni non riscosse, rimborsi fiscali e fondi di class action consumer: ogni voce mostra chi è idoneo, quali prove servono e il link allo strumento ufficiale gratuito. Il motore a pagamento (scansione, preparazione e deposito delle richieste) esiste per le aziende, dove l'entità delle richieste giustifica il lavoro — per le richieste personali, il fai da te tramite la libreria è quasi sempre la strada più rapida.",
      },
      {
        question: "È consulenza legale? Siete uno studio legale?",
        answer:
          "No. RecoveryOS non è uno studio legale e non fornisce consulenza legale. Facciamo lavoro sui dati: analisi, corrispondenza, raccolta prove, validazione e tracciamento. Le richieste vengono depositate presso gli amministratori ufficiali nominati dal tribunale e, dove la giurisdizione richiede un legale abilitato, collaboriamo con loro. Può sempre presentare qualsiasi richiesta da sé, gratuitamente — linkiamo ogni sito degli amministratori proprio per questo.",
      },
      {
        question: "Quanto sono accurate le stime?",
        answer:
          "Sono fasce volutamente prudenziali, basate sulle dimensioni pubblicate dei fondi e sui tipici rapporti di pagamento di recuperi antitrust e doganali comparabili. L'importo finale dipende dal volume di acquisti documentato, dalla qualità della richiesta e da quante domande riceve il fondo. Preventiviamo per iscritto un compenso di successo per ogni richiesta prima di qualsiasi suo impegno.",
      },
      {
        question: "Quali dati vi servono e che fine fanno?",
        answer:
          "Un export degli acquisti — Date, Description, Amount — da QuickBooks, Stripe, Xero o dalla sua banca. La scansione gratuita conserva solo statistiche aggregate (righe scansionate, corrispondenze trovate). I suoi dati a livello di riga non vengono mai venduti né condivisi e vengono eliminati su richiesta. Per il deposito, condivide le prove solo con l'amministratore ufficiale.",
      },
      {
        question: "Quando e come pago?",
        answer:
          "Nessun anticipo. Quando un recupero arriva sul suo conto, emettiamo fattura per il nostro compenso di successo (8–15%, di norma 12%). Il monitoraggio è un abbonamento a tariffa fissa di $99/mese disdicibile in qualsiasi momento — i partner di lancio hanno 12 mesi gratuiti. I fondi da accordi transattivi e dal CBP affluiscono sempre direttamente sul conto aziendale, mai tramite noi.",
      },
      {
        question: "Perché non rivolgersi semplicemente a uno studio legale?",
        answer:
          "Ottima domanda — a volte conviene farlo. Un legale specializzato in commercio internazionale costa $300–800/ora e richiede comunque dati organizzati. Noi facciamo il livello dati a rischio finanziario zero, e i nostri dossier rendono l'uso di qualsiasi avvocato più economico. Per le richieste semplici, la via dell'amministratore con un dossier pronto di norma non richiede alcun avvocato.",
      },
      {
        question: "Quali canali sono attivi oggi e cosa arriva dopo?",
        answer:
          "Attivi ora: richieste di accordi di class action, preparazione dei rimborsi dazi IEEPA e screening del drawback. Nel Q1 2027 si aggiungono il recupero da audit di trasporti e spedizioni e la pre-verifica dei crediti d'imposta R&S. Nel Q2 2027 arrivano le verifiche sistematiche della proprietà non reclamata B2B. Ogni canale gira sugli stessi dati di acquisto collegati — nessun lavoro extra per lei.",
      },
      {
        question: "Siamo fuori dagli USA. Ci riguarda?",
        answer:
          "Se avete esportato verso o importato dagli USA, potreste essere coinvolti: i rimborsi IEEPA coprono qualsiasi importatore di record e i fondi antitrust coprono gli acquisti effettuati nel commercio statunitense. Stiamo costruendo i canali di rimborso UE/UK. Diteci dove operate e vi segnaleremo cosa vi riguarda.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Lista di lancio",
    headingA: "Il denaro ritrovato deve trovare",
    headingGold: "prima Lei.",
    lead:
      "I posti di lancio includono 12 mesi di monitoraggio gratuiti, la tariffa di successo da membro fondatore (8%) e una prima scansione dei suoi acquisti 2024–2026 su tutti i fondi aperti.",
    perks: ["Nessuna carta, nessun impegno", "Disdica quando vuole una volta attivo"],
    spotsClaimed: "Posti di lancio occupati",
    spotsNote:
      "I posti seguono l'ordine di iscrizione — la barra si muove in una sola direzione.",
    successTitle: "È dei nostri. Benvenuti a bordo.",
    successText:
      "Le invieremo l'onboarding di lancio e la checklist dei documenti per i fondi più vicini alla chiusura. Se ha importato qualcosa sotto i dazi 2025, risponda con una cifra approssimativa dei dazi e avvieremo la stima IEEPA.",
    emailLabel: "Email di lavoro *",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Azienda",
    companyPlaceholder: "Nome dell'azienda",
    volumeLabel: "Volume di acquisti mensile",
    volumePlaceholder: "Seleziona una fascia",
    volumeOptions: [
      "Meno di $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Oltre $1M",
    ],
    channelsLabel: "Quali recuperi la interessano?",
    channelOptions: [
      "Accordi di class action",
      "Rimborsi dazi IEEPA",
      "Duty drawback",
      "Audit di trasporti e spedizioni",
    ],
    submitLabel: "Prenota il tuo posto di lancio",
    savingLabel: "Salvataggio…",
    privacyNote: "Le scriviamo del suo denaro, di nient'altro. Un clic per uscire.",
    invalidEmailTitle: "Inserisci un indirizzo email valido",
    invalidEmailDescription: "Basta un indirizzo.",
    joinedToastTitle: "È in lista",
    joinedToastDescription:
      "I posti di lancio seguono l'ordine di iscrizione. Tenga d'occhio la posta.",
    errorToastTitle: "Qualcosa è andato storto",
    errorToastDescription: "Riprovi tra qualche istante.",
  },
  footer: {
    about:
      "Il dipartimento recuperi per le piccole imprese — e una Libreria Viva gratuita di denaro dimenticato per tutti gli altri. Mappiamo ogni canale dove il denaro si blocca: class action, rimborsi dazi, drawback, proprietà non reclamata. Si paga solo quando arrivano gli assegni.",
    productTitle: "Prodotto",
    channelsTitle: "Canali",
    product: [
      "Come funziona",
      "Libreria mondiale",
      "Scanner gratuito",
      "Richieste aperte",
      "Calcolatore IEEPA",
      "Prezzi",
    ],
    channelsNav: [
      "Tutti i canali",
      "Class action",
      "Rimborsi dazi",
      "Duty drawback",
      "Lista di lancio",
    ],
    legal1:
      "RecoveryOS non è uno studio legale, uno studio contabile né uno spedizioniere doganale autorizzato, e nulla su questo sito costituisce consulenza legale, fiscale o finanziaria. La Libreria Viva rimanda a database governativi ufficiali e ad amministratori nominati dal tribunale — le persone fisiche possono sempre presentare domanda direttamente, gratuitamente. Le stime di recupero sono strumenti di modellazione basati su atti pubblici e rapporti di pagamento storici; i recuperi effettivi dipendono dalle sue prove, dall'idoneità e dal totale delle domande ricevute da ciascun fondo.",
    legal2:
      "Dati sui fondi transattivi, finestre di classe e scadenze sono compilati da atti giudiziari pubblici e avvisi ufficiali degli amministratori a fine ottobre 2026 e possono cambiare senza preavviso. Verifichi sempre le scadenze con l'amministratore ufficiale dell'accordo prima di farvi affidamento. Le richieste sono sempre presentate da lei o tramite partner debitamente autorizzati, e i fondi affluiscono direttamente sul suo conto.",
    copyright: "© 2026 RecoveryOS. Tutti i diritti riservati.",
    ariaProduct: "Prodotto",
    ariaChannels: "Canali",
  },
  claim: {
    title: "Richiedi con RecoveryOS",
    titleDone: "Dossier di richiesta richiesto",
    descriptionDone:
      "Controlli la posta — chiediamo solo i documenti che l'amministratore richiede davvero.",
    descriptionContext:
      "Prepareremo i documenti per {context} e confermeremo ogni scadenza con l'amministratore ufficiale. Pagherà solo quando i fondi arrivano.",
    descriptionDefault:
      "Prepareremo i documenti, confermeremo le scadenze con l'amministratore ufficiale e presenteremo la richiesta finché i fondi non arrivano. Pagherà solo quando il denaro entra sul suo conto.",
    nextStepsTitle: "Prossimi passi",
    nextSteps: [
      "Ci invii le prove dei suoi acquisti (fatture / export).",
      "Validiamo la richiesta e preventiviamo il compenso di successo per iscritto.",
      "I fondi affluiscono sempre direttamente sul conto aziendale.",
    ],
    emailLabel: "Email di lavoro",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Azienda",
    companyPlaceholder: "Nome dell'azienda",
    submit: "Ricevi il tuo dossier di richiesta",
    submitting: "Salvataggio…",
    footerNote:
      "Nessun recupero, nessuna commissione. Può sempre presentare la domanda da sola tramite l'amministratore ufficiale — linkiamo ogni fondo.",
    invalidEmailTitle: "Inserisci un indirizzo email valido",
    invalidEmailBody: "Ci serve un indirizzo a cui inviare il suo dossier di richiesta.",
    queuedTitle: "È in coda",
    queuedBody:
      "La contatteremo con il suo dossier di richiesta e i documenti esatti necessari.",
    errorTitle: "Qualcosa è andato storto",
    errorBody: "Riprovi tra qualche istante.",
  },
  assistant: {
    openChat: "Apri la chat AI di Goldie",
    closeChat: "Chiudi la chat di Goldie",
    chatDialog: "Chat dell'assistente AI Goldie",
    askGoldie: "Chieda qualsiasi cosa a Goldie",
    online: "Online · risponde in qualsiasi lingua",
    aiScout: "Scout AI",
    reset: "Azzera la conversazione",
    send: "Invia il messaggio",
    placeholder: "Chieda qualsiasi cosa a Goldie…",
    disclaimer:
      "Le risposte dell'AI possono essere imperfette — verifichi i dettagli dei fondi con gli amministratori ufficiali linkati su questa pagina.",
    greeting:
      "Salve! Sono **Goldie**, la sua scout di RecoveryOS. Mi chieda tutto ciò che vuole sul denaro non reclamato — la Libreria mondiale, le scadenze degli accordi, i rimborsi dazi o come funziona lo scanner. Rispondo in qualsiasi lingua preferisca.",
    suggestions: [
      "Come trovo denaro non reclamato gratuitamente?",
      "Cos'è il rimborso IEEPA da $166B?",
      "Lo scanner è davvero privato?",
      "Che cos'è il denaro non reclamato?",
    ],
  },
  guide: {
    welcome:
      "Benvenuti! Sono Goldie — giro per questo sito e lascio consigli mentre scorre. Mi clicchi quando vuole per parlare con il nostro assistente AI.",
    dismiss: "Chiudi il consiglio",
    mute: "Silenzia i consigli per questa visita",
    unmute: "Consigli disattivati — attiva",
    avatarLabel: "Goldie, la guida del sito — clicca per parlare con l'AI",
    askGoldie: "Chieda a Goldie di questa sezione",
    tips: {
      how: [
        "Prima volta qui? Questa striscia mostra il flusso completo — scansione, verifica, richiesta. Per provarlo non serve alcuna registrazione.",
        "Tre passi, zero costi per esplorare. Lo scanner ha persino un esempio realistico da avviare con un clic.",
      ],
      library: [
        "Psst — il nome che digita qui non lascia mai il suo browser. Scelga i suoi paesi e ottenga una checklist gratuita di registri ufficiali.",
        "50 mercati, 66+ fonti ufficiali. Provi a scegliere Turchia o Emirati Arabi Uniti — la copertura va ben oltre l'America.",
      ],
      channels: [
        "Sei canali di recupero vivono qui. Solo la scheda IEEPA in evidenza vale $166B in dazi rimborsabili.",
        "Il solo drawback è ~$15B all'anno lasciati sul tavolo. Audit di spedizione, crediti R&S — la maggior parte delle aziende non controlla mai.",
      ],
      scanner: [
        "Provi «Carica un esempio realistico» — 14 righe di acquisti dimostrativi trovano circa $47K. Il suo file non lascia mai questo browser.",
        "Lo scanner analizza il suo CSV direttamente qui nel browser — nessun upload, nessun account, nulla di salvato.",
      ],
      settlements: [
        "Le scadenze sono tutto il gioco. Ordini per giorni rimasti — il fondo ready-mix dell'Iowa chiude il 16 novembre.",
        "Ogni scheda rimanda direttamente all'amministratore nominato dal tribunale. Nessun intermediario, nessuna commissione di ricerca.",
      ],
      ieepa: [
        "Dazi pagati nel 2025+? La Corte Suprema ha respinto i dazi IEEPA — ogni dollaro è rimborsabile con interessi. Provi $120,000 nel calcolatore.",
        "Gli interessi sui rimborsi IEEPA in sospeso maturano a circa $650M al mese. Aspettare costa.",
      ],
      pricing: [
        "La libreria è gratis per sempre — le persone non pagano mai. Le aziende pagano solo l'8–15% quando il denaro arriva davvero.",
        "Nessun recupero, nessuna commissione — è scritto nel piano. Preventivo per iscritto prima dell'impegno.",
      ],
      faq: [
        "Qui vivono le domande giuste — incluso «è consulenza legale?» (spoiler: no, non siamo uno studio legale).",
        "Le FAQ coprono privacy, idoneità e cosa succede dopo il deposito. Due minuti ben spesi.",
      ],
      waitlist: [
        "Ultima fermata! Entri nella lista di lancio — o chieda qualsiasi cosa al nostro assistente AI: mi clicchi qui oppure prema il pulsante a scintilla nell'angolo.",
        "Se ne va? Porti con sé la checklist — la lista di lancio riceve avvisi sui nuovi registri per i suoi paesi.",
      ],
    },
    ask: {
      how: "Mi spieghi in parole semplici come funziona RecoveryOS.",
      library:
        "Come funziona la ricerca della Libreria mondiale ed è davvero gratuita?",
      channels: "Quale canale di recupero si adatta meglio alla mia azienda?",
      scanner: "Come fa lo scanner ad abbinare i miei acquisti ai fondi transattivi?",
      settlements: "Quali fondi transattivi sono ancora aperti e in chiusura?",
      ieepa: "Come richiedo i rimborsi dazi IEEPA tramite CAPE del CBP?",
      pricing: "Quanto costa RecoveryOS e quando pago?",
      faq: "RecoveryOS è legittimo ed è consulenza legale?",
      waitlist: "Cosa ottengo entrando nella lista d'attesa?",
    },
  },
};

export default it;
