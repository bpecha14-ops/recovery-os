"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Trash2, Scale, Sparkles } from "lucide-react";
import { IEEPA_INFO } from "@/lib/recovery-data";
import { WORLD_COUNTRIES, WORLD_VERIFIED_USD_B } from "@/lib/world-registry";
import { useI18n } from "@/lib/i18n/context";
import { CountUp, GoldenStream, Marquee } from "./effects";

const STAT_KEYS = ["hero.stat1", "hero.stat2", "hero.stat3", "hero.stat4"];

const STAT_FORMATS = [
  (n: number) => `$${Math.round(n)}B`,
  (n: number) => `$${Math.round(n)}B+`,
  (n: number) => `~$${Math.round(n)}B/yr`,
  (n: number) => n.toLocaleString("en-US"),
];

const spring = { type: "spring" as const, stiffness: 92, damping: 18 };

export function Hero() {
  const { t, tArr } = useI18n();
  const tickerItems = tArr<string>("hero.ticker");
  return (
    <section className="relative overflow-hidden bg-zinc-950 pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      {/* Layered depth: aurora glows → engineering grid → particle stream */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 42% at 26% 18%, rgba(251,191,36,0.13) 0%, transparent 62%), radial-gradient(42% 36% at 82% 76%, rgba(245,158,11,0.10) 0%, transparent 58%), radial-gradient(50% 40% at 55% 0%, rgba(251,191,36,0.04) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black,transparent)]" />
      <GoldenStream />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Announcement pill — catalyst first */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="mx-auto w-fit"
        >
          <a
            href="#ieepa"
            className="group inline-flex items-center gap-2.5 rounded-full border border-amber-400/25 bg-amber-400/[0.07] py-1.5 pl-3 pr-4 text-sm text-amber-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-amber-400/45 hover:bg-amber-400/[0.12]"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            {t("hero.pill")}
            <span className="font-semibold text-amber-300/90 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>

        {/* Display headline — oversized, one gold idea */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.14 }}
          className="mx-auto mt-8 max-w-4xl text-balance text-center text-5xl font-bold leading-[1.02] tracking-tighter text-white sm:text-7xl lg:text-[5.25rem]"
        >
          {t("hero.titleA")}
          <span className="text-gradient-gold">{t("hero.titleGold")}</span>
          {t("hero.titleB")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.34 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#scanner" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="relative h-12 w-full overflow-hidden bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 px-7 text-base font-semibold text-zinc-950 shadow-[0_0_40px_-8px_rgba(251,191,36,0.55),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all hover:brightness-110 hover:shadow-[0_0_54px_-8px_rgba(251,191,36,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ animation: "shimmer-x 3.2s ease-in-out infinite" }}
              />
              <span className="relative">{t("common.runFreeScan")}</span>
              <ArrowRight className="relative ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
          <a href="#library" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full border-amber-400/35 bg-black px-7 text-base text-amber-200 transition-all hover:border-amber-400/70 hover:bg-amber-400/10 hover:text-amber-100 hover:shadow-[0_0_32px_-12px_rgba(251,191,36,0.5)] sm:w-auto"
            >
              {t("hero.ctaLibrary")}
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-400/90" aria-hidden="true" />
            {t("hero.trustNoFee")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Scale className="h-4 w-4 text-amber-400/90" aria-hidden="true" />
            {t("hero.trustOfficial")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Trash2 className="h-4 w-4 text-amber-400/90" aria-hidden="true" />
            {t("hero.trustDelete")}
          </span>
        </motion.div>

        {/* Deadline banner — urgency in gold, not red */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.58 }}
          className="relative mx-auto mt-10 flex max-w-3xl items-start gap-3 overflow-hidden rounded-xl border border-amber-400/25 bg-black px-4 py-3 text-sm text-amber-200/90"
          role="note"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 130% at 8% 0%, rgba(251,191,36,0.13) 0%, transparent 55%)",
            }}
          />
          <div
            aria-hidden="true"
            className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
          />
          <Sparkles className="relative mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p className="relative">
            <span className="font-semibold text-amber-200">{t("hero.deadlineLead")}</span>{" "}
            {t("hero.deadlineBody", { interest: IEEPA_INFO.interestPerMonth })}
          </p>
        </motion.div>

        {/* Stat band — money counts up, tabular figures */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-amber-400/[0.14] bg-amber-400/[0.10] lg:grid-cols-4">
          {STAT_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="relative bg-[#0a0a0c] p-5 sm:p-6"
            >
              <div
                className={`tabular text-3xl font-bold tracking-tight sm:text-4xl ${
                  i === 0 ? "text-gradient-gold" : "text-white"
                }`}
              >
                <CountUp
                  to={i === 0 ? 166 : i === 1 ? WORLD_VERIFIED_USD_B : i === 2 ? 15 : 75300}
                  format={STAT_FORMATS[i]}
                  delay={0.2 + i * 0.1}
                />
              </div>
              <div className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                {i === 1
                  ? t(key, { markets: String(WORLD_COUNTRIES.length) })
                  : t(key)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Channel ticker — the stream, literally */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14"
        >
          <Marquee
            items={tickerItems.map((item, i) => (
              <span key={`${i}-${item}`} className="flex items-center gap-3 text-sm text-zinc-500">
                <span className="h-1 w-1 rounded-full bg-amber-400/70" aria-hidden="true" />
                {item}
              </span>
            ))}
            itemClassName="pr-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
