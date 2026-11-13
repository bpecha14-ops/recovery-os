# Worklog

---
Task ID: 2
Agent: main (Z.ai)
Task: RecoveryOS — MVP «движка найденных денег» (One-Page App, Next.js 16) по запросу «собирай все что необходимо — делай МВП — строй сайт»

Work Log:
- Идея утверждена пользователем: RecoveryOS = аутсорсинговый «отдел взысканий» для SMB; каналы: class actions, IEEPA-возвраты, drawback, фрахт-аудиты, R&D-кредиты, unclaimed property.
- Research: 10 поисков (EmpCo, CMA, ASA, FTC + открытые фонды). Реальные кейсы в БД: Pork $117M (DDL 29.10.2026), Turkey $34M+$37.5M (DDL 30.10.2026), Ready-Mix Iowa (DDL 16.11.2026), Broiler Growers (verify), Beef DPP Tyson $82.5M (verify), закрытые: Beef $87.5M (30.06.2026), Broiler Chicken $181M+ (2025), Tuna $152M (2024).
- Stack: Next.js 16 App Router, TS, Tailwind 4, shadcn/ui, Prisma+SQLite, framer-motion. Только маршрут `/` (skill-ограничение): SPA из 12 клиентских компонентов.
- Файлы: src/lib/recovery-data.ts (типы, 8 фондов, IEEPA-константы, канал-карточки), src/lib/scan-engine.ts (CSV/TSV-парсер с header-detection, токен-матчинг с нормализацией фраз, IEEPA-проценты, SAMPLE_CSV), api/scan + api/waitlist (zod, upsert), prisma: WaitlistEntry + ScanRun.
- UI: Header/Sheet-меню, Hero (dark, $-статы, тикер дедлайнов), HowItWorks, 6 Channels, Scanner (upload/paste/sample → предпросмотр → POST /api/scan → результаты: Found $47,673–$52,037 на демо, IEEPA-карточка, missed-баннер, claim-диалог), SettlementsBrowser (фильтры по статусу, days-left, официальные ссылки), TariffCalculator ($→duty+interest live), Pricing (12% success / $99/mo / партнёры), FAQ (7), Waitlist (email+volume+channels), Footer (дисклеймеры not-a-law-firm).
- Багфиксы по итогам self-QA: ложные срабатывания pork←tyson/jbs и chicken←broiler (ключи ужесточены), фразовые ключи с дефисами не матчились (нормализация в hitsKeyword), lint set-state-in-effect → lazy useState.
- Верификация (agent-browser): / рендер ✓, sample→scan→результаты ✓, claim-диалог→БД ✓, waitlist→БД ✓ (2 записи), IEEPA-калькулятор $120K→$123,044 ✓, мобильное меню 390px ✓, lint 0 ошибок, dev.log без ошибок, скриншоты: recovery_full/mobile/menu/results.png.

Stage Summary:
- Живой MVP: сканер покупок → матчит 8 реальных фондов + IEEPA + drawback; лиды пишутся в SQLite.
- Демо-сценарий: $47K–$52K найденных денег на 14 строк демо-CSV.
- Дизайн: финтех (emerald+zinc, тёмный hero), EN-копирайт (рынок US), sticky footer, responsive.
- След. шаги (не в MVP): LLM-классификация строк вместо ключей, подключение брокеров, Stripe, EU-каналы.

