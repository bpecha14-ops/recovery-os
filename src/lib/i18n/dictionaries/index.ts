import type { LocaleCode } from "../config";
import { en, type Dictionary } from "./en";
import { ru } from "./ru";

/**
 * Locale registry. Russian ships as a machine-translated partial
 * dictionary; the runtime falls back to English per missing key.
 */
export const dictionaries: Partial<Record<LocaleCode, Dictionary>> = {
  en,
  ru,
};
