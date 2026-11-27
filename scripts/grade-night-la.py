#!/usr/bin/env python3
"""Grade the night-LA photo: upscale to 1920w, cool night tone, contrast,
vibrance, unsharp — save as public/night-la-v1.jpg (new name = cache rule)."""
from PIL import Image, ImageEnhance, ImageFilter

src = Image.open("/tmp/night/cand5.jpg").convert("RGB")
print("src:", src.size)

# Upscale 1.33x to 1920x1080 — smooth LANCZOS for the fullscreen + ken-burns.
up = src.resize((1920, 1080), Image.LANCZOS)

# Night grade: contrast, color, cool tone, sharpen.
img = ImageEnhance.Contrast(up).enhance(1.08)
img = ImageEnhance.Color(img).enhance(1.10)
r, g, b = img.split()
r = r.point(lambda v: int(v * 0.985))
b = b.point(lambda v: min(255, int(v * 1.02)))
img = Image.merge("RGB", (r, g, b))
img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=3))

img.save("/home/z/my-project/public/night-la-v1.jpg", "JPEG", quality=86, optimize=True)
import os
print("saved:", img.size, os.path.getsize("/home/z/my-project/public/night-la-v1.jpg") // 1024, "KB")