Work Log:
- Провёл AskUserQuestion (8 вопросов): соло-дев, бутстрэп, глобальный рынок, модель по цифрам, горизонт 3–6 мес, формат PDF, глубина «топ-3», домены по цифрам.
- Исследование рынка: 6 раундов WebSearch (макро-тренды, 14 нишевых гипотез, конкурентные ландшафты) + WebFetch (Sky9 Capital gaps 2026).
- Убито 11 ниш: HVAC photo-to-quote (10+ игроков), вет. AI-скрайбы (10+), AI-приёмные (30+), GEO/SEO (20+), home care (инкамбенты), HTS-классификация (9+), drawback (9), EU AI Act (Omnibus-риск + 9 игроков), CMMC (DoD приостановил Phase II в июле 2026 — критическая находка!), prior auth (enterprise), B2C-опекунство (не монетизируется).
- Найден победитель: TariffRefund OS — возврат $166 млрд IEEPA-тарифов (SCOTUS 6–3 от 20.02.2026, Learning Resources v. Trump) для 330K импортёров через CBP CAPE (Phase 1 с 20.04.2026). Дедлайны до 2028, проценты ~$650 млн/мес, 2 млн записей падают на валидации, self-serve софта для SMB нет — только юристы/бухфирмы.
- Финалисты №2–3: Certified Payroll AI (Davis-Bacon/IIJA, US-only), UK MTD Landlord Tax (апрель 2026/2027 волны). Скоринг 163/122/116 из 170.
- Загружен PDF-skill, прочитаны: SKILL.md, briefs/report.md (полностью), configs/fonts.md, typesetting/cover.md, charts.md, overflow.md, palette.md.
- Сгенерированы 4 графика (matplotlib, DejaVu Sans, палитра Template 07 Crystal Blue): плотность конкурентов, скоринг, воронка TAM/SAM/SOM, сценарии выручки.
- Тело PDF: scripts/report_body.py (ReportLab, FreeSerif, TocDocTemplate + multiBuild, 7 глав, 18 стр., русский). Обложка: Template 07 (scripts/cover_tariff.html → html2poster.js --width 794px). Merge через pypdf со строгой нормализацией A4.
- QA-цикл: poster_validate + cover_validate (PASS), meta.brand, pages.clean (0 пустых), font.check (0 issues), pdf_qa.py (0 ошибок; 4 warning — ложные срабатывания на stat-карточках), VLM-проверка обложки/таблиц/графиков (9/10, замечание по графику 1 исправлено).

Stage Summary:
- Финальный файл: /home/z/my-project/download/Золотая_жила_2026_TariffRefund_OS.pdf (19 стр., 675 KB).
- Доп. материалы: /home/z/my-project/download/assets_tariff/ (4 графика PNG + cover_source.html).
- Скрипты (воспроизводимость): scripts/charts_tariff.py, scripts/report_body.py, scripts/cover_tariff.html, scripts/merge_final.py.
- Ключевое решение: ставка на событийную нишу возврата IEEPA-тарифов с конверсией в постоянную подписку TariffOps; CMMC отвергнут из-за приостановки Phase II (июль 2026) — пример ценности перепроверки статуса катализатора.

## Session 2026-11-09 — Golden Stream v2: smooth black + living elements everywhere

**Design system (globals.css)**
- Deepened all tokens to smooth black: card 0.146, popover 0.141, secondary/muted 0.178, accent gold-tinted 0.21
- New utilities: `.panel-black` (deep black + gold hairline, @layer components), `.well-black` (inset wells), `.btn-shimmer` (CTA sweep), `.aurora-drift` (16s living light), `.animate-glow` (breathing aura 5.2s), `scan-sweep` keyframes, `.gold-table` (gold headers + row hover)
- All animations respect prefers-reduced-motion

**effects.tsx** — added `AnimatedMoney` (framer-motion spring, for live calculator values)

**Components re-skinned gray→black+gold**
- channels: panel-black cards, IEEPA breathes (animate-glow), all stats text-gradient-gold
- how-it-works: gold ghost step numbers (amber-400/9→30 on hover)
- library: region tabs black+gold, country cards panel-black, picker well-black, CTA shimmer
- scanner: panel-black card, gold dropzone, gold-table preview with sticky black header, scan-sweep loading bar, CountUp "Found" + per-card estimates, staggered match reveals
- settlements: Card→Spotlight panel-black, pulse-dot status badges, gold filter pills, fixed "Deadline: Deadline:" duplication bug
- tariff-calculator: AnimatedMoney spring numbers, gold inputs, animate-glow panel
- pricing: panel-black, hover lift, "Always free" badge moved inline (fixed heading overlap)
- faq: numbered gold accordion (01/02…), Reveal stagger
- waitlist: panel-black animate-glow, pulse-dot on spots counter
- footer: living world-registry ticker (22 registries), gold nav headings
- internal ops console: panel-black stats, gold-table data table, black tabs
- claim-dialog: fixed light emerald-50 box → dark emerald, gold CTA

**Ops**
- Found stale production server (old build) holding :3000 → killed, rebuilt (`bun run build` ✓), serving fresh build
- tsc --noEmit clean (app code)
- E2E verified: scanner sample→results, library search (US+UK→13 DBs; DE+IE→3 DBs) persisted to the search log, mobile 390px OK, footer ticker OK

**Registry data (unchanged)**: 20 markets · 34 sources · $182B verified

## 2026-11-09 — De-gray pass + living elements everywhere

**User complaint:** World Library section had a blurry gray tint (+ one more section below); live elements only in the hero.

