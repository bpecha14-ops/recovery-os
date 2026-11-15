// CivicClaim OS — Runable Prompt Pack: content part 1 (intro + P0..P8)
// Block types: h2 | p | prompt | bullets | table

const INTRO = {
  id: "intro",
  title: "Как работать с этим пакетом",
  lead: [
    "Runable — агент-платформа, которая собирает сайты и приложения по обычным текстовым промтам: вы описываете задачу, она планирует экраны, пишет код и подключает данные, а правки вносятся следующим сообщением («измени это — измени экран»). Исходный код экспортируется, поэтому результат не заперт внутри платформы. Этот пакет использует сильную сторону Runable — пошаговую доработку диалогом — и закрывает её слабую сторону: склонность выдумывать числа и уплывать от спецификации.",
    "Стратегия простая: сначала одним промтом закладывается фундамент (продукт, правила данных, дизайн-система), затем каждая страница собирается отдельным промтом, и после каждого шага вы проверяете результат по списку «Проверка после применения». Именно так собирается «без косяков»: маленькими шагами с приёмкой, а не одним гигантским промтом «сделай мне всё».",
    "Промты написаны на английском: платформа следует английским инструкциям заметно точнее, а весь копирайт сайта — англоязычный. Русские пояснения вокруг промтов говорят вам, что каждый промт делает и что проверить после. Скопируйте промт целиком, от первой до последней строки — в них нет случайных слов.",
  ],
  blocks: [
    { type: "h2", text: "Восемь правил сборки без косяков" },
    { type: "bullets", items: [
      "Один промт — одна страница или одна система. Никогда не просите две страницы в одном сообщении.",
      "Проверяйте превью после каждого промта, до отправки следующего. Ошибка, замеченная сразу, чинится одним сообщением; замеченная через пять шагов — переписыванием.",
      "Числа только из facts.json. Это правило номер один против выдуманных сумм: если цифре нет записи в facts.json со ссылкой и датой — её нет на сайте.",
      "Не принимайте заглушки: «lorem ipsum», «coming soon», выдуманные суммы «$1,200» в карточках-примерах. Требуйте реальные записи или пустое состояние с честным текстом.",
      "Копирайт из промтов — досовно. ИИ-билдеры любят перефразировать «для красоты». Если формулировка доверия изменилась — это баг, верните точный текст.",
      "После каждого крупного шага экспортируйте исходники. Runable позволяет выгрузить проект; держите каждую рабочую версию у себя.",
      "Дрейф исправляйте коррект-промтом (ниже), а не новым описанием с нуля — иначе платформа пересоберёт страницу и потеряет уже принятые части.",
      "Финальную приёмку (Промт 17) прогоняйте целиком и только после неё считайте проект готовым.",
    ]},
    { type: "h2", text: "Порядок применения" },
    { type: "table", header: ["№", "Промт", "Что даёт"], widths: [8, 40, 52], rows: [
      ["0", "Фундамент", "Продукт, обещание, правила данных, скелет проекта"],
      ["1", "Слой данных", "facts.json и programs.json со схемой и валидатором"],
      ["2", "Визуальная система и фон", "Дизайн-система; три варианта фона, включая скрин и футуризм"],
      ["3", "Главная", "Обещание, чипы доверия, пример результата, FAQ"],
      ["4", "/tools", "Мастер eligibility, работающий в браузере и офлайн"],
      ["5", "Страницы программ", "/programs/[country]/[slug] со цитатой и журналом"],
      ["6", "/coverage", "Живые счётчики и мировые суммы с источниками"],
      ["7", "/data", "CSV/JSON, схема, лицензии, changelog"],
      ["8", "/method", "Что значит verified, свежесть, суммы, исправление ошибок"],
      ["9", "/privacy и /terms", "Честная приватность и границы сервиса"],
      ["10", "/impact", "Pre-launch честность, анонимные агрегаты"],
      ["11", "/about и /contribute", "Кто строит, финансирование, как помогать"],
      ["12", "/business", "Бизнес-модель одним абзацем, всё «planned» помечено"],
      ["13", "ИИ-гид Goldie", "Ограждения поведения + страница «AI behaviours we test»"],
      ["14", "Свежесть", "Еженедельная проверка источников, статус needs re-check"],
      ["15", "Качество", "Доступность, мобильность, безопасность, производительность"],
      ["16", "Репозиторий", "Публичный код: лицензии, шаблоны, CI, CHANGELOG"],
      ["17", "Финальная приёмка", "Пять проверок «готово» + launch gate"],
    ]},
    { type: "h2", text: "Универсальный коррект-промт (шаблон)" },
    { type: "p", text: "Когда платформа сломала уже принятое (переставила секции, потеряла точный копирайт, снова захардкодила число), не описывайте страницу заново. Отправьте этот шаблон, заполнив квадратные скобки:" },
    { type: "prompt", label: "Коррект-промт — отправляйте при дрейфе:", text:
`You drifted from the spec: [что именно сломалось].
Restore: [как должно быть — точная формулировка или структура].
Do not change anything else on this or other pages.
After fixing, re-run the acceptance checks for [page] and confirm each one explicitly.` },
  ],
};

