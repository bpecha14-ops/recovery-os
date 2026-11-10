#!/usr/bin/env python3
"""QA pixel analysis: detect gray/blurry regions in section screenshots.

A region is 'gray-ish' if luminance is mid-range with very low color
saturation — i.e. neither deep black background nor gold accent.
"""
import sys
from PIL import Image

def analyze(path: str) -> None:
    img = Image.open(path).convert("RGB")
    w, h = img.size
    small = img.resize((min(400, w), min(400, h)))
    px = small.load()
    sw, sh = small.size
    total = gray = black = gold = light = 0
    for y in range(sh):
        for x in range(sw):
            r, g, b = px[x, y]
            lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            mx, mn = max(r, g, b), min(r, g, b)
            sat = 0 if mx == 0 else (mx - mn) / mx
            total += 1
            if lum < 28:
                black += 1          # deep black background — good
            elif lum > 200:
                light += 1          # bright text/elements
            elif sat > 0.25 and r >= g >= b:
                gold += 1           # gold accent
            elif 60 < lum < 190 and sat < 0.16:
                gray += 1           # suspicious gray haze
    pct = lambda n: 100 * n / total
    print(f"{path.split('/')[-1]:24s} black={pct(black):5.1f}%  gold={pct(gold):5.1f}%  "
          f"light={pct(light):4.1f}%  GRAY-HAZE={pct(gray):5.1f}%")
    if pct(gray) > 4:
        print(f"   ⚠️  significant gray haze detected in {path}")

if __name__ == "__main__":
    for p in sys.argv[1:]:
        analyze(p)
