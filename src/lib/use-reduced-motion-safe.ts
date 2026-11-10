"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe prefers-reduced-motion.
 *
 * framer-motion's `useReducedMotion()` initialises its state by reading
 * `window.matchMedia("(prefers-reduced-motion: reduce)")` synchronously
 * during the hydration render. With "reduce" enabled on the visitor's
 * device the client tree is then structurally different from the SSR HTML
 * (canvas vs. gradient div in GoldenStream, extra AnimatePresence fibers
 * in TypeCycle, span vs. motion.span in AnimatedMoney). That shifts every
 * React `useId` tree hash, and hydration fails with a wall of Radix
 * id/aria-controls mismatches.
 *
 * `useSyncExternalStore` is the correct primitive here: during hydration
 * React renders with `getServerSnapshot` (false — exactly what the server
 * rendered) and only then switches to the live client value, re-rendering
 * if the OS really asks for reduced motion. It also follows live changes
 * of the setting, which framer-motion's hook does not.
 */

const QUERY = "(prefers-reduced-motion: reduce)";
let cachedMql: MediaQueryList | null = null;

function getMql(): MediaQueryList {
  if (!cachedMql) cachedMql = window.matchMedia(QUERY);
  return cachedMql;
}

function subscribe(onChange: () => void): () => void {
  const mq = getMql();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return getMql().matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
