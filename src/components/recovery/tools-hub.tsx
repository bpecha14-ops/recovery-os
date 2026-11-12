"use client";

import Link from "next/link";
import {
  Search,
  ClipboardCheck,
  ListChecks,
  ScanLine,
  Landmark,
  Calculator,
  Handshake,
  ArrowRight,
  Users,
  Building2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Reveal } from "./effects";

/** Card model: dictionary key → anchor + icon. */
const CITIZEN_CARDS = [
  { key: "search", anchor: "search", Icon: Search },
  { key: "eligibility", anchor: "eligibility", Icon: ClipboardCheck },
  { key: "claim", anchor: "claim", Icon: ListChecks },
] as const;

const BUSINESS_CARDS = [
  { key: "scanner", anchor: "scanner", Icon: ScanLine },
  { key: "settlements", anchor: "settlements", Icon: Landmark },
  { key: "ieepa", anchor: "ieepa", Icon: Calculator },
  { key: "waitlist", anchor: "waitlist", Icon: Handshake },
] as const;

function ToolCard({
  cardKey,
  anchor,
  Icon,
  openLabel,
  freeBadge,
}: {
  cardKey: string;
  anchor: string;
  Icon: typeof Search;
  openLabel: string;
  freeBadge?: string;
}) {
  const { t } = useI18n();
  return (
    <Link
      href={`/tools#${anchor}`}
      className="group relative flex flex-col rounded-2xl border border-amber-400/[0.14] bg-gradient-to-b from-amber-400/[0.05] to-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_20px_60px_-24px_rgba(251,191,36,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.07] transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/40">
          <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
        </span>
        {freeBadge ? (
          <span className="rounded-md border border-amber-400/25 bg-amber-400/[0.08] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300/90">
            {freeBadge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">
        {t(`tools.cards.${cardKey}.title`)}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-zinc-400">
        {t(`tools.cards.${cardKey}.desc`)}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300/90 transition-colors group-hover:text-amber-200">
        {openLabel}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/**
 * The toolkit hub on the main page: every interactive form moved to
 * /tools — this section presents them as cards in the same visual
 * language and links to the anchors there.
 */
export function ToolsHub() {
  const { t } = useI18n();

  return (
    <section id="tools" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("tools.hub.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("tools.hub.headingA")}{" "}
            <span className="text-gradient-gold">{t("tools.hub.headingGold")}</span>
            {t("tools.hub.headingB")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t("tools.hub.lead")}
          </p>
        </Reveal>

        {/* Citizen layer */}
        <Reveal className="mt-14" delay={0.05}>
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-amber-300" aria-hidden="true" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">
              {t("tools.hub.citizenTitle")}
            </h3>
            <span className="hidden text-xs text-zinc-500 sm:inline">
              {t("tools.hub.citizenNote")}
            </span>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CITIZEN_CARDS.map((c, i) => (
            <Reveal key={c.key} delay={0.08 + i * 0.08}>
              <ToolCard
                cardKey={c.key}
                anchor={c.anchor}
                Icon={c.Icon}
                openLabel={t("tools.hub.open")}
                freeBadge={t("tools.hub.freeBadge")}
              />
            </Reveal>
          ))}
        </div>

        {/* Business layer */}
        <Reveal className="mt-14" delay={0.1}>
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-amber-300" aria-hidden="true" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">
              {t("tools.hub.businessTitle")}
            </h3>
            <span className="hidden text-xs text-zinc-500 sm:inline">
              {t("tools.hub.businessNote")}
            </span>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESS_CARDS.map((c, i) => (
            <Reveal key={c.key} delay={0.12 + i * 0.07}>
              <ToolCard
                cardKey={c.key}
                anchor={c.anchor}
                Icon={c.Icon}
                openLabel={t("tools.hub.open")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
