// One-shot patcher: swap the roaming guide persona Scout -> Goldie (the coin)
// across all 19 translations. Replaces guide.welcome, guide.avatarLabel and
// guide.tips.waitlist[0] (the "coin in the corner" tip). Every replacement is
// asserted to happen exactly once; the script fails loudly otherwise.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/lib/i18n/dictionaries";

/** [welcome, avatarLabel, waitlistTip0] — new values per locale. */
const NEW = {
  es: [
    "¡Le damos la bienvenida! Soy Goldie — recorro este sitio y dejo consejos mientras usted se desplaza. Haga clic en mí cuando quiera para chatear con nuestro asistente de IA.",
    "Goldie, la guía del sitio — haga clic para chatear con la IA",
    "¡Última parada! Únase a la lista de lanzamiento — o simplemente pregúntele lo que sea a nuestro asistente de IA: haga clic en mí aquí o en el botón de la chispa de la esquina.",
  ],
  it: [
    "Benvenuti! Sono Goldie — giro per questo sito e lascio consigli mentre scorre. Mi clicchi quando vuole per parlare con il nostro assistente AI.",
    "Goldie, la guida del sito — clicca per parlare con l'AI",
    "Ultima fermata! Entri nella lista di lancio — o chieda qualsiasi cosa al nostro assistente AI: mi clicchi qui oppure prema il pulsante a scintilla nell'angolo.",
  ],
  vi: [
    "Chào mừng! Tôi là Goldie — tôi đi khắp trang này và thả mẹo khi bạn cuộn trang. Bấm vào tôi bất cứ lúc nào để trò chuyện với trợ lý AI của chúng tôi.",
    "Goldie, hướng dẫn viên của trang — bấm để trò chuyện với AI",
    "Trạm cuối! Tham gia danh sách ra mắt — hoặc cứ hỏi trợ lý AI của chúng tôi bất cứ điều gì: bấm vào tôi ở đây hoặc nút hình tia lửa ở góc trang.",
  ],
  ru: [
    "Привет! Я Goldie — я брожу по этому сайту и подсказываю по мере прокрутки. Нажмите на меня в любой момент, чтобы поболтать с нашим AI-ассистентом.",
    "Goldie, гид по сайту — нажмите, чтобы пообщаться с AI",
    "Последняя остановка! Вступайте в список запуска — или просто спросите нашего AI-ассистента о чём угодно: нажмите на меня здесь или на кнопку с искрой в углу.",
  ],
  tr: [
    "Hoş geldiniz! Ben Goldie — sitede gezinip siz kaydırdıkça ipuçları bırakıyorum. AI asistanımızla konuşmak için bana dilediğiniz an tıklayın.",
    "Goldie, site rehberi — AI ile konuşmak için tıklayın",
    "Son durak! Lansman listesine katılın — ya da AI asistanımıza aklınızdaki her şeyi sorun: buradan bana ya da köşedeki kıvılcım düğmesine tıklayın.",
  ],
  pt: [
    "Boas-vindas! Eu sou a Goldie — percorro este site e deixo dicas enquanto você rola a página. Clique em mim a qualquer momento para conversar com o nosso assistente de IA.",
    "Goldie, a guia do site — clique para conversar com a IA",
    "Última parada! Entre na lista de lançamento — ou pergunte qualquer coisa para o nosso assistente de IA: clique em mim aqui ou no botão de faísca no canto.",
  ],
  fr: [
    "Bienvenue ! Je suis Goldie — je parcours ce site et glisse des astuces au fil de votre lecture. Cliquez sur moi à tout moment pour discuter avec notre assistant IA.",
    "Goldie, le guide du site — cliquez pour discuter avec l'IA",
    "Dernière étape ! Rejoignez la liste de lancement — ou demandez simplement ce que vous voulez à notre assistant IA : cliquez sur moi ici ou sur le bouton étincelle dans le coin.",
  ],
  de: [
    "Willkommen! Ich bin Goldie — ich streife durch diese Seite und hinterlasse Tipps, während Sie scrollen. Klicken Sie mich jederzeit an, um mit unserem KI-Assistenten zu chatten.",
    "Goldie, der Seiten-Guide — anklicken, um mit der KI zu chatten",
    "Letzte Station! Treten Sie der Launch-Liste bei — oder fragen Sie einfach unseren KI-Assistenten alles: Klicken Sie mich hier an oder den Funken-Knopf in der Ecke.",
  ],
  nl: [
    "Welkom! Ik ben Goldie — ik zwerf rond op deze site en geef tips terwijl u scrolt. Klik wanneer u maar wilt op mij om te chatten met onze AI-assistent.",
    "Goldie, de gids van deze site — klik om met de AI te chatten",
    "Laatste stop! Sluit u aan bij de launchlijst — of vraag onze AI-assistent gewoon alles: klik op mij hier of op de vonkknop in de hoek.",
  ],
  pl: [
    "Witaj! Jestem Goldie — krążę po tej stronie i zostawiam wskazówki w miarę przewijania. Kliknij mnie w dowolnej chwili, żeby porozmawiać z naszym asystentem AI.",
    "Goldie, przewodniczka po stronie — kliknij, aby porozmawiać z AI",
    "Ostatni przystanek! Dołącz do listy startowej — albo po prostu zapytaj o cokolwiek naszego asystenta AI: kliknij mnie tutaj albo przycisk z iskrą w rogu.",
  ],
  ar: [
    "أهلًا بك! أنا Goldie — أتجوّل في هذا الموقع وأترك نصائح أثناء تمريرك. انقر عليّ في أي وقت للتحدث مع مساعدنا الذكي.",
    "Goldie، مرشدة الموقع — انقر للتحدث مع الذكاء الاصطناعي",
    "المحطة الأخيرة! انضم إلى قائمة الإطلاق — أو اسأل مساعدنا الذكي عن أي شيء: انقر عليّ هنا أو على زر الشرارة في الزاوية.",
  ],
  uk: [
    "Вітаю! Я Goldie — я блукую цим сайтом і підкидаю поради, поки ви гортаєте. Клацніть на мене будь-коли, щоб поспілкуватися з нашим AI-асистентом.",
    "Goldie, гід сайту — клацніть, щоб поспілкуватися з AI",
    "Остання зупинка! Приєднуйтеся до списку запуску — або просто запитайте нашого AI-асистента про що завгодно: клацніть на мене тут або на кнопку з іскрою в кутку.",
  ],
  he: [
    "ברוכים הבאים! אני Goldie — אני מסייר באתר ומשאיר טיפים בזמן שאתם גוללים. לחצו עליי בכל עת כדי לשוחח עם עוזר ה־AI שלנו.",
    "Goldie, מדריך האתר — לחצו לצ׳אט עם ה־AI",
    "התחנה האחרונה! הצטרפו לרשימת ההשקה — או פשוט שאלו את עוזר ה־AI שלנו כל מה שרוצים: לחצו עליי כאן או על כפתור הניצוץ בפינה.",
  ],
  hi: [
    "स्वागत है! मैं Goldie हूँ — मैं इस साइट पर घूमती रहती हूँ और आपके स्क्रॉल करते समय सुझाव छोड़ती जाती हूँ। हमारे AI सहायक से बात करने के लिए कभी भी मुझ पर क्लिक करें।",
    "Goldie, साइट गाइड — AI से चैट करने के लिए क्लिक करें",
    "आख़िरी पड़ाव! लॉन्च लिस्ट में शामिल हों — या बस हमारे AI सहायक से कुछ भी पूछ लें: यहाँ मुझ पर क्लिक करें या कोने वाले चिंगारी बटन पर।",
  ],
  zh: [
    "欢迎！我是 Goldie——我在站点里四处巡逻，在你滚动页面时投下小提示。随时点我，就能和我们的 AI 助手聊天。",
    "Goldie，站点向导——点击与 AI 聊天",
    "最后一站！加入首发名单——或者直接问我们的 AI 助手任何问题：点我这里，或者点角落里的火花按钮。",
  ],
  ja: [
    "ようこそ！私は Goldie です——サイト内を動き回り、スクロールに合わせてヒントをお届けします。いつでもクリックして、私たちの AI アシスタントとお話しください。",
    "Goldie、サイトガイド——クリックして AI とチャット",
    "最後の立ち寄りどころです！ローンチリストに参加してください——それとも、私たちの AI アシスタントに何でも聞いてみて。ここで私をクリックするか、隅のスパークボタンを押してください。",
  ],
  ko: [
    "환영합니다! 저는 Goldie — 사이트를 돌아다니며 스크롤할 때마다 팁을 남깁니다. 언제든 클릭하시면 우리 AI 어시스턴트와 대화할 수 있습니다.",
    "Goldie, 사이트 가이드 — 클릭하여 AI와 대화",
    "마지막 정거장입니다! 출시 대기 명단에 합류하시거나, 우리 AI 어시스턴트에게 무엇이든 물어보세요. 여기 있는 저를 클릭하시거나 구석의 반짝임 버튼을 눌러 주세요.",
  ],
  id: [
    "Selamat datang! Saya Goldie — saya menjelajahi situs ini dan memberi tips saat Anda menggulir. Klik saya kapan saja untuk mengobrol dengan asisten AI kami.",
    "Goldie, pemandu situs — klik untuk mengobrol dengan AI",
    "Pemberhentian terakhir! Bergabunglah dengan daftar peluncuran — atau tanyakan apa saja ke asisten AI kami: klik saya di sini atau tombol percik di sudut.",
  ],
  th: [
    "ยินดีต้อนรับ! ฉันคือ Goldie — เหรียญทองที่ล่องลอยสำรวจไปทั่วเว็บไซต์นี้แล้วทิ้งเคล็ดลับไว้ระหว่างที่คุณเลื่อนหน้า คลิกฉันได้ทุกเมื่อเพื่อคุยกับผู้ช่วย AI ของเรา",
    "Goldie ไกด์ประจำเว็บไซต์ — คลิกเพื่อคุยกับ AI",
    "ป้ายสุดท้ายแล้ว! เข้ารายชื่อเปิดตัวได้เลย — หรือจะถามผู้ช่วย AI ของเราก็ได้ทุกอย่าง คลิกฉันตรงนี้หรือปุ่มรูปประกายไฟที่มุมหน้าจอก็ได้",
  ],
};

