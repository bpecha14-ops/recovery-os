"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { GoldenStream } from "./effects";

const CITIZEN_JUMPS = [
  { key: "search", anchor: "search" },
  { key: "eligibility", anchor: "eligibility" },
  { key: "claim", anchor: "claim" },
] as const;

const BUSINESS_JUMPS = [
  { key: "scanner", anchor: "scanner" },
  { key: "settlements", anchor: "settlements" },
  { key: "ieepa", anchor: "ieepa" },
  { key: "waitlist", anchor: "waitlist" },
] as const;

const spring = { type: "spring" as const, stiffness: 92, damping: 18 };

/** Compact hero of the /tools page — the same visual DNA as the main hero,
 *  scaled down: aurora glows, engineering grid, golden stream, one gold idea. */
export function ToolsHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-zinc-950 pb-14 pt-24 text-white sm:pb-20 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 42% at 26% 18%, rgba(251,191,36,0.13) 0%, transparent 62%), radial-gradient(42% 36% at 82% 76%, rgba(245,158,11,0.10) 0%, transparent 58%), radial-gradient(50% 40% at 55% 0%, rgba(251,191,36,0.04) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black,transparent)]" />
      <GoldenStream density={0.55} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="mx-auto w-fit"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-amber-400/25 bg-amber-400/[0.07] py-1.5 pl-3 pr-4 text-sm text-amber-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-amber-400/45 hover:bg-amber-400/[0.12]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            {t("tools.hero.backHome")}
            <span className="h-1 w-1 rounded-full bg-amber-400/70" aria-hidden="true" />
            <span className="font-semibold text-amber-300/90">{t("tools.hero.pill")}</span>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.14 }}
          className="mx-auto mt-8 max-w-4xl text-balance text-center text-5xl font-bold leading-[1.02] tracking-tighter text-white sm:text-6xl lg:text-7xl"
        >
          {t("tools.hero.titleA")}
          <span className="text-gradient-gold">{t("tools.hero.titleGold")}</span>
          {t("tools.hero.titleB")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {t("tools.hero.subtitle")}
        </motion.p>

        {/* Quick jumps — every form one tap away */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.34 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {t("tools.hero.jump")}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {CITIZEN_JUMPS.map((j) => (
              <a
                key={j.anchor}
                href={`#${j.anchor}`}
                className="group inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-black px-4 py-2 text-sm text-amber-200/90 transition-all hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-100"
              >
                <Users className="h-3.5 w-3.5 text-amber-400/80" aria-hidden="true" />
                {t(`tools.cards.${j.key}.title`)}
                <ArrowRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {BUSINESS_JUMPS.map((j) => (
              <a
                key={j.anchor}
                href={`#${j.anchor}`}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-black px-4 py-2 text-sm text-zinc-300 transition-all hover:border-amber-400/40 hover:text-amber-200"
              >
                <Building2 className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-amber-400/80" aria-hidden="true" />
                {t(`tools.cards.${j.key}.title`)}
                <ArrowRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
