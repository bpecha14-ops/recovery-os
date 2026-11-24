"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, VolumeX, MessageCircle, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Goldie — the live AI: a golden coin that roams the page. Goldie wanders
 * to random waypoints across the viewport, leans toward the cursor out of
 * curiosity and springs away when a hand comes too close; he watches which
 * section the visitor is in and drops contextual tips wherever he is. The
 * avatar mirrors the AI chat button one-to-one (round golden ring, coin
 * face, glow, hover scale). Clicking Goldie opens the chat (via a custom
 * event) with the section context.
 */

interface SectionSpot {
  id: string;
  /** Horizontal resting spot, in vw, when this section is active. */
  leftVw: number;
}

/** Main page — overview sections (business narrative lives on /business). */
const HOME_SECTION_SPOTS: SectionSpot[] = [
  { id: "how", leftVw: 4 },
  { id: "coverage", leftVw: 16 },
  { id: "data", leftVw: 30 },
  { id: "faq", leftVw: 48 },
  { id: "matrix", leftVw: 62 },
  { id: "programs", leftVw: 80 },
];

/** Toolkit page — every form lives here. */
const TOOLS_SECTION_SPOTS: SectionSpot[] = [
  { id: "search", leftVw: 5 },
  { id: "eligibility", leftVw: 18 },
  { id: "claim", leftVw: 30 },
  { id: "scanner", leftVw: 43 },
  { id: "settlements", leftVw: 56 },
  { id: "ieepa", leftVw: 69 },
  { id: "waitlist", leftVw: 82 },
];

/** Business & partners page — channels + sponsorship. */
const BUSINESS_SECTION_SPOTS: SectionSpot[] = [
  { id: "channels", leftVw: 28 },
  { id: "sponsor", leftVw: 66 },
];

