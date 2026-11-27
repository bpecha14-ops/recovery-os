#!/usr/bin/env python3
"""Night grade v2 — kill the horizon warmth, push a deep-blue night sky.

The source photo is a real night shot but the sky carries amber city
glow that reads as 'dusk'. Here: gradient-masked desaturation + navy
blend over the top 48% (sky), global cool shift, deeper blacks.
Output: public/night-la-v1.jpg (same name — pre-deploy, cache rule
applies at deploy boundary only).
"""
from PIL import Image, ImageEnhance

src = Image.open("/tmp/night/cand5.jpg").convert("RGB")
up = src.resize((1920, 1080), Image.LANCZOS)

# 1. Global: slight cool shift + deeper blacks.
img = ImageEnhance.Contrast(up).enhance(1.06)
r, g, b = img.split()
r = r.point(lambda v: int(v * 0.96))
b = b.point(lambda v: min(255, int(v * 1.05)))
img = Image.merge("RGB", (r, g, b))

# 2. Sky mask: fully applied at top, fading out by 48% height.
W, H = img.size
sky = img.crop((0, 0, W, int(H * 0.52)))
# Desaturate the sky (amber glow -> neutral) then blend toward deep navy.
gray = sky.convert("L").convert("RGB")
sky = Image.blend(sky, gray, 0.55)                 # kill the orange
navy = Image.new("RGB", sky.size, (10, 17, 38))    # #0a1126
sky = Image.blend(sky, navy, 0.52)                 # night blue
sky = ImageEnhance.Brightness(sky).enhance(0.82)   # darker sky
img.paste(sky, (0, 0))

# 3. A subtle cool veil over the whole frame to unify (very light).
veil = Image.new("RGB", img.size, (14, 22, 44))
img = Image.blend(img, veil, 0.10)

img.save("/home/z/my-project/public/night-la-v1.jpg", "JPEG", quality=86, optimize=True)
import os
print("saved:", img.size, os.path.getsize("/home/z/my-project/public/night-la-v1.jpg") // 1024, "KB")
