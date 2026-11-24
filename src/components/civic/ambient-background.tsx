"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the living backdrop, v4 "Hills Vista".
 *
 * You are standing on the Beverly Hills hills: a vast Los Angeles
 * panorama (public/city-sunset-v2.jpg, shot from a high overlook, the
 * whole basin to the horizon) under a dusk sky where a deep RED sun
 * settles at the horizon. Layers, back to front:
 *
 *   photo (slow ken-burns, more travel)  →  inside a scroll-parallax wrap
 *   the RED SUN: drawn as a child of the photo element so the ken-burns
 *     drift carries it exactly with the city — breathing corona, core
 *     glow and slowly rotating god rays, positioned by replicating the
 *     CSS cover math at the coordinates the photo's composition calls
 *     for (VLM-measured: sun ≈ 82% x, 41% y; horizon ≈ 42%)
 *   foreground hill silhouettes (two depths, own faster parallax — the
 *     nearer the layer, the more it slides: that is what sells "I am
 *     standing on a hill looking down at the city")
 *   canvas: stars up top, twinkling city lights, warm haze, drifting
 *     cloud shadows, bird flocks, and an airliner with blinking
 *     strobes crawling across the sky (LAX approach)
 *   film grain + navy readability scrims
 *
 * Performance contract (unchanged): one canvas, DPR ≤ 1.75, rAF capped
 * at ~40fps, paused when hidden, one static frame under reduced motion;
 * photo/sun/hills are GPU transform/opacity only; parallax writes are
 * clamped so long pages never run away; nothing essential lives here.
 */

/* Photo composition constants (measured on the actual image). */
const PHOTO_W = 1920;
const PHOTO_H = 1080;
const SUN = { x: 0.825, y: 0.41 }; // fraction of photo width/height
const BG_POS_Y = 0.38; // matches background-position "center 38%"

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Light = { x: number; y: number; r: number; phase: number; speed: number; warm: boolean };
type Haze = { x: number; y: number; rx: number; ry: number; vx: number; a: number };
type Cloud = { x: number; y: number; rx: number; ry: number; vx: number; a: number };
type Bird = { x: number; y: number; vx: number; flap: number; size: number; phase: number };
type Plane = { x: number; y: number; vx: number; life: number; max: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const hillsFarRef = useRef<HTMLDivElement>(null);
  const hillsNearRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  /* Scroll parallax — three depths: the photo recedes gently, the near
     hill slides hardest. Clamped so long pages never run away. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    let pending = false;
    const apply = () => {
      pending = false;
      const y = Math.min(window.scrollY, 2600); // saturate after ~14 screens
      const set = (el: HTMLElement | null, k: number, cap: number) => {
        if (el) el.style.transform = `translate3d(0, ${(-Math.min(y * k, cap)).toFixed(1)}px, 0)`;
      };
      set(parallaxRef.current, 0.08, 110);
      set(hillsFarRef.current, 0.14, 170);
      set(hillsNearRef.current, 0.22, 260);
      // The bloom layer rides with the photo (same factor) so the sun's
      // over-scrim glow stays glued to the panorama.
      set(bloomRef.current, 0.08, 110);
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

  /* Pin the drawn sun onto the photo's own composition. The sun lives
     INSIDE .city-photo, so the ken-burns transform carries it along; we
     only need the position, computed by replicating background-size:
     cover + background-position for the current viewport. The BLOOM
     copy (above the scrims, so the sun actually shines through the
     navy veil) is placed at the same screen spot: element coords minus
     the parallax wrapper's -6% top inset (photo.offsetTop). */
  useEffect(() => {
    const sun = sunRef.current;
    const bloom = bloomRef.current;
    if (!sun || !bloom) return;
    const glow = bloom.querySelector<HTMLElement>(".city-bloom-glow");
    const disc = bloom.querySelector<HTMLElement>(".city-bloom-disc");
    const place = () => {
      const photo = sun.parentElement;
      if (!photo) return;
      const elW = photo.clientWidth;
      const elH = photo.clientHeight;
      // .city-parallax is inset -6% 0 — the element is ~12% taller than
      // the viewport; clientHeight already accounts for that.
      const px = window.innerWidth < 768 ? 0.94 : 0.5; // mobile: follow the sun
      const s = Math.max(elW / PHOTO_W, elH / PHOTO_H);
      const ox = (elW - PHOTO_W * s) * px;
      const oy = (elH - PHOTO_H * s) * BG_POS_Y;
      const x = ox + SUN.x * PHOTO_W * s;
      const y = oy + SUN.y * PHOTO_H * s;
      sun.style.left = `${x.toFixed(1)}px`;
      sun.style.top = `${y.toFixed(1)}px`;
      // Screen coords for the bloom: element coords + the photo box's
      // offset inside the viewport (offsetTop ≈ -6% of the root height).
      const bx = x + photo.offsetLeft;
      const by = y + photo.offsetTop;
      if (glow) {
        glow.style.left = `${bx.toFixed(1)}px`;
        glow.style.top = `${by.toFixed(1)}px`;
      }
      if (disc) {
        disc.style.left = `${bx.toFixed(1)}px`;
        disc.style.top = `${by.toFixed(1)}px`;
      }
    };
    place();
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(place, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
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
    let stars: Star[] = [];
    let lights: Light[] = [];
    let haze: Haze[] = [];
    let clouds: Cloud[] = [];
    let birds: Bird[] = [];
    let plane: Plane | null = null;
    let nextFlockAt = 4;
    let nextPlaneAt = 9;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = () => {
      const small = w < 768;
      // Stars only in the dark top of the dusk sky.
      stars = Array.from({ length: small ? 14 : 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.24,
        r: rand(0.4, 1.1),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.5, 1.6),
      }));
      // City lights across the skyline band (horizon sits ≈42%).
      lights = Array.from({ length: small ? 30 : 64 }, () => ({
        x: Math.random() * w,
        y: h * rand(0.47, 0.9),
        r: rand(0.5, 1.6),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.5, 1.8),
        warm: Math.random() < 0.72,
      }));
      // Warm haze along the horizon — the red-sun smog glow.
      haze = Array.from({ length: small ? 2 : 4 }, () => ({
        x: Math.random() * w,
        y: h * rand(0.5, 0.9),
        rx: rand(0.22, 0.42) * w,
        ry: rand(0.04, 0.09) * h,
        vx: rand(6, 16) * (Math.random() < 0.5 ? -1 : 1),
        a: rand(0.03, 0.07),
      }));
      // Cloud shadows drifting across the mid sky.
      clouds = Array.from({ length: small ? 2 : 3 }, () => ({
        x: Math.random() * w,
        y: h * rand(0.1, 0.34),
        rx: rand(0.2, 0.38) * w,
        ry: rand(0.05, 0.1) * h,
        vx: rand(9, 20) * (Math.random() < 0.5 ? -1 : 1),
        a: rand(0.05, 0.09),
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

    const drawDot = (x: number, y: number, r: number, fill: string) => {
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
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

    const drawPlane = (p: Plane, t: number) => {
      // A distant airliner crawling across the sky, strobes blinking —
      // the constant LAX approach stack over the basin at dusk.
      const fus = 5.5; // half-length
      const dir = Math.sign(p.vx);
      ctx.strokeStyle = "rgba(16, 12, 10, 0.55)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(p.x - fus * dir, p.y);
      ctx.lineTo(p.x + fus * dir, p.y);
      ctx.stroke();
      // Red beacon + white strobe, alternating.
      const blink = (t * 1.1) % 1;
      if (blink < 0.12) drawDot(p.x - fus * dir, p.y, 1.6, "rgba(255, 64, 44, 0.95)");
      if (blink > 0.5 && blink < 0.56) drawDot(p.x + fus * dir, p.y, 2.1, "rgba(255, 255, 255, 0.95)");
      // Faint navigation lights between blinks.
      drawDot(p.x - fus * dir, p.y, 0.8, "rgba(255, 64, 44, 0.35)");
      drawDot(p.x + fus * dir, p.y, 0.9, "rgba(255, 255, 255, 0.3)");
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const dt = 1 / 40;

      // Stars — faint twinkle in the darkening top of the sky.
      for (const s of stars) {
        const a = 0.1 + 0.34 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        drawDot(s.x, s.y, s.r, `rgba(226, 232, 240, ${a.toFixed(3)})`);
      }

      // City lights — warm glimmer across the basin.
      for (const l of lights) {
        const a = 0.14 + 0.4 * (0.5 + 0.5 * Math.sin(t * l.speed + l.phase));
        drawDot(
          l.x,
          l.y,
          l.r,
          l.warm
            ? `rgba(255, 199, 120, ${a.toFixed(3)})`
            : `rgba(190, 227, 248, ${(a * 0.8).toFixed(3)})`,
        );
      }

      // Warm horizon haze drifting sideways.
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

      // Cloud shadows sliding across the mid sky — the sky breathes.
      for (const c of clouds) {
        c.x += c.vx * dt;
        if (c.x - c.rx > w) c.x = -c.rx;
        if (c.x + c.rx < 0) c.x = w + c.rx;
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx);
        g.addColorStop(0, `rgba(10, 14, 30, ${c.a})`);
        g.addColorStop(1, "rgba(10, 14, 30, 0)");
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(1, c.ry / c.rx);
        ctx.translate(-c.x, -c.y);
        ctx.fillStyle = g;
        ctx.fillRect(c.x - c.rx, c.y - c.rx, c.rx * 2, c.rx * 2);
        ctx.restore();
      }

      // Bird flocks — a small "v" crosses the sky every 10–20s.
      if (!birds.length && t > nextFlockAt) {
        const fromLeft = Math.random() < 0.5;
        const n = 3 + ((Math.random() * 4) | 0);
        const baseY = h * rand(0.12, 0.4);
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
      birds = birds.filter((b) => b.x > -60 && b.x < w + 60);
      if (!birds.length) nextFlockAt = t + rand(10, 20);

      // The airliner — slow, far, strobes blinking.
      if (!plane && t > nextPlaneAt) {
        const fromLeft = Math.random() < 0.5;
        const vx = (fromLeft ? 1 : -1) * rand(55, 85);
        plane = {
          x: fromLeft ? -20 : w + 20,
          y: h * rand(0.08, 0.22),
          vx,
          life: 0,
          max: (w + 60) / Math.abs(vx),
        };
      }
      if (plane) {
        plane.life += dt;
        drawPlane(plane, t);
        plane.x += plane.vx * dt;
        if (plane.life >= plane.max || plane.x < -40 || plane.x > w + 40) {
          plane = null;
          nextPlaneAt = t + rand(25, 40);
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
    <div className="city-root" aria-hidden="true">
      {/* L1 — the panorama: ken-burns photo inside a scroll-parallax wrap.
          The drawn sun is a CHILD of the photo so the drift carries it. */}
      <div ref={parallaxRef} className="city-parallax">
        <div className="city-photo">
          <div ref={sunRef} className="city-sun">
            <div className="city-sun-wash" />
            <div className="city-sun-band" />
            <div className="city-sun-corona" />
            <div className="city-sun-core" />
          </div>
        </div>
      </div>
      {/* L2 — foreground hills: two silhouette depths with their own,
          faster parallax (near slides more — the hill you stand on).
          Each ridge carries a warm rim light: the low sun catching the
          hilltop is what makes the silhouette READ against the sprawl. */}
      <div ref={hillsFarRef} className="city-hills city-hills--far">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hill-rim-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 132, 62, 0.42)" />
              <stop offset="100%" stopColor="rgba(255, 132, 62, 0)" />
            </linearGradient>
          </defs>
          <path
            className="city-hill city-hill--far"
            d="M0 240 L0 96 C 140 66 300 120 470 92 C 640 64 780 110 940 86 C 1110 60 1290 108 1440 84 L 1440 240 Z"
          />
          <path
            className="city-hill-glow"
            d="M0 96 C 140 66 300 120 470 92 C 640 64 780 110 940 86 C 1110 60 1290 108 1440 84"
            fill="none"
            stroke="url(#hill-rim-far)"
            strokeWidth="10"
          />
          <path
            d="M0 96 C 140 66 300 120 470 92 C 640 64 780 110 940 86 C 1110 60 1290 108 1440 84"
            fill="none"
            stroke="url(#hill-rim-far)"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div ref={hillsNearRef} className="city-hills city-hills--near">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hill-rim-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 126, 58, 0.62)" />
              <stop offset="100%" stopColor="rgba(255, 126, 58, 0)" />
            </linearGradient>
          </defs>
          {/* Asymmetric ridge: a high dark slope on the LEFT — the hill
              you stand on, rising into the frame — opening to a low
              right edge so the sun-side horizon stays wide. */}
          <path
            className="city-hill city-hill--near"
            d="M0 300 L0 0 C 150 14 320 104 520 148 C 760 200 950 185 1140 220 C 1270 243 1370 233 1440 238 L 1440 300 Z"
          />
          <path
            className="city-hill-glow"
            d="M0 0 C 150 14 320 104 520 148 C 760 200 950 185 1140 220 C 1270 243 1370 233 1440 238"
            fill="none"
            stroke="url(#hill-rim-near)"
            strokeWidth="14"
          />
          <path
            d="M0 0 C 150 14 320 104 520 148 C 760 200 950 185 1140 220 C 1270 243 1370 233 1440 238"
            fill="none"
            stroke="url(#hill-rim-near)"
            strokeWidth="6"
          />
        </svg>
      </div>
      {/* L3 — living layer: stars, lights, haze, clouds, birds, plane. */}
      <canvas ref={canvasRef} className="city-living" />
      {/* L4 — film grain: tactile finish. */}
      <div className="city-grain" />
      {/* L5 — readability: navy wash + top/bottom bands + vignette. */}
      <div className="city-scrim" />
      <div className="city-vignette" />
      {/* L6 — the sun's BLOOM, above the scrims: without it the navy
          veil eats the glow and the red sun reads as pasted. A wide
          warm haze plus the visible dim disc, riding the photo's
          parallax so it stays glued to the horizon. */}
      <div ref={bloomRef} className="city-bloom">
        <div className="city-bloom-glow" />
        <div className="city-bloom-disc" />
      </div>
    </div>
  );
}
