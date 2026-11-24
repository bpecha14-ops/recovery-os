"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Scale, AlertTriangle } from "lucide-react";

/**
 * CivicClaim global footer — license note, repository, the trust pages,
 * the standing "Report an error" invitation and the single quiet link
 * for organizations.
 */

const REPO_URL = "https://github.com/bpecha14-ops/recovery-os";

export function SiteFooter() {
  const { locale, t } = useI18n();

  return (
    <footer className="no-print relative border-t border-cf-line bg-cf-deep/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-cf-gold/40 bg-cf-gold/10"
              >
                <Scale className="h-3.5 w-3.5 text-cf-gold" />
              </span>
              <span className="font-semibold tracking-tight text-zinc-50">
                CivicClaim
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              {t("site.footer.licenseNote")}
            </p>
            {locale !== "en" && (
              <p className="mt-3 font-mono text-[11px] text-zinc-500">
                {t("site.footer.translatedNote")}
              </p>
            )}
          </div>

          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3"
            aria-label="Footer"
          >
            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.privacy")}
              </Link>
              <Link href="/terms" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.terms")}
              </Link>
              <Link
                href="/contribute#report"
                className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-cf-cyan"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400/80" aria-hidden="true" />
                {t("site.footer.report")}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/method" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.method")}
              </Link>
              <Link href="/data" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.data")}
              </Link>
              <Link href="/impact" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.impact")}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contribute" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.contribute")}
              </Link>
              <Link href="/business" className="text-zinc-400 transition-colors hover:text-cf-cyan">
                {t("site.footer.organizations")}
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-500 transition-colors hover:text-cf-cyan"
              >
                github.com/bpecha14-ops/recovery-os
              </a>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-cf-line pt-6 font-mono text-[11px] text-zinc-600">
          {t("site.footer.infoNote")}
        </p>
      </div>
    </footer>
  );
}
