import type { Dictionary } from "./en";

const pt: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Executar uma varredura gratuita",
    openMenu: "Abrir menu",
    language: "Idioma",
    closeMenu: "Fechar menu",
  },
  header: {
    nav: [
      "Como funciona",
      "Biblioteca mundial",
      "Canais",
      "Scanner gratuito",
      "Reivindicações abertas",
      "Reembolso de tarifas",
      "Preços",
      "FAQ",
    ],
    ariaMainNav: "Navegação principal",
    ariaMobileNav: "Navegação móvel",
    ariaHome: "Início da RecoveryOS",
  },
  hero: {
    pill: "A Suprema Corte derrubou as tarifas IEEPA por 6–3",
    titleA: "O mundo tem direito a ",
    titleGold: "dinheiro",
    titleB: " que já esqueceu.",
    subtitle:
      "A RecoveryOS mapeia todos os bancos de dados oficiais de dinheiro não reivindicado do planeta — para a sua empresa e para o seu próprio nome — e depois protocola e acompanha as reivindicações até os cheques chegarem à sua conta.",
    ctaScan: "Executar uma varredura gratuita",
    ctaLibrary: "Explore a biblioteca mundial — grátis",
    trustNoFee: "Sem recuperação, sem taxa",
    trustOfficial: "Links para todos os administradores oficiais",
    trustDelete: "Dados de compras excluídos a pedido",
    deadlineLead: "Encerra esta semana:",
    deadlineBody:
      "Fundo da carne suína ($117M) — 29 de out. · Fundos do peru ($71.5M+) — 30 de out. Os juros sobre os reembolsos IEEPA pendentes acumulam a cerca de {interest}/mês — é por causa de prazos que as empresas perdem dinheiro recuperável todos os anos.",
    stat1: "em reembolsos IEEPA pendentes após a decisão da Suprema Corte",
    stat2:
      "de dinheiro não reivindicado verificado nos {markets} mercados mundiais que indexamos",
    stat3: "em drawback não reivindicado, segundo estimativas da CBP",
    stat4:
      "pedidos de reembolso no CAPE nos primeiros 6 dias — a corrida do ouro é real",
    ticker: [
      "Reembolsos de tarifas IEEPA — $166B",
      "Pensões perdidas do Reino Unido — £31.1B",
      "França Ciclade — €7.87B",
      "Índia UDGAM — ₹67,000 crore",
      "Coreia: contas inativas — ₩14T",
      "Brasil SVR — R$5.65B",
      "África do Sul — R88.5B",
      "Fundo antitruste da carne suína — $117M",
      "Drawback — $15B/yr",
      "Antitruste do peru — $71.5M+",
      "Austrália: dinheiro perdido — A$3B",
      "Canadá: contas inativas — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Como funciona",
    headingA: "Toda empresa tem um time de contas a pagar.",
    headingGold: "Nenhuma tem um time de recuperações.",
    lead:
      "Contas a pagar monitora o que sai. Ninguém monitora o que volta — reembolsos, acordos, drawback, correções de tarifas. A RecoveryOS é esse departamento que falta, precificado para só existir quando ele se paga.",
    steps: [
      {
        title: "Conecte os seus dados",
        text: "Arraste uma exportação de compras — CSV do QuickBooks, extrato do Stripe ou do banco, ou quarenta linhas que você cole aqui. Leva cerca de quatro minutos. Nada sai do seu navegador até você executar a varredura.",
      },
      {
        title: "Comparamos cada linha",
        text: "O motor compara cada compra com as janelas abertas de ações coletivas, as linhas tarifárias e as regras de drawback — e mostra o que bateu, por quê e uma estimativa conservadora antes de você se comprometer com qualquer coisa.",
      },
      {
        title: "Os cheques chegam — só então cobramos",
        text: "As reivindicações passam por administradores oficiais ou parceiros licenciados. Os fundos fluem direto para a sua conta. Nossa taxa de êxito é cotada por escrito e cobrada apenas quando o dinheiro cai na conta.",
      },
    ],
  },
  library: {
    eyebrow: "A Biblioteca Mundial",
    heading: "Todos os bancos de dados oficiais de dinheiro não reivindicado do planeta.",
    headingGold: "Grátis para sempre.",
    leadBefore:
      "Não apenas os Estados Unidos, e não apenas empresas. O dinheiro fica esquecido sob a burocracia em todas as grandes economias —",
    leadAfter:
      ". A Biblioteca Mundial indexa a porta oficial de cada uma delas, para qualquer pessoa, por $0.",
    moneyWords: [
      "contas inativas",
      "pensões perdidas",
      "dividendos não reivindicados",
      "espólios sem herdeiros",
      "depósitos esquecidos",
      "cheques não descontados",
    ],
    stats: [
      { label: "mercados indexados" },
      { label: "registros no ar hoje" },
      { label: "fontes oficiais verificadas" },
      { label: "verificados aguardando reivindicação" },
    ],
    tickerLive: " — no ar",
    tickerInLab: " — em desenvolvimento",
    searchTitle: "Encontre o dinheiro que a burocracia esqueceu —",
    searchTitleGold: "sob o seu próprio nome.",
    searchLead:
      "Um nome, os seus países. Montamos o seu checklist pessoal de bases de dados oficiais para pesquisar — cada entrada grátis, cada link oficial.",
    nameLabel: "Nome para buscar — fica no seu navegador, nunca é enviado a lugar nenhum",
    namePlaceholder: "ex.: Maria Silva",
    countriesLabel: "Países em que você morou, trabalhou ou teve conta bancária",
    selectedCount: "{count}/8 selecionados",
    pickerPlaceholder: "Pesquise entre {count} mercados — EUA, Reino Unido, Quênia, Malásia…",
    pickerNoMatch:
      "Nenhum mercado corresponde a “{query}” — tente o nome completo, ex.: “Japão”.",
    buildChecklist: "Montar meu checklist grátis",
    searchPrivacy:
      "Grátis para sempre, sem planos. Guardamos a sua busca para alertá-lo quando novos registros entrarem no ar para os seus países — esse é todo o nosso modelo. Exclua quando quiser.",
    errorNameRequired: "Informe o nome para a busca.",
    errorNoCountries:
      "Escolha pelo menos um país em que você tenha morado, trabalhado ou tido conta bancária.",
    errorSearchFailed: "A busca falhou. Tente novamente.",
    errorNetwork: "Erro de rede — tente novamente.",
    closeResults: "Fechar resultados",
    checklistReadyOne: "Checklist pronto para {count} país",
    checklistReadyMany: "Checklist pronto para {count} países",
    officialDatabases: "bases de dados oficiais",
    toSearch: "para buscar",
    resultPrivacy:
      "Nada foi salvo — só você pode ver este checklist. Vá avançando pela lista — a maioria das entradas leva menos de 10 minutos.",
    databasesCount: "{count} bases de dados",
    openOfficialSearch: "Abrir busca oficial",
    openTracker: "Abrir rastreador",
    regionsAriaLabel: "Regiões do mundo",
    sourceCountOne: "{count} fonte oficial",
    sourceCountMany: "{count} fontes oficiais",
    inTheLab: "Em desenvolvimento",
    badgeLive: "No ar",
    badgeResearching: "Em pesquisa",
    viewSources: "Ver as fontes",
    launchesHere: "Entra no ar por aqui conforme verificamos os caminhos de reivindicação.",
    referralEyebrow: "Encontrou $40 para você?",
    referralTitle: "Sua empresa tem direito a",
    referralTitleGold: "100× mais.",
    referralText:
      "A mesma burocracia, em escala empresarial: reembolso de tarifas em cada importação, ações coletivas em cada pedido de compra, drawback em cada reexportação. Aponte o scanner para os livros da sua empresa e veja o número real.",
    runBusinessScan: "Executar a varredura empresarial",
    principles: [
      {
        title: "Grátis para sempre — faça você mesmo",
        text: "Explicamos exatamente como protocolar sozinho, em minutos. Nenhum intermediário é necessário, jamais. Sem planos pagos para pessoas, ponto final.",
      },
      {
        title: "Somente links oficiais",
        text: "Cada entrada aponta para o banco de dados do governo, o banco central ou o administrador designado pela justiça. Sem imitações.",
      },
      {
        title: "Dados vivos",
        text: "Novos registros entram no ar a cada trimestre. A biblioteca os acompanha continuamente para que o seu checklist nunca fique desatualizado.",
      },
    ],
    officialSourcesCount: "{count} fontes oficiais",
    officialSite: "Site oficial",
    addToSearch: "Adicionar {country} à minha busca grátis",
    footnoteIntro:
      "Números compilados de divulgações oficiais dos programas e da grande imprensa até o fim de 2026 —",
    footnoteOutro: "Confirme sempre no site oficial antes de agir.",
  },
  channels: {
    eyebrow: "Canais",
    headingA: "Um motor, todos os canais onde",
    headingGold: "o dinheiro das empresas trava.",
    lead:
      "Cada canal sozinho é banal — alguns pontos percentuais aqui, um fundo perdido ali. Empilhados sobre os mesmos dados de compras, eles se combinam em um fluxo recorrente de recuperação.",
    items: [
      {
        title: "Acordos de ação coletiva",
        stat: "Bilhões",
        statLabel: "parados sem reivindicação em fundos abertos",
        description:
          "Acordos antitruste pagam às empresas por cobranças excessivas em tudo, de carne suína e peru a concreto e embalagens. As taxas de reivindicação são minúsculas — a maioria dos compradores nunca protocola.",
        statusNote: "No ar agora — 5+ fundos monitorados",
      },
      {
        title: "Reembolsos de tarifas IEEPA",
        stat: "$166B",
        statLabel: "ordenados de volta a 330 mil importadores",
        description:
          "A Suprema Corte derrubou as tarifas IEEPA por 6–3. Todo direito aduaneiro pago sob elas é reembolsável com juros pelo portal CAPE da CBP — os prazos se estendem até 2027–2028.",
        statusNote: "No ar agora — calculadora abaixo",
      },
      {
        title: "Drawback",
        stat: "~$15B/yr",
        statLabel: "não reivindicado, segundo estimativas da CBP",
        description:
          "Até 99% dos direitos aduaneiros sobre bens importados que depois foram exportados ou destruídos podem ser recuperados. A maioria das PMEs nunca protocolou um único pedido de drawback.",
        statusNote: "No ar agora — análise incluída na varredura",
      },
      {
        title: "Auditorias de frete e encomendas",
        stat: "$1B+",
        statLabel: "setor que recupera excessos de cobrança de frete",
        description:
          "Entregas atrasadas, sobretaxas duplicadas e erros de dimensionamento fazem vazar de 1–3% do gasto com frete. Empresas de auditoria ficam com 25–50% de contingência — nós vamos integrar tudo numa única plataforma.",
        statusNote: "T1 2027",
      },
      {
        title: "Créditos tributários de P&D",
        stat: "A maioria",
        statLabel: "das PMEs elegíveis nunca protocola um pedido",
        description:
          "Programas de crédito dos EUA, do Reino Unido e da UE rotineiramente ficam sem reivindicação por pequenas empresas qualificadas. Fazemos a triagem prévia do seu gasto com engenharia e entregamos os dossiês a um preparador licenciado.",
        statusNote: "T1 2027",
      },
      {
        title: "Bens não reivindicados (B2B)",
        stat: "$100–150B",
        statLabel: "retidos pelos estados dos EUA, empresas incluídas",
        description:
          "Créditos de fornecedores esquecidos, reembolsos não descontados, depósitos antigos — a reversão de saldos inativos absorve silenciosamente o dinheiro das empresas todo ano. Nós varremos isso continuamente.",
        statusNote: "T2 2027",
      },
    ],
    ticker: [
      "Suprema Corte 6–3 — tarifas IEEPA são ilegais",
      "CAPE: 75.300 pedidos nos primeiros 6 dias",
      "Juros acumulam ≈ $650M/mês sobre reembolsos pendentes",
      "Drawback: até 99% dos direitos aduaneiros são recuperáveis",
      "Taxas de reivindicação em ações coletivas: normalmente abaixo de 10%",
      "1 em cada 10 americanos está numa lista de dinheiro não reivindicado",
      "Fundo da carne suína $117M — prazo monitorado",
      "Fundos do peru $71.5M+ — prazo monitorado",
    ],
  },
  scanner: {
    eyebrow: "Scanner gratuito",
    headingA: "Aponte-nos para as suas compras.",
    headingGold: "Nós encontramos o dinheiro.",
    lead:
      "Sem cadastro, sem envio a terceiros — cole uma exportação do QuickBooks, do Stripe ou do seu banco e o motor cruza cada linha com os canais de recuperação ativos.",
    tabs: {
      upload: "Selecionar CSV",
      paste: "Colar dados",
    },
    upload: {
      chooseAriaLabel: "Escolher um arquivo CSV de compras",
      choose: "Clique para escolher um arquivo CSV / TSV",
      expectedColumns: "Colunas esperadas: Date, Description, Amount",
    },
    paste: {
      label: "Cole as linhas de compras",
      placeholder:
        "Date,Description,Amount\n2025-04-18,Tarifa IEEPA — peças da China,28500\n2016-09-02,Peça de bacon — Smithfield,4120.50",
      hint: "CSV ou TSV, uma compra por linha. Exportações do QuickBooks, Stripe, Xero e da maioria dos bancos funcionam como estão.",
    },
    loadSample: "Sem dados à mão? Carregue um exemplo realista",
    privacyNote: "Armazenamos apenas estatísticas agregadas das varreduras — nunca as suas linhas.",
    preview: {
      usableRowsLabel: "linhas utilizáveis",
      skipped: "{count} ignoradas",
      totalSpendLabel: "Gasto total:",
      colDate: "Data",
      colDescription: "Descrição",
      colAmount: "Valor",
      moreRows: "…e mais {count} linhas serão analisadas.",
    },
    actions: {
      run: "Executar a varredura",
      scanning: "Analisando canais…",
      scanningAriaLabel: "Analisando",
      clear: "Limpar",
    },
    toasts: {
      fileTooLargeTitle: "Arquivo grande demais",
      fileTooLargeBody: "Mantenha as exportações abaixo de 5 MB (~100 mil linhas).",
      sampleLoadedTitle: "Dados de exemplo carregados",
      sampleLoadedBody:
        "14 linhas de um distribuidor e importador de alimentos de porte médio, fictício.",
    },
    errors: {
      noUsableRows:
        "Nenhuma linha utilizável encontrada. Colunas esperadas: Date, Description, Amount (CSV ou TSV, exportado do QuickBooks, Stripe ou do seu banco).",
    },
    results: {
      complete: "Varredura concluída — {count} linhas analisadas",
      foundLabel: "Encontrado:",
      matchedChannelsOne: "Em {count} canal correspondente.",
      matchedChannelsMany: "Em {count} canais correspondentes.",
      conservativeNote:
        "Faixas conservadoras — o pagamento final depende das suas provas e do total de reivindicações apresentadas a cada fundo.",
      ieepaIncluded:
        "Inclui reembolsos de tarifas IEEPA de {low}–{high} (devolução dos direitos + juros legais, antes dos custos de protocolo).",
      missedClosed:
        "Você também perdeu {low}–{high} em reivindicações que já fecharam. O monitoramento garante que isso nunca mais aconteça.",
      claimCta: "Reivindicar com a RecoveryOS",
      scanAnother: "Analisar outro arquivo",
    },
    match: {
      finalDay: "Último dia",
      daysLeft: "Faltam {count} dias",
      fundBadge: "Fundo: {size}",
      matchedPurchases: "Compras correspondentes ({count})",
      moreLines: "+ {count} linhas a mais",
      matchedVolumeLabel: "Volume correspondente:",
      estimatedRecovery: "Recuperação estimada",
      whoCanClaimLabel: "Quem pode reivindicar: ",
      evidenceLabel: "Provas: ",
      claimCta: "Reivindicar com a RecoveryOS",
      closedCta: "Fechado — entrar na lista de monitoramento",
      officialSite: "Site oficial",
    },
    disclaimer:
      "As estimativas são recursos de modelagem, não garantias nem assessoria jurídica. Os pagamentos dependem da qualidade da reivindicação, das provas e do total de reivindicações que cada fundo recebe. Você sempre pode protocolar diretamente com o administrador oficial — links fornecidos em cada fundo.",
  },
  settlements: {
    eyebrow: "Rastreador de reivindicações em tempo real",
    heading: "Fundos abertos, prazos reais.",
    lead:
      "Cada fundo abaixo é um caso protocolado publicamente com um administrador oficial. Nós os monitoramos para que a sua empresa nunca fique sabendo de dinheiro grátis uma semana depois de ele expirar.",
    filterAria: "Filtrar fundos",
    filters: [
      { label: "Todos os fundos" },
      { label: "Fecha em breve" },
      { label: "Abertos" },
      { label: "Janela de verificação" },
      { label: "Fechados (perdidos)" },
    ],
    statusOpen: "Aberto",
    statusClosingSoon: "Fecha em breve",
    statusClosed: "Fechado — perdido",
    statusVerify: "Janela de verificação",
    deadlineVerify: "Janela de reivindicações — confirme com o administrador",
    daysMonitor: "monitorar",
    daysPast: "vencido há {days} dias",
    lastDay: "último dia",
    daysLeftCount: "faltam {days} dias",
    fundBadge: "Fundo: {fund}",
    purchasesLabel: "Compras:",
    deadlineTerm: "Prazo:",
    eligibleLabel: "Quem pode reivindicar:",
    testInScanner: "Testar no scanner",
    officialSite: "Site oficial",
    disclaimer:
      "Dados dos fundos, janelas de ações coletivas e prazos são compilados de protocolos públicos e avisos de administradores até o fim de outubro de 2026. Os prazos mudam — confirme sempre no site oficial do acordo antes de confiar em qualquer data, ou deixe a nossa lista de monitoramento fazer isso continuamente.",
  },
  ieepa: {
    eyebrow: "Destaque do canal — IEEPA",
    heading: "A Suprema Corte derrubou as tarifas. Agora o dinheiro tem de voltar.",
    lead:
      "Em 20 de fevereiro de 2026, a Corte decidiu por 6–3 que as tarifas IEEPA eram ilegais ({case}). Cerca de {totalRefunds} pagos por {importers} importadores em {entries} entradas devem ser devolvidos com juros, pelo portal CAPE da CBP — os prazos se estendem até {deadlines}.",
    capeLivePre: "O CAPE entrou no ar em {date}. Nos primeiros seis dias, recebeu",
    capeLivePost:
      "pedidos cobrindo 11,2 milhões de entradas — as PMEs que agem rápido recebem primeiro.",
    interestPre: "Os juros capitalizam a aproximadamente {rate}%/ano — cerca de",
    interestPost:
      "por mês se acumula sobre todos os reembolsos pendentes enquanto os pedidos aguardam nas filas.",
    failedValidationPre: "Cerca de",
    failedValidationPost:
      "entradas já reprovaram na validação do CAPE logo na primeira submissão — preparar bem os dados é o jogo todo.",
    servicesText:
      "Preparamos as entradas, corrigimos erros de validação, geramos arquivos prontos para o CAPE e monitoramos todos os prazos. O protocolo fica com você ou com o seu despachante aduaneiro licenciado — sem joguinhos de licença.",
    estimatorTitle: "Estimador de reembolso + juros",
    estimatorNote: "Serve só como estimativa rápida — as suas entradas determinam o valor exato.",
    principalLabel: "Total de direitos aduaneiros IEEPA pagos (USD)",
    dateLabel: "Último pagamento de tarifa",
    rateLabel: "Taxa de juros (%/ano)",
    includeInterestLabel: "Incluir juros acumulados até hoje (≈{rate}%/ano por padrão)",
    dutiesBackLabel: "Devolução dos direitos",
    interestLabel: "Juros",
    totalLabel: "Total",
    dripLine:
      "Juros acumulando sobre os reembolsos IEEPA pendentes dos EUA desde que você abriu esta página:",
    ctaButton: "Preparar meu pedido no CAPE",
    disclaimer:
      "Cobre apenas direitos aduaneiros decorrentes do IEEPA (rotas China / Canadá / México). Os direitos das Seções 232/301 não são afetados pela decisão.",
  },
  pricing: {
    eyebrow: "Preços",
    headingA: "Grátis para pessoas. Uma taxa apenas quando",
    headingGold: "o dinheiro se move.",
    lead:
      "A Biblioteca Mundial nunca vai custar um centavo — cada busca deixa o mapa do dinheiro perdido mais nítido, e é esse mapa que nos remunera. Empresas pagam uma taxa de êxito, e somente sobre dinheiro que realmente volta.",
    alwaysFreeBadge: "Sempre grátis",
    plans: [
      {
        name: "Pessoas — a Biblioteca Mundial",
        price: "$0",
        cadence: "grátis para sempre · sem planos, sem cartão, sem pegadinha",
        cta: "Buscar em 20 países",
        features: [
          "Cada banco de dados oficial de dinheiro não reivindicado que indexamos, no mundo inteiro",
          "Criador de checklist pessoal — entra um nome, saem as fontes",
          "Alertas de novos registros para os seus países",
          "Links diretos para a busca oficial — nós nunca atrapalhamos",
          "Busque para você, para os seus pais, para os seus avós",
        ],
      },
      {
        name: "Recuperação empresarial",
        price: "$0 de entrada",
        cadence: "depois, 8–15% dos valores recuperados",
        cta: "Executar uma varredura gratuita",
        features: [
          "Preparação de reivindicações e organização das provas",
          "Arquivos prontos para o CAPE + correções de validação",
          "Protocolo via administradores oficiais ou parceiros licenciados",
          "Acompanhamento de prazos até a chegada dos fundos",
          "Cotado por escrito antes de você se comprometer — sem recuperação, sem taxa",
        ],
      },
      {
        name: "Parceiros e dados",
        price: "Personalizado",
        cadence: "divisão de receita · API · insights",
        cta: "Fale conosco",
        features: [
          "Para despachantes aduaneiros, agências e associações",
          "Preparação de reivindicações em massa para carteiras de clientes",
          "Acesso por API ao motor de cruzamento",
          "Cobertura agregada de registros conforme expandimos mercados",
          "Você fica com o relacionamento com o cliente — nós operamos a máquina",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    heading: "Perguntas justas, respostas diretas.",
    items: [
      {
        question: "Sou pessoa física, não empresa — isso é para mim?",
        answer:
          "Sim — pela Biblioteca Viva, grátis para sempre. Pessoas físicas conseguem resgatar sozinhas, em minutos, bens não reivindicados, títulos de poupança vencidos, pensões não reivindicadas, restituições de impostos e fundos de ações coletivas de consumo: cada entrada mostra quem é elegível, quais provas são necessárias e links para a ferramenta oficial gratuita. O motor pago (varredura, preparação de reivindicações, protocolo) existe para empresas, onde os valores justificam o trabalho — para reivindicações pessoais, o faça-você-mesmo pela biblioteca quase sempre é o caminho mais rápido.",
      },
      {
        question: "Isso é assessoria jurídica? Vocês são um escritório de advocacia?",
        answer:
          "Não. A RecoveryOS não é um escritório de advocacia e não fornece assessoria jurídica. Fazemos trabalho de dados: análise, cruzamento, organização de provas, validação e monitoramento. As reivindicações são protocoladas junto aos administradores oficiais designados pela justiça e, onde a jurisdição exige advogados habilitados, trabalhamos com eles. Você sempre pode protocolar qualquer reivindicação sozinho, de graça — linkamos todos os sites de administradores para que você possa.",
      },
      {
        question: "Qual é a precisão das estimativas?",
        answer:
          "São faixas deliberadamente conservadoras, baseadas em tamanhos publicados de fundos e em taxas de pagamento típicas de recuperações comparáveis de antitruste e tarifas. O seu pagamento final depende do seu volume documentado de compras, da qualidade da reivindicação e de quantas reivindicações o fundo recebe. Cotamos por escrito uma taxa de êxito por reivindicação antes de você se comprometer com qualquer coisa.",
      },
      {
        question: "Quais dados vocês precisam e o que acontece com eles?",
        answer:
          "Uma exportação de compras — Date, Description, Amount — do QuickBooks, Stripe, Xero ou do seu banco. A varredura gratuita armazena apenas estatísticas agregadas (linhas analisadas, correspondências encontradas). Os seus dados linha a linha nunca são vendidos nem compartilhados, e são excluídos a pedido. Para o protocolo, você compartilha provas apenas com o administrador oficial.",
      },
      {
        question: "Quando e como eu pago?",
        answer:
          "Nada adiantado. Quando uma recuperação cai na sua conta, a nossa taxa de êxito (8–15%, em geral 12%) é faturada. O monitoramento é uma assinatura de valor fixo de $99/mês, que você pode cancelar quando quiser — parceiros de lançamento ganham 12 meses grátis. Os fundos de acordos e da CBP sempre fluem direto para a conta da sua empresa, nunca por meio de nós.",
      },
      {
        question: "Por que não contratar logo um escritório de advocacia?",
        answer:
          "Ótima pergunta — às vezes você deveria. Um advogado de comércio exterior cobra $300–800/hora e ainda precisa dos seus dados organizados. Nós fazemos a camada de dados sem risco financeiro, e os nossos dossiês de reivindicação tornam qualquer advogado mais barato de usar. Para reivindicações simples de fundos, o caminho do administrador com um dossiê preparado normalmente dispensa advogado.",
      },
      {
        question: "Quais canais estão no ar hoje e o que vem a seguir?",
        answer:
          "No ar agora: reivindicações de acordos de ação coletiva, preparação de reembolsos IEEPA e triagem de drawback. O T1 2027 traz a recuperação por auditorias de frete e encomendas e a pré-triagem de créditos tributários de P&D. O T2 2027 traz varreduras de bens não reivindicados B2B. Todo canal roda sobre os mesmos dados de compras conectados — sem trabalho extra para você.",
      },
      {
        question: "Operamos fora dos Estados Unidos. Isso vale para nós?",
        answer:
          "Se a sua empresa exporta para os EUA ou importa deles, pode ser afetada: os reembolsos IEEPA cobrem qualquer importador de registro, e os fundos antitruste cobrem compras feitas no comércio americano. Estamos construindo em seguida canais de reembolso para UE e Reino Unido. Conte onde vocês operam e nós sinalizamos o que se aplica.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Lista de lançamento",
    headingA: "O dinheiro encontrado deve achar",
    headingGold: "você primeiro.",
    lead:
      "As vagas de lançamento incluem 12 meses de monitoramento grátis, preço de taxa de êxito para sócios fundadores (8%) e uma primeira varredura das suas compras de 2024–2026 contra todos os fundos abertos.",
    perks: ["Sem cartão, sem compromisso", "Cancele a qualquer momento após o lançamento"],
    spotsClaimed: "Vagas de lançamento reservadas",
    spotsNote: "As vagas seguem a ordem de inscrição — a barra só anda em um sentido.",
    successTitle: "Você está dentro. Bem-vindo a bordo.",
    successText:
      "Enviaremos o seu onboarding de lançamento e o checklist de documentos dos fundos mais próximos de fechar. Se você importou algo sob as tarifas de 2025, responda com um valor aproximado de direitos aduaneiros e começamos a estimativa do IEEPA.",
    emailLabel: "E-mail profissional *",
    emailPlaceholder: "cfo@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nome da empresa",
    volumeLabel: "Volume mensal de compras",
    volumePlaceholder: "Selecione uma faixa",
    volumeOptions: [
      "Menos de $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Mais de $1M",
    ],
    channelsLabel: "Quais recuperações interessam a você?",
    channelOptions: [
      "Acordos de ação coletiva",
      "Reembolsos de tarifas IEEPA",
      "Drawback",
      "Auditorias de frete e encomendas",
    ],
    submitLabel: "Garantir minha vaga de lançamento",
    savingLabel: "Salvando…",
    privacyNote: "Enviamos e-mail sobre o seu dinheiro, nada mais. Um clique para sair.",
    invalidEmailTitle: "Informe um e-mail válido",
    invalidEmailDescription: "Um endereço é suficiente.",
    joinedToastTitle: "Você está na lista",
    joinedToastDescription:
      "As vagas de lançamento seguem a ordem de inscrição. Fique de olho na sua caixa de entrada.",
    errorToastTitle: "Algo deu errado",
    errorToastDescription: "Tente novamente em instantes.",
  },
  footer: {
    about:
      "O departamento de recuperações das pequenas empresas — e uma Biblioteca Viva gratuita de dinheiro esquecido para todos os demais. Mapeamos todo canal onde o dinheiro trava: ações coletivas, reembolsos de tarifas, drawback, bens não reivindicados. Você só paga quando os cheques chegam.",
    productTitle: "Produto",
    channelsTitle: "Canais",
    product: [
      "Como funciona",
      "Biblioteca Mundial",
      "Scanner gratuito",
      "Reivindicações abertas",
      "Calculadora IEEPA",
      "Preços",
    ],
    channelsNav: [
      "Todos os canais",
      "Ações coletivas",
      "Reembolsos de tarifas",
      "Drawback",
      "Lista de lançamento",
    ],
    legal1:
      "A RecoveryOS não é um escritório de advocacia, nem um contador, nem um despachante aduaneiro licenciado, e nada neste site é assessoria jurídica, tributária ou financeira. A Biblioteca Viva linka bancos de dados governamentais oficiais e administradores designados pela justiça — pessoas físicas sempre podem protocolar diretamente, de graça. As estimativas de recuperação são recursos de modelagem baseados em protocolos públicos e taxas históricas de pagamento; as recuperações reais dependem das suas provas, da sua elegibilidade e do total de reivindicações que cada fundo recebe.",
    legal2:
      "Dados dos fundos de acordos, janelas de ações coletivas e prazos são compilados de protocolos judiciais públicos e avisos oficiais de administradores até o fim de outubro de 2026, e podem mudar sem aviso. Confirme sempre os prazos com o administrador oficial do acordo antes de confiar neles. As reivindicações são sempre protocoladas por você ou por meio de parceiros devidamente licenciados, e os fundos fluem direto para a sua conta.",
    copyright: "© 2026 RecoveryOS. Todos os direitos reservados.",
    ariaProduct: "Produto",
    ariaChannels: "Canais",
  },
  claim: {
    title: "Reivindicar com a RecoveryOS",
    titleDone: "Dossiê de reivindicação solicitado",
    descriptionDone:
      "Confira a sua caixa de entrada — só pedimos os documentos que o administrador realmente exige.",
    descriptionContext:
      "Preparamos a documentação para {context} e confirmamos todos os prazos com o administrador oficial. Você paga só quando os fundos chegarem.",
    descriptionDefault:
      "Preparamos a documentação, confirmamos os prazos com o administrador oficial e protocolamos até os fundos chegarem. Você paga só quando o dinheiro cair na sua conta.",
    nextStepsTitle: "Próximos passos",
    nextSteps: [
      "Envie as suas provas de compras (notas fiscais / exportações).",
      "Validamos a reivindicação e cotamos a taxa de êxito por escrito.",
      "Os fundos sempre fluem direto para a conta da sua empresa.",
    ],
    emailLabel: "E-mail profissional",
    emailPlaceholder: "cfo@empresa.com",
    companyLabel: "Empresa",
    companyPlaceholder: "Nome da empresa",
    submit: "Receber meu dossiê de reivindicação",
    submitting: "Salvando…",
    footerNote:
      "Sem recuperação, sem taxa. Você sempre pode protocolar sozinho pelo administrador oficial — linkamos todos os fundos.",
    invalidEmailTitle: "Informe um e-mail válido",
    invalidEmailBody: "Precisamos de um endereço para enviar o seu dossiê de reivindicação.",
    queuedTitle: "Você está na fila",
    queuedBody:
      "Entraremos em contato com o seu dossiê de reivindicação e os documentos exatos necessários.",
    errorTitle: "Algo deu errado",
    errorBody: "Tente novamente em instantes.",
  },
  assistant: {
    openChat: "Abrir chat da IA Goldie",
    closeChat: "Fechar chat da Goldie",
    chatDialog: "Chat da assistente de IA Goldie",
    askGoldie: "Pergunte qualquer coisa à Goldie",
    online: "Online · responde em qualquer idioma",
    aiScout: "Exploradora de IA",
    reset: "Reiniciar conversa",
    send: "Enviar mensagem",
    placeholder: "Pergunte qualquer coisa à Goldie…",
    disclaimer:
      "Respostas de IA podem ser imperfeitas — confirme os detalhes dos fundos com os administradores oficiais linkados nesta página.",
    greeting:
      "Olá! Eu sou a **Goldie**, sua exploradora da RecoveryOS. Pergunte qualquer coisa sobre dinheiro não reivindicado — a Biblioteca Mundial, prazos de acordos, reembolsos de tarifas ou como funciona o scanner. Respondo no idioma que você preferir.",
    suggestions: [
      "Como encontro dinheiro não reivindicado de graça?",
      "O que é o reembolso IEEPA de $166B?",
      "O scanner é mesmo privado?",
      "O que é dinheiro não reivindicado?",
    ],
  },
  guide: {
    welcome:
      "Boas-vindas! Eu sou a Scout — percorro este site e deixo dicas enquanto você rola a página. Clique em mim a qualquer momento para conversar com a Goldie, nossa assistente de IA.",
    dismiss: "Descartar dica",
    mute: "Silenciar dicas nesta visita",
    unmute: "Dicas desligadas — ligar",
    avatarLabel: "Scout, a guia do site — clique para conversar com a Goldie",
    askGoldie: "Pergunte à Goldie sobre esta seção",
    tips: {
      how: [
        "Chegou agora? Esta faixa mostra todo o fluxo — varrer, verificar, reivindicar. Não é preciso criar conta para testar nada disso.",
        "Três passos, custo zero para explorar. O scanner até tem um exemplo realista que você roda com um clique.",
      ],
      library: [
        "Psiu — o nome que você digita aqui nunca sai do seu navegador. Escolha os seus países e receba um checklist grátis de registros oficiais.",
        "50 mercados, 66+ fontes oficiais. Experimente escolher a Turquia ou os EAU — a cobertura vai muito além da América.",
      ],
      channels: [
        "Seis canais de recuperação vivem aqui. Só o cartão IEEPA brilhante já são $166B em direitos reembolsáveis.",
        "Só o drawback já são ~$15B por ano deixados na mesa. Auditorias de frete, créditos de P&D — a maioria das empresas nunca confere.",
      ],
      scanner: [
        "Experimente “Carregue um exemplo realista” — 14 linhas de compras de demonstração acham cerca de $47K. O seu arquivo nunca sai deste navegador.",
        "O scanner analisa o seu CSV bem aqui no navegador — sem upload, sem conta, nada armazenado.",
      ],
      settlements: [
        "Prazos são o jogo todo. Ordene por dias restantes — o fundo de Ready-Mix de Iowa fecha em 16 de novembro.",
        "Cada cartão leva direto ao administrador designado pela justiça. Sem intermediários, sem comissão de localizador.",
      ],
      ieepa: [
        "Pagou tarifas em 2025 ou depois? A Suprema Corte derrubou os direitos IEEPA — cada dólar é reembolsável com juros. Experimente $120,000 na calculadora.",
        "Os juros sobre os reembolsos IEEPA pendentes acumulam a cerca de $650M por mês. Esperar custa caro.",
      ],
      pricing: [
        "A biblioteca é grátis para sempre — pessoas nunca pagam. Empresas só pagam 8–15% quando o dinheiro realmente cai.",
        "Sem recuperação, sem taxa — está escrito no plano de negócios. Cotado por escrito antes de você se comprometer.",
      ],
      faq: [
        "Aqui vivem as boas perguntas — incluindo “isso é assessoria jurídica?” (spoiler: não, não somos um escritório de advocacia).",
        "O FAQ cobre privacidade, elegibilidade e o que acontece depois de você protocolar. Dois minutos bem gastos.",
      ],
      waitlist: [
        "Última parada! Entre na lista de lançamento — ou pergunte qualquer coisa para a minha colega Goldie. Ela é a moedinha do canto.",
        "Já vai? Leve o checklist com você — a lista de lançamento recebe alertas de novos registros para os seus países.",
      ],
    },
    ask: {
      how: "Explique como a RecoveryOS funciona em termos simples.",
      library: "Como funciona a busca da Biblioteca Mundial e ela é realmente grátis?",
      channels: "Qual canal de recuperação se encaixa melhor na minha empresa?",
      scanner: "Como o scanner cruza as minhas compras com os fundos de acordos?",
      settlements: "Quais fundos de acordos ainda estão abertos e fecham em breve?",
      ieepa: "Como reivindico reembolsos de tarifas IEEPA pelo CAPE da CBP?",
      pricing: "Quanto custa a RecoveryOS e quando eu pago?",
      faq: "A RecoveryOS é legítima e isso é assessoria jurídica?",
      waitlist: "O que eu ganho ao entrar na lista de lançamento?",
    },
  },
};

export default pt;
