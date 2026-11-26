"use client";

/**
 * HoloOrb — ARIA, the live AI guide's body (v3 concept: the atom core).
 *
 * The v2 gyroscope read slightly as a cartoon "eye" — v3 is a proper
 * ATOM: a dense glowing core with three orbital rings crossing it on
 * different axes, and bright electrons (traveling sparks) riding two
 * of the rings. The sparks are children of the ring elements, so the
 * rings' own 3D rotation carries them around the orbit — free motion.
 * Ripples pulse outward while she speaks:
 *
 *   idle    rings rotate in counter-locked orbits, core breathes
 *   curious electrons speed up, core glows a touch harder
 *   talk    ripple rings pulse outward (she is speaking)
 *   drag    rings tilt wide and spin fast — visibly "carried"
 *   flee    everything snaps into a fast tight spin
 *
 * Pure CSS transforms driven by the mood class; the interaction
 * machinery (roam, drag engine, tips, chat) lives in ai-guide.tsx.
 */

export type OrbMood = "idle" | "curious" | "talk" | "drag" | "flee";

export function HoloOrb({ mood }: { mood: OrbMood }) {
  return (
    <div className={`halo halo--${mood}`} aria-hidden="true">
      {/* ambient bloom behind everything */}
      <div className="halo-haze" />
      {/* ring A — near-horizontal wide orbit, carrying a warm electron */}
      <div className="halo-ring halo-ring--a">
        <span className="halo-dot halo-dot--a" />
      </div>
      {/* ring B — steep crossing orbit (a pierce, not concentric), with a
          violet electron riding it */}
      <div className="halo-ring halo-ring--b">
        <span className="halo-dot halo-dot--b" />
      </div>
      {/* ring C — fast flat orbit just outside the core */}
      <div className="halo-ring halo-ring--c" />
      {/* the dense glowing core */}
      <div className="halo-core">
        <div className="halo-spark" />
      </div>
      {/* speaking ripples */}
      {mood === "talk" && (
        <>
          <span className="halo-ripple" />
          <span className="halo-ripple halo-ripple--late" />
        </>
      )}
    </div>
  );
}
