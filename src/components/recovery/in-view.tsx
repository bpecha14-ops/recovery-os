"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting heavy below-the-fold sections until the visitor actually
 * approaches them. The chunk (via next/dynamic) only starts downloading
 * when the placeholder scrolls near the viewport, so the first paint of a
 * page stays light no matter how many sections live below.
 */
export function InView({
  minHeight,
  rootMargin = "700px",
  children,
}: {
  /** Placeholder height before the section loads — keeps scrollbar stable. */
  minHeight: number;
  rootMargin?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, rootMargin]);

  return (
    <div ref={ref} style={shown ? undefined : { minHeight }}>
      {shown ? children : null}
    </div>
  );
}
