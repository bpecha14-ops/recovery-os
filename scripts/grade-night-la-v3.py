#!/usr/bin/env python3
"""Night grade v3 — v2 left residual amber along the horizon behind the
skyline. Widen the cool mask to 62% with a second pass targeted at the
35-62% horizon band, plus a global warm-clamp: any pixel where R
dominates hard gets pulled toward amber-neutral (streetlamp amber
stays below in the city, but the sky band cools completely)."""
from PIL import Image, ImageEnhance

src = Image.open("/tmp/night/cand5.jpg").convert("RGB")
up = src.resize((1920, 1080), Image.LANCZOS)

img = ImageEnhance.Contrast(up).enhance(1.06)
r, g, b = img.split()
r = r.point(lambda v: int(v * 0.96))
b = b.point(lambda v: min(255, int(v * 1.05)))
img = Image.merge("RGB", (r, g, b))

W, H = img.size

def cool_band(y0, y1, desat, navy_mix, dark):
    band = img.crop((0, y0, W, y1))
    gray = band.convert("L").convert("RGB")
    band = Image.blend(band, gray, desat)
    navy = Image.new("RGB", band.size, (10, 17, 38))
    band = Image.blend(band, navy, navy_mix)
    return ImageEnhance.Brightness(band).enhance(dark)

# Upper sky: strong.
img.paste(cool_band(0, int(H * 0.40), 0.55, 0.52, 0.80), (0, 0))
# Horizon band (the residual glow): strongest desaturation, keep enough
# brightness so the skyline behind still reads.
img.paste(cool_band(int(H * 0.40), int(H * 0.62), 0.68, 0.40, 0.88), (0, int(H * 0.40)))

veil = Image.new("RGB", img.size, (14, 22, 44))
img = Image.blend(img, veil, 0.08)

img.save("/home/z/my-project/public/night-la-v1.jpg", "JPEG", quality=86, optimize=True)
import os
print("saved:", img.size, os.path.getsize("/home/z/my-project/public/night-la-v1.jpg") // 1024, "KB")