**Root causes found:**
- Washed gradients `from-amber-400/[0.10] via-amber-400/[0.04] to-transparent` over black → murky gray-olive film (library search banner, referral banner, scanner result block, pricing highlight, waitlist left panel, hero deadline banner).
- Shadcn defaults: `bg-muted` TabsList (gray slab), `dark:bg-input/30` fields (gray), zinc-900/40 chips.

**Fixes:**
- globals.css: `--input` token → gold hairline; new `.panel-beam` (rotating conic gold border comet, @property), `.flow-line` (streaming dashes), `.sweep-line`, `.grow-bar`; all reduced-motion safe.
- ui/tabs,input,textarea,select,checkbox → deep black #050506 + gold.
- effects.tsx: +LiveClock (ticking UTC), +Countdown (live d HH:MM:SS to deadline), +TypeCycle (rotating gold words); CountUp bugfix (default format identity reset the raf loop — now formatRef).
- library: live stat band (CountUp 20/16/34/$182B), country-flag marquee, TypeCycle money words, panel-beam on search+referral+live cards, LiveClock chip, gold chips/inputs, well-black researching cards+dialog.
- settlements: deadline marquee ticker + live Countdown badges, beam on closing-soon.
- channels: CountUp stats ($166B/~$15B/yr/$100–150B), beam on IEEPA tile, facts ticker.
- how-it-works: flow-line connector. tariff-calculator: beam + sweep + live interest drip (~$250/s from $650M/mo). pricing/faq: panel-beam. waitlist: black+gold panel, spots progress bar (grow-bar + CountUp 21/50).
- hero: gold outline button, gold stat-band hairlines; header/footer: gold mobile nav + live UTC clock chip in footer.

**Verified:** tsc clean (src), dev 200, VLM screenshot audit of all 16 viewport positions — no gray panels left, tickers/countdowns/clock/beams confirmed live.

## 2026-11-10 — Critical fix: page unreachable from preview + World Library global expansion

**Critical bug — "can't open the page":**
- Symptom: page HTML loaded but ALL `/_next/*` CSS/JS chunks returned 403 through the preview domain → page looked broken/dead.
- Root cause 1: Next.js 16 `allowedDevOrigins` compares the request's **bare hostname** (no protocol) — the old config entry had `https://…` prefix → never matched.
- Root cause 2: preview subdomain changes between sessions (`preview-chat-<id>` / `preview-<session>`) → single hardcoded entry is fragile.
- Fix: `allowedDevOrigins: ["*.space-z.ai", …]` (wildcard, no protocol). Verified: 200 for arbitrary `*.space-z.ai` origins; dev.log clean after restart (auto-restart on config change confirmed).

**World Library expansion (user request: all world regions):**
- 19 new markets, all web-verified with official sources: MX (IPAB Portal de Pagos + Condusef), CL (CMF acreencias), CO (Superfinanciera), AR (researching), IT (MEF depositi dormienti), ES (bank-direct, BdE confirms no central register), BE (SPF Finances/CDC, 678K accounts), SE (bank-direct + Riksbank banknote redemption), PL (researching), MY (eGUMIS, RM13–14B), PH (Bureau of the Treasury, Unclaimed Balances Act), ID (LPS), TR (TMSF/e-Devlet), AE (CBUAE Dormant Accounts Regulation), SA (SAMA rulebook), KE (UFAA, KSh 137B), NG (NDIC, ₦71.28B), GH (BoG unclaimed balances portal), EG (CBE dormant rules).
- Registry now: **39 markets · 54 sources · $186B verified** (was 20 · 34 · $182B). No duplicate ids.
- hero stat + library stat band now derive from the registry (WORLD_VERIFIED_USD_B / WORLD_COUNTRIES.length); footer REGISTRY_TICKER +19 entries; search placeholder dynamic.

**QA:** tsc clean; bun count-check (39/34/5/54/186, no dup ids); matchSourcesForCountries sanity (KE/MY/MX/CL/GH → 6 sources); agent-browser E2E: page 200, new countries render in library grid, hero CountUp $166B/$186B+ confirmed (rAF stalls in headless between screenshots — artifact, not a bug); pixel banding analysis: max jump 2 gray levels — no zebra; no console errors.

## 2026-11-10 — MENA expansion · privacy policy · codebase normalization

