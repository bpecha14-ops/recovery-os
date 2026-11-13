"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Reveal } from "./effects";

/**
 * Compact signpost on the main page: the business layer (recovery
 * channels, institutional API, sponsorship) lives on /business — the
 * overview stays a quiet, citizen-first page.
 */
export function BusinessCta() {
  const { t } = useI18n();

  return (
    <section id="business" className="relative scroll-mt-20 bg-zinc-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="panel-black flex flex-col items-start gap-6 rounded-2xl border-amber-400/[0.16] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07]">
                <Building2 className="h-5 w-5 text-amber-300" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
                  {t("business.cta.eyebrow")}
                </p>
                <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {t("business.cta.headingA")}{" "}
                  <span className="text-gradient-gold">{t("business.cta.headingGold")}</span>
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {t("business.cta.lead")}
                </p>
              </div>
            </div>
            <Link
              href="/business"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-8px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
            >
              {t("business.cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