const P0 = {
  id: "p0",
  title: "Промт 0 — Фундамент: продукт, обещание, правила",
  lead: [
    "Первый и самый важный промт: он задаёт продукт, одно обещание, границы («не юруслуги»), главное правило данных (facts.json как единственный источник чисел) и точные формулировки доверия. Отправьте его самым первым сообщением в новый проект Runable. Всё остальное в пакете опирается на него: страницы, счётчики и тексты ссылаются на структуры, созданные здесь.",
    "Промт сознательно запрещает строить страницы наперёд — фундамент должен собраться чисто, без галереи заглушек. Подтверждение «what you created» в конце нужно, чтобы сразу увидеть, что платформа поняла правила, а не начала фантазировать.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 0 — скопируйте целиком:", text:
`Project: CivicClaim. You are building a free, open, multilingual website that helps individuals find out what they are owed under official government programs — benefits, refunds, compensation, unclaimed money. This is the FOUNDATION prompt. I will send more prompts later, one page at a time. Build ONLY what this prompt asks for.

THE ONE PROMISE (the center of the product):
"Find out what you're owed under official programs — free, private, with a source and a date on every answer."

WHAT THIS IS:
- A navigator over official public information. Every program record carries: the official source URL, a short verbatim quote from that source, the date we checked it, and a verification status ("Manually verified" or "Auto-extracted").
- Free forever for individuals. Institutions pay for API access. Sponsors fund countries and languages. User queries are never sold.

WHAT THIS IS NOT (add this exact line to the footer):
"CivicClaim is an independent information service, not a law firm or a government agency."

NON-NEGOTIABLE DATA RULE:
1. Create /data/facts.json — the single source of truth for every number shown anywhere on the site. One entry per fact: { "id", "label", "value", "unit", "source_url", "as_of", "type": "verified" | "estimate" }.
2. Never hardcode a number in any component. Every counter, statistic and money figure reads from facts.json.
3. All stats render server-side with the real value in the initial HTML (no "$0B" flash on first paint, no client-only counters).
4. If a number has no entry in facts.json, it does not appear on the site. No invented statistics, ever.

PAGES (do not build yet — I will ask for them one at a time):
/ (home), /tools, /programs/[country]/[slug], /coverage, /data, /method, /privacy, /terms, /impact, /about, /contribute, /business

GLOBAL RULES:
- Plain language, grade-8 reading level. Every legal term gets a one-sentence plain explanation.
- Every money amount shows: currency + "as of [date]" + a link to its source.
- Mobile-first, fast on 3G, no layout shift, server-rendered pages.
- Accessibility: WCAG 2.1 AA — full keyboard navigation, visible focus, alt text, contrast of at least 4.5:1, semantic landmarks.
- No cookies. Analytics must be cookieless (anonymous aggregate page counts only). No account required for any individual feature.
- All interface strings live in one dictionary file so more languages can be added later.

TRUST COPY — use exactly, do not paraphrase:
- Trust chips: "Free forever for individuals · Official source on every result · Eligibility runs in your browser"
- License line: "Our compilation and metadata: CC BY 4.0. Underlying official texts remain under their sources' terms."
- Privacy line: "Eligibility answers are processed in your browser. If you use the AI guide, the text you type is sent to our AI provider."

BUILD NOW: the project skeleton with header and footer, facts.json wired to a <Fact id="..."/> component that renders "value (as of date)" with a source link, and an empty home page. Confirm what you created. Do not invent program data yet.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Просмотр HTML главной в исходнике: счётчики отсутствуют, но нет и зашитых чисел в разметке.",
      "Компонент <Fact/> существует и рендерит значение + дату + ссылку.",
      "Все три формулировки доверия присутствуют дословно (chips, license, privacy).",
      "Платформа не создала страницы сверх заказа и не наполнила сайт выдуманными программами.",
      "Футер содержит строку «not a law firm or a government agency».",
    ]},
  ],
};

const P1 = {
  id: "p1",
  title: "Промт 1 — Слой данных: facts.json и записи программ",
  lead: [
    "Второй промт создаёт слой данных: файл фактов (каждая цифра сайта со значением, ссылкой, датой и типом «проверено/оценка») и файл программ с полной схемой записи — официальный URL, цитата-якорь, структурные правила eligibility, сумма с валютой и датой, дедлайн, шаги, документы, статус проверки и журнал изменений. Сюда же встроен валидатор сборки: запись без источника, цитаты, даты проверки или changelog ломает билд. Это механическая защита от главной уязвимости ИИ-сборки — правдоподобных, но несуществующих данных.",
    "После этого промта загрузите свои записи (стартовый facts.json — в Приложении А, пример записи — в Приложении Б). Пока данных нет, страницы должны показывать честные нули из файла, а не выдуманные примеры.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 1 — скопируйте целиком:", text:
`Project: CivicClaim. Now create the data layer: two files, both validated at build time.

FILE 1 — /data/facts.json. Every number on the site comes from here. Entry schema:
{ "id": "programs_total", "label": "Programs in the database", "value": 74, "unit": "programs", "source_url": "/data", "as_of": "2026-11-12", "type": "verified" }
"type" is either "verified" or "estimate" — render a small visible badge for estimates. Seed it with: programs_total, countries_total, sources_total, programs_manually_verified, programs_auto_extracted, last_checked. Every fact renders server-side.

FILE 2 — /data/programs.json. One record per program. Record schema:
{
  "id": "us-snap",
  "country": "United States", "region": "US", "jurisdiction": "Federal / state-administered",
  "category": "benefit | compensation | refund | pension | tax-credit | healthcare | housing | unclaimed | disaster",
  "name": "Program name", "summary": "1-2 plain sentences",
  "agency": "Official agency name",
  "source_url": "https://official-page", "apply_url": "https://official-apply-page",
  "quote": "one verbatim sentence copied from source_url that anchors the key fact",
  "amount": "amount or range with currency + as-of date",
  "deadline": "deadline or 'Apply any time'",
  "documents": ["required documents"],
  "steps": ["ordered application steps"],
  "eligibility": { "residency": ["citizen","permanent-resident","valid-visa","any"], "ageMin": 0, "ageMax": 0, "income": "low | any", "household": "children | any", "situations": ["senior","disability","veteran","parent","newcomer","disaster","farmer"], "housing": "renter | any" },
  "verification": { "status": "manually-verified | auto-extracted | needs-recheck", "last_checked": "YYYY-MM-DD", "hash": "sha256 of the source page at last check" },
  "changelog": [ { "date": "YYYY-MM-DD", "change": "what changed and why" } ]
}

RULES:
- The eligibility wizard may ONLY match on the "eligibility" object. No free-text inference, no guessing outside the structure.
- Status meanings: "manually-verified" = a human re-checked the record against the official source on last_checked; "auto-extracted" = extracted from an official page, pending human check; "needs-re-check" = the source page changed, the record is excluded from featured and ranked lists until re-checked.
- Build-time validator: fail the build if any record is missing source_url, quote, verification.last_checked or changelog.
- Empty database renders honest zeros ("0 programs — data loads soon") — never placeholder examples with invented numbers.

Load my seed records when I paste them next. Then create a /coverage placeholder that lists counts by country computed from programs.json — real counts, no hardcoded numbers. Confirm the validator runs and passes.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Валидатор реально падает: временно удалите у записи source_url и убедитесь, что сборка ломается (потом верните).",
      "Счётчики на плейсхолдере /coverage считаются из programs.json, а не из константы в коде.",
      "У каждой записи есть eligibility-объект — без него мастер из Промта 4 не сможет работать.",
      "Никаких «примеров» с выдуманными программами в UI.",
    ]},
  ],
};

