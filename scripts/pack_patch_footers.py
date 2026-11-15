#!/usr/bin/env python3
"""Post-process footers for WPS compatibility + strip empty pgNumType (per toc.md)."""
import re, shutil, sys, zipfile, os

path = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/download/CivicClaim_OS_Runable_Prompt_Pack.docx"
tmp = path + ".tmp"

with zipfile.ZipFile(path, "r") as zin:
    names = zin.namelist()
    items = {n: zin.read(n) for n in names}

# document.xml: strip empty pgNumType from cover section
doc = items["word/document.xml"].decode("utf-8")
doc2 = doc.replace("<w:pgNumType/>", "")
changed_doc = doc2 != doc
items["word/document.xml"] = doc2.encode("utf-8")

# Footer XMLs: add explicit format switch to bare PAGE fields.
# Section order in document.xml: cover (no footer ref), TOC section (Roman), body (Arabic).
# Footer rels appear in order of sectPr references. Map: first footer -> Roman, later footers -> arabic.
footer_files = sorted(n for n in items if re.match(r"word/footer\d+\.xml", n))

# Find which footers are referenced by which section, in order of appearance
refs = re.findall(r'w:footerReference[^>]*r:id="(rId\d+)"', doc2)
rels = items["word/_rels/document.xml.rels"].decode("utf-8")
rid_to_file = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="(footer\d+\.xml)"', rels))
ordered_footers = [rid_to_file[r] for r in refs if r in rid_to_file]

def patch_footer(xml, fmt):
    return re.sub(
        r'(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)',
        lambda m: m.group(1) + f' PAGE \\* {fmt} \\* MERGEFORMAT ' + m.group(2),
        xml)

for idx, fname in enumerate(ordered_footers):
    key = "word/" + fname
    xml = items[key].decode("utf-8")
    fmt = "ROMAN" if idx == 0 else "arabic"
    items[key] = patch_footer(xml, fmt).encode("utf-8")
    print(f"patched {fname} -> {fmt}")

with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for n in names:
        zout.writestr(n, items[n])
shutil.move(tmp, path)
print("done; doc changed:", changed_doc, "; footers patched:", len(ordered_footers))
