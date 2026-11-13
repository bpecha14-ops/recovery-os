"use client";

import dynamic from "next/dynamic";
import { CivicModules } from "./civic-modules";
import { InView } from "./in-view";

/**
 * The toolkit page body: every interactive form of CivicClaim OS.
 *
 * The three citizen modules (search → wizard → claim assistant) mount
 * immediately — they are the reason visitors come here. The business
 * tools below are code-split and mount when scrolled near, so the page
 * stays responsive no matter how far it stretches.
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

const Scanner = dynamic(() => import("./scanner").then((m) => ({ default: m.Scanner })), {
  ssr: false,
  loading: () => <ChunkPlaceholder minHeight={760} />,
});

const SettlementsBrowser = dynamic(
  () => import("./settlements-browser").then((m) => ({ default: m.SettlementsBrowser })),
  { ssr: false, loading: () => <ChunkPlaceholder minHeight={640} /> },
);

const TariffCalculator = dynamic(
  () => import("./tariff-calculator").then((m) => ({ default: m.TariffCalculator })),
  { ssr: false, loading: () => <ChunkPlaceholder minHeight={620} /> },
);

const Waitlist = dynamic(() => import("./waitlist").then((m) => ({ default: m.Waitlist })), {
  ssr: false,
  loading: () => <ChunkPlaceholder minHeight={560} />,
});

export function ToolsPage() {
  return (
    <>
      {/* Citizen layer — mounts immediately */}
      <CivicModules />

      {/* Business & money-recovery layer — mounts on approach;
          the placeholder keeps the anchor target so #hash links work */}
      <InView minHeight={760} id="scanner">
        <Scanner />
      </InView>
      <InView minHeight={640} id="settlements">
        <SettlementsBrowser />
      </InView>
      <InView minHeight={620} id="ieepa">
        <TariffCalculator />
      </InView>
      <InView minHeight={560} id="waitlist">
        <Waitlist />
      </InView>
    </>
  );
}
