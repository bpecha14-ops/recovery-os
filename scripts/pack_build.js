// CivicClaim OS — Runable Prompt Pack: docx builder
// Cover: R1 (Pure Paragraph Left) + DM-1 palette (Deep Cyan — tech/AI)
// Sections: cover (no footer) / front matter TOC (Roman) / body (Arabic from 1)
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, NumberFormat, AlignmentType, HeadingLevel,
  WidthType, BorderStyle, ShadingType, TableLayoutType, SectionType,
  TableOfContents, PageBreak, ExternalHyperlink,
} = require("docx");
const fs = require("fs");

const C1 = require("./pack_content_1.js");
const C2 = require("./pack_content_2.js");
const INTRO = C1.INTRO;
const CHAPTERS = [INTRO, ...C1.CHAPTERS, ...C2.CHAPTERS];

// ── Palette DM-1 (Deep Cyan) ──
const P = {
  bg: "162235", accent: "37DCF2",
  titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078",
  body: "000000", primary: "0A1628", secondary: "5B6B7D",
  table: { headerBg: "1B6B7A", headerText: "FFFFFF", accentLine: "1B6B7A", innerLine: "C8DDE2", surface: "EDF3F5" },
};

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

// ── Title layout helpers (from design-system.md) ──
function estimateTextWidth(text, pt) {
  let w = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    const isCJK = (code >= 0x4e00 && code <= 0x9fff) || (code >= 0x3000 && code <= 0x303f) || (code >= 0xff00 && code <= 0xffef);
    w += isCJK ? pt * 20 : pt * 11;
  }
  return w;
}
function splitTitleLines(title, maxWidthTw, pt) {
  if (estimateTextWidth(title, pt) <= maxWidthTw) return [title];
  const words = title.split(" ");
  const lines = []; let cur = "";
  for (const word of words) {
    const probe = cur ? cur + " " + word : word;
    if (estimateTextWidth(probe, pt) > maxWidthTw && cur) { lines.push(cur); cur = word; }
    else cur = probe;
  }
  if (cur) lines.push(cur);
  if (lines.length > 1 && lines[lines.length - 1].length <= 3) {
    const last = lines.pop(); lines[lines.length - 1] += " " + last;
  }
  return lines;
}
function calcTitleLayout(title, maxWidthTw, preferredPt = 40, minPt = 24) {
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    lines = splitTitleLines(title, maxWidthTw, titlePt);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) { lines = splitTitleLines(title, maxWidthTw, minPt); titlePt = minPt; }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(params) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838 } = params;
  const SAFETY = 1200;
  const usable = pageHeight - SAFETY;
  const titleH = titleLineCount * (titlePt * 23 + 200);
  const subH = hasSubtitle ? (12 * 23 + 600) : 0;
  const engH = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaH = metaLineCount * (10 * 23 + 100);
  const implicit = 3 * 300;
  const content = titleH + subH + engH + metaH + fixedHeight + implicit;
  const remaining = Math.max(usable - content, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(remaining * 0.45), rawBottom = Math.floor(remaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(remaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

// ── Cover R1 ──
function buildCoverR1(config) {
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: P.accent, font: { ascii: "Calibri" }, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: P.titleColor, font: { ascii: "Arial", eastAsia: "Arial" } })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL }, spacing: { after: 800, line: 320, lineRule: "atLeast" },
      children: [new TextRun({ text: config.subtitle, size: 24, color: P.subtitleColor, font: { ascii: "Arial" } })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: P.metaColor, font: { ascii: "Arial" } })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders, verticalAlign: "top",
        children,
      })],
    })],
  })];
}

// ── Body builders ──
const BODY_FONT = { ascii: "Calibri", hAnsi: "Calibri" };
const MONO_FONT = { ascii: "Courier New", hAnsi: "Courier New" };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, color: P.primary, font: BODY_FONT })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, size: 26, color: P.primary, font: BODY_FONT })],
  });
}
function body(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: opts.after != null ? opts.after : 120 },
    children: [new TextRun({ text, size: 22, color: "1A2B3C", font: BODY_FONT })],
  });
}
function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: 60 },
    children: [new TextRun({ text, size: 22, color: "1A2B3C", font: BODY_FONT })],
  });
}
// Prompt box: label + monospace code block on light surface with accent left border
function promptBox(label, text) {
  const out = [];
  out.push(new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: P.accent, space: 10 } },
    shading: { type: ShadingType.CLEAR, fill: "EAF6F9" },
    indent: { left: 200 },
    children: [new TextRun({ text: label, bold: true, size: 20, color: "0F5E6E", font: BODY_FONT })],
  }));
  const lines = text.split("\n");
  lines.forEach((line, idx) => {
    out.push(new Paragraph({
      shading: { type: ShadingType.CLEAR, fill: "F4FAFC" },
      border: { left: { style: BorderStyle.SINGLE, size: 12, color: P.accent, space: 10 } },
      indent: { left: 200 },
      spacing: { line: 276, lineRule: "atLeast", after: idx === lines.length - 1 ? 160 : 0 },
      children: [new TextRun({ text: line.length ? line : " ", size: 17, color: "17323F", font: MONO_FONT })],
    }));
  });
  return out;
}
function dataTable(header, rows, widths, compact = false) {
  const vpad = compact ? 40 : 60;
  const line = compact ? 250 : 276;
  const mk = (text, isHead, w, i) => new TableCell({
    width: { size: w, type: WidthType.PERCENTAGE },
    shading: isHead ? { type: ShadingType.CLEAR, fill: P.table.headerBg } : (i % 2 === 0 ? { type: ShadingType.CLEAR, fill: P.table.surface } : undefined),
    margins: { top: vpad, bottom: vpad, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { line },
      children: [new TextRun({ text, bold: isHead, size: isHead ? 20 : 20, color: isHead ? P.table.headerText : "1A2B3C", font: BODY_FONT })],
    })],
  });
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.FIXED,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: P.table.accentLine },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: P.table.accentLine },
        left: NB, right: NB,
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: P.table.innerLine },
        insideVertical: NB,
      },
      rows: [
        new TableRow({ tableHeader: true, cantSplit: true, children: header.map((t, j) => mk(t, true, widths[j], 0)) }),
        ...rows.map((r, i) => new TableRow({ cantSplit: true, children: r.map((t, j) => mk(String(t), false, widths[j], i)) })),
      ],
    }),
    new Paragraph({ spacing: { after: 120 }, children: [] }),
  ];
}