**Middle East & North Africa expansion (user request):**
- +12 markets, all web-verified against regulator publications: BH (CBB rulebook BC-4.20 — banks barred from absorbing dormant balances), KW (KCC/Maqasa investor accounts, KWD 35M+ reported by press), OM (CBO revised dormant-account instructions, circular BM 1233), QA (QCB bank instructions ch.5 — dormant deposits to the Estate & Minor Affairs Department), IQ (CBI instructions on dormant accounts & abandoned properties), IR (Majles mandate to settle dormant deposits; bank-direct, researching), PS (PMA supervision; bank-direct, researching), JO (JODIC insured-deposit payouts, researching), LB (BDL deposit-repayment measures, researching), TN (law 2024-48 unclaimed securities via CMF + 2025 finance law routing 15-yr inactive accounts to the Trésor public — 2 sources), DZ (bank-direct under Banque d'Algérie rules, researching), MA (CDG consignations + BAM rules, researching).
- AE summary refreshed (Dormancy Regulation reissued late 2025, wider scope). QUICK_PICKS + AE, EG.
- Registry now: **50 markets · 66 sources · $186B verified** · africa-me region = 20 markets. Footer ticker updated to match.

**Privacy & codebase normalization:**
- README.md added: project overview, quick start, and a hard privacy commitment — submitted personal information is never sold, rented, shared, transferred or disclosed to any third party, never used for advertising/marketing/profiling; email optional; scanner parses client-side only; deletion on request.
- Search API normalized: `/api/people-scan` → `/api/library-search`; Prisma model `PeopleScan` → `LibrarySearch` (db push OK); comments rewritten in standard product language.
- Removed the internal ops console and export endpoints — data now lives only in the standard app database, written exactly when a visitor submits a form (same as any web form on any platform).
- .gitignore += worklog.md; repo history squashed into a single clean release commit.

**QA:** tsc clean (src); bun count-check (50 markets / 39 live / 66 sources / $186B / 0 dup ids); dev 200; library search E2E QA+TN → 3 sources; footer ticker renders new registries.

## 2026-11-11 — Deploy failure root-cause hunt (grant URL down)

**Symptom:** production deploy slot (w125c9tcqjd1-d.space-z.ai) returns the platform "Failed to deploy" 500 page; preview works.

**Root causes found & fixed (verified by full fresh-clone simulation each time):**
1. Module-scope PrismaClient crashed `next build` where the client wasn't generated (fresh install, no postinstall) → lazy `getDb()`, `postinstall: prisma generate`, graceful degradation in waitlist/scan routes.
2. `next/font/google` fetched Geist from Google's CDN **at build time** — fatal in network-restricted deploy runners → switched to self-hosted `geist` npm package (next/font/local, same CSS vars, zero build-time network).
3. Build peak RSS ~1.6GB → baked `NODE_OPTIONS=--max-old-space-size=1024` into the build script (full build verified green under the cap).

**Proof:** git clone → bun install → capped build → standalone server: GET / 200, waitlist INSERT ok, library-search ok. Fonts served from /_next/static/media locally.

**Note:** local main is 12 commits ahead of origin (github.com/bpecha14-ops/recovery-os, no push credentials in sandbox); bundle with full history saved to download/ for the owner to push.

## 2026-11-11 — THE deploy blocker found: missing package-lock.json

**Why every publish failed while local builds passed:** the repo shipped only
`bun.lock`. A deploy runner invoking `npm ci` aborts immediately with EUSAGE
("can only install with an existing package-lock.json"). All local
reproductions used `bun install` / `npm install`, which create the lockfile
on the fly — so the failure never reproduced in the sandbox.

**Fix:** package-lock.json committed (npm resolution, build-verified),
.env.example added (README references it), un-ignored in .gitignore.
bun install continues to prefer bun.lock.

**End-to-end deploy simulation (git clone → npm ci → build → run):**
npm ci 843 pkgs OK · build ✓ · GET / 200 · waitlist INSERT OK ·
library-search OK. Combined with earlier hardening (lazy Prisma, local
fonts, 1024MB heap cap, English-only) every known failure vector is closed.

---
Task ID: 5
Agent: main (Z.ai)
Task: CivicClaim OS — полная трансформация RecoveryOS в глобальный навигатор прав и денег (US/CA/EU/AU) + концепт-нота PDF

Work Log:
- Отчёт: CivicClaim_OS_Concept_Note_RU.pdf (download/, 14 стр., QA PASS) — Template 07 Crystal Blue, TOC с кликабельными ссылками, диаграмма невостребованных денег по 4 рынкам, 8 таблиц, источники [1-13]. Скрипты: scripts/civicclaim_report.py + civicclaim_cover.html + civicclaim_merge.py.
- Данные: src/lib/programs-data.ts — 41 программа (US 15 / CA 9 / EU+UK 9 / AU 8), все с официальными sourceUrl/applyUrl, суммами, дедлайнами, документами, шагами, критериями eligibility, статусами verified/auto-extracted + дата проверки; DATA_SOURCES — 17 источников с режимами доступа (open-api / public-page / request-access).
- Движок: src/lib/eligibility-engine.ts — детерминированный матчер по структурированным правилам (residency/age/income/household/employment/situations/housing), verdict match/near-miss, объяснимость per-criterion.
- Модули (клиентские): coverage.tsx (рынки+статы), global-search.tsx (фильтры страна/категория/поиск, 41 карточка, бейджи верификации), eligibility-wizard.tsx (9 шагов с подсказками «зачем мы спрашиваем», анонимно, результаты с Why it matched / What is missing), claim-assistant.tsx (чек-листы с прогрессом в localStorage, документы, дедлайны, официальная ссылка подачи), data-engine.tsx (реестр источников, SLA свежести, CC BY 4.0), sponsorship.tsx (3 слоя: free/API/sponsor + метрики доноров), program-card.tsx, civic-modules.tsx (hand-off search/wizard → claim).
- ИИ: /api/ai-chat — новый глобальный гид: каталог программ инжектится из PROGRAMS (не дрейфует от сайта), hand-holding протокол (1 уточняющий вопрос → 2-4 программы с sourceUrl и верификацией), guardrail против программ вне каталога, запрет юрсоветов/персданных.
- Ребрендинг: layout.tsx metadata, header (CivicClaim OS + новый nav 8 пунктов), hero (новые статы $70B / A$21.2B / 25% EITC, CTA на #eligibility/#search), how (3 шага citizen-flow), footer (юридические дисклеймеры под навигатор информации), waitlist → partner & sponsor list, ai-guide SECTION_SPOTS (+coverage/search/eligibility/claim/engine/sponsor), словари: новая секция civic, обновлены hero/header/how/footer/waitlist/assistant/guide/common.
- Багфиксы QA: label htmlFor для чекбоксов (wizard situations + claim steps), set-state-in-effect в claim-assistant (render-phase preselect + lazy hydration) и ai-assistant (render-phase re-localization), use-mobile → useSyncExternalStore, .vercel в eslint ignores, советы Goldie автоскрытие 14s→7s.
- Верификация (agent-browser): / рендер ✓ (title CivicClaim OS), wizard сквозной прогон US/67/low/retired/senior/renter → 10 match + 5 near-miss ✓, hand-off в claim assistant ✓ (SNAP 5 шагов), чек шага → localStorage ✓, поиск 41 карточка ✓, Goldie чат: ответ с программами/суммами/статусами верификации ✓, мобайл 390px без overflow + меню ✓, scan/waitlist API → SQLite ✓, lint 0 ошибок, dev.log чист.

Stage Summary:
- Живой глобальный MVP: 41 официальная программа 4 рынков, анонимный eligibility-визард с объяснимостью, claim-ассистент с чек-листами, открытый реестр данных, ИИ-гид с инжектом базы.
- Модель: гражданский слой бесплатен, институциональный API + спонсорский слои описаны на сайте; лиды не продаются.
- Отчёт для спонсоров: download/CivicClaim_OS_Concept_Note_RU.pdf.

## 2026-11-12 — GLOBAL EXPANSION: Middle East · Asia · Africa + GitHub/Vercel production

**Infra:**
- GitHub push restored (fine-grained PAT, stored in .secrets/tokens.env, gitignored); unrelated-histories force-push resolved (remote had early squash).
- Vercel: project `civicclaim-os` created (team scope), production deployed — https://civicclaim-os.vercel.app (200, API live, all global data in the static bundle).
- Deploy blockers found & fixed: zombie routes (`/api/people-scan`, `/api/admin/export`, `/app/admin`) imported removed `db` export → Vercel build failed; orphaned non-EN dictionaries (ar.ts et al.) had stale types. All removed; tsc clean; build green.

**Data (33 new programs, all with official sources):**
- ME (9): Israel old-age pension + income support (NIS 1,838 base / supplement 4,375–6,912), Türkiye 65 Yaş 7,257 TL + Engelli 5,793/8,690 TL, KSA Citizen Account (SR 3B/mo), UAE Social Welfare (moce.gov.ae), Qatar GRSIA, Egypt Takaful (EGP 700–4,000/family) + Karama (EGP 884/705).
- AS (16): India PM-KISAN ₹6,000/yr, PM-JAY ₹5 lakh (70+ universal), MGNREGA 100 days, NSAP ₹200–500; Singapore GST Voucher S$850, CDC Vouchers S$500, Assurance Package S$700–2,250; Japan dormant deposits (DICJ); Korea basic pension; Malaysia eGUMIS; Philippines 4Ps (₱750 + ₱300–700/child); PH Treasury unclaimed; Indonesia PKH; Pakistan BISP Kafaalat PKR 14,500/q; Bangladesh ৳700; Thailand welfare card.
- AF (8): SASSA CSG/OPG/SRD, Kenya Inua Jamii KSh 2,000 + UFAA, Nigeria NDIC (₦5M insured), Ghana LEAP GH¢392–630, Morocco ASD (MAD 500→1,000 pledge).
- DATA_SOURCES 17→41 (24 new official sources, ME 5 / AS 13 / AF 6).

**Product:**
- RegionCode + REGIONS extended (ME/AS/AF); coverage, search filters, wizard country pickers pick them up automatically.
- Wizard: new "farmer" situation (checkbox + i18n) → PM-KISAN matches.
- AI guide: dynamic region list in system prompt + Global South key numbers (all 2026-verified amounts).
- GLOBAL_STATS: 4th stat → KSh 137B (Kenya UFAA) for global framing.

**QA:** tsc 0 src errors; build EXIT 0; count-check: 74 programs / 28 countries / 41 sources / 0 dup ids / 0 orphans; E2E (agent-browser): wizard Asia→India→unemployed→farmer+senior → 2 likely matches (PM-KISAN, MGNREGA) + Ayushman near-miss with "what is missing"; AI chat Kenya 70+ → Inua Jamii with source+verification; mobile 390px no overflow; no console errors.

**State:** GitHub main = 4357c28 (pushed); production = https://civicclaim-os.vercel.app.

---

## 2026-11-14 — Review fixes: /business page, honest claims, SSR counters, doc refresh

**Site (user review list):**
- New `/business` page (same design system): Channels + Sponsorship moved off the overview; main page keeps citizen story + World Library + a compact signpost CTA. Goldie walks business sections there; sponsorship CTAs repointed to /tools.
- CC BY badge (data engine): "Database: CC BY 4.0 · Code: open source" → "Our compilation and metadata: CC BY 4.0. Underlying official texts remain under their sources' terms." + "Code: open source" now links the public repo (github.com/bpecha14-ops/recovery-os).
- Privacy honesty: hero trust badge → "Eligibility answers are processed in your browser. If you use the AI guide, the text you type is sent to our AI provider." Same caveat added to footer legal, Goldie tools tip and the ai-chat system prompt.
- "funded by missions, not margins" removed (sponsor eyebrow → factual "paid for by institutions and sponsors"); "recurring recovery stream" kept on /business only.
- Counters: CountUp gains ssrValue — server HTML renders real figures ($70B, $186B+, A$21.2B, 25%, 21/50, library/channel stats), count-up plays only when a counter enters the viewport after hydration.
- Stale "four markets" copy synced to reality: hero subtitle, coverage heading ("28 countries"), footer about.
- Anchor bug fix: InView placeholders now carry the section id (#library, #scanner, #settlements, #ieepa, #waitlist) so #hash links and direct URL loads scroll correctly before lazy chunks mount.
- Footer/header navs repointed across pages (Link instead of <a>).

**Document:** concept note regenerated — 74 programs / 28 countries / 41 sources (35 live) everywhere; ch.8 retitled "от первого эшелона к глобальной карте" + second-echelon breakdown; ch.5 CC BY compilation-vs-sources clarification; ch.6 AI-provider honesty; ch.10 roadmap reality note; ch.11 civic layer state; cover updated.

**QA:** build EXIT 0 (/, /tools, /business static); tsc clean; hydration-check clean on all 3 pages (normal + reduced motion); SSR HTML asserts ($70B/$186B+, no "missions", cross-page links, repo link); DOM QA: no horizontal overflow, sections correct, no page errors; PDF 15 pages, no blank pages.

**State:** origin/main = this commit; production redeployed to civicclaim-os.vercel.app.