const P2 = {
  id: "p2",
  title: "Промт 2 — Визуальная система и задний фон",
  lead: [
    "Здесь два независимых решения, которые часто путают: структура/стиль страниц и фон. Ваш скрин — это спокойный премиальный editorial-дизайн (крем #F2EFE6, лесная зелень #2E4636, шалфейные панели #C3CDB4, крупные карточки с радиусом 20–24 px, serif-заголовок), а не неон-футуризм. Поэтому ниже три варианта: A — «точно как скрин», B — футуристичный тёмный фон под нишу (государственные здания как светящийся каркас, потоки данных, глубокий синий с тилом и золотом), C — рекомендованный гибрид: editorial-структура со скрина плюс одна футуристичная фоновая картинка в первом экране. Полная палитра скрина — в Приложении В.",
    "Выберите один вариант и отправьте только его. Вариант C даёт и премиальность скрина, и «крутую технологичность», которую вы просили, — поэтому он рекомендован. Если нужен именно тёмный футуристичный сайт целиком, берите B.",
  ],
  blocks: [
    { type: "h2", text: "Вариант A — «точно как скрин»: Editorial Trust" },
    { type: "prompt", label: "Промт 2A — скопируйте целиком:", text:
`Project: CivicClaim. Apply the visual system "Editorial Trust". Recreate the structure and feel of this reference layout with CivicClaim content: a calm premium editorial page — warm cream background, serif display headlines, a row of three rounded cards (photo, photo, solid sage panel with a pill button).

PAGE SHELL:
- Background: warm cream #F2EFE6 across the whole site. Headline text: deep forest green #2E4636. Body text: #3C5547.
- Accent surfaces: muted sage panels #C3CDB4; dark forest buttons #2E4636 with cream text #F2EFE6, fully rounded pill shape.
- Cards: white or cream, corner radius 20-24px, very soft shadows only (or none).
- Type pairing: a humanist serif for display headlines (Fraunces or Playfair Display) + a clean sans for body and UI (Inter). Tight leading on headlines (1.05-1.15). Eyebrow labels: 11px uppercase, letter-spacing 0.12em, forest green.

HERO (mirror this composition):
- Top-left: eyebrow "KNOW WHAT YOU'RE OWED".
- Below it: a large two-line serif headline, e.g. "Find what's yours." / "Official programs, explained." (final copy in the dictionary file).
- Right side, aligned to the lower half of the headline: a three-line sans paragraph.
- Below: a row of three rounded cards with ~20px gutters:
  Card 1 (wider, photo): golden-hour photo with a civic subject — people at a public office counter, a public library, or city hall steps. Caption bottom-left in cream serif: "Claim with confidence".
  Card 2 (photo): top-down flat-lay of official documents — a letter, an ID card, a pen on warm beige linen. Caption: "Your paperwork, sorted".
  Card 3 (solid sage panel): small floating cream badge with a thin-line icon top-right; serif heading "A plan made personal"; short sans paragraph; full-width dark pill CTA.
- Photography rules: natural warm light only; no stock-photo clichés; no identifiable faces unless licensed; if no photo is available use a soft sage gradient — never a broken image or a random stock filler.

ADAPT, DON'T COPY: keep the calm premium feel; replace every wellness subject with a civic one (official buildings, documents, everyday people getting answers). All green-on-cream text combinations must pass WCAG AA (4.5:1) — darken the green if needed.` },
    { type: "h2", text: "Вариант B — футуристичный: Civic-tech futurism" },
    { type: "prompt", label: "Промт 2B — скопируйте целиком:", text:
`Project: CivicClaim. Apply the visual system "Civic-tech futurism": a futuristic background that fits a public-money navigation platform. The mood is institutional trust with a tech edge — NOT cyberpunk, NOT dystopian.

BACKGROUND (hero plus section dividers; implement with CSS gradients and inline SVG only — no heavy images, no video):
- Base: a deep navy vertical gradient, #0A1628 to #10243E.
- Horizon grid: a subtle perspective grid of thin lines (1px, rgba(85,180,220,0.15)) receding toward a vanishing point slightly above the fold.
- Skyline: a minimalist wireframe silhouette of official architecture — a capitol dome, courthouse columns, city hall — as a single SVG path, stroke rgba(120,200,235,0.35), no fill.
- Data streams: 3-5 thin animated lines flowing from the buildings toward the viewer, teal #37DCF2 at 60% opacity, 8-12s loop, ease-in-out; completely static under prefers-reduced-motion.
- One warm accent: a thin gold #D4AF37 underline under the main headline (the money cue). No purple or pink neon, no glitch effects, no dystopia.
- Keep the central 60% of the hero low-density (grid fading out) so white headline text stays readable; contrast of at least 4.5:1 everywhere.
- Mobile: reduce grid density by about half and disable animation.

COMPONENTS: dark cards with 1px rgba(55,220,242,0.25) borders and a glass effect (backdrop-blur 8px, background rgba(16,36,62,0.6)); teal primary buttons; gold reserved ONLY for money amounts and the "Manually verified" status badge.
Type: geometric sans for display (Space Grotesk) + Inter for body.` },
    { type: "h2", text: "Вариант C — гибрид (рекомендуется)" },
    { type: "prompt", label: "Промт 2C — скопируйте целиком:", text:
`Project: CivicClaim. Apply the hybrid visual system: the calm editorial layout from the reference (cream background #F2EFE6, serif headlines, three-card rows, sage panels #C3CDB4, forest green #2E4636 text — full specs of the editorial shell as in Variant A) PLUS a single futuristic hero image as the background picture of the first screen only.

HERO BACKGROUND IMAGE:
- I will generate and upload the image separately (see my image-generation prompts). Until then use a CSS placeholder: the deep navy gradient from #0A1628 to #10243E with a faint grid.
- Full-bleed inside the hero container, height about 70vh, edge-to-edge, bottom corners rounded 24px.
- Overlay: linear-gradient(90deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.35) 60%, transparent 100%) so the white serif headline and cream subcopy sit on the left third.
- The futuristic element appears ONLY in the hero and in thin section-divider strips (same image family, ~20% height, desaturated, no text over them).
- Below the hero the page returns to the warm cream editorial style. Do not let the futuristic style leak into body sections.
- All text over the image must keep WCAG AA contrast; if a crop breaks contrast, strengthen the overlay, not the text color.` },
    { type: "h2", text: "Промты для генерации фоновой картинки (Midjourney / DALL·E / Flux)" },
    { type: "p", text: "Если хотите настоящую «картинку» как на готовых сайтах — сгенерируйте её в любом image-gen инструменте и загрузите в Runable (промт 2C уже ждёт файл). Ниже три готовых промта под специфику ниши: государственная архитектура, документы и деньги, возвращающиеся гражданам. Общие ограничения для всех трёх: без текста и логотипов в кадре, без неонового фиолетово-розового, без киберпанк-захламления и антиутопии, без узнаваемых людей; тёмная спокойная палитра, левая треть кадра — пустая под текст." },
    { type: "prompt", label: "Фон 1 — «Здание-голограмма» (основной, 16:9):", text:
`A futuristic civic plaza at dusk: a neoclassical government building with a dome rendered as a glowing teal wireframe hologram, thin golden data streams flowing from its entrance toward simple city homes in the foreground, deep navy sky, subtle perspective grid on the ground, calm and trustworthy atmosphere, cinematic wide shot, empty dark area on the left third for text, minimalist, no people, no text, no logos --ar 16:9` },
    { type: "prompt", label: "Фон 2 — «Документ становится суммой» (16:9):", text:
`Top-down view on a dark navy desk: an official government letter dissolving into fine teal light particles that reassemble into a simple ascending bar chart of money amounts, subtle gold highlights on the bars, shallow depth of field, futuristic yet institutional and calm, dark background, no readable text, no hands --ar 16:9` },
    { type: "prompt", label: "Фон 3 — «Город, где деньги возвращаются» (баннер 21:9):", text:
`A minimalist city skyline at night where public buildings — courthouse, library, city hall — glow softly as teal wireframes while thin golden lines connect them to ordinary homes, symbolizing public money flowing back to citizens, deep navy palette, subtle grid horizon, wide banner composition with a dark low-detail left side for headline text, serene and optimistic, no text, no logos --ar 21:9` },
    { type: "bullets", title: "Проверка после применения (любой вариант):", items: [
      "Главная открывается с выбранным стилем; в исходном HTML стиль виден сразу (серверный рендер).",
      "Контраст текста ≥ 4.5:1 — включая текст поверх картинки в варианте C.",
      "Анимации отключаются при prefers-reduced-motion (варианты B и C).",
      "Мобильная версия: сетка и картинка не ломают вёрстку на 360 px, плотность снижена.",
      "Стиль не «протёк» в другие секции: футер и таблицы остаются в базовой системе.",
    ]},
  ],
};

