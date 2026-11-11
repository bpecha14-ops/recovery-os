"use client";

import { useState } from "react";
import { Program } from "@/lib/programs-data";
import { GlobalSearch } from "./global-search";
import { EligibilityWizard } from "./eligibility-wizard";
import { ClaimAssistant } from "./claim-assistant";

/**
 * Client shell for the three interactive citizen modules.
 * Holds the "open in claim assistant" hand-off between search,
 * wizard and the claim checklist without any server state.
 */
export function CivicModules() {
  const [selected, setSelected] = useState<Program | null>(null);

  return (
    <>
      <GlobalSearch onOpenClaim={setSelected} />
      <EligibilityWizard onOpenClaim={setSelected} />
      <ClaimAssistant preselected={selected} onConsumed={() => setSelected(null)} />
    </>
  );
}