// ── Chapter renderer ──
function renderChapter(ch) {
  const out = [];
  out.push(h1(ch.title));
  for (const p of (ch.lead || [])) out.push(body(p));
  for (const b of (ch.blocks || [])) {
    if (b.type === "h2") out.push(h2(b.text));
    else if (b.type === "p") out.push(body(b.text));
    else if (b.type === "prompt") out.push(...promptBox(b.label, b.text));
    else if (b.type === "bullets") {
      if (b.title) out.push(new Paragraph({
        spacing: { before: 160, after: 80, line: 312 },
        children: [new TextRun({ text: b.title, bold: true, italics: true, size: 21, color: "0F5E6E", font: BODY_FONT })],
      }));
      for (const item of b.items) out.push(bullet(item));
      out.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
    }
    else if (b.type === "table") out.push(...dataTable(b.header, b.rows, b.widths, !!b.compact));
  }
  return out;
}

// ── Assemble document ──
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

const pageFooter = () => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888", font: BODY_FONT })],
  })],
});
const pageHeader = () => new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: P.table.innerLine, space: 4 } },
    children: [new TextRun({ text: "CivicClaim OS — Runable Prompt Pack", size: 16, color: "98A4AE", font: BODY_FONT })],
  })],
});

const bodyChildren = [];
for (const ch of CHAPTERS) bodyChildren.push(...renderChapter(ch));

const doc = new Document({
  creator: "CivicClaim OS",
  title: "CivicClaim OS — Runable Prompt Pack",
  styles: {
    default: {
      document: {
        run: { font: BODY_FONT, size: 22, color: "1A2B3C" },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: { run: { font: BODY_FONT, size: 32, bold: true, color: P.primary }, paragraph: { spacing: { before: 360, after: 160, line: 312 }, outlineLevel: 0 } },
      heading2: { run: { font: BODY_FONT, size: 26, bold: true, color: P.primary }, paragraph: { spacing: { before: 240, after: 120, line: 312 }, outlineLevel: 1 } },
    },
  },
  sections: [
    { // Section 1: Cover
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1({
        title: "CivicClaim OS — Runable Prompt Pack",
        subtitle: "18 промтов для сборки сайта в Runable: продукт, данные, дизайн, страницы, ИИ-гид, качество",
        englishLabel: "PROMPT ENGINEERING PACK",
        metaLines: [
          "18 промтов · 3 варианта фона · приложения с facts.json",
          "Продукт: 74 программы · 28 стран · 50 официальных источников",
          "Версия 1.0 · 15 ноября 2026",
        ],
        footerLeft: "CivicClaim OS",
        footerRight: "Runable Prompt Pack · 2026",
      }),
    },
    { // Section 2: TOC (Roman)
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      footers: { default: pageFooter() },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 360 },
          children: [new TextRun({ text: "Оглавление", bold: true, size: 32, color: P.primary, font: BODY_FONT })],
        }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-1" }),
        new Paragraph({
          spacing: { before: 200 },
          children: [new TextRun({
            text: "Примечание: оглавление построено на кодах полей. После правок обновите его: правый клик по оглавлению → «Обновить поле».",
            italics: true, size: 18, color: "888888", font: BODY_FONT,
          })],
        }),
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({
          spacing: { before: 100, line: 312 },
          children: [
            new TextRun({ text: "Как читать этот документ. ", bold: true, size: 22, color: "0F5E6E", font: BODY_FONT }),
            new TextRun({ text: "Перед вами рабочий инструмент, а не описание: каждый промт скопирован в Runable целиком, без пересказа своими словами. Порядок применения и правила сборки — в первом разделе; сами промты — с «Промта 0» по «Промт 17»; приложения содержат готовые файлы данных и палитру со скрина.", size: 22, color: "1A2B3C", font: BODY_FONT }),
          ],
        }),
        new Paragraph({
          spacing: { before: 60, line: 312 },
          children: [
            new TextRun({ text: "Обозначения. ", bold: true, size: 22, color: "0F5E6E", font: BODY_FONT }),
            new TextRun({ text: "Голубые блоки с моноширинным текстом — промты для копирования; «Проверка после применения» — чек-лист приёмки после каждого шага; квадратные скобки в промтах [вот такие] — места, которые вы заполняете своими значениями (контакт, имя ИИ-провайдера, ссылка на репозиторий).", size: 22, color: "1A2B3C", font: BODY_FONT }),
          ],
        }),
      ],
    },
    { // Section 3: Body (Arabic from 1)
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: bodyChildren,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/home/z/my-project/download/CivicClaim_OS_Runable_Prompt_Pack.docx", buf);
  console.log("OK docx written:", buf.length, "bytes; chapters:", CHAPTERS.length);
});
