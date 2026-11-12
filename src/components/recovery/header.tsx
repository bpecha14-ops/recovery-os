"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Coins, Menu, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

/** Cross-page anchors: overview sections stay on `/`, every form lives on `/tools`. */
const NAV_HREFS = [
  "/#how",
  "/tools#search",
  "/tools#eligibility",
  "/tools#claim",
  "/#engine",
  "/#library",
  "/tools#scanner",
  "/#sponsor",
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, tArr } = useI18n();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const navLabels = tArr<string>("header.nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-400/[0.10] bg-[#0a0a0c]">
      {/* Gold scroll progress — quiet luxury detail */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#" className="group flex items-center gap-2.5" aria-label={t("header.ariaHome")}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)] transition-transform group-hover:scale-105">
            <Coins className="h-4 w-4 text-zinc-950" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            CivicClaim <span className="text-amber-400">OS</span>
          </span>
          <span className="hidden rounded-md border border-amber-400/25 bg-amber-400/[0.08] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300/90 sm:inline-block">
            {t("common.beta")}
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("header.ariaMainNav")}>
          {NAV_HREFS.map((href, i) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-zinc-400 transition-colors hover:text-amber-300"
            >
              {navLabels[i] ?? href}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/tools#eligibility" className="hidden sm:block">
            <Button className="btn-shimmer h-9 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-8px_rgba(251,191,36,0.7)] transition-all hover:brightness-110">
              {t("common.runFreeScan")}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-amber-400/30 bg-transparent text-amber-200 hover:bg-amber-400/10 hover:text-amber-100 lg:hidden"
                aria-label={t("common.openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-amber-400/[0.16] bg-[#0a0a0c] text-zinc-100"
            >
              <SheetTitle className="text-left text-white">
                CivicClaim <span className="text-amber-400">OS</span>
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label={t("header.ariaMobileNav")}>
                {NAV_HREFS.map((href, i) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-amber-200/60 transition-colors hover:bg-amber-400/[0.08] hover:text-amber-200"
                  >
                    {navLabels[i] ?? href}
                  </Link>
                ))}
                <Link href="/tools#eligibility" onClick={() => setOpen(false)} className="mt-3">
                  <Button className="w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 hover:brightness-110">
                    {t("common.runFreeScan")}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
