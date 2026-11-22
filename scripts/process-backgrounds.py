#!/usr/bin/env python3
"""Convert the 5 raw background slides to budget WebPs.

Desktop keeps the native 1344x768; mobile gets a 960-wide variant.
Target: each file well under 350 KB, total desktop payload under 2 MB
(the AmbientBackground performance budget).
"""
from pathlib import Path
from PIL import Image

SRC = Path("/home/z/my-project/.tmp-bg")
DST = Path("/home/z/my-project/public/backgrounds")
DST.mkdir(parents=True, exist_ok=True)

KEYS = [
    "s1-ledger",
    "s2-verified-flow",
    "s3-open-map",
    "s4-signature",
    "s5-ground-home",
]

total = 0
for key in KEYS:
    src = SRC / f"{key}.png"
    im = Image.open(src).convert("RGB")

    # Desktop: native size, mild quality.
    d = DST / f"{key}.webp"
    im.save(d, "WEBP", quality=78, method=6)

    # Mobile: 960-wide sibling.
    m_im = im.resize((960, round(im.height * 960 / im.width)), Image.LANCZOS)
    m = DST / f"{key}-m.webp"
    m_im.save(m, "WEBP", quality=72, method=6)

    size = d.stat().st_size
    total += size
    print(f"{key}: desktop {size/1024:.0f} KB, mobile {m.stat().st_size/1024:.0f} KB")

print(f"TOTAL desktop payload: {total/1024:.0f} KB (budget 2048 KB)")
