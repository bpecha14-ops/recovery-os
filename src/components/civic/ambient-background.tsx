"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground — the Civic Futurism living backdrop.
 *
 * Five full-bleed slides mounted in the ROOT LAYOUT so every page shares
 * the same atmosphere. Crossfade (10s per slide, 1.5s overlap) and the
 * Ken Burns drift run as pure CSS animations — no rAF loops, no video.
 *
 * Performance contract:
 * - slide 1 is preloaded (link below); slides 2–5 get their image only
 *   after first paint via [data-loaded], so the first view downloads one
 *   file;
 * - rotation pauses when the tab is hidden (Page Visibility API);
 * - prefers-reduced-motion renders slide 1 static (handled in CSS);
 * - nothing essential is ever rendered inside this layer (aria-hidden).
 */

const SLIDES = ["s1", "s2", "s3", "s4", "s5"] as const;

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const slides = Array.from(
      root.querySelectorAll<HTMLElement>(".ambient-slide"),
    );

    // First paint shows slide 1 only; the rest attach right after so the
    // rotation can begin without delaying LCP.
    const raf = requestAnimationFrame(() => {
      slides[0]?.setAttribute("data-loaded", "");
      const idle = (window as unknown as {
        requestIdleCallback?: (cb: () => void) => number;
      }).requestIdleCallback;
      const attachRest = () =>
        slides.forEach((s) => s.setAttribute("data-loaded", ""));
      if (typeof idle === "function") idle(attachRest);
      else window.setTimeout(attachRest, 1200);
    });

    // Page Visibility — freeze the cycle while the tab is hidden.
    const onVisibility = () =>
      root.setAttribute("data-paused", String(document.hidden));
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="ambient-root" aria-hidden="true">
      {/* Preload slide 1 only — desktop and mobile variants. */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/backgrounds/s1-ledger-m.webp 960w, /backgrounds/s1-ledger.webp 1344w"
        imageSizes="100vw"
      />
      {SLIDES.map((s, i) => (
        <div
          key={s}
          className={`ambient-slide ambient-${s}`}
          style={{ "--slide-i": i } as React.CSSProperties}
        />
      ))}
      <div className="ambient-vignette" />
      <div className="ambient-scrim" />
    </div>
  );
}
