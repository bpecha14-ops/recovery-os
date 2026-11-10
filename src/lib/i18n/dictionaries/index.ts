import type { LocaleCode } from "../config";
import { en, type Dictionary } from "./en";

/** Every landed locale registers here. Missing locales fall back to English. */
export const dictionaries: Partial<Record<LocaleCode, Dictionary>> = {
  en,
};
