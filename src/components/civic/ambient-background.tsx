"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the living backdrop, v5.2 "Locked-Camera Night".
 *
 * A true deep-night Los Angeles (public/night-la-v2.jpg — the v1 frame
 * with its baked side bars cropped away) filling the WHOLE viewport,
 * and the camera is locked: no ken-burns, no scroll parallax — the
 * frame sits still like footage from a tripod-mounted cinema camera,
 * and everything INSIDE the frame moves.
 *
 * The living layer is anchored to the photograph instead of floating
 * over it:
 *
 *   canvas, only what a real night camera would record:
 *     – faint stars in the clean sky above the city glow
 *     – TRAFFIC: continuous head/tail-light streams flowing along
 *       three freeway curves placed where the photo's city band is
 *       (image-fraction geometry mapped through the exact CSS
 *       background cover transform, so the streaks sit ON the city)
 *     – airliners crossing the sky the way LAX approaches do: tiny,
 *       distant, a soft red beacon pulse and a double white strobe —
 *       no fuselage silhouette, no searchlight
 *
 * Removed in v5.2 after review: the flying "firefly" dots, the LAPD
 * helicopter searchlight, the satellite, the shooting star, the
 * aurora ribbons and the random skyline beacons — none of them read
 * as real over a real photograph.
 *
 * Performance contract (unchanged): one canvas, DPR ≤ 1.75, rAF capped
 * at ~40fps, paused when hidden, one static frame under reduced
 * motion; everything is transform/opacity or single-pass canvas draws
 * (zero per-frame gradient objects).
 */

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Car = { t: number; speed: number };
type River = {
  /** Control points as fractions of the PHOTOGRAPH, not the viewport. */
  fx0: number;
  fy0: number;
  fx1: number;
  fy1: number;
  fx2: number;
  fy2: number;
  /** Mapped viewport control points, recomputed on resize. */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  heads: Car[]; // moving right — headlights, warm white
  tails: Car[]; // moving left — taillights, red
  scale: number; // depth: nearer roads draw larger, flow faster
};
type Plane = { x: number; y: number; vx: number; phase: number; life: number; max: number };

/** The cropped photograph's pixel size — keeps the cover mapping exact. */
const IMG_W = 1621;
const IMG_H = 1080;

/** Freeway geometry, in photograph fractions. The city band of this
 *  frame runs from ~0.66 down; three roads at increasing depth. */
