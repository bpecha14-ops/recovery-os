import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/recovery/header";
import { Hero } from "@/components/recovery/hero";
import { HowItWorks } from "@/components/recovery/how-it-works";
import { Coverage } from "@/components/recovery/coverage";
import { CivicModules } from "@/components/recovery/civic-modules";
import { DataEngine } from "@/components/recovery/data-engine";
import { Library } from "@/components/recovery/library";
import { Channels } from "@/components/recovery/channels";
import { Scanner } from "@/components/recovery/scanner";
import { SettlementsBrowser } from "@/components/recovery/settlements-browser";
import { TariffCalculator } from "@/components/recovery/tariff-calculator";
import { Sponsorship } from "@/components/recovery/sponsorship";
import { Faq } from "@/components/recovery/faq";
import { Waitlist } from "@/components/recovery/waitlist";
import { Footer } from "@/components/recovery/footer";
import { AiAssistant } from "@/components/recovery/ai-assistant";
import { AiGuide } from "@/components/recovery/ai-guide";

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
          <CivicModules />
          <DataEngine />
          {/* Heritage: RecoveryOS business & money-recovery layer */}
          <Library />
          <Channels />
          <Scanner />
          <SettlementsBrowser />
          <TariffCalculator />
          {/* Sustainability model */}
          <Sponsorship />
          <Faq />
          <Waitlist />
        </main>
        <Footer />
        <AiGuide />
        <AiAssistant />
      </div>
    </I18nProvider>
  );
}