const P3 = {
  id: "p3",
  title: "Промт 3 — Главная страница",
  lead: [
    "Главная — это обещание с доказательствами: заголовок-обещание и две кнопки, три чипа доверия, один реальный результат из базы (вердикт, совпавшее условие, сумма, дедлайн, официальный источник, дата проверки), три шага, таблица покрытия, блок открытых данных и FAQ. Крупные цифры — только живые из facts.json; мировые суммы со ссылками переезжают на /coverage. Бизнес-контента на главной нет — только одна ссылка «For organizations».",
  ],
  blocks: [
    { type: "prompt", label: "Промт 3 — скопируйте целиком:", text:
`Project: CivicClaim. Build the home page. Exact section order:

1. HERO — the promise headline (serif, two lines max) + subline: "Free forever. Official source and check date on every result." Two buttons: primary "Check what I'm owed" -> /tools; secondary "Browse programs" -> /coverage. Under the buttons, three trust chips, exact copy: "Free forever for individuals", "Official source on every result", "Eligibility runs in your browser".

2. REAL RESULT EXAMPLE — one real program card from programs.json (pick a manually-verified record): verdict-style line "You likely qualify", the matched condition ("Matched: low income + residency"), amount with currency and as-of date, deadline, an "Official source" button (external link to source_url), and a "Checked: [date] · Manually verified" badge. This card must look like the actual wizard output — it is the proof of the promise, not an ad.

3. THREE STEPS — numbered, short, no marketing adjectives: "1. Answer 6 questions in your browser. 2. See 2-4 matched programs, each with its official source. 3. Claim on the official site."

4. COVERAGE TABLE — live from programs.json: rows are countries with program counts and last-checked dates; columns sortable. Section header "Coverage today". Link: "Full coverage and global numbers -> /coverage".

5. OPEN DATA & CODE — three lines, each with its link: "Database: CSV and JSON, updated weekly" -> /data; "Code: MIT, public repository" -> the repository URL; "Our compilation and metadata: CC BY 4.0. Underlying official texts remain under their sources' terms." -> /data.

6. FAQ — six real questions in an accessible accordion, answers 2-3 sentences each: Is this really free? Where does the data come from? What does "Manually verified" mean? Do you store my answers? Is this legal advice? (answer: no — information navigation only; the official source governs) What if I find an error?

7. FOOTER CTA — a single link "For organizations" -> /business. No business content on the home page.

RULES: big numbers ONLY live from facts.json (programs, countries, last checked), rendered server-side; NO global money totals on the home page — they live on /coverage; no testimonial placeholders; no fake partner logos; no numbers anywhere that are not in facts.json or programs.json.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Выключите JavaScript в браузере: главная по-прежнему показывает заголовок, чипы, карточку и счётчики (серверный рендер, никаких «$0»).",
      "Карточка-пример — реальная запись из базы со ссылкой на официальный источник и датой проверки.",
      "Мировых сумм на главной нет; они появились на /coverage (после Промта 6).",
      "FAQ открывается с клавиатуры; каждый ответ — 2–3 предложения, не «Contact us».",
      "Бизнес-контента нет; в футере — ровно одна ссылка «For organizations».",
    ]},
  ],
};

const P4 = {
  id: "p4",
  title: "Промт 4 — /tools: мастер eligibility в браузере",
  lead: [
    "Мастер — ядро продукта и главное доказательство приватности. Он задаёт по одному уточняющему вопросу (максимум шесть), сопоставляет ответы только со структурными правилами записей, показывает 2–4 программы и обязательно — какое условие совпало. Всё считается в браузере и работает офлайн после загрузки; ответы никуда не отправляются и не сохраняются. Бизнес-инструменты сюда не входят — им дорога на /business.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 4 — скопируйте целиком:", text:
`Project: CivicClaim. Build /tools — the eligibility wizard. Individuals only; business scanners belong on /business (add a small link "Using this for an organization?" -> /business).

FLOW:
- Step 0: country selector built from programs.json, each country with its program count.
- Then ONE question at a time, 6 questions max: residency status; age range; household; income band (rough bands, with an optional "prefer not to say" that widens results with a visible note); life situations (multi-select: senior, disability, veteran, parent, newcomer, affected by a disaster, farmer); housing status.
- Matching runs ONLY on the "eligibility" object of program records. For every shown program display WHICH condition matched, e.g. "Matched: low income + children in household".
- Results: 2-4 programs, manually-verified first, then auto-extracted. Each card: program name, verdict line, matched condition, amount + as-of date, deadline, "Open official source" (source_url, external), verification badge + last checked date.
- Zero matches -> honest empty state: "No verified match in our database for this combination" + link to that country's official benefits portal + "try removing a filter".

PRIVACY (the core proof of the product):
- All matching runs in the browser. No answers are sent anywhere. Nothing is stored after the tab closes.
- OFFLINE SUPPORT: after the page has loaded, the wizard must keep working with the network disconnected (answers live in memory only).
- Under the wizard, the exact line: "Eligibility answers are processed in your browser. If you use the AI guide, the text you type is sent to our AI provider."
- No account, no email. Analytics may count anonymous events like "wizard_completed" — never answers.

QUALITY: progress indicator; back navigation; fully keyboard-operable; screen-reader announcement on step change and on results; results are shareable by URL only if the URL contains NO answers.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Откройте /tools, дождитесь загрузки, отключите сеть — мастер проходит от первого вопроса до результатов.",
      "В карточках результатов видно, какое условие совпало у каждой программы.",
      "В сетевых запросах во время прохождения нет ничего, похожего на ваши ответы (проверьте вкладку Network).",
      "«Prefer not to say» по доходу расширяет список и показывает пометку об этом.",
      "Пустой результат — честный текст + официальная ссылка, не «ничего не найдено» без альтернатив.",
    ]},
  ],
};

