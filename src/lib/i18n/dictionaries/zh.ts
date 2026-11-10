import type { Dictionary } from "./en";

const zh: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "开始免费扫描",
    openMenu: "打开菜单",
    language: "语言",
    closeMenu: "关闭菜单",
  },
  header: {
    nav: [
      "运作方式",
      "世界图书馆",
      "追回渠道",
      "免费扫描器",
      "开放申领",
      "关税退还",
      "定价",
      "常见问题",
    ],
    ariaMainNav: "主导航",
    ariaMobileNav: "移动端导航",
    ariaHome: "RecoveryOS 首页",
  },
  hero: {
    pill: "美国最高法院以 6–3 裁定 IEEPA 关税无效",
    titleA: "全世界都有一笔被遗忘的",
    titleGold: "资金",
    titleB: "正在等待物归原主。",
    subtitle:
      "RecoveryOS 为地球上的每一座官方无主资金数据库绘制了地图——既为你的企业，也为你的个人姓名——随后代为准备、提交并追踪每一笔申领，直到款项汇入你的账户。",
    ctaScan: "开始免费扫描",
    ctaLibrary: "免费探索世界图书馆",
    trustNoFee: "不追回，不收费",
    trustOfficial: "直连每一个官方管理机构",
    trustDelete: "采购数据可应要求删除",
    deadlineLead: "本周即将截止：",
    deadlineBody:
      "猪肉基金（$117M）— 10月29日 · 火鸡基金（$71.5M+）— 10月30日。待决 IEEPA 退款的利息正以约 {interest}/月的速度累积——错过截止日期，正是企业每年痛失可追回资金的原因。",
    stat1: "最高法院裁决后仍待退还的 IEEPA 关税",
    stat2: "我们索引的 {markets} 个全球市场中已核实的无主资金",
    stat3: "据 CBP 估算尚未申领的复出口退税",
    stat4: "CAPE 上线头 6 天的退款申报量——这股淘金热是真的",
    ticker: [
      "IEEPA 关税退还 — $166B",
      "英国失踪养老金 — £31.1B",
      "法国 Ciclade — €7.87B",
      "印度 UDGAM — ₹67,000 crore",
      "韩国休眠资金 — ₩14T",
      "巴西 SVR — R$5.65B",
      "南非 — R88.5B",
      "猪肉反垄断基金 — $117M",
      "复出口退税 — $15B/yr",
      "火鸡反垄断 — $71.5M+",
      "澳大利亚遗失资金 — A$3B",
      "加拿大休眠资金 — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "运作方式",
    headingA: "每家企业都有应付账款团队。",
    headingGold: "却没有一家有资金追回团队。",
    lead:
      "应付账款盯着每一笔支出。却没有人盯着回流的钱——退款、和解金、复出口退税、费用纠差。RecoveryOS 就是那个缺失的部门，它的定价方式确保：只有当它自己赚回成本时，它才存在。",
    steps: [
      {
        title: "接入你的数据",
        text: "拖入一份采购导出文件——QuickBooks CSV、Stripe 或银行对账单，或者直接粘贴四十来行数据。大约四分钟搞定。在你点击扫描之前，任何数据都不会离开你的浏览器。",
      },
      {
        title: "我们逐行匹配",
        text: "引擎会将每一笔采购与开放中的集体诉讼窗口、税则条目及退税规则逐一比对——然后展示匹配了什么、为什么匹配，以及一份保守估算，供你在做任何承诺之前参考。",
      },
      {
        title: "支票到账——然后我们才收费",
        text: "申领通过官方管理机构或持牌合作伙伴提交。资金直接汇入你的账户。我们的成功费以书面报价，且只在钱到账时才收取。",
      },
    ],
  },
  library: {
    eyebrow: "世界图书馆",
    heading: "地球上每一座官方无主资金数据库。",
    headingGold: "永久免费。",
    leadBefore:
      "不只是美国，也不只是企业。在每一个主要经济体，都有资金被遗忘在官僚体系之下——",
    leadAfter:
      "。世界图书馆为每一笔这样的资金都编入了官方入口——面向所有人，价格 $0。",
    moneyWords: [
      "休眠账户",
      "失踪的养老金",
      "未领取的股息",
      "无主遗产",
      "被遗忘的存款",
      "未兑现的支票",
    ],
    stats: [
      { label: "个已收录市场" },
      { label: "座今日已上线的登记库" },
      { label: "个已核实的官方来源" },
      { label: "已核实金额，静待认领" },
    ],
    tickerLive: " — 已上线",
    tickerInLab: " — 筹备中",
    searchTitle: "找回被官僚体系遗忘的资金——",
    searchTitleGold: "就在你自己的名下。",
    searchLead:
      "一个名字，你的国家清单。我们会为你生成一份个人专属的官方数据库检索清单——每一条都免费，每一个链接都指向官方。",
    nameLabel: "要检索的姓名——只保存在你的浏览器中，绝不外发",
    namePlaceholder: "例如：王小明",
    countriesLabel: "你曾生活、工作或开设银行账户的国家",
    selectedCount: "已选 {count}/8",
    pickerPlaceholder: "搜索 {count} 个市场——美国、英国、肯尼亚、马来西亚……",
    pickerNoMatch:
      "没有与“{query}”匹配的市场——试试输入全名，例如“日本”。",
    buildChecklist: "生成我的免费清单",
    searchPrivacy:
      "永久免费，没有付费层级。我们仅保留你的检索记录，以便在你的国家有新登记库上线时提醒你——这就是我们的全部商业模式。随时可删除。",
    errorNameRequired: "请告诉我们你要检索的姓名。",
    errorNoCountries: "请至少选择一个你曾生活、工作或开设银行账户的国家。",
    errorSearchFailed: "检索失败，请重试。",
    errorNetwork: "网络错误——请重试。",
    closeResults: "关闭结果",
    checklistReadyOne: "清单已就绪——{count} 个国家",
    checklistReadyMany: "清单已就绪——{count} 个国家",
    officialDatabases: "个官方数据库",
    toSearch: "供你检索",
    resultPrivacy:
      "没有保存任何内容——这份清单只有你看得见。逐条查下去吧——大多数条目用不了 10 分钟。",
    databasesCount: "{count} 个数据库",
    openOfficialSearch: "打开官方检索",
    openTracker: "打开追踪器",
    regionsAriaLabel: "世界区域",
    sourceCountOne: "{count} 个官方来源",
    sourceCountMany: "{count} 个官方来源",
    inTheLab: "筹备中",
    badgeLive: "已上线",
    badgeResearching: "调研中",
    viewSources: "查看来源",
    launchesHere: "待申领路径核实完毕后，将在此上线。",
    referralEyebrow: "为自己找到了 $40？",
    referralTitle: "而你的企业名下，",
    referralTitleGold: "还躺着 100 倍。",
    referralText:
      "同样的官僚体系，换到公司规模：每一笔进口的关税退还、每一张采购订单上的集体诉讼、每一次复出口的退税。把扫描器对准你公司的账簿，看看真实数字。",
    runBusinessScan: "运行企业扫描",
    principles: [
      {
        title: "永久免费——以自助为先",
        text: "我们会把自行申领的方法原原本本告诉你，几分钟就能搞定。永远不需要中间人。个人用户永远没有付费层级，绝无例外。",
      },
      {
        title: "仅提供官方链接",
        text: "每个条目都直指政府数据库、中央银行或法院指定的管理机构。绝无仿冒网站。",
      },
      {
        title: "持续更新的数据",
        text: "每季度都有新的登记库上线。图书馆持续追踪，让你的清单永不过时。",
      },
    ],
    officialSourcesCount: "{count} 个官方来源",
    officialSite: "官方网站",
    addToSearch: "将{country}加入我的免费检索",
    footnoteIntro:
      "以上数字汇总自官方项目披露及主流媒体报道，截至2026年底——",
    footnoteOutro: "采取行动前，请务必在官方网站上核实。",
  },
  channels: {
    eyebrow: "追回渠道",
    headingA: "一台引擎，覆盖每一条让",
    headingGold: "企业资金沉淀的渠道。",
    lead:
      "单看每个渠道都很平淡——这里几个百分点，那里错过一笔基金。但把它们叠加到同一份采购数据上，就会复利式地汇成一条持续的资金追回流。",
    items: [
      {
        title: "集体诉讼和解金",
        stat: "数十亿美元",
        statLabel: "静候于各开放基金中，无人认领",
        description:
          "反垄断和解金会向企业偿付被多收的价款——从猪肉、火鸡到混凝土、包装材料，无所不包。但实际申领率极低——大多数买家从未提交过申领。",
        statusNote: "现已上线——追踪 5+ 个基金",
      },
      {
        title: "IEEPA 关税退还",
        stat: "$166B",
        statLabel: "须退还给 33 万家进口商",
        description:
          "最高法院以 6–3 裁定 IEEPA 关税无效。凡在此项下缴纳的关税，均可通过 CBP 的 CAPE 门户连本带息追回——各项截止日期将持续至 2027–2028 年。",
        statusNote: "现已上线——下方附计算器",
      },
      {
        title: "复出口关税退税",
        stat: "~$15B/yr",
        statLabel: "据 CBP 估算仍无人申领",
        description:
          "进口后复出口或销毁的货物，其已缴关税最高可追回 99%。而大多数中小企业从未提交过哪怕一笔退税申领。",
        statusNote: "现已上线——扫描中自动评估",
      },
      {
        title: "货运与包裹审计",
        stat: "$1B+",
        statLabel: "追回运费多收款的行业规模",
        description:
          "延迟配送、重复附加费和体积测量误差，每年悄悄漏掉 1–3% 的运费支出。审计公司要抽成 25–50%——我们将把它并入同一个平台。",
        statusNote: "2027年第一季度",
      },
      {
        title: "研发税收抵免",
        stat: "大多数",
        statLabel: "符合资质的中小企业从未申领",
        description:
          "美国、英国和欧盟的抵免项目，常年被符合条件的小公司错过。我们会预筛你的研发工程支出，并将成套材料交给持牌申报机构。",
        statusNote: "2027年第一季度",
      },
      {
        title: "无主财产（B2B）",
        stat: "$100–150B",
        statLabel: "由美国各州代管，含企业款项",
        description:
          "被遗忘的供应商贷项、未兑现的退款、陈年押金——休眠财产代管制度每年都在无声地吞噬企业的钱。我们持续清扫。",
        statusNote: "2027年第二季度",
      },
    ],
    ticker: [
      "最高法院 6–3——IEEPA 关税违法",
      "CAPE：上线头 6 天收到 75,300 份申报",
      "待决退款利息每月累加约 $650M",
      "复出口退税：最高可追回 99% 关税",
      "集体诉讼申领率：通常不足 10%",
      "每 10 个美国人就有 1 人在无主资金名单上",
      "猪肉基金 $117M——截止日期已追踪",
      "火鸡基金 $71.5M+——截止日期已追踪",
    ],
  },
  scanner: {
    eyebrow: "免费扫描器",
    headingA: "把你的采购数据交给我们。",
    headingGold: "钱，我们来找。",
    lead:
      "无需账户，也不上传给任何第三方——粘贴 QuickBooks、Stripe 或银行的导出数据，引擎会将每一行与实时追回渠道进行匹配。",
    tabs: {
      upload: "上传 CSV",
      paste: "粘贴数据",
    },
    upload: {
      chooseAriaLabel: "选择采购 CSV 文件",
      choose: "点击选择 CSV / TSV 文件",
      expectedColumns: "所需列：Date、Description、Amount",
    },
    paste: {
      label: "粘贴采购行",
      placeholder:
        "Date,Description,Amount\n2025-04-18,IEEPA 关税 — 中国零件,28500\n2016-09-02,培根肉块 — Smithfield,4120.50",
      hint: "CSV 或 TSV，每行一笔采购。QuickBooks、Stripe、Xero 及大多数银行导出文件可直接使用。",
    },
    loadSample: "手头没有数据？加载一份仿真示例",
    privacyNote: "我们只保存汇总扫描统计——绝不保存你的数据行。",
    preview: {
      usableRowsLabel: "个可用行",
      skipped: "已跳过 {count} 行",
      totalSpendLabel: "总支出：",
      colDate: "日期",
      colDescription: "描述",
      colAmount: "金额",
      moreRows: "……另有 {count} 行将被扫描。",
    },
    actions: {
      run: "开始扫描",
      scanning: "正在扫描渠道……",
      scanningAriaLabel: "正在扫描",
      clear: "清空",
    },
    toasts: {
      fileTooLargeTitle: "文件过大",
      fileTooLargeBody: "导出文件请保持在 5 MB 以内（约 10 万行）。",
      sampleLoadedTitle: "示例数据已加载",
      sampleLoadedBody: "来自一家虚构中型食品分销与进口商的 14 行数据。",
    },
    errors: {
      noUsableRows:
        "未找到可用数据行。需要 Date、Description、Amount 之类的列（CSV 或 TSV 格式，可由 QuickBooks、Stripe 或你的银行导出）。",
    },
    results: {
      complete: "扫描完成——已分析 {count} 行",
      foundLabel: "找到：",
      matchedChannelsOne: "覆盖 {count} 个匹配渠道。",
      matchedChannelsMany: "覆盖 {count} 个匹配渠道。",
      conservativeNote:
        "保守估算区间——最终到手金额取决于你的凭证质量及各基金收到的申领总量。",
      ieepaIncluded:
        "其中包含 {low}–{high} 的 IEEPA 关税退款（退还税款 + 法定利息，未计申报成本）。",
      missedClosed:
        "此外，你还错过了 {low}–{high} 已截止的申领。持续监控可确保这种事不再发生。",
      claimCta: "通过 RecoveryOS 申领",
      scanAnother: "扫描另一个文件",
    },
    match: {
      finalDay: "最后一天",
      daysLeft: "剩余 {count} 天",
      fundBadge: "基金：{size}",
      matchedPurchases: "匹配的采购（{count} 笔）",
      moreLines: "+ 另有 {count} 行",
      matchedVolumeLabel: "匹配金额：",
      estimatedRecovery: "预计追回金额",
      whoCanClaimLabel: "谁可申领： ",
      evidenceLabel: "所需凭证： ",
      claimCta: "通过 RecoveryOS 申领",
      closedCta: "已截止——加入关注清单",
      officialSite: "官方网站",
    },
    disclaimer:
      "各项估算仅作建模参考，不构成保证或法律意见。实际到账金额取决于申领质量、凭证以及各基金收到的申领总量。你始终可以直接向官方管理机构自行申领——每个基金页面均附链接。",
  },
  settlements: {
    eyebrow: "实时申领追踪",
    heading: "开放的基金，真实的截止日期。",
    lead:
      "下列每一笔基金都是公开立案、并设有官方管理机构的案件。我们持续追踪，让你的企业永远不会再在免费资金过期一周后才听到消息。",
    filterAria: "筛选基金",
    filters: [
      { label: "全部基金" },
      { label: "即将截止" },
      { label: "开放中" },
      { label: "核验期" },
      { label: "已截止（错过）" },
    ],
    statusOpen: "开放中",
    statusClosingSoon: "即将截止",
    statusClosed: "已截止——已错过",
    statusVerify: "核验期",
    deadlineVerify: "申领窗口——请与管理机构核实",
    daysMonitor: "监控中",
    daysPast: "已过期 {days} 天",
    lastDay: "最后一天",
    daysLeftCount: "剩余 {days} 天",
    fundBadge: "基金：{fund}",
    purchasesLabel: "采购额：",
    deadlineTerm: "截止日期：",
    eligibleLabel: "谁可申领：",
    testInScanner: "在扫描器中测试",
    officialSite: "官方网站",
    disclaimer:
      "基金事实、集体诉讼窗口及截止日期汇总自公开法庭卷宗与管理机构公告，截至2026年10月底。截止日期可能变动——依赖任何日期前，请务必在官方和解网站确认，或交由我们的监控关注清单持续盯守。",
  },
  ieepa: {
    eyebrow: "渠道聚焦——IEEPA",
    heading: "最高法院已推翻相关关税。现在，该把钱要回来了。",
    lead:
      "2026年2月20日，最高法院以 6–3 裁定 IEEPA 关税违法（{case}）。{importers} 家进口商在 {entries} 条报关记录中缴纳的约 {totalRefunds} 税款必须连本带息退还，退款通过 CBP 的 CAPE 门户办理——各项截止日期将持续至 {deadlines}。",
    capeLivePre: "CAPE 已于 {date} 上线。上线头六天，系统便收到了",
    capeLivePost: "份申报，覆盖 1120 万条报关记录——手快的中小企业先拿到钱。",
    interestPre: "利息以约 {rate}%/年的速率复利累积，折合每月约",
    interestPost: "——只要申报还在排队，这笔利息就会逐日滚大所有待决退款。",
    failedValidationPre: "已有约",
    failedValidationPost:
      "条报关记录在首次提交时便未通过 CAPE 校验——把数据准备做对，才是这场游戏的关键。",
    servicesText:
      "我们负责整理报关记录、修复校验错误、生成 CAPE 就绪文件，并追踪每一项截止日期。申报主体始终是你或你的持牌报关行——绝不玩牌照把戏。",
    estimatorTitle: "退款 + 利息估算器",
    estimatorNote: "仅供粗略参考——具体数字以你的报关记录为准。",
    principalLabel: "已缴 IEEPA 关税总额（USD）",
    dateLabel: "最近一次缴税日期",
    rateLabel: "利率（%/年）",
    includeInterestLabel: "计入截至目前已累积的利息（默认 ≈{rate}%/年）",
    dutiesBackLabel: "退还税款",
    interestLabel: "利息",
    totalLabel: "合计",
    dripLine: "自你打开本页起，美国待决 IEEPA 退款上已累积的利息：",
    ctaButton: "准备我的 CAPE 申领",
    disclaimer:
      "仅涵盖基于 IEEPA 的关税（中国 / 加拿大 / 墨西哥航线）。第 232/301 条关税不受本次裁决影响。",
  },
  pricing: {
    eyebrow: "定价",
    headingA: "个人永久免费。只有当",
    headingGold: "资金到账，才收费。",
    lead:
      "世界图书馆将永远分文不取——每一次检索都让遗失资金的地图更清晰，而这张地图正是我们的盈利来源。企业只需支付成功费，且只针对实际到账的资金。",
    alwaysFreeBadge: "永久免费",
    plans: [
      {
        name: "个人版——世界图书馆",
        price: "$0",
        cadence: "永久免费 · 无层级、无绑卡、无套路",
        cta: "检索 20 个国家",
        features: [
          "我们索引的全球每一座官方无主资金数据库",
          "个人清单生成器——输入名字，输出来源",
          "你的国家新增登记库时自动提醒",
          "直达官方检索入口——我们绝不从中作梗",
          "为自己、为父母、为祖辈检索",
        ],
      },
      {
        name: "企业资金追回",
        price: "预付 $0",
        cadence: "此后按追回金额的 8–15% 收取",
        cta: "开始免费扫描",
        features: [
          "申领材料准备与凭证打包",
          "CAPE 就绪文件 + 校验错误修复",
          "经由官方管理机构或持牌合作伙伴申报",
          "截止日期追踪，直至资金到账",
          "承诺前书面报价——不追回，不收费",
        ],
      },
      {
        name: "合作伙伴与数据",
        price: "定制",
        cadence: "收入分成 · API · 洞察报告",
        cta: "与我们联系",
        features: [
          "面向报关行、代理机构与行业协会",
          "为客户名单批量准备申领材料",
          "匹配引擎的 API 访问权限",
          "随市场扩展而聚合的登记库覆盖",
          "客户关系归你——机器我们来运转",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    heading: "问得有理，答得直白。",
    items: [
      {
        question: "我是个人，不是企业——这个服务适合我吗？",
        answer:
          "适合——通过这座永久免费的“活图书馆”即可。个人完全可以自己在几分钟内挖出无主财产、到期储蓄债券、未领取养老金、退税及消费者集体诉讼基金：每个条目都会注明谁有资格、需要哪些凭证，并附上官方免费工具的链接。付费引擎（扫描、申领准备、申报）是为企业设计的——只有企业级申领金额才值得这份工作。对个人申领而言，通过图书馆自助几乎永远是最快的路径。",
      },
      {
        question: "这是法律意见吗？你们是律所吗？",
        answer:
          "不是。RecoveryOS 不是律所，也不提供法律意见。我们做的是数据工作：解析、匹配、凭证打包、校验与追踪。申领均向法院指定的官方管理机构提交；若某司法辖区要求持牌律师，我们会与律师合作。任何申领你都可以免费自行提交——我们列出了每个管理机构的网站链接，方便你随时自己动手。",
      },
      {
        question: "估算有多准？",
        answer:
          "它们是刻意从紧的保守区间，依据已公布的基金规模及同类反垄断与关税追回案的典型赔付率测算。你的最终到账金额取决于有凭证支撑的采购规模、申领质量以及该基金收到的申领总量。在你作出任何承诺之前，我们都会就每笔申领提供书面的成功费报价。",
      },
      {
        question: "你们需要什么数据？数据会如何处理？",
        answer:
          "一份采购导出文件——Date、Description、Amount 三列——来自 QuickBooks、Stripe、Xero 或你的银行。免费扫描只保存汇总统计（扫描行数、命中匹配数）。你的行级数据绝不会被出售或共享，且可应要求删除。申报时，你只与官方管理机构共享凭证。",
      },
      {
        question: "我何时、以何种方式付费？",
        answer:
          "无需预付。当追回资金到账时，我们才会开具成功费发票（8–15%，通常为 12%）。监控服务为固定 $99/月的订阅，可随时取消——首发合作伙伴免费 12 个月。来自和解金和 CBP 的资金始终直接汇入你的企业账户，绝不经过我们之手。",
      },
      {
        question: "为什么不直接请律所？",
        answer:
          "问得好——有时确实应该请。贸易律师收费 $300–800/小时，而且仍然需要你先把数据整理好。我们以零财务风险完成数据层工作，我们准备的申领材料包能让任何律师用起来更便宜。对于简单的基金申领，带着现成材料包走管理机构通道，通常根本不需要律师。",
      },
      {
        question: "目前哪些渠道已上线？接下来还有什么？",
        answer:
          "现已上线：集体诉讼和解申领、IEEPA 关税退还准备，以及复出口退税筛查。2027年第一季度将新增货运与包裹审计追回、研发税收抵免预筛。2027年第二季度将新增 B2B 无主财产清扫。所有渠道都运行在同一份已接入的采购数据上——你无需额外操心。",
      },
      {
        question: "我们总部在美国以外。这跟我们有关吗？",
        answer:
          "只要你对美国有过出口或自美国进口，就可能受影响：IEEPA 退款覆盖所有登记进口商，反垄断基金则覆盖在美国商业活动中发生的采购。我们正在筹建欧盟/英国退款渠道。告诉我们你的运营地区，我们会为你标出适用的项目。",
      },
    ],
  },
  waitlist: {
    eyebrow: "首发名单",
    headingA: "被找到的钱，应该先找到",
    headingGold: "你。",
    lead:
      "首发名额包含 12 个月免费监控、创始成员成功费率（8%），以及将你 2024–2026 年采购数据与所有开放基金的首轮比对扫描。",
    perks: ["无需绑卡，无任何承诺", "上线后可随时取消"],
    spotsClaimed: "已认领的首发名额",
    spotsNote: "名额按注册顺序发放——进度条只会朝一个方向走。",
    successTitle: "成功入列，欢迎登船。",
    successText:
      "我们将向你发送上线引导材料，以及最临近截止基金的文件清单。如果你在 2025 年关税下有过任何进口，请回复一个大致的关税金额，我们即可启动 IEEPA 估算。",
    emailLabel: "工作邮箱 *",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "公司",
    companyPlaceholder: "公司名称",
    volumeLabel: "月度采购金额",
    volumePlaceholder: "请选择区间",
    volumeOptions: ["$10K 以下", "$10–50K", "$50–250K", "$250K–1M", "$1M 以上"],
    channelsLabel: "你对哪些追回项目感兴趣？",
    channelOptions: [
      "集体诉讼和解",
      "IEEPA 关税退还",
      "复出口退税",
      "货运与包裹审计",
    ],
    submitLabel: "认领我的首发名额",
    savingLabel: "保存中……",
    privacyNote: "我们只发与你资金相关的邮件，绝无其他。一键即可退出。",
    invalidEmailTitle: "请输入有效邮箱",
    invalidEmailDescription: "一个地址就够了。",
    joinedToastTitle: "你已进入名单",
    joinedToastDescription: "首发名额按注册顺序发放。请留意收件箱。",
    errorToastTitle: "出了点问题",
    errorToastDescription: "请稍后再试。",
  },
  footer: {
    about:
      "中小企业的资金追回部门——也为所有其他人提供一座免费的“遗忘资金活图书馆”。我们为每一条让资金沉淀的渠道绘制地图：集体诉讼、关税退还、复出口退税、无主财产。支票到账，你才付费。",
    productTitle: "产品",
    channelsTitle: "追回渠道",
    product: [
      "运作方式",
      "世界图书馆",
      "免费扫描器",
      "开放申领",
      "IEEPA 计算器",
      "定价",
    ],
    channelsNav: [
      "全部渠道",
      "集体诉讼",
      "关税退还",
      "复出口退税",
      "首发名单",
    ],
    legal1:
      "RecoveryOS 不是律师事务所、会计师事务所，也不是持牌报关行，本站任何内容均不构成法律、税务或财务建议。活图书馆链接的均为官方政府数据库与法院指定的管理机构——个人始终可以免费直接申领。追回估算仅是基于公开卷宗与历史赔付率的建模参考；实际追回金额取决于你的凭证、资格以及各基金收到的申领总量。",
    legal2:
      "和解基金事实、集体诉讼窗口及截止日期汇总自公开法庭卷宗与官方管理机构公告（截至2026年10月底），如有变动恕不另行通知。依赖任何日期前，请务必向官方和解管理机构核实。申领始终由你本人或通过正式持牌的合作伙伴提交，资金则直接汇入你的账户。",
    copyright: "© 2026 RecoveryOS. 保留所有权利。",
    ariaProduct: "产品",
    ariaChannels: "追回渠道",
  },
  claim: {
    title: "通过 RecoveryOS 申领",
    titleDone: "申领材料包已申请",
    descriptionDone: "请查收邮箱——我们只会索要管理机构真正需要的文件。",
    descriptionContext:
      "我们将为 {context} 准备申领文件，并与官方管理机构确认每一项截止日期。资金到账后，你才需要付费。",
    descriptionDefault:
      "我们将准备申领文件、与官方管理机构确认截止日期，并持续申报直至资金到账。只有钱落入你的账户时，你才需要付费。",
    nextStepsTitle: "后续步骤",
    nextSteps: [
      "把采购凭证（发票 / 导出文件）发给我们。",
      "我们校验申领并书面报价成功费。",
      "资金始终直接汇入你的企业账户。",
    ],
    emailLabel: "工作邮箱",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "公司",
    companyPlaceholder: "公司名称",
    submit: "获取我的申领材料包",
    submitting: "保存中……",
    footerNote:
      "不追回，不收费。你始终可以通过官方管理机构自行申领——我们为每个基金都附有链接。",
    invalidEmailTitle: "请输入有效邮箱",
    invalidEmailBody: "我们需要一个邮箱地址来发送你的申领材料包。",
    queuedTitle: "你已进入队列",
    queuedBody: "我们会与你联系，送上申领材料包及所需的确切文件。",
    errorTitle: "出了点问题",
    errorBody: "请稍后再试。",
  },
  assistant: {
    openChat: "打开 Goldie AI 聊天",
    closeChat: "关闭 Goldie 聊天",
    chatDialog: "Goldie AI 助手对话",
    askGoldie: "有什么都可以问 Goldie",
    online: "在线 · 可用任何语言回答",
    aiScout: "AI 侦察员",
    reset: "重置对话",
    send: "发送消息",
    placeholder: "想问什么，尽管问 Goldie……",
    disclaimer:
      "AI 回答可能不尽完美——基金详情请以本页链接的官方管理机构为准。",
    greeting:
      "你好！我是 **Goldie**，你的 RecoveryOS 侦察向导。关于无主资金的任何问题都可以问我——世界图书馆、和解金截止日期、关税退还，或者扫描器如何运作。你想用什么语言，我就用什么语言回答。",
    suggestions: [
      "如何免费查找无主资金？",
      "IEEPA 的 $166B 退款是怎么回事？",
      "扫描器真的保护隐私吗？",
      "什么是无主资金？",
    ],
  },
  guide: {
    welcome:
      "欢迎！我是 Scout——我在站点里四处巡逻，在你滚动页面时投下小提示。随时点我，就能和我们的 AI 助手 Goldie 聊天。",
    dismiss: "关闭提示",
    mute: "本次浏览期间关闭提示",
    unmute: "提示已关闭——点击开启",
    avatarLabel: "Scout，站点向导——点击与 Goldie 聊天",
    askGoldie: "就本版块向 Goldie 提问",
    tips: {
      how: [
        "初次到访？这条横幅展示了完整流程——扫描、核验、申领。任何一步都无需注册即可试用。",
        "三个步骤，零成本探索。扫描器还内置了一份仿真示例，一键即可运行。",
      ],
      library: [
        "悄悄说——你在这里输入的名字绝不会离开你的浏览器。选好你的国家，即可免费获得一份官方登记库清单。",
        "50 个市场、66+ 个官方来源。试试选择土耳其或阿联酋——覆盖范围远不止美国。",
      ],
      channels: [
        "六条追回渠道都在这里。光是那张发亮的 IEEPA 卡片，就对应着 $166B 的可退关税。",
        "仅复出口退税一项，每年就有约 $15B 被留在桌上。货运审计、研发抵免——大多数企业从未查过。",
      ],
      scanner: [
        "试试“加载一份仿真示例”——14 行演示采购能找出约 $47K。你的文件绝不会离开这个浏览器。",
        "扫描器就在浏览器里解析你的 CSV——不上传、无账户、零存储。",
      ],
      settlements: [
        "截止日期就是一切。按剩余天数排序——爱荷华州 Ready-Mix 基金 11月16日截止。",
        "每张卡片都直连法院指定的管理机构。没有中间商，没有寻金抽成。",
      ],
      ieepa: [
        "2025 年起缴过关税？最高法院已推翻 IEEPA 关税——每一美元都可连本带息退回。去计算器里试试 $120,000。",
        "待决 IEEPA 退款的利息每月累积约 $650M。等待的代价很高。",
      ],
      pricing: [
        "图书馆永久免费——个人永远不付费。企业只在资金真正到账时支付 8–15%。",
        "不追回，不收费——这条写进了我们的商业计划。你承诺之前，一切费用书面报价。",
      ],
      faq: [
        "好问题都集中在这里——包括“这是法律意见吗？”（剧透一下：不是，我们不是律所）。",
        "常见问题涵盖隐私、资格以及提交申领后会发生什么。值得花上两分钟。",
      ],
      waitlist: [
        "最后一站！加入首发名单——或者直接问我的同事 Goldie 任何问题。她就是角落里的那枚金币。",
        "要走了？把清单带上——首发名单会为你所在的国家推送新登记库提醒。",
      ],
    },
    ask: {
      how: "用简单的语言解释 RecoveryOS 如何运作。",
      library: "世界图书馆的检索是如何运作的？真的免费吗？",
      channels: "哪条追回渠道最适合我的企业？",
      scanner: "扫描器如何把我的采购与和解基金匹配？",
      settlements: "哪些和解基金仍开放、即将截止？",
      ieepa: "我该如何通过 CBP CAPE 申领 IEEPA 关税退款？",
      pricing: "RecoveryOS 收费多少？我什么时候付费？",
      faq: "RecoveryOS 可信吗？这算法律意见吗？",
      waitlist: "加入首发名单能得到什么？",
    },
  },
};

export default zh;