const ROADS: Array<Omit<River, "x0" | "y0" | "x1" | "y1" | "x2" | "y2" | "heads" | "tails">> = [
  { fx0: -0.03, fy0: 0.7, fx1: 0.5, fy1: 0.672, fx2: 1.03, fy2: 0.702, scale: 0.75 },
  { fx0: -0.03, fy0: 0.786, fx1: 0.45, fy1: 0.747, fx2: 1.03, fy2: 0.798, scale: 1.0 },
  { fx0: -0.03, fy0: 0.892, fx1: 0.52, fy1: 0.866, fx2: 1.03, fy2: 0.915, scale: 1.28 },
];

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
    let rivers: River[] = [];
    let planeA: Plane | null = null;
    let planeB: Plane | null = null;
    let nextA = 5;
    let nextB = 31;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    /** Photo fraction -> viewport pixel: the exact transform CSS
     *  background-size: cover + background-position: center 50%
     *  applies to the image, so canvas roads sit on the photo's city. */
    let cover = { s: 1, ox: 0, oy: 0 };
    const mapPoint = (fx: number, fy: number) => ({
      x: cover.ox + fx * IMG_W * cover.s,
      y: cover.oy + fy * IMG_H * cover.s,
    });

    const seed = () => {
      const small = w < 768;
      stars = Array.from({ length: small ? 14 : 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.3,
        r: rand(0.5, 1.5),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.4, 1.4),
      }));
      const laneCars = (scale: number, n: number): Car[] =>
        Array.from({ length: n }, () => ({
          t: Math.random(),
          speed: rand(0.8, 1.25) * (0.028 + 0.03 * scale),
        }));
      rivers = ROADS.map((road) => {
        const mapped = [mapPoint(road.fx0, road.fy0), mapPoint(road.fx1, road.fy1), mapPoint(road.fx2, road.fy2)];
        const n = small ? Math.round(10 * road.scale) : Math.round(15 * road.scale);
        return {
          ...road,
          x0: mapped[0].x,
          y0: mapped[0].y,
          x1: mapped[1].x,
          y1: mapped[1].y,
          x2: mapped[2].x,
          y2: mapped[2].y,
          heads: laneCars(road.scale, n),
          tails: laneCars(road.scale, n),
        };
      });
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
      // CSS anchor is center 100% (bottom): on wide screens cover
      // crops the SKY, never the city band the roads run through.
      const s = Math.max(w / IMG_W, h / IMG_H);
      cover = { s, ox: (w - IMG_W * s) / 2, oy: h - IMG_H * s };
      seed();
      if (reduced) draw(0);
    };

    const drawDot = (x: number, y: number, r: number, fill: string) => {
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    /* Quadratic bezier point, for the roads. */
    const qPoint = (r: River, t: number) => {
      const u = 1 - t;
      return {
        x: u * u * r.x0 + 2 * u * t * r.x1 + t * t * r.x2,
        y: u * u * r.y0 + 2 * u * t * r.y1 + t * t * r.y2,
      };
    };

    /* One traffic stream: dots flowing along a road curve. dir +1 =
     * headlights (warm, moving right, drawn slightly above the center
     * line), -1 = taillights (red, moving left, slightly below). */
    const drawStream = (r: River, cars: Car[], dir: 1 | -1) => {
      const dt = 1 / 40;
      const lane = dir * 3.2 * r.scale;
      const warm = dir === 1;
      for (const car of cars) {
        car.t += car.speed * dt * dir;
        if (car.t > 1) car.t -= 1;
        if (car.t < 0) car.t += 1;
        const p = qPoint(r, car.t);
        const p2 = qPoint(r, Math.min(1, car.t + 0.012));
        const dx = (p2.x - p.x) * dir;
        const dy = (p2.y - p.y) * dir;
        const len = Math.hypot(dx, dy) || 1;
        const x = p.x + (dy / len) * lane;
        const y = p.y + (-dx / len) * lane;
        const ux = dx / len;
        const uy = dy / len;
        const streak = (9 + car.speed * 230) * r.scale;
        ctx.lineWidth = 2.1 * r.scale;
        ctx.lineCap = "round";
        ctx.strokeStyle = warm ? "rgba(255, 236, 190, 0.28)" : "rgba(255, 116, 92, 0.28)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - ux * streak, y - uy * streak);
        ctx.stroke();
        ctx.strokeStyle = warm ? "rgba(255, 244, 214, 0.55)" : "rgba(255, 132, 108, 0.55)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - ux * streak * 0.45, y - uy * streak * 0.45);
        ctx.stroke();
        drawDot(x, y, 2.1 * r.scale, warm ? "rgba(255, 250, 236, 0.95)" : "rgba(255, 138, 116, 0.95)");
      }
    };

    /* An airliner, far away: a slow point of lights crossing the sky —
     * steady faint red beacon + double white strobe every ~1.4s. */
    const drawPlane = (p: Plane, t: number) => {
      const dt = 1 / 40;
      p.life += dt;
      p.x += p.vx * dt;
      // Red anti-collision beacon: soft 1Hz pulse.
      const beat = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI + p.phase);
      drawDot(p.x, p.y, 1.0, `rgba(255, 76, 56, ${(0.35 + 0.45 * beat).toFixed(3)})`);
      // White strobe: double flash once per 1.4s.
      const cyc = (t / 1.4 + p.phase) % 1;
      if (cyc < 0.035 || (cyc > 0.085 && cyc < 0.12)) {
        drawDot(p.x, p.y, 2.0, "rgba(244, 250, 255, 0.95)");
        drawDot(p.x, p.y, 4.5, "rgba(220, 236, 255, 0.28)");
      } else {
        drawDot(p.x, p.y, 0.8, "rgba(228, 238, 250, 0.30)");
      }
    };

    const spawnPlane = (t: number): Plane => {
      const fromLeft = Math.random() < 0.5;
      const vx = (fromLeft ? 1 : -1) * rand(26, 48);
      return {
        x: fromLeft ? -14 : w + 14,
        y: h * rand(0.06, 0.36),
        vx,
        phase: Math.random() * 7,
        life: 0,
        max: (w + 40) / Math.abs(vx),
      };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Stars — faint twinkle in the dark sky above the glow.
      for (const s of stars) {
        const a = 0.18 + 0.4 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        drawDot(s.x, s.y, s.r, `rgba(226, 232, 240, ${a.toFixed(3)})`);
      }

      // Traffic — the freeways breathe with real flow.
      for (const r of rivers) {
        drawStream(r, r.heads, 1);
        drawStream(r, r.tails, -1);
      }

      // Airliners — up to two in the stack at a time.
      if (!planeA && t > nextA) planeA = spawnPlane(t);
      if (planeA) {
        drawPlane(planeA, t);
        if (planeA.life >= planeA.max || planeA.x < -30 || planeA.x > w + 30) {
          planeA = null;
          nextA = t + rand(14, 30);
        }
      }
      if (!planeB && t > nextB) planeB = spawnPlane(t);
      if (planeB) {
        drawPlane(planeB, t);
        if (planeB.life >= planeB.max || planeB.x < -30 || planeB.x > w + 30) {
          planeB = null;
          nextB = t + rand(22, 48);
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
      {/* L1 — the night panorama, edge to edge, camera locked. */}
      <div className="city-photo" />
      {/* L2 — the navy readability veil: dims the photo for text while
          the living layer above stays bright, like lights through haze. */}
      <div className="city-scrim" />
      <div className="city-vignette" />
      {/* L3 — living layer ABOVE the veil: stars, traffic, airliners. */}
      <canvas ref={canvasRef} className="city-living" />
      {/* L4 — film grain: tactile finish. */}
      <div className="city-grain" />
    </div>
  );
}
