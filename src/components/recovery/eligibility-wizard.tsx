"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n/context";
import {
  CATEGORY_LABELS,
  Program,
  ProgramCategory,
  REGIONS,
  RegionCode,
} from "@/lib/programs-data";
import {
  CriterionKey,
  Profile,
  emptyProfile,
  findMatches,
} from "@/lib/eligibility-engine";
import { Reveal } from "./effects";
import { ProgramCard } from "./program-card";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CircleHelp,
  Lock,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const CATEGORY_VALUES = Object.keys(CATEGORY_LABELS) as ProgramCategory[];
const SITUATIONS = ["senior", "disability", "veteran", "parent", "newcomer", "disaster", "farmer"] as const;

const REGION_COUNTRY = new Map<string, string[]>(
  REGIONS.map((r) => [r.code, r.countries]),
);

type Option = { value: string; label: string };

function useWizardDict() {
  const { t } = useI18n();
  return t;
}

/** Renders one profile question as accessible choice chips. */
function ChoiceQuestion({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border p-4 text-left text-sm transition-all ${
              active
                ? "border-amber-400/60 bg-amber-400/[0.09] text-amber-100 shadow-[0_0_24px_-12px_rgba(251,191,36,0.5)]"
                : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-amber-400/30 hover:text-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  active ? "border-amber-400 bg-amber-400" : "border-zinc-600"
                }`}
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />}
              </span>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/[0.04] p-3 text-xs leading-relaxed text-amber-200/80">
      <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/70" aria-hidden="true" />
      {text}
    </p>
  );
}

const CRITERION_LABELS: Record<CriterionKey, string> = {
  country: "Country",
  residency: "Residency status",
  age: "Age",
  income: "Income band",
  household: "Household with children",
  employment: "Employment",
  situation: "Life situation",
  housing: "Housing",
};

/** Explain why a criterion passed/failed in human terms. */
function reasonText(key: CriterionKey, ok: boolean | null): string {
  const label = CRITERION_LABELS[key];
  if (ok === true) return `${label}: satisfied`;
  if (ok === null) return `${label}: needs confirmation`;
  return `${label}: not satisfied for this program`;
}

export function EligibilityWizard({ onOpenClaim }: { onOpenClaim: (p: Program) => void }) {
  const t = useWizardDict();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  const countryOptions = useMemo<Option[]>(() => {
    if (!profile.region) return [];
    return (REGION_COUNTRY.get(profile.region) ?? []).map((c) => ({ value: c, label: c }));
  }, [profile.region]);

  const totalSteps = 9; // region, country, categories, age..housing
  const progressPct = Math.min(100, Math.round(((step + 1) / totalSteps) * 100));

  const matches = useMemo(
    () => (step >= totalSteps ? findMatches(profile) : []),
    [step, profile],
  );

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  if (!started) {
    return (
      <section id="eligibility" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
              <span className="hairline-gold w-8" aria-hidden="true" />
              {t("civic.wizard.eyebrow")}
              <span className="hairline-gold w-8" aria-hidden="true" />
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
              {t("civic.wizard.headingA")}{" "}
              <span className="text-gradient-gold">{t("civic.wizard.headingGold")}</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              {t("civic.wizard.lead")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                onClick={() => {
                  setStarted(true);
                  setStep(0);
                }}
              >
                <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("civic.wizard.start")}
              </Button>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Lock className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
                {t("civic.wizard.privacyNote")}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  const nav = (
    <div className="mt-8 flex items-center justify-between gap-3">
      <Button
        variant="outline"
        className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
        onClick={() => (step === 0 ? setStarted(false) : setStep((s) => s - 1))}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
        {t("civic.wizard.back")}
      </Button>
      {step < totalSteps - 1 && (
        <Button
          className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 hover:brightness-110"
          onClick={() => setStep((s) => s + 1)}
        >
          {t("civic.wizard.next")}
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
      )}
      {step === totalSteps - 1 && (
        <Button
          className="btn-shimmer bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 hover:brightness-110"
          onClick={() => setStep(totalSteps)}
        >
          {t("civic.wizard.seeResults")}
          <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );

  return (
    <section id="eligibility" className="relative scroll-mt-20 bg-zinc-950 py-20 sm:py-28">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Progress header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            {t("civic.wizard.eyebrow")}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              {step >= totalSteps
                ? t("civic.wizard.resultsTitle")
                : t("civic.wizard.stepOf", { n: step + 1, total: totalSteps })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-zinc-400 hover:text-amber-200"
              onClick={() => {
                setProfile(emptyProfile);
                setStep(0);
                setStarted(false);
              }}
            >
              <RotateCcw className="mr-1 h-3 w-3" aria-hidden="true" />
              {t("civic.wizard.restart")}
            </Button>
          </div>
        </div>
        <Progress value={step >= totalSteps ? 100 : progressPct} className="mt-3 h-1.5 bg-zinc-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-300 [&>div]:to-amber-500" />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="panel-black mt-8 rounded-2xl border-zinc-800">
              <CardContent className="p-6 sm:p-8">
                {step === 0 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qCountry")}
                    </legend>
                    <Hint text={t("civic.wizard.qCountryHint")} />
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {REGIONS.map((r) => {
                        const active = profile.region === r.code;
                        return (
                          <button
                            key={r.code}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              set("region", r.code as RegionCode);
                              set("country", null);
                            }}
                            className={`rounded-xl border p-4 text-left transition-all ${
                              active
                                ? "border-amber-400/60 bg-amber-400/[0.09] shadow-[0_0_24px_-12px_rgba(251,191,36,0.5)]"
                                : "border-zinc-800 bg-zinc-900/40 hover:border-amber-400/30"
                            }`}
                          >
                            <p className="text-sm font-semibold text-white">{r.name}</p>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-400">{r.note}</p>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qCountry")}
                    </legend>
                    <Hint text={t("civic.wizard.qCountryHint")} />
                    <div className="mt-5">
                      <ChoiceQuestion
                        name={t("civic.wizard.qCountry")}
                        options={countryOptions}
                        value={profile.country}
                        onChange={(v) => set("country", v)}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qCategories")}
                    </legend>
                    <Hint text={t("civic.wizard.qCategoriesHint")} />
                    <div className="mt-5 flex flex-wrap gap-2">
                      {CATEGORY_VALUES.map((c) => {
                        const active = profile.categories.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              set(
                                "categories",
                                active
                                  ? profile.categories.filter((x) => x !== c)
                                  : [...profile.categories, c],
                              )
                            }
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                              active
                                ? "border-amber-400/60 bg-amber-400/[0.12] text-amber-100"
                                : "border-zinc-700 bg-zinc-900/40 text-zinc-400 hover:border-amber-400/30 hover:text-zinc-200"
                            }`}
                          >
                            {CATEGORY_LABELS[c]}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <div>
                    <Label htmlFor="wiz-age" className="text-lg font-semibold text-white">
                      {t("civic.wizard.qAge")}
                    </Label>
                    <Hint text={t("civic.wizard.qAgeHint")} />
                    <Input
                      id="wiz-age"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={120}
                      value={profile.age ?? ""}
                      onChange={(e) => set("age", e.target.value ? Number(e.target.value) : null)}
                      placeholder="30"
                      className="mt-5 w-full max-w-48 border-amber-400/20 bg-zinc-900/60 text-lg text-zinc-100"
                    />
                  </div>
                )}

                {step === 4 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qResidency")}
                    </legend>
                    <Hint text={t("civic.wizard.qResidencyHint")} />
                    <div className="mt-5">
                      <ChoiceQuestion
                        name={t("civic.wizard.qResidency")}
                        options={[
                          { value: "citizen", label: t("civic.wizard.qResidencyOptions.citizen") },
                          { value: "permanent-resident", label: t("civic.wizard.qResidencyOptions['permanent-resident']") },
                          { value: "valid-visa", label: t("civic.wizard.qResidencyOptions['valid-visa']") },
                          { value: "other", label: t("civic.wizard.qResidencyOptions.other") },
                        ]}
                        value={profile.residency}
                        onChange={(v) => set("residency", v)}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 5 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qIncome")}
                    </legend>
                    <Hint text={t("civic.wizard.qIncomeHint")} />
                    <div className="mt-5">
                      <ChoiceQuestion
                        name={t("civic.wizard.qIncome")}
                        options={[
                          { value: "low", label: t("civic.wizard.qIncomeOptions.low") },
                          { value: "medium", label: t("civic.wizard.qIncomeOptions.medium") },
                          { value: "high", label: t("civic.wizard.qIncomeOptions.high") },
                          { value: "unsure", label: t("civic.wizard.qIncomeOptions.unsure") },
                        ]}
                        value={profile.income}
                        onChange={(v) => set("income", v)}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 6 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qHousehold")}
                    </legend>
                    <Hint text={t("civic.wizard.qHouseholdHint")} />
                    <div className="mt-5">
                      <ChoiceQuestion
                        name={t("civic.wizard.qHousehold")}
                        options={[
                          { value: "children", label: t("civic.wizard.qHouseholdOptions.children") },
                          { value: "no-children", label: t("civic.wizard.qHouseholdOptions['no-children']") },
                        ]}
                        value={profile.household}
                        onChange={(v) => set("household", v)}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 7 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qEmployment")}
                    </legend>
                    <Hint text={t("civic.wizard.qEmploymentHint")} />
                    <div className="mt-5">
                      <ChoiceQuestion
                        name={t("civic.wizard.qEmployment")}
                        options={[
                          { value: "employed", label: t("civic.wizard.qEmploymentOptions.employed") },
                          { value: "unemployed", label: t("civic.wizard.qEmploymentOptions.unemployed") },
                          { value: "retired", label: t("civic.wizard.qEmploymentOptions.retired") },
                          { value: "student", label: t("civic.wizard.qEmploymentOptions.student") },
                        ]}
                        value={profile.employment}
                        onChange={(v) => set("employment", v)}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 8 && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-white">
                      {t("civic.wizard.qSituations")}
                    </legend>
                    <Hint text={t("civic.wizard.qSituationsHint")} />
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {SITUATIONS.map((s) => {
                        const active = profile.situations.includes(s);
                        return (
                          <label
                            key={s}
                            htmlFor={`sit-${s}`}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-all ${
                              active
                                ? "border-amber-400/60 bg-amber-400/[0.09] text-amber-100"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-amber-400/30"
                            }`}
                          >
                            <Checkbox
                              id={`sit-${s}`}
                              checked={active}
                              onCheckedChange={(v) =>
                                set(
                                  "situations",
                                  v
                                    ? [...profile.situations, s]
                                    : profile.situations.filter((x) => x !== s),
                                )
                              }
                              aria-label={t(`civic.wizard.qSituationsOptions.${s}`)}
                            />
                            {t(`civic.wizard.qSituationsOptions.${s}`)}
                          </label>
                        );
                      })}
                    </div>
                    <div className="mt-8">
                      <p className="text-base font-semibold text-white">
                        {t("civic.wizard.qHousing")}
                      </p>
                      <Hint text={t("civic.wizard.qHousingHint")} />
                      <div className="mt-4">
                        <ChoiceQuestion
                          name={t("civic.wizard.qHousing")}
                          options={[
                            { value: "renter", label: t("civic.wizard.qHousingOptions.renter") },
                            { value: "homeowner", label: t("civic.wizard.qHousingOptions.homeowner") },
                            { value: "other", label: t("civic.wizard.qHousingOptions.other") },
                          ]}
                          value={profile.housing}
                          onChange={(v) => set("housing", v)}
                        />
                      </div>
                    </div>
                  </fieldset>
                )}

                {step >= totalSteps && (
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {t("civic.wizard.resultsTitle")}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300/80">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("civic.wizard.privacyNote")}
                    </p>
                    {matches.length === 0 ? (
                      <div className="panel-black mt-6 rounded-2xl p-8 text-center">
                        <p className="text-sm text-zinc-400">{t("civic.wizard.empty")}</p>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-8">
                        {(["match", "near-miss"] as const).map((group) => {
                          const items = matches.filter((m) => m.verdict === group);
                          if (items.length === 0) return null;
                          return (
                            <div key={group}>
                              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-400/90">
                                {group === "match" ? (
                                  <>
                                    <BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                                    {t("civic.wizard.matched")} ({items.length})
                                  </>
                                ) : (
                                  <>
                                    <CircleHelp className="h-4 w-4 text-amber-400" aria-hidden="true" />
                                    {t("civic.wizard.nearMiss")} ({items.length})
                                  </>
                                )}
                              </h4>
                              <div className="mt-4 grid gap-5 md:grid-cols-2">
                                {items.map((m) => (
                                  <ProgramCard
                                    key={m.program.id}
                                    program={m.program}
                                    onOpenClaim={onOpenClaim}
                                    reasons={
                                      group === "match"
                                        ? m.criteria
                                            .filter((c) => c.ok === true && c.key !== "country")
                                            .slice(0, 4)
                                            .map((c) => reasonText(c.key, true))
                                        : undefined
                                    }
                                    missing={m.unmet.map((c) => reasonText(c.key, false))}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {nav}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
