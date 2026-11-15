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
  id,
  children,
}: {
  /** Placeholder height before the section loads — keeps scrollbar stable. */
  minHeight: number;
  rootMargin?: string;
  /** Anchor target while the real section is still loading (e.g. "scanner").
   *  Carried by the placeholder so #hash links and URL loads scroll
   *  correctly — then handed over to the real section once it mounts. */
  id?: string;
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
    <div
      ref={ref}
      // Before mount the placeholder IS the anchor target (so #hash links
      // work immediately); after mount the real section carries its own id.
      id={shown ? undefined : id}
      className={shown ? undefined : "scroll-mt-20"}
      style={shown ? undefined : { minHeight }}
    >
      {shown ? children : null}
    </div>
  );
}
