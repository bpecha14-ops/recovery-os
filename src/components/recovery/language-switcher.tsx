"use client";

import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";

/**
 * The 20-language switcher. Shown in the header (desktop + mobile);
 * the choice persists in localStorage and flips the page to RTL for
 * Arabic and Hebrew.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("common.language")}
        title={t("common.language")}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-amber-400/30 bg-transparent px-2.5 text-sm font-medium text-amber-200 transition-colors hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 ${className}`}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden text-xs font-semibold uppercase tracking-wider sm:inline">
          {locale}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="max-h-[22rem] w-52 overflow-y-auto border-amber-400/25 bg-zinc-950/98 backdrop-blur-xl"
      >
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            aria-label={l.label}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-300 focus:bg-amber-400/10 focus:text-amber-100"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {l.flag}
            </span>
            <span className="flex-1 truncate">{l.label}</span>
            {l.code === locale && (
              <Check className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
