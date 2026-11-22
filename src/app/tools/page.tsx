import type { Metadata } from "next";
import { ToolsHero } from "@/components/recovery/tools-hero";
import { ToolsPage } from "@/components/recovery/tools-page";

/**
 * /tools — the eligibility wizard leads (it is the product's core),
 * followed by the program search, the claim assistant and the heritage
 * money-recovery tools. The global layout provides the ambient
 * background, header, footer and Goldie.
 */
export const metadata: Metadata = {
  title: "Check what you're owed — the anonymous eligibility wizard",
  description:
    "Answer a few anonymous questions — no name, no email, no ID. Deterministic rules written and checked by humans match you to official programs, each with a source and verification date. Works offline after load.",
};

export default function Tools() {
  return (
    <>
      <ToolsHero />
      <ToolsPage />
    </>
  );
}
