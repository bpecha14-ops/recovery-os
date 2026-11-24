"""Objective color analysis: how vivid and bright are our new pages vs the references?"""
from PIL import Image
import colorsys

def analyze(path):
    im = Image.open(path).convert("RGB")
    im = im.resize((min(im.width, 400), int(im.height * min(im.width, 400) / im.width)))
    px = list(im.getdata())
    n = len(px)
    sat_sum = 0.0
    val_sum = 0.0
    warm = 0  # pixels clearly gold/orange/warm
    cool = 0  # pixels clearly cyan/teal/blue
    for r, g, b in px:
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        sat_sum += s
        val_sum += v
        hue = h * 360
        if s > 0.25 and v > 0.2:
            if 20 <= hue <= 60:
                warm += 1
            elif 150 <= hue <= 230:
                cool += 1
    return {
        "avg_saturation": round(sat_sum / n, 3),
        "avg_brightness": round(val_sum / n, 3),
        "warm_px%": round(100 * warm / n, 1),
        "cool_px%": round(100 * cool / n, 1),
    }

for name, path in [
    ("ThumbRank ref ", "/tmp/render/ref-thumbrank-hero.png"),
    ("GrantPro ref  ", "/tmp/render/ref-grantpro-hero.png"),
    ("CivicOS NEW   ", "/tmp/render/new-home-hero.png"),
    ("CivicOS tools ", "/tmp/render/new-tools.png"),
    ("CivicOS mobile", "/tmp/render/new-home-mobile.png"),
]:
    try:
        print(name, analyze(path))
    except Exception as e:
        print(name, "ERR", e)

# Also verify the full-page shot rendered content (not blank)
im = Image.open("/tmp/render/new-home-full.png").convert("L")
h = im.histogram()
print("full-page non-white ratio:", round(1 - h[255] / sum(h), 3), "size:", im.size)
