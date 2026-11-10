import type { Dictionary } from "./en";

const pl: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Uruchom bezpłatny skan",
    openMenu: "Otwórz menu",
    language: "Język",
    closeMenu: "Zamknij menu",
  },
  header: {
    nav: [
      "Jak to działa",
      "Światowa biblioteka",
      "Kanały",
      "Bezpłatny skaner",
      "Otwarte roszczenia",
      "Zwrot ceł",
      "Cennik",
      "FAQ",
    ],
    ariaMainNav: "Nawigacja główna",
    ariaMobileNav: "Nawigacja mobilna",
    ariaHome: "Strona główna RecoveryOS",
  },
  hero: {
    pill: "Sąd Najwyższy USA uchylił cła IEEPA stosunkiem 6–3",
    titleA: "Światowi należą się",
    titleGold: "pieniądze",
    titleB: "o których zapomniał.",
    subtitle:
      "RecoveryOS mapuje wszystkie oficjalne bazy nieodebranych pieniędzy na świecie — dla Twojej firmy i na Twoje własne nazwisko — a następnie składa i śledzi roszczenia, dopóki czeki nie wpłyną na Twoje konto.",
    ctaScan: "Uruchom bezpłatny skan",
    ctaLibrary: "Odkryj światową bibliotekę — bezpłatnie",
    trustNoFee: "Bez odzysku — bez opłaty",
    trustOfficial: "Linki do każdego oficjalnego administratora",
    trustDelete: "Dane zakupów usuwane na życzenie",
    deadlineLead: "Zamyka się w tym tygodniu:",
    deadlineBody:
      "Fundusz wieprzowiny ($117M) — 29 paź. · Fundusze indycze ($71.5M+) — 30 paź. Odsetki od oczekujących zwrotów IEEPA narastają w tempie około {interest}/miesiąc — to właśnie terminy powodują, że firmy co roku tracą pieniądze możliwe do odzyskania.",
    stat1: "w zwrotach IEEPA czekających po wyroku Sądu Najwyższego",
    stat2:
      "zweryfikowanych nieodebranych pieniędzy na {markets} rynkach świata, które indeksujemy",
    stat3: "nieodebranych w ramach drawbacku, według szacunków CBP",
    stat4:
      "wniosków o zwrot w CAPE w ciągu pierwszych 6 dni — gorączka złota jest realna",
    ticker: [
      "Zwroty ceł IEEPA — $166B",
      "Zagubione emerytury w UK — £31.1B",
      "Francja Ciclade — €7.87B",
      "Indie UDGAM — ₹67,000 crore",
      "Korea: uśpione środki — ₩14T",
      "Brazylia SVR — R$5.65B",
      "RPA — R88.5B",
      "Antymonopolowy fundusz wieprzowiny — $117M",
      "Drawback — $15B/yr",
      "Antymonopolowy fundusz indyczy — $71.5M+",
      "Australia: zagubione pieniądze — A$3B",
      "Kanada: uśpione środki — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Jak to działa",
    headingA: "Każda firma ma dział rozrachunków.",
    headingGold: "Żadna nie ma działu odzysków.",
    lead:
      "Dział rozrachunków pilnuje tego, co wychodzi. Nikt nie pilnuje tego, co wraca — zwrotów, ugód, drawbacku, korekt opłat. RecoveryOS jest tym brakującym działem — wycenionym tak, że istnieje tylko wtedy, kiedy sam na siebie zarabia.",
    steps: [
      {
        title: "Podłącz swoje dane",
        text: "Wrzuć eksport zakupów — CSV z QuickBooks, wyciąg ze Stripe lub banku, a może czterdzieści wierszy wklejonych bezpośrednio. Zajmuje to około cztery minuty. Nic nie opuszcza Twojej przeglądarki, dopóki nie uruchomisz skanu.",
      },
      {
        title: "Dopasowujemy każdą pozycję",
        text: "Silnik porównuje każdy zakup z otwartymi okresami zgłoszeń w pozwach zbiorowych, pozycjami celnymi i zasadami drawbacku — po czym pokazuje, co się dopasowało i dlaczego, oraz ostrożny szacunek, zanim podejmiesz jakiekolwiek zobowiązanie.",
      },
      {
        title: "Czeki przychodzą — wtedy bierzemy opłatę",
        text: "Roszczenia trafiają do oficjalnych administratorów lub licencjonowanych partnerów. Środki płyną bezpośrednio na Twoje konto. Naszą prowizję od sukcesu podajemy na piśmie i naliczamy dopiero, gdy pieniądze wpłyną.",
      },
    ],
  },
  library: {
    eyebrow: "Światowa Biblioteka",
    heading: "Wszystkie oficjalne bazy nieodebranych pieniędzy na świecie.",
    headingGold: "Zawsze bezpłatna.",
    leadBefore:
      "Nie tylko Ameryka i nie tylko firmy. Pieniądze leżą zapomniane pod biurokracją w każdej większej gospodarce —",
    leadAfter:
      ". Światowa Biblioteka indeksuje oficjalne wejście do każdej z nich — dla każdego, za $0.",
    moneyWords: [
      "uśpione rachunki",
      "zagubione emerytury",
      "nieodebrane dywidendy",
      "spadki bez właściciela",
      "zapomniane depozyty",
      "niespieniężone czeki",
    ],
    stats: [
      { label: "zindeksowanych rynków" },
      { label: "rejestrów aktywnych dziś" },
      { label: "zweryfikowanych oficjalnych źródeł" },
      { label: "zweryfikowanych środków czeka na odbiór" },
    ],
    tickerLive: " — na żywo",
    tickerInLab: " — w laboratorium",
    searchTitle: "Znajdź pieniądze zapomniane przez biurokrację —",
    searchTitleGold: "na własne nazwisko.",
    searchLead:
      "Jedno nazwisko, Twoje kraje. Zbudujemy osobistą listę kontrolną oficjalnych baz do przeszukania — każdy wpis bezpłatny, każdy link oficjalny.",
    nameLabel: "Nazwisko do wyszukania — zostaje w Twojej przeglądarce, nigdzie nie jest wysyłane",
    namePlaceholder: "np. Jan Kowalski",
    countriesLabel: "Kraje zamieszkania, pracy lub bankowości",
    selectedCount: "{count}/8 wybranych",
    pickerPlaceholder: "Przeszukaj {count} rynków — USA, UK, Kenia, Malezja…",
    pickerNoMatch:
      "Żaden rynek nie pasuje do „{query}” — spróbuj pełnej nazwy, np. „Japonia”.",
    buildChecklist: "Zbuduj moją bezpłatną listę kontrolną",
    searchPrivacy:
      "Na zawsze bezpłatnie, bez planów cenowych. Zachowujemy Twoje wyszukiwanie, aby powiadomić Cię, gdy dla Twoich krajów uruchomione zostaną nowe rejestry — to cały nasz model. Usuń w dowolnym momencie.",
    errorNameRequired: "Podaj nazwisko do wyszukania.",
    errorNoCountries:
      "Wybierz przynajmniej jeden kraj zamieszkania, pracy lub bankowości.",
    errorSearchFailed: "Wyszukiwanie nie powiodło się. Spróbuj ponownie.",
    errorNetwork: "Błąd sieci — spróbuj ponownie.",
    closeResults: "Zamknij wyniki",
    checklistReadyOne: "Lista kontrolna gotowa dla {count} kraju",
    checklistReadyMany: "Lista kontrolna gotowa dla {count} krajów",
    officialDatabases: "oficjalnych baz danych",
    toSearch: "do przeszukania",
    resultPrivacy:
      "Nic nie zapisano — tę listę kontrolną widzisz tylko Ty. Przejdź ją po kolei — większość pozycji zajmuje mniej niż 10 minut.",
    databasesCount: "{count} baz danych",
    openOfficialSearch: "Otwórz oficjalną wyszukiwarkę",
    openTracker: "Otwórz tracker",
    regionsAriaLabel: "Regiony świata",
    sourceCountOne: "{count} oficjalne źródło",
    sourceCountMany: "{count} oficjalnych źródeł",
    inTheLab: "W laboratorium",
    badgeLive: "Aktywne",
    badgeResearching: "W opracowaniu",
    viewSources: "Zobacz źródła",
    launchesHere: "Uruchomimy to tutaj, gdy tylko zweryfikujemy ścieżki roszczeń.",
    referralEyebrow: "Udało Ci się znaleźć $40?",
    referralTitle: "Twoja firma ma do odebrania",
    referralTitleGold: "100× więcej.",
    referralText:
      "Ta sama biurokracja, tylko w skali firmy: zwroty ceł z każdego importu, pozwy zbiorowe przy każdym zamówieniu, drawback przy każdym reeksporcie. Skieruj skaner na księgi rachunkowe swojej firmy i zobacz prawdziwą liczbę.",
    runBusinessScan: "Uruchom skan dla firmy",
    principles: [
      {
        title: "Na zawsze bezpłatnie — najpierw samodzielnie",
        text: "Dokładnie pokazujemy, jak złożyć wniosek samodzielnie — w kilka minut. Pośrednik nie jest nigdy potrzebny. Żadnych płatnych planów dla osób prywatnych, kropka.",
      },
      {
        title: "Wyłącznie oficjalne linki",
        text: "Każdy wpis prowadzi do rządowej bazy danych, banku centralnego albo administratora wyznaczonego przez sąd. Żadnych podróbek.",
      },
      {
        title: "Żywe dane",
        text: "Co kwartał uruchamiane są nowe rejestry. Biblioteka śledzi je na bieżąco, więc Twoja lista kontrolna nigdy się nie dezaktualizuje.",
      },
    ],
    officialSourcesCount: "{count} oficjalnych źródeł",
    officialSite: "Strona oficjalna",
    addToSearch: "Dodaj {country} do mojego bezpłatnego wyszukiwania",
    footnoteIntro:
      "Dane liczbowe zebrane z oficjalnych komunikatów programów i największych mediów według stanu na koniec 2026 r. —",
    footnoteOutro: "Zawsze weryfikuj na oficjalnej stronie przed działaniem.",
  },
  channels: {
    eyebrow: "Kanały",
    headingA: "Jeden silnik i każdy kanał, w którym",
    headingGold: "utykają firmowe pieniądze.",
    lead:
      "Każdy kanał osobno wygląda niepozornie — kilka procent tu, przeoczony fundusz tam. Nałóż je na te same dane zakupowe, a złożą się w powtarzalny strumień odzysków.",
    items: [
      {
        title: "Ugody z pozwów zbiorowych",
        stat: "Miliardy",
        statLabel: "leżą nieodebrane w otwartych funduszach",
        description:
          "Ugody antymonopolowe wypłacają firmom nadpłaty za wszystko — od wieprzowiny i indyka po beton i opakowania. Wskaźniki zgłoszeń są znikome — większość nabywców nigdy nie składa wniosków.",
        statusNote: "Działa już teraz — śledzimy 5+ funduszy",
      },
      {
        title: "Zwroty ceł IEEPA",
        stat: "$166B",
        statLabel: "do zwrotu dla 330 tys. importerów",
        description:
          "Sąd Najwyższy uchylił cła IEEPA stosunkiem 6–3. Każda opłata celna wniesiona na ich podstawie podlega zwrotowi wraz z odsetkami przez portal CAPE CBP — terminy sięgają 2027–2028.",
        statusNote: "Działa już teraz — kalkulator poniżej",
      },
      {
        title: "Drawback celny",
        stat: "~$15B/yr",
        statLabel: "nieodebrane, według szacunków CBP",
        description:
          "Do odzyskania jest nawet 99% ceł od towarów importowanych, które później wyeksportowano lub zniszczono. Większość małych firm nigdy nie złożyła ani jednego wniosku o drawback.",
        statusNote: "Działa już teraz — przegląd wliczony w skan",
      },
      {
        title: "Audyty frachtu i przesyłek",
        stat: "$1B+",
        statLabel: "branża odzyskująca nadpłaty za wysyłki",
        description:
          "Opóźnione dostawy, podwójne dopłaty i błędy wymiarów wyciekają 1–3% budżetu wysyłkowego. Firmy audytorskie biorą 25–50% prowizji warunkowej — my połączymy to wszystko w jednej platformie.",
        statusNote: "I kw. 2027",
      },
      {
        title: "Ulgi podatkowe B+R",
        stat: "Większość",
        statLabel: "uprawnionych MŚP nigdy nie składa wniosków",
        description:
          "Programy ulg w USA, UK i UE regularnie pomijane są przez małe firmy spełniające kryteria. Wstępnie oceniamy wydatki na prace inżynieryjne i przekazujemy pakiety licencjonowanemu specjaliście.",
        statusNote: "I kw. 2027",
      },
      {
        title: "Nieodebrane mienie (B2B)",
        stat: "$100–150B",
        statLabel: "w rękach stanów USA, łącznie ze środkami firm",
        description:
          "Zapomniane nota kredytowe od dostawców, niezrealizowane zwroty, stare depozyty — przepisy o uśpionych rachunkach co roku po cichu przejmują firmowe pieniądze. My przeczesujemy te rejestry na bieżąco.",
        statusNote: "II kw. 2027",
      },
    ],
    ticker: [
      "Sąd Najwyższy USA 6–3 — cła IEEPA niezgodne z prawem",
      "CAPE: 75 300 wniosków w pierwszych 6 dniach",
      "Odsetki narastają ≈ $650M/miesiąc na oczekujących zwrotach",
      "Drawback: do 99% ceł do odzyskania",
      "Wskaźniki zgłoszeń w pozwach zbiorowych: zwykle poniżej 10%",
      "Co dziesiąty Amerykanin figuruje na liście nieodebranych pieniędzy",
      "Fundusz wieprzowiny $117M — śledzimy termin",
      "Fundusze indycze $71.5M+ — śledzimy termin",
    ],
  },
  scanner: {
    eyebrow: "Bezpłatny skaner",
    headingA: "Skieruj nas na swoje zakupy.",
    headingGold: "My znajdziemy pieniądze.",
    lead:
      "Bez zakładania konta i bez przesyłania danych stronom trzecim — wklej eksport z QuickBooks, Stripe lub banku, a silnik dopasuje każdą pozycję do aktywnych kanałów odzysków.",
    tabs: {
      upload: "Wgraj plik CSV",
      paste: "Wklej dane",
    },
    upload: {
      chooseAriaLabel: "Wybierz plik CSV z zakupami",
      choose: "Kliknij, aby wybrać plik CSV / TSV",
      expectedColumns: "Oczekiwane kolumny: Date, Description, Amount",
    },
    paste: {
      label: "Wklej wiersze zakupów",
      placeholder:
        "Date,Description,Amount\n2025-04-18,Cło IEEPA — części z Chin,28500\n2016-09-02,Plaster boczku — Smithfield,4120.50",
      hint: "CSV lub TSV, jeden zakup na linię. Eksporty z QuickBooks, Stripe, Xero i większości banków działają bez przeróbek.",
    },
    loadSample: "Nie masz danych pod ręką? Wczytaj realistyczną próbkę",
    privacyNote: "Przechowujemy wyłącznie zagregowane statystyki skanów — nigdy Twoje wiersze.",
    preview: {
      usableRowsLabel: "wierszy gotowych do skanu",
      skipped: "{count} pominiętych",
      totalSpendLabel: "Łączne wydatki:",
      colDate: "Data",
      colDescription: "Opis",
      colAmount: "Kwota",
      moreRows: "…a skanowanie obejmie jeszcze {count} wierszy.",
    },
    actions: {
      run: "Uruchom skan",
      scanning: "Skanowanie kanałów…",
      scanningAriaLabel: "Skanowanie",
      clear: "Wyczyść",
    },
    toasts: {
      fileTooLargeTitle: "Plik jest za duży",
      fileTooLargeBody: "Trzymaj eksporty poniżej 5 MB (~100 tys. wierszy).",
      sampleLoadedTitle: "Wczytano dane przykładowe",
      sampleLoadedBody:
        "14 wierszy fikcyjnego średniej wielkości dystrybutora i importera żywności.",
    },
    errors: {
      noUsableRows:
        "Nie znaleziono wierszy gotowych do skanu. Oczekiwane kolumny to np. Date, Description, Amount (CSV lub TSV, eksport z QuickBooks, Stripe lub banku).",
    },
    results: {
      complete: "Skan zakończony — przeanalizowano {count} wierszy",
      foundLabel: "Znaleziono:",
      matchedChannelsOne: "W {count} dopasowanym kanale.",
      matchedChannelsMany: "W {count} dopasowanych kanałach.",
      conservativeNote:
        "Konserwatywne widełki — ostateczna wypłata zależy od Twoich dowodów i łącznej liczby roszczeń zgłoszonych do każdego funduszu.",
      ieepaIncluded:
        "Zawiera zwroty ceł IEEPA rzędu {low}–{high} (zwrot ceł + odsetki ustawowe, przed kosztami zgłoszenia).",
      missedClosed:
        "Przepadły Ci też {low}–{high} w roszczeniach, które już się zamknęły. Monitoring pilnuje, żeby to się nigdy więcej nie powtórzyło.",
      claimCta: "Złóż roszczenie z RecoveryOS",
      scanAnother: "Zeskanuj inny plik",
    },
    match: {
      finalDay: "Ostatni dzień",
      daysLeft: "Zostało {count} dni",
      fundBadge: "Fundusz: {size}",
      matchedPurchases: "Dopasowane zakupy ({count})",
      moreLines: "+ {count} kolejnych wierszy",
      matchedVolumeLabel: "Dopasowany wolumen:",
      estimatedRecovery: "Szacowany odzysk",
      whoCanClaimLabel: "Kto może zgłaszać: ",
      evidenceLabel: "Dowody: ",
      claimCta: "Złóż roszczenie z RecoveryOS",
      closedCta: "Zamknięte — dodaj do obserwowanych",
      officialSite: "Strona oficjalna",
    },
    disclaimer:
      "Szacunki są narzędziem pomocniczym, a nie gwarancją ani poradą prawną. Wypłaty zależą od jakości roszczenia, dowodów i łącznej liczby roszczeń otrzymanych przez każdy fundusz. Zawsze można złożyć wniosek bezpośrednio u oficjalnego administratora — linki podajemy przy każdym funduszu.",
  },
  settlements: {
    eyebrow: "Monitor roszczeń na żywo",
    heading: "Otwarte fundusze, realne terminy.",
    lead:
      "Każdy poniższy fundusz to sprawa zarejestrowana publicznie, z oficjalnym administratorem. Śledzimy je, żeby Twoja firma nigdy nie dowiedziała się o darmowych pieniądzach tydzień po upływie terminu.",
    filterAria: "Filtruj fundusze",
    filters: [
      { label: "Wszystkie fundusze" },
      { label: "Wkrótce się zamykają" },
      { label: "Otwarte" },
      { label: "Okno do weryfikacji" },
      { label: "Zamknięte (przepadły)" },
    ],
    statusOpen: "Otwarty",
    statusClosingSoon: "Zamyka się wkrótce",
    statusClosed: "Zamknięty — przepadł",
    statusVerify: "Okno do weryfikacji",
    deadlineVerify: "Okno zgłoszeń — zweryfikuj u administratora",
    daysMonitor: "obserwuj",
    daysPast: "{days} dni po terminie",
    lastDay: "ostatni dzień",
    daysLeftCount: "Zostało {days} dni",
    fundBadge: "Fundusz: {fund}",
    purchasesLabel: "Zakupy:",
    deadlineTerm: "Termin:",
    eligibleLabel: "Kto może zgłaszać:",
    testInScanner: "Przetestuj w skanerze",
    officialSite: "Strona oficjalna",
    disclaimer:
      "Dane funduszy, okresy zgłoszeń w pozwach zbiorowych i terminy pochodzą z publicznych akt spraw oraz komunikatów administratorów według stanu na koniec października 2026 r. Terminy się zmieniają — zawsze potwierdzaj je na oficjalnej stronie ugody, zanim oprzesz się na jakiejkolwiek dacie — albo zostaw to naszej liście obserwowanych, która robi to w sposób ciągły.",
  },
  ieepa: {
    eyebrow: "Kanał w centrum uwagi — IEEPA",
    heading: "Sąd Najwyższy uchylił cła. Teraz pieniądze muszą wrócić.",
    lead:
      "20 lutego 2026 r. Sąd orzekł 6–3, że cła IEEPA były niezgodne z prawem ({case}). Około {totalRefunds} zapłaconych przez {importers} importerów w {entries} zgłoszeniach celnych musi zostać zwróconych wraz z odsetkami przez portal CAPE CBP — terminy sięgają {deadlines}.",
    capeLivePre: "Portal CAPE wystartował {date}. W pierwszych sześciu dniach otrzymał",
    capeLivePost:
      "wniosków obejmujących 11,2 mln zgłoszeń celnych — MŚP, które ruszają szybko, dostają pieniądze jako pierwsze.",
    interestPre: "Odsetki narastają kapitałowo w tempie około {rate}%/rok — około",
    interestPost:
      "miesięcznie przyrasta na wszystkich oczekujących zwrotach, podczas gdy wnioski czekają w kolejkach.",
    failedValidationPre: "Około",
    failedValidationPost:
      "zgłoszeń celnych nie przeszło już walidacji CAPE przy pierwszym wniosku — właściwe przygotowanie danych decyduje o wszystkim.",
    servicesText:
      "Przygotowujemy zgłoszenia celne, poprawiamy błędy walidacji, generujemy pliki gotowe dla CAPE i śledzimy każdy termin. Samo złożenie dokumentów zostaje po Twojej stronie lub po stronie Twojego licencjonowanego agenta celnego — bez gier licencyjnych.",
    estimatorTitle: "Kalkulator zwrotu i odsetek",
    estimatorNote: "Wyłącznie reguła kciuka — dokładną kwotę wyznaczają Twoje zgłoszenia celne.",
    principalLabel: "Łącznie zapłacone cła IEEPA (USD)",
    dateLabel: "Ostatnia płatność cła",
    rateLabel: "Stopa procentowa (%/rok)",
    includeInterestLabel: "Uwzględnij odsetki narosłe do dziś (domyślnie ≈{rate}%/rok)",
    dutiesBackLabel: "Zwrot ceł",
    interestLabel: "Odsetki",
    totalLabel: "Razem",
    dripLine:
      "Odsetki narastające na oczekujących amerykańskich zwrotach IEEPA od momentu otwarcia tej strony:",
    ctaButton: "Przygotuj moje zgłoszenie CAPE",
    disclaimer:
      "Dotyczy wyłącznie ceł nałożonych na podstawie IEEPA (kierunki Chiny / Kanada / Meksyk). Cła z sekcji 232/301 nie są objęte wyrokiem.",
  },
  pricing: {
    eyebrow: "Cennik",
    headingA: "Ludzie nie płacą nic. Prowizja tylko, gdy",
    headingGold: "ruszają się pieniądze.",
    lead:
      "Światowa Biblioteka nigdy nie będzie nic kosztować — każde wyszukiwanie czyni mapę zagubionych pieniądzy dokładniejszą, a ta mapa jest tym, na czym zarabiamy. Firmy płacą prowizję od sukcesu i to tylko od pieniędzy, które faktycznie wrócą.",
    alwaysFreeBadge: "Zawsze bezpłatnie",
    plans: [
      {
        name: "Osoby prywatne — Światowa Biblioteka",
        price: "$0",
        cadence: "na zawsze bezpłatnie · bez planów, bez karty, bez haczyków",
        cta: "Przeszukaj 20 krajów",
        features: [
          "Każda indeksowana przez nas oficjalna baza nieodebranych pieniędzy — na całym świecie",
          "Kreator osobistej listy kontrolnej — wpisujesz nazwisko, dostajesz źródła",
          "Alerty o nowych rejestrach dla Twoich krajów",
          "Bezpośrednie linki do oficjalnej wyszukiwarki — nigdy nie stajemy na drodze",
          "Szukaj dla siebie, dla rodziców, dla dziadków",
        ],
      },
      {
        name: "Odzyskiwanie dla firm",
        price: "$0 z góry",
        cadence: "potem 8–15% odzyskanych środków",
        cta: "Uruchom bezpłatny skan",
        features: [
          "Przygotowanie roszczeń i kompletowanie dowodów",
          "Pliki gotowe dla CAPE + poprawki błędów walidacji",
          "Zgłaszanie przez oficjalnych administratorów lub licencjonowanych partnerów",
          "Śledzenie terminów aż do wpływu środków",
          "Wycena na piśmie przed podjęciem zobowiązania — bez odzysku nie ma opłaty",
        ],
      },
      {
        name: "Partnerzy i dane",
        price: "Indywidualnie",
        cadence: "dzielenie przychodów · API · analizy",
        cta: "Porozmawiaj z nami",
        features: [
          "Dla agentów celnych, agencji i stowarzyszeń",
          "Masowe przygotowanie roszczeń dla portfeli klientów",
          "Dostęp przez API do silnika dopasowującego",
          "Zagregowane pokrycie rejestrów w miarę rozszerzania rynków",
          "Relacje z klientem zostają po Twojej stronie — my obsługujemy maszynę",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Uczciwe pytania, konkretne odpowiedzi.",
    items: [
      {
        question: "Jestem osobą prywatną, nie firmą — czy to dla mnie?",
        answer:
          "Tak — przez Żywą Bibliotekę, na zawsze bezpłatnie. Osoby prywatne mogą w kilka minut samodzielnie wydobyć nieodebrane mienie, wymagalne obligacje oszczędnościowe, nieodebrane emerytury, zwroty podatkowe i fundusze z konsumenckich pozwów zbiorowych: każdy wpis pokazuje, kto kwalifikuje się do roszczenia, jakie dowody są potrzebne, i prowadzi do oficjalnego, bezpłatnego narzędzia. Płatny silnik (skanowanie, przygotowanie roszczeń, zgłaszanie) istnieje dla firm, gdzie wysokość roszczeń uzasadnia nakład pracy — przy roszczeniach osobistych samodzielne działanie przez bibliotekę to niemal zawsze najszybsza droga.",
      },
      {
        question: "Czy to porada prawna? Czy jesteście kancelarią prawną?",
        answer:
          "Nie. RecoveryOS nie jest kancelarią prawną i nie świadczy porad prawnych. Zajmujemy się pracą na danych: parsowaniem, dopasowywaniem, kompletowaniem dowodów, walidacją i śledzeniem. Roszczenia składane są u oficjalnych administratorów wyznaczonych przez sądy, a tam, gdzie jurysdykcja wymaga licencjonowanego pełnomocnika, współpracujemy z nim. Każde roszczenie zawsze można złożyć samodzielnie i bezpłatnie — linkujemy każdą stronę administratora, żeby to umożliwić.",
      },
      {
        question: "Jak dokładne są te szacunki?",
        answer:
          "To celowo konserwatywne widełki, oparte na opublikowanych wielkościach funduszy i typowych wskaźnikach wypłat dla porównywalnych odzysków antymonopolowych i celnych. Ostateczna wypłata zależy od udokumentowanego wolumenu zakupów, jakości roszczenia i liczby roszczeń, jakie otrzyma fundusz. Prowizję od sukcesu podajemy na piśmie przed podjęciem jakiegokolwiek zobowiązania.",
      },
      {
        question: "Jakich danych potrzebujecie i co się z nimi dzieje?",
        answer:
          "Eksportu zakupów — Date, Description, Amount — z QuickBooks, Stripe, Xero lub banku. Bezpłatny skan zapisuje wyłącznie statystyki zagregowane (liczba przeskanowanych wierszy, liczba trafień). Dane na poziomie wierszy nigdy nie są sprzedawane ani udostępniane, a na życzenie są usuwane. Przy zgłaszaniu dowody dzielisz się tylko z oficjalnym administratorem.",
      },
      {
        question: "Kiedy i jak płacę?",
        answer:
          "Nic z góry. Gdy odzysk wpłynie na Twoje konto, wystawiamy fakturę za prowizję od sukcesu (8–15%, zwykle 12%). Monitoring to stała subskrypcja $99/mo, którą możesz anulować w każdej chwili — partnerzy startowi dostają 12 miesięcy gratis. Środki z ugód i z CBP zawsze wpływają bezpośrednio na firmowe konto, nigdy przez nas.",
      },
      {
        question: "Dlaczego po prostu nie wynająć kancelarii?",
        answer:
          "Świetne pytanie — czasem właśnie tak trzeba. Prawnik od prawa celnego kosztuje $300–800/godz. i tak potrzebuje uporządkowanych danych. My wykonujemy warstwę danych bez ryzyka finansowego, a nasze pakiety roszczeń obniżają koszt pracy każdego prawnika. Przy prostych roszczeniach z funduszy droga przez administratora z przygotowanym pakietem zwykle w ogóle nie wymaga prawnika.",
      },
      {
        question: "Które kanały działają dziś i co będzie dalej?",
        answer:
          "Działają już: roszczenia z ugód pozwów zbiorowych, przygotowanie zwrotów ceł IEEPA i przesiewanie w zakresie drawbacku. I kw. 2027 dodaje odzyskiwanie z audytów frachtu i przesyłek oraz wstępną ocenę ulg B+R. II kw. 2027 dodaje wymiatanie nieodebranego mienia B2B. Każdy kanał działa na tych samych podłączonych danych zakupowych — bez dodatkowej pracy z Twojej strony.",
      },
      {
        question: "Mamy siedzibę poza USA. Czy to nas dotyczy?",
        answer:
          "W przypadku eksportu do USA lub importu z USA może Was to dotyczyć: zwroty IEEPA obejmują każdego rejestrowego importera, a fundusze antymonopolowe zakupy dokonane w amerykańskim handlu. Jako następne budujemy kanały zwrotów dla UE i UK. Dajcie znać, gdzie działacie, a wskażemy, co Was dotyczy.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Lista startowa",
    headingA: "Znalezione pieniądze powinny trafiać",
    headingGold: "najpierw do Ciebie.",
    lead:
      "Pakiety startowe obejmują 12 miesięcy monitoringu bezpłatnie, prowizję od sukcesu w cenie dla członków założycieli (8%) oraz pierwsze skanowanie zakupów z lat 2024–2026 względem każdego otwartego funduszu.",
    perks: ["Bez karty, bez zobowiązań", "Po starcie anulujesz w każdej chwili"],
    spotsClaimed: "Zajęte miejsca startowe",
    spotsNote: "Miejsca przydzielamy według kolejności zapisów — pasek porusza się tylko w jedną stronę.",
    successTitle: "Jesteś w grze. Witaj na pokładzie.",
    successText:
      "Wyślemy Ci materiały startowe i listę dokumentów dla funduszy najbliżej zamknięcia. Jeśli cokolwiek importowano pod rządami ceł z 2025 r., odpowiedz przybliżoną kwotą ceł, a ruszymy z szacunkiem IEEPA.",
    emailLabel: "E-mail służbowy *",
    emailPlaceholder: "cfo@firma.com",
    companyLabel: "Firma",
    companyPlaceholder: "Nazwa firmy",
    volumeLabel: "Miesięczny wolumen zakupów",
    volumePlaceholder: "Wybierz przedział",
    volumeOptions: [
      "Poniżej $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Ponad $1M",
    ],
    channelsLabel: "Które odzyski Cię interesują?",
    channelOptions: [
      "Ugody z pozwów zbiorowych",
      "Zwroty ceł IEEPA",
      "Drawback celny",
      "Audyty frachtu i przesyłek",
    ],
    submitLabel: "Zarezerwuj moje miejsce startowe",
    savingLabel: "Zapisywanie…",
    privacyNote: "Piszemy do Ciebie wyłącznie o Twoich pieniądzach. Jedno kliknięcie, żeby wyjść.",
    invalidEmailTitle: "Podaj prawidłowy adres e-mail",
    invalidEmailDescription: "Wystarczy jeden adres.",
    joinedToastTitle: "Jesteś na liście",
    joinedToastDescription: "Miejsca startowe przydzielamy według kolejności zapisów. Pilnuj skrzynki.",
    errorToastTitle: "Coś poszło nie tak",
    errorToastDescription: "Spróbuj ponownie za chwilę.",
  },
  footer: {
    about:
      "Dział odzysków dla małych firm — oraz bezpłatna Żywa Biblioteka zapomnianych pieniędzy dla wszystkich pozostałych. Mapujemy każdy kanał, w którym utykają pieniądze: pozwy zbiorowe, zwroty ceł, drawback, nieodebrane mienie. Płacisz tylko wtedy, gdy przychodzą czeki.",
    productTitle: "Produkt",
    channelsTitle: "Kanały",
    product: [
      "Jak to działa",
      "Światowa Biblioteka",
      "Bezpłatny skaner",
      "Otwarte roszczenia",
      "Kalkulator IEEPA",
      "Cennik",
    ],
    channelsNav: [
      "Wszystkie kanały",
      "Pozwy zbiorowe",
      "Zwroty ceł",
      "Drawback celny",
      "Lista startowa",
    ],
    legal1:
      "RecoveryOS nie jest kancelarią prawną, biurem rachunkowym ani licencjonowanym agentem celnym, a nic na tej stronie nie stanowi porady prawnej, podatkowej ani finansowej. Żywa Biblioteka linkuje do oficjalnych baz rządowych i administratorów wyznaczonych przez sądy — osoby prywatne zawsze mogą zgłaszać się bezpośrednio i bezpłatnie. Szacunki odzysków to narzędzia modelowe oparte na publicznych aktach i historycznych wskaźnikach wypłat; rzeczywiste odzyski zależą od Twoich dowodów, uprawnień i łącznej liczby roszczeń, które otrzyma każdy fundusz.",
    legal2:
      "Dane funduszy ugód, okresy pozwów zbiorowych i terminy pochodzą z publicznych akt sądowych oraz oficjalnych komunikatów administratorów według stanu na koniec października 2026 r. i mogą się zmieniać bez ostrzeżenia. Zawsze weryfikuj terminy u oficjalnego administratora ugody, zanim na nich polegasz. Roszczenia zawsze składasz Ty albo licencjonowani partnerzy, a środki wpływają bezpośrednio na Twoje konto.",
    copyright: "© 2026 RecoveryOS. Wszelkie prawa zastrzeżone.",
    ariaProduct: "Produkt",
    ariaChannels: "Kanały",
  },
  claim: {
    title: "Złóż roszczenie z RecoveryOS",
    titleDone: "Pakiet roszczeń w drodze",
    descriptionDone:
      "Sprawdź skrzynkę — prosimy wyłącznie o dokumenty, których administrator faktycznie wymaga.",
    descriptionContext:
      "Przygotujemy dokumentację dla {context} i potwierdzimy każdy termin z oficjalnym administratorem. Płacisz dopiero po wpływie środków.",
    descriptionDefault:
      "Przygotujemy dokumentację, potwierdzimy terminy z oficjalnym administratorem i będziemy zgłaszać, aż środki wpłyną. Płacisz tylko wtedy, gdy pieniądze trafią na Twoje konto.",
    nextStepsTitle: "Następne kroki",
    nextSteps: [
      "Prześlij nam dowody zakupowe (faktury / eksporty).",
      "Weryfikujemy roszczenie i podajemy prowizję od sukcesu na piśmie.",
      "Środki zawsze wpływają bezpośrednio na firmowe konto.",
    ],
    emailLabel: "E-mail służbowy",
    emailPlaceholder: "cfo@firma.com",
    companyLabel: "Firma",
    companyPlaceholder: "Nazwa firmy",
    submit: "Odbierz swój pakiet roszczeń",
    submitting: "Zapisywanie…",
    footerNote:
      "Bez odzysku nie ma opłaty. Zawsze możesz złożyć wniosek samodzielnie przez oficjalnego administratora — linkujemy każdy fundusz.",
    invalidEmailTitle: "Podaj prawidłowy adres e-mail",
    invalidEmailBody: "Potrzebujemy jednego adresu, aby wysłać Ci pakiet roszczeń.",
    queuedTitle: "Jesteś w kolejce",
    queuedBody: "Odezwiemy się z pakietem roszczeń i dokładną listą potrzebnych dokumentów.",
    errorTitle: "Coś poszło nie tak",
    errorBody: "Spróbuj ponownie za chwilę.",
  },
  assistant: {
    openChat: "Otwórz czat z Goldie AI",
    closeChat: "Zamknij czat z Goldie",
    chatDialog: "Czat z asystentką AI Goldie",
    askGoldie: "Zapytaj Goldie o wszystko",
    online: "Online · odpowiada w dowolnym języku",
    aiScout: "Zwiadowczyni AI",
    reset: "Zresetuj rozmowę",
    send: "Wyślij wiadomość",
    placeholder: "Zapytaj Goldie o wszystko…",
    disclaimer:
      "Odpowiedzi AI bywają niedoskonałe — szczegóły funduszy weryfikuj u oficjalnych administratorów podlinkowanych na tej stronie.",
    greeting:
      "Cześć! Jestem **Goldie**, Twoja zwiadowczyni od RecoveryOS. Pytaj o wszystko w sprawie nieodebranych pieniędzy — o Światową Bibliotekę, terminy ugód, zwroty ceł albo o to, jak działa skaner. Odpowiadam w dowolnym języku, w jakim zechcesz.",
    suggestions: [
      "Jak znaleźć nieodebrane pieniądze za darmo?",
      "Czym jest zwrot $166B z tytułu IEEPA?",
      "Czy skaner jest naprawdę prywatny?",
      "Czym są nieodebrane pieniądze?",
    ],
  },
  guide: {
    welcome:
      "Witaj! Jestem Scout — krążę po tej stronie i zostawiam wskazówki w miarę przewijania. Kliknij mnie w dowolnej chwili, żeby porozmawiać z Goldie, naszą asystentką AI.",
    dismiss: "Ukryj wskazówkę",
    mute: "Wyłącz wskazówki na czas tej wizyty",
    unmute: "Wskazówki wyłączone — włącz",
    avatarLabel: "Scout, przewodniczka po stronie — kliknij, aby porozmawiać z Goldie",
    askGoldie: "Zapytaj Goldie o tę sekcję",
    tips: {
      how: [
        "Pierwszy raz? Ten pasek pokazuje cały przepływ — skan, weryfikacja, roszczenie. Do wypróbowania któregokolwiek etapu nie trzeba się rejestrować.",
        "Trzy kroki, koszt zwiedzania zerowy. Skaner ma nawet realistyczną próbkę, którą uruchomisz jednym kliknięciem.",
      ],
      library: [
        "Psst — nazwisko wpisane tutaj nigdy nie opuszcza Twojej przeglądarki. Wybierz kraje i odbierz bezpłatną listę oficjalnych rejestrów.",
        "50 rynków, 66+ oficjalnych źródeł. Spróbuj wybrać Turcję albo ZEA — pokrycie sięga daleko poza Amerykę.",
      ],
      channels: [
        "Sześć kanałów odzysków ma tu swoje miejsce. Sama świecąca karta IEEPA to $166B ceł podlegających zwrotowi.",
        "Sam drawback to ~$15B rocznie zostawianych na stole. Audyty frachtu, ulgi B+R — większość firm nigdy tego nie sprawdza.",
      ],
      scanner: [
        "Spróbuj „Wczytaj realistyczną próbkę” — 14 wierszy zakupów demonstracyjnych znajduje około $47K. Twój plik nigdy nie opuszcza tej przeglądarki.",
        "Skaner parsuje Twój CSV tutaj, w przeglądarce — bez wysyłania plików, bez konta, niczego nie zapisuje.",
      ],
      settlements: [
        "Terminy to cała gra. Posortuj według pozostałych dni — fundusz Ready-Mix z Iowa zamyka się 16 listopada.",
        "Każda karta linkuje wprost do administratora wyznaczonego przez sąd. Bez pośredników, bez prowizji za odnalezienie.",
      ],
      ieepa: [
        "Cła opłacone w 2025 r. lub później? Sąd Najwyższy uchylił cła IEEPA — każdy dolar podlega zwrotowi wraz z odsetkami. Wpisz w kalkulatorze $120,000.",
        "Odsetki od oczekujących zwrotów IEEPA narastają w tempie około $650M miesięcznie. Czekanie kosztuje.",
      ],
      pricing: [
        "Biblioteka jest bezpłatna na zawsze — osoby prywatne nigdy nie płacą. Firmy płacą tylko 8–15%, gdy pieniądze faktycznie wpływają.",
        "Bez odzysku — bez opłaty; tak stanowi nasz model. Wycena na piśmie przed podjęciem decyzji.",
      ],
      faq: [
        "Mieszkają tu dobre pytania — w tym „czy to porada prawna?” (spoiler: nie, nie jesteśmy kancelarią prawną).",
        "FAQ obejmuje prywatność, uprawnienia i to, co dzieje się po zgłoszeniu. Dwie dobrze spędzone minuty.",
      ],
      waitlist: [
        "Ostatni przystanek! Dołącz do listy startowej — albo po prostu zapytaj o cokolwiek moją koleżankę Goldie. Ona jest tą monetą w rogu.",
        "Wychodzisz? Zabierz listę kontrolną ze sobą — lista startowa dostaje alerty o nowych rejestrach dla Twoich krajów.",
      ],
    },
    ask: {
      how: "Wyjaśnij prosto, jak działa RecoveryOS.",
      library: "Jak działa wyszukiwanie w Światowej Bibliotece i czy jest naprawdę bezpłatne?",
      channels: "Który kanał odzysków najlepiej pasuje do mojej firmy?",
      scanner: "Jak skaner dopasowuje moje zakupy do funduszy ugód?",
      settlements: "Które fundusze ugód są wciąż otwarte i wkrótce się zamykają?",
      ieepa: "Jak zgłosić zwroty ceł IEEPA przez portal CAPE CBP?",
      pricing: "Ile kosztuje RecoveryOS i kiedy płacę?",
      faq: "Czy RecoveryOS jest wiarygodne i czy to porada prawna?",
      waitlist: "Co daje dołączenie do listy oczekujących?",
    },
  },
};

export default pl;
