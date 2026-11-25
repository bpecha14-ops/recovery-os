#!/usr/bin/env python3
"""One-shot CSS surgery #2: replace the GOLDIE block with the HALO orb."""
p = "/home/z/my-project/src/app/globals.css"
lines = open(p).read().split("\n")

start = next(i for i, l in enumerate(lines) if "GOLDIE — the drawn character" in l) - 1
# the block ends right before the Prism headline banner
end = next(i for i, l in enumerate(lines) if i > start and "Prism headline" in l) - 1

HALO = """/* ---------------------------------------------------------------------------
 * HALO — ARIA, the holographic AI orb (see components/recovery/holo-orb.tsx).
 * A glassy glowing core with three gyroscope rings and an inner spark;
 * moods come in as classes from ai-guide.tsx. Pure transform/opacity,
 * all reduced-motion-gated.
 * ------------------------------------------------------------------------- */
.halo {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform-style: preserve-3d;
  perspective: 240px;
}

/* Ambient bloom behind the whole orb. */
.halo-haze {
  position: absolute;
  inset: -55%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(94, 234, 212, 0.22) 0%,
    rgba(56, 189, 248, 0.10) 45%,
    rgba(99, 102, 241, 0.05) 65%,
    rgba(0, 0, 0, 0) 80%
  );
  animation: halo-breathe 5s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

/* The orbital rings — one circle each, tilted into ellipses and spun.
   Ring A: wide near-horizontal, slow. Ring B: counter-rotating, mid
   tilt. Ring C: steep, fastest — a gyroscope in three axes. */
.halo-ring {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 1.5px solid rgba(125, 211, 252, 0.5);
  box-shadow:
    0 0 6px rgba(56, 189, 248, 0.25),
    inset 0 0 6px rgba(56, 189, 248, 0.18);
  will-change: transform;
}
.halo-ring--a {
  animation: halo-orbit-a 9s linear infinite;
}
.halo-ring--b {
  inset: 8%;
  border-color: rgba(167, 139, 250, 0.55);
  box-shadow:
    0 0 6px rgba(139, 92, 246, 0.25),
    inset 0 0 6px rgba(139, 92, 246, 0.18);
  animation: halo-orbit-b 13s linear infinite;
}
.halo-ring--c {
  inset: 0%;
  border-color: rgba(94, 234, 212, 0.42);
  box-shadow:
    0 0 5px rgba(45, 212, 191, 0.22),
    inset 0 0 5px rgba(45, 212, 191, 0.16);
  animation: halo-orbit-c 6.5s linear infinite;
}
@keyframes halo-orbit-a {
  from { transform: rotateX(74deg) rotateZ(0deg); }
  to { transform: rotateX(74deg) rotateZ(360deg); }
}
@keyframes halo-orbit-b {
  from { transform: rotateX(62deg) rotateZ(360deg); }
  to { transform: rotateX(62deg) rotateZ(0deg); }
}
@keyframes halo-orbit-c {
  from { transform: rotateX(80deg) rotateY(24deg) rotateZ(0deg); }
  to { transform: rotateX(80deg) rotateY(24deg) rotateZ(360deg); }
}

/* The glassy core. */
.halo-core {
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 32%, rgba(224, 255, 250, 0.9) 0%, rgba(153, 246, 228, 0.35) 18%, rgba(0, 0, 0, 0) 40%),
    radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.75) 0%, rgba(56, 189, 248, 0.35) 55%, rgba(79, 70, 229, 0.28) 100%);
  box-shadow:
    0 0 18px rgba(45, 212, 191, 0.35),
    0 0 34px rgba(56, 189, 248, 0.22),
    inset 0 0 10px rgba(224, 255, 250, 0.28);
  animation: halo-breathe 4.4s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes halo-breathe {
  from {
    transform: scale(0.96);
    opacity: 0.85;
  }
  to {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* The inner spark — the "voice" of the orb. */
.halo-spark {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22%;
  height: 22%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, #f0fdfa 0%, rgba(153, 246, 228, 0.85) 40%, rgba(45, 212, 191, 0) 75%);
  animation: halo-spark-pulse 2.2s ease-in-out infinite alternate;
  will-change: transform, opacity;
}
@keyframes halo-spark-pulse {
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.7;
  }
  to {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

/* Speaking ripples — only rendered while mood === "talk". */
.halo-ripple {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  border: 1.5px solid rgba(125, 211, 252, 0.55);
  opacity: 0;
  animation: halo-ripple 1.8s ease-out infinite;
  pointer-events: none;
}
.halo-ripple--late {
  animation-delay: 0.6s;
}
@keyframes halo-ripple {
  0% {
    transform: scale(0.55);
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Moods ------------------------------------------------------------------- */
/* curious: everything leans a little livelier. */
.halo--curious .halo-ring--a {
  animation-duration: 6s;
}
.halo--curious .halo-ring--b {
  animation-duration: 9s;
}
.halo--curious .halo-spark {
  animation-duration: 1.4s;
}

/* talk: rings pick up pace, core glows harder (ripples are rendered). */
.halo--talk .halo-ring--a {
  animation-duration: 5s;
}
.halo--talk .halo-ring--b {
  animation-duration: 7s;
}
.halo--talk .halo-core {
  box-shadow:
    0 0 22px rgba(45, 212, 191, 0.5),
    0 0 44px rgba(56, 189, 248, 0.32),
    inset 0 0 12px rgba(224, 255, 250, 0.36);
}

/* drag: rings tilt wide and spin fast — she is being carried. */
.halo--drag .halo-ring--a {
  animation: halo-orbit-drag-a 1.6s linear infinite;
}
.halo--drag .halo-ring--b {
  animation: halo-orbit-drag-b 1.1s linear infinite;
}
.halo--drag .halo-ring--c {
  animation: halo-orbit-drag-c 0.8s linear infinite;
}
@keyframes halo-orbit-drag-a {
  from { transform: rotateX(58deg) rotateZ(0deg); }
  to { transform: rotateX(58deg) rotateZ(360deg); }
}
@keyframes halo-orbit-drag-b {
  from { transform: rotateX(46deg) rotateZ(360deg); }
  to { transform: rotateX(46deg) rotateZ(0deg); }
}
@keyframes halo-orbit-drag-c {
  from { transform: rotateX(66deg) rotateY(30deg) rotateZ(0deg); }
  to { transform: rotateX(66deg) rotateY(30deg) rotateZ(360deg); }
}
.halo--drag .halo-core {
  animation: halo-breathe 1.6s ease-in-out infinite alternate;
}

/* flee: everything snaps into a fast tight spin. */
.halo--flee .halo-ring--a,
.halo--flee .halo-ring--b,
.halo--flee .halo-ring--c {
  animation-duration: 0.9s;
}
.halo--flee .halo-core,
.halo--flee .halo-haze {
  animation-duration: 1.2s;
}

@media (prefers-reduced-motion: reduce) {
  .halo-haze,
  .halo-ring,
  .halo-core,
  .halo-spark,
  .halo-ripple {
    animation: none !important;
  }
}
"""

lines[start:end] = HALO.split("\n")
open(p, "w").write("\n".join(lines))
print(f"replaced goldie block (lines {start + 1}..{end}) with halo block")
