#!/usr/bin/env python3
"""TOC surgery for the prompt pack docx.

Modes:
  dup     — remove the duplicated hyperlink entry (empty PAGEREF) that
            add_toc_placeholders.py leaves as the first TOC field result.
  numbers <pdf> <front_pages> — measure real page numbers of every Heading1
            from the rendered PDF and patch the plain TOC1 entries in the docx.
"""
import re, shutil, subprocess, sys, zipfile

DOCX = "/home/z/my-project/download/CivicClaim_OS_Runable_Prompt_Pack.docx"


def load(path):
    with zipfile.ZipFile(path, "r") as z:
        return {n: z.read(n) for n in z.namelist()}


def save(path, items):
    tmp = path + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for n, b in items.items():
            z.writestr(n, b)
    shutil.move(tmp, path)


def mode_dup():
    items = load(DOCX)
    doc = items["word/document.xml"].decode("utf-8")
    # First TOC entry paragraph: contains the TOC field begin...separate, then
    # a <w:hyperlink> whose PAGEREF result is empty (renders without number),
    # duplicating the first plain entry that follows. Strip the hyperlink.
    m = re.search(
        r'(<w:fldChar w:fldCharType="separate"/></w:r>)(<w:hyperlink[^>]*>.*?</w:hyperlink>)',
        doc, flags=re.S)
    if not m:
        print("dup: no duplicated hyperlink entry found (already clean)")
        return
    doc = doc[:m.start(2)] + doc[m.end(2):]
    items["word/document.xml"] = doc.encode("utf-8")
    save(DOCX, items)
    print("dup: removed duplicated first TOC hyperlink entry")


def heading1_titles(doc):
    titles = []
    for pm in re.finditer(r"<w:p>(?:(?!</w:p>).)*?</w:p>", doc, flags=re.S):
        p = pm.group(0)
        if 'w:val="Heading1"' not in p:
            continue
        text = "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))
        if text.strip():
            titles.append(text.strip())
    return titles


def mode_numbers(pdf, front_pages):
    front_pages = int(front_pages)
    out = subprocess.run(["pdftotext", pdf, "-"], capture_output=True, text=True).stdout
    pages = out.split("\f")
    items = load(DOCX)
    doc = items["word/document.xml"].decode("utf-8")
    titles = heading1_titles(doc)
    # find real pdf page (1-based) of each title, skipping cover+front matter
    norm = lambda s: re.sub(r"\s+", " ", s)
    pagemap = {}
    for t in titles:
        for i in range(front_pages, len(pages)):
            if norm(t) in norm(pages[i]):
                pagemap[t] = i + 1 - front_pages  # body page number
                break
    missing = [t for t in titles if t not in pagemap]
    if missing:
        print("numbers: WARNING not found in PDF:", missing)

    # patch plain TOC1 entry paragraphs: <w:t>title</w:t> ... tab ... <w:t>N</w:t>
    patched = 0
    def patch_para(pm):
        nonlocal patched
        p = pm.group(0)
        runs = re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p)
        # page number is its own pure-digit run; everything else is the title
        title_runs = [r for r in runs if not r.strip().isdigit()]
        title = norm("".join(title_runs))
        for t, n in pagemap.items():
            if norm(t) == title:
                p2 = re.sub(r"(<w:t[^>]*>)\d+(</w:t>)(?!.*<w:t)", lambda m: m.group(1) + str(n) + m.group(2), p, flags=re.S)
                if p2 != p:
                    patched += 1
                return p2
        return p

    doc = re.sub(r"<w:p>(?:(?!</w:p>).)*?w:val=\"TOC1\"(?:(?!</w:p>).)*?</w:p>", patch_para, doc, flags=re.S)
    items["word/document.xml"] = doc.encode("utf-8")
    save(DOCX, items)
    print(f"numbers: patched {patched}/{len(pagemap)} TOC entries; map sample:",
          dict(list(pagemap.items())[:5]))


def mode_h2():
    """Remove TOC2-style placeholder entries (H2) so the TOC fits one page."""
    items = load(DOCX)
    doc = items["word/document.xml"].decode("utf-8")
    pat = re.compile(r"<w:p>(?:(?!</w:p>).)*?w:val=\"TOC2\"(?:(?!</w:p>).)*?</w:p>", flags=re.S)
    doc2, n = pat.subn("", doc)
    items["word/document.xml"] = doc2.encode("utf-8")
    save(DOCX, items)
    print(f"h2: removed {n} TOC2 entries")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "dup"
    if mode == "dup":
        mode_dup()
    elif mode == "numbers":
        mode_numbers(sys.argv[2], sys.argv[3])
    elif mode == "h2":
        mode_h2()
    else:
        print("usage: pack_fix_toc.py [dup | numbers <pdf> <front_pages> | h2]")
