import { Header } from "@/components/recovery/header";
import { Hero } from "@/components/recovery/hero";
import { HowItWorks } from "@/components/recovery/how-it-works";
import { Library } from "@/components/recovery/library";
import { Channels } from "@/components/recovery/channels";
import { Scanner } from "@/components/recovery/scanner";
import { SettlementsBrowser } from "@/components/recovery/settlements-browser";
import { TariffCalculator } from "@/components/recovery/tariff-calculator";
import { Pricing } from "@/components/recovery/pricing";
import { Faq } from "@/components/recovery/faq";
import { Waitlist } from "@/components/recovery/waitlist";
import { Footer } from "@/components/recovery/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Library />
        <Channels />
        <Scanner />
        <SettlementsBrowser />
        <TariffCalculator />
        <Pricing />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
