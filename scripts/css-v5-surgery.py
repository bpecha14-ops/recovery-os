#!/usr/bin/env python3
"""One-shot CSS surgery: replace the v4 city-background block with v5."""
p = "/home/z/my-project/src/app/globals.css"
lines = open(p).read().split("\n")

# The v4 block: from the "AMBIENT BACKGROUND v4" banner (line 325, index 324)
# through the reduced-motion rule that closes it (line 622, index 621).
start = next(i for i, l in enumerate(lines) if "AMBIENT BACKGROUND v4" in l) - 1
media = next(i for i, l in enumerate(lines) if i > start and l.startswith("@media (prefers-reduced-motion: reduce)"))
# scan to the matching top-level closing brace of the media block
end = media
depth = 0
while True:
    depth += lines[end].count("{") - lines[end].count("}")
    if depth == 0 and end > media:
        break
    end += 1

V5 = """/* ---------------------------------------------------------------------------
 * AMBIENT BACKGROUND v5 — "Night Metropolis".
 * A vast night Los Angeles (public/city-sunset-v2.jpg) filling the whole
 * page: ken-burns drift inside a scroll-parallax wrap, and a canvas of
 * aurora ribbons, stars, neon-sparked city twinkle, LIGHT RIVERS (freeway
 * light streams), a satellite, shooting stars and an LAX-bound airliner.
 * Nothing is painted on top of the photo — the v4 sun/hills overlays
 * were removed (they read as pasted-on). The readability veil is LIGHT:
 * the city stays visible edge to edge, no near-black bottom band. If the
 * photo is ever replaced, ship it under a NEW filename (cache rule).
 * ------------------------------------------------------------------------- */
.city-root {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #060b18; /* loading floor under the photo */
  pointer-events: none;
  contain: strict;
}

/* Parallax wrapper — transform written by JS (scroll listener, clamped). */
.city-parallax {
  position: absolute;
  inset: -6% 0; /* headroom so the drift never exposes an edge */
  will-change: transform;
}

/* The photo — slow ken-burns, 90s each way, the whole night city
   visible edge to edge. */
.city-photo {
  position: absolute;
  inset: 0;
  background-image: url("/city-sunset-v2.jpg");
  background-size: cover;
  background-position: center 46%;
  will-change: transform;
  animation: city-kenburns 90s ease-in-out infinite alternate;
}
@media (max-width: 767px) {
  .city-photo {
    background-position: 88% 46%;
  }
}
@keyframes city-kenburns {
  from {
    transform: scale(1.07) translate3d(-2.2%, 1%, 0);
  }
  to {
    transform: scale(1.18) translate3d(2.4%, -1.8%, 0);
  }
}

/* Living canvas (aurora, stars, rivers, satellites, plane) — see TSX. */
.city-living {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Film grain: one 140px fractal-noise tile, barely-there opacity. */
.city-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 140px 140px;
}

/* Readability — a LIGHT navy veil: enough for text contrast, never a
   black band. The city glow reads through everywhere. */
.city-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(6, 11, 24, 0.6) 0%,
    rgba(6, 11, 24, 0.34) 26%,
    rgba(6, 11, 24, 0.26) 55%,
    rgba(6, 11, 24, 0.34) 80%,
    rgba(4, 8, 18, 0.5) 100%
  );
}
.city-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 92% at 50% 42%, transparent 46%, rgba(3, 6, 16, 0.42) 100%);
}

@media (prefers-reduced-motion: reduce) {
  .city-photo {
    animation: none;
  }
}"""

lines[start:end] = V5.split("\n")
open(p, "w").write("\n".join(lines))
print(f"replaced lines {start + 1}..{end} with v5 block")
