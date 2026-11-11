import type { LocaleCode } from "../config";
import { en, type Dictionary } from "./en";

/**
 * Deploy-slimmed registry: English only for now.
 * To re-add a language, import its file and register it here.
 */
export const dictionaries: Partial<Record<LocaleCode, Dictionary>> = {
  en,
};
