"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the Civic Futurism living backdrop, v2 "Civic Aurora".
 *
 * Fully procedural: ZERO image requests. A deep navy light-well, three
 * drifting aurora blobs (gold / cyan / teal), a slowly rotating conic
 * prism veil, a canvas layer with data sparks, twinkling stars and the
 * occasional comet, and a film-grain finish — the same layered-aurora
 * grammar as the best product sites, in the Civic palette.
 *
 * Because nothing is an image, no cached file can ever overlay a stale
 * version after a deploy (the old crossfading-photo system is gone).
 *
 * Performance contract:
 * - one canvas, DPR capped at 1.75, ~40 sparks + ~70 stars on desktop,
 *   roughly half on small screens;
 * - the rAF loop stops when the tab is hidden and never starts at all
 *   under prefers-reduced-motion (a single static star frame is drawn);
 * - all other layers are pure CSS transform/opacity animations — no
 *   layout, no paint, GPU-composited;
 * - nothing essential is ever rendered inside this layer (aria-hidden).
 */

const GOLD = "217, 164, 65";
const CYAN = "56, 189, 248";
const TEAL = "45, 212, 191";

type Star = { x: number; y: number; r: number; phase: number; speed: number; c: string };
type Spark = { x: number; y: number; r: number; vy: number; sway: number; phase: number; c: string; a: number };
type Comet = { x: number; y: number; vx: number; vy: number; life: number; max: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let sparks: Spark[] = [];
    let comet: Comet | null = null;
    let nextCometAt = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const palette = [GOLD, CYAN, TEAL, "248, 250, 252"];

    const seed = () => {
      const small = w < 768;
      const starCount = small ? 42 : 78;
      const sparkCount = small ? 18 : 34;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.5),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.4, 1.4),
        c: palette[(Math.random() * palette.length) | 0],
      }));
      sparks = Array.from({ length: sparkCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 1.8),
        vy: rand(6, 16), // px per second, upward
        sway: rand(4, 14),
        phase: Math.random() * Math.PI * 2,
        c: Math.random() < 0.55 ? GOLD : CYAN,
        a: rand(0.25, 0.7),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    };

    const drawStar = (s: Star, alpha: number) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.c}, ${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Stars — twinkle in place.
      for (const s of stars) {
        drawStar(s, 0.18 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase)));
      }

      // Sparks — fine motes drifting upward with a gentle sway.
      const dt = 1 / 60;
      for (const p of sparks) {
        p.y -= p.vy * dt;
        p.x += Math.sin(t * 0.7 + p.phase) * p.sway * dt;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        const tw = 0.6 + 0.4 * Math.sin(t * 1.6 + p.phase * 3);
        drawStar({ ...p, r: p.r } as Star, p.a * tw);
      }

      // Comet — one at a time, every 9–17 seconds.
      if (!comet && t > nextCometAt) {
        const fromLeft = Math.random() < 0.5;
        comet = {
          x: fromLeft ? rand(-0.1, 0.2) * w : rand(0.8, 1.1) * w,
          y: rand(0.04, 0.3) * h,
          vx: (fromLeft ? 1 : -1) * rand(220, 320),
          vy: rand(70, 120),
          life: 0,
          max: rand(1.1, 1.7),
        };
      }
      if (comet) {
        comet.life += dt;
        const k = comet.life / comet.max;
        const fade = k < 0.15 ? k / 0.15 : 1 - Math.max(0, (k - 0.6) / 0.4);
        const tail = 110;
        const nx = comet.vx / Math.hypot(comet.vx, comet.vy);
        const ny = comet.vy / Math.hypot(comet.vx, comet.vy);
        const grad = ctx.createLinearGradient(
          comet.x, comet.y, comet.x - nx * tail, comet.y - ny * tail,
        );
        grad.addColorStop(0, `rgba(248, 250, 252, ${0.85 * fade})`);
        grad.addColorStop(0.35, `rgba(${CYAN}, ${0.4 * fade})`);
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - nx * tail, comet.y - ny * tail);
        ctx.stroke();
        drawStar({ x: comet.x, y: comet.y, r: 1.7, phase: 0, speed: 0, c: "248, 250, 252" }, 0.95 * fade);
        comet.x += comet.vx * dt;
        comet.y += comet.vy * dt;
        if (comet.life >= comet.max || comet.y > h + 40 || comet.x < -60 || comet.x > w + 60) {
          comet = null;
          nextCometAt = t + rand(9, 17);
        }
      }
    };

    let last = 0;
    const loop = (now: number) => {
      const t = now / 1000;
      // Cap at ~40fps — background motion never needs more.
      if (now - last >= 24) {
        last = now;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 180);
    };
    window.addEventListener("resize", onResize);

    if (!reduced) {
      raf = requestAnimationFrame(loop);
      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) {
          last = 0;
          raf = requestAnimationFrame(loop);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }
    // Reduced motion: static frame only, no loop at all.
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="ambient-root" aria-hidden="true">
      {/* L1 — deep navy light-well: directional depth, never flat black. */}
      <div className="ambient-base" />
      {/* L2 — aurora blobs: living light in the Civic palette. */}
      <div className="ambient-blob ambient-blob--gold" />
      <div className="ambient-blob ambient-blob--cyan" />
      <div className="ambient-blob ambient-blob--teal" />
      {/* L3 — conic prism veil: a slow rotating wash tying the palette together. */}
      <div className="ambient-prism" />
      {/* L4 — living particles: sparks, stars, comets. */}
      <canvas ref={canvasRef} className="ambient-particles" />
      {/* L5 — film grain: tactile finish over the digital gradient. */}
      <div className="ambient-grain" />
      {/* L6 — readability: soft vignette + a much lighter scrim than v1. */}
      <div className="ambient-vignette" />
      <div className="ambient-scrim" />
    </div>
  );
}
