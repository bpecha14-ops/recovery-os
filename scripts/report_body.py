# -*- coding: utf-8 -*-
"""Body PDF for 'Золотая жила 2026: TariffRefund OS' strategy report.
Report route (ReportLab). Template 07 Crystal Blue fixed body palette.
Chapter numbering: cover/TOC not numbered; body starts at Chapter 1.
"""
import os
import sys
import hashlib

PDF_SKILL_DIR = '/home/z/my-project/skills/pdf'
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, 'scripts'))

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                Table, TableStyle, Image, KeepTogether,
                                CondPageBreak, HRFlowable)
from reportlab.platypus.tableofcontents import TableOfContents
from PIL import Image as PILImage

# ─── Fonts ───────────────────────────────────────────────────────────────
FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
# Static 'Noto Sans SC' files are absent in this environment (variable font only, which
# ReportLab cannot parse). Register Sarasa substitutes under the canonical names so the
# fallback chain resolves; they are never used for Cyrillic body text.
pdfmetrics.registerFont(TTFont('Noto Sans SC', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Noto Sans SC Bold', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
registerFontFamily('Noto Sans SC', normal='Noto Sans SC', bold='Noto Sans SC Bold')
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

from pdf import install_font_fallback  # noqa: E402
install_font_fallback()

# ─── Template 07 Crystal Blue body palette (fixed) ───────────────────────
PAGE_BG      = colors.HexColor('#f5f8fc')
SECTION_BG   = colors.HexColor('#edf2f9')
CARD_BG      = colors.HexColor('#e4ecf5')
TABLE_STRIPE = colors.HexColor('#eef3fa')
HEADER_FILL  = colors.HexColor('#1a4a7a')
BORDER       = colors.HexColor('#c0d0e2')
ACCENT       = colors.HexColor('#2d7ab3')
TEXT_PRIMARY = colors.HexColor('#142840')
TEXT_MUTED   = colors.HexColor('#5a7a96')

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = TABLE_STRIPE

# ─── Geometry ────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
MARGIN = 0.85 * inch                     # symmetric
AVAIL = PAGE_W - 2 * MARGIN              # ~473 pt
H1_ORPHAN = (PAGE_H - 2 * MARGIN) * 0.18
H2_ORPHAN = 80

ASSETS = '/home/z/my-project/download/assets_tariff'
OUT_DIR = '/home/z/my-project/scripts/out'
os.makedirs(OUT_DIR, exist_ok=True)
BODY_PDF = os.path.join(OUT_DIR, 'body.pdf')

DOC_TITLE = 'Золотая жила 2026: TariffRefund OS — стратегический анализ рынка'

# ─── Styles ──────────────────────────────────────────────────────────────
S = {}
S['body'] = ParagraphStyle('Body', fontName='FreeSerif', fontSize=10.5, leading=16.2,
                           alignment=TA_JUSTIFY, textColor=TEXT_PRIMARY,
                           spaceBefore=0, spaceAfter=9)
S['lead'] = ParagraphStyle('Lead', parent=S['body'], fontSize=11, leading=17.2,
                           textColor=TEXT_PRIMARY, spaceAfter=10)
S['bullet'] = ParagraphStyle('Bullet', fontName='FreeSerif', fontSize=10.5, leading=15.6, bulletFontName='FreeSerif',
                             alignment=TA_LEFT, textColor=TEXT_PRIMARY,
                             leftIndent=16, bulletIndent=4, spaceAfter=5)
S['h1'] = ParagraphStyle('H1', fontName='FreeSerif-Bold', fontSize=17.5, leading=22,
                         alignment=TA_LEFT, textColor=HEADER_FILL,
                         spaceBefore=6, spaceAfter=4)
S['h2'] = ParagraphStyle('H2', fontName='FreeSerif-Bold', fontSize=13.2, leading=17.5,
                         alignment=TA_LEFT, textColor=HEADER_FILL,
                         spaceBefore=14, spaceAfter=7)
S['h3'] = ParagraphStyle('H3', fontName='FreeSerif-Bold', fontSize=11.3, leading=15,
                         alignment=TA_LEFT, textColor=TEXT_PRIMARY,
                         spaceBefore=10, spaceAfter=5)
S['caption'] = ParagraphStyle('Caption', fontName='FreeSerif', fontSize=8.6, leading=11.5,
                              alignment=TA_CENTER, textColor=TEXT_MUTED,
                              spaceBefore=0, spaceAfter=0)
S['th'] = ParagraphStyle('TH', fontName='FreeSerif-Bold', fontSize=9.3, leading=12,
                         alignment=TA_LEFT, textColor=colors.white)
S['td'] = ParagraphStyle('TD', fontName='FreeSerif', fontSize=9.1, leading=12.4,
                         alignment=TA_LEFT, textColor=TEXT_PRIMARY)
S['tdb'] = ParagraphStyle('TDB', fontName='FreeSerif-Bold', fontSize=9.1, leading=12.4,
                          alignment=TA_LEFT, textColor=TEXT_PRIMARY)
S['tdc'] = ParagraphStyle('TDC', fontName='FreeSerif', fontSize=9.1, leading=12.4,
                          alignment=TA_CENTER, textColor=TEXT_PRIMARY)
S['stat'] = ParagraphStyle('Stat', fontName='FreeSerif-Bold', fontSize=17, leading=20,
                           alignment=TA_CENTER, textColor=ACCENT)
S['statlbl'] = ParagraphStyle('StatLbl', fontName='FreeSerif', fontSize=8.2, leading=10.8,
                              alignment=TA_CENTER, textColor=TEXT_MUTED)
S['quote'] = ParagraphStyle('Quote', fontName='FreeSerif-Italic', fontSize=10.8, leading=16.5,
                            alignment=TA_LEFT, textColor=TEXT_PRIMARY,
                            leftIndent=24, spaceBefore=6, spaceAfter=10)
S['src'] = ParagraphStyle('Src', fontName='FreeSerif', fontSize=9.2, leading=13.6, bulletFontName='FreeSerif',
                          alignment=TA_LEFT, textColor=TEXT_PRIMARY,
                          leftIndent=18, firstLineIndent=-18, spaceAfter=4)
S['tocTitle'] = ParagraphStyle('TocTitle', fontName='FreeSerif-Bold', fontSize=19, leading=24,
                               textColor=HEADER_FILL, spaceAfter=16)
S['toc0'] = ParagraphStyle('TOC0', fontName='FreeSerif-Bold', fontSize=11.2, leading=20,
                           leftIndent=0, textColor=TEXT_PRIMARY)
S['toc1'] = ParagraphStyle('TOC1', fontName='FreeSerif', fontSize=10, leading=17,
                           leftIndent=18, textColor=TEXT_MUTED)


# ─── Doc template with TOC support ───────────────────────────────────────
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))


def _header_footer(canvas, doc):
    canvas.saveState()
    # header
    canvas.setFont('FreeSerif', 7.5)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, PAGE_H - 0.55 * inch, 'Золотая жила 2026 · стратегический анализ рынка')
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.2)
    canvas.line(MARGIN, PAGE_H - 0.62 * inch, PAGE_W - MARGIN, PAGE_H - 0.62 * inch)
    # footer
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 0.62 * inch, PAGE_W - MARGIN, 0.62 * inch)
    canvas.setFont('FreeSerif', 7.5)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, 0.45 * inch, 'TariffRefund OS · октябрь 2026')
    canvas.drawRightString(PAGE_W - MARGIN, 0.45 * inch, 'стр. %d' % doc.page)
    canvas.restoreState()


# ─── Helpers ─────────────────────────────────────────────────────────────
def h1(text):
    key = 'h_' + hashlib.md5(text.encode('utf-8')).hexdigest()[:8]
    para = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), S['h1'])
    para.bookmark_name = key
    para.bookmark_level = 0
    para.bookmark_text = text
    para.bookmark_key = key
    rule = HRFlowable(width='100%', thickness=1.6, color=ACCENT, spaceBefore=3, spaceAfter=0)
    return [CondPageBreak(H1_ORPHAN), para, rule, Spacer(1, 12)]


def h2(text):
    key = 'h_' + hashlib.md5(text.encode('utf-8')).hexdigest()[:8]
    para = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), S['h2'])
    para.bookmark_name = key
    para.bookmark_level = 1
    para.bookmark_text = text
    para.bookmark_key = key
    return [CondPageBreak(H2_ORPHAN), para]


