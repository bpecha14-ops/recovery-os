"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the living backdrop, v5 "Night Metropolis".
 *
 * A vast night Los Angeles (public/city-sunset-v2.jpg) filling the WHOLE
 * page — nothing is drawn on top of the photo; the horizon glow is the
 * photo's own. Kept alive around it:
 *
 *   photo (slow ken-burns) inside a scroll-parallax wrap
 *   canvas, the night itself:
 *     – stars and a faint teal-violet aurora ribbon high in the sky
 *     – a satellite crawling in orbit, an occasional shooting star
 *     – an airliner with blinking strobes (the LAX approach stack)
 *     – a denser, city-wide twinkle with cyan/violet neon sparks
 *     – LIGHT RIVERS: continuous head/tail-light streams flowing along
 *       curved freeways — the signature of LA at night
 *   film grain + a LIGHT navy readability veil (the city stays visible
 *     edge to edge; the old near-black bottom band is gone)
 *
 * The drawn sun / red horizon strip / foreground hills of v4 were
 * removed: they read as pasted-on. What remains is photographic.
 *
 * Performance contract (unchanged): one canvas, DPR ≤ 1.75, rAF capped
 * at ~40fps, paused when hidden, one static frame under reduced
 * motion; everything is transform/opacity or single-pass canvas draws.
 */

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Light = { x: number; y: number; r: number; phase: number; speed: number; hue: number };
type Ribbon = { x: number; y: number; rx: number; ry: number; vx: number; hue: string; a: number; phase: number };
type Car = { t: number; speed: number; lane: number };
type River = {
  x0: number;
  y0: number;
  x1: number;
  y1: number; // control point
  x2: number;
  y2: number;
  cars: Car[];
  dir: 1 | -1; // 1 = head lights (warm), -1 = tail lights (red)
};
type Sat = { x: number; y: number; vx: number; life: number; max: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };
type Plane = { x: number; y: number; vx: number; life: number; max: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  /* Scroll parallax — the night recedes gently as you scroll. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    let pending = false;
    const apply = () => {
      pending = false;
      const y = Math.min(window.scrollY, 2600); // saturate after ~14 screens
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${(-Math.min(y * 0.08, 110)).toFixed(1)}px, 0)`;
      }
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
    let stars: Star[] = [];
    let lights: Light[] = [];
    let ribbons: Ribbon[] = [];
    let rivers: River[] = [];
    let sat: Sat | null = null;
    let meteor: Meteor | null = null;
    let plane: Plane | null = null;
    let nextSatAt = 6;
    let nextMeteorAt = 12;
    let nextPlaneAt = 9;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = () => {
      const small = w < 768;
      stars = Array.from({ length: small ? 18 : 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.3,
        r: rand(0.4, 1.2),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.4, 1.4),
      }));
      // City lights across the whole lower cityscape with a few neon
      // cyan/violet sparks — the futuristic read.
      lights = Array.from({ length: small ? 46 : 104 }, () => {
        const neon = Math.random() < 0.14;
        return {
          x: Math.random() * w,
          y: h * rand(0.44, 0.98),
          r: rand(0.5, neon ? 2.1 : 1.7),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.5, neon ? 2.4 : 1.7),
          hue: neon ? (Math.random() < 0.5 ? 0 : 1) : 2,
        };
      });
      // Aurora ribbon — two soft teal/violet bands waving high up.
      ribbons = [
        { x: w * 0.3, y: h * 0.1, rx: w * 0.36, ry: h * 0.06, vx: rand(3, 7), hue: "45, 212, 191", a: 0.075, phase: rand(0, 6) },
        { x: w * 0.75, y: h * 0.16, rx: w * 0.3, ry: h * 0.05, vx: rand(-6, -3), hue: "139, 92, 246", a: 0.06, phase: rand(0, 6) },
      ];
      // Light rivers — flowing freeway streams across the basin.
      const riverCount = small ? 2 : 3;
      rivers = Array.from({ length: riverCount }, (_, i) => {
        const y = h * (0.6 + i * 0.13);
        const bend = rand(-1, 1) * w * 0.18;
        const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
        const n = small ? 9 : 16;
        return {
          x0: -40,
          y0: y + rand(-14, 14),
          x1: w * 0.5,
          y1: y + bend,
          x2: w + 40,
          y2: y + rand(-14, 14),
          dir,
          cars: Array.from({ length: n }, () => ({
            t: Math.random(),
            speed: rand(0.07, 0.13),
            lane: rand(-3.5, 3.5),
          })),
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
      seed();
      if (reduced) draw(0);
    };

    const drawDot = (x: number, y: number, r: number, fill: string) => {
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    /* Quadratic bezier point, for the rivers. */
    const qPoint = (r: River, t: number) => {
      const u = 1 - t;
      return {
        x: u * u * r.x0 + 2 * u * t * r.x1 + t * t * r.x2,
        y: u * u * r.y0 + 2 * u * t * r.y1 + t * t * r.y2,
      };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const dt = 1 / 40;

      // Aurora ribbons — slow, faint, breathing.
      for (const rb of ribbons) {
        rb.x += rb.vx * dt;
        if (rb.x - rb.rx > w) rb.x = -rb.rx;
        if (rb.x + rb.rx < 0) rb.x = w + rb.rx;
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.22 + rb.phase);
        const g = ctx.createRadialGradient(rb.x, rb.y, 0, rb.x, rb.y, rb.rx);
        g.addColorStop(0, `rgba(${rb.hue}, ${(rb.a * pulse).toFixed(3)})`);
        g.addColorStop(1, `rgba(${rb.hue}, 0)`);
        ctx.save();
        ctx.translate(rb.x, rb.y);
        ctx.scale(1, rb.ry / rb.rx);
        ctx.translate(-rb.x, -rb.y);
        ctx.fillStyle = g;
        ctx.fillRect(rb.x - rb.rx, rb.y - rb.rx, rb.rx * 2, rb.rx * 2);
        ctx.restore();
      }

      // Stars — faint twinkle under the aurora.
      for (const s of stars) {
        const a = 0.1 + 0.34 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        drawDot(s.x, s.y, s.r, `rgba(226, 232, 240, ${a.toFixed(3)})`);
      }

      // City lights — amber sea with cyan/violet neon sparks.
      for (const l of lights) {
        const a = 0.16 + 0.42 * (0.5 + 0.5 * Math.sin(t * l.speed + l.phase));
        const fill =
          l.hue === 0
            ? `rgba(103, 232, 249, ${a.toFixed(3)})` // cyan spark
            : l.hue === 1
              ? `rgba(167, 139, 250, ${a.toFixed(3)})` // violet spark
              : `rgba(255, 196, 110, ${a.toFixed(3)})`; // warm window
        drawDot(l.x, l.y, l.r, fill);
      }

      // Light rivers — continuous head/tail-light streams. Each car is
      // a bright dot with a soft halo, drawn along its freeway curve.
      for (const r of rivers) {
        for (const car of r.cars) {
          car.t += car.speed * dt;
          if (car.t > 1) car.t -= 1;
          const p = qPoint(r, car.t);
          const p2 = qPoint(r, Math.min(1, car.t + 0.012));
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const x = p.x + (dy / len) * car.lane;
          const y = p.y + (-dx / len) * car.lane;
          // Halo pass then core — cheap glow, no shadowBlur.
          drawDot(x, y, 3.2, r.dir === 1 ? "rgba(255, 214, 130, 0.10)" : "rgba(255, 90, 70, 0.10)");
          drawDot(x, y, 1.3, r.dir === 1 ? "rgba(255, 236, 180, 0.55)" : "rgba(255, 108, 86, 0.55)");
        }
      }

      // A satellite — a slow steady star crawling in orbit, blinking
      // every couple of seconds as its panels catch the sun.
      if (!sat && t > nextSatAt) {
        const fromLeft = Math.random() < 0.5;
        const vx = (fromLeft ? 1 : -1) * rand(24, 40);
        sat = {
          x: fromLeft ? -10 : w + 10,
          y: h * rand(0.05, 0.24),
          vx,
          life: 0,
          max: (w + 20) / Math.abs(vx),
        };
      }
      if (sat) {
        sat.life += dt;
        sat.x += sat.vx * dt;
        const blink = (t * 0.5) % 1 < 0.08 ? 1 : 0;
        drawDot(sat.x, sat.y, blink ? 1.6 : 0.9, `rgba(220, 240, 255, ${blink ? 0.9 : 0.35})`);
        if (sat.life >= sat.max || sat.x < -20 || sat.x > w + 20) {
          sat = null;
          nextSatAt = t + rand(28, 45);
        }
      }

      // A shooting star — a fast streak high in the sky.
      if (!meteor && t > nextMeteorAt) {
        const ang = rand(0.45, 0.75);
        const dirRight = Math.random() < 0.5 ? 1 : -1;
        const speed = rand(620, 900);
        meteor = {
          x: rand(0.15, 0.85) * w,
          y: rand(0.04, 0.22) * h,
          vx: dirRight * Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          life: 0,
          max: rand(0.55, 0.85),
        };
      }
      if (meteor) {
        meteor.life += dt;
        meteor.x += meteor.vx * dt;
        meteor.y += meteor.vy * dt;
        const fade = Math.max(0, 1 - meteor.life / meteor.max);
        const tailX = meteor.x - meteor.vx * 0.1;
        const tailY = meteor.y - meteor.vy * 0.1;
        const g = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        g.addColorStop(0, `rgba(235, 248, 255, ${(0.85 * fade).toFixed(3)})`);
        g.addColorStop(1, "rgba(235, 248, 255, 0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (meteor.life >= meteor.max) {
          meteor = null;
          nextMeteorAt = t + rand(18, 34);
        }
      }

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
        const fus = 5.5;
        const dir = Math.sign(plane.vx);
        ctx.strokeStyle = "rgba(16, 12, 10, 0.55)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(plane.x - fus * dir, plane.y);
        ctx.lineTo(plane.x + fus * dir, plane.y);
        ctx.stroke();
        const blink = (t * 1.1) % 1;
        if (blink < 0.12) drawDot(plane.x - fus * dir, plane.y, 1.6, "rgba(255, 64, 44, 0.95)");
        if (blink > 0.5 && blink < 0.56) drawDot(plane.x + fus * dir, plane.y, 2.1, "rgba(255, 255, 255, 0.95)");
        drawDot(plane.x - fus * dir, plane.y, 0.8, "rgba(255, 64, 44, 0.35)");
        drawDot(plane.x + fus * dir, plane.y, 0.9, "rgba(255, 255, 255, 0.3)");
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
      {/* L1 — the night panorama: ken-burns photo inside a scroll
          parallax wrap. Nothing is drawn on top of the photo. */}
      <div ref={parallaxRef} className="city-parallax">
        <div className="city-photo" />
      </div>
      {/* L2 — living layer: aurora, stars, light rivers, satellite,
          shooting star, the airliner. */}
      <canvas ref={canvasRef} className="city-living" />
      {/* L3 — film grain: tactile finish. */}
      <div className="city-grain" />
      {/* L4 — a LIGHT navy readability veil: the city stays visible edge
          to edge — no near-black band at the bottom. */}
      <div className="city-scrim" />
      <div className="city-vignette" />
    </div>
  );
}
