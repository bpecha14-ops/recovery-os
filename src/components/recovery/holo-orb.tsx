"use client";

/**
 * HoloOrb — ARIA, the live AI guide's new body (v2 concept).
 *
 * The old golden-coin cartoon read as "cartoonish" next to the night
 * metropolis; ARIA is a holographic core instead: a glassy glowing
 * sphere with three orbital rings gyroscope-ing around it, a hot
 * inner spark, and ripple pulses when she speaks. No face, no arms —
 * the motion language carries the personality:
 *
 *   idle    rings rotate slowly in counter-locked orbits, core breathes
 *   curious inner spark bobs, rings speed up slightly
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
      {/* the three orbital rings — gyroscope */}
      <div className="halo-ring halo-ring--a" />
      <div className="halo-ring halo-ring--b" />
      <div className="halo-ring halo-ring--c" />
      {/* the glassy core with its inner spark */}
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
