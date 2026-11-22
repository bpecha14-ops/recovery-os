"use client";

import { useRouter } from "next/navigation";
import type { Program } from "@/lib/programs-data";
import { GlobalSearch } from "@/components/recovery/global-search";

/**
 * Program browser for /coverage — same search module as /tools, with
 * the claim-assistant hand-off routed to /tools#claim.
 */
export function CoveragePrograms() {
  const router = useRouter();
  return (
    <GlobalSearch
      onOpenClaim={(_p: Program) => router.push("/tools#claim")}
    />
  );
}
