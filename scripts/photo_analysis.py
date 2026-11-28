#!/usr/bin/env python3
"""Analyze night-la-v1.jpg: baked black bars, sky band, skyline band,
freeway light-trail runs. Output feeds the traffic-river anchoring."""
from PIL import Image

im = Image.open("/home/z/my-project/public/night-la-v1.jpg").convert("L")
w, h = im.size
px = im.load()

print("size:", w, h)

# 1) exact baked black-bar edges (column mean below threshold)
def col_mean(x):
    return sum(px[x, y] for y in range(0, h, 6)) / (h / 6)

left = 0
while left < w and col_mean(left) < 12:
    left += 1
right = w - 1
while right > 0 and col_mean(right) < 12:
    right -= 1
print(f"black bars: left 0..{left}, right {right}..{w-1} -> content width {right-left+1}")

# 2) brightness grid 24x14
CW, CH = 24, 14
cw, chh = w / CW, h / CH
print("=== grid (14 rows x 24 cols) ===")
for r in range(CH):
    row = []
    for c in range(CW):
        tot = n = 0
        for x in range(int(c*cw), min(w, int((c+1)*cw)), 10):
            for y in range(int(r*chh), min(h, int((r+1)*chh)), 10):
                tot += px[x, y]
                n += 1
        row.append(int(tot / n))
    print(f"y{int(r*chh):4d}:", " ".join(f"{v:3d}" for v in row))

# 3) row profile (sky vs skyline vs city)
print("=== row means ===")
for r in range(0, h, 20):
    row = [px[x, r] for x in range(left, right, 8)]
    print(f"y={r:4d}: {int(sum(row)/len(row)):3d}")

# 4) bright horizontal runs = freeway trails (bright pixels, long runs)
print("=== bright runs (y, x-start, x-end, y-brightness-peak) ===")
for r in range(4, h - 4, 4):
    runs, cur, best = [], None, 0
    for x in range(left, right, 4):
        col = max(px[x, y] for y in range(max(0, r-3), min(h, r+4), 2))
        if col > 120:
            if cur is None:
                cur = [x, x]
            else:
                cur[1] = x
            best = max(best, col)
        else:
            if cur and cur[1] - cur[0] > 120:
                runs.append((cur[0], cur[1]))
            cur, best = None, 0
    if cur and cur[1] - cur[0] > 120:
        runs.append((cur[0], cur[1]))
    if runs:
        print(f"y={r:4d}:", runs[:5])
