import type { LocaleCode } from "../config";
import { en, type Dictionary } from "./en";
import ar from "./ar";
import de from "./de";
import es from "./es";
import fr from "./fr";
import he from "./he";
import hi from "./hi";
import id from "./id";
import it from "./it";
import ja from "./ja";
import ko from "./ko";
import nl from "./nl";
import pl from "./pl";
import pt from "./pt";
import ru from "./ru";
import th from "./th";
import tr from "./tr";
import uk from "./uk";
import vi from "./vi";
import zh from "./zh";

/** All 20 launch locales. Missing locales would fall back to English. */
export const dictionaries: Partial<Record<LocaleCode, Dictionary>> = {
  en,
  ar,
  de,
  es,
  fr,
  he,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  pl,
  pt,
  ru,
  th,
  tr,
  uk,
  vi,
  zh,
};
