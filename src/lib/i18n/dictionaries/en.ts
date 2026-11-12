import common from "./sections/common";
import header from "./sections/header";
import hero from "./sections/hero";
import how from "./sections/how";
import library from "./sections/library";
import channels from "./sections/channels";
import scanner from "./sections/scanner";
import settlements from "./sections/settlements";
import ieepa from "./sections/ieepa";
import pricing from "./sections/pricing";
import faq from "./sections/faq";
import waitlist from "./sections/waitlist";
import footer from "./sections/footer";
import claim from "./sections/claim";
import assistant from "./sections/assistant";
import guide from "./sections/guide";
import civic from "./sections/civic";
import tools from "./sections/tools";

/**
 * The English dictionary is the source of truth: every other locale file
 * is typed against it (`Dictionary`), so a missing key fails type-check.
 */
export const en = {
  common,
  header,
  hero,
  how,
  library,
  channels,
  scanner,
  settlements,
  ieepa,
  pricing,
  faq,
  waitlist,
  footer,
  claim,
  assistant,
  guide,
  civic,
  tools,
};

export type Dictionary = typeof en;
