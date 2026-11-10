"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  RTL_LOCALES,
  STORAGE_KEY,
  isLocale,
  type LocaleCode,
} from "./config";
import { dictionaries } from "./dictionaries";
import { en } from "./dictionaries/en";

type Vars = Record<string, string | number>;

export interface I18nValue {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  /** Translate a dot-path key, e.g. t("hero.title"). Falls back to English,
   *  then to the key itself. `{var}` placeholders interpolate from vars. */
  t: (path: string, vars?: Vars) => string;
  /** Fetch an array of structured items, e.g. tArr<{title: string}>("how.steps").
   *  Falls back to the English array. */
  tArr: <T = Record<string, string>>(path: string) => T[];
  /** Fetch any raw dictionary value (object, array or string). */
  tRaw: <T = unknown>(path: string) => T | undefined;
}

const I18nContext = createContext<I18nValue | null>(null);

function lookup(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Start with English on both server and client (no hydration mismatch),
  // then switch to the stored / browser locale right after mount.
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    let next: LocaleCode | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) next = stored;
    } catch {
      /* private mode — fall through to browser sniffing */
    }
    if (!next) {
      const langs =
        typeof navigator !== "undefined"
          ? (navigator.languages ?? [navigator.language])
          : [];
      for (const lang of langs) {
        const base = String(lang).toLowerCase().split("-")[0];
        const match = LOCALES.find((l) => l.code === base);
        if (match) {
          next = match.code;
          break;
        }
      }
    }
    if (next && next !== DEFAULT_LOCALE) {
      // Deferred one tick: avoids a synchronous setState-inside-effect
      // cascade while the first English frame is still on screen.
      const id = window.setTimeout(() => setLocaleState(next!), 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  // Keep <html lang> and text direction in sync (Arabic & Hebrew are RTL).
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale)
      ? "rtl"
      : "ltr";
  }, [locale]);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — selection just won't persist */
    }
  }, []);

  const t = useCallback(
    (path: string, vars?: Vars) => {
      const local = lookup(dictionaries[locale], path);
      const value =
        typeof local === "string" ? local : (lookup(en, path) as unknown);
      if (typeof value !== "string") return path;
      return interpolate(value, vars);
    },
    [locale]
  );

  const tArr = useCallback(
    <T,>(path: string): T[] => {
      const local = lookup(dictionaries[locale], path);
      const value = Array.isArray(local) ? local : lookup(en, path);
      return Array.isArray(value) ? (value as T[]) : [];
    },
    [locale]
  );

  const tRaw = useCallback(
    <T,>(path: string): T | undefined => {
      const local = lookup(dictionaries[locale], path);
      const value = local !== undefined ? local : lookup(en, path);
      return value as T | undefined;
    },
    [locale]
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t, tArr, tRaw }),
    [locale, setLocale, t, tArr, tRaw]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
