"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Scale, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/recovery/language-switcher";
import { useI18n } from "@/lib/i18n/context";

/**
 * CivicClaim global header — one nav across the whole product:
 * Programs · Coverage · Method · Data · About, a language switcher and
 * the single persistent call to action.
 */

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, tArr } = useI18n();
  const navLabels = tArr<string>("site.header.nav");

  const NAV = [
    { href: "/coverage#programs", label: navLabels[0] ?? "Programs" },
    { href: "/coverage", label: navLabels[1] ?? "Coverage" },
    { href: "/method", label: navLabels[2] ?? "Method" },
    { href: "/data", label: navLabels[3] ?? "Data" },
    { href: "/about", label: navLabels[4] ?? "About" },
  ];

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b border-cf-line bg-cf-deep/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={t("site.header.home")}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cf-gold/40 bg-cf-gold/10 shadow-[0_0_18px_-6px_rgba(217,164,65,0.5)] transition-transform group-hover:scale-105"
          >
            <Scale className="h-4 w-4 text-cf-gold" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-50">
            CivicClaim
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active
                    ? "text-cf-cyan"
                    : "text-zinc-400 hover:text-cf-cyan"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            asChild
            size="sm"
            className="hidden h-9 border border-cf-cyan/40 bg-cf-cyan/10 px-4 text-sm font-medium text-cf-cyan transition-colors hover:bg-cf-cyan/20 hover:text-white sm:inline-flex"
          >
            <Link href="/tools">
              {t("site.header.cta")}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-cf-line bg-transparent text-zinc-300 lg:hidden"
                aria-label={t("common.openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-cf-line bg-cf-base/95 backdrop-blur-md"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-cf-raised/60 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/tools"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-lg border border-cf-cyan/40 bg-cf-cyan/10 px-3 py-2.5 text-center text-sm font-medium text-cf-cyan"
                >
                  {t("site.header.cta")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
