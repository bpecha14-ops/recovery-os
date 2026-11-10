import type { Dictionary } from "./en";

const es: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Ejecutar un escaneo gratuito",
    openMenu: "Abrir menú",
    language: "Idioma",
    closeMenu: "Cerrar menú",
  },
  header: {
    nav: [
      "Cómo funciona",
      "Biblioteca mundial",
      "Canales",
      "Escáner gratuito",
      "Reclamos abiertos",
      "Reembolso de aranceles",
      "Precios",
      "FAQ",
    ],
    ariaMainNav: "Navegación principal",
    ariaMobileNav: "Navegación móvil",
    ariaHome: "Inicio de RecoveryOS",
  },
  hero: {
    pill: "La Corte Suprema anuló los aranceles IEEPA por 6–3",
    titleA: "Al mundo le deben ",
    titleGold: "dinero",
    titleB: " que olvidó.",
    subtitle:
      "RecoveryOS mapea todas las bases de datos oficiales de dinero no reclamado del planeta — para su empresa y para su propio nombre — y luego presenta y da seguimiento a los reclamos hasta que los cheques lleguen a su cuenta.",
    ctaScan: "Ejecutar un escaneo gratuito",
    ctaLibrary: "Explore la biblioteca mundial — gratis",
    trustNoFee: "Sin recuperación, sin comisión",
    trustOfficial: "Todos los administradores oficiales enlazados",
    trustDelete: "Datos de compras eliminados a solicitud",
    deadlineLead: "Cierra esta semana:",
    deadlineBody:
      "Fondo de carne de cerdo ($117M) — 29 oct. · Fondos de pavo ($71.5M+) — 30 oct. Los intereses sobre los reembolsos IEEPA pendientes se acumulan a unos {interest}/mes — las fechas límite son la razón por la que las empresas pierden dinero recuperable cada año.",
    stat1: "en reembolsos IEEPA pendientes tras la sentencia de la Corte Suprema",
    stat2:
      "de dinero no reclamado verificado en los {markets} mercados mundiales que indexamos",
    stat3: "en drawback sin reclamar, según estimaciones de CBP",
    stat4:
      "presentaciones de reembolso ante CAPE en los primeros 6 días — la fiebre del oro es real",
    ticker: [
      "Reembolsos de aranceles IEEPA — $166B",
      "Pensiones perdidas del Reino Unido — £31.1B",
      "Francia Ciclade — €7.87B",
      "India UDGAM — ₹67,000 crore",
      "Corea: fondos inactivos — ₩14T",
      "Brasil SVR — R$5.65B",
      "Sudáfrica — R88.5B",
      "Fondo antimonopolio del cerdo — $117M",
      "Drawback — $15B/yr",
      "Antimonopolio de Turquía — $71.5M+",
      "Australia: dinero perdido — A$3B",
      "Canadá: fondos inactivos — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Cómo funciona",
    headingA: "Toda empresa tiene un equipo de cuentas por pagar.",
    headingGold: "Ninguna tiene un equipo de recuperaciones.",
    lead:
      "Cuentas por pagar vigila lo que sale. Nadie vigila lo que regresa — reembolsos, acuerdos, drawback, correcciones de cargos. RecoveryOS es ese departamento faltante, con un precio tal que solo existe cuando se rentabiliza.",
    steps: [
      {
        title: "Conecte sus datos",
        text: "Suelte una exportación de compras — CSV de QuickBooks, estado de cuenta de Stripe o del banco, o cuarenta filas que pegue usted. Toma unos cuatro minutos. Nada sale de su navegador hasta que ejecuta el escaneo.",
      },
      {
        title: "Cotejamos cada línea",
        text: "El motor compara cada compra contra las ventanas de demandas colectivas abiertas, las partidas arancelarias y las reglas de drawback — y le muestra qué coincidió, por qué y una estimación conservadora antes de que se comprometa a nada.",
      },
      {
        title: "Llegan los cheques — y entonces cobramos",
        text: "Los reclamos se tramitan ante administradores oficiales o socios autorizados. Los fondos fluyen directamente a su cuenta. Nuestra comisión de éxito se cotiza por escrito y se cobra únicamente cuando el dinero aterriza.",
      },
    ],
  },
  library: {
    eyebrow: "La Biblioteca Mundial",
    heading: "Todas las bases de datos oficiales de dinero no reclamado del planeta.",
    headingGold: "Gratis para siempre.",
    leadBefore:
      "No solo Estados Unidos, y no solo empresas. El dinero yace olvidado bajo la burocracia en cada gran economía —",
    leadAfter:
      ". La Biblioteca Mundial indexa la puerta oficial de cada una, para cualquier persona, por $0.",
    moneyWords: [
      "cuentas dormidas",
      "pensiones perdidas",
      "dividendos no reclamados",
      "herencias sin dueño",
      "depósitos olvidados",
      "cheques no cobrados",
    ],
    stats: [
      { label: "mercados indexados" },
      { label: "registros activos hoy" },
      { label: "fuentes oficiales verificadas" },
      { label: "verificado a la espera de ser reclamado" },
    ],
    tickerLive: " — activo",
    tickerInLab: " — en el laboratorio",
    searchTitle: "Encuentre el dinero que la burocracia olvidó —",
    searchTitleGold: "bajo su propio nombre.",
    searchLead:
      "Un nombre, sus países. Crearemos su lista de verificación personal de bases de datos oficiales para buscar — cada entrada gratis, cada enlace oficial.",
    nameLabel: "Nombre a buscar — permanece en su navegador, nunca se envía a ningún lado",
    namePlaceholder: "p. ej. María González",
    countriesLabel: "Países donde ha vivido, trabajado o tenido cuentas bancarias",
    selectedCount: "{count}/8 seleccionados",
    pickerPlaceholder: "Busque entre {count} mercados — EE. UU., Reino Unido, Kenia, Malasia…",
    pickerNoMatch:
      "Ningún mercado coincide con «{query}» — pruebe con el nombre completo, p. ej. «Japón».",
    buildChecklist: "Crear mi lista de verificación gratuita",
    searchPrivacy:
      "Gratis para siempre, sin niveles. Guardamos su búsqueda para alertarle cuando nuevos registros entren en línea para sus países — ese es todo el modelo. Elimínela cuando quiera.",
    errorNameRequired: "Díganos el nombre a buscar.",
    errorNoCountries:
      "Elija al menos un país donde haya vivido, trabajado o tenido cuentas bancarias.",
    errorSearchFailed: "La búsqueda falló. Intente de nuevo.",
    errorNetwork: "Error de red — intente de nuevo.",
    closeResults: "Cerrar resultados",
    checklistReadyOne: "Lista de verificación generada para {count} país",
    checklistReadyMany: "Lista de verificación generada para {count} países",
    officialDatabases: "bases de datos oficiales",
    toSearch: "para buscar",
    resultPrivacy:
      "No se guardó nada — solo usted puede ver esta lista de verificación. Avance por ella — la mayoría de las entradas toma menos de 10 minutos.",
    databasesCount: "{count} bases de datos",
    openOfficialSearch: "Abrir búsqueda oficial",
    openTracker: "Abrir rastreador",
    regionsAriaLabel: "Regiones del mundo",
    sourceCountOne: "{count} fuente oficial",
    sourceCountMany: "{count} fuentes oficiales",
    inTheLab: "En el laboratorio",
    badgeLive: "Activo",
    badgeResearching: "Investigando",
    viewSources: "Ver las fuentes",
    launchesHere: "Se lanza aquí a medida que verificamos las rutas de reclamo.",
    referralEyebrow: "¿Encontró $40 a su nombre?",
    referralTitle: "A su empresa le deben",
    referralTitleGold: "100× más.",
    referralText:
      "La misma burocracia, a escala de empresa: reembolsos de aranceles en cada importación, demandas colectivas en cada orden de compra, drawback en cada reexportación. Apunte el escáner a los libros de su empresa y vea la cifra real.",
    runBusinessScan: "Ejecutar el escaneo empresarial",
    principles: [
      {
        title: "Gratis para siempre — primero hágalo usted",
        text: "Le explicamos exactamente cómo presentar el reclamo usted mismo, en minutos. Nunca necesita un intermediario. Sin niveles de pago para personas, punto.",
      },
      {
        title: "Solo enlaces oficiales",
        text: "Cada entrada apunta a la base de datos gubernamental, al banco central o al administrador designado por el tribunal. Sin imitaciones.",
      },
      {
        title: "Datos vivos",
        text: "Nuevos registros entran en línea cada trimestre. La biblioteca los sigue de forma continua para que su lista de verificación nunca quede obsoleta.",
      },
    ],
    officialSourcesCount: "{count} fuentes oficiales",
    officialSite: "Sitio oficial",
    addToSearch: "Añadir {country} a mi búsqueda gratuita",
    footnoteIntro:
      "Cifras recopiladas de divulgaciones oficiales de programas y de la prensa relevante a fines de 2026 —",
    footnoteOutro: "Verifique siempre en el sitio oficial antes de actuar.",
  },
  channels: {
    eyebrow: "Canales",
    headingA: "Un solo motor, todos los canales donde",
    headingGold: "se atasca el dinero de las empresas.",
    lead:
      "Cada canal por sí solo es aburrido — unos puntos porcentuales aquí, un fondo perdido allá. Apílelos sobre los mismos datos de compras y se combinan en un flujo de recuperación recurrente.",
    items: [
      {
        title: "Acuerdos de demandas colectivas",
        stat: "Miles de millones",
        statLabel: "esperando sin reclamar en fondos abiertos",
        description:
          "Los acuerdos antimonopolio pagan a las empresas por sobrecargos en todo, desde carne de cerdo y pavo hasta concreto y empaques. Las tasas de reclamo son mínimas — la mayoría de los compradores nunca presenta.",
        statusNote: "Activo ahora — 5+ fondos rastreados",
      },
      {
        title: "Reembolsos de aranceles IEEPA",
        stat: "$166B",
        statLabel: "ordenado devolver a 330 mil importadores",
        description:
          "La Corte Suprema anuló los aranceles IEEPA 6–3. Cada arancel pagado bajo ellos es reembolsable con intereses vía el portal CAPE de CBP — las fechas límite se extienden hasta 2027–2028.",
        statusNote: "Activo ahora — calculadora abajo",
      },
      {
        title: "Drawback aduanero",
        stat: "~$15B/yr",
        statLabel: "sin reclamar, según estimaciones de CBP",
        description:
          "Hasta el 99% de los aranceles sobre bienes importados que luego se exportaron o destruyeron puede reclamarse. La mayoría de las pymes nunca ha presentado una sola solicitud de drawback.",
        statusNote: "Activo ahora — revisión incluida en el escaneo",
      },
      {
        title: "Auditorías de flete y paquetería",
        stat: "$1B+",
        statLabel: "industria que recupera sobrecargos de envío",
        description:
          "Entregas tardías, recargos duplicados y errores de dimensiones filtran del 1 al 3% del gasto de envío. Las firmas auditoras cobran 25–50% de contingencia — nosotros lo integraremos en una sola plataforma.",
        statusNote: "T1 2027",
      },
      {
        title: "Créditos fiscales por I+D",
        stat: "La mayoría",
        statLabel: "de las pymes elegibles nunca presenta",
        description:
          "Los programas de crédito de EE. UU., Reino Unido y la UE suelen quedar sin reclamar por pequeñas empresas que califican. Preseleccionamos su gasto de ingeniería y entregamos los expedientes a un preparador autorizado.",
        statusNote: "T1 2027",
      },
      {
        title: "Propiedad no reclamada (B2B)",
        stat: "$100–150B",
        statLabel: "en manos de los estados de EE. UU., empresas incluidas",
        description:
          "Créditos de proveedores olvidados, reembolsos no cobrados, depósitos antiguos — la reversión de saldos inactivos absorbe silenciosamente el dinero empresarial cada año. Nosotros lo rastreamos de forma continua.",
        statusNote: "T2 2027",
      },
    ],
    ticker: [
      "Corte Suprema 6–3 — aranceles IEEPA ilegales",
      "CAPE: 75.300 presentaciones en los primeros 6 días",
      "Los intereses generan ≈ $650M/mes sobre reembolsos pendientes",
      "Drawback: hasta el 99% de los aranceles es reclamable",
      "Tasas de reclamo en demandas colectivas: usualmente menos del 10%",
      "1 de cada 10 estadounidenses está en una lista de dinero no reclamado",
      "Fondo del cerdo $117M — fecha límite rastreada",
      "Fondos de pavo $71.5M+ — fecha límite rastreada",
    ],
  },
  scanner: {
    eyebrow: "Escáner gratuito",
    headingA: "Apúntenos a sus compras.",
    headingGold: "Nosotros encontramos el dinero.",
    lead:
      "Sin cuenta, sin subidas a terceros — pegue una exportación de QuickBooks, Stripe o su banco y el motor coteja cada línea contra los canales de recuperación activos.",
    tabs: {
      upload: "Cargar CSV",
      paste: "Pegar datos",
    },
    upload: {
      chooseAriaLabel: "Elegir un archivo CSV de compras",
      choose: "Haga clic para elegir un archivo CSV / TSV",
      expectedColumns: "Columnas esperadas: Date, Description, Amount",
    },
    paste: {
      label: "Pegue filas de compras",
      placeholder:
        "Date,Description,Amount\n2025-04-18,Arancel IEEPA — piezas de China,28500\n2016-09-02,Pieza de tocino — Smithfield,4120.50",
      hint: "CSV o TSV, una compra por línea. Las exportaciones de QuickBooks, Stripe, Xero y de la mayoría de los bancos funcionan tal cual.",
    },
    loadSample: "¿Sin datos a mano? Cargue un ejemplo realista",
    privacyNote: "Solo almacenamos estadísticas agregadas de escaneos — nunca sus filas.",
    preview: {
      usableRowsLabel: "filas utilizables",
      skipped: "{count} omitidas",
      totalSpendLabel: "Gasto total:",
      colDate: "Fecha",
      colDescription: "Descripción",
      colAmount: "Importe",
      moreRows: "…y se escanearán {count} filas más.",
    },
    actions: {
      run: "Ejecutar el escaneo",
      scanning: "Escaneando canales…",
      scanningAriaLabel: "Escaneando",
      clear: "Limpiar",
    },
    toasts: {
      fileTooLargeTitle: "Archivo demasiado grande",
      fileTooLargeBody: "Mantenga las exportaciones por debajo de 5 MB (~100 mil filas).",
      sampleLoadedTitle: "Datos de ejemplo cargados",
      sampleLoadedBody: "14 filas de un distribuidor e importador de alimentos mediano ficticio.",
    },
    errors: {
      noUsableRows:
        "No se encontraron filas utilizables. Se esperan columnas como Date, Description, Amount (CSV o TSV, exportado de QuickBooks, Stripe o su banco).",
    },
    results: {
      complete: "Escaneo completo — {count} filas analizadas",
      foundLabel: "Encontrado:",
      matchedChannelsOne: "En {count} canal coincidente.",
      matchedChannelsMany: "En {count} canales coincidentes.",
      conservativeNote:
        "Rangos conservadores — el pago final depende de su evidencia y del total de reclamos presentados ante cada fondo.",
      ieepaIncluded:
        "Incluye reembolsos de aranceles IEEPA de {low}–{high} (aranceles devueltos + interés legal, antes de costos de presentación).",
      missedClosed:
        "También se le escaparon {low}–{high} en reclamos que ya cerraron. El monitoreo se asegura de que eso nunca vuelva a pasar.",
      claimCta: "Reclame con RecoveryOS",
      scanAnother: "Escanear otro archivo",
    },
    match: {
      finalDay: "Último día",
      daysLeft: "{count} días restantes",
      fundBadge: "Fondo: {size}",
      matchedPurchases: "Compras coincidentes ({count})",
      moreLines: "+ {count} filas más",
      matchedVolumeLabel: "Volumen coincidente:",
      estimatedRecovery: "Recuperación estimada",
      whoCanClaimLabel: "Quién puede reclamar: ",
      evidenceLabel: "Evidencia: ",
      claimCta: "Reclame con RecoveryOS",
      closedCta: "Cerrado — unirse a la lista de vigilancia",
      officialSite: "Sitio oficial",
    },
    disclaimer:
      "Las estimaciones son ayudas de modelado, no garantías ni asesoría legal. Los pagos dependen de la calidad del reclamo, la evidencia y el total de reclamos que reciba cada fondo. Siempre puede presentar directamente ante el administrador oficial — enlaces disponibles en cada fondo.",
  },
  settlements: {
    eyebrow: "Rastreador de reclamos en vivo",
    heading: "Fondos abiertos, fechas límite reales.",
    lead:
      "Cada fondo de abajo es un caso presentado públicamente con un administrador oficial. Los rastreamos para que su empresa nunca se entere del dinero gratis una semana después de que expiró.",
    filterAria: "Filtrar fondos",
    filters: [
      { label: "Todos los fondos" },
      { label: "Cierran pronto" },
      { label: "Abiertos" },
      { label: "Ventana de verificación" },
      { label: "Cerrados (perdidos)" },
    ],
    statusOpen: "Abierto",
    statusClosingSoon: "Cierra pronto",
    statusClosed: "Cerrado — perdido",
    statusVerify: "Ventana de verificación",
    deadlineVerify: "Ventana de reclamos — verificar con el administrador",
    daysMonitor: "monitorear",
    daysPast: "vencido hace {days} días",
    lastDay: "último día",
    daysLeftCount: "{days} días restantes",
    fundBadge: "Fondo: {fund}",
    purchasesLabel: "Compras:",
    deadlineTerm: "Fecha límite:",
    eligibleLabel: "Quién puede reclamar:",
    testInScanner: "Probar en el escáner",
    officialSite: "Sitio oficial",
    disclaimer:
      "Los datos de los fondos, las ventanas de demanda colectiva y las fechas límite se recopilan de presentaciones públicas y avisos de administradores a finales de octubre de 2026. Las fechas cambian — confirme siempre en el sitio oficial del acuerdo antes de depender de cualquier fecha, o deje que nuestra lista de vigilancia lo haga de forma continua.",
  },
  ieepa: {
    eyebrow: "Enfoque del canal — IEEPA",
    heading: "La Corte Suprema anuló los aranceles. Ahora el dinero tiene que regresar.",
    lead:
      "El 20 de febrero de 2026, la Corte resolvió 6–3 que los aranceles IEEPA eran ilegales ({case}). Aproximadamente {totalRefunds} pagados por {importers} importadores en {entries} entradas deben devolverse con intereses, a través del portal CAPE de CBP — las fechas límite se extienden hasta {deadlines}.",
    capeLivePre: "CAPE entró en línea el {date}. En sus primeros seis días recibió",
    capeLivePost:
      "presentaciones que cubren 11,2 millones de entradas — las pymes que se mueven rápido cobran primero.",
    interestPre: "El interés se capitaliza a aproximadamente {rate}%/año — alrededor de",
    interestPost:
      "se acumula cada mes sobre el conjunto de los reembolsos pendientes mientras las presentaciones esperan en cola.",
    failedValidationPre: "Aproximadamente",
    failedValidationPost:
      "entradas ya fallaron la validación de CAPE en la primera presentación — una preparación correcta de los datos lo es todo.",
    servicesText:
      "Preparamos las entradas, corregimos errores de validación, generamos archivos listos para CAPE y rastreamos cada fecha límite. La presentación queda en sus manos o en las de su agente aduanal autorizado — sin juegos de licencias.",
    estimatorTitle: "Estimador de reembolso + intereses",
    estimatorNote: "Solo una regla general — sus entradas determinan la cifra exacta.",
    principalLabel: "Total de aranceles IEEPA pagados (USD)",
    dateLabel: "Último pago de arancel",
    rateLabel: "Tasa de interés (%/año)",
    includeInterestLabel: "Incluir intereses acumulados a hoy (≈{rate}%/año por defecto)",
    dutiesBackLabel: "Aranceles devueltos",
    interestLabel: "Intereses",
    totalLabel: "Total",
    dripLine:
      "Intereses acumulándose sobre los reembolsos IEEPA pendientes de EE. UU. desde que abrió esta página:",
    ctaButton: "Preparar mi reclamo CAPE",
    disclaimer:
      "Cubre solo los aranceles basados en IEEPA (rutas China / Canadá / México). Los aranceles de las secciones 232/301 no se ven afectados por la sentencia.",
  },
  pricing: {
    eyebrow: "Precios",
    headingA: "Gratis para personas. Una comisión solo cuando",
    headingGold: "se mueve el dinero.",
    lead:
      "La Biblioteca Mundial nunca costará un centavo — cada búsqueda afila el mapa del dinero perdido, y ese mapa es nuestro modo de ganar. Las empresas pagan una comisión de éxito, y solo sobre dinero que realmente regresa.",
    alwaysFreeBadge: "Siempre gratis",
    plans: [
      {
        name: "Personas — la Biblioteca Mundial",
        price: "$0",
        cadence: "gratis para siempre · sin niveles, sin tarjeta, sin trampa",
        cta: "Buscar en 20 países",
        features: [
          "Cada base de datos oficial de dinero no reclamado que indexamos, a nivel mundial",
          "Creador de listas personales — un nombre de entrada, fuentes de salida",
          "Alertas de nuevos registros para sus países",
          "Enlaces directos a la búsqueda oficial — nunca nos interponemos",
          "Busque para usted, sus padres, sus abuelos",
        ],
      },
      {
        name: "Recuperación empresarial",
        price: "$0 por adelantado",
        cadence: "luego 8–15% de los fondos recuperados",
        cta: "Ejecutar un escaneo gratuito",
        features: [
          "Preparación de reclamos y empaquetado de evidencia",
          "Archivos listos para CAPE + correcciones de validación",
          "Presentación ante administradores oficiales o socios autorizados",
          "Rastreo de fechas límite hasta que lleguen los fondos",
          "Cotizado por escrito antes de comprometerse — sin recuperación, sin comisión",
        ],
      },
      {
        name: "Socios y datos",
        price: "Personalizado",
        cadence: "reparto de ingresos · API · análisis",
        cta: "Hable con nosotros",
        features: [
          "Para agentes aduanales, agencias y asociaciones",
          "Preparación de reclamos en volumen para carteras de clientes",
          "Acceso por API al motor de coincidencias",
          "Cobertura agregada de registros a medida que expandimos mercados",
          "Usted conserva la relación con el cliente — nosotros operamos la máquina",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    heading: "Preguntas justas, respuestas directas.",
    items: [
      {
        question: "Soy una persona, no una empresa — ¿esto es para mí?",
        answer:
          "Sí — a través de la Biblioteca Viva, gratis para siempre. Las personas pueden rescatar por sí mismas, en minutos, propiedad no reclamada, bonos de ahorro vencidos, pensiones no reclamadas, reembolsos de impuestos y fondos de demandas colectivas de consumo: cada entrada muestra quién es elegible, qué evidencia se necesita y enlaces a la herramienta oficial gratuita. El motor de pago (escaneo, preparación de reclamos, presentación) existe para las empresas, donde los montos justifican el trabajo — para reclamos personales, hacerlo uno mismo a través de la biblioteca casi siempre es la vía más rápida.",
      },
      {
        question: "¿Esto es asesoría legal? ¿Son un bufete?",
        answer:
          "No. RecoveryOS no es un bufete de abogados ni brinda asesoría legal. Hacemos trabajo de datos: análisis, coincidencias, empaquetado de evidencia, validación y rastreo. Los reclamos se presentan ante los administradores oficiales designados por los tribunales y, donde la jurisdicción exige abogados con licencia, trabajamos con ellos. Siempre puede presentar cualquier reclamo usted mismo de forma gratuita — enlazamos cada sitio de administrador para que pueda hacerlo.",
      },
      {
        question: "¿Qué tan precisas son las estimaciones?",
        answer:
          "Son rangos deliberadamente conservadores basados en tamaños de fondos publicados y tasas de pago típicas de recuperaciones comparables de antimonopolio y aranceles. Su pago final depende de su volumen documentado de compras, la calidad del reclamo y cuántos reclamos reciba el fondo. Cotizamos por escrito una comisión de éxito por reclamo antes de que se comprometa a nada.",
      },
      {
        question: "¿Qué datos necesitan y qué pasa con ellos?",
        answer:
          "Una exportación de compras — Date, Description, Amount — de QuickBooks, Stripe, Xero o su banco. El escaneo gratuito almacena solo estadísticas agregadas (filas escaneadas, coincidencias encontradas). Sus datos a nivel de fila nunca se venden ni se comparten, y se eliminan a solicitud. Para la presentación, usted comparte evidencia únicamente con el administrador oficial.",
      },
      {
        question: "¿Cuándo y cómo pago?",
        answer:
          "Nada por adelantado. Cuando una recuperación aterriza en su cuenta, facturamos nuestra comisión de éxito (8–15%, típicamente 12%). El monitoreo es una suscripción plana de $99/mo que puede cancelar cuando quiera — los socios de lanzamiento reciben 12 meses gratis. Los fondos de acuerdos y del CBP siempre fluyen directamente a la cuenta de su empresa, nunca a través de nosotros.",
      },
      {
        question: "¿Por qué no contratar simplemente un bufete?",
        answer:
          "Buena pregunta — a veces debería. Un abogado de comercio exterior cobra $300–800/hora y aun así necesita sus datos organizados. Nosotros hacemos la capa de datos sin riesgo financiero, y nuestros expedientes de reclamo abaratan a cualquier abogado. Para reclamos simples de fondos, la vía del administrador con un expediente preparado usualmente no necesita abogado.",
      },
      {
        question: "¿Qué canales están activos hoy y qué sigue?",
        answer:
          "Activos ahora: reclamos de acuerdos de demandas colectivas, preparación de reembolsos IEEPA y detección de drawback. El T1 2027 añade auditorías de flete y paquetería y la preselección de créditos fiscales por I+D. El T2 2027 añade barridos de propiedad no reclamada B2B. Cada canal funciona con los mismos datos de compras conectados — sin trabajo extra para usted.",
      },
      {
        question: "Estamos fuera de Estados Unidos. ¿Nos aplica?",
        answer:
          "Si usted exportó a EE. UU. o importó desde EE. UU., puede verse afectado: los reembolsos IEEPA cubren a cualquier importador de registro, y los fondos antimonopolio cubren compras hechas en el comercio de EE. UU. Estamos construyendo canales de reembolso para la UE y el Reino Unido. Díganos dónde opera y le señalamos qué aplica.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Lista de lanzamiento",
    headingA: "El dinero hallado debería encontrar",
    headingGold: "primero a usted.",
    lead:
      "Los lugares de lanzamiento incluyen 12 meses de monitoreo gratis, precios de comisión de éxito para socios fundadores (8%) y un primer escaneo de sus compras 2024–2026 contra cada fondo abierto.",
    perks: ["Sin tarjeta, sin compromiso", "Cancele en cualquier momento una vez en línea"],
    spotsClaimed: "Lugares de lanzamiento reclamados",
    spotsNote: "Los lugares se asignan por orden de registro — la barra solo se mueve en una dirección.",
    successTitle: "Ya está dentro. Qué gusto tenerle a bordo.",
    successText:
      "Le enviaremos su incorporación de lanzamiento y la lista de verificación de documentos para los fondos más cercanos a cerrar. Si importó algo bajo los aranceles de 2025, responda con una cifra aproximada de aranceles y comenzaremos la estimación IEEPA.",
    emailLabel: "Correo electrónico de trabajo *",
    emailPlaceholder: "cfo@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nombre de la empresa",
    volumeLabel: "Volumen de compras mensual",
    volumePlaceholder: "Seleccione un rango",
    volumeOptions: [
      "Menos de $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Más de $1M",
    ],
    channelsLabel: "¿Qué recuperaciones le interesan?",
    channelOptions: [
      "Acuerdos de demandas colectivas",
      "Reembolsos de aranceles IEEPA",
      "Drawback aduanero",
      "Auditorías de flete y paquetería",
    ],
    submitLabel: "Reservar mi lugar de lanzamiento",
    savingLabel: "Guardando…",
    privacyNote: "Le enviamos correos sobre su dinero, nada más. Un clic para salir.",
    invalidEmailTitle: "Ingrese un correo válido",
    invalidEmailDescription: "Una dirección es suficiente.",
    joinedToastTitle: "Está en la lista",
    joinedToastDescription: "Los lugares de lanzamiento van por orden de registro. Vigile su bandeja.",
    errorToastTitle: "Algo salió mal",
    errorToastDescription: "Intente de nuevo en un momento.",
  },
  footer: {
    about:
      "El departamento de recuperaciones para las pequeñas empresas — y una Biblioteca Viva gratuita de dinero olvidado para todos los demás. Mapeamos cada canal donde el dinero se atasca: demandas colectivas, reembolsos de aranceles, drawback, propiedad no reclamada. Usted solo paga cuando llegan los cheques.",
    productTitle: "Producto",
    channelsTitle: "Canales",
    product: [
      "Cómo funciona",
      "Biblioteca Mundial",
      "Escáner gratuito",
      "Reclamos abiertos",
      "Calculadora IEEPA",
      "Precios",
    ],
    channelsNav: [
      "Todos los canales",
      "Demandas colectivas",
      "Reembolsos de aranceles",
      "Drawback aduanero",
      "Lista de lanzamiento",
    ],
    legal1:
      "RecoveryOS no es un bufete de abogados, ni una firma contable, ni un agente aduanal autorizado, y nada en este sitio constituye asesoría legal, fiscal ni financiera. La Biblioteca Viva enlaza a bases de datos gubernamentales oficiales y a administradores designados por los tribunales — las personas siempre pueden presentar directamente, gratis. Las estimaciones de recuperación son ayudas de modelado basadas en presentaciones públicas e índices históricos de pago; las recuperaciones reales dependen de su evidencia, su elegibilidad y del total de reclamos que reciba cada fondo.",
    legal2:
      "Los datos de los fondos de acuerdos, las ventanas de demanda colectiva y las fechas límite se recopilan de presentaciones judiciales públicas y avisos oficiales de administradores a finales de octubre de 2026, y pueden cambiar sin previo aviso. Verifique siempre las fechas límite con el administrador oficial del acuerdo antes de depender de ellas. Los reclamos siempre los presenta usted o se tramitan mediante socios debidamente autorizados, y los fondos fluyen directamente a su cuenta.",
    copyright: "© 2026 RecoveryOS. Todos los derechos reservados.",
    ariaProduct: "Producto",
    ariaChannels: "Canales",
  },
  claim: {
    title: "Reclame con RecoveryOS",
    titleDone: "Paquete de reclamo solicitado",
    descriptionDone: "Revise su bandeja — solo pedimos los documentos que el administrador realmente requiere.",
    descriptionContext:
      "Prepararemos la documentación para {context} y confirmaremos cada fecha límite con el administrador oficial. Usted paga solo cuando lleguen los fondos.",
    descriptionDefault:
      "Prepararemos la documentación, confirmaremos las fechas límite con el administrador oficial y presentaremos hasta que lleguen los fondos. Usted paga solo cuando el dinero aterriza en su cuenta.",
    nextStepsTitle: "Próximos pasos",
    nextSteps: [
      "Envíenos su evidencia de compras (facturas / exportaciones).",
      "Validamos el reclamo y cotizamos la comisión de éxito por escrito.",
      "Los fondos siempre fluyen directamente a la cuenta de su empresa.",
    ],
    emailLabel: "Correo electrónico de trabajo",
    emailPlaceholder: "cfo@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nombre de la empresa",
    submit: "Recibir mi paquete de reclamo",
    submitting: "Guardando…",
    footerNote:
      "Sin recuperación, sin comisión. Siempre puede presentar usted mismo ante el administrador oficial — enlazamos cada fondo.",
    invalidEmailTitle: "Ingrese un correo válido",
    invalidEmailBody: "Necesitamos una dirección para enviarle su paquete de reclamo.",
    queuedTitle: "Está en la fila",
    queuedBody: "Nos comunicaremos con usted con su paquete de reclamo y los documentos exactos necesarios.",
    errorTitle: "Algo salió mal",
    errorBody: "Intente de nuevo en un momento.",
  },
  assistant: {
    openChat: "Abrir chat de Goldie AI",
    closeChat: "Cerrar chat de Goldie",
    chatDialog: "Chat del asistente de IA Goldie",
    askGoldie: "Pregúntele lo que sea a Goldie",
    online: "En línea · responde en cualquier idioma",
    aiScout: "Exploradora de IA",
    reset: "Reiniciar conversación",
    send: "Enviar mensaje",
    placeholder: "Pregúntele lo que sea a Goldie…",
    disclaimer:
      "Las respuestas de la IA pueden ser imperfectas — verifique los detalles de los fondos con los administradores oficiales enlazados en esta página.",
    greeting:
      "¡Hola! Soy **Goldie**, su exploradora de RecoveryOS. Pregúnteme lo que quiera sobre dinero no reclamado — la Biblioteca Mundial, las fechas límite de los acuerdos, los reembolsos de aranceles o cómo funciona el escáner. Respondo en el idioma que prefiera.",
    suggestions: [
      "¿Cómo encuentro dinero no reclamado gratis?",
      "¿Qué es el reembolso IEEPA de $166B?",
      "¿De verdad el escáner es privado?",
      "¿Qué es el dinero no reclamado?",
    ],
  },
  guide: {
    welcome:
      "¡Le damos la bienvenida! Soy Scout — recorro este sitio y dejo consejos mientras usted se desplaza. Haga clic en mí cuando quiera para chatear con Goldie, nuestra asistente de IA.",
    dismiss: "Descartar consejo",
    mute: "Silenciar consejos durante esta visita",
    unmute: "Consejos desactivados — activar",
    avatarLabel: "Scout, la guía del sitio — haga clic para chatear con Goldie",
    askGoldie: "Pregúntele a Goldie sobre esta sección",
    tips: {
      how: [
        "¿Nuevo por aquí? Esta franja muestra todo el flujo — escanear, verificar, reclamar. No hace falta registrarse para probar nada de esto.",
        "Tres pasos, costo cero para explorar. El escáner incluso trae un ejemplo realista que puede ejecutar con un clic.",
      ],
      library: [
        "Pst — el nombre que escribe aquí nunca sale de su navegador. Elija sus países y reciba una lista gratuita de registros oficiales.",
        "50 mercados, 66+ fuentes oficiales. Pruebe elegir Turquía o los EAU — la cobertura va mucho más allá de Estados Unidos.",
      ],
      channels: [
        "Seis canales de recuperación viven aquí. Solo la tarjeta IEEPA brillante son $166B en aranceles reembolsables.",
        "Solo el drawback son ~$15B al año que quedan sobre la mesa. Auditorías de flete, créditos por I+D — la mayoría de las empresas nunca revisan.",
      ],
      scanner: [
        "Pruebe «Cargar un ejemplo realista» — 14 filas de compras de demostración encuentran unos $47K. Su archivo nunca sale de este navegador.",
        "El escáner analiza su CSV aquí mismo, en el navegador — sin subidas, sin cuenta, nada guardado.",
      ],
      settlements: [
        "Las fechas límite lo son todo. Ordene por días restantes — el fondo Ready-Mix de Iowa cierra el 16 de noviembre.",
        "Cada tarjeta enlaza directo al administrador designado por el tribunal. Sin intermediarios, sin comisiones de buscadores.",
      ],
      ieepa: [
        "¿Pagó aranceles en 2025 o después? La Corte Suprema anuló los aranceles IEEPA — cada dólar es reembolsable con intereses. Pruebe con $120,000 en la calculadora.",
        "Los intereses sobre los reembolsos IEEPA pendientes se acumulan a unos $650M al mes. Esperar sale caro.",
      ],
      pricing: [
        "La biblioteca es gratis para siempre — las personas nunca pagan. Las empresas solo pagan 8–15% cuando el dinero realmente llega.",
        "Sin recuperación, sin comisión — está escrito en el plan de negocio. Cotizado por escrito antes de comprometerse.",
      ],
      faq: [
        "Aquí viven las buenas preguntas — incluida «¿esto es asesoría legal?» (alerta de spoiler: no, no somos un bufete).",
        "Las preguntas frecuentes cubren privacidad, elegibilidad y qué pasa después de presentar. Dos minutos bien invertidos.",
      ],
      waitlist: [
        "¡Última parada! Únase a la lista de lanzamiento — o simplemente pregúntele lo que sea a mi colega Goldie. Ella es la moneda de la esquina.",
        "¿Se va? Lleve la lista de verificación con usted — la lista de lanzamiento recibe alertas de nuevos registros para sus países.",
      ],
    },
    ask: {
      how: "Explique cómo funciona RecoveryOS en términos simples.",
      library: "¿Cómo funciona la búsqueda de la Biblioteca Mundial y es realmente gratis?",
      channels: "¿Qué canal de recuperación le conviene más a mi empresa?",
      scanner: "¿Cómo coteja el escáner mis compras con los fondos de acuerdos?",
      settlements: "¿Qué fondos de acuerdos siguen abiertos y cierran pronto?",
      ieepa: "¿Cómo reclamo reembolsos de aranceles IEEPA a través del portal CAPE de CBP?",
      pricing: "¿Cuánto cuesta RecoveryOS y cuándo pago?",
      faq: "¿RecoveryOS es legítimo y es asesoría legal?",
      waitlist: "¿Qué recibo al unirme a la lista de lanzamiento?",
    },
  },
};

export default es;