export function AiGuide() {
  const reduceMotion = useReducedMotionSafe();
  const { t, tArr } = useI18n();
  const pathname = usePathname();
  // Goldie walks a different set of sections on each page.
  const sectionSpots = pathname.startsWith("/tools")
    ? TOOLS_SECTION_SPOTS
    : pathname.startsWith("/business")
      ? BUSINESS_SECTION_SPOTS
      : HOME_SECTION_SPOTS;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const dismissedRef = useRef<Set<string>>(new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tipCountRef = useRef<Record<string, number>>({});
  const firstRunRef = useRef(true);
  const activeIdRef = useRef<string | null>(null);

  // Latest-ref pattern: the welcome timer is scheduled once at mount, but the
  // locale settles right after mount (localStorage / browser language), so it
  // must read the CURRENT translations — not the first (English) render's.
  const tRef = useRef(t);
  const tArrRef = useRef(tArr);
  useEffect(() => {
    tRef.current = t;
    tArrRef.current = tArr;
  });

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  /* ---------------------------------------------------------------- */
  /* Roaming — Goldie is a free agent. He drifts to random waypoints  */
  /* across the viewport (never fully random: at least 22vw hops,    */
  /* margins respected), leans toward the cursor out of curiosity,    */
  /* and playfully springs away when a hand comes too close. Tips     */
  /* still fire per section; he just talks wherever he happens to be. */
  /* ---------------------------------------------------------------- */
  const [roam, setRoam] = useState({
    x: 16,
    y: 0,
    flee: false,
    dur: 0,
    right: false,
  });
  const roamRef = useRef(roam);
  const tipActiveRef = useRef(false);
  const leanRef = useRef<HTMLSpanElement>(null);
  const lastDodgeRef = useRef(0);
  const lastPtrRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    roamRef.current = roam;
  }, [roam]);
  useEffect(() => {
    tipActiveRef.current = !!tip;
  }, [tip]);

  const pickWaypoint = (
    fromX: number,
    fromY: number,
    awayFrom?: { x: number; y: number },
  ) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const small = vw < 768;
    const minX = small ? 4 : 16;
    const maxX = Math.max(minX, vw - (small ? 68 : 96));
    const maxY = Math.max(40, vh * (small ? 0.5 : 0.72));
    let x = 0;
    let y = 0;
    if (awayFrom) {
      // Flee: keep moving away from the cursor, with a little jitter.
      const dx = fromX - awayFrom.x;
      const dy = fromY - awayFrom.y;
      const len = Math.hypot(dx, dy) || 1;
      const run = 220 + Math.random() * 160;
      x = fromX + (dx / len) * run + (Math.random() - 0.5) * 120;
      y = fromY + (dy / len) * run * 0.6 + (Math.random() - 0.5) * 80;
    } else {
      // Wander: somewhere at least 22vw away from the current spot.
      for (let i = 0; i < 8; i++) {
        x = minX + Math.random() * (maxX - minX);
        y = 24 + Math.random() * maxY;
        if (Math.hypot(x - fromX, y - fromY) > vw * 0.22) break;
      }
    }
    x = Math.min(Math.max(x, minX), maxX);
    y = Math.min(Math.max(y, 0), maxY);
    return {
      x,
      y,
      flee: !!awayFrom,
      dur: 3.5 + Math.random() * 2.5,
      right: x > vw * 0.55,
    };
  };

  // Random drift — paused while a tip is showing (he dwells to talk)
  // and while the tab is hidden.
  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!document.hidden && !tipActiveRef.current) {
          setRoam(pickWaypoint(roamRef.current.x, roamRef.current.y));
        }
        schedule();
      }, 8000 + Math.random() * 6000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  // Cursor reaction: lean toward the pointer; dodge when it's too close.
  useEffect(() => {
    if (reduceMotion) return;
    const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (!hoverFine && touch) return;
    let raf = 0;
    let queued = false;
    const apply = () => {
      queued = false;
      const coin = leanRef.current;
      if (!coin) return;
      const rect = coin.getBoundingClientRect();
      const ccx = rect.left + rect.width / 2;
      const ccy = rect.top + rect.height / 2;
      const dx = lastPtrRef.current.x - ccx;
      const dy = lastPtrRef.current.y - ccy;
      const dist = Math.hypot(dx, dy) || 1;
      // Curiosity: he tips toward the cursor, more the closer it is.
      const near = Math.min(1, 110 / dist);
      const leanX = (dx / dist) * 7 * near;
      const leanY = (dy / dist) * 5 * near;
      const leanR = (dx / dist) * 5 * near;
      coin.style.transform = `translate(${leanX.toFixed(1)}px, ${leanY.toFixed(1)}px) rotate(${leanR.toFixed(1)}deg)`;
      // Playful dodge: spring to a waypoint away from the hand.
      const now = performance.now();
      if (dist < 120 && now - lastDodgeRef.current > 2800) {
        lastDodgeRef.current = now;
        setRoam((cur) =>
          pickWaypoint(cur.x, cur.y, {
            x: lastPtrRef.current.x,
            y: lastPtrRef.current.y,
          }),
        );
      }
    };
    const onMove = (e: PointerEvent) => {
      lastPtrRef.current = { x: e.clientX, y: e.clientY };
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(apply);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const section = useMemo(
    () => sectionSpots.find((s) => s.id === activeId) ?? null,
    [activeId, sectionSpots]
  );

  // Scroll-spy: which section occupies the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((prev) =>
              prev === entry.target.id ? prev : entry.target.id
            );
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    const nodes = sectionSpots
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sectionSpots]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Show a welcome tip shortly after load — only if the visitor is still
  // at the top (no section tip has taken over).
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        !muted &&
        dismissedRef.current.size === 0 &&
        activeIdRef.current === null
      ) {
        setTip(tRef.current("guide.welcome"));
        // The welcome tip must auto-hide — otherwise Goldie "dwells to
        // talk" forever and never starts roaming the page.
        const hide = setTimeout(() => setTip(null), 11000);
        timersRef.current.push(hide);
      }
    }, 4500);
    timersRef.current.push(timer);
    return clearTimers;
  }, []);

  // When the active section changes: show its tip (unless muted/dismissed).
  useEffect(() => {
    // Skip the mount run so the welcome tip timer survives.
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    clearTimers();
    if (!section) return;
    const show = setTimeout(() => {
      if (muted || dismissedRef.current.has(section.id)) {
        setTip(null);
        return;
      }
      const tips = tArrRef.current<string>(`guide.tips.${section.id}`);
      if (tips.length === 0) {
        setTip(null);
        return;
      }
      const count = tipCountRef.current[section.id] ?? 0;
      tipCountRef.current[section.id] = count + 1;
      setTip(tips[count % tips.length]);
      const hide = setTimeout(() => setTip(null), 7000);
      timersRef.current.push(hide);
    }, 700);
    timersRef.current.push(show);
    return clearTimers;
  }, [activeId, muted]);

  useEffect(() => clearTimers, []);

  function dismissTip() {
    if (section) dismissedRef.current.add(section.id);
    else dismissedRef.current.add("welcome");
    setTip(null);
  }

  function openChat() {
    setTip(null);
    window.dispatchEvent(
      new CustomEvent("recoveryos:open-chat", {
        detail: {
          section: activeId ?? undefined,
          question: section ? t(`guide.ask.${section.id}`) : undefined,
        },
      })
    );
  }

  const alignRight = roam.right;

  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 left-4 z-50"
      initial={false}
      animate={{ x: roam.x, y: -roam.y }}
      transition={
        roam.flee
          ? { type: "spring", stiffness: 210, damping: 20 }
          : { duration: roam.dur, ease: "easeInOut" }
      }
      style={{ willChange: "transform" }}
      aria-live="polite"
    >
      <div className="pointer-events-auto relative flex flex-col items-center">
        {/* Speech bubble */}
        <AnimatePresence>
          {tip && (
            <motion.div
              key={tip}
              role="status"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.94 }
              }
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className={`absolute bottom-[calc(100%+0.6rem)] w-[min(280px,calc(100vw-5rem))] rounded-2xl border border-amber-400/25 bg-cf-deep/97 p-3.5 pr-8 shadow-[0_16px_44px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl ${
                alignRight ? "right-0" : "left-0"
              }`}
            >
              <p className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300">
                <Sparkles
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </p>
              <button
                type="button"
                onClick={dismissTip}
                aria-label={t("guide.dismiss")}
                className="absolute right-1.5 top-1.5 rounded-md p-1 text-zinc-500 transition-colors hover:bg-amber-400/10 hover:text-amber-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMuted(true)}
                className="mt-2 flex items-center gap-1 text-[10px] font-medium text-zinc-500 transition-colors hover:text-amber-200"
              >
                <VolumeX className="h-3 w-3" aria-hidden="true" />
                {t("guide.mute")}
              </button>
              {/* tail */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r border-amber-400/25 bg-cf-deep/70 ${
                  alignRight ? "right-4" : "left-4"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Muted → small unmuter pill */}
        {muted && !tip && (
          <button
            type="button"
            onClick={() => setMuted(false)}
            className="absolute bottom-[calc(100%+0.6rem)] left-0 flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-cf-deep/95 px-3 py-1.5 text-[10px] font-medium text-amber-200/90 shadow-lg backdrop-blur transition-colors hover:border-amber-400/50"
          >
            <VolumeX className="h-3 w-3" aria-hidden="true" />
            {t("guide.unmute")}
          </button>
        )}

        {/* Scout himself */}
        <motion.button
          type="button"
          onClick={openChat}
          aria-label={t("guide.avatarLabel")}
          title={t("guide.askGoldie")}
          animate={
            reduceMotion
              ? { left: 0 }
              : {
                  left: 0,
                  y: [0, -7, 0],
                  rotate: tip ? [0, -4, 4, 0] : 0,
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 0.5 },
                }
          }
          className="group relative block"
        >
          {/* Lean layer — the JS cursor engine writes its transform here;
              its own transition smooths the trail. Inner spans keep their
              hover-scale CSS untouched (no transform conflicts). */}
          <span
            ref={leanRef}
            className="relative block"
            style={{
              transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              aria-hidden="true"
              className={`absolute -inset-1.5 rounded-full bg-amber-400/25 blur-md transition-opacity duration-300 ${
                tip ? "opacity-100 animate-glow" : "opacity-60 group-hover:opacity-100"
              }`}
            />
            {/* The coin — same build as the corner AI button: round golden
                ring, coin face, glow, hover scale. */}
            <span
              className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 bg-cf-deep/70 shadow-[0_0_28px_-6px_rgba(251,191,36,0.55)] transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16 ${
                tip ? "border-amber-300" : "border-amber-300/70"
              }`}
            >
              <img
                src="/ai-goldie.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </span>
            <span className="pointer-events-none absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-950 bg-amber-400 text-zinc-950">
              <MessageCircle className="h-3 w-3" aria-hidden="true" />
            </span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
