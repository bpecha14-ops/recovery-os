# -*- coding: utf-8 -*-
"""Merge cover + body into the final CivicClaim OS concept note PDF."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 0.1 or abs(h - A4_H) > 0.1:
        page.scale_to(A4_W, A4_H)
    return page

cover_pdf = "/home/z/my-project/scripts/civicclaim_cover.pdf"
body_pdf = "/home/z/my-project/scripts/civicclaim_body.pdf"
output_pdf = "/home/z/my-project/download/CivicClaim_OS_Concept_Note_RU.pdf"

writer = PdfWriter()
writer.add_page(normalize_page_to_a4(PdfReader(cover_pdf).pages[0]))
for page in PdfReader(body_pdf).pages:
    writer.add_page(normalize_page_to_a4(page))
writer.add_metadata({
    "/Title": "CivicClaim OS — глобальный навигатор прав и денег. Концепт-нота",
    "/Author": "Z.ai",
    "/Creator": "Z.ai",
    "/Subject": "Бесплатная глобальная инфраструктура доступа людей к их правам и деньгам",
})
with open(output_pdf, "wb") as f:
    writer.write(f)
print("MERGED:", output_pdf)
