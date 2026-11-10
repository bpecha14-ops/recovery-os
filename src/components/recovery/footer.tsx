"use client";

import { Coins } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Marquee, LiveClock, GoldenStream } from "./effects";

const PRODUCT_HREFS = ["#how", "#library", "#scanner", "#settlements", "#ieepa", "#pricing"];
const CHANNEL_HREFS = ["#channels", "#settlements", "#ieepa", "#channels", "#waitlist"];

// The living footer ticker — every official registry in the library, rolling.
const REGISTRY_TICKER = [
  "🇺🇸 NAUPA / MissingMoney",
  "🇺🇸 Treasury Hunt",
  "🇺🇸 PBGC Pensions",
  "🇨🇦 Bank of Canada",
  "🇧🇷 Banco Central SVR",
  "🇬🇧 My Lost Account",
  "🇬🇧 Pension Tracing",
  "🇬🇧 NS&I Prizes",
  "🇫🇷 Ciclade — CDC",
  "🇩🇪 Verbraucherzentrale",
  "🇨🇭 Swiss Ombudsman",
  "🇮🇪 NTMA Dormant Accounts",
  "🇺🇦 ФГВФО вклади",
  "🇦🇺 ASIC Moneysmart",
  "🇮🇳 RBI UDGAM",
  "🇮🇳 IEPF Authority",
  "🇮🇳 EPFO Passbook",
  "🇯🇵 DIC Japan",
  "🇰🇷 KIFIN Korea",
  "🇭🇰 MPFA Hong Kong",
  "🇳🇿 IRD Unclaimed Money",
  "🇿🇦 FSCA South Africa",
  "🇲🇽 IPAB Portal de Pagos",
  "🇨🇱 CMF Acreencias",
  "🇨🇴 Superfinanciera",
  "🇮🇹 MEF Depositi Dormienti",
  "🇧🇪 CDC Avoirs Dormants",
  "🇸🇪 Riksbanken",
  "🇲🇾 eGUMIS",
  "🇵🇭 Bureau of the Treasury",
  "🇮🇩 LPS Indonesia",
  "🇹🇷 TMSF Türkiye",
  "🇦🇪 Central Bank UAE",
  "🇸🇦 SAMA Rulebook",
  "🇧🇭 CBB Bahrain",
  "🇰🇼 KCC Maqasa Kuwait",
  "🇴🇲 CBO Oman",
  "🇶🇦 QCB Qatar",
  "🇮🇶 CBI Iraq",
  "🇵🇸 PMA Palestine",
  "🇯🇴 JODIC Jordan",
  "🇱🇧 BDL Lebanon",
  "🇹🇳 CMF Tunisia",
  "🇩🇿 Banque d'Algérie",
  "🇲🇦 CDG Morocco",
  "🇰🇪 UFAA Kenya",
  "🇳🇬 NDIC Nigeria",
  "🇬🇭 Bank of Ghana",
  "🇪🇬 CBE Egypt",
];

export function Footer() {
  const { t, tArr } = useI18n();
  const productLabels = tArr<string>("footer.product");
  const channelLabels = tArr<string>("footer.channelsNav");
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-amber-400/[0.10] bg-zinc-950 text-zinc-400">
      <GoldenStream density={0.4} />
      <div aria-hidden="true" className="hairline-gold" />

      {/* World registry ticker — the library never sleeps */}
      <div className="relative border-b border-amber-400/[0.08] py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6">
          <span className="hidden shrink-0 items-center gap-2 rounded-full border border-amber-400/25 bg-black px-3 py-1 text-[11px] font-medium text-amber-200/80 sm:inline-flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <LiveClock />
          </span>
          <div className="min-w-0 flex-1">
            <Marquee
              items={REGISTRY_TICKER.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2.5 text-xs tracking-wide text-amber-200/50"
                >
                  <span
                    className="h-1 w-1 rounded-full bg-amber-400/70"
                    aria-hidden="true"
                  />
                  {t}
                </span>
              ))}
              itemClassName="pr-10"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)] transition-transform hover:scale-105">
                <Coins className="h-4 w-4 text-zinc-950" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                RecoveryOS
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {t("footer.about")}
            </p>
          </div>
          <nav aria-label={t("footer.ariaProduct")}>
            <h3 className="text-sm font-semibold text-amber-300/90">{t("footer.productTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PRODUCT_HREFS.map((href, i) => (
                <li key={href + i}>
                  <a
                    href={href}
                    className="transition-colors hover:text-amber-300"
                  >
                    {productLabels[i] ?? href}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("footer.ariaChannels")}>
            <h3 className="text-sm font-semibold text-amber-300/90">{t("footer.channelsTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CHANNEL_HREFS.map((href, i) => (
                <li key={href + i}>
                  <a
                    href={href}
                    className="transition-colors hover:text-amber-300"
                  >
                    {channelLabels[i] ?? href}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/[0.06] pt-6 text-xs leading-relaxed text-zinc-600">
          <p>{t("footer.legal1")}</p>
          <p>{t("footer.legal2")}</p>
          <p className="pt-2">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