def h3(text):
    return [CondPageBreak(60), Paragraph('<b>%s</b>' % text, S['h3'])]


def p(text, style='body'):
    return Paragraph(text, S[style])


def bullets(items):
    out = []
    for it in items:
        out.append(Paragraph(it, S['bullet'], bulletText='•'))
    out.append(Spacer(1, 5))
    return out


def callout_row(stats):
    """stats: list of (value, label) — one row of stat cards."""
    n = len(stats)
    gap = 8
    cw = (AVAIL - gap * (n - 1)) / n
    cells, widths = [], []
    for i, (v, lbl) in enumerate(stats):
        inner = Table([[Paragraph('<b>%s</b>' % v, S['stat'])],
                       [Paragraph(lbl, S['statlbl'])]], colWidths=[cw])
        inner.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
            ('BOX', (0, 0), (-1, -1), 0.8, ACCENT),
            ('TOPPADDING', (0, 0), (0, 0), 9),
            ('BOTTOMPADDING', (0, 0), (0, 0), 1),
            ('TOPPADDING', (0, 1), (0, 1), 1),
            ('BOTTOMPADDING', (0, 1), (0, 1), 9),
            ('LEFTPADDING', (0, 0), (-1, -1), 4),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        cells.append(inner)
        widths.append(cw)
        if i < n - 1:
            cells.append('')
            widths.append(gap)
    row = Table([cells], colWidths=widths, hAlign='CENTER')
    row.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, 8), row, Spacer(1, 14)]


def make_table(header, rows, ratios, style_map=None, header_bg=TABLE_HEADER_COLOR,
               repeat=1):
    """header: list[str]; rows: list[list[str]]; ratios sum to 1.0."""
    widths = [r * AVAIL for r in ratios]
    data = [[Paragraph('<b>%s</b>' % c, S['th']) for c in header]]
    for r in rows:
        line = []
        for j, c in enumerate(r):
            st = S['td']
            if style_map and j in style_map:
                st = S[style_map[j]]
            line.append(Paragraph(c, st))
        data.append(line)
    t = Table(data, colWidths=widths, hAlign='CENTER', repeatRows=repeat)
    cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), header_bg),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        cmds.append(('BACKGROUND', (0, i), (-1, i),
                     TABLE_ROW_ODD if i % 2 == 1 else TABLE_ROW_EVEN))
    t.setStyle(TableStyle(cmds))
    return t


def tbl(header, rows, ratios, **kw):
    t = make_table(header, rows, ratios, **kw)
    return [Spacer(1, 10), t, Spacer(1, 14)]


def chart(path, caption_text, max_h=265):
    img = PILImage.open(path)
    ow, oh = img.size
    max_w = AVAIL * 0.97
    ratio = min(max_w / ow, max_h / oh, 1.0)
    flow = Image(path, width=ow * ratio, height=oh * ratio)
    flow.hAlign = 'CENTER'
    cap = Paragraph(caption_text, S['caption'])
    return [Spacer(1, 16), KeepTogether([flow, Spacer(1, 8), cap]), Spacer(1, 16)]


