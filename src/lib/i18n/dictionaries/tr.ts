import type { Dictionary } from "./en";

const tr: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Ücretsiz taramayı başlat",
    openMenu: "Menüyü aç",
    language: "Dil",
    closeMenu: "Menüyü kapat",
  },
  header: {
    nav: [
      "Nasıl çalışır",
      "Dünya kütüphanesi",
      "Kanallar",
      "Ücretsiz tarama",
      "Açık talepler",
      "Tarife iadesi",
      "Fiyatlandırma",
      "SSS",
    ],
    ariaMainNav: "Ana gezinme",
    ariaMobileNav: "Mobil gezinme",
    ariaHome: "RecoveryOS ana sayfası",
  },
  hero: {
    pill: "Yüce Mahkeme IEEPA gümrük vergilerini 6–3 ile iptal etti",
    titleA: "Dünya, hakkı olan ",
    titleGold: "parayı",
    titleB: " unutmuş durumda.",
    subtitle:
      "RecoveryOS, yeryüzündeki tüm resmî sahipsiz para veritabanlarını haritalar — işiniz için ve kendi adınız için — sonra talepleri dosyalar ve izler, ta ki ödemeler hesabınıza ulaşıncaya kadar.",
    ctaScan: "Ücretsiz taramayı başlat",
    ctaLibrary: "Dünya kütüphanesini keşfedin — ücretsiz",
    trustNoFee: "Para dönmezse ücret yok",
    trustOfficial: "Her resmî yöneticiye doğrudan bağlantı",
    trustDelete: "Satın alma verileri talep üzerine silinir",
    deadlineLead: "Bu hafta kapanıyor:",
    deadlineBody:
      "Domuz fonu ($117M) — 29 Eki · Hindi fonları ($71.5M+) — 30 Eki. Bekleyen IEEPA iadelerine faiz kabaca {interest}/ay işliyor — son tarihler, işletmelerin her yıl kurtarılabilir parayı kaybetmesinin asıl sebebidir.",
    stat1: "Yüce Mahkeme kararının ardından bekleyen IEEPA iadesi",
    stat2: "indekslediğimiz {markets} dünya pazarındaki doğrulanmış sahipsiz para",
    stat3: "talep edilmemiş gümrük iadesi, CBP tahminlerine göre",
    stat4: "ilk 6 gündeki CAPE iade başvurusu — altına hücum gerçek",
    ticker: [
      "IEEPA Tarife İadeleri — $166B",
      "İngiltere Kayıp Emeklilikler — £31.1B",
      "Fransa Ciclade — €7.87B",
      "Hindistan UDGAM — ₹67,000 crore",
      "Kore Atıl Hesaplar — ₩14T",
      "Brezilya SVR — R$5.65B",
      "Güney Afrika — R88.5B",
      "Domuz Rekabet Fonu — $117M",
      "Gümrük İadesi — $15B/yr",
      "Hindi Rekabet Fonu — $71.5M+",
      "Avustralya Kayıp Paralar — A$3B",
      "Kanada Atıl Hesaplar — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Nasıl çalışır",
    headingA: "Her işletmenin bir borçlar ekibi vardır.",
    headingGold: "Hiçbirinin tahsilat ekibi yoktur.",
    lead:
      "Borçlar ekibi gideni izler. Geri geleni kimse izlemez — iadeler, uzlaşmalar, drawback, ücret düzeltmeleri. RecoveryOS işte o eksik departmandır; yalnızca kendini amorti ettiğinde var olacak şekilde fiyatlanmıştır.",
    steps: [
      {
        title: "Verinizi bağlayın",
        text: "Bir satın alma dosyası bırakın — QuickBooks CSV'si, Stripe/banka ekstresi ya da yapıştıracağınız kırk satır. Yaklaşık dört dakika sürer. Taramayı başlatana kadar hiçbir şey tarayıcınızdan çıkmaz.",
      },
      {
        title: "Her satırı eşleştiriyoruz",
        text: "Motor, her satın almayı açık toplu dava pencereleriyle, tarife kalemleriyle ve drawback kurallarıyla karşılaştırır — sonra neyin eşleştiğini, neden eşleştiğini ve herhangi bir taahhütte bulunmadan önce ihtiyatlı bir tahmini gösterir.",
      },
      {
        title: "Ödemeler gelir — sonra biz ücretimizi alırız",
        text: "Talepler resmî yöneticiler veya lisanslı ortaklar üzerinden dosyalanır. Fonlar doğrudan hesabınıza akar. Başarı ücretimiz yazılı olarak belirtilir ve yalnızca para hesabınıza geçtiğinde tahsil edilir.",
      },
    ],
  },
  library: {
    eyebrow: "Dünya Kütüphanesi",
    heading: "Yeryüzündeki tüm resmî sahipsiz para veritabanları.",
    headingGold: "Sonsuza dek ücretsiz.",
    leadBefore:
      "Yalnızca Amerika değil, yalnızca işletmeler de değil. Para, her büyük ekonomide bürokrasinin altında unutulmuş halde bekliyor —",
    leadAfter:
      ". Dünya Kütüphanesi, her birinin resmî kapısını indeksler — herkes için, $0 karşılığında.",
    moneyWords: [
      "atıl hesaplar",
      "kayıp emeklilikler",
      "alınmamış temettüler",
      "sahipsiz miraslar",
      "unutulmuş mevduat",
      "tahsil edilmemiş çekler",
    ],
    stats: [
      { label: "pazar indekslendi" },
      { label: "kayıt bugün canlı" },
      { label: "resmî kaynak doğrulandı" },
      { label: "doğrulandı — sahibini bekliyor" },
    ],
    tickerLive: " — canlı",
    tickerInLab: " — laboratuvarda",
    searchTitle: "Bürokrasinin unuttuğu parayı bulun —",
    searchTitleGold: "kendi adınıza.",
    searchLead:
      "Bir isim, sizin ülkeleriniz. Aramanız gereken resmî veritabanlarının kişisel kontrol listesini sizin için oluştururuz — her kayıt ücretsiz, her bağlantı resmî.",
    nameLabel: "Aranacak isim — tarayıcınızda kalır, hiçbir yere gönderilmez",
    namePlaceholder: "örn. Elif Yılmaz",
    countriesLabel: "Yaşadığınız, çalıştığınız veya banka hesabı açtığınız ülkeler",
    selectedCount: "{count}/8 seçildi",
    pickerPlaceholder: "{count} pazarda arayın — ABD, İngiltere, Kenya, Malezya…",
    pickerNoMatch:
      "“{query}” ile eşleşen pazar yok — tam adı deneyin, örn. “Japonya”.",
    buildChecklist: "Kontrol listemi ücretsiz oluştur",
    searchPrivacy:
      "Sonsuza dek ücretsiz, kademesiz. Aramanızı kayıtlarımızda tutuyoruz ki ülkeleriniz için yeni kayıtlar devreye girdiğinde sizi uyarabilelim — modelimizin tamamı bu. Dilediğiniz an silin.",
    errorNameRequired: "Lütfen aranacak ismi belirtin.",
    errorNoCountries: "En az bir ülke seçin — yaşadığınız, çalıştığınız veya banka hesabı açtığınız ülkelerden.",
    errorSearchFailed: "Arama başarısız oldu. Tekrar deneyin.",
    errorNetwork: "Ağ hatası — tekrar deneyin.",
    closeResults: "Sonuçları kapat",
    checklistReadyOne: "{count} ülke için liste hazır",
    checklistReadyMany: "{count} ülke için liste hazır",
    officialDatabases: "resmî veritabanı",
    toSearch: "aramak için",
    resultPrivacy:
      "Hiçbir şey kaydedilmedi — bu listeyi yalnızca siz görebilirsiniz. Listenin üzerinden geçin — çoğu kayıt 10 dakikadan kısa sürer.",
    databasesCount: "{count} veritabanı",
    openOfficialSearch: "Resmî aramayı aç",
    openTracker: "Takip aracını aç",
    regionsAriaLabel: "Dünya bölgeleri",
    sourceCountOne: "{count} resmî kaynak",
    sourceCountMany: "{count} resmî kaynak",
    inTheLab: "Laboratuvarda",
    badgeLive: "Canlı",
    badgeResearching: "Araştırılıyor",
    viewSources: "Kaynakları görüntüle",
    launchesHere: "Talep yollarını doğruladıkça burada devreye girer.",
    referralEyebrow: "Kendiniz için $40 mı buldunuz?",
    referralTitle: "İşletmenizin hakkı",
    referralTitleGold: "100 kat daha fazla.",
    referralText:
      "Aynı bürokrasi, bu kez şirket ölçeğinde: her ithalatta tarife iadesi, her satın alma siparişinde toplu davalar, her yeniden ihracatta drawback. Tarama aracını şirketinizin defterlerine doğrultun ve gerçek rakamı görün.",
    runBusinessScan: "İşletme taramasını başlat",
    principles: [
      {
        title: "Sonsuza dek ücretsiz — önce kendin yap",
        text: "Başvuruyu dakikalar içinde nasıl kendiniz yapacağınızı adım adım anlatırız. Aracıya asla ihtiyaç yok. Bireyler için ücretli kademe yok, nokta.",
      },
      {
        title: "Yalnızca resmî bağlantılar",
        text: "Her kayıt devlet veritabanına, merkez bankasına veya mahkemece atanan yöneticiye gider. Taklit siteler yok.",
      },
      {
        title: "Canlı veri",
        text: "Her çeyrekte yeni kayıtlar devreye giriyor. Kütüphane bunları sürekli izler, böylece kontrol listeniz asla bayatlamaz.",
      },
    ],
    officialSourcesCount: "{count} resmî kaynak",
    officialSite: "Resmî site",
    addToSearch: "{country} ülkesini ücretsiz aramama ekle",
    footnoteIntro:
      "Rakamlar, 2026 sonuna ait resmî program açıklamalarından ve büyük basından derlenmiştir —",
    footnoteOutro: "Hareket etmeden önce daima resmî sitede doğrulayın.",
  },
  channels: {
    eyebrow: "Kanallar",
    headingA: "Tek motor, işletme parasının sıkıştığı",
    headingGold: "her kanal.",
    lead:
      "Her kanal tek başına sıkıcıdır — burada birkaç yüzde, orada kaçırılmış bir fon. Ama aynı satın alma verisi üzerine üst üste koyulduğunda düzenli bir tahsilat akışına dönüşür.",
    items: [
      {
        title: "Toplu Dava Tazminatları",
        stat: "Milyarlar",
        statLabel: "açık fonlarda sahipsiz bekliyor",
        description:
          "Rekabet hukuku uzlaşmaları, işletmelere domuzdan hindiye, betondan ambalaja her şeydeki fazla ödemeleri geri öder. Başvuru oranları çok düşük — çoğu alıcı hiç başvurmaz.",
        statusNote: "Şimdi canlı — 5+ fon izleniyor",
      },
      {
        title: "IEEPA Tarife İadeleri",
        stat: "$166B",
        statLabel: "330K ithalatçıya iade kararı",
        description:
          "Yüce Mahkeme IEEPA gümrük vergilerini 6–3 ile iptal etti. Bunlar altında ödenen her vergi, CBP'nin CAPE portalı üzerinden faiziyle geri alınabilir — son tarihler 2027–2028'e uzanıyor.",
        statusNote: "Şimdi canlı — aşağıda hesaplayıcı",
      },
      {
        title: "Gümrük İadesi (Drawback)",
        stat: "~$15B/yr",
        statLabel: "talep edilmiyor, CBP tahmini",
        description:
          "Sonradan ihraç edilen veya imha edilen ithal ürünlerdeki vergilerin %99'una kadarı geri alınabilir. Çoğu KOBİ bugüne dek tek bir drawback başvurusu bile yapmamıştır.",
        statusNote: "Şimdi canlı — inceleme taramaya dahil",
      },
      {
        title: "Yük ve Kargo Denetimleri",
        stat: "$1B+",
        statLabel: "navlun fazla ödemelerini geri kazanan sektör",
        description:
          "Gecikmeler, mükerrer ek ücretler ve hacim hataları taşımacılık bütçesinin %1–3'ünü sızdırır. Denetim firmaları %25–50 başarı ücreti alır — biz bunu tek platformda birleştireceğiz.",
        statusNote: "1. çeyrek 2027",
      },
      {
        title: "Ar-Ge Vergi Kredileri",
        stat: "Çoğu",
        statLabel: "hak kazanan KOBİ asla başvurmaz",
        description:
          "ABD, İngiltere ve AB kredi programları, hak kazanan küçük şirketler tarafından düzenli olarak talep edilmez. Mühendislik harcamalarınızı ön tarar ve paketleri lisanslı bir hazırlayıcıya teslim ederiz.",
        statusNote: "1. çeyrek 2027",
      },
      {
        title: "Sahipsiz Varlıklar (B2B)",
        stat: "$100–150B",
        statLabel: "ABD eyaletlerinde tutuluyor, işletmeler dahil",
        description:
          "Unutulmuş tedarikçi alacakları, tahsil edilmemiş iadeler, eski mevduat — atıl hesap devri her yıl sessizce işletme parasını yutuyor. Biz bunu sürekli tararız.",
        statusNote: "2. çeyrek 2027",
      },
    ],
    ticker: [
      "Yüce Mahkeme 6–3 — IEEPA vergileri hükümsüz",
      "CAPE: ilk 6 günde 75.300 başvuru",
      "Bekleyen iadelerde faiz ≈ $650M/ay işliyor",
      "Drawback: vergilerin %99'una kadarı geri alınabilir",
      "Toplu dava başvuru oranları: genellikle %10'un altında",
      "Her 10 Amerikalı'dan biri sahipsiz para listesinde",
      "Domuz fonu $117M — son tarihi izleniyor",
      "Hindi fonları $71.5M+ — son tarihi izleniyor",
    ],
  },
  scanner: {
    eyebrow: "Ücretsiz tarama aracı",
    headingA: "Satın almalara bizi doğrultun.",
    headingGold: "Parayı biz bulalım.",
    lead:
      "Hesap yok, üçüncü taraflara yükleme yok — QuickBooks, Stripe veya bankanızdan bir dosya yapıştırın; motor her satırı canlı tahsilat kanallarıyla eşleştirsin.",
    tabs: {
      upload: "CSV yükle",
      paste: "Veri yapıştır",
    },
    upload: {
      chooseAriaLabel: "Satın alma CSV dosyası seçin",
      choose: "CSV / TSV dosyası seçmek için tıklayın",
      expectedColumns: "Beklenen sütunlar: Date, Description, Amount",
    },
    paste: {
      label: "Satın alma satırlarını yapıştırın",
      placeholder:
        "Date,Description,Amount\n2025-04-18,IEEPA tarifesi — Çin parçaları,28500\n2016-09-02,Dilim pastırma — Smithfield,4120.50",
      hint: "CSV veya TSV, satır başına bir satın alma. QuickBooks, Stripe, Xero ve çoğu banka dosyası olduğu gibi çalışır.",
    },
    loadSample: "Elinizde veri yok mu? Gerçekçi bir örnek yükleyin",
    privacyNote: "Yalnızca toplam tarama istatistiklerini saklarız — satırlarınızı asla.",
    preview: {
      usableRowsLabel: "kullanılabilir satır",
      skipped: "{count} atlandı",
      totalSpendLabel: "Toplam harcama:",
      colDate: "Tarih",
      colDescription: "Açıklama",
      colAmount: "Tutar",
      moreRows: "…ve {count} satır daha taranacak.",
    },
    actions: {
      run: "Taramayı başlat",
      scanning: "Kanallar taranıyor…",
      scanningAriaLabel: "Taranıyor",
      clear: "Temizle",
    },
    toasts: {
      fileTooLargeTitle: "Dosya çok büyük",
      fileTooLargeBody: "Dosyaları 5 MB altında tutun (~100 bin satır).",
      sampleLoadedTitle: "Örnek veri yüklendi",
      sampleLoadedBody: "Kurgusal bir orta ölçekli gıda dağıtıcısı ve ithalatçısından 14 satır.",
    },
    errors: {
      noUsableRows:
        "Kullanılabilir satır bulunamadı. Date, Description, Amount gibi sütunlar bekleniyor (CSV veya TSV; QuickBooks, Stripe veya bankanızdan dışa aktarma).",
    },
    results: {
      complete: "Tarama tamamlandı — {count} satır analiz edildi",
      foundLabel: "Bulunan:",
      matchedChannelsOne: "{count} eşleşen kanalda.",
      matchedChannelsMany: "{count} eşleşen kanalda.",
      conservativeNote:
        "İhtiyatlı aralıklar — nihai ödeme, kanıtlarınıza ve her fona yapılan toplam başvuru sayısına bağlıdır.",
      ieepaIncluded:
        "{low}–{high} tutarında IEEPA tarife iadesini içerir (vergiler + yasal faiz, başvuru maliyetleri öncesi).",
      missedClosed:
        "Ayrıca çoktan kapanmış taleplerde {low}–{high} kaçırdınız. İzleme, bunun bir daha yaşanmamasını sağlar.",
      claimCta: "RecoveryOS ile talep et",
      scanAnother: "Başka bir dosyayı tara",
    },
    match: {
      finalDay: "Son gün",
      daysLeft: "{count} gün kaldı",
      fundBadge: "Fon: {size}",
      matchedPurchases: "Eşleşen satın almalar ({count})",
      moreLines: "+ {count} satır daha",
      matchedVolumeLabel: "Eşleşen hacim:",
      estimatedRecovery: "Tahmini tahsilat",
      whoCanClaimLabel: "Kim talep edebilir: ",
      evidenceLabel: "Kanıtlar: ",
      claimCta: "RecoveryOS ile talep et",
      closedCta: "Kapandı — izleme listesine katıl",
      officialSite: "Resmî site",
    },
    disclaimer:
      "Tahminler modelleme yardımcılarıdır; garanti veya hukuki tavsiye değildir. Ödemeler, talep kalitesine, kanıtlara ve her fonun aldığı toplam başvuru sayısına bağlıdır. Dilediğiniz zaman doğrudan resmî yöneticiye başvurabilirsiniz — her fonda bağlantıları verilir.",
  },
  settlements: {
    eyebrow: "Canlı talep takibi",
    heading: "Açık fonlar, gerçek son tarihler.",
    lead:
      "Aşağıdaki her fon, resmî bir yöneticisi bulunan, kamuya açık dosyalanmış bir davadır. Biz onları izleriz ki işletmeniz, bedava paradan süresi dolduktan bir hafta sonra haberdar olmasın.",
    filterAria: "Fonları filtrele",
    filters: [
      { label: "Tüm fonlar" },
      { label: "Yakında kapanıyor" },
      { label: "Açık" },
      { label: "Doğrulama penceresi" },
      { label: "Kapandı (kaçırıldı)" },
    ],
    statusOpen: "Açık",
    statusClosingSoon: "Yakında kapanıyor",
    statusClosed: "Kapandı — kaçırıldı",
    statusVerify: "Doğrulama penceresi",
    deadlineVerify: "Başvuru penceresi — yöneticiyle doğrulayın",
    daysMonitor: "izleniyor",
    daysPast: "{days} gün geçti",
    lastDay: "son gün",
    daysLeftCount: "{days} gün kaldı",
    fundBadge: "Fon: {fund}",
    purchasesLabel: "Satın almalar:",
    deadlineTerm: "Son tarih:",
    eligibleLabel: "Kim talep edebilir:",
    testInScanner: "Tarama aracında test et",
    officialSite: "Resmî site",
    disclaimer:
      "Fon bilgileri, toplu dava pencereleri ve son tarihler, kamu dosyalarından ve yönetici duyurularından 2026 Ekim sonu itibarıyla derlenmiştir. Son tarihler değişir — herhangi bir tarihe güvenmeden önce daima resmî uzlaşma sitesinde teyit edin ya da izleme listemiz sürekli yapsın.",
  },
  ieepa: {
    eyebrow: "Kanal odağı — IEEPA",
    heading: "Yüce Mahkeme vergileri iptal etti. Şimdi paranın geri gelmesi gerekiyor.",
    lead:
      "20 Şubat 2026'da Mahkeme, IEEPA vergilerinin hukuken geçersiz olduğuna 6–3 karar verdi ({case}). {importers} ithalatçı tarafından {entries} beyanname üzerinden ödenen yaklaşık {totalRefunds} tutarın, faiziyle birlikte iade edilmesi gerekiyor — CBP'nin CAPE portalı üzerinden; son tarihler {deadlines} dönemine kadar uzanıyor.",
    capeLivePre: "CAPE {date} tarihinde devreye girdi. İlk altı gününde",
    capeLivePost:
      "başvuru aldı — 11,2 milyon beyannameyi kapsıyor; hızlı davranan KOBİ'ler önce ödenir.",
    interestPre: "Faiz kabaca %{rate}/yıl bileşik işliyor — tüm bekleyen iadelerde ayda yaklaşık",
    interestPost: "faiz birikiyor, başvurular kuyrukta beklerken.",
    failedValidationPre: "Yaklaşık",
    failedValidationPost:
      "beyanname ilk sunuşta CAPE doğrulamasını geçemedi — mesele tamamen doğru veri hazırlığında.",
    servicesText:
      "Biz beyannameleri hazırlar, doğrulama hatalarını düzeltir, CAPE'e hazır dosyalar üretir ve her son tarihi izleriz. Dosyalama sizde veya lisanslı müşavirinizde kalır — lisans oyunları yok.",
    estimatorTitle: "İade + faiz hesaplayıcı",
    estimatorNote: "Yalnızca pratik bir ölçüt — kesin rakamı beyannameleriniz belirler.",
    principalLabel: "Toplam ödenen IEEPA vergisi (USD)",
    dateLabel: "Son tarife ödemesi",
    rateLabel: "Faiz oranı (%/yıl)",
    includeInterestLabel: "Bugüne biriken faizi dahil et (varsayılan ≈%{rate}/yıl)",
    dutiesBackLabel: "Vergi iadesi",
    interestLabel: "Faiz",
    totalLabel: "Toplam",
    dripLine:
      "Bu sayfayı açtığınızdan beri ABD'nin bekleyen IEEPA iadelerinde biriken faiz:",
    ctaButton: "CAPE başvurumu hazırla",
    disclaimer:
      "Yalnızca IEEPA kaynaklı vergileri kapsar (Çin / Kanada / Meksika rotaları). 232/301 bölümü vergileri karardan etkilenmez.",
  },
  pricing: {
    eyebrow: "Fiyatlandırma",
    headingA: "Bireylere ücretsiz. Ücret yalnızca",
    headingGold: "para hareket ettiğinde.",
    lead:
      "Dünya Kütüphanesi asla tek kuruş maliyet çıkarmayacak — her arama kayıp para haritasını keskinleştirir ve biz bu haritayla kazanırız. İşletmeler başarı ücreti öder ve yalnızca gerçekten geri gelen paradan.",
    alwaysFreeBadge: "Her zaman ücretsiz",
    plans: [
      {
        name: "Bireyler — Dünya Kütüphanesi",
        price: "$0",
        cadence: "sonsuza dek ücretsiz · kademe yok, kart yok, cilve yok",
        cta: "20 ülkede arama yap",
        features: [
          "İndekslediğimiz tüm resmî sahipsiz para veritabanları, dünya genelinde",
          "Kişisel kontrol listesi oluşturucu — isim girin, kaynaklar çıksın",
          "Ülkeleriniz için yeni kayıt uyarıları",
          "Resmî aramaya doğrudan bağlantılar — asla araya girmeyiz",
          "Kendiniz, anneniz-babanız ve dedeleriniz için arayın",
        ],
      },
      {
        name: "İşletme tahsilatı",
        price: "Peşin $0",
        cadence: "sonra kurtarılan fonların %8–15'i",
        cta: "Ücretsiz taramayı başlat",
        features: [
          "Başvuru hazırlama ve kanıt paketleme",
          "CAPE'e hazır dosyalar + doğrulama düzeltmeleri",
          "Resmî yöneticiler veya lisanslı ortaklar üzerinden dosyalama",
          "Paralar gelene dek son tarih takibi",
          "Taahhüt öncesi yazılı teklif — para dönmezse ücret yok",
        ],
      },
      {
        name: "Ortaklar ve veri",
        price: "Özel",
        cadence: "gelir paylaşımı · API · içgörüler",
        cta: "Bize ulaşın",
        features: [
          "Gümrük müşavirleri, ajanlar ve dernekler için",
          "Müşteri portföyleri için toplu başvuru hazırlığı",
          "Eşleştirme motoruna API erişimi",
          "Pazarları genişlettikçe toplanan kayıt kapsamı",
          "Müşteri ilişkisi sizde kalır — makineyi biz çalıştırırız",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "SSS",
    heading: "Haklı sorular, net cevaplar.",
    items: [
      {
        question: "Ben bireyim, işletme değilim — bu benim için mi?",
        answer:
          "Evet — sonsuza dek ücretsiz Canlı Kütüphane üzerinden. Bireyler sahipsiz malları, vadesi dolan tasarruf tahvillerini, alınmamış emeklilikleri, vergi iadelerini ve tüketici toplu dava fonlarını dakikalar içinde kendileri çıkartabilir: her kayıt kimin hak sahibi olduğunu, hangi kanıtların gerektiğini ve resmî ücretsiz araca bağlantıyı gösterir. Ücretli motor (tarama, başvuru hazırlama, dosyalama) işletmeler içindir; orada talep büyüklüğü emeği haklı çıkarır — kişisel talepler için kütüphaneyle kendin-yap neredeyse her zaman en hızlı yoldur.",
      },
      {
        question: "Bu hukuki tavsiye mi? Bir hukuk bürosu musunuz?",
        answer:
          "Hayır. RecoveryOS bir hukuk bürosu değildir ve hukuki tavsiye vermez. Biz veri işi yaparız: ayrıştırma, eşleştirme, kanıt paketleme, doğrulama ve izleme. Talepler, mahkemece atanan resmî yöneticilere dosyalanır; bir yargı alanı lisanslı avukat gerektiriyorsa onlarla ortak oluruz. Herhangi bir talebi daima kendiniz ücretsiz dosyalayabilirsiniz — diye her yöneticinin sitesine bağlantı veririz.",
      },
      {
        question: "Tahminler ne kadar isabetli?",
        answer:
          "Bilinçli olarak ihtiyatlı aralıklardır; yayımlanmış fon büyüklüklerine ve benzer antitröst ve tarife tahsilatlarındaki tipik ödeme oranlarına dayanır. Nihai ödemeniz, belgelenmiş satın alma hacminize, talep kalitenize ve fonun aldığı başvuru sayısına bağlıdır. Herhangi bir taahhütte bulunmadan önce talep başına yazılı bir başarı ücreti teklif ederiz.",
      },
      {
        question: "Hangi verilere ihtiyacınız var, onlara ne oluyor?",
        answer:
          "QuickBooks, Stripe, Xero veya bankanızdan bir satın alma dosyası — Date, Description, Amount. Ücretsiz tarama yalnızca toplam istatistikleri saklar (taranan satır sayısı, bulunan eşleşmeler). Satır bazlı verileriniz asla satılmaz veya paylaşılmaz; talep üzerine silinir. Dosyalama için kanıtları yalnızca resmî yöneticiyle paylaşırsınız.",
      },
      {
        question: "Ne zaman ve nasıl öderim?",
        answer:
          "Peşin hiçbir şey ödemezsiniz. Tahsilat hesabınıza geçtiğinde başarı ücretimiz (%8–15, genellikle %12) faturalanır. İzleme, dilediğiniz an iptal edebileceğiniz sabit $99/ay'lık bir aboneliktir — lansman ortaklarına 12 ay ücretsizdir. Uzlaşmalardan ve CBP'den gelen paralar daima doğrudan işletme hesabınıza akar, asla bizim üzerinden değil.",
      },
      {
        question: "Neden doğrudan bir hukuk bürosu tutmayayım?",
        answer:
          "Güzel soru — bazen tam da öyle yapmalısınız. Dış ticaret avukatı saatte $300–800 ücret alır ve yine de verilerinizin düzenlenmiş olmasını ister. Biz veri katmanını sıfır finansal riskle yaparız; talep paketlerimiz herhangi bir avukatın kullanımını ucuzlatır. Basit fon taleplerinde, hazırlanmış bir paketle yönetici yolu genellikle hiç avukat gerektirmez.",
      },
      {
        question: "Bugün hangi kanallar canlı, sırada ne var?",
        answer:
          "Şu an canlı: toplu dava uzlaşma başvuruları, IEEPA tarife iadesi hazırlığı ve drawback taraması. 1. çeyrek 2027'de yük ve kargo denetimi ile Ar-Ge vergi kredisi ön taraması eklenir. 2. çeyrek 2027'de B2B sahipsiz varlık taraması eklenir. Her kanal aynı bağlı satın alma verisiyle çalışır — sizden ek iş çıkmaz.",
      },
      {
        question: "ABD dışındayız. Bu bizi kapsar mı?",
        answer:
          "ABD'ye ihraç ettiyseniz veya ABD'den ithal ettiyseniz kapsanabilirsiniz: IEEPA iadeleri kayıtlı her ithalatçıyı, antitröst fonları ise ABD ticaretinde yapılan satın alımları kapsar. Sırada AB/İngiltere iade kanalları var. Nerede faaliyet gösterdiğinizi söyleyin, size neyin geçerli olduğunu işaretleyelim.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Lansman listesi",
    headingA: "Bulunan para önce",
    headingGold: "sizi bulmalı.",
    lead:
      "Lansman yerleri 12 ay ücretsiz izleme, kurucu üye başarı ücreti fiyatı (%8) ve 2024–2026 satın almalarınızın tüm açık fonlara karşı ilk tur taramasını içerir.",
    perks: ["Kart yok, taahhüt yok", "Devreye girdiğinde dilediğiniz an iptal edin"],
    spotsClaimed: "Lansman yeri alındı",
    spotsNote: "Yerler kayıt sırasına göre dağılır — bar yalnızca tek yönde hareket eder.",
    successTitle: "Listedesiniz. Hoş geldiniz.",
    successText:
      "Lansman onboarding'inizi ve kapanmaya en yakın fonların belge kontrol listesini göndereceğiz. 2025 tarifeleri altında bir şey ithal ettiyseniz, kabaca bir vergi rakamıyla yanıtlayın — IEEPA tahminini başlatalım.",
    emailLabel: "İş e-postanız *",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Şirket",
    companyPlaceholder: "Şirket adı",
    volumeLabel: "Aylık satın alma hacmi",
    volumePlaceholder: "Bir aralık seçin",
    volumeOptions: ["$10K altı", "$10–50K", "$50–250K", "$250K–1M", "$1M üzeri"],
    channelsLabel: "Hangi tahsilatlar ilginizi çekiyor?",
    channelOptions: [
      "Toplu dava uzlaşmaları",
      "IEEPA tarife iadeleri",
      "Gümrük iadesi (drawback)",
      "Yük ve kargo denetimleri",
    ],
    submitLabel: "Lansman yerimi ayır",
    savingLabel: "Kaydediliyor…",
    privacyNote: "Yalnızca paranızla ilgili e-posta yollarız, başka hiçbir şeyle değil. Ayrılmak tek tık.",
    invalidEmailTitle: "Geçerli bir e-posta girin",
    invalidEmailDescription: "Tek bir adres yeterli.",
    joinedToastTitle: "Listedesiniz",
    joinedToastDescription: "Lansman yerleri kayıt sırasına göre dağılır. Gelen kutunuzu takip edin.",
    errorToastTitle: "Bir şeyler ters gitti",
    errorToastDescription: "Lütfen birazdan tekrar deneyin.",
  },
  footer: {
    about:
      "Küçük işletmeler için tahsilat departmanı — ve herkes için, unutulmuş paralarla dolu ücretsiz bir Canlı Kütüphane. Paranın sıkıştığı her kanalı haritalarız: toplu davalar, tarife iadeleri, drawback, sahipsiz varlıklar. Ödemeyi yalnızca paralar geldiğinde yaparsınız.",
    productTitle: "Ürün",
    channelsTitle: "Kanallar",
    product: [
      "Nasıl çalışır",
      "Dünya Kütüphanesi",
      "Ücretsiz tarama",
      "Açık talepler",
      "IEEPA hesaplayıcı",
      "Fiyatlandırma",
    ],
    channelsNav: [
      "Tüm kanallar",
      "Toplu davalar",
      "Tarife iadeleri",
      "Gümrük iadesi",
      "Lansman listesi",
    ],
    legal1:
      "RecoveryOS bir hukuk bürosu, muhasebeci veya lisanslı gümrük müşaviri değildir ve bu sitedeki hiçbir şey hukuki, vergisel veya finansal tavsiye değildir. Canlı Kütüphane resmî devlet veritabanlarına ve mahkemece atanan yöneticilere bağlanır — bireyler daima doğrudan ve ücretsiz başvuru yapabilir. Tahsilat tahminleri, kamu dosyalarına ve geçmiş ödeme oranlarına dayanan modelleme yardımcılarıdır; gerçek tahsilatlar kanıtlarınıza, hak sahipliğinize ve her fonun aldığı toplam başvuru sayısına bağlıdır.",
    legal2:
      "Uzlaşma fonu bilgileri, toplu dava pencereleri ve son tarihler, kamu mahkeme dosyalarından ve resmî yönetici duyurularından 2026 Ekim sonu itibarıyla derlenmiştir ve habersiz değişebilir. Son tarihlere güvenmeden önce daima resmî uzlaşma yöneticisiyle teyit edin. Talepler daima sizin tarafınızdan veya usulünce lisanslanmış ortaklar üzerinden dosyalanır ve fonlar doğrudan hesabınıza akar.",
    copyright: "© 2026 RecoveryOS. Tüm hakları saklıdır.",
    ariaProduct: "Ürün",
    ariaChannels: "Kanallar",
  },
  claim: {
    title: "RecoveryOS ile talep et",
    titleDone: "Talep paketi istendi",
    descriptionDone:
      "Gelen kutunuzu kontrol edin — yalnızca yöneticinin gerçekten istediği belgeleri isteriz.",
    descriptionContext:
      "{context} için evrakları hazırlayacağız ve her son tarihi resmî yöneticiyle teyit edeceğiz. Yalnızca paralar geldiğinde ödersiniz.",
    descriptionDefault:
      "Evrakları hazırlayacağız, son tarihleri resmî yöneticiyle teyit edecek ve paralar gelene dek dosyalayacağız. Ödemeyi yalnızca para hesabınıza geçtiğinde yaparsınız.",
    nextStepsTitle: "Sonraki adımlar",
    nextSteps: [
      "Satın alma kanıtlarınızı bize gönderin (faturalar / dosyalar).",
      "Talebi doğrular ve başarı ücretini yazılı olarak iletiriz.",
      "Fonlar daima doğrudan işletme hesabınıza akar.",
    ],
    emailLabel: "İş e-postanız",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Şirket",
    companyPlaceholder: "Şirket adı",
    submit: "Talep paketimi al",
    submitting: "Kaydediliyor…",
    footerNote:
      "Para dönmezse ücret yok. Dilediğiniz zaman resmî yönetici üzerinden kendiniz başvurabilirsiniz — her fonun bağlantısını veririz.",
    invalidEmailTitle: "Geçerli bir e-posta girin",
    invalidEmailBody: "Talep paketinizi gönderebilmemiz için bir adres gerekli.",
    queuedTitle: "Sıradasınız",
    queuedBody: "Talep paketiniz ve gereken kesin belgelerle size ulaşacağız.",
    errorTitle: "Bir şeyler ters gitti",
    errorBody: "Lütfen birazdan tekrar deneyin.",
  },
  assistant: {
    openChat: "Goldie AI sohbetini aç",
    closeChat: "Goldie sohbetini kapat",
    chatDialog: "Goldie AI asistan sohbeti",
    askGoldie: "Goldie'ye her şeyi sorun",
    online: "Çevrimiçi · her dilde yanıtlar",
    aiScout: "AI izci",
    reset: "Konuşmayı sıfırla",
    send: "Mesaj gönder",
    placeholder: "Goldie'ye her şeyi sorun…",
    disclaimer:
      "AI yanıtları kusurlu olabilir — fon ayrıntılarını bu sayfada bağlantısı verilen resmî yöneticilerle doğrulayın.",
    greeting:
      "Merhaba! Ben **Goldie**, RecoveryOS izciniz. Sahipsiz para hakkında her şeyi sorun — Dünya Kütüphanesi, uzlaşma son tarihleri, tarife iadeleri ya da tarama aracının nasıl çalıştığı. İstediğiniz her dilde yanıt veririm.",
    suggestions: [
      "Sahipsiz parayı ücretsiz nasıl bulabilirim?",
      "IEEPA $166B iadesi nedir?",
      "Tarama aracı gerçekten gizli mi?",
      "Sahipsiz para nedir?",
    ],
  },
  guide: {
    welcome:
      "Hoş geldiniz! Ben Goldie — sitede gezinip siz kaydırdıkça ipuçları bırakıyorum. AI asistanımızla konuşmak için bana dilediğiniz an tıklayın.",
    dismiss: "İpucunu kapat",
    mute: "Bu ziyaret için ipuçlarını kapat",
    unmute: "İpuçları kapalı — açın",
    avatarLabel: "Goldie, site rehberi — AI ile konuşmak için tıklayın",
    askGoldie: "Goldie'ye bu bölümü sorun",
    tips: {
      how: [
        "Yeni misiniz? Bu şerit tüm akışı gösterir — tara, doğrula, talep et. Denemek için kayıt gerekmez.",
        "Üç adım, keşif ücretsiz. Tarama aracında tek tıkla çalıştırabileceğiniz gerçekçi bir örnek bile var.",
      ],
      library: [
        "Pssst — buraya yazdığınız isim asla tarayıcınızdan çıkmaz. Ülkelerinizi seçin ve resmî kayıtların ücretsiz kontrol listesini alın.",
        "50 pazar, 66'dan fazla resmî kaynak. Türkiye ya da BAE'yi seçmeyi deneyin — kapsam Amerika'nın çok ötesine uzanıyor.",
      ],
      channels: [
        "Altı tahsilat kanalı burada yaşıyor. Parlayan IEEPA kartı tek başına $166B değerinde geri alınabilir vergi demek.",
        "Drawback tek başına yılda ~$15B masada bırakılan para demek. Yük denetimleri, Ar-Ge kredileri — çoğu işletme hiç kontrol etmez.",
      ],
      scanner: [
        "“Gerçekçi bir örnek yükle”yi deneyin — 14 satırlık demo satın alma yaklaşık $47K buluyor. Dosyanız asla bu tarayıcıdan çıkmaz.",
        "Tarama aracı CSV'nizi tam burada, tarayıcıda ayrıştırır — yükleme yok, hesap yok, hiçbir şey saklanmaz.",
      ],
      settlements: [
        "Son tarihler her şeydir. Kalan güne göre sıralayın — Iowa'daki Ready-Mix fonu 16 Kasım'da kapanıyor.",
        "Her kart doğrudan mahkemece atanan yöneticiye bağlanır. Aracı yok, bulucu ücreti yok.",
      ],
      ieepa: [
        "2025 ve sonrasında tarife ödediniz mi? Yüce Mahkeme IEEPA vergilerini iptal etti — her dolar faiziyle geri alınabilir. Hesaplayıcıda $120,000 deneyin.",
        "Bekleyen IEEPA iadelerinde faiz kabaca ayda $650M birikiyor. Beklemek pahalıya patlar.",
      ],
      pricing: [
        "Kütüphane sonsuza dek ücretsiz — bireyler asla ödemez. İşletmeler yalnızca para gerçekten hesabına geçtiğinde %8–15 öder.",
        "Para dönmezse ücret yok — bu, iş planına yazılmıştır. Taahhüt öncesi yazılı olarak bildirilir.",
      ],
      faq: [
        "İyi sorular burada — “bu hukuki tavsiye mi?” dahil (spoiler: hayır, biz bir hukuk bürosu değiliz).",
        "SSS gizliliği, hak sahipliğini ve dosyaladıktan sonrasını kapsar. İyi harcanmış iki dakika.",
      ],
      waitlist: [
        "Son durak! Lansman listesine katılın — ya da AI asistanımıza aklınızdaki her şeyi sorun: buradan bana ya da köşedeki kıvılcım düğmesine tıklayın.",
        "Gidiyor musunuz? Kontrol listesini yanınıza alın — lansman listesi, ülkeleriniz için yeni kayıt uyarıları alır.",
      ],
    },
    ask: {
      how: "RecoveryOS'un nasıl çalıştığını basitçe anlat.",
      library: "Dünya Kütüphanesi araması nasıl çalışır ve gerçekten ücretsiz mi?",
      channels: "Hangi tahsilat kanalı işletmeme en uygun?",
      scanner: "Tarama aracı satın almalarımı uzlaşma fonlarıyla nasıl eşleştiriyor?",
      settlements: "Hangi uzlaşma fonları hâlâ açık ve yakında kapanıyor?",
      ieepa: "IEEPA tarife iadelerini CBP CAPE üzerinden nasıl talep ederim?",
      pricing: "RecoveryOS ne tutar ve ne zaman öderim?",
      faq: "RecoveryOS güvenilir mi ve hukuki tavsiye sayılır mı?",
      waitlist: "Bekleme listesine katılmakla ne kazanırım?",
    },
  },
};

export default tr;
