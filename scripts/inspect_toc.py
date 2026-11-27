#!/usr/bin/env python3
"""Inspect the TOC field structure in the generated docx."""
import zipfile

z = zipfile.ZipFile("/home/z/my-project/download/CivicClaim_OS_описание_проекта.docx")
doc = z.read("word/document.xml").decode("utf-8")

i = doc.find("TOC")
print("TOC instr index:", i)
j = doc.find("fldCharType=\"separate\"", i)
print("separate index:", j)
k = doc.find("fldCharType=\"end\"", j)
print("end index:", k)

# All paragraph starts between separate and end.
seg = doc[j:k]
starts = [m.start() for m in __import__("re").finditer("<w:p[ >]", seg)]
ends = [m.start() for m in __import__("re").finditer("</w:p>", seg)]
print("paragraphs between separate/end:", len(starts))
# Show the first 600 chars after separate.
print(seg[:700])
