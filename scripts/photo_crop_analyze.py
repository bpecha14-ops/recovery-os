#!/usr/bin/env python3
"""Refined analysis + crop of night-la-v1.jpg -> night-la-v2.jpg (bars cut).
Finds: hot-pixel bands (skyline/city), road-like bright segments, and
outputs traffic-anchor geometry in cropped-image fractional coords."""
from PIL import Image

src = Image.open("/home/z/my-project/public/night-la-v1.jpg")
L = 150  # bars: 0..149 and 1770..1919
R = 1771
crop = src.crop((L, 0, R, 1080))
crop.save("/home/z/my-project/public/night-la-v2.jpg", quality=90, progressive=True)
print("cropped:", crop.size, "aspect:", round(crop.size[0] / crop.size[1], 3))

g = crop.convert("L")
w, h = g.size
px = g.load()

# hot pixels (b>140) per 40px row band: count + mean x + spread
print("=== hot pixels (b>140) per 40px band ===")
for y0 in range(0, h, 40):
    xs = []
    for y in range(y0, min(h, y0 + 40), 3):
        for x in range(0, w, 4):
            if px[x, y] > 140:
                xs.append(x)
    if xs:
        mx = sum(xs) / len(xs)
        print(f"y{y0:4d}-{y0+40:4d}: n={len(xs):4d} meanx={int(mx):4d} ({mx/w:.2f}) spread={int(max(xs)-min(xs))}")
    else:
        print(f"y{y0:4d}-{y0+40:4d}: none")

# vertical structures: column hot counts in the upper half (skyline?)
print("=== columns with most hot pixels in y 100..520 ===")
colhot = []
for x in range(0, w, 6):
    n = sum(1 for y in range(100, 520, 3) if px[x, y] > 150)
    colhot.append((x, n))
top = sorted(colhot, key=lambda t: -t[1])[:12]
print("hottest cols:", sorted([(round(x/w, 3), n) for x, n in top]))

# road-like segments in foreground: threshold 95, run > 50
print("=== soft-bright segments (b>95, run>50) y 640..1080 ===")
for r in range(640, h - 4, 6):
    runs, cur = [], None
    for x in range(0, w, 3):
        b = max(px[x, y] for y in range(max(0, r - 2), min(h, r + 3), 2))
        if b > 95:
            if cur is None:
                cur = [x, x]
            else:
                cur[1] = x
        else:
            if cur and cur[1] - cur[0] > 50:
                runs.append((round(cur[0] / w, 3), round(cur[1] / w, 3)))
            cur = None
    if cur and cur[1] - cur[0] > 50:
        runs.append((round(cur[0] / w, 3), round(cur[1] / w, 3)))
    if runs:
        print(f"y={r} ({r/h:.3f}):", runs[:4])
