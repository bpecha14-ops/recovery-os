import type { Dictionary } from "./en";

const id: Dictionary = {
  common: {
    beta: "Beta",
    runFreeScan: "Jalankan pemindaian gratis",
    openMenu: "Buka menu",
    language: "Bahasa",
    closeMenu: "Tutup menu",
  },
  header: {
    nav: [
      "Cara kerja",
      "World Library",
      "Kanal",
      "Scanner gratis",
      "Klaim terbuka",
      "Pengembalian tarif",
      "Harga",
      "FAQ",
    ],
    ariaMainNav: "Navigasi utama",
    ariaMobileNav: "Navigasi seluler",
    ariaHome: "Beranda RecoveryOS",
  },
  hero: {
    pill: "Mahkamah Agung membatalkan tarif IEEPA dengan hasil 6–3",
    titleA: "Dunia ini dihutangi ",
    titleGold: "uang",
    titleB: " yang terlupakan.",
    subtitle:
      "RecoveryOS memetakan setiap basis data dana tak terklaim resmi di Bumi — untuk bisnis Anda dan untuk nama Anda sendiri — lalu mengajukan dan memantau klaim hingga cek tiba di akun Anda.",
    ctaScan: "Jalankan pemindaian gratis",
    ctaLibrary: "Jelajahi World Library — gratis",
    trustNoFee: "Tanpa pemulihan, tanpa biaya",
    trustOfficial: "Setiap administrator resmi tertaut",
    trustDelete: "Data pembelian dihapus atas permintaan",
    deadlineLead: "Ditutup pekan ini:",
    deadlineBody:
      "Dana babi ($117M) — 29 Okt · Dana kalkun ($71.5M+) — 30 Okt. Bunga atas pengembalian IEEPA yang tertunda terakumulasi sekitar {interest}/bulan — batas waktu adalah alasan bisnis kehilangan uang yang dapat dipulihkan setiap tahun.",
    stat1: "Pengembalian IEEPA tertunda setelah putusan Mahkamah Agung",
    stat2: "dana tak terklaim terverifikasi di {markets} pasar dunia yang kami indeks",
    stat3: "duty drawback tak terklaim, menurut estimasi CBP",
    stat4: "pengajuan pengembalian CAPE dalam 6 hari pertama — perburuan emas itu nyata",
    ticker: [
      "Pengembalian Tarif IEEPA — $166B",
      "Pensiun Hilang Inggris — £31.1B",
      "Ciclade Prancis — €7.87B",
      "UDGAM India — ₹67,000 crore",
      "Rekening Menganggur Korea — ₩14T",
      "SVR Brasil — R$5.65B",
      "Afrika Selatan — R88.5B",
      "Dana Antitrust Babi — $117M",
      "Duty Drawback — $15B/yr",
      "Antitrust Kalkun — $71.5M+",
      "Uang Hilang Australia — A$3B",
      "Rekening Menganggur Kanada — CA$1.6B",
    ],
  },
  how: {
    eyebrow: "Cara kerja",
    headingA: "Setiap bisnis memiliki tim AP.",
    headingGold: "Tak satu pun punya tim pemulihan dana.",
    lead: "Tim account payable mengawasi apa yang keluar. Tak seorang pun mengawasi apa yang kembali — pengembalian dana, penyelesaian, drawback, koreksi biaya. RecoveryOS adalah departemen yang hilang itu, dengan harga yang membuatnya hanya ada ketika mampu membayar dirinya sendiri.",
    steps: [
      {
        title: "Hubungkan data Anda",
        text: "Letakkan ekspor pembelian — CSV QuickBooks, mutasi Stripe/bank, atau empat puluh baris yang Anda tempel. Berlangsung sekitar empat menit. Tidak ada yang keluar dari browser Anda sampai Anda menekan pindai.",
      },
      {
        title: "Kami mencocokkan setiap baris",
        text: "Mesin membandingkan setiap pembelian dengan jendela kelas yang terbuka, pos tarif, dan aturan drawback — lalu menampilkan apa yang cocok, mengapa, dan estimasi konservatif sebelum Anda berkomitmen pada apa pun.",
      },
      {
        title: "Cek tiba — baru kami dibayar",
        text: "Klaim diproses melalui administrator resmi atau mitra berlisensi. Dana mengalir langsung ke akun Anda. Biaya sukses kami dikutip secara tertulis dan hanya ditagih saat uang mendarat.",
      },
    ],
  },
  library: {
    eyebrow: "World Library",
    heading: "Setiap basis data dana tak terklaim resmi di Bumi.",
    headingGold: "Gratis selamanya.",
    leadBefore:
      "Bukan hanya Amerika, dan bukan hanya bisnis. Uang mengendap terlupakan di bawah birokrasi di setiap ekonomi besar —",
    leadAfter:
      ". World Library mengindeks pintu resmi ke masing-masing, untuk siapa pun, dengan $0.",
    moneyWords: [
      "rekening menganggur",
      "pensiun yang hilang",
      "dividen tak terklaim",
      "harta tanpa pewaris",
      "deposito terlupakan",
      "cek yang tak dicairkan",
    ],
    stats: [
      {
        label: "pasar terindeks",
      },
      {
        label: "registri aktif hari ini",
      },
      {
        label: "sumber resmi terverifikasi",
      },
      {
        label: "terverifikasi menunggu diklaim",
      },
    ],
    tickerLive: " — aktif",
    tickerInLab: " — di laboratorium",
    searchTitle: "Temukan uang yang dilupakan birokrasi —",
    searchTitleGold: "atas nama Anda sendiri.",
    searchLead:
      "Satu nama, negara-negara Anda. Kami menyusun daftar periksa pribadi berisi basis data resmi untuk dicari — setiap entri gratis, setiap tautan resmi.",
    nameLabel: "Nama yang dicari — tetap di browser Anda, tidak pernah dikirim ke mana pun",
    namePlaceholder: "mis. Maria Gonzalez",
    countriesLabel: "Negara tempat Anda tinggal, bekerja, atau memiliki rekening",
    selectedCount: "{count}/8 dipilih",
    pickerPlaceholder: "Cari {count} pasar — AS, Inggris, Kenya, Malaysia…",
    pickerNoMatch:
      "Tidak ada pasar yang cocok dengan “{query}” — coba nama lengkapnya, mis. “Jepang”.",
    buildChecklist: "Buat daftar periksa gratis saya",
    searchPrivacy:
      "Gratis selamanya, tanpa tingkatan. Kami menyimpan pencarian Anda agar dapat memberi tahu saat registri baru aktif untuk negara Anda — itulah keseluruhan modelnya. Hapus kapan saja.",
    errorNameRequired: "Sebutkan nama yang ingin dicari.",
    errorNoCountries:
      "Pilih setidaknya satu negara tempat Anda tinggal, bekerja, atau memiliki rekening.",
    errorSearchFailed: "Pencarian gagal. Coba lagi.",
    errorNetwork: "Kesalahan jaringan — coba lagi.",
    closeResults: "Tutup hasil",
    checklistReadyOne: "Daftar periksa siap untuk {count} negara",
    checklistReadyMany: "Daftar periksa siap untuk {count} negara",
    officialDatabases: "basis data resmi",
    toSearch: "untuk dicari",
    resultPrivacy:
      "Tidak ada yang disimpan — hanya Anda yang dapat melihat daftar periksa ini. Kerjakan daftarnya — kebanyakan entri selesai dalam waktu kurang dari 10 menit.",
    databasesCount: "{count} basis data",
    openOfficialSearch: "Buka pencarian resmi",
    openTracker: "Buka pelacak",
    regionsAriaLabel: "Wilayah dunia",
    sourceCountOne: "{count} sumber resmi",
    sourceCountMany: "{count} sumber resmi",
    inTheLab: "Di laboratorium",
    badgeLive: "Aktif",
    badgeResearching: "Diriset",
    viewSources: "Lihat sumbernya",
    launchesHere: "Aktif di sini saat kami memverifikasi jalur klaimnya.",
    referralEyebrow: "Menemukan $40 untuk diri sendiri?",
    referralTitle: "Bisnis Anda berhak atas",
    referralTitleGold: "100× lipatnya.",
    referralText:
      "Birokrasi yang sama, pada skala perusahaan: pengembalian tarif atas setiap impor, gugatan kelompok atas setiap pesanan pembelian, drawback atas setiap re-ekspor. Arahkan scanner ke pembukuan perusahaan Anda dan lihat angka sebenarnya.",
    runBusinessScan: "Jalankan pemindaian bisnis",
    principles: [
      {
        title: "Gratis selamanya — mandiri lebih dulu",
        text: "Kami memberi tahu persis cara mengajukan sendiri, dalam hitungan menit. Tanpa perantara, selamanya. Tanpa tingkatan berbayar untuk perorangan, titik.",
      },
      {
        title: "Hanya tautan resmi",
        text: "Setiap entri mengarah ke basis data pemerintah, bank sentral, atau administrator yang ditunjuk pengadilan. Tanpa situs kembaran.",
      },
      {
        title: "Data yang hidup",
        text: "Registri baru aktif setiap kuartal. Perpustakaan memantaunya terus-menerus sehingga daftar periksa Anda tidak pernah usang.",
      },
    ],
    officialSourcesCount: "{count} sumber resmi",
    officialSite: "Situs resmi",
    addToSearch: "Tambahkan {country} ke pencarian gratis saya",
    footnoteIntro:
      "Angka disusun dari pengungkapan program resmi dan media besar per akhir 2026 —",
    footnoteOutro: "Selalu verifikasi di situs resmi sebelum bertindak.",
  },
  channels: {
    eyebrow: "Kanal",
    headingA: "Satu mesin, setiap kanal tempat",
    headingGold: "uang bisnis macet.",
    lead: "Setiap kanal membosankan bila berdiri sendiri — beberapa persen di sini, satu dana yang terlewat di sana. Tumpuklah keduanya ke data pembelian yang sama, dan keduanya berbunga menjadi arus pemulihan yang berulang.",
    items: [
      {
        title: "Penyelesaian Gugatan Kelompok",
        stat: "Miliaran",
        statLabel: "mengendap tak terklaim di seluruh dana terbuka",
        description:
          "Penyelesaian antitrust membayar bisnis atas kelebihan biaya pada segala hal dari babi dan kalkun hingga beton dan kemasan. Tingkat klaimnya sangat kecil — kebanyakan pembeli tidak pernah mengajukan.",
        statusNote: "Aktif sekarang — 5+ dana dipantau",
      },
      {
        title: "Pengembalian Tarif IEEPA",
        stat: "$166B",
        statLabel: "diperintahkan kembali ke 330 ribu importir",
        description:
          "Mahkamah Agung membatalkan tarif IEEPA dengan hasil 6–3. Setiap bea yang dibayarkan di bawahnya dapat dikembalikan beserta bunga melalui portal CAPE milik CBP — batas waktu berlangsung hingga 2027–2028.",
        statusNote: "Aktif sekarang — kalkulator di bawah",
      },
      {
        title: "Duty Drawback",
        stat: "~$15B/yr",
        statLabel: "tak terklaim, menurut estimasi CBP",
        description:
          "Hingga 99% bea atas barang impor yang kemudian diekspor atau dimusnahkan dapat direklamasi. Kebanyakan UKM tidak pernah mengajukan satu pun klaim drawback.",
        statusNote: "Aktif sekarang — tinjauan termasuk dalam pemindaian",
      },
      {
        title: "Audit Kargo & Paket",
        stat: "$1B+",
        statLabel: "industri yang memulihkan kelebihan biaya pengiriman",
        description:
          "Pengiriman terlambat, biaya tambahan ganda, dan kesalahan dimensi membocorkan 1–3% belanja pengiriman. Perusahaan audit mengambil kontingensi 25–50% — kami akan meleburkannya dalam satu platform.",
        statusNote: "Q1 2027",
      },
      {
        title: "Kredit Pajak R&D",
        stat: "Sebagian besar",
        statLabel: "UKM yang memenuhi syarat tidak pernah mengajukan klaim",
        description:
          "Program kredit AS, Inggris, dan UE rutin tak terklaim oleh perusahaan kecil yang memenuhi syarat. Kami melakukan prapenyaringan atas belanja teknik Anda dan menyerahkan paketnya ke penyusun berlisensi.",
        statusNote: "Q1 2027",
      },
      {
        title: "Harta Tak Terklaim (B2B)",
        stat: "$100–150B",
        statLabel: "ditahan negara bagian AS, bisnis termasuk",
        description:
          "Kredit vendor yang terlupakan, pengembalian yang tak dicairkan, deposito lama — escheatment akibat dormansi diam-diam menyerap uang bisnis setiap tahun. Kami menyapunya terus-menerus.",
        statusNote: "Q2 2027",
      },
    ],
    ticker: [
      "Mahkamah Agung AS 6–3 — tarif IEEPA melanggar hukum",
      "CAPE: 75.300 pengajuan dalam 6 hari pertama",
      "Bunga terakumulasi ≈ $650M/bulan atas pengembalian tertunda",
      "Drawback: hingga 99% bea dapat direklamasi",
      "Tingkat klaim gugatan kelompok: biasanya di bawah 10%",
      "1 dari 10 orang Amerika tercatat di daftar dana tak terklaim",
      "Dana babi $117M — batas waktu dipantau",
      "Dana kalkun $71.5M+ — batas waktu dipantau",
    ],
  },
  scanner: {
    eyebrow: "Scanner gratis",
    headingA: "Arahkan kami ke pembelian Anda.",
    headingGold: "Kami yang menemukan uangnya.",
    lead: "Tanpa akun, tanpa unggah ke pihak ketiga — tempelkan ekspor dari QuickBooks, Stripe, atau bank Anda dan mesin mencocokkan setiap baris dengan kanal pemulihan yang aktif.",
    tabs: {
      upload: "Unggah CSV",
      paste: "Tempel data",
    },
    upload: {
      chooseAriaLabel: "Pilih berkas CSV pembelian",
      choose: "Klik untuk memilih berkas CSV / TSV",
      expectedColumns: "Kolom yang diharapkan: Tanggal, Deskripsi, Jumlah",
    },
    paste: {
      label: "Tempelkan baris pembelian",
      placeholder:
        "Tanggal,Deskripsi,Jumlah\n2025-04-18,Bea IEEPA — komponen Tiongkok,28500\n2016-09-02,Daging bacon — Smithfield,4120.50",
      hint: "CSV atau TSV, satu pembelian per baris. Ekspor QuickBooks, Stripe, Xero, dan kebanyakan bank berfungsi apa adanya.",
    },
    loadSample: "Tidak punya data? Muat contoh yang realistis",
    privacyNote: "Kami hanya menyimpan statistik pemindaian agregat — tidak pernah baris Anda.",
    preview: {
      usableRowsLabel: "baris yang dapat dipakai",
      skipped: "{count} dilewati",
      totalSpendLabel: "Total belanja:",
      colDate: "Tanggal",
      colDescription: "Deskripsi",
      colAmount: "Jumlah",
      moreRows: "…dan {count} baris lainnya akan dipindai.",
    },
    actions: {
      run: "Jalankan pemindaian",
      scanning: "Memindai kanal…",
      scanningAriaLabel: "Memindai",
      clear: "Bersihkan",
    },
    toasts: {
      fileTooLargeTitle: "Berkas terlalu besar",
      fileTooLargeBody: "Jaga ekspor di bawah 5 MB (~100 ribu baris).",
      sampleLoadedTitle: "Data contoh dimuat",
      sampleLoadedBody: "14 baris dari distributor & importir makanan ukuran menengah fiktif.",
    },
    errors: {
      noUsableRows:
        "Tidak ada baris yang dapat dipakai. Kolom yang diharapkan seperti Tanggal, Deskripsi, Jumlah (CSV atau TSV, diekspor dari QuickBooks, Stripe, atau bank Anda).",
    },
    results: {
      complete: "Pemindaian selesai — {count} baris dianalisis",
      foundLabel: "Ditemukan:",
      matchedChannelsOne: "Di {count} kanal yang cocok.",
      matchedChannelsMany: "Di {count} kanal yang cocok.",
      conservativeNote:
        "Rentang konservatif — pembayaran akhir bergantung pada bukti Anda dan total klaim yang diajukan ke setiap dana.",
      ieepaIncluded:
        "Termasuk pengembalian tarif IEEPA sebesar {low}–{high} (bea kembali + bunga statutori, sebelum biaya pengajuan).",
      missedClosed:
        "Anda juga kelewat {low}–{high} pada klaim yang sudah ditutup. Pemantauan memastikan hal itu tidak terulang.",
      claimCta: "Klaim dengan RecoveryOS",
      scanAnother: "Pindai berkas lain",
    },
    match: {
      finalDay: "Hari terakhir",
      daysLeft: "tersisa {count} hari",
      fundBadge: "Dana: {size}",
      matchedPurchases: "Pembelian yang cocok ({count})",
      moreLines: "+ {count} baris lainnya",
      matchedVolumeLabel: "Volume yang cocok:",
      estimatedRecovery: "Estimasi pemulihan",
      whoCanClaimLabel: "Siapa yang dapat mengklaim: ",
      evidenceLabel: "Bukti: ",
      claimCta: "Klaim dengan RecoveryOS",
      closedCta: "Ditutup — gabung daftar pantau",
      officialSite: "Situs resmi",
    },
    disclaimer:
      "Estimasi adalah alat bantu pemodelan, bukan jaminan atau nasihat hukum. Pembayaran bergantung pada kualitas klaim, bukti, dan total klaim yang diterima setiap dana. Anda selalu dapat mengajukan langsung kepada administrator resmi — tautan tersedia di setiap dana.",
  },
  settlements: {
    eyebrow: "Pelacak klaim langsung",
    heading: "Dana terbuka, batas waktu nyata.",
    lead: "Setiap dana di bawah adalah perkara yang diajukan secara publik dengan administrator resmi. Kami memantaunya agar bisnis Anda tidak pernah mendengar soal uang gratis seminggu setelah kedaluwarsa.",
    filterAria: "Saring dana",
    filters: [
      {
        label: "Semua dana",
      },
      {
        label: "Segera ditutup",
      },
      {
        label: "Terbuka",
      },
      {
        label: "Jendela verifikasi",
      },
      {
        label: "Ditutup (terlewat)",
      },
    ],
    statusOpen: "Terbuka",
    statusClosingSoon: "Segera ditutup",
    statusClosed: "Ditutup — terlewat",
    statusVerify: "Jendela verifikasi",
    deadlineVerify: "Jendela klaim — verifikasi dengan administrator",
    daysMonitor: "pantau",
    daysPast: "terlewat {days} hari",
    lastDay: "hari terakhir",
    daysLeftCount: "tersisa {days} hari",
    fundBadge: "Dana: {fund}",
    purchasesLabel: "Pembelian:",
    deadlineTerm: "Batas waktu:",
    eligibleLabel: "Siapa yang dapat mengklaim:",
    testInScanner: "Uji di scanner",
    officialSite: "Situs resmi",
    disclaimer:
      "Fakta dana, jendela kelas, dan batas waktu disusun dari berkas publik dan pemberitahuan administrator per akhir Oktober 2026. Batas waktu dapat berubah — selalu konfirmasi di situs penyelesaian resmi sebelum mengandalkan tanggal apa pun, atau biarkan daftar pantau kami yang mengerjakannya terus-menerus.",
  },
  ieepa: {
    eyebrow: "Sorotan kanal — IEEPA",
    heading: "Mahkamah Agung membatalkan tarifnya. Kini uangnya harus kembali.",
    lead: "Pada 20 Februari 2026, Mahkamah memutuskan 6–3 bahwa tarif IEEPA melanggar hukum ({case}). Sekitar {totalRefunds} yang dibayarkan oleh {importers} importir di {entries} entri harus dikembalikan beserta bunga melalui portal CAPE milik CBP — batas waktunya berlangsung hingga {deadlines}.",
    capeLivePre: "CAPE diluncurkan {date}. Dalam enam hari pertamanya, portal ini menerima",
    capeLivePost:
      "pengajuan yang mencakup 11,2 juta entri — UKM yang bergerak cepat dibayar lebih dulu.",
    interestPre: "Bunga berbunga dengan tingkat sekitar {rate}%/tahun — sekitar",
    interestPost:
      "per bulan terakumulasi di seluruh pengembalian yang tertunda selama pengajuan masih mengantre.",
    failedValidationPre: "Sekitar",
    failedValidationPost:
      "entri sudah gagal validasi CAPE pada pengajuan pertama — persiapan data yang benar adalah kunci segalanya.",
    servicesText:
      "Kami menyiapkan entri, memperbaiki kesalahan validasi, membuat berkas siap CAPE, dan memantau setiap batas waktu. Pengajuan tetap oleh Anda atau broker berlisensi Anda — tanpa permainan lisensi.",
    estimatorTitle: "Estimator pengembalian + bunga",
    estimatorNote: "Hanya perkiraan kasar — angka pastinya ditentukan oleh entri Anda.",
    principalLabel: "Total bea IEEPA yang dibayarkan (USD)",
    dateLabel: "Pembayaran bea terakhir",
    rateLabel: "Suku bunga (%/tahun)",
    includeInterestLabel: "Sertakan bunga yang terakumulasi hingga hari ini (bawaan ≈{rate}%/tahun)",
    dutiesBackLabel: "Bea kembali",
    interestLabel: "Bunga",
    totalLabel: "Total",
    dripLine:
      "Bunga yang terakumulasi pada pengembalian IEEPA Amerika yang tertunda sejak Anda membuka halaman ini:",
    ctaButton: "Siapkan klaim CAPE saya",
    disclaimer:
      "Hanya mencakup bea berbasis IEEPA (jalur Tiongkok / Kanada / Meksiko). Bea Seksi 232/301 tidak terpengaruh oleh putusan ini.",
  },
  pricing: {
    eyebrow: "Harga",
    headingA: "Gratis untuk perorangan. Biaya hanya saat",
    headingGold: "dana bergerak.",
    lead: "World Library tidak akan pernah berbiaya sedikit pun — setiap pencarian membuat peta uang yang hilang semakin tajam, dan peta itulah cara kami menghasilkan pendapatan. Bisnis membayar biaya sukses, dan hanya atas uang yang benar-benar kembali.",
    alwaysFreeBadge: "Selalu gratis",
    plans: [
      {
        name: "Perorangan — World Library",
        price: "$0",
        cadence: "gratis selamanya · tanpa tingkatan, tanpa kartu, tanpa jebakan",
        cta: "Cari di 20 negara",
        features: [
          "Setiap basis data dana tak terklaim resmi yang kami indeks, di seluruh dunia",
          "Pembuat daftar periksa pribadi — masukkan nama, keluar sumbernya",
          "Pemberitahuan registri baru untuk negara Anda",
          "Tautan langsung ke pencarian resmi — kami tidak pernah menghalangi",
          "Cari untuk diri Anda, orang tua, dan kakek-nenek Anda",
        ],
      },
      {
        name: "Pemulihan bisnis",
        price: "$0 di muka",
        cadence: "lalu 8–15% dari dana yang dipulihkan",
        cta: "Jalankan pemindaian gratis",
        features: [
          "Penyiapan klaim & pengemasan bukti",
          "Berkas siap CAPE + perbaikan validasi",
          "Pengajuan melalui administrator resmi atau mitra berlisensi",
          "Pemantauan batas waktu hingga dana tiba",
          "Dikutip secara tertulis sebelum Anda berkomitmen — tanpa pemulihan, tanpa biaya",
        ],
      },
      {
        name: "Mitra & data",
        price: "Kustom",
        cadence: "bagi hasil · API · wawasan",
        cta: "Hubungi kami",
        features: [
          "Untuk broker bea cukai, agensi, dan asosiasi",
          "Penyiapan klaim massal untuk portofolio klien",
          "Akses API ke mesin pencocokan",
          "Cakupan registri agregat seiring kami memperluas pasar",
          "Anda tetap memegang hubungan klien — kami yang menjalankan mesinnya",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pertanyaan yang wajar, jawaban yang lugas.",
    items: [
      {
        question: "Saya perorangan, bukan bisnis — apakah ini untuk saya?",
        answer:
          "Ya — melalui Living Library, gratis selamanya. Perorangan dapat menggali sendiri harta tak terklaim, obligasi tabungan yang telah jatuh tempo, pensiun tak terklaim, pengembalian pajak, dan dana gugatan kelompok konsumen dalam hitungan menit: setiap entri menampilkan siapa yang berhak, bukti apa yang diperlukan, serta tautan ke alat resmi gratis. Mesin berbayar (pemindaian, penyiapan klaim, pengajuan) memang untuk bisnis, tempat nilai klaimnya membenarkan kerja itu — untuk klaim pribadi, jalur mandiri melalui perpustakaan hampir selalu paling cepat.",
      },
      {
        question: "Apakah ini nasihat hukum? Apakah Anda firma hukum?",
        answer:
          "Bukan. RecoveryOS bukan firma hukum dan tidak memberikan nasihat hukum. Kami mengerjakan data: mengurai, mencocokkan, mengemas bukti, memvalidasi, dan memantau. Klaim diajukan kepada administrator yang ditunjuk pengadilan, dan bila suatu yurisdiksi mewajibkan advokat berlisensi, kami bermitra dengan mereka. Anda selalu dapat mengajukan klaim apa pun sendiri secara gratis — kami menautkan setiap situs administrator agar Anda bisa.",
      },
      {
        question: "Seberapa akurat estimasi ini?",
        answer:
          "Ini rentang yang sengaja dibuat konservatif berdasarkan ukuran dana yang dipublikasikan dan rasio pembayaran tipikal untuk pemulihan antitrust dan tarif yang sebanding. Pembayaran akhir Anda bergantung pada volume pembelian terdokumentasi, kualitas klaim, dan berapa banyak klaim yang diterima dana tersebut. Kami memberikan kutipan biaya sukses secara tertulis per klaim sebelum Anda berkomitmen pada apa pun.",
      },
      {
        question: "Data apa yang Anda perlukan, dan apa yang terjadi padanya?",
        answer:
          "Ekspor pembelian — Tanggal, Deskripsi, Jumlah — dari QuickBooks, Stripe, Xero, atau bank Anda. Pemindaian gratis hanya menyimpan statistik agregat (baris dipindai, kecocokan ditemukan). Data tingkat baris Anda tidak pernah dijual atau dibagikan, dan dihapus atas permintaan. Untuk pengajuan, Anda membagikan bukti hanya kepada administrator resmi.",
      },
      {
        question: "Kapan dan bagaimana saya membayar?",
        answer:
          "Tidak ada biaya di muka. Saat pemulihan mendarat di akun Anda, biaya sukses kami (8–15%, umumnya 12%) ditagihkan. Pemantauan adalah langganan tetap $99/bulan yang dapat dibatalkan kapan saja — mitra peluncuran mendapat 12 bulan gratis. Dana dari penyelesaian dan CBP selalu mengalir langsung ke akun bisnis Anda, tidak pernah melalui kami.",
      },
      {
        question: "Mengapa tidak langsung menyewa firma hukum?",
        answer:
          "Pertanyaan bagus — kadang memang sebaiknya begitu. Konsultan perdagangan dikenai biaya $300–800/jam dan tetap membutuhkan data Anda yang terorganisir. Kami menangani lapisan data tanpa risiko finansial, dan paket klaim kami membuat pengacara mana pun lebih murah digunakan. Untuk klaim dana yang sederhana, jalur administrator dengan paket yang telah disiapkan biasanya bahkan tidak memerlukan pengacara.",
      },
      {
        question: "Kanal mana yang aktif hari ini, dan apa selanjutnya?",
        answer:
          "Aktif sekarang: klaim penyelesaian gugatan kelompok, penyiapan pengembalian tarif IEEPA, dan penyaringan duty drawback. Kuartal I 2027 menambahkan pemulihan audit kargo & paket serta prapenyaringan kredit pajak R&D. Kuartal II 2027 menambahkan sapuan harta tak terklaim B2B. Setiap kanal berjalan di atas data pembelian terhubung yang sama — tanpa kerja ekstra untuk Anda.",
      },
      {
        question: "Kami berbasis di luar AS. Apakah ini berlaku untuk kami?",
        answer:
          "Jika Anda mengekspor ke atau mengimpor dari AS, Anda dapat terpengaruh: pengembalian IEEPA mencakup importir terdaftar mana pun, dan dana antitrust mencakup pembelian dalam perdagangan AS. Kami sedang membangun kanal pengembalian UE/Inggris berikutnya. Beri tahu kami tempat Anda beroperasi dan kami akan menandai yang berlaku bagi Anda.",
      },
    ],
  },
  waitlist: {
    eyebrow: "Daftar peluncuran",
    headingA: "Uang yang ditemukan semestinya menemukan",
    headingGold: "Anda lebih dulu.",
    lead: "Slot peluncuran mencakup 12 bulan pemantauan gratis, harga biaya sukses anggota pendiri (8%), dan pemindaian putaran pertama atas pembelian 2024–2026 Anda terhadap setiap dana yang terbuka.",
    perks: ["Tanpa kartu, tanpa komitmen", "Batalkan kapan saja setelah aktif"],
    spotsClaimed: "Slot peluncuran telah diambil",
    spotsNote: "Slot diberikan sesuai urutan pendaftaran — garisnya hanya bergerak satu arah.",
    successTitle: "Anda masuk. Selamat bergabung.",
    successText:
      "Kami akan mengirim orientasi peluncuran dan daftar periksa dokumen untuk dana yang paling dekat dengan penutupan. Jika Anda mengimpor apa pun di bawah tarif 2025, balas dengan perkiraan angka bea dan kami mulai estimasi IEEPA.",
    emailLabel: "Email kerja *",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Perusahaan",
    companyPlaceholder: "Nama perusahaan",
    volumeLabel: "Volume pembelian bulanan",
    volumePlaceholder: "Pilih rentang",
    volumeOptions: [
      "Di bawah $10K",
      "$10–50K",
      "$50–250K",
      "$250K–1M",
      "Di atas $1M",
    ],
    channelsLabel: "Pemulihan mana yang menarik bagi Anda?",
    channelOptions: [
      "Penyelesaian gugatan kelompok",
      "Pengembalian tarif IEEPA",
      "Duty drawback",
      "Audit kargo & paket",
    ],
    submitLabel: "Amankan slot peluncuran saya",
    savingLabel: "Menyimpan…",
    privacyNote: "Kami hanya mengirim email tentang uang Anda, bukan yang lain. Satu klik untuk keluar.",
    invalidEmailTitle: "Masukkan email yang valid",
    invalidEmailDescription: "Satu alamat sudah cukup.",
    joinedToastTitle: "Anda sudah terdaftar",
    joinedToastDescription:
      "Slot peluncuran diberikan sesuai urutan pendaftaran. Pantau kotak masuk Anda.",
    errorToastTitle: "Terjadi kesalahan",
    errorToastDescription: "Silakan coba lagi sebentar lagi.",
  },
  footer: {
    about:
      "Departemen pemulihan dana untuk bisnis kecil — dan Living Library gratis berisi uang yang terlupakan untuk semua orang lainnya. Kami memetakan setiap kanal tempat uang macet: gugatan kelompok, pengembalian tarif, drawback, harta tak terklaim. Anda hanya membayar saat cek tiba.",
    productTitle: "Produk",
    channelsTitle: "Kanal",
    product: [
      "Cara kerja",
      "World Library",
      "Scanner gratis",
      "Klaim terbuka",
      "Kalkulator IEEPA",
      "Harga",
    ],
    channelsNav: [
      "Semua kanal",
      "Gugatan kelompok",
      "Pengembalian tarif",
      "Duty drawback",
      "Daftar peluncuran",
    ],
    legal1:
      "RecoveryOS bukan firma hukum, akuntan, atau broker bea cukai berlisensi, dan tidak ada di situs ini yang merupakan nasihat hukum, pajak, atau keuangan. Living Library menautkan ke basis data pemerintah resmi dan administrator yang ditunjuk pengadilan — perorangan selalu dapat mengajukan langsung, secara gratis. Estimasi pemulihan adalah alat bantu pemodelan berdasarkan berkas publik dan rasio pembayaran historis; pemulihan aktual bergantung pada bukti, kelayakan, dan total klaim yang diterima setiap dana.",
    legal2:
      "Fakta dana penyelesaian, jendela kelas, dan batas waktu disusun dari berkas pengadilan publik dan pemberitahuan administrator resmi per akhir Oktober 2026 dan dapat berubah tanpa pemberitahuan. Selalu verifikasi batas waktu dengan administrator penyelesaian resmi sebelum mengandalkannya. Klaim selalu diajukan oleh Anda atau melalui mitra berlisensi yang tepat, dan dana mengalir langsung ke akun Anda.",
    copyright: "© 2026 RecoveryOS. Seluruh hak cipta dilindungi.",
    ariaProduct: "Produk",
    ariaChannels: "Kanal",
  },
  claim: {
    title: "Klaim dengan RecoveryOS",
    titleDone: "Paket klaim diminta",
    descriptionDone:
      "Periksa kotak masuk Anda — kami hanya meminta dokumen yang benar-benar diwajibkan administrator.",
    descriptionContext:
      "Kami akan menyiapkan dokumen untuk {context} dan mengonfirmasi setiap batas waktu dengan administrator resmi. Anda hanya membayar saat dana tiba.",
    descriptionDefault:
      "Kami akan menyiapkan dokumen, mengonfirmasi batas waktu dengan administrator resmi, dan mengajukan hingga dana tiba. Anda hanya membayar saat uang mendarat di akun Anda.",
    nextStepsTitle: "Langkah berikutnya",
    nextSteps: [
      "Kirimkan bukti pembelian Anda (faktur / ekspor).",
      "Kami memvalidasi klaim dan mengutip biaya sukses secara tertulis.",
      "Dana selalu mengalir langsung ke akun bisnis Anda.",
    ],
    emailLabel: "Email kerja",
    emailPlaceholder: "cfo@company.com",
    companyLabel: "Perusahaan",
    companyPlaceholder: "Nama perusahaan",
    submit: "Dapatkan paket klaim saya",
    submitting: "Menyimpan…",
    footerNote:
      "Tanpa pemulihan, tanpa biaya. Anda selalu dapat mengajukan sendiri melalui administrator resmi — kami menautkan ke setiap dana.",
    invalidEmailTitle: "Masukkan email yang valid",
    invalidEmailBody: "Kami memerlukan satu alamat untuk mengirim paket klaim Anda.",
    queuedTitle: "Anda sudah masuk antrean",
    queuedBody:
      "Kami akan menghubungi Anda dengan paket klaim dan dokumen persis yang dibutuhkan.",
    errorTitle: "Terjadi kesalahan",
    errorBody: "Silakan coba lagi sebentar lagi.",
  },
  assistant: {
    openChat: "Buka obrolan AI Goldie",
    closeChat: "Tutup obrolan Goldie",
    chatDialog: "Obrolan asisten AI Goldie",
    askGoldie: "Tanyakan apa saja kepada Goldie",
    online: "Online · menjawab dalam bahasa apa pun",
    aiScout: "Pemandu AI",
    reset: "Atur ulang percakapan",
    send: "Kirim pesan",
    placeholder: "Tanyakan apa saja kepada Goldie…",
    disclaimer:
      "Jawaban AI bisa tidak sempurna — verifikasi detail dana dengan administrator resmi yang ditautkan di halaman ini.",
    greeting:
      "Halo! Saya **Goldie**, pemandu Anda di RecoveryOS. Tanyakan apa saja tentang dana tak terklaim — World Library, batas waktu penyelesaian, pengembalian tarif, atau cara kerja scanner. Saya menjawab dalam bahasa apa pun yang Anda suka.",
    suggestions: [
      "Bagaimana cara menemukan dana tak terklaim secara gratis?",
      "Apa itu pengembalian IEEPA $166B?",
      "Apakah scanner ini benar-benar privat?",
      "Apa itu dana tak terklaim?",
    ],
  },
  guide: {
    welcome:
      "Selamat datang! Saya Scout — saya menjelajahi situs ini dan memberi tips saat Anda menggulir. Klik saya kapan saja untuk mengobrol dengan Goldie, asisten AI kami.",
    dismiss: "Tutup tips",
    mute: "Bisukan tips untuk kunjungan ini",
    unmute: "Tips nonaktif — nyalakan",
    avatarLabel: "Scout, pemandu situs — klik untuk mengobrol dengan Goldie",
    askGoldie: "Tanyakan ke Goldie tentang bagian ini",
    tips: {
      how: [
        "Baru di sini? Strip ini menampilkan seluruh alur — pindai, verifikasi, klaim. Tanpa pendaftaran untuk mencobanya.",
        "Tiga langkah, tanpa biaya untuk menjelajah. Scanner bahkan memiliki contoh realistis yang bisa dijalankan sekali klik.",
      ],
      library: [
        "Psst — nama yang Anda ketik di sini tidak pernah keluar dari browser Anda. Pilih negara Anda dan dapatkan daftar periksa gratis registri resmi.",
        "50 pasar, 66+ sumber resmi. Coba pilih Turki atau UEA — cakupannya jauh melampaui Amerika.",
      ],
      channels: [
        "Enam kanal pemulihan aktif di sini. Kartu IEEPA yang menyala saja bernilai $166B bea yang dapat dikembalikan.",
        "Duty drawback saja ~$15B setahun menganggur di meja. Audit kargo, kredit R&D — kebanyakan bisnis tidak pernah memeriksanya.",
      ],
      scanner: [
        "Coba “Muat contoh yang realistis” — 14 baris pembelian demo menemukan sekitar $47K. Berkas Anda tidak pernah keluar dari browser ini.",
        "Scanner mengurai CSV Anda tepat di browser ini — tanpa unggah, tanpa akun, tanpa apa pun yang disimpan.",
      ],
      settlements: [
        "Batas waktu adalah inti permainannya. Urutkan berdasarkan sisa hari — dana Ready-Mix Iowa ditutup 16 Nov.",
        "Setiap kartu menautkan langsung ke administrator yang ditunjuk pengadilan. Tanpa perantara, tanpa biaya perantara.",
      ],
      ieepa: [
        "Membayar tarif pada 2025 ke atas? Mahkamah Agung membatalkan bea IEEPA — setiap dolar dapat dikembalikan beserta bunga. Coba $120.000 di kalkulator.",
        "Bunga pada pengembalian IEEPA yang tertunda terakumulasi sekitar $650M per bulan. Menunggu itu mahal.",
      ],
      pricing: [
        "Perpustakaannya gratis selamanya — perorangan tidak pernah membayar. Bisnis hanya membayar 8–15% saat uang benar-benar mendarat.",
        "Tanpa pemulihan, tanpa biaya — tertulis di dalam rencana bisnisnya. Dikutip secara tertulis sebelum Anda berkomitmen.",
      ],
      faq: [
        "Pertanyaan bagus tinggal di sini — termasuk “apakah ini nasihat hukum?” (bocoran: bukan, kami bukan firma hukum).",
        "FAQ membahas privasi, kelayakan, dan apa yang terjadi setelah Anda mengajukan. Dua menit yang layak diluangkan.",
      ],
      waitlist: [
        "Pemberhentian terakhir! Bergabunglah dengan daftar peluncuran — atau tanyakan apa saja ke kolega saya, Goldie. Dia adalah koin di sudut itu.",
        "Mau pergi? Bawa daftar periksanya — daftar peluncuran mendapat pemberitahuan registri baru untuk negara Anda.",
      ],
    },
    ask: {
      how: "Jelaskan cara kerja RecoveryOS dengan bahasa sederhana.",
      library: "Bagaimana cara kerja pencarian World Library, dan apakah benar-benar gratis?",
      channels: "Kanal pemulihan mana yang paling cocok untuk bisnis saya?",
      scanner: "Bagaimana scanner mencocokkan pembelian saya dengan dana penyelesaian?",
      settlements: "Dana penyelesaian mana yang masih terbuka dan segera ditutup?",
      ieepa: "Bagaimana cara mengklaim pengembalian tarif IEEPA melalui CBP CAPE?",
      pricing: "Berapa biaya RecoveryOS, dan kapan saya membayar?",
      faq: "Apakah RecoveryOS sah, dan apakah ini nasihat hukum?",
      waitlist: "Apa yang saya dapatkan dengan bergabung ke daftar tunggu?",
    },
  },
};

export default id;