def blockquote(text):
    box = Table([[Paragraph(text, S['quote'])]], colWidths=[AVAIL * 0.92])
    box.setStyle(TableStyle([
        ('LINEBEFORE', (0, 0), (0, -1), 2.2, ACCENT),
        ('BACKGROUND', (0, 0), (-1, -1), TABLE_STRIPE),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return [Spacer(1, 8), KeepTogether([box]), Spacer(1, 10)]


# ─── Build story ─────────────────────────────────────────────────────────
story = []

toc = TableOfContents()
toc.levelStyles = [S['toc0'], S['toc1']]
story.append(Paragraph('<b>Содержание</b>', S['tocTitle']))
story.append(HRFlowable(width='100%', thickness=1.6, color=ACCENT, spaceBefore=0, spaceAfter=14))
story.append(toc)
story.append(PageBreak())

# ═══ ГЛАВА 1. РЕЗЮМЕ ═════════════════════════════════════════════════════
story += h1('1. Резюме: вердикт и ставка')

story.append(p('Задача звучала как охота за редчайшим алмазом: найти для соло-разработчика '
               'с бюджетом до $10 тыс. и горизонтом первой выручки в 3–6 месяцев нишу с '
               'максимальным спросом при минимальной конкуренции. Мы прошли путь, который '
               'проходит венчурный аналитик перед чеком: сканирование макро-трендов, проверка '
               '14 направлений по пяти жёстким фильтрам, полевая перепроверка конкурентных '
               'ландшафтов каждого финалиста и стресс-тест юнит-экономики. Одиннадцать из '
               'четырнадцати ниш были убиты — перенасыщением, слабой монетизацией или '
               'регуляторной волатильностью. Настоящий отчёт показывает, почему три оставшихся '
               'достойны внимания и почему одна из них — исключительное окно возможностей.', 'lead'))

story.append(p('<b>Победитель — TariffRefund OS</b>: веб-платформа, которая помогает малым и '
               'средним импортёрам вернуть деньги, уплаченные по отменённым Верховным судом '
               'США IEEPA-тарифам, и конвертирует это разовое событие в постоянную подписку '
               'на управление тарифными рисками. Ставка держится на редчайшем сочетании трёх '
               'условий, которые почти никогда не совпадают одновременно: необратимый '
               'юридический катализатор с точной датой, покупатель, у которого деньги уже '
               'физически уплачены государству, и конкурентное поле, где вместо стартапов — '
               'юристы и бухгалтерские фирмы, берущие $300–800 в час за консультации. '
               'Продуктового слоя для малого бизнеса в этой нише на октябрь 2026 года '
               'практически нет.'))

story += callout_row([
    ('$166 млрд', 'возвратов IEEPA-тарифов<br/>на кону (CBP/CIT)'),
    ('330 000', 'импортёров заплатили<br/>по этим тарифам'),
    ('53 млн', 'таможенных записей<br/>ожидают обработки'),
    ('$650 млн', 'процентов накапливается<br/>каждый месяц ожидания'),
])

story.append(p('Расшифруем масштаб события. 20 февраля 2026 года Верховный суд США '
               'постановлением 6–3 в деле <i>Learning Resources, Inc. v. Trump</i> признал '
               'тарифы, введённые по закону IEEPA, незаконными. Суд по международной торговле '
               '(CIT) 4 марта обязал таможенную службу CBP вернуть деньги всем платившим, '
               'а не только истцам, включая даже записи с финальной ликвидацией. По данным '
               'CBP, около 330 тысяч импортёров уплатили порядка $166 млрд по 53 миллионам '
               'таможенных записей. 20 апреля 2026 года заработала система возвратов CAPE, '
               'и за первые шесть дней импортёры подали 75 300 деклараций на 11,2 миллиона '
               'записей. Это не прогнозная величина, которую нужно выращивать маркетингом, — '
               'это уже существующий, юридически подтверждённый денежный поток, который '
               'ищет себе канал.'))

story.append(p('Окно при этом открыто не на один квартал, а минимум на 18–24 месяца. На '
               'момент запуска CAPE лишь около 21% записей было принято к обработке, 2 '
               'миллиона записей упали на этапе валидации из-за ошибок в номерах и '
               'несоответствиях импортёров, а дедлайны подачи растянуты вплоть до 2028 года '
               'в зависимости от статуса ликвидации каждой записи. Пока очередь разбирается, '
               'на невозвращённых суммах накапливаются законные проценты — порядка $650 '
               'миллионов в месяц по всему рынку. Каждый месяц промедления импортёра — это '
               'деньги, которые государство должно ему дополнительно, но которые сгорают, '
               'если пропустить собственный дедлайн подачи. Такой мотивационной структуры '
               'не даёт ни одна классическая SaaS-ниша.'))

story.append(p('Модель монетизации трёхслойная и запускается без найма: бесплатный сканер '
               'таможенных отчётов как лид-магнит («проверь, сколько государство должно '
               'тебе»), разовые пакеты $199–499 за подготовку и валидацию CAPE-деклараций '
               '(либо комиссия 8–12% от суммы возврата для тех, кто не готов платить вперёд) '
               'и подписка TariffOps за $99 в месяц за мониторинг дедлайнов, фаз CAPE и '
               'изменений тарифов. Базовый сценарий даёт около $470 тыс. кумулятивной '
               'выручки за 18 месяцев при CAC $40–80 и отношении LTV/CAC 7–12. После '
               'исчерпания волны возвратов платформа переезжает на постоянные рельсы: '
               'невостребованный duty drawback ($15 млрд в год по оценкам CBP), вторая волна '
               'возвратов по Section 122 и тарифный мониторинг как новая операционная '
               'реальность импортёров.'))

story.append(p('Отдельная честная оговорка: ниша чувствительна к политике, а событие '
               'возвратов конечно. В главе 5.8 разобраны шесть рисков с вероятностями и '
               'планом митигации, включая сценарий, при котором административная апелляция '
               'по Section 122 меняет правила. Ключевой аргумент устойчивости: каждое '
               'изменение тарифной политики в любую сторону порождает новую волну '
               'пересчётов, а значит — новый спрос на мониторинг. Хаос — это не риск '
               'продукта, это его сырье.'))

# ═══ ГЛАВА 2. МЕТОДОЛОГИЯ ════════════════════════════════════════════════
story += h1('2. Методология: как искали алмаз')

story.append(p('Философия поиска была обратна обычному «придумаем приложение на волне AI». '
               'Волна AI делает продукт дешёвым в разработке, но одновременно обесценивает '
               'барьер входа: любая «хорошая идея обёртки над LLM» собирает десять клонов за '
               'год. Поэтому мы искали не идеи, а <b>арбитраж информационной асимметрии</b> — '
               'ситуации, где у одной стороны есть срочная денежная проблема, у другой — '
               'публичные данные и модели, чтобы её решить, а между ними никто не встал. '
               'Источники гипотез: датированные регуляторные и судебные события 2025–2026 '
               'годов, ниши, где покупатель уже платит живому человеку за ту же работу '
               '(бюджетная строка существует — сильнейший сигнал готовности платить), и '
               'вертикали, куда венчурный капитал не идёт из-за «неинтересности» при '
               'растущей боли.'))

story.append(p('Каждая гипотеза прогонялась через пять фильтров. Ниша должна была пройти '
               'все пять, без исключений — именно поэтому отсев оказался таким массовым.'))

story += bullets([
    '<b>Фильтр 1 — катализатор с датой.</b> Не «растущий тренд», а конкретное событие 2025–2026 '
    'годов, которое уже создало боль: закон, суд, дедлайн. У покупателя уже болит, а не «заболит».',
    '<b>Фильтр 2 — плотность конкурентов.</b> Менее трёх финансируемых игроков в точной '
    'под-нише (не в индустрии целиком). Проверялось по обзорам рынка, каталогам YC, G2 и '
    'свежим сводным статьям конкурентов.',
    '<b>Фильтр 3 — карточные платежи, self-serve.</b> Возможность продать за один клик с '
    'сайта, без цикла enterprise-продаж, который соло-основатель не вытянет.',
    '<b>Фильтр 4 — соло-MVP за 6–8 недель.</b> Стек Next.js + Postgres + LLM-API закрывает '
    'весь продукт; лицензии и сертификации не требуются.',
    '<b>Фильтр 5 — CAC ниже $100.</b> Каналы: SEO по свежим ключевым словам, комьюнити, '
    'партнёрства с бухгалтерами и брокерами. Платный трафик при $10 тыс. бюджета — смерть.',
])

story.append(p('Массовое отсечение — не признак придирчивости, а наблюдение по рынку 2025–2026 '
               'годов: у каждой видимой AI-ниши уже сидят по 8–12 инструментов. Ветеринарные '
               'AI-скрайбы: больше десяти игроков, включая VetRec, Scribenote, CoVet, HappyDoc '
               'и PawfectNotes, уже с бесплатными тарифами и ценовой войной $29–99 в месяц. '
               'Photo-to-quote для стройки и HVAC: QuoteIQ, SimplyWise, Hover, Handoff, '
               'EstimationPro и другие — в нише десяток инструментов с обзорами «лучшие из '
               'десяти». Голосовые AI-приёмные и AI-SEO/GEO-аналитика — красные океаны с '
               'десятками прямых конкурентов и сотнями агентств-перекупщиков. Плотность '
               'конкурентов по всем проверенным нишам показана на графике 1.'))

story += chart(os.path.join(ASSETS, 'chart1_density.png'),
               'График 1. Плотность заметных конкурентов в 12 проверенных нишах, октябрь 2026. '
               'Синим выделена ниша-победитель. Источники: сводные обзоры инструментов 2026 года.')

story.append(p('Полная карта отсева с причинами — в таблице 1. Обратите внимание на два '
               'урока. Первый: «скучные» ниши перестали быть свободными — про них написали '
               'десятки статей «12 неинтересных идей, которые печатают деньги», и в каждую '
               'уже зашли. Второй: регуляторный катализатор без проверки текущего статуса — '
               'ловушка. Мы едва не взяли CMMC-комплаенс для оборонных подрядчиков, но '
               'проверка показала, что Минобороны США приостановило вторую фазу внедрения '
               'в июле 2026 года — катализатор исчез раньше, чем был бы дописан MVP. '
               'Перепроверка каждой детали перед ставкой экономит месяцы жизни.'))

story += tbl(
    ['Ниша', 'Что нашли при проверке', 'Причина отказа'],
    [
        ['Голосовые AI-приёмные', '30+ игроков (Goodcall, Smith.ai, Vapi, Retell, Bland и сотни агентств)',
         'Коммодитизация, ценовая война, дампинг'],
        ['AI-SEO / GEO-аналитика', '20+ (Profound, Peec, Otterly, AthenaHQ и др.), венчурные раунды',
         'Океан залит капиталом за 12 месяцев'],
        ['Ветеринарные AI-скрайбы', '10+ (VetRec, Scribenote, CoVet, HappyDoc, PawfectNotes, Talkatoo, Digitail)',
         'Зрелый рынок, free-тарифы, война цен'],
        ['Photo-to-quote для стройки', '10+ (QuoteIQ, SimplyWise, Hover, Handoff, EstimationPro, Togal, STACK, Kreo)',
         'Перенасыщение всех сводок 2026 года'],
        ['Софт для home care', 'Платформы AxisCare, CareSmartz360, WellSky уже встроили AI-функции',
         'Инкамбенты закрыли нишу сверху'],
        ['HTS-классификация (AI)', '9+ (GingerControl, Gaia Dynamics, Flexport, Avalara, Zonos, Quickcode)',
         'Волна 2025 года уже разобрана'],
        ['Duty drawback софт', '9 (Zollback, Freehand, Pax AI, Charter, J.M. Rodgers, Descartes)',
         'Требует брокерских процессов, капиталоёмко'],
        ['EU AI Act compliance', '9+ (KLA, Kosmoy, Vanta, Credo AI, Sprinto); май 2026 — смягчение Omnibus',
         'Регуляторный риск + конкурентная набегающая'],
        ['CMMC для оборонных поставщиков', 'Инструменты есть, но DoD приостановило Phase II в июле 2026',
         'Катализатор заморожен политикой'],
        ['Prior authorization в медицине', 'Cohere Health, Rhyme, Develop Health — enterprise и EHR-интеграции',
         'Длинный цикл продаж, не для соло'],
        ['Приложения для семей-опекунов', 'CaringBridge, ianaCare, CircleOf — бесплатны или некоммерческие',
         'B2C-модель не монетизируется'],
        ['GovCon / RFP-инструменты', 'AutogenAI, GovDash, SamSearch, Jorpex, HigherGov, GovTribe',
         'Конкурентно, фокус на федеральном enterprise'],
        ['Креаторские инструменты (репёрпосинг)', 'Десятки игроков: Typefully и клоны, $113K MRR у лидеров',
         'Насыщение, низкие барьеры'],
        ['Маркетплейсы локальных услуг', 'Классическая проблема chicken-egg при бюджете $10K',
         'Холодный старт невыполним при бутстрэпе'],
    ],
    [0.24, 0.44, 0.32])

story.append(p('Три ниши прошли все фильтры и вышли в финал: TariffRefund OS, Certified '
               'Payroll AI и UK MTD Landlord Tax. Их детальное сравнение — в главе 4, '
               'глубокий разбор победителя — в главе 5. Сразу уточним методологическую '
               'рамку итогов: скоринг взвешен под профиль читателя (соло, бутстрэп, 3–6 '
               'месяцев до выручки, глобальные амбиции), а не под гипотетического '
               'венчурного инвестора. Иное взвешивание давало бы другого победителя.'))

# ═══ ГЛАВА 3. МАКРО-ЛАНДШАФТ ═════════════════════════════════════════════
story += h1('3. Макро-ландшафт 2026: три волны')

story += h2('3.1. Волна первая: вертикальный AI стал мейнстримом капитала')

story.append(p('Рынок вертикальных AI-решений достиг $10,3 млрд в 2025 году и, по оценке '
               'Grand View Research, вырастет до $13 млрд в 2026-м с среднегодовым темпом '
               '28,3% на траектории к $74,5 млрд к 2033 году. Y Combinator публично '
               'аргументирует, что вертикальные AI-агенты могут стать в десять раз крупнее '
               'SaaS-компаний, которые они заменяют, потому что продают не доступ к '
               'софту, а выполненную работу. Логика для соло-основателя двоякая. С одной '
               'стороны, AI-нативный продукт одного человека теперь реально конкурирует с '
               '«жирными» инкамбентами, где roadmap согласовывается квартал. С другой — '
               'капитал уже расставил флаги в крупных вертикалях: Harvey оценивается в '
               '$11 млрд (юридические workflow), Basis стала единорогом в бухгалтерии, '
               'Rebar подняла $14 млн серии A для HVAC/MEP, Motive — $150 млн для логистики.'))

story.append(p('Вывод из этой волны таков: конкурировать лоб-в-лоб с финансируемыми '
               'вертикальными игроками бессмысленно, но каждый их раунд подтверждает '
               'готовность индустрий платить за AI-автоматизацию специфической работы. '
               'Соло-стратегия — садиться не «рядом с деньгами венчура», а в слепых зонах, '
               'которые слишком малы или слишком срочны для фонда с обязательствами по '
               'размеру чека, но идеальны по экономике для одного человека с низкой '
               'стоимостью жизни продукта. Ниже — две волны, где такие слепые зоны '
               'сконцентрированы.'))

story += h2('3.2. Волна вторая: регуляторный суперцикл 2025–2028')

story.append(p('Вторая волна — плотная серия датированных регуляторных событий, каждое из '
               'которых принудительно создаёт тысячи покупателей в момент дедлайна. Это '
               'самый недооценённый класс возможностей: пока рынок обсуждает «AI-обёртки», '
               'юридические изменения перепахивают целые отрасли, и Software-as-a-Service '
               'превращается в Compliance-as-a-Lifeline. Ключевые события собраны в '
               'таблице 2 — с их статусами на октябрь 2026 года, потому что статус важнее '
               'самого события.'))

story += tbl(
    ['Катализатор', 'Дата', 'Кого затрагивает', 'Статус (окт. 2026)'],
    [
        ['Отмена de minimis: все партии любого ценза — формальное таможенное оформление', '29.08.2025',
         'Миллионы малых импортёров и e-commerce', 'В силе, необратимо'],
        ['Верховный суд США: IEEPA-тарифы незаконны (6–3)', '20.02.2026',
         '330 тыс. импортёров, ~$166 млрд', 'В силе, окончательно'],
        ['CIT: возврат всем платившим, включая финально ликвидированные записи', '04.03 / 27.03.2026',
         'Все импортёры, не только истцы', 'В силе'],
        ['CBP запускает CAPE — систему возвратов (Phase 1)', '20.04.2026',
         'Импортёры и их брокеры', 'Работает, 21% записей принято на старте'],
        ['CIT отменяет Section 122 (10% сбор)', '07.05.2026',
         'Все импортёры с 24.02.2026', 'Апелляция — будущая волна возвратов №2'],
        ['UK MTD ITSA: цифровая отчётность при доходе £50K+', '06.04.2026',
         '~1 млн соло и арендодателей UK', 'В силе; £30K — апрель 2027'],
        ['EU AI Act: обязательства для high-risk систем', '08.2026',
         'Разработчики и операторы AI в ЕС', 'Смягчён пакетом Omnibus (май 2026)'],
        ['CMMC Phase II для оборонной цепочки поставок', 'план 2025–2028',
         '80 тыс.+ малых подрядчиков США', 'Приостановлено DoD в июле 2026'],
    ],
    [0.40, 0.13, 0.24, 0.23])

story.append(p('Обратите внимание, как по-разному заканчиваются строки таблицы: EU AI Act '
               'смягчили, CMMC заморозили, а вот таможенная линия — de minimis, IEEPA, '
               'CAPE — только набирает обороты и подтверждена двумя ветками судебной '
               'власти. Это и есть разница между «интересной нишей» и «окном»: интересных '
               'много, а окон с юридически гарантированным денежным потоком — единицы. '
               'Именно на стыке отменённого IEEPA-тарифа и неспособности CBP быстро '
               'разобрать 53 миллиона записей и родилась ниша-победитель.'))

story += h2('3.3. Волна третья: таможенный хаос как новая операционная норма')

story.append(p('Третья волна — структурная. Section 232 (сталь, алюминий, медь) расширен '
               'на списки деривативов, что затронуло бытовую технику и электронику со '
               'стальным содержанием; 24 февраля 2026 года добавлен 10% сурcharge по '
               'Section 122; «взаимные» тарифы пересматривались несколько раз за год. '
               'Средний малый импортёр живёт в режиме, когда его себестоимость меняется '
               'распоряжением, а не рынком, и у него нет штатного таможенного '
               'аналитика. Для дизайна продукта это означает две вещи. Во-первых, '
               'разовая услуга «верни мои деньги» — только входная точка: постоянная '
               'боль — мониторинг. Во-вторых, каждый новый виток политики (апелляция по '
               'Section 122, новые списки 232, будущие компромиссы) — это бесплатная '
               'маркетинговая волна, которая сама приводит трафик на контент и '
               'калькуляторы. Таможенная турбулентность из разовых событий превратилась '
               'в климат, а климат — это уже операционная система, которую кто-то '
               'должен продавать по подписке.'))

# ═══ ГЛАВА 4. ТОП-3 ФИНАЛИСТА ════════════════════════════════════════════
story += h1('4. Топ-3 финалиста')

story.append(p('Три направления прошли все пять фильтров, и каждое из них по-своему достойно '
               'стать основным проектом. Ниже — короткие карточки с сутью ставки, а затем '
               'взвешенный скоринг по восьми критериям профиля соло-основателя. Важно '
               'подчеркнуть: разрыв между первым и вторым местом — не вкусовщина, а '
               'результат разной мощности катализаторов и разной конкурентной плотности, '
               'которые измеримы.'))

story += h2('4.1. Финалист A — TariffRefund OS (победитель)')

story.append(p('Веб-платформа возврата тарифных денег для малых и средних импортёров США и '
               'конвертации их в подписчиков тарифного мониторинга. Событие: Верховный суд '
               'отменил IEEPA-тарифы, CBP обязан вернуть $166 млрд 330 тысячам импортёров '
               'по 53 миллионам записей, система CAPE работает, но обрабатывает очередь '
               'медленно, а значительная часть деклараций падает на валидации. Покупатель '
               'уже потерял деньги и хочет их вернуть — редчайший случай, когда ценность '
               'продукта измеряется в долларах на счёте клиента в первый же месяц. '
               'Конкуренция в SMB-сегменте: юридические и бухгалтерские фирмы как сервис, '
               'продуктов почти нет. Полный разбор — в главе 5.'))

story += h2('4.2. Финалист B — Certified Payroll AI')

story.append(p('AI-генератор обязательной еженедельной отчётности по Davis-Bacon (форма '
               'WH-347 и штатные форматы) для малых субподрядчиков публичных строек США. '
               'Волна спроса обеспечена инфраструктурными законами IIJA и IRA: сотни '
               'миллиардов долларов распределяются через федеральные гранты с обязательным '
               'prevailing wage, и каждый субподрядчик еженедельно сдаёт certified payroll '
               'под угрозой удержания платежей и штрафов. Существующие игроки — LCPtracker, '
               'eMars, eBacon, Elation Systems, Points North (CertifiedPayrollPro с '
               'AI-ассистентом) — выглядят как софт нулевых: мощные, но мучительные в '
               'работе, при этом LCPtracker навязывается агентствами сверху, что создаёт '
               'инерцию. Нише не хватает главного — глобальности: рынок строго США, '
               'цикл продаж умеренный, потолок ARR для соло-игрока скромнее. '
               'Как основной проект — крепкий «бизнес-конёк», как золотая жила — нет.'))

story += h2('4.3. Финалист C — UK MTD Landlord Tax')

story.append(p('Приложение принудительного соответствия британской реформе Making Tax '
               'Digital: с 6 апреля 2026 года все индивидуальные предприниматели и '
               'арендодатели с совокупным доходом от £50 тыс. обязаны вести цифровую '
               'отчётность и отчитываться ежеквартально через ПО из признанного списка '
               'HMRC. Следующая волна — апрель 2027 года (порог £30 тыс., ещё около '
               '700 тыс. человек), затем 2028-й (£20 тыс.). Плюс: попадание в официальный '
               'список HMRC — встроенный канал дистрибуции, а покупка ПО — не выбор, а '
               'закон. Минус: рынок только Великобритания, инкамбенты (QuickBooks, Xero, '
               'FreeAgent, GoSimpleTax) уже прогрели первую волну, а список поставщиков '
               'HMRC показывает постоянные приходы и уходы — ниша живая, но конкуренция в ней '
               'структурная. Окно второй волны реальное, однако география противоречит '
               'запросу на глобальный продукт.'))

story += h2('4.4. Взвешенный скоринг')

story.append(p('Каждый критерий оценён по десятибалльной шкале и умножен на вес, отражающий '
               'приоритеты профиля: срочность катализатора и конкуренция весят по трём, '
               'скорость до выручки, глобальность, реализуемость, маржинальность, '
               'повторяющаяся выручка и дешёвый CAC — по два. Результат на графике 2: '
               'TariffRefund OS набирает 163 из 170 возможных, Certified Payroll AI — 122, '
               'UK MTD — 116. Решающий вклад дают три критерия с тройным весом: по силе '
               'катализатора (возврат $166 млрд против поэтапных налоговых дедлайнов) и по '
               'конкурентной плотности (пустая ниша против зрелых списков инструментов) '
               'победитель отрывается безвозвратно.'))

story += chart(os.path.join(ASSETS, 'chart2_scoring.png'),
               'График 2. Скоринг финалистов по восьми критериям (шкала 1–10). '
               'Веса: катализатор и конкуренция ×3, остальные ×2. Итог: 163 / 122 / 116 из 170.')

story += tbl(
    ['Критерий (вес)', 'TariffRefund OS', 'Certified Payroll AI', 'UK MTD Landlord'],
    [
        ['Катализатор: срочность и масштаб (×3)', '10 → 30', '8 → 24', '9 → 27'],
        ['Низкая плотность конкурентов (×3)', '9 → 27', '6 → 18', '5 → 15'],
        ['Скорость до первой выручки (×2)', '9 → 18', '7 → 14', '6 → 12'],
        ['Глобальность рынка (×2)', '8 → 16', '4 → 8', '3 → 6'],
        ['Реализуемость соло-MVP (×2)', '9 → 18', '7 → 14', '7 → 14'],
        ['Маржинальность (×2)', '9 → 18', '8 → 16', '7 → 14'],
        ['Повторяющаяся выручка (×2)', '9 → 18', '7 → 14', '8 → 16'],
        ['Дешёвый CAC (×2)', '9 → 18', '7 → 14', '6 → 12'],
        ['<b>Итог из 170</b>', '<b>163</b>', '<b>122</b>', '<b>116</b>'],
    ],
    [0.40, 0.20, 0.20, 0.20], style_map={1: 'tdc', 2: 'tdc', 3: 'tdc'})

story.append(p('Комментарий к близости второго и третьего мест: Certified Payroll AI '
               'проигрывает MTD по силе катализатора, но выигрывает по конкурентной '
               'плотности и маржинальности — при желании построить «скучный, но вечный» '
               'бизнес без событий это рабочий вариант. TariffRefund OS — ставка на '
               'событийное окно с переходом в вечную подписку. Эти две философии '
               'различаются так же, как различаются охота и фермерство; для целей '
               'настоящего отчёта — максимум денег за минимум конкуренции — охота '
               'выигрывает.'))

# ═══ ГЛАВА 5. ПОБЕДИТЕЛЬ ═════════════════════════════════════════════════
story += h1('5. Победитель: TariffRefund OS — полный разбор')

story += h2('5.1. Суть продукта: от возврата денег к операционной системе импортёра')

story.append(p('Механика возврата для конечного импортёра выглядит так: он (или его '
               'таможенный брокер) должен подать CAPE Declaration в портале ACE — простую '
               'на первый очередь загрузку CSV со списком номеров записей. Дьявол — в '
               'деталях, и именно детали и есть продукт. Нужно собрать собственную историю '
               'записей (мелкие импортёры часто не знают, где её взять), отфильтровать '
               'записи по статусу ликвидации (Phase 1 принимает только неликвидированные '
               'или ликвидированные в последние 80 дней), исключить записи, помеченные '
               'drawback-заявками или открытыми протестами, корректно отформатировать '
               'номера (11 алфанумерических символов, без дубликатов, код филера должен '
               'совпадать), заранее привязать банковские реквизиты для ACH-возврата. '
               'CBP сам признаёт масштаб проблемы: из 11 миллионов принятых записей 2 '
               'миллиона упали на построчной валидации. Отдельная боль — дедлайны: они '
               'привязаны к дате ликвидации каждой записи и расходятся веером до 2028 '
               'года, а пропуск означает сгорание права на возврат.'))

story.append(p('Продукт закрывает эту работу в четыре слоя. <b>Сканер</b>: пользователь '
               'загружает ACE-отчёты, брокерские выписки или PDF-формы 7501; движок '
               'детектирует платежи по IEEPA-кодам главы 99 (серии 9903.88.xx), считает '
               'уплаченное, набежавшие проценты и оценку возврата. <b>CAPE-навигатор</b>: '
               'валидация номеров записей, дедупликация, сверка с IOR, генерация '
               'готового CSV и чек-лист ACH-регистрации. <b>Трекер</b>: статусы '
               'ликвидации, персональные дедлайны подач и напоминания. <b>Монитор</b>: '
               'алерты о новых фазах CAPE (записи с финальной ликвидацией ждут Phase 2), '
               'изменениях тарифов и событиях вроде Section 122. Принципиальная '
               'юридическая рамка: софт готовит, валидирует и отслеживает, но не подаёт '
               'за клиента и не даёт юридических заключений — декларацию в ACE подаёт '
               'сам импортёр или его лицензированный брокер. Это снимает лицензионные '
               'требования и сдвигает ответственность туда, где ей место.'))

story.append(p('Стратегическая лестница продукта — «событие → привычка»: бесплатный '
               'сканер превращает боль в цифру на экране, разовый пакет закрывает '
               'возврат, а подписка TariffOps удерживает клиента на постоянной основе, '
               'потому что тарифная турбулентность не закончится вместе с очередью '
               'возвратов. Так классический one-time-сервис становится SaaS-активом с '
               'накопительной базой клиентов — тем самым активом, который в соседних '
               'нишах (drawback, классификация) уже покупают за миллионы.'))

story += h2('5.2. Хронология катализатора: почему окно открыто именно сейчас')

story += tbl(
    ['Дата', 'Событие', 'Что это даёт нише'],
    [
        ['02.05.2025', 'De minimis окончательно отменён для Китая; далее — глобально',
         'Малые импортёры впервые массово входят в формальный таможенный контур'],
        ['29.08.2025', 'Глобальная отмена de minimis (1,36 млрд посылок/год теряют льготу)',
         'Сотни тысяч новичков без опыта таможенного администрирования'],
        ['20.02.2026', 'Верховный суд 6–3: IEEPA-тарифы незаконны',
         'Решение окончательное: $166 млрд подлежат возврату'],
        ['04–27.03.2026', 'CIT: возврат всем платившим, включая финально ликвидированные записи',
         'Право есть даже у тех, кто «всё пропустил» — расширение аудитории'],
        ['20.04.2026', 'CAPE Phase 1 запущена в ACE',
         'Появился формальный процесс, вокруг которого строится продукт'],
        ['26.04.2026', '75 300 деклараций на 11,2 млн записей за первые дни; 2 млн записей упали на валидации',
         'Подтверждённый спрос + задокументированная боль (ошибки валидации)'],
        ['11.05.2026', 'Первые возвраты Казначейства (60–90 дней после принятия, с процентами)',
         'Социальное доказательство: деньги реально возвращаются'],
        ['07.05.2026', 'CIT отменяет Section 122 (10% сбор); апелляция правительства',
         'Вторая волна возвратов в перспективе — продлевает жизнь нише'],
        ['04.2027–2028', 'Веер дедлайнов CAPE-подач по датам ликвидации записей',
         'Срочность, встроенная в закон, — маркетинг не нужен'],
    ],
    [0.15, 0.45, 0.40])

story.append(p('Ключевой вопрос к любой «событийной» нише — не опоздал ли вход. Здесь '
               'ответ отрицательный по трём причинам. Во-первых, на момент апрельского '
               'старта CAPE к обработке принято лишь около 21% записей, а ликвидировано '
               'и переведено в стадию возврата — единицы процентов: очередь растянута '
               'на годы. Во-вторых, Phase 1 покрывает только простые случаи; записи с '
               'финальной ликвидацией, drawback-пометками и открытыми протестами ждут '
               'следующих фаз — каждая новая фаза заново открывает маркетинговое окно. '
               'В-третьих, половина аудитории — малые импортёры, у которых нет '
               'таможенных юристов в контактах: они узнают о возвратах из новостей и '
               'поиска, то есть приходят как раз туда, где сидит SEO-контент.'))

story += h2('5.3. Размер рынка: воронка TAM → SAM → SOM')

story.append(p('Три уровня воронки считаются от разных оснований, поэтому сопоставим их '
               'аккуратно. TAM — сервисный слой вокруг возврата $166 млрд: если через '
               'посреднические инструменты и сервисы пройдёт хотя бы десятая часть сумм '
               'при средней комиссии 8% плюс подписки на мониторинг, годовой объём '
               'слоя составит порядка $1,3–1,6 млрд. Сюда же примыкает вечный сосед — '
               'duty drawback, по которому CBP ежегодно не востребует около $15 млрд '
               '(80% правомочных компаний не подают заявления). SAM — сегмент самообслуживания '
               'мелких и средних импортёров США: из 330 тыс. плательщиков IEEPA не менее '
               '200–250 тыс. — малый бизнес (e-commerce, дистрибуция, лёгкое '
               'производство) без штатных таможенников; при годовой ценности клиента '
               '$700–850 это рынок около $170 млн в год. SOM — реалистичная цель соло '
               'основателя за 18 месяцев при чисто органических каналах: порядка $470 '
               'тыс. кумулятивной выручки в базовом сценарии.'))

story += chart(os.path.join(ASSETS, 'chart3_funnel.png'),
               'График 3. Воронка рынка TariffRefund OS (ширины полос не в масштабе; '
               'значения указаны в подписях). Оценки: CBP/CIT по возвратам, обзор рынка drawback 2026.')

story.append(p('Проверка воронки на здравый смысл: даже SOM — это меньше половины процента '
               'SAM, то есть цель не требует героических допущений о доле рынка. '
               'Обратная проверка снизу вверх: 25 тыс. сканов за 18 месяцев при '
               'конверсии 4% в платящие пакеты дают тысячу клиентов и $199 тыс. '
               'разовой выручки; конвертация четверти из них в подписку $99/мес со '
               'средним сроком жизни 11 месяцев добавляет $272 тыс. — итог совпадает '
               'с базовым сценарием на графике 4. Числа сходятся с двух сторон, что '
               'и требуется от честной оценки.'))

story += h2('5.4. Конкурентный ландшафт: кто рядом и почему не закрывает нишу')

story.append(p('Ближайшее окружение ниши — не стартапы, а сервисные бизнесы, и это ключ к '
               'пониманию окна. Юридические фирмы (Troutman Pepper, Norton Rose Fulbright, '
               'White & Williams, Bryan Cave) публикуют гайды по CAPE и берут $300–800 за '
               'час консультаций — их экономика не позволяет обслуживать клиента с '
               'возвратом на $20 тыс. Бухгалтерские сети (RSM, EisnerAmper, Forvis Mazars) '
               'делают то же самое в налоговой обёртке. Таможенные брокеры подают '
               'декларации за $75–150 за штуку вручную и не дают аналитики. Из '
               'продуктовых соседей: Zollback (март 2026, AI-платформа duty drawback для '
               'SMB, оплата процентом от результата) и Freehand с Pax AI — но это '
               'соседняя workflow-ниша drawback, а не CAPE-возвраты; Gaia Dynamics '
               '(раунд $7 млн) и GingerControl — HTS-классификация; Avalara и Flexport — '
               'enterprise-платформы с продаваемым через sales-циклы ассортиментом. '
               'Патентованного «сканер → оценка → подготовка → трекинг дедлайнов → '
               'мониторинг» для малого бизнеса не нашёл никто — этот слой на октябрь 2026 '
               'года пуст.'))

story += tbl(
    ['Игрок', 'Чем занимается', 'Почему не закрывает SMB-нишу'],
    [
        ['Юрфирмы (Troutman, NRF, W&W, Bryan Cave)', 'Консультации и сопровождение возвратов',
         '$300–800/час, экономика не масштабируется на малые чеки'],
        ['Бухсети (RSM, EisnerAmper, Mazars, Polston)', 'Налоговая обработка возвратов',
         'Сервисная модель, нет self-serve продукта'],
        ['Таможенные брокеры', 'Подача CAPE-деклараций вручную',
         '$75–150 за декларацию, нет аналитики и трекинга дедлайнов'],
        ['Zollback (03.2026)', 'AI-duty drawback, contingency-модель',
         'Соседняя workflow-ниша, не CAPE-возвраты'],
        ['Freehand, Pax AI, Charter, J.M. Rodgers', 'Drawback и таможенный аудит',
         'Enterprise/консалтинг-фокус, сложные интеграции'],
        ['Gaia Dynamics ($7M), GingerControl', 'AI HTS-классификация',
         'Классификация — не возвраты; цены от $150/мес'],
        ['Avalara, Flexport', 'Enterprise cross-border платформы',
         'Sales-цикл, не self-serve, не для малого чека'],
        ['Торговая палата США, отраслевые СМИ', 'FAQ и гайды по возвратам',
         'Информация, а не инструмент; сами генерируют спрос'],
    ],
    [0.30, 0.32, 0.38])

story.append(p('Отдельно зафиксируем «угрозу справа»: вероятность, что Avalara или '
               'крупный брокер достроят аналогичный модуль, реальна — но их история '
               'показывает, что спускаться в сегмент чеков $199–499 они не любят, а '
               'партнёрская программа способна превратить их в канал: мелкие брокеры '
               'без бюджетов на разработку — идеальные white-label-партнёры, которым '
               'вы отдаёте 20% выручки за брендированную версию сканера. Оценка окна '
               'эксклюзивности — 6–9 месяцев до появления первых прямых последователей; '
               'за это время нужно успеть занять SEO-вершки и партнёрский слой.'))

story += h2('5.5. MVP за шесть недель и бюджет $10 тыс.')

story.append(p('Продукт собирается одним человеком на скучном стеке: Next.js и Postgres, '
               'объектное хранилище для загружаемых отчётов, Stripe для платежей, '
               'LLM-API для разбора PDF-форм и неструктурированных брокерских выписок '
               'плюс детерминированный rule-engine поверх публичных данных — тарифного '
               'списка HTSUS с кодами главы 99, требований CAPE из официальных '
               'CSMS-бюллетеней CBP и правил расчёта процентов. Именно правило «LLM '
               'читает, но решает движок правил» защищает точность: модель не '
               'галлюцинирует ставки, а только извлекает поля, все вычисления '
               'верифицируемы формулой. Ниже — план по неделям с гейтом готовности '
               'переходить к следующей.'))

story += tbl(
    ['Недели', 'Что строим', 'Гейт перехода'],
    [
        ['1–2', 'Сканер v1: загрузка CSV/PDF, детект IEEPA-платежей, расчёт возврата и процентов; лендинг',
         '10 живых сканов от реальных импортёров, 15 интервью, ≥5 подтверждают цену'],
        ['3–4', 'CAPE-навигатор: валидация номеров, дедуп, IOR-сверка, генерация CSV; калькулятор процентов как SEO-страница',
         '100 сканов суммарно; конверсия скан → email ≥25%'],
        ['5–6', 'Stripe-биллинг, пакеты $199/$499, онбординг-чек-лист ACH, базовый трекер дедлайнов',
         'Первые 10 платящих клиентов'],
        ['7–8', 'Партнёрская программа для бухгалтеров и брокеров (20% рев-шер), white-label-обвязка',
         '≥3 активных партнёра приводят первых клиентов'],
        ['9–12', 'Подписка TariffOps $99/мес: алерты фаз CAPE, мониторинг CSMS, отчёт бухгалтеру',
         '30 подписчиков; $10K MRR run-rate к концу квартала'],
    ],
    [0.12, 0.52, 0.36])

story.append(p('Бюджет расписывается без остатка: хостинг и база данных — $50–80 в месяц; '
               'LLM-инференс — $100–300 в месяц при себестоимости разбора одного отчёта '
               'в $0,5–2; домен, бренд и базовый визуал — $200–300; профессиональный '
               'ревью таможенным консультантом формул и дисклеймеров — $1–2 тыс. '
               'разово; остаток — резерв на контент-маркетинг и рекламу первых кейсов. '
               'Важно, что главный ресурс ниши — время — не покупается: 18 месяцев '
               'дедлайнов делают каждый месяц задержки конкурентов дороже любых денег.'))

story += h2('5.6. Монетизация и юнит-экономика')

story.append(p('Тарифная сетка отражает три психологии покупателя. Скептику, который не '
               'верит в возвраты, — бесплатный скан с цифрой на экране. Торопящемуся — '
               'разовые пакеты: Lite за $199 (до 100 записей: скан, подготовка CSV, '
               'чек-лист) и Pro за $499 (до 1000 записей, приоритетный трекинг, отчёт '
               'бухгалтеру). Не желающим рисковать — contingency-опция: 8–12% от фактически '
               'возвращенной суммы, ноль вперёд (отраслевой стандарт комиссий в '
               'возвратных нишах, от ERC до drawback). Удержание — подписка TariffOps '
               '$99 в месяц: мониторинг дедлайнов и статусов, алерты фаз CAPE, '
               'изменения тарифов, годовая сводка для аудита. Канал партнёров '
               'монетизируется рев-шером 20% с первой годовой выручки клиента.'))

story += tbl(
    ['Метрика', 'Значение', 'Комментарий'],
    [
        ['CAC', '$40–80', 'SEO + комьюнити + партнёры; платный трафик не используется'],
        ['Конверсия скан → платный', '4–5%', 'Боль подтверждена деньгами, цена низкая относительно возврата'],
        ['Средний разовый чек', '$199', 'Пакет Lite — ядро; Pro и contingency повышают средний'],
        ['Подписка / удержание', '$99/мес, 12–16 мес жизни', 'Мониторинг — постоянная боль импортёра'],
        ['LTV (валовый)', '$550–900', 'Разовый чек + подписка × срок жизни'],
        ['LTV / CAC', '7–12', 'Здоровый диапазон для бутстрэпа'],
        ['Валовая маржа', '85–90%', 'Себестоимость скана $0,5–2; платежи и хостинг — копейки'],
        ['Точка безубыточности', '~120 платящих клиентов', 'Покрывает личные расходы основателя'],
    ],
    [0.30, 0.22, 0.48])

story += chart(os.path.join(ASSETS, 'chart4_scenarios.png'),
               'График 4. Сценарии выручки за 18 месяцев (тыс. $): разовые пакеты и подписка. '
               'Сценарии различаются трафиком сканера (8/25/60 тыс. сканов) и партнёрским охватом.')

story.append(p('Сценарии на графике 4 сознательно консервативны: даже оптимистичный не '
               'предполагает ни платной рекламы, ни найма, ни enterprise-контрактов — '
               'только органика и партнёрский канал. Чувствительность к главному '
               'допущению — конверсии скана в оплату — сглаживается contingency-моделью: '
               'если платят неохотно вперёд, комиссия от результата монетизирует тех же '
               'пользователей без снижения цены. Худший сценарий (все допущения '
               'минус 40%) всё ещё даёт около $70 тыс. кумулятивно — проект окупает '
               'себя многократно относительно бюджета в $10 тыс.'))

story += h2('5.7. Go-to-market на $10 тыс.: четыре канала без платного трафика')

story += bullets([
    '<b>Канал 1 — SEO по свежим ключам.</b> Запросы «IEEPA refund», «CAPE declaration», '
    '«tariff refund deadline», «how to get tariff refund» возникли в 2026 году: '
    'устоявшихся лидеров нет, в топе — юридические блоги без продуктовых страниц. '
    'Программа: 25–30 инструкций и разборов, бесплатный калькулятор процентов '
    '(естественный линкбейт) и живые страницы-статусы фаз CAPE.',
    '<b>Канал 2 — комьюнити.</b> r/ecommerce (2+ млн участников), r/FulfillmentByAmazon, '
    'r/smallbusiness, r/FreightBrokers; кейсы «как я вернул $X» в формате постов. '
    'Судебные решения по тарифам регулярно попадали в топ HackerNews — тема '
    'виральна по своей природе.',
    '<b>Канал 3 — партнёрства с сервисным слоем.</b> Средние бухгалтерские фирмы и '
    'мелкие таможенные брокеры: у них есть клиенты-импортёры и нет софта. '
    'Рев-шер 20% или white-label — их лояльность покупается экономикой, '
    'а не презентацией.',
    '<b>Канал 4 — PR первых кейсов.</b> История «малый магазин вернул $47 тыс.» — '
    'идеальный материал для Modern Retail, Supply Chain Dive и Inc.: конфликт '
    'малого бизнеса и государства плюс счастливый финал.',
])

story.append(p('Первые десять клиентов берутся вручную: разбор пяти–десяти реальных '
               'брокерских выписок на форумах и в LinkedIn-диалогах с обещанием '
               'полностью ручного сервиса. Это одновременно валидация боли, '
               'проектирование онбординга и сбор материала для кейсов. Никаких '
               'исключений из правила: до первой сотни сканов продукт не '
               'дорабатывается, а слушается.'))

story += h2('5.8. Риски и митигация')

story += tbl(
    ['Риск', 'Вероятность', 'Влияние', 'Митигация'],
    [
        ['Политическая волатильность: новые тарифы, изменения правил', 'Высокая', 'Среднее',
         'Каждое изменение — новая волна спроса на мониторинг; продукт становится нужнее'],
        ['Окно CAPE закроется к 2028 году', 'Высокая', 'Среднее',
         'Конверсия в подписку TariffOps; drawback ($15 млрд/год невостребованных); волна Section 122'],
        ['Вход Avalara, брокеров, бухсетей', 'Средняя', 'Высокое',
         'Фора 6–9 мес: SEO-вершки и партнёрский слой; SMB-цену они не любят; white-label превращает угрозу в канал'],
        ['Ошибки в расчётах, подрыв доверия', 'Средняя', 'Высокое',
         'Детерминированный rule-engine, LLM только парсит; ревью консультантом; финальная сверка вручную на старте'],
        ['CBP меняет процессы и фазы CAPE', 'Средняя', 'Среднее',
         'Мониторинг CSMS-бюллетеней встроен в продукт; скорость адаптации — конкурентное преимущество'],
        ['Правовые претензии к продукту', 'Низкая', 'Среднее',
         'ПО подготовки данных, не юруслуги; подача остаётся за импортёром/брокером; дисклеймеры во всех документах'],
    ],
    [0.30, 0.13, 0.12, 0.45])

story.append(p('Честный вердикт по совокупности рисков: ниша не «безопасная», она — '
               'выгодная по соотношению риск/доходность. Единственный риск с '
               'катастрофическим потенциалом — доверие — полностью управляется '
               'инженерно (rule-engine и ручная сверка), остальные либо усиливают '
               'спрос, либо конкуренцию, к которой фору можно конвертировать в '
               'партнёрство. По сравнению с красными океанами, где риск — '
               'принципиальная невозможность выделиться, это куда более управляемый '
               'профиль.'))

story += h2('5.9. Дорожная карта: 0 → $1M ARR')

story += tbl(
    ['Период', 'Веха', 'Ключевые действия', 'Метрика выхода'],
    [
        ['Мес 0–2', 'Живой MVP и первые деньги', 'Сканер, пакеты, 15 интервью, ручной сервис',
         '10 платящих, $2 тыс. выручки'],
        ['Мес 3–6', 'Органический трафик', '25 статей, калькулятор, кейс-PR, первые партнёры',
         '1 000 сканов, 100 платящих, $15K MRR run-rate'],
        ['Мес 7–12', 'Партнёрский масштаб', 'White-label брокерам, рев-шер бухгалтерам, подписка',
         '600 платящих, 250 подписчиков, $35K MRR'],
        ['Мес 13–18', 'Вторая волна', 'Phase 2 CAPE, Section 122, пилот drawback',
         '1 200 подписчиков, $100K+ MRR → $1,2M ARR'],
        ['Опция', 'Экзит или кэшфаулт', 'SaaS-актив с базой клиентов привлекателен для категории «boring SaaS»',
         'Продажа на мультипликаторе 3–5× ARR'],
    ],
    [0.11, 0.20, 0.42, 0.27])

story.append(p('Отдельно про стратегическую развязку: даже если после 2028 года '
               'событийная волна полностью иссякнет, на руках остаётся классический '
               'boring-SaaS-актив — база платящих импортёров с идентифицированной '
               'болью и подпиской на мониторинг. Такие активы продаются на рынка '
               'микро-SaaS с мультипликаторами 3–5× годовой выручки, то есть '
               'проект с самого начала имеет два экзита: рост или продажу. '
               'Редкое для ставок на события свойство — асимметрия вниз почти '
               'ограничена потраченным временем, а вверх не ограничена ничем.'))

# ═══ ГЛАВА 6. ПЛАН 90 ДНЕЙ ═══════════════════════════════════════════════
story += h1('6. План первых 90 дней')

story.append(p('План ниже переводит стратегию в календарь. Философия плана — «гейты, а '
               'не надежда»: каждый двухнедельный спринт заканчивается измеримым '
               'условием, при невыполнении которого меняется не усердие, а подход. '
               'Такая дисциплина защищает от главной ошибки событийных ниш — '
               'дорабатывать продукт, пока окно закрывается.'))

story += tbl(
    ['Недели', 'Фокус', 'Действия', 'Гейт (не прошёл → пересборка)'],
    [
        ['1–2', 'Валидация', 'Домен и бренд; лендинг с лид-магнитом; 15 интервью с импортёрами; ручной разбор 10 выписок',
         '≥5 из 15 подтверждают боль и цену пакета $199'],
        ['3–4', 'Сканер', 'MVP сканера CSV/PDF; калькулятор процентов; первые 5 SEO-статей',
         '100 сканов; скан → email ≥25%'],
        ['5–6', 'Монетизация', 'CAPE-навигатор с валидацией; Stripe; пакеты Lite/Pro',
         '10 платящих; возврат денег при отказе — ноль'],
        ['7–8', 'Партнёры', 'Программа рев-шера; 10 переговоров с бухгалтерами и брокерами',
         '3 активных партнёра привели ≥1 клиента каждый'],
        ['9–10', 'Подписка', 'TariffOps $99/мес; алерты фаз и дедлайнов; отчёт бухгалтеру',
         '30 подписчиков из числа вернувших деньги'],
        ['11–13', 'Масштаб', '30+ контентных страниц; кейс-PR; A/B лендинга; итоги квартала',
         '$10K MRR run-rate или пивот на contingency-модель'],
    ],
    [0.10, 0.14, 0.46, 0.30])

story.append(p('Три правила исполнения, которые стоит высечь в камне. Первое — контент '
               'пишется с первого дня: SEO-эффект накапливается месяцами, и каждый '
               'день отсрочки сдвигает органический трафик вправо, тогда как '
               'дедлайны клиентов идут влево. Второе — ручной сервис не стыдно '
               'продавать до готовности автомата: первые клиенты платят за результат, '
               'а не за архитектуру. Третье — еженедельный мониторинг CSMS-бюллетеней '
               'CBP закреплён как ритуал понедельника: каждое изменение процесса — '
               'это либо фича на день, либо пост в блог, а обычно и то и другое '
               'одновременно.'))

# ═══ ГЛАВА 7. ИСТОЧНИКИ ══════════════════════════════════════════════════
story += h1('7. Источники')

story.append(p('Ключевые факты отчёта опираются на первичные документы CBP и решения '
               'судов, а рыночные оценки — на сводки индустрии 2026 года. Ниже — '
               'основные источники с датами; все проверены в октябре 2026 года.'))

srcs = [
    'CBP, Cargo Systems Messaging Service #68315804 «Introduction of CAPE for IEEPA Refunds», 10.04.2026 — механика CAPE, требования к ACE-аккаунту и ACH.',
    'Kaufman & Canoles (KTS Law), «IEEPA Refund Process Has Begun and The New Temporary 10% Tariffs Struck Down», 11.05.2026 — $166 млрд / 53 млн записей / 330 тыс. импортёров, статистика валидаций, проценты $650 млн/мес.',
    'White & Williams, «IEEPA Tariff Refunds: CBP Launches CAPE Process», 27.04.2026 — структура Phase 1, исключения, сроки 60–90 дней.',
    'Norton Rose Fulbright, «CBP issues tariff refund instructions», 2026 — формат CAPE CSV, правила валидации номеров, механика ACH-возвратов.',
    'Baker Donelson, «IEEPA Tariff Refunds: Critical Developments, Phase III Delays», 2026 — веер дедлайнов 2027–2028.',
    'Blue & Co., «Tariff Refunds Are Coming», 28.05.2026 — хронология судебных решений Learning Resources v. Trump (20.02.2026) и приказов CIT.',
    'LightSource AI, «Duty Drawback: A Practical Guide», 05.05.2026 (обновлено сентябрь 2026) — $15 млрд невостребованных drawback, элиджибильность Section 122, CROSS-разъяснения.',
    'Gaia Dynamics, «De Minimis Tariff in 2026 for US Importers», 06.01.2026 — хронология отмены de minimis, 1,36 млрд посылок FY2024.',
    'U.S. Chamber of Commerce, «IEEPA Tariff Refunds: Guide & FAQ for Small Businesses», 2026 — подтверждение мейнстрим-осведомлённости SMB.',
    'Grand View Research / Preuve AI, «Vertical AI Startup Ideas 2026» — рынок вертикального AI $10,3 → 13 млрд (2025–2026), CAGR 28,3%.',
    'Freehand, «Best Duty Drawback Software 2026» — 9 платформ drawback; Zollback, март 2026 — первый AI-drawback для SMB.',
    'GingerControl / Gaia Dynamics / Avalara — сводные обзоры HTS-классификации 2026: 9+ инструментов.',
    'OwnerExchange / PawfectNotes / VetGeni — обзоры ветеринарных AI-скрайбов 2026: 10+ игроков, цены $29–150.',
    'Workyard / People Managing People / CertifiedPayrollPro — обзоры certified payroll 2026: LCPtracker, eMars, eBacon, Points North.',
    'gov.uk, «Choose the right software for Making Tax Digital for Income Tax» (обновления 2025–2026) — волны MTD ITSA £50K/£30K/£20K.',
    'SentinelBlue / ComplyJet / 1TEN — статус CMMC Phase II: приостановка DoD, июль 2026.',
]
for s_ in srcs:
    story.append(Paragraph(s_, S['src'], bulletText='•'))
story.append(Spacer(1, 6))

story.append(p('Данный отчёт — аналитический документ, а не юридическая или '
               'инвестиционная консультация. Оценки сценариев выручки основаны на '
               'публичных данных и допущениях, изложенных в тексте, и подлежат '
               'перепроверке в момент принятия решения.'))

# ─── Finalize ────────────────────────────────────────────────────────────
doc = TocDocTemplate(
    BODY_PDF, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=0.95 * inch, bottomMargin=0.85 * inch,
    title=DOC_TITLE, author='Z.ai', creator='Z.ai',
    subject='Стратегический анализ рынка веб-приложений 2026: поиск нишевого окна',
)
doc.multiBuild(story, onFirstPage=_header_footer, onLaterPages=_header_footer)
print('BODY OK:', BODY_PDF)