const P5 = {
  id: "p5",
  title: "Промт 5 — Страницы программ /programs/[country]/[slug]",
  lead: [
    "Отдельная страница на каждую программу — это и доверие (цитата из официального источника, дата проверки, журнал изменений, кнопка «Report an error»), и бесплатный поисковый трафик, которого не хватает проекту: тысячи длинных запросов вида «SNAP eligibility [штат]» приводят именно на такие страницы. Все страницы генерируются статически из programs.json с типизированной разметкой GovernmentService.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 5 — скопируйте целиком:", text:
`Project: CivicClaim. Build /programs/[country]/[slug] — one static page per program record. Each page must be complete and self-sufficient: a person sent here by a search engine must understand the program without visiting any other page.

SECTIONS, in order:
1. H1 program name + agency + category chip + breadcrumb (Home / Coverage / [Country]).
2. "Who qualifies" — plain-language bullets derived from the eligibility object + the record's quote in a quote block with the source link, labeled "From the official source:".
3. "How much" — the amount with currency and as-of date, linked to the source. Never a bare number.
4. "Deadline" — the deadline or "Apply any time".
5. "Steps" — ordered list from the record.
6. "Documents" — checklist from the record.
7. Verification block: badge ("Manually verified" / "Auto-extracted" / "Needs re-check"), "Last checked: [date]", "Official source: [agency] ([source_url], opens in a new tab)". The badge links to /method with a tooltip "What does this mean?".
8. Changelog — dated list from the record.
9. "Report an error" button -> prefilled issue link (repository issue template) or /contribute#report.
10. Related programs (same country and category, max 3) + CTA "Check eligibility for this program" -> /tools?country=[country] (the wizard may prefill the country ONLY, never answers).

SEO: generate all pages statically from programs.json; title tag "[Program] — [Country] | CivicClaim"; meta description = the record summary; canonical URLs; JSON-LD GovernmentService schema with the official source as service provider URL.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Каждая запись из programs.json имеет свою страницу с корректным URL.",
      "Цитата в блоке «From the official source» совпадает с полем quote записи слово в слово.",
      "JSON-LD валиден (проверьте в Rich Results Test или валидаторе схемы).",
      "Кнопка «Report an error» ведёт на предзаполненный issue или /contribute.",
      "У «needs-recheck»-записей страница показывает бейдж и не подставляется в «related» списки.",
    ]},
  ],
};

const P6 = {
  id: "p6",
  title: "Промт 6 — /coverage: страны и мировые суммы",
  lead: [
    "Страница покрытия забирает у главной все мировые суммы — здесь у каждой цифры обязаны быть собственная строка-источник, дата и бейдж «verified» или «estimate». Живые счётчики (программы, страны, источники, дата последней проверки) приходят из facts.json и рендерятся на сервере. Отдельный блок «What we don't cover yet» честно перечисляет страны в работе — это дешёвый способ показать зрелость проекта.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 6 — скопируйте целиком:", text:
`Project: CivicClaim. Build /coverage — the honest numbers page.

1. Live counters from facts.json, server-rendered: programs, countries, sources, programs manually verified, last database check date.
2. Table by country, computed from programs.json: country, program count, categories covered, languages, last checked (the latest last_checked among its records). Sortable and searchable.
3. GLOBAL MONEY TOTALS live HERE, not on the home page. Each total is its own row from facts.json with: source link, as-of date, and a "verified" or "estimate" badge. Seed rows: unclaimed property held by US states; unclaimed superannuation in Australia; unclaimed financial assets in Kenya. If a figure is an estimate, the badge must say "estimate" — no silent mixing.
4. "What we don't cover yet" — an honest list of countries and regions in progress, with a link to /contribute ("Help us cover [country]").
5. Methodology link -> /method.

RULES: no totals without a source row; no world-wide aggregate unless every component has a source; no hardcoded counts — everything computed from the data files.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Каждая мировая сумма — отдельная строка со ссылкой, датой и бейджем verified/estimate.",
      "Таблица стран считает количество программ из файла, а не из константы.",
      "Счётчики видны в исходном HTML без JavaScript.",
      "Блок «What we don't cover yet» непустой и честный (не «весь мир скоро»).",
    ]},
  ],
};

