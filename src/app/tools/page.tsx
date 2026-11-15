import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import { Header } from "@/components/recovery/header";
import { ToolsHero } from "@/components/recovery/tools-hero";
import { ToolsPage } from "@/components/recovery/tools-page";
import { Footer } from "@/components/recovery/footer";
import { AiGuide } from "@/components/recovery/ai-guide";
import { LazyAiAssistant } from "@/components/recovery/lazy-mounts";

export const metadata: Metadata = {
  title: "Toolkit — every form in one place | CivicClaim OS",
  description:
    "All interactive tools of CivicClaim OS: global rights & money search, anonymous eligibility wizard, claim assistant checklists, business purchase scanner, settlements browser and the IEEPA tariff refund calculator. Free, anonymous, browser-only.",
};

export default function Tools() {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
        <Header />
        <main className="flex-1">
          {/* Every form of CivicClaim OS, in the same style as the main page */}
          <ToolsHero />
          <ToolsPage />
        </main>
        <Footer />
        <AiGuide />
        <LazyAiAssistant delay={900} />
      </div>
    </I18nProvider>
  );
}
