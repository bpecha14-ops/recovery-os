#!/bin/bash
# Generate the 5 Civic Futurism background slides (prompt 3 spec).
# Raw PNGs land in .tmp-bg/, then process-backgrounds.py converts them
# to size-budgeted WebPs in public/backgrounds/.
set -u
cd "$(dirname "$0")/.."
mkdir -p .tmp-bg

STYLE="Ultra-wide cinematic dark background art, deep midnight navy palette, dark blue tones, restrained cyan and warm seal-gold light accents, calm institutional futurism, soft volumetric light, fine detail fading into darkness, darker empty center area reserved for UI text, photoreal CGI blend, no text, no letters, no logos, no watermark, no faces"

declare -A SCENES
SCENES[s1-ledger]="Low-angle monumental neoclassical government archive building at night, thousands of windows glowing like a calm data grid, several thin cyan light threads descending from the building toward a distant dark city skyline, faint constellation sky"
SCENES[s2-verified-flow]="Abstract rivers of soft cyan light streaming from a radiant circular seal of light high in the frame, flowing down into simplified dark silhouettes of neighborhoods and small homes, warm gold sparks where the light arrives"
SCENES[s3-open-map]="Dark world map seen from space at night, continents barely lit, national borders traced as hairline glowing cyan strokes, a handful of warm gold points of light pulsing on several countries, deep black ocean"
SCENES[s4-signature]="A floating sheet of light like an official document, a single luminous line being drawn across it as a signature, particles of gold light converging into a checkmark and a soft wax-seal glow in the corner, dark void around"
SCENES[s5-ground-home]="Aerial view of dark farmland at dusk, overlaid with a faint surveyor grid of thin cyan lines, one rectangular plot glowing warm gold, a small distant farmhouse light, deep blue twilight sky"

for key in s1-ledger s2-verified-flow s3-open-map s4-signature s5-ground-home; do
  if [ -s ".tmp-bg/${key}.png" ]; then
    echo "SKIP ${key} (exists)"
    continue
  fi
  for attempt in 1 2 3; do
    echo "GEN ${key} attempt ${attempt} ..."
    if z-ai image -p "${STYLE}. ${SCENES[$key]}" -o ".tmp-bg/${key}.png" -s 1344x768; then
      echo "OK ${key}"
      break
    fi
    echo "RETRY ${key} in 60s (attempt ${attempt} failed)"
    sleep 60
  done
  [ -s ".tmp-bg/${key}.png" ] || echo "FAIL ${key} after retries"
  sleep 30
done
echo "ALL DONE"