const P7 = {
  id: "p7",
  title: "Промт 7 — /data: открытые данные",
  lead: [
    "Страница данных превращает базу в актив: CSV и JSON для скачивания, схема полей, честный лицензионный блок (компиляция — CC BY 4.0, официальные тексты остаются под условиями источников, код — MIT), секция институционального API со статусом «planned» и общий changelog базы. Именно сюда ведут ссылки из блока Open Data на главной.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 7 — скопируйте целиком:", text:
`Project: CivicClaim. Build /data — the open data page.

1. DOWNLOADS: programs.csv and programs.json generated at build time, plus facts.json. Show record counts read from the files themselves, not hardcoded.
2. SCHEMA: field-by-field documentation tables for both files (field, type, required, description).
3. LICENSES block, exact copy: "Our compilation and metadata: CC BY 4.0. Underlying official texts remain under their sources' terms. Code: MIT." Add a per-field note: source_url and quote belong to the official source and follow its terms.
4. API for institutions: a short section — "Institutional API — planned. Institutions need stable identifiers, bulk export and uptime guarantees. Contact: [business contact]. Individuals never need the API." Link -> /business. Mark the section with a visible "Planned" badge.
5. CHANGELOG: the database changelog — the latest 20 entries merged from all records' changelogs, sorted by date, each linking to its program page.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "CSV и JSON реально скачиваются и открываются; количество записей на странице совпадает с файлом.",
      "Лицензионный блок дословен (это юридически значимая формулировка).",
      "API-секция помечена «Planned» и не содержит выдуманных цен или SLA.",
      "Changelog показывает даты и ведёт на страницы программ.",
    ]},
  ],
};

const P8 = {
  id: "p8",
  title: "Промт 8 — /method: как работают данные",
  lead: [
    "«Method» — документ доверия: что значит «Manually verified», каков цикл свежести, как считаются суммы и как исправляются ошибки. Пишите короткими предложениями без защитных формулировок — страница читается скептиком, который решает, верить ли продукту. На неё ссылается каждый бейдж верификации.",
  ],
  blocks: [
    { type: "prompt", label: "Промт 8 — скопируйте целиком:", text:
`Project: CivicClaim. Build /method — how the data works. Answer four questions in plain language, short sentences, no defensiveness:

1. "What does 'Manually verified' mean?" — a human opened the official source and re-checked the key facts (amount, eligibility, deadline) on the shown date. "Auto-extracted" means extracted from an official page and pending that human check. "Needs re-check" means the source page changed since the last check.
2. "How fresh is the data?" — an automated job re-checks every source weekly; any change flips the record to "Needs re-check" and removes it from featured lists until a human confirms it. Manually verified records are re-checked at least every 30 days.
3. "How are amounts computed?" — we show amounts exactly as the official source states them (a range, a maximum, or a formula), always with currency and as-of date. We never silently adjust or annualize; any currency conversion is labeled "approximate conversion, [date]".
4. "How are errors fixed?" — anyone can press "Report an error" on a program page; reports are triaged within 7 days; fixes land with a changelog entry that says what was wrong.

Link this page from every verification badge (tooltip "What does this mean?"). Tone: this page is our credibility document — specificity over reassurance.` },
    { type: "bullets", title: "Проверка после применения:", items: [
      "Четыре вопроса отвечены прямо, каждый — с конкретными числами (7 дней, 30 дней).",
      "Каждый бейдж верификации на сайте ведёт сюда.",
      "Нет обещаний вида «we take data quality seriously» без механики — только правила и сроки.",
    ]},
  ],
};

module.exports = { INTRO, CHAPTERS: [P0, P1, P2, P3, P4, P5, P6, P7, P8] };