let failures = 0;

for (const [locale, [welcome, avatarLabel, waitTip]] of Object.entries(NEW)) {
  const file = join(DIR, `${locale}.ts`);
  let src = readFileSync(file, "utf8");

  // guide.welcome: `welcome:\n      "..."`
  const welcomeRe = /(welcome:\r?\n\s{6}")([^"]*)(")/;
  // guide.avatarLabel
  const avatarRe = /(avatarLabel:\s*")([^"]*)(")/;
  // guide.tips.waitlist[0]: the first string of the 6-space indented array
  const waitRe = /(\n\s{6}waitlist: \[\r?\n\s{8}")([^"]*)(")/;

  const before = src;
  src = src.replace(welcomeRe, (m, a, _b, c) => `${a}${welcome}${c}`);
  src = src.replace(avatarRe, (m, a, _b, c) => `${a}${avatarLabel}${c}`);
  src = src.replace(waitRe, (m, a, _b, c) => `${a}${waitTip}${c}`);

  const w = before.match(welcomeRe);
  const av = before.match(avatarRe);
  const wt = before.match(waitRe);
  const okW = w !== null && src.includes(welcome);
  const okA = av !== null && src.includes(avatarLabel);
  const okT = wt !== null && src.includes(waitTip);
  if (!okW || !okA || !okT || src === before) {
    console.log(`FAIL ${locale}: w=${okW} a=${okA} t=${okT}`);
    failures++;
    continue;
  }
  // Old persona word must be gone from the guide block.
  const guideBlock = src.slice(src.indexOf("  guide: {"));
  if (/Scout|Скаут|Скаут/.test(guideBlock) && locale !== "ru" && locale !== "uk") {
    console.log(`WARN ${locale}: "Scout" still present in guide block`);
  }
  writeFileSync(file, src);
  console.log(`ok ${locale}`);
}

process.exit(failures ? 1 : 0);
