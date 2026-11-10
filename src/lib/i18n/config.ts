/**
 * RecoveryOS i18n — the 20 launch locales.
 * More languages can be appended later: add an entry here, drop a dictionary
 * file into `dictionaries/`, and register it in `dictionaries/index.ts`.
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
  { code: "es", label: "Español", flag: "🇪🇸", english: "Spanish" },
  { code: "pt", label: "Português", flag: "🇧🇷", english: "Portuguese" },
  { code: "fr", label: "Français", flag: "🇫🇷", english: "French" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", english: "German" },
  { code: "it", label: "Italiano", flag: "🇮🇹", english: "Italian" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", english: "Dutch" },
  { code: "pl", label: "Polski", flag: "🇵🇱", english: "Polish" },
  { code: "uk", label: "Українська", flag: "🇺🇦", english: "Ukrainian" },
  { code: "ru", label: "Русский", flag: "🇷🇺", english: "Russian" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", english: "Turkish" },
  { code: "ar", label: "العربية", flag: "🇸🇦", english: "Arabic" },
  { code: "he", label: "עברית", flag: "🇮🇱", english: "Hebrew" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", english: "Hindi" },
  { code: "zh", label: "中文", flag: "🇨🇳", english: "Chinese (Simplified)" },
  { code: "ja", label: "日本語", flag: "🇯🇵", english: "Japanese" },
  { code: "ko", label: "한국어", flag: "🇰🇷", english: "Korean" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", english: "Vietnamese" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩", english: "Indonesian" },
  { code: "th", label: "ไทย", flag: "🇹🇭", english: "Thai" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const RTL_LOCALES: readonly string[] = ["ar", "he"];

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
