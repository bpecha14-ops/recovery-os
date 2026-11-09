"use client";

// RecoveryOS — shared visual effects ("Golden Stream" design system).
// Physics-based motion DNA from Linear / Lusion, applied with restraint.

import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

/* ------------------------------------------------------------------ */
/* CountUp — money figures that count up when scrolled into view.     */
/* ------------------------------------------------------------------ */

interface CountUpProps {
  to: number;
  format?: (n: number) => string;
  duration?: number; // seconds
  delay?: number; // seconds
  className?: string;
}

const defaultFormat = (n: number) => Math.round(n).toLocaleString("en-US");

export function CountUp({
  to,
  format = defaultFormat,
  duration = 1.6,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState(() => format(0));
  const reduce = useReducedMotion();
  // Keep the latest formatter without re-triggering the raf cycle —
  // inline arrow props would otherwise reset the count on every render.
  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduce) {
      setDisplay(formatRef.current(to));
      return;
    }
    let raf = 0;
    let startTime: number | null = null;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const elapsed = Math.max(0, (t - startTime) / 1000 - delay);
      const p = Math.min(1, elapsed / duration);
      // easeOutExpo — dramatic arrival, gentle landing
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(formatRef.current(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration, delay, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* AnimatedMoney — a figure that springs to every new value.           */
/* For inputs/calculators where the number changes live.               */
/* ------------------------------------------------------------------ */

interface AnimatedMoneyProps {
  value: number;
  format: (n: number) => string;
  className?: string;
}

export function AnimatedMoney({ value, format, className }: AnimatedMoneyProps) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 130, damping: 22 });
  const text = useTransform(spring, (v) => format(Math.max(0, v)));

  useEffect(() => {
    spring.set(reduce ? value : value);
  }, [value, spring, reduce]);

  if (reduce) {
    return <span className={className}>{format(value)}</span>;
  }
  return <motion.span className={className}>{text}</motion.span>;
}

/* ------------------------------------------------------------------ */
/* Spotlight — mouse-following gold glow inside a card (Linear-style).*/
/* ------------------------------------------------------------------ */

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  style?: CSSProperties;
}

export function Spotlight({ children, className, as = "div", style }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [active, setActive] = useState(false);

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(251,191,36,0.10), transparent 65%)`,
        }}
      />
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — infinite ticker with edge fade, pauses on hover.         */
/* ------------------------------------------------------------------ */

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function Marquee({ items, className, itemClassName }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-paused marquee-mask overflow-hidden ${className ?? ""}`}>
      <div className="animate-marquee flex w-max items-center">
        {doubled.map((item, i) => (
          <div key={i} className={`flex shrink-0 items-center ${itemClassName ?? ""}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — spring-physics entrance, once per viewport pass.          */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={
        reduce
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 90, damping: 18, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* LiveClock — a ticking UTC clock. Honest life: the library never     */
/* sleeps, and neither does the clock.                                 */
/* ------------------------------------------------------------------ */

export function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [reduce]);

  const time = now.toLocaleTimeString("en-GB", {
    hour12: false,
    timeZone: "UTC",
  });

  return (
    <span className={`tabular ${className ?? ""}`}>
      {time}&nbsp;UTC
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Countdown — live HH:MM:SS ticking toward a deadline (ISO date).     */
/* Used on claim funds: deadlines are the heartbeat of this product.   */
/* ------------------------------------------------------------------ */

export function Countdown({
  to,
  className,
  compact = false,
}: {
  to: string; // ISO date (YYYY-MM-DD); deadline is end of day UTC
  className?: string;
  compact?: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [reduce]);

  const deadline = new Date(`${to}T23:59:59Z`).getTime();
  const diff = Math.max(0, deadline - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (x: number) => String(x).padStart(2, "0");

  if (compact) {
    return (
      <span className={`tabular ${className ?? ""}`}>
        {d}d {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    );
  }
  return (
    <span className={`tabular ${className ?? ""}`}>
      {d}d&nbsp;{pad(h)}h&nbsp;{pad(m)}m&nbsp;{pad(s)}s
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* TypeCycle — words that keep arriving: gold lists that never end.    */
/* ------------------------------------------------------------------ */

export function TypeCycle({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  if (reduce) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`inline-block align-baseline ${className ?? ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "0.9em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.9em", opacity: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* GoldenStream — canvas particle river behind the hero.               */
/* A diagonal stream of glowing gold particles with sine drift and     */
/* gentle mouse deflection. Pauses off-screen, honors reduced motion. */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  baseY: number;
  vx: number;
  size: number;
  hue: number;
  phase: number;
  amp: number;
  speed: number;
  alpha: number;
  streak: number;
}

export function GoldenStream({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];

    const spawn = (): Particle => {
      const depth = Math.random(); // 0 = far, 1 = near
      return {
        x: -40 - Math.random() * width * 0.6,
        baseY: 0,
        y: 0,
        vx: 0.55 + depth * 2.1 + Math.random() * 0.5,
        size: 0.7 + depth * 2.0,
        hue: 38 + Math.random() * 10, // 38–48: amber gold
        phase: Math.random() * Math.PI * 2,
        amp: 14 + Math.random() * 34,
        speed: 0.004 + Math.random() * 0.012,
        alpha: 0.25 + depth * 0.65,
        streak: Math.random() < 0.22 ? 12 + depth * 26 : 0,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 42 : width < 1100 ? 78 : 110;
      particles = Array.from({ length: count }, () => {
        const p = spawn();
        p.x = Math.random() * width * 1.1;
        p.baseY = Math.random() * height;
        p.y = p.baseY;
        return p;
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.x += p.vx;
        p.phase += p.speed;
        let y = p.baseY + Math.sin(p.phase) * p.amp;

        // gentle magnetic deflection around the cursor
        const dx = p.x - mouse.x;
        const dy = y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 22500) {
          const d = Math.sqrt(dist2) || 1;
          const push = ((150 - d) / 150) * 26;
          y += (dy / d) * push;
        }
        p.y = y;

        if (p.x > width + 60) {
          Object.assign(p, spawn());
          p.baseY = Math.random() * height;
        }

        // streak trail for a minority of particles
        if (p.streak > 0) {
          const grad = ctx.createLinearGradient(
            p.x - p.streak,
            y,
            p.x,
            y,
          );
          grad.addColorStop(0, "rgba(251,191,36,0)");
          grad.addColorStop(1, `hsla(${p.hue},92%,62%,${p.alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x - p.streak, y);
          ctx.lineTo(p.x, y);
          ctx.stroke();
        }

        ctx.fillStyle = `hsla(${p.hue},95%,${58 + p.size * 6}%,${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue},95%,60%,${p.alpha})`;
        ctx.shadowBlur = p.size * 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent?.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
        style={{
          background:
            "linear-gradient(100deg, transparent 12%, rgba(251,191,36,0.08) 38%, rgba(251,191,36,0.12) 52%, rgba(251,191,36,0.06) 68%, transparent 88%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
