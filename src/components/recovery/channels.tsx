"use client";

import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Landmark,
  Ship,
  Truck,
  FlaskConical,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { CHANNELS } from "@/lib/recovery-data";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Spotlight, CountUp, Marquee, GoldenStream } from "./effects";

const ICONS = {
  "class-actions": Scale,
  ieepa: Landmark,
  drawback: Ship,
  freight: Truck,
  rnd: FlaskConical,
  unclaimed: Building2,
} as const;

// Bento spans — asymmetric, Apple-style. IEEPA is the featured tile.
const SPANS: Record<string, string> = {
  ieepa: "lg:col-span-3",
  "class-actions": "lg:col-span-3",
  drawback: "lg:col-span-2",
  freight: "lg:col-span-2",
  rnd: "lg:col-span-2",
  unclaimed: "lg:col-span-6",
};

export function Channels() {
  const { t, tArr } = useI18n();
  const items = tArr<{
    title: string;
    stat: string;
    statLabel: string;
    description: string;
    statusNote: string;
  }>("channels.items");
  const ticker = tArr<string>("channels.ticker");

  return (
    <section id="channels" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.5} />
      <div
        aria-hidden="true"
        className="aurora-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 32% at 12% 12%, rgba(251,191,36,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("channels.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("channels.headingA")}{" "}
            <span className="text-gradient-gold">{t("channels.headingGold")}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("channels.lead")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {CHANNELS.map((c, i) => {
            const text = items[i];
            const Icon = ICONS[c.id as keyof typeof ICONS];
            const live = c.status === "live";
            const featured = c.id === "ieepa";
            return (
              <Reveal key={c.id} delay={i * 0.07} className={`${SPANS[c.id] ?? "lg:col-span-2"} md:col-span-1`}>
                <Spotlight
                  className={`group relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 sm:p-7 ${
                    featured
                      ? "panel-black panel-beam animate-glow"
                      : "panel-black hover:border-amber-400/30"
                  }`}
                >
                  {/* Featured tile gets a permanent aurora wash */}
                  {featured && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 70% at 85% 15%, rgba(251,191,36,0.10) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                          featured
                            ? "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_24px_-6px_rgba(251,191,36,0.7)]"
                            : "border border-amber-400/20 bg-amber-400/[0.07]"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${featured ? "text-zinc-950" : "text-amber-300"}`}
                          aria-hidden="true"
                        />
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          live
                            ? "border-amber-400/30 bg-amber-400/[0.08] text-amber-300"
                            : "border-amber-400/[0.16] bg-amber-400/[0.05] text-amber-200/60"
                        }
                      >
                        {live && (
                          <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                        )}
                        {text?.statusNote ?? c.statusNote}
                      </Badge>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {text?.title ?? c.title}
                    </h3>
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="tabular text-3xl font-bold tracking-tight text-gradient-gold">
                        {c.statValue !== undefined && c.statFormat ? (
                          <CountUp to={c.statValue} format={c.statFormat} duration={1.6} delay={0.15} ssrValue />
                        ) : (
                          (text?.stat ?? c.stat)
                        )}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-zinc-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-amber-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {text?.statLabel ?? c.statLabel}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {text?.description ?? c.description}
                    </p>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        {/* Channel pulse — facts rolling under the bento */}
        <Reveal delay={0.15} className="mt-10">
          <Marquee
            items={ticker.map((item) => (
              <span key={item} className="flex items-center gap-2.5 text-xs tracking-wide text-amber-200/50">
                <span className="pulse-dot h-1 w-1 rounded-full bg-amber-400/70" aria-hidden="true" />
                {item}
              </span>
            ))}
            itemClassName="pr-10"
          />
        </Reveal>
      </div>
    </section>
  );
}
