"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  BadgeCheck,
  Database,
  FileDown,
  GitBranch,
  Lock,
  ShieldCheck,
  Trash2,
  Scale,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getProgram, coverageMatrix, programHref } from "@/lib/rights-packages";
import { FreshnessBadge, SourceChip } from "@/components/civic/primitives";

/**
 * CivicClaim home — the promise, a real result rendered from the live
 * data layer, how it works, the coverage strip, the open-data block and
 * the six honest FAQ answers. Zero hardcoded counts: everything numeric
 * is computed from the packages at render time.
 */

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function regionFlag(code: string): string {
  if (code.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

/* ------------------------------------------------------------------ */
/* Hero — the exact product promise.                                   */
/* ------------------------------------------------------------------ */

function Hero() {
  const { t, tArr } = useI18n();
  const trust = tArr<string>("site.home.hero.trust");
  const trustIcons = [ShieldCheck, Scale, Lock];

  return (
    <section className="relative pb-16 pt-20 sm:pb-24 sm:pt-28">
      {/* Breathing halo behind the headline — pure light, no layout cost. */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl font-bold leading-[1.06] tracking-tight text-zinc-50 sm:text-6xl"
          >
            <span className="text-prism">{t("site.home.hero.title")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200"
          >
            {t("site.home.hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="btn-shimmer h-12 w-full border border-amber-300/40 bg-gradient-to-b from-amber-300 to-amber-500 px-7 text-base font-semibold text-cf-deep shadow-[0_10px_36px_-12px_rgba(217,164,65,0.65)] transition-all hover:from-amber-200 hover:to-amber-400 hover:shadow-[0_14px_44px_-12px_rgba(217,164,65,0.8)] sm:w-auto"
            >
              <Link href="/tools">
                {t("site.home.hero.ctaPrimary")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full border-cf-line bg-cf-deep/60 px-7 text-base text-zinc-200 transition-all hover:border-cf-cyan/50 hover:bg-cf-cyan/10 hover:text-white sm:w-auto"
            >
              <Link href="/coverage">{t("site.home.hero.ctaSecondary")}</Link>
            </Button>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-300"
          >
            {trust.map((item, i) => {
              const Icon = trustIcons[i] ?? ShieldCheck;
              return (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-cf-teal" aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Real result example — flagship program of the first live package,   */
/* every value pulled from the data layer at render time.              */
/* ------------------------------------------------------------------ */

function ExampleResult() {
  const { t } = useI18n();
  const flagship = getProgram("us-snap");
  if (!flagship) return null;

  return (
    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cf-gold">
            {t("site.home.example.eyebrow")}
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
            {t("site.home.example.title")}
          </h2>

          <div className="panel-black mt-8 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">
                  {flagship.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {flagship.country} · {flagship.agency}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cf-teal/40 bg-cf-teal/10 px-3 py-1 text-sm font-medium text-cf-teal">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                {t("site.home.example.verdict")}
              </span>
            </div>

            <dl className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  Matched rule
                </dt>
                <dd className="mt-1 text-sm text-zinc-200">
                  {t("site.home.example.matchedRule")}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  How much
                </dt>
                <dd className="mt-1 font-mono text-sm text-zinc-100">
                  {flagship.amount}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {t("site.home.example.deadline")}
                </dt>
                <dd className="mt-1 text-sm text-zinc-200">
                  {flagship.deadlines}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <FreshnessBadge program={flagship} />
              <SourceChip
                url={flagship.sourceUrl}
                checkedAt={flagship.verification.lastChecked}
              />
              <Link
                href={programHref(flagship)}
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-cf-cyan hover:underline"
              >
                {t("site.home.example.seeBreakdown")}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works — three numbered steps, no icons pretending to be      */
/* information.                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const { t, tArr } = useI18n();
  const steps = tArr<{ title: string; body: string }>("site.home.how.steps");

  return (
    <section id="how" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          {...fadeUp}
          className="text-center text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl"
        >
          {t("site.home.how.title")}
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div key={step.title} {...fadeUp} className="panel-black rounded-2xl p-6">
              <p
                aria-hidden="true"
                className="font-mono text-3xl font-semibold text-cf-gold/80"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage strip — compact country × program matrix, computed.        */
/* ------------------------------------------------------------------ */

function CoverageStrip() {
  const { t } = useI18n();
  const rows = coverageMatrix().slice(0, 6);

  return (
    <section id="coverage" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
              {t("site.home.coverage.title")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              {t("site.home.coverage.lead")}
            </p>
          </div>
          <Link
            href="/coverage"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cf-cyan hover:underline"
          >
            {t("site.home.coverage.full")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <motion.div
              key={row.country}
              {...fadeUp}
              className="panel-black flex items-center justify-between gap-4 rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="text-xl">
                  {regionFlag(row.region)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">
                    {row.country}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    {t("site.home.coverage.lastChecked")} {row.lastChecked}
                  </p>
                </div>
              </div>
              <p className="text-right">
                <span className="tabular font-mono text-xl font-semibold text-cf-gold">
                  {row.livePrograms}
                </span>
                <span className="ml-1.5 text-xs text-zinc-500">
                  {t("site.home.coverage.programs")}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Open data & code — the transparency block.                          */
/* ------------------------------------------------------------------ */

function OpenDataBlock() {
  const { t } = useI18n();

  const links = [
    { href: "/data", label: t("site.home.data.download"), icon: FileDown },
    { href: "/method", label: t("site.home.data.method"), icon: Database },
    { href: "/contribute", label: t("site.home.data.contribute"), icon: GitBranch },
  ];

  return (
    <section id="data" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="panel-black rounded-2xl p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-balance text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
            {t("site.home.data.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            {t("site.home.data.lead")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {links.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                asChild
                variant="outline"
                className="w-full border-cf-line bg-cf-deep/60 text-zinc-200 hover:border-cf-cyan/40 hover:text-cf-cyan sm:w-auto"
              >
                <Link href={href}>
                  <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ — six honest answers.                                           */
/* ------------------------------------------------------------------ */

function CivicFaq() {
  const { t, tArr } = useI18n();
  const items = tArr<{ q: string; a: string }>("site.home.faq.items");

  return (
    <section id="faq" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.h2
          {...fadeUp}
          className="text-center text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl"
        >
          {t("site.home.faq.title")}
        </motion.h2>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="panel-black mb-3 rounded-xl border-cf-line px-5"
            >
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-zinc-100 hover:text-cf-cyan hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-zinc-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function HomeSections() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ExampleResult />
      <HowItWorks />
      <CoverageStrip />
      <OpenDataBlock />
      <CivicFaq />
    </div>
  );
}
