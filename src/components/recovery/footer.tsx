"use client";

import { Coins } from "lucide-react";
import { Marquee, LiveClock } from "./effects";

const PRODUCT_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#library", label: "World Library" },
  { href: "#scanner", label: "Free scanner" },
  { href: "#settlements", label: "Open claims" },
  { href: "#ieepa", label: "IEEPA calculator" },
  { href: "#pricing", label: "Pricing" },
];

const CHANNEL_LINKS = [
  { href: "#channels", label: "All channels" },
  { href: "#settlements", label: "Class actions" },
  { href: "#ieepa", label: "Tariff refunds" },
  { href: "#channels", label: "Duty drawback" },
  { href: "#waitlist", label: "Launch list" },
];

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
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-amber-400/[0.10] bg-zinc-950 text-zinc-400">
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
              The recoveries department for small business — and a free Living
              Library of forgotten money for everyone else. We map every
              channel where money gets stuck: class actions, tariff refunds,
              drawback, unclaimed property. You only pay when checks arrive.
            </p>
          </div>
          <nav aria-label="Product">
            <h3 className="text-sm font-semibold text-amber-300/90">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-amber-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Channels">
            <h3 className="text-sm font-semibold text-amber-300/90">Channels</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CHANNEL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-amber-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/[0.06] pt-6 text-xs leading-relaxed text-zinc-600">
          <p>
            RecoveryOS is not a law firm, an accountant, or a licensed customs
            broker, and nothing on this site is legal, tax, or financial advice.
            The Living Library links to official government databases and
            court-appointed administrators — individuals can always file
            directly, for free. Recovery estimates are modeling aids based on
            public filings and historical payout ratios; actual recoveries
            depend on your evidence, eligibility, and the total claims each
            fund receives.
          </p>
          <p>
            Settlement fund facts, class windows, and deadlines are compiled from
            public court filings and official administrator notices as of late
            October 2026 and may change without notice. Always verify deadlines
            with the official settlement administrator before relying on them.
            Claims are always filed by you or through properly licensed partners,
            and funds flow directly to your account.
          </p>
          <p className="pt-2">
            © 2026 RecoveryOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
