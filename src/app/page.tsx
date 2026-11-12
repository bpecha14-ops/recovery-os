import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/recovery/header";
import { Hero } from "@/components/recovery/hero";
import { HowItWorks } from "@/components/recovery/how-it-works";
import { Coverage } from "@/components/recovery/coverage";
import { ToolsHub } from "@/components/recovery/tools-hub";
import { DataEngine } from "@/components/recovery/data-engine";
import { Channels } from "@/components/recovery/channels";
import { Sponsorship } from "@/components/recovery/sponsorship";
import { Faq } from "@/components/recovery/faq";
import { Footer } from "@/components/recovery/footer";
import { AiGuide } from "@/components/recovery/ai-guide";
import { LazyLibrary, LazyAiAssistant } from "@/components/recovery/lazy-mounts";

/**
 * Main page — the fast, quiet overview.
 * Every interactive form lives on /tools (same design system);
 * this page keeps the narrative, coverage and sustainability story,
 * with the toolkit hub linking straight into each form.
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
          {/* Heritage: RecoveryOS business & money-recovery layer */}
          <LazyLibrary />
          <Channels />
          {/* Sustainability model */}
          <Sponsorship />
          <Faq />
        </main>
        <Footer />
        <AiGuide />
        <LazyAiAssistant />
      </div>
    </I18nProvider>
  );
}
