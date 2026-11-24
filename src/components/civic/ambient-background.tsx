"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the living backdrop, v3 "Sunset City".
 *
 * A real golden-hour Los Angeles panorama (public/city-sunset.jpg, 1920×1080
 * progressive JPEG, ~350KB) stretched across the whole viewport and kept
 * ALIVE on top of it:
 *
 *   photo (slow ken-burns drift)  →  scroll parallax wrapper (JS)
 *   breathing sun glow at the horizon
 *   canvas: twinkling city lights + drifting warm haze + bird flocks
 *   film grain + readability scrims (navy gradient, top/bottom bands)
 *
 * Why a photo again (v2 was fully procedural): the request is a literally
 * breathtaking city sunset — photographic depth wins. The stale-cache
 * problem from v1 is avoided by a unique filename; if the file is ever
 * replaced, ship it under a NEW name.
 *
 * Performance contract (same as v2):
 * - one canvas, DPR capped at 1.75, rAF capped at ~40fps, loop paused when
 *   the tab is hidden, nothing at all under prefers-reduced-motion except
 *   one static light-twinkle frame;
 * - photo + glow are GPU-composited CSS transform/opacity animations;
 * - parallax is one passive scroll listener writing a transform at most
 *   once per frame, clamped so it never runs away on long pages;
 * - nothing essential lives here (aria-hidden).
 */

type Light = { x: number; y: number; r: number; phase: number; speed: number; warm: boolean };
type Haze = { x: number; y: number; rx: number; ry: number; vx: number; a: number };
type Bird = { x: number; y: number; vx: number; flap: number; size: number; phase: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Scroll parallax: the city slides gently as you scroll (max ±110px,
  // saturated after ~14 screens so it can never run away).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = parallaxRef.current;
    if (!el || reduced) return;
    let raf = 0;
    let pending = false;
    const apply = () => {
      pending = false;
      const y = Math.min(window.scrollY * 0.08, 110);
      el.style.transform = `translate3d(0, ${-y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let lights: Light[] = [];
    let haze: Haze[] = [];
    let birds: Bird[] = [];
    let nextFlockAt = 3;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = () => {
      const small = w < 768;
      // City lights live in the skyline band (bottom ~45% of the frame).
      lights = Array.from({ length: small ? 26 : 56 }, () => ({
        x: Math.random() * w,
        y: h * rand(0.62, 0.97),
        r: rand(0.5, 1.6),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.5, 1.8),
        warm: Math.random() < 0.72,
      }));
      haze = Array.from({ length: small ? 2 : 4 }, () => ({
        x: Math.random() * w,
        y: h * rand(0.55, 0.9),
        rx: rand(0.22, 0.42) * w,
        ry: rand(0.04, 0.09) * h,
        vx: rand(6, 16) * (Math.random() < 0.5 ? -1 : 1),
        a: rand(0.03, 0.07),
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

    const drawBird = (b: Bird, t: number) => {
      // Tiny "m" silhouette — two strokes whose angle beats with flap.
      const s = b.size;
      const beat = Math.sin(t * b.flap + b.phase);
      const dy = beat * s * 0.55;
      ctx.strokeStyle = "rgba(20, 14, 10, 0.62)";
      ctx.lineWidth = Math.max(1, s * 0.16);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(b.x - s, b.y - dy);
      ctx.quadraticCurveTo(b.x - s * 0.35, b.y + s * 0.18, b.x, b.y);
      ctx.quadraticCurveTo(b.x + s * 0.35, b.y + s * 0.18, b.x + s, b.y - dy);
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const dt = 1 / 40;

      // City lights — warm glimmer over the skyline band.
      for (const l of lights) {
        const a = 0.14 + 0.4 * (0.5 + 0.5 * Math.sin(t * l.speed + l.phase));
        ctx.beginPath();
        ctx.fillStyle = l.warm
          ? `rgba(255, 199, 120, ${a.toFixed(3)})`
          : `rgba(190, 227, 248, ${(a * 0.8).toFixed(3)})`;
        ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Warm haze drifting sideways — the golden-hour smog glow.
      for (const hz of haze) {
        hz.x += hz.vx * dt;
        if (hz.x - hz.rx > w) hz.x = -hz.rx;
        if (hz.x + hz.rx < 0) hz.x = w + hz.rx;
        const g = ctx.createRadialGradient(hz.x, hz.y, 0, hz.x, hz.y, hz.rx);
        g.addColorStop(0, `rgba(233, 168, 84, ${hz.a})`);
        g.addColorStop(1, "rgba(233, 168, 84, 0)");
        ctx.save();
        ctx.translate(hz.x, hz.y);
        ctx.scale(1, hz.ry / hz.rx);
        ctx.translate(-hz.x, -hz.y);
        ctx.fillStyle = g;
        ctx.fillRect(hz.x - hz.rx, hz.y - hz.rx, hz.rx * 2, hz.rx * 2);
        ctx.restore();
      }

      // Bird flocks — a small "v" crosses the sky every 14–26s.
      if (!birds.length && t > nextFlockAt) {
        const fromLeft = Math.random() < 0.5;
        const n = 3 + ((Math.random() * 4) | 0);
        const baseY = h * rand(0.14, 0.42);
        const vx = (fromLeft ? 1 : -1) * rand(70, 120);
        birds = Array.from({ length: n }, (_, i) => ({
          x: (fromLeft ? -30 : w + 30) + (fromLeft ? -1 : 1) * i * rand(18, 34),
          y: baseY + (i % 2 === 0 ? 1 : -1) * i * rand(6, 16),
          vx: vx * rand(0.92, 1.1),
          flap: rand(9, 13),
          size: rand(4.5, 8),
          phase: Math.random() * Math.PI * 2,
        }));
      }
      for (const b of birds) {
        b.x += b.vx * dt;
        b.y += Math.sin(t * 0.7 + b.phase) * 6 * dt;
        drawBird(b, t);
      }
      birds = birds.filter(
        (b) => b.x > -60 && b.x < w + 60 && b.y > -30 && b.y < h + 30,
      );
      if (!birds.length) nextFlockAt = t + rand(14, 26);
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
    <div className="city-root" aria-hidden="true">
      {/* L1 — the panorama: ken-burns photo inside a scroll-parallax wrap. */}
      <div ref={parallaxRef} className="city-parallax">
        <div className="city-photo" />
      </div>
      {/* L2 — the sun: a warm glow band on the horizon that breathes. */}
      <div className="city-sunglow" />
      {/* L3 — living layer: city lights, haze, birds. */}
      <canvas ref={canvasRef} className="city-living" />
      {/* L4 — film grain: tactile finish. */}
      <div className="city-grain" />
      {/* L5 — readability: navy wash + top/bottom bands + vignette. Panels
          are already translucent navy, so this stays a veil, not a wall. */}
      <div className="city-scrim" />
      <div className="city-vignette" />
    </div>
  );
}
