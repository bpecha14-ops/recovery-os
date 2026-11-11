/**
 * RecoveryOS i18n — currently English-only (deploy-slimmed).
 * To re-add languages: append an entry here, drop a dictionary file into
 * `dictionaries/`, and register it in `dictionaries/index.ts`.
 */

export interface LocaleMeta {
  code: string;
  /** Native name shown in the switcher. */
  label: string;
  /** Country flag emoji for the switcher. */
  flag: string;
  /** English name (used for the AI system prompt). */
  english: string;
}

export const LOCALES: readonly LocaleMeta[] = [
  { code: "en", label: "English", flag: "🇬🇧", english: "English" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const RTL_LOCALES: readonly string[] = [];

export const DEFAULT_LOCALE: LocaleCode = "en";

export const STORAGE_KEY = "recoveryos.locale";

export function isLocale(value: unknown): value is LocaleCode {
  return (
    typeof value === "string" && LOCALES.some((l) => l.code === value)
  );
}

export function localeMeta(code: string): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
