import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/recovery/header";
import { BusinessHero } from "@/components/recovery/business-hero";
import { Channels } from "@/components/recovery/channels";
import { Sponsorship } from "@/components/recovery/sponsorship";
import { Footer } from "@/components/recovery/footer";
import { AiGuide } from "@/components/recovery/ai-guide";
import { LazyAiAssistant } from "@/components/recovery/lazy-mounts";

export const metadata: Metadata = {
  title: "For business & partners — recovery channels, API, sponsorship | CivicClaim OS",
  description:
    "The RecoveryOS money-recovery layer of CivicClaim OS: six recovery channels for companies (class actions, IEEPA tariff refunds, duty drawback, freight audits, R&D credits, B2B unclaimed property), the institutional API and the sponsorship model. Citizens keep the free toolkit.",
};

/**
 * The business & partners page — same design system as the main page.
 * The overview (/) stays citizen-first; the money-recovery narrative and
 * the sustainability model live here. The interactive business forms
 * (scanner, settlements browser, IEEPA calculator, waitlist) stay on /tools.
 */
export default function Business() {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
        <Header />
        <main className="flex-1">
          <BusinessHero />
          {/* Heritage RecoveryOS business & money-recovery layer */}
          <Channels />
          {/* Sustainability model */}
          <Sponsorship />
        </main>
        <Footer />
        <AiGuide />
        <LazyAiAssistant delay={900} />
      </div>
    </I18nProvider>
  );
}
