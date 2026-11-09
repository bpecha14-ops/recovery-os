from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

def normalize(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 0.1 or abs(h - A4_H) > 0.1:
        page.scale_to(A4_W, A4_H)
    return page

writer = PdfWriter()
cover = PdfReader('scripts/out/cover.pdf').pages[0]
writer.add_page(normalize(cover))
for pg in PdfReader('scripts/out/body.pdf').pages:
    writer.add_page(normalize(pg))
writer.add_metadata({
    '/Title': 'Золотая жила 2026: TariffRefund OS — стратегический анализ рынка',
    '/Author': 'Z.ai', '/Creator': 'Z.ai',
    '/Subject': 'Стратегический анализ рынка веб-приложений 2026: поиск нишевого окна',
})
out = 'download/Золотая_жила_2026_TariffRefund_OS.pdf'
with open(out, 'wb') as f:
    writer.write(f)
print('MERGED:', out)
