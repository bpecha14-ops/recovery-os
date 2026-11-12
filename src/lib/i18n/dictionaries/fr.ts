import type { Dictionary } from "./en";

const fr: Dictionary = {
  common: {
    beta: "Bêta",
    runFreeScan: "Lancer un scan gratuit",
    openMenu: "Ouvrir le menu",
    language: "Langue",
    closeMenu: "Fermer le menu",
  },
  header: {
    nav: [
      "Comment ça marche",
      "Bibliothèque mondiale",
      "Canaux",
      "Scan gratuit",
      "Réclamations ouvertes",
      "Remboursement de droits",
      "Tarifs",
      "FAQ",
    ],
    ariaMainNav: "Navigation principale",
    ariaMobileNav: "Navigation mobile",
    ariaHome: "Accueil RecoveryOS",
  },
  hero: {
    pill: "La Cour suprême a annulé les droits de douane IEEPA par 6–3",
    titleA: "Le monde entier a oublié ",
    titleGold: "l’argent",
    titleB: " qu’on lui doit.",
    subtitle:
      "RecoveryOS cartographie toutes les bases de données officielles d’avoirs non réclamés de la planète — pour votre entreprise comme pour votre propre nom — puis dépose et suit les réclamations jusqu’à l’arrivée des chèques sur votre compte.",
    ctaScan: "Lancer un scan gratuit",
    ctaLibrary: "Explorer la bibliothèque mondiale — gratuitement",
    trustNoFee: "Pas de récupération, pas de frais",
    trustOfficial: "Liens vers tous les administrateurs officiels",
    trustDelete: "Données d’achats supprimées sur demande",
    deadlineLead: "Clôture cette semaine :",
    deadlineBody:
      "Fonds porc ($117M) — 29 oct. · Fonds dinde ($71.5M+) — 30 oct. Les intérêts des remboursements IEEPA en attente s’accumulent à environ {interest}/mois — les dates limites sont la raison pour laquelle les entreprises perdent chaque année de l’argent récupérable.",
    stat1: "de remboursements IEEPA en attente après la décision de la Cour suprême",
    stat2: "d’avoirs non réclamés vérifiés dans les {markets} marchés mondiaux que nous indexons",
    stat3: "de drawback non réclamé, selon les estimations de CBP",
    stat4: "dépôts de demande de remboursement CAPE dans les 6 premiers jours — la ruée vers l’or est bien réelle",
    ticker: [
      "Remboursements de droits IEEPA — $166B",
      "Pensions perdues au Royaume-Uni — £31.1B",
      "Ciclade (France) — €7.87B",
      "UDGAM (Inde) — ₹67,000 crore",
      "Comptes dormants (Corée) — ₩14T",
      "SVR (Brésil) — R$5.65B",
      "Afrique du Sud — R88.5B",
      "Fonds antitrust porc — $117M",
      "Drawback — $15B/yr",
      "Antitrust dinde — $71.5M+",
      "Argent perdu (Australie) — A$3B",
      "Comptes dormants (Canada) — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Comment ça marche",
    headingA: "Toute entreprise a une équipe comptabilité fournisseurs.",
    headingGold: "Aucune n’a d’équipe de récupération.",
    lead:
      "La comptabilité fournisseurs surveille ce qui sort. Personne ne surveille ce qui revient — remboursements, indemnisations, drawback, corrections de frais. RecoveryOS est ce service manquant, tarifé pour n’exister que lorsqu’il se rentabilise.",
    steps: [
      {
        title: "Connectez vos données",
        text: "Déposez un export d’achats — CSV QuickBooks, relevé Stripe ou bancaire, ou quarante lignes copiées-collées. Comptez environ quatre minutes. Rien ne quitte votre navigateur tant que vous ne lancez pas le scan.",
      },
      {
        title: "Nous rapprochons chaque ligne",
        text: "Le moteur compare chaque achat aux fenêtres d’actions collectives ouvertes, aux lignes tarifaires et aux règles de drawback — puis montre ce qui a correspondu, pourquoi, et une estimation prudente avant tout engagement de votre part.",
      },
      {
        title: "Les chèques arrivent — puis nous sommes payés",
        text: "Les réclamations passent par les administrateurs officiels ou des partenaires agréés. Les fonds arrivent directement sur votre compte. Notre commission de succès est annoncée par écrit et prélevée uniquement lorsque l’argent est versé.",
      },
    ],
  },
  library: {
    eyebrow: "La Bibliothèque mondiale",
    heading: "Toutes les bases de données officielles d’avoirs non réclamés de la planète.",
    headingGold: "Gratuites, pour toujours.",
    leadBefore:
      "Pas seulement l’Amérique, pas seulement les entreprises. De l’argent dort, oublié, sous la bureaucratie, dans chaque grande économie —",
    leadAfter:
      ". La Bibliothèque mondiale indexe la porte officielle de chacune, pour tous, pour $0.",
    moneyWords: [
      "comptes dormants",
      "pensions perdues",
      "dividendes non réclamés",
      "successions en déshérence",
      "dépôts oubliés",
      "chèques non encaissés",
    ],
    stats: [
      { label: "marchés indexés" },
      { label: "registres actifs aujourd’hui" },
      { label: "sources officielles vérifiées" },
      { label: "vérifiés, en attente de réclamation" },
    ],
    tickerLive: " — en ligne",
    tickerInLab: " — en préparation",
    searchTitle: "Trouvez l’argent que la bureaucratie a oublié —",
    searchTitleGold: "à votre propre nom.",
    searchLead:
      "Un nom, vos pays. Nous construisons votre liste de contrôle personnelle de bases de données officielles à explorer — chaque entrée gratuite, chaque lien officiel.",
    nameLabel: "Nom à rechercher — reste dans votre navigateur, jamais envoyé ailleurs",
    namePlaceholder: "ex. Maria Gonzalez",
    countriesLabel: "Pays où vous avez vécu, travaillé ou eu un compte bancaire",
    selectedCount: "{count}/8 sélectionnés",
    pickerPlaceholder: "Rechercher parmi {count} marchés — États-Unis, Royaume-Uni, Kenya, Malaisie…",
    pickerNoMatch:
      "Aucun marché ne correspond à « {query} » — essayez le nom complet, ex. « Japon ».",
    buildChecklist: "Créer ma liste de contrôle gratuite",
    searchPrivacy:
      "Gratuit pour toujours, sans paliers. Nous conservons votre recherche afin de vous alerter dès qu’un nouveau registre s’ouvre pour vos pays — c’est là tout notre modèle. Suppression à tout moment.",
    errorNameRequired: "Indiquez le nom à rechercher.",
    errorNoCountries:
      "Choisissez au moins un pays où vous avez vécu, travaillé ou eu un compte bancaire.",
    errorSearchFailed: "La recherche a échoué. Réessayez.",
    errorNetwork: "Erreur réseau — réessayez.",
    closeResults: "Fermer les résultats",
    checklistReadyOne: "Liste de contrôle prête pour {count} pays",
    checklistReadyMany: "Liste de contrôle prête pour {count} pays",
    officialDatabases: "bases de données officielles",
    toSearch: "à explorer",
    resultPrivacy:
      "Rien n’a été enregistré — vous seul voyez cette liste. Parcourez-la — la plupart des entrées prennent moins de 10 minutes.",
    databasesCount: "{count} bases de données",
    openOfficialSearch: "Ouvrir la recherche officielle",
    openTracker: "Ouvrir le suivi",
    regionsAriaLabel: "Régions du monde",
    sourceCountOne: "{count} source officielle",
    sourceCountMany: "{count} sources officielles",
    inTheLab: "En préparation",
    badgeLive: "En ligne",
    badgeResearching: "À l’étude",
    viewSources: "Voir les sources",
    launchesHere: "Lancement ici dès que les voies de réclamation seront vérifiées.",
    referralEyebrow: "Vous avez trouvé $40 pour vous-même ?",
    referralTitle: "On doit à votre entreprise",
    referralTitleGold: "100× plus.",
    referralText:
      "La même bureaucratie, à l’échelle de l’entreprise : remboursements de droits sur chaque importation, actions collectives sur chaque bon de commande, drawback sur chaque réexportation. Pointez le scanner sur la comptabilité de votre société et découvrez le chiffre réel.",
    runBusinessScan: "Lancer le scan entreprise",
    principles: [
      {
        title: "Gratuit pour toujours — l’autonomie d’abord",
        text: "Nous vous expliquons exactement comment déposer vous-même, en quelques minutes. Aucun intermédiaire requis, jamais. Aucun palier payant pour les particuliers, point final.",
      },
      {
        title: "Uniquement des liens officiels",
        text: "Chaque entrée renvoie à la base de données gouvernementale, à la banque centrale ou à l’administrateur désigné par le tribunal. Aucun site imitateur.",
      },
      {
        title: "Des données vivantes",
        text: "De nouveaux registres s’ouvrent chaque trimestre. La bibliothèque les suit en continu pour que votre liste ne soit jamais périmée.",
      },
    ],
    officialSourcesCount: "{count} sources officielles",
    officialSite: "Site officiel",
    addToSearch: "Ajouter {country} à ma recherche gratuite",
    footnoteIntro:
      "Chiffres compilés à partir des communications officielles des programmes et de la presse de référence à fin 2026 —",
    footnoteOutro: "Vérifiez toujours sur le site officiel avant d’agir.",
  },
  channels: {
    eyebrow: "Canaux",
    headingA: "Un seul moteur, tous les canaux où",
    headingGold: "l’argent des entreprises se bloque.",
    lead:
      "Chaque canal est banal pris isolément — quelques pour cent ici, un fonds manqué là. Empilés sur les mêmes données d’achats, ils se cumulent en un flux de récupération récurrent.",
    items: [
      {
        title: "Accords d’actions collectives",
        stat: "Des milliards",
        statLabel: "non réclamés dans les fonds ouverts",
        description:
          "Les accords antitrust indemnisent les entreprises pour les surcoûts sur tout, du porc et de la dinde au béton et à l’emballage. Les taux de réclamation sont minuscules — la plupart des acheteurs ne déposent jamais.",
        statusNote: "En ligne — plus de 5 fonds suivis",
      },
      {
        title: "Remboursements de droits IEEPA",
        stat: "$166B",
        statLabel: "à restituer à 330 000 importateurs",
        description:
          "La Cour suprême a annulé les droits IEEPA par 6–3. Chaque droit payé sous ce régime est remboursable avec intérêts via le portail CAPE de CBP — les échéances s’étendent jusqu’en 2027–2028.",
        statusNote: "En ligne — calculateur ci-dessous",
      },
      {
        title: "Drawback",
        stat: "~$15B/yr",
        statLabel: "non réclamés, selon les estimations de CBP",
        description:
          "Jusqu’à 99 % des droits sur les biens importés ensuite réexportés ou détruits peuvent être récupérés. La plupart des PME n’ont jamais déposé la moindre demande de drawback.",
        statusNote: "En ligne — examen inclus dans le scan",
      },
      {
        title: "Audits fret et colis",
        stat: "$1B+",
        statLabel: "d’industrie dédiée à la récupération des surcoûts d’expédition",
        description:
          "Livraisons tardives, surcharges en double et erreurs de dimension font fuir 1–3 % des dépenses d’expédition. Les cabinets d’audit facturent 25–50 % au résultat — nous regrouperons tout dans une seule plateforme.",
        statusNote: "T1 2027",
      },
      {
        title: "Crédits d’impôt R&D",
        stat: "La plupart",
        statLabel: "des PME éligibles ne déposent jamais de demande",
        description:
          "Les programmes de crédit américains, britanniques et européens restent régulièrement non réclamés par des petites entreprises pourtant éligibles. Nous présélectionnons vos dépenses d’ingénierie et remettons les dossiers à un préparateur agréé.",
        statusNote: "T1 2027",
      },
      {
        title: "Biens non réclamés (B2B)",
        stat: "$100–150B",
        statLabel: "détenus par les États américains, entreprises comprises",
        description:
          "Avoirs fournisseurs oubliés, remboursements non encaissés, anciens dépôts — la déshérence absorbe silencieusement l’argent des entreprises au profit des États, chaque année. Nous passons tout au crible en continu.",
        statusNote: "T2 2027",
      },
    ],
    ticker: [
      "Cour suprême 6–3 — droits IEEPA illégaux",
      "CAPE : 75 300 dépôts dans les 6 premiers jours",
      "Les intérêts courent à ≈ $650M/mois sur les remboursements en attente",
      "Drawback : jusqu’à 99 % des droits récupérables",
      "Taux de réclamation des actions collectives : généralement inférieurs à 10 %",
      "1 Américain sur 10 figure sur une liste d’avoirs non réclamés",
      "Fonds porc $117M — échéance suivie",
      "Fonds dinde $71.5M+ — échéance suivie",
    ],
  },
  scanner: {
    eyebrow: "Scan gratuit",
    headingA: "Montrez-nous vos achats.",
    headingGold: "Nous trouverons l’argent.",
    lead:
      "Sans compte, sans transfert vers des tiers — collez un export de QuickBooks, Stripe ou de votre banque et le moteur confronte chaque ligne aux canaux de récupération actifs.",
    tabs: {
      upload: "Importer un CSV",
      paste: "Coller les données",
    },
    upload: {
      chooseAriaLabel: "Choisir un fichier CSV d’achats",
      choose: "Cliquez pour choisir un fichier CSV / TSV",
      expectedColumns: "Colonnes attendues : Date, Description, Amount",
    },
    paste: {
      label: "Collez vos lignes d’achats",
      placeholder:
        "Date,Description,Amount\n2025-04-18,Droit IEEPA — pièces Chine,28500\n2016-09-02,Poitrine de porc — Smithfield,4120.50",
      hint: "CSV ou TSV, un achat par ligne. Les exports QuickBooks, Stripe, Xero et de la plupart des banques fonctionnent tels quels.",
    },
    loadSample: "Pas de données sous la main ? Chargez un échantillon réaliste",
    privacyNote: "Nous ne stockons que des statistiques agrégées de scans — jamais vos lignes.",
    preview: {
      usableRowsLabel: "lignes exploitables",
      skipped: "{count} ignorées",
      totalSpendLabel: "Dépenses totales :",
      colDate: "Date",
      colDescription: "Description",
      colAmount: "Montant",
      moreRows: "…et {count} lignes de plus seront analysées.",
    },
    actions: {
      run: "Lancer le scan",
      scanning: "Analyse des canaux…",
      scanningAriaLabel: "Analyse en cours",
      clear: "Effacer",
    },
    toasts: {
      fileTooLargeTitle: "Fichier trop volumineux",
      fileTooLargeBody: "Gardez les exports sous 5 Mo (~100 000 lignes).",
      sampleLoadedTitle: "Échantillon chargé",
      sampleLoadedBody: "14 lignes d’un distributeur-importateur alimentaire fictif de taille moyenne.",
    },
    errors: {
      noUsableRows:
        "Aucune ligne exploitable trouvée. Colonnes attendues : Date, Description, Amount (CSV ou TSV, exporté depuis QuickBooks, Stripe ou votre banque).",
    },
    results: {
      complete: "Scan terminé — {count} lignes analysées",
      foundLabel: "Trouvé :",
      matchedChannelsOne: "Sur {count} canal correspondant.",
      matchedChannelsMany: "Sur {count} canaux correspondants.",
      conservativeNote:
        "Fourchettes prudentes — le versement final dépend de vos preuves et du total des demandes soumises à chaque fonds.",
      ieepaIncluded:
        "Inclut des remboursements de droits IEEPA de {low}–{high} (droits restitués + intérêts légaux, avant frais de dépôt).",
      missedClosed:
        "Vous avez aussi laissé filer {low}–{high} en réclamations déjà closes. Le suivi garantit que cela ne se reproduise plus.",
      claimCta: "Réclamer avec RecoveryOS",
      scanAnother: "Scanner un autre fichier",
    },
    match: {
      finalDay: "Dernier jour",
      daysLeft: "{count} jours restants",
      fundBadge: "Fonds : {size}",
      matchedPurchases: "Achats correspondants ({count})",
      moreLines: "+ {count} lignes de plus",
      matchedVolumeLabel: "Volume correspondant :",
      estimatedRecovery: "Récupération estimée",
      whoCanClaimLabel: "Qui peut réclamer : ",
      evidenceLabel: "Preuves : ",
      claimCta: "Réclamer avec RecoveryOS",
      closedCta: "Clos — rejoindre la liste de veille",
      officialSite: "Site officiel",
    },
    disclaimer:
      "Les estimations sont des outils de modélisation, ni garanties ni conseils juridiques. Les versements dépendent de la qualité des réclamations, des preuves et du total des demandes reçues par chaque fonds. Vous pouvez toujours déposer directement auprès de l’administrateur officiel — liens fournis pour chaque fonds.",
  },
  settlements: {
    eyebrow: "Suivi des réclamations en direct",
    heading: "Des fonds ouverts, des échéances bien réelles.",
    lead:
      "Chaque fonds ci-dessous est une affaire déposée publiquement, dotée d’un administrateur officiel. Nous les suivons pour que votre entreprise n’apprenne jamais l’existence d’argent gratuit une semaine après sa clôture.",
    filterAria: "Filtrer les fonds",
    filters: [
      { label: "Tous les fonds" },
      { label: "Clôture prochaine" },
      { label: "Ouverts" },
      { label: "Période de vérification" },
      { label: "Clos (manqués)" },
    ],
    statusOpen: "Ouvert",
    statusClosingSoon: "Clôture prochaine",
    statusClosed: "Clos — manqué",
    statusVerify: "Période de vérification",
    deadlineVerify: "Fenêtre de réclamation — à vérifier auprès de l’administrateur",
    daysMonitor: "surveiller",
    daysPast: "dépassé de {days} jours",
    lastDay: "dernier jour",
    daysLeftCount: "{days} jours restants",
    fundBadge: "Fonds : {fund}",
    purchasesLabel: "Achats :",
    deadlineTerm: "Échéance :",
    eligibleLabel: "Qui peut réclamer :",
    testInScanner: "Tester dans le scanner",
    officialSite: "Site officiel",
    disclaimer:
      "Les données des fonds, les fenêtres d’action collective et les échéances sont compilées à partir des dépôts publics et des avis des administrateurs à fin octobre 2026. Les échéances changent — confirmez toujours sur le site officiel de l’accord avant de vous fier à une date, ou laissez notre liste de veille le faire en continu.",
  },
  ieepa: {
    eyebrow: "Zoom sur un canal — IEEPA",
    heading: "La Cour suprême a annulé les droits. Maintenant, l’argent doit revenir.",
    lead:
      "Le 20 février 2026, la Cour a jugé par 6–3 que les droits IEEPA étaient illégaux ({case}). Environ {totalRefunds} payés par {importers} importateurs sur {entries} entrées doivent être restitués avec intérêts, via le portail CAPE de CBP — les échéances s’étendent jusqu’en {deadlines}.",
    capeLivePre: "CAPE est en ligne depuis le {date}. Durant ses six premiers jours, il a reçu",
    capeLivePost:
      "dépôts couvrant 11,2 millions d’entrées — les PME rapides sont payées en premier.",
    interestPre: "Les intérêts se capitalisent à environ {rate} %/an — soit environ",
    interestPost:
      "par mois s’accumulent sur l’ensemble des remboursements en attente pendant que les dossiers patientent dans les files.",
    failedValidationPre: "Environ",
    failedValidationPost:
      "entrées ont déjà échoué à la validation CAPE au premier dépôt — une préparation rigoureuse des données fait toute la différence.",
    servicesText:
      "Nous préparons les entrées, corrigeons les erreurs de validation, générons des fichiers prêts pour CAPE et suivons chaque échéance. Le dépôt reste entre vos mains ou entre celles de votre courtier agréé — aucun jeu de licence.",
    estimatorTitle: "Calculateur remboursement + intérêts",
    estimatorNote: "Simple ordre de grandeur — vos entrées déterminent le montant exact.",
    principalLabel: "Total des droits IEEPA payés (USD)",
    dateLabel: "Dernier paiement de droits",
    rateLabel: "Taux d’intérêt (%/an)",
    includeInterestLabel: "Inclure les intérêts courus à ce jour (≈{rate} %/an par défaut)",
    dutiesBackLabel: "Droits restitués",
    interestLabel: "Intérêts",
    totalLabel: "Total",
    dripLine:
      "Intérêts courus sur les remboursements IEEPA en attente aux États-Unis depuis l’ouverture de cette page :",
    ctaButton: "Préparer ma demande CAPE",
    disclaimer:
      "Ne couvre que les droits fondés sur l’IEEPA (routes Chine / Canada / Mexique). Les droits relevant des sections 232/301 ne sont pas affectés par la décision.",
  },
  pricing: {
    eyebrow: "Tarifs",
    headingA: "Gratuit pour les particuliers. Des frais seulement quand",
    headingGold: "l’argent bouge.",
    lead:
      "La Bibliothèque mondiale ne coûtera jamais un centime — chaque recherche rend la carte de l’argent perdu plus précise, et cette carte est notre source de revenus. Les entreprises paient une commission de succès, uniquement sur l’argent qui revient réellement.",
    alwaysFreeBadge: "Toujours gratuit",
    plans: [
      {
        name: "Particuliers — la Bibliothèque mondiale",
        price: "$0",
        cadence: "gratuit pour toujours · sans palier, sans carte, sans piège",
        cta: "Rechercher dans 20 pays",
        features: [
          "Toutes les bases de données officielles d’avoirs non réclamés que nous indexons, dans le monde entier",
          "Générateur de liste de contrôle personnelle — un nom en entrée, des sources en sortie",
          "Alertes de nouveaux registres pour vos pays",
          "Liens directs vers la recherche officielle — nous ne nous mettons jamais en travers",
          "Recherchez pour vous, vos parents, vos grands-parents",
        ],
      },
      {
        name: "Récupération entreprise",
        price: "$0 à l’avance",
        cadence: "puis 8–15 % des fonds récupérés",
        cta: "Lancer un scan gratuit",
        features: [
          "Préparation des réclamations & constitution des dossiers de preuve",
          "Fichiers prêts pour CAPE + corrections de validation",
          "Dépôt via les administrateurs officiels ou des partenaires agréés",
          "Suivi des échéances jusqu’à l’arrivée des fonds",
          "Annoncé par écrit avant tout engagement — pas de récupération, pas de frais",
        ],
      },
      {
        name: "Partenaires & données",
        price: "Sur devis",
        cadence: "partage de revenus · API · analyses",
        cta: "Nous contacter",
        features: [
          "Pour les courtiers en douane, agences et associations",
          "Préparation de réclamations en volume pour vos portefeuilles clients",
          "Accès API au moteur de correspondance",
          "Couverture agrégée des registres à mesure que nous étendons les marchés",
          "Vous gardez la relation client — nous faisons tourner la machine",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Des questions légitimes, des réponses directes.",
    items: [
      {
        question: "Je suis un particulier, pas une entreprise — est-ce pour moi ?",
        answer:
          "Oui — via la Bibliothèque vivante, gratuite pour toujours. Les particuliers peuvent dénicher eux-mêmes, en quelques minutes, des biens non réclamés, des obligations d’épargne échues, des pensions non réclamées, des remboursements d’impôt et des fonds d’actions collectives de consommation : chaque entrée précise qui est éligible, quelles preuves fournir et renvoie vers l’outil officiel gratuit. Le moteur payant (scan, préparation des réclamations, dépôt) existe pour les entreprises, où les montants justifient le travail — pour les réclamations personnelles, l’autonomie via la bibliothèque est presque toujours la voie la plus rapide.",
      },
      {
        question: "Est-ce un conseil juridique ? Êtes-vous un cabinet d’avocats ?",
        answer:
          "Non. RecoveryOS n’est pas un cabinet d’avocats et ne fournit pas de conseil juridique. Nous faisons du travail de données : analyse, mise en correspondance, constitution des preuves, validation et suivi. Les réclamations sont déposées auprès des administrateurs officiels désignés par les tribunaux et, quand une juridiction exige un conseil agréé, nous nous associons à lui. Vous pouvez toujours déposer toute réclamation vous-même, gratuitement — nous relions chaque site d’administrateur pour que vous puissiez le faire.",
      },
      {
        question: "Quelle est la précision des estimations ?",
        answer:
          "Ce sont délibérément des fourchettes prudentes, fondées sur les tailles de fonds publiées et les ratios d’indemnisation typiques des récupérations antitrust et tarifaires comparables. Votre versement final dépend de votre volume d’achats documenté, de la qualité de la réclamation et du nombre de demandes reçues par le fonds. Nous annonçons par écrit une commission de succès par réclamation avant tout engagement.",
      },
      {
        question: "De quelles données avez-vous besoin, et qu’advient-il d’elles ?",
        answer:
          "Un export d’achats — Date, Description, Amount — depuis QuickBooks, Stripe, Xero ou votre banque. Le scan gratuit ne stocke que des statistiques agrégées (lignes analysées, correspondances trouvées). Vos données ligne à ligne ne sont jamais vendues ni partagées, et sont supprimées sur demande. Pour le dépôt, vous partagez les preuves uniquement avec l’administrateur officiel.",
      },
      {
        question: "Quand et comment paierai-je ?",
        answer:
          "Rien à l’avance. Quand une récupération arrive sur votre compte, notre commission de succès (8–15 %, généralement 12 %) est facturée. Le suivi est un abonnement forfaitaire de $99/mo, résiliable à tout moment — les partenaires de lancement bénéficient de 12 mois gratuits. Les fonds issus des accords et de CBP arrivent toujours directement sur votre compte professionnel, jamais par notre intermédiaire.",
      },
      {
        question: "Pourquoi ne pas simplement engager un cabinet d’avocats ?",
        answer:
          "Excellente question — parfois, il le faut. Un conseil en commerce extérieur facture $300–800/heure et aura de toute façon besoin de données organisées. Nous prenons en charge la couche données à risque financier zéro, et nos dossiers de réclamation rendent n’importe quel avocat plus économique à mobiliser. Pour les réclamations simples, la voie de l’administrateur avec un dossier préparé ne nécessite généralement aucun avocat.",
      },
      {
        question: "Quels canaux sont actifs aujourd’hui, et ensuite ?",
        answer:
          "Actifs aujourd’hui : réclamations sur les accords d’actions collectives, préparation des remboursements de droits IEEPA et détection du drawback. Le T1 2027 ajoutera la récupération des audits fret et colis et la présélection des crédits d’impôt R&D. Le T2 2027 ajoutera les balayages des biens non réclamés B2B. Chaque canal s’appuie sur les mêmes données d’achats connectées — aucun travail supplémentaire pour vous.",
      },
      {
        question: "Nous sommes basés hors des États-Unis. Cela nous concerne-t-il ?",
        answer:
          "Si vous exportez vers les États-Unis ou en importez, vous pouvez être concerné : les remboursements IEEPA couvrent tout importateur de record, et les fonds antitrust couvrent les achats réalisés dans le commerce américain. Nous construisons ensuite des canaux de remboursement UE/Royaume-Uni. Indiquez-nous où vous opérez et nous signalerons ce qui vous concerne.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Liste de lancement",
    headingA: "L’argent retrouvé devrait",
    headingGold: "vous trouver en premier.",
    lead:
      "Les places de lancement incluent 12 mois de suivi gratuits, la tarification de commission de succès des membres fondateurs (8 %) et un premier scan de vos achats 2024–2026 contre tous les fonds ouverts.",
    perks: ["Sans carte, sans engagement", "Résiliable à tout moment une fois en ligne"],
    spotsClaimed: "Places de lancement réservées",
    spotsNote: "Les places partent dans l’ordre d’inscription — la barre ne va que dans un seul sens.",
    successTitle: "Vous y êtes. Bienvenue à bord.",
    successText:
      "Nous vous enverrons votre parcours d’intégration au lancement et la liste de documents des fonds les plus proches de la clôture. Si vous avez importé quoi que ce soit sous les droits de 2025, répondez avec un ordre de grandeur des droits payés et nous lancerons l’estimation IEEPA.",
    emailLabel: "E-mail professionnel *",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Entreprise",
    companyPlaceholder: "Nom de l’entreprise",
    volumeLabel: "Volume d’achats mensuel",
    volumePlaceholder: "Choisissez une fourchette",
    volumeOptions: [
      "Moins de $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Plus de $1M",
    ],
    channelsLabel: "Quelles récupérations vous intéressent ?",
    channelOptions: [
      "Accords d’actions collectives",
      "Remboursements de droits IEEPA",
      "Drawback",
      "Audits fret et colis",
    ],
    submitLabel: "Réserver ma place de lancement",
    savingLabel: "Enregistrement…",
    privacyNote: "Nous ne vous écrivons qu’au sujet de votre argent, rien d’autre. Un clic pour partir.",
    invalidEmailTitle: "Saisissez une adresse e-mail valide",
    invalidEmailDescription: "Une seule adresse suffit.",
    joinedToastTitle: "Vous êtes sur la liste",
    joinedToastDescription: "Les places de lancement partent dans l’ordre d’inscription. Surveillez votre boîte de réception.",
    errorToastTitle: "Une erreur est survenue",
    errorToastDescription: "Veuillez réessayer dans un instant.",
  },
  footer: {
    about:
      "Le service de récupération des petites entreprises — et une Bibliothèque vivante gratuite de l’argent oublié pour tous les autres. Nous cartographions chaque canal où l’argent se bloque : actions collectives, remboursements de droits, drawback, biens non réclamés. Vous ne payez que lorsque les chèques arrivent.",
    productTitle: "Produit",
    channelsTitle: "Canaux",
    product: [
      "Comment ça marche",
      "Bibliothèque mondiale",
      "Scan gratuit",
      "Réclamations ouvertes",
      "Calculateur IEEPA",
      "Tarifs",
    ],
    channelsNav: [
      "Tous les canaux",
      "Actions collectives",
      "Remboursements de droits",
      "Drawback",
      "Liste de lancement",
    ],
    legal1:
      "RecoveryOS n’est ni un cabinet d’avocats, ni un expert-comptable, ni un courtier en douane agréé, et rien sur ce site ne constitue un conseil juridique, fiscal ou financier. La Bibliothèque vivante renvoie vers des bases de données gouvernementales officielles et des administrateurs désignés par les tribunaux — les particuliers peuvent toujours déposer directement, gratuitement. Les estimations de récupération sont des outils de modélisation fondés sur des dépôts publics et des ratios d’indemnisation historiques ; les récupérations réelles dépendent de vos preuves, de votre éligibilité et du total des demandes reçues par chaque fonds.",
    legal2:
      "Les données des fonds d’indemnisation, les fenêtres d’action collective et les échéances sont compilées à partir des dépôts judiciaires publics et des avis officiels des administrateurs à fin octobre 2026, et peuvent changer sans préavis. Vérifiez toujours les échéances auprès de l’administrateur officiel de l’accord avant de vous y fier. Les réclamations sont toujours déposées par vous ou via des partenaires dûment agréés, et les fonds arrivent directement sur votre compte.",
    copyright: "© 2026 RecoveryOS. Tous droits réservés.",
    ariaProduct: "Produit",
    ariaChannels: "Canaux",
  },
  claim: {
    title: "Réclamer avec RecoveryOS",
    titleDone: "Dossier de réclamation demandé",
    descriptionDone:
      "Vérifiez votre boîte de réception — nous ne demandons que les documents réellement exigés par l’administrateur.",
    descriptionContext:
      "Nous préparerons les documents pour {context} et confirmerons chaque échéance auprès de l’administrateur officiel. Vous ne payez qu’à l’arrivée des fonds.",
    descriptionDefault:
      "Nous préparerons les documents, confirmerons les échéances auprès de l’administrateur officiel et déposerons jusqu’à l’arrivée des fonds. Vous ne payez qu’une fois l’argent versé sur votre compte.",
    nextStepsTitle: "Prochaines étapes",
    nextSteps: [
      "Envoyez-nous vos justificatifs d’achats (factures / exports).",
      "Nous validons la réclamation et annonçons la commission de succès par écrit.",
      "Les fonds arrivent toujours directement sur votre compte professionnel.",
    ],
    emailLabel: "E-mail professionnel",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Entreprise",
    companyPlaceholder: "Nom de l’entreprise",
    submit: "Recevoir mon dossier de réclamation",
    submitting: "Enregistrement…",
    footerNote:
      "Pas de récupération, pas de frais. Vous pouvez toujours déposer vous-même via l’administrateur officiel — nous relions chaque fonds.",
    invalidEmailTitle: "Saisissez une adresse e-mail valide",
    invalidEmailBody: "Nous avons besoin d’une adresse pour vous envoyer votre dossier de réclamation.",
    queuedTitle: "Vous êtes dans la file d’attente",
    queuedBody: "Nous vous contacterons avec votre dossier de réclamation et les documents exacts nécessaires.",
    errorTitle: "Une erreur est survenue",
    errorBody: "Veuillez réessayer dans un instant.",
  },
  assistant: {
    openChat: "Ouvrir le chat IA Goldie",
    closeChat: "Fermer le chat de Goldie",
    chatDialog: "Chat de l’assistante IA Goldie",
    askGoldie: "Demandez tout à Goldie",
    online: "En ligne · répond dans toutes les langues",
    aiScout: "Éclaireuse IA",
    reset: "Réinitialiser la conversation",
    send: "Envoyer le message",
    placeholder: "Demandez tout à Goldie…",
    disclaimer:
      "Les réponses de l’IA peuvent être imparfaites — vérifiez les détails des fonds auprès des administrateurs officiels liés sur cette page.",
    greeting:
      "Bonjour ! Je suis **Goldie**, votre éclaireuse RecoveryOS. Demandez-moi tout ce qui touche aux avoirs non réclamés — la Bibliothèque mondiale, les échéances des fonds, les remboursements de droits ou le fonctionnement du scanner. Je réponds dans la langue de votre choix.",
    suggestions: [
      "Comment trouver gratuitement des avoirs non réclamés ?",
      "Qu’est-ce que le remboursement IEEPA de $166B ?",
      "Le scanner est-il vraiment privé ?",
      "Qu’est-ce qu’un avoir non réclamé ?",
    ],
  },
  guide: {
    welcome:
      "Bienvenue ! Je suis Goldie — je parcours ce site et glisse des astuces au fil de votre lecture. Cliquez sur moi à tout moment pour discuter avec notre assistant IA.",
    dismiss: "Masquer l’astuce",
    mute: "Couper les astuces pour cette visite",
    unmute: "Astuces coupées — activer",
    avatarLabel: "Goldie, le guide du site — cliquez pour discuter avec l'IA",
    askGoldie: "Interroger Goldie sur cette section",
    tips: {
      how: [
        "Nouveau ici ? Cette bande présente tout le parcours — scan, vérification, réclamation. Aucune inscription nécessaire pour essayer.",
        "Trois étapes, zéro coût pour explorer. Le scanner propose même un échantillon réaliste lançable en un clic.",
      ],
      library: [
        "Psst — le nom que vous saisissez ici ne quitte jamais votre navigateur. Choisissez vos pays et obtenez une liste de contrôle gratuite de registres officiels.",
        "50 marchés, plus de 66 sources officielles. Essayez la Turquie ou les Émirats — la couverture dépasse largement l’Amérique.",
      ],
      channels: [
        "Six canaux de récupération se cachent ici. La carte IEEPA qui s’illumine vaut à elle seule $166B de droits remboursables.",
        "Le drawback seul, c’est ~$15B par an laissés sur la table. Audits fret, crédits R&D — la plupart des entreprises ne vérifient jamais.",
      ],
      scanner: [
        "Essayez « Charger un échantillon réaliste » — 14 lignes d’achats de démonstration trouvent environ $47K. Votre fichier ne quitte jamais ce navigateur.",
        "Le scanner analyse votre CSV ici même, dans le navigateur — aucun envoi, aucun compte, rien de stocké.",
      ],
      settlements: [
        "Les échéances font tout le jeu. Triez par jours restants — le fonds Ready-Mix de l’Iowa ferme le 16 novembre.",
        "Chaque carte renvoie directement à l’administrateur désigné par le tribunal. Aucun intermédiaire, aucune commission de retrouveur.",
      ],
      ieepa: [
        "Droits payés en 2025 ou après ? La Cour suprême a annulé les droits IEEPA — chaque dollar est remboursable, avec intérêts. Essayez $120,000 dans le calculateur.",
        "Les intérêts sur les remboursements IEEPA en attente courent à environ $650M par mois. Attendre coûte cher.",
      ],
      pricing: [
        "La bibliothèque est gratuite pour toujours — les particuliers ne paient jamais. Les entreprises ne paient que 8–15 %, quand l’argent arrive réellement.",
        "Pas de récupération, pas de frais — c’est inscrit dans le modèle économique. Annoncé par écrit avant tout engagement.",
      ],
      faq: [
        "Les bonnes questions vivent ici — dont « est-ce un conseil juridique ? » (spoiler : non, nous ne sommes pas un cabinet d’avocats).",
        "La FAQ couvre la confidentialité, l’éligibilité et la suite après le dépôt. Deux minutes bien employées.",
      ],
      waitlist: [
        "Dernière étape ! Rejoignez la liste de lancement — ou demandez simplement ce que vous voulez à notre assistant IA : cliquez sur moi ici ou sur le bouton étincelle dans le coin.",
        "Vous partez ? Emportez la liste de contrôle — la liste de lancement reçoit des alertes de nouveaux registres pour vos pays.",
      ],
    },
    ask: {
      how: "Expliquez simplement comment fonctionne RecoveryOS.",
      library: "Comment fonctionne la recherche de la Bibliothèque mondiale, et est-elle vraiment gratuite ?",
      channels: "Quel canal de récupération convient le mieux à mon entreprise ?",
      scanner: "Comment le scanner fait-il correspondre mes achats aux fonds d’indemnisation ?",
      settlements: "Quels fonds d’indemnisation restent ouverts et ferment bientôt ?",
      ieepa: "Comment réclamer les remboursements de droits IEEPA via le portail CAPE de CBP ?",
      pricing: "Combien coûte RecoveryOS, et quand paierai-je ?",
      faq: "RecoveryOS est-il légitime, et est-ce un conseil juridique ?",
      waitlist: "Qu’est-ce que j’obtiens en rejoignant la liste de lancement ?",
    },
  },
};

export default fr;
