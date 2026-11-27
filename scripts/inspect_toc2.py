#!/usr/bin/env python3
"""Dump the TOC region: field end and the paragraphs after it."""
import re
import zipfile

z = zipfile.ZipFile("/home/z/my-project/download/CivicClaim_OS_описание_проекта.docx")
doc = z.read("word/document.xml").decode("utf-8")

j = doc.find("fldCharType=\"separate\"")
k = doc.find("fldCharType=\"end\"", j)
print("--- around field end ---")
print(doc[k - 200:k + 1400])
print()
entries = re.findall(r'w:anchor="(_Toc\d+)"[^>]*/?>.*?<w:t[^>]*>([^<]+)</w:t>', doc[j:k + 20000])
print("anchor entries found in region:", len(entries))
