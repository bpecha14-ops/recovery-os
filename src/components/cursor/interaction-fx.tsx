"use client";

import { useEffect, useRef } from "react";

/**
 * InteractionFX — site-wide "the page answers the hand" layer:
 *
 * 1. Cursor glow: a soft gold halo (screen blend) trailing the pointer
 *    with a bright core, blooming cyan over interactive elements.
 * 2. Card tilt: every .panel-black leans toward the cursor in 3D
 *    (perspective rotateX/rotateY, lerped, GPU-only) and carries a
 *    spotlight sheen that follows the pointer (CSS vars --mx/--my).
 *
 * Engineering notes:
 * - ONE delegated pointermove listener on window — no per-card handlers,
 *   works for any panel mounted later (route changes, lazy tabs) for free.
 * - Style writes are batched into a single rAF loop that stops the moment
 *   everything has settled; pointermove re-kicks it.
 * - Tilt composes with framer-motion's reveal transforms: the engine
 *   caches the panel's own transform on entry ("base") and always writes
 *   base + tilt, restoring base exactly when the tilt settles back to 0.
 * - Panels taller than 92% of the viewport are skipped (tilting a
 *   wall of table would look wrong, and layout reads would grow).
 * - Everything is disabled on touch pointers and prefers-reduced-motion.
 */

const TILT_MAX_X = 2.4; // deg — vertical lean
const TILT_MAX_Y = 3.2; // deg — horizontal lean
const TILT_SEL = ".panel-black";
const INTERACTIVE_SEL =
  "a,button,[role=button],input,select,textarea,summary,label,[data-cursor='hover']";

type Halo = HTMLDivElement | null;

export function InteractionFX() {
  const rootRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const cyanRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable wherever a real pointer can hover: desktops report
    // (hover:hover)+(pointer:fine); pointerless environments (some
    // headless/embedded contexts) also pass the touch check. Truly
    // touch-first devices (coarse pointer or touch points) get nothing.
    const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((!hoverFine && touch) || reduced) return;

    let raf = 0;
    let pointerX = -1;
    let pointerY = -1;
    let pointerIn = false;
    let interactive = false;

    // Glow chase state.
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let cx = gx;
    let cy = gy;
    let scale = 1;

    // Tilt state for the currently hovered panel.
    let card: HTMLElement | null = null;
    let base = "";
    let rx = 0;
    let ry = 0;
    let trx = 0;
    let tryY = 0;
    let engaged = false;
    let needsSnap = false;

    const applyGlow = () => {
      const root = rootRef.current;
      const gold = goldRef.current as Halo;
      const cyan = cyanRef.current as Halo;
      const core = coreRef.current as Halo;
      if (!gold || !cyan || !core) return pointerIn;
      if (root) root.classList.toggle("is-on", pointerIn);
      if (!pointerIn) return false;
      // Settled: everything parked within half a pixel — the loop can
      // sleep until the next pointermove (one forced write on entry so
      // a teleporting pointer never leaves the halo behind).
      if (needsSnap) needsSnap = false;
      else {
        const parked =
          Math.abs(pointerX - gx) < 0.5 &&
          Math.abs(pointerY - gy) < 0.5 &&
          Math.abs((interactive ? 1.45 : 1) - scale) < 0.03;
        if (parked) return false;
      }
      gx += (pointerX - gx) * 0.14;
      gy += (pointerY - gy) * 0.14;
      cx += (pointerX - cx) * 0.42;
      cy += (pointerY - cy) * 0.42;
      scale += ((interactive ? 1.45 : 1) - scale) * 0.16;
      gold.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(${scale.toFixed(3)})`;
      cyan.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(${scale.toFixed(3)})`;
      core.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (root) root.classList.toggle("is-interactive", interactive);
      return true;
    };

    const tick = () => {
      raf = 0;
      let busy = applyGlow();

      if (card) {
        rx += (trx - rx) * 0.2;
        ry += (tryY - ry) * 0.2;
        const settled =
          Math.abs(trx - rx) < 0.03 && Math.abs(tryY - ry) < 0.03;
        if (!engaged && settled) {
          // Tilted back to flat — restore the panel's own transform exactly.
          card.style.transform = base;
          card = null;
        } else {
          card.style.transform =
            `${base} perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` +
            (engaged ? " translateZ(0) scale(1.012)" : "");
          if (!settled) busy = true;
        }
      }
      if (busy) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!pointerIn) {
        pointerIn = true;
        gx = cx = pointerX;
        gy = cy = pointerY;
        needsSnap = true;
      }
      const target = e.target as Element | null;
      interactive = !!target?.closest?.(INTERACTIVE_SEL);

      const el = target?.closest?.(TILT_SEL) as HTMLElement | null;
      if (el !== card) {
        if (card) {
          // Leaving the old panel: ease back to flat, then restore base.
          engaged = false;
          trx = 0;
          tryY = 0;
        }
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.height > window.innerHeight * 0.92) {
            card = null; // too tall to tilt gracefully
          } else {
            card = el;
            base = el.style.transform || "";
            rx = 0;
            ry = 0;
            engaged = true;
          }
        } else {
          card = el; // null
        }
      }
      if (card && engaged) {
        const rect = card.getBoundingClientRect();
        const nx = (pointerX - rect.left) / rect.width - 0.5;
        const ny = (pointerY - rect.top) / rect.height - 0.5;
        // "Toward the cursor": right edge tips toward the viewer when the
        // cursor is right (rotateY negative), bottom edge rises on rotateX.
        tryY = -nx * TILT_MAX_Y * 2;
        trx = ny * TILT_MAX_X * 2;
        card.style.setProperty("--mx", `${((pointerX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((pointerY - rect.top) / rect.height) * 100}%`);
      }
      kick();
    };

    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        pointerIn = false;
        interactive = false;
        if (card) {
          engaged = false;
          trx = 0;
          tryY = 0;
        }
        kick();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      if (card) card.style.transform = base;
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-fx" aria-hidden="true">
      <div ref={goldRef} className="cursor-fx__halo" />
      <div ref={cyanRef} className="cursor-fx__halo cursor-fx__halo--cyan" />
      <div ref={coreRef} className="cursor-fx__core" />
    </div>
  );
}
