#!/usr/bin/env python3
"""Post-process the project-description docx per toc.md:
1. Remove empty <w:pgNumType/> (cover section) from document.xml.
2. Patch footer PAGE fields with explicit format switches:
   footer referenced by the front-matter section -> \\* ROMAN,
   footer referenced by the body section -> \\* arabic.
Footer-to-section mapping is resolved via sectPr order in document.xml
and footerReference r:ids in document.xml.rels."""
import re
import shutil
import zipfile

SRC = "/home/z/my-project/download/CivicClaim_OS_описание_проекта.docx"
TMP = "/tmp/docx_patch"

shutil.rmtree(TMP, ignore_errors=True)
with zipfile.ZipFile(SRC) as z:
    z.extractall(TMP)

doc_path = f"{TMP}/word/document.xml"
doc = open(doc_path, encoding="utf-8").read()

# 1. Strip empty pgNumType emitted for the cover section.
before = doc.count("<w:pgNumType/>")
doc = doc.replace("<w:pgNumType/>", "")
open(doc_path, "w", encoding="utf-8").write(doc)
print(f"removed empty pgNumType: {before}")

# 2. Map sections -> footer rIds (in document order).
sect_blocks = re.findall(r"<w:sectPr[^>]*>.*?</w:sectPr>", doc, re.S)
refs = []  # (section_index, rId)
for i, blk in enumerate(sect_blocks):
    m = re.search(r'<w:footerReference[^>]*w:type="default"[^>]*r:id="(rId\d+)"', blk)
    if not m:
        m = re.search(r'<w:footerReference[^>]*r:id="(rId\d+)"', blk)
    refs.append((i, m.group(1) if m else None))
print("sections:", len(sect_blocks), "footer refs:", refs)

rels = open(f"{TMP}/word/_rels/document.xml.rels", encoding="utf-8").read()
rid_to_file = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="(footer\d+\.xml)"', rels))

# Section order: 0=cover (no footer), 1=front matter (ROMAN), 2=body (arabic).
fmt_by_section = {1: "ROMAN", 2: "arabic"}
for idx, rid in refs:
    if rid is None or idx not in fmt_by_section:
        continue
    fname = rid_to_file.get(rid)
    if not fname:
        continue
    fpath = f"{TMP}/word/{fname}"
    xml = open(fpath, encoding="utf-8").read()
    switch = fmt_by_section[idx]
    xml2, n = re.subn(
        r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
        rf"\1 PAGE \\* {switch} \\* MERGEFORMAT \2",
        xml,
    )
    open(fpath, "w", encoding="utf-8").write(xml2)
    print(f"section {idx}: {fname} -> {switch} ({n} fields patched)")

# 3. Strip the in-field TOC result entry: the placeholder script leaves
# one hyperlink entry inside the field (rendered by LibreOffice with a
# blank page number) while the 13 static entries follow after the field
# — the first heading appears twice. Keep the static list only; Word
# regenerates the field result on "Update Field".
m_begin = re.search(r'<w:instrText[^>]*>[^<]*TOC[^<]*</w:instrText>', doc)
if m_begin:
    seg_start = doc.rfind("<w:p>", 0, m_begin.start())
    sep = doc.find('w:fldCharType="separate"', m_begin.start())
    end = doc.find('w:fldCharType="end"', sep)
    hl_s = doc.find("<w:hyperlink", sep, end)
    hl_e = doc.find("</w:hyperlink>", hl_s) + len("</w:hyperlink>") if hl_s != -1 else -1
    if hl_s != -1 and seg_start != -1:
        # Remove the whole run-block from after `separate` run to the hyperlink end.
        inner_s = doc.find("</w:r>", sep)  # end of the separate run
        cut = doc[inner_s + len("</w:r>"):hl_e]
        doc = doc.replace(cut, "", 1)
        open(doc_path, "w", encoding="utf-8").write(doc)
        print("stripped in-field TOC entry:", len(cut), "chars")

# Repack preserving structure.
out = SRC
import os
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for root, _dirs, files in os.walk(TMP):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, TMP)
            z.write(full, rel)
print("repacked:", out, os.path.getsize(out) // 1024, "KB")
