import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/recovery/header";
import { Hero } from "@/components/recovery/hero";
import { HowItWorks } from "@/components/recovery/how-it-works";
import { Coverage } from "@/components/recovery/coverage";
import { ToolsHub } from "@/components/recovery/tools-hub";
import { DataEngine } from "@/components/recovery/data-engine";
import { BusinessCta } from "@/components/recovery/business-cta";
import { Faq } from "@/components/recovery/faq";
import { Footer } from "@/components/recovery/footer";
import { AiGuide } from "@/components/recovery/ai-guide";
import { LazyLibrary, LazyAiAssistant } from "@/components/recovery/lazy-mounts";

/**
 * Main page — the fast, quiet, citizen-first overview.
 * Every interactive form lives on /tools (same design system);
 * the business layer narrative (recovery channels + sponsorship)
 * lives on /business. This page keeps the story, coverage and
 * the world library, with the toolkit hub linking to each form.
 */
export default function Home() {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
        <Header />
        <main className="flex-1">
          {/* CivicClaim OS — citizen layer (free forever) */}
          <Hero />
          <HowItWorks />
          <Coverage />
          <ToolsHub />
          <DataEngine />
          {/* Heritage: RecoveryOS world library of unclaimed money */}
          <LazyLibrary />
          {/* Business layer signpost — the full story is on /business */}
          <BusinessCta />
          <Faq />
        </main>
        <Footer />
        <AiGuide />
        <LazyAiAssistant />
      </div>
    </I18nProvider>
  );
}
