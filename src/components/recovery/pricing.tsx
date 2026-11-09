"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Reveal, Spotlight, GoldenStream } from "./effects";

const PLANS = [
  {
    name: "People — the World Library",
    price: "$0",
    cadence: "free forever · no tiers, no card, no catch",
    highlight: true,
    cta: "Search 20 countries",
    ctaHref: "#library",
    features: [
      "Every official unclaimed-money database we index, worldwide",
      "Personal checklist builder — name in, sources out",
      "New-registry alerts for your countries",
      "Direct links to the official search — we never stand in the way",
      "Search for yourself, your parents, your grandparents",
    ],
  },
  {
    name: "Business recovery",
    price: "$0 upfront",
    cadence: "then 8–15% of recovered funds",
    highlight: false,
    cta: "Run a free scan",
    ctaHref: "#scanner",
    features: [
      "Claim preparation & evidence packaging",
      "CAPE-ready files + validation fixes",
      "Filing via official administrators or licensed partners",
      "Deadline tracking until funds arrive",
      "Quoted in writing before you commit — no recovery, no fee",
    ],
  },
  {
    name: "Partners & data",
    price: "Custom",
    cadence: "rev-share · API · insights",
    highlight: false,
    cta: "Talk to us",
    ctaHref: "#waitlist",
    features: [
      "For customs brokers, agencies and associations",
      "Bulk claim preparation for client rosters",
      "API access to the matching engine",
      "Aggregated registry coverage as we expand markets",
      "You keep the client relationship — we run the machine",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.45} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 28% at 50% 0%, rgba(251,191,36,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            Pricing
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            Free for people. A fee only when{" "}
            <span className="text-gradient-gold">money moves.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            The World Library will never cost a cent — every search makes the map
            of lost money sharper, and that map is how we earn. Businesses pay a
            success fee, and only on money that actually comes back.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <Spotlight
                className={`relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  p.highlight
                    ? "animate-glow panel-black panel-beam"
                    : "panel-black hover:border-amber-400/30"
                }`}
              >
                <CardContent className="flex h-full flex-col p-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                    {p.highlight && (
                      <Badge className="shrink-0 bg-gradient-to-b from-amber-300 to-amber-500 font-semibold text-zinc-950 hover:from-amber-300 hover:to-amber-500">
                        Always free
                      </Badge>
                    )}
                  </div>
                  <p className="tabular mt-4 text-4xl font-bold tracking-tight text-white">
                    {p.price}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{p.cadence}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={p.ctaHref} className="mt-8">
                    <Button
                      className={`w-full ${
                        p.highlight
                          ? "btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                          : "border-amber-400/25 bg-transparent text-amber-200 hover:bg-amber-400/[0.06] hover:text-amber-100"
                      }`}
                      variant={p.highlight ? "default" : "outline"}
                    >
                      {p.cta}
                    </Button>
                  </a>
                </CardContent>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
