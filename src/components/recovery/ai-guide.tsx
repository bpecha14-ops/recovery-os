"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, VolumeX, MessageCircle, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Goldie — the live AI: a golden coin that roams the page. Goldie watches
 * which section the visitor is in, walks along the bottom edge, and drops
 * contextual tips. The avatar mirrors the AI chat button one-to-one (round
 * golden ring, coin face, glow, hover scale). Clicking Goldie opens the
 * chat (via a custom event) with the section context.
 */

interface SectionSpot {
  id: string;
  /** Horizontal resting spot, in vw, when this section is active. */
  leftVw: number;
}

const SECTION_SPOTS: SectionSpot[] = [
  { id: "how", leftVw: 5 },
  { id: "library", leftVw: 14 },
  { id: "channels", leftVw: 24 },
  { id: "scanner", leftVw: 34 },
  { id: "settlements", leftVw: 44 },
  { id: "ieepa", leftVw: 54 },
  { id: "pricing", leftVw: 64 },
  { id: "faq", leftVw: 74 },
  { id: "waitlist", leftVw: 82 },
];

const SECTION_IDS = SECTION_SPOTS.map((s) => s.id);

export function AiGuide() {
  const reduceMotion = useReducedMotionSafe();
  const { t, tArr } = useI18n();
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

  const section = useMemo(
    () => SECTION_SPOTS.find((s) => s.id === activeId) ?? null,
    [activeId]
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

    const nodes = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

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
      const hide = setTimeout(() => setTip(null), 14000);
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

  const left = section
    ? `clamp(1rem, ${section.leftVw}vw, calc(100vw - 5.5rem))`
    : "1rem";
  const alignRight = (section?.leftVw ?? 0) > 55;

  return (
    <div
      className="pointer-events-none fixed bottom-4 z-50"
      style={{ left }}
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
              className={`absolute bottom-[calc(100%+0.6rem)] w-[min(280px,calc(100vw-5rem))] rounded-2xl border border-amber-400/25 bg-zinc-950/97 p-3.5 pr-8 shadow-[0_16px_44px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl ${
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
                className={`absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r border-amber-400/25 bg-zinc-950 ${
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
            className="absolute bottom-[calc(100%+0.6rem)] left-0 flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-zinc-950/95 px-3 py-1.5 text-[10px] font-medium text-amber-200/90 shadow-lg backdrop-blur transition-colors hover:border-amber-400/50"
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
          <span
            aria-hidden="true"
            className={`absolute -inset-1.5 rounded-full bg-amber-400/25 blur-md transition-opacity duration-300 ${
              tip ? "opacity-100 animate-glow" : "opacity-60 group-hover:opacity-100"
            }`}
          />
          {/* The coin — same build as the corner AI button: round golden
              ring, coin face, glow, hover scale. */}
          <span
            className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 bg-zinc-950 shadow-[0_0_28px_-6px_rgba(251,191,36,0.55)] transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16 ${
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
        </motion.button>
      </div>
    </div>
  );
}
