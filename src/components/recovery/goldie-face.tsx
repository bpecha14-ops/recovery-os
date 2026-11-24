"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * GoldieFace / GoldieArms — the animated body of the AI guide.
 *
 * Goldie used to be a static PNG; he is now a drawn character so every
 * part can act:
 * - EYES track the cursor (normalized look vector, lerped by a CSS
 *   transition), blink on a natural random schedule, go wide when
 *   alarmed, and fold into happy arcs while he talks.
 * - BROWS tilt with mood; the mouth swaps smile / talking / "O" / "eek".
 * - ARMS swing from the coin's sides: idle sway, a wave while talking,
 *   a flail while being dragged, tucked back when fleeing.
 *
 * The face renders inside the coin frame (round, overflow-hidden); the
 * arms SVG sits behind that frame and pokes out at the sides, so nothing
 * is clipped. All motion is transform/opacity, every animation is gated
 * by prefers-reduced-motion.
 */

export type GoldieMood = "idle" | "curious" | "talk" | "drag" | "flee";

/** How open the eyes are per mood (scaleY on the eye group). */
const EYE_OPEN: Record<GoldieMood, number> = {
  idle: 1,
  curious: 1.05,
  talk: 1,
  drag: 1.22,
  flee: 1.1,
};

export function GoldieFace({ mood }: { mood: GoldieMood }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const eyeLRef = useRef<SVGGElement>(null);
  const eyeRRef = useRef<SVGGElement>(null);
  // Latest eye state, written by the rAF painter.
  const lookRef = useRef({ x: 0, y: 0 });
  const blinkRef = useRef(0); // timestamp until which we blink
  const moodRef = useRef<GoldieMood>(mood);
  moodRef.current = mood;

  // Shared painter — look vector, blink window, per-mood openness. Reads
  // only refs, so the first-render closure stays valid forever.
  const paintEyes = useCallback(() => {
    const eyeL = eyeLRef.current;
    const eyeR = eyeRRef.current;
    if (!eyeL || !eyeR) return;
    const blinking = performance.now() < blinkRef.current;
    const open = blinking ? 0.1 : EYE_OPEN[moodRef.current];
    const tx = lookRef.current.x * 2.4;
    const ty = lookRef.current.y * 1.9;
    const t = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(1, ${open.toFixed(2)})`;
    eyeL.style.transform = t;
    eyeR.style.transform = t;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Look at the cursor -------------------------------------------------
    const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    let raf = 0;
    let queued = false;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (r.width === 0) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      // Saturate toward the cursor at distance; fade back to center when
      // the hand is ON him — being carried, he looks at the camera.
      const k = Math.min(1, 140 / dist) * Math.min(1, dist / 26);
      lookRef.current = { x: (dx / dist) * k, y: (dy / dist) * k };
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(() => {
          queued = false;
          paintEyes();
        });
      }
    };
    if (hoverFine || !touch) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    // --- Blink on a natural random schedule ---------------------------------
    let blinkTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleBlink = () => {
      blinkTimer = setTimeout(
        () => {
          blinkRef.current = performance.now() + 130;
          paintEyes();
          const dbl = Math.random() < 0.25; // occasional double blink
          blinkTimer = setTimeout(() => {
            if (dbl) {
              blinkRef.current = performance.now() + 110;
              paintEyes();
            }
            scheduleBlink();
          }, dbl ? 260 : 140);
        },
        2200 + Math.random() * 3200,
      );
    };
    if (!reduced) scheduleBlink();

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      if (blinkTimer) clearTimeout(blinkTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mood changes (talk / drag / flee…) re-open the eyes immediately.
  useEffect(() => {
    paintEyes();
  }, [mood, paintEyes]);

  const happy = mood === "talk";

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 100 100"
      className="goldie-face"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="goldie-face-grad" cx="42%" cy="36%" r="72%">
          <stop offset="0%" stopColor="#f9e7a8" />
          <stop offset="52%" stopColor="#eec46a" />
          <stop offset="100%" stopColor="#d9a441" />
        </radialGradient>
      </defs>

      {/* Coin face */}
      <circle cx="50" cy="50" r="49" fill="url(#goldie-face-grad)" />
      <circle cx="50" cy="50" r="41.5" fill="none" stroke="rgba(122, 82, 16, 0.32)" strokeWidth="1.4" />
      <ellipse cx="34" cy="26" rx="16" ry="9" fill="rgba(255, 252, 240, 0.22)" transform="rotate(-24 34 26)" />

      {/* Cheeks */}
      <circle cx="30" cy="57" r="4.6" fill="rgba(224, 116, 56, 0.30)" />
      <circle cx="70" cy="57" r="4.6" fill="rgba(224, 116, 56, 0.30)" />

      {/* Brows */}
      <g className={`goldie-brows goldie-brows--${mood}`}>
        <path d="M 31 38.5 Q 37.5 34.5 44 38" className="goldie-brow goldie-brow--l" />
        <path d="M 56 38 Q 62.5 34.5 69 38.5" className="goldie-brow goldie-brow--r" />
      </g>

      {/* Eyes: tracking pupils (hidden while happy-talking) */}
      <g
        ref={eyeLRef}
        className="goldie-eye-g"
        style={{ opacity: happy ? 0 : 1, transition: "opacity .25s ease, transform .14s ease-out" }}
      >
        <ellipse cx="37.5" cy="48" rx="5" ry="6.6" fill="#3a2410" />
        <circle cx="35.8" cy="45.6" r="1.7" fill="rgba(255, 246, 220, 0.92)" />
      </g>
      <g
        ref={eyeRRef}
        className="goldie-eye-g"
        style={{ opacity: happy ? 0 : 1, transition: "opacity .25s ease, transform .14s ease-out" }}
      >
        <ellipse cx="62.5" cy="48" rx="5" ry="6.6" fill="#3a2410" />
        <circle cx="60.8" cy="45.6" r="1.7" fill="rgba(255, 246, 220, 0.92)" />
      </g>

      {/* Happy arc eyes while talking */}
      {happy && (
        <g className="goldie-eyes-happy" stroke="#3a2410" strokeWidth="3.2" strokeLinecap="round" fill="none">
          <path d="M 32.5 49 Q 37.5 42.5 42.5 49" />
          <path d="M 57.5 49 Q 62.5 42.5 67.5 49" />
        </g>
      )}

      {/* Mouth per mood */}
      {mood === "talk" ? (
        <g className="goldie-mouth goldie-mouth--talk">
          <ellipse cx="50" cy="66" rx="7" ry="5.6" fill="#3a2410" />
          <ellipse cx="50" cy="64" rx="3.4" ry="2" fill="rgba(255, 246, 220, 0.5)" />
        </g>
      ) : mood === "drag" ? (
        <circle cx="50" cy="66" r="6" fill="#3a2410" />
      ) : mood === "flee" ? (
        <path d="M 42 66 q 4 -4.5 8 0 q 4 4.5 8 0" fill="none" stroke="#3a2410" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d="M 41 64 Q 50 71.5 59 64" fill="none" stroke="#3a2410" strokeWidth="3" strokeLinecap="round" />
      )}
    </svg>
  );
}

/**
 * Arms poking out from behind the coin. viewBox 140×100 where the coin
 * occupies the central 100×100; shoulders sit ON the coin edge so the
 * swing reads as attached. Mood classes drive the keyframe animation.
 */
export function GoldieArms({ mood }: { mood: GoldieMood }) {
  return (
    <svg
      className={`goldie-arms goldie-arms--${mood}`}
      viewBox="0 0 140 100"
      aria-hidden="true"
      focusable="false"
    >
      {/* Left arm — shoulder at (30,62) on the coin edge */}
      <g className="goldie-arm goldie-arm--l" style={{ transformOrigin: "30px 62px" }}>
        <line x1="30" y1="62" x2="12" y2="79" stroke="#c89030" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="12" cy="79" r="4.8" fill="#e7c77e" stroke="#a06a1c" strokeWidth="1.2" />
      </g>
      {/* Right arm — shoulder at (110,62) */}
      <g className="goldie-arm goldie-arm--r" style={{ transformOrigin: "110px 62px" }}>
        <line x1="110" y1="62" x2="128" y2="79" stroke="#c89030" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="128" cy="79" r="4.8" fill="#e7c77e" stroke="#a06a1c" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
