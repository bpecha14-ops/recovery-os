"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { InView } from "./in-view";

/**
 * Heavy widgets that must NOT be part of the initial page chunk:
 *
 * - LazyLibrary      — 700+ lines of browsing UI + market data; loads when
 *                      the visitor scrolls near it.
 * - LazyAiAssistant  — the corner chat (react-markdown et al.); mounts a
 *                      beat after load so it never competes with first paint.
 *
 * Both stay fully functional — they are simply code-split and deferred.
 */

function ChunkPlaceholder({ minHeight }: { minHeight: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-zinc-950"
      style={{ minHeight }}
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-amber-400/[0.03] to-transparent" />
    </div>
  );
}

const Library = dynamic(() => import("./library").then((m) => ({ default: m.Library })), {
  ssr: false,
  loading: () => <ChunkPlaceholder minHeight={720} />,
});

const AiAssistant = dynamic(
  () => import("./ai-assistant").then((m) => ({ default: m.AiAssistant })),
  { ssr: false },
);

export function LazyLibrary() {
  return (
    <InView minHeight={720}>
      <Library />
    </InView>
  );
}

export function LazyAiAssistant({ delay = 1600 }: { delay?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);
  if (!ready) return null;
  return <AiAssistant />;
}
