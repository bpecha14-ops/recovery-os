"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, CountUp, GoldenStream } from "./effects";

// Stable ids and values submitted to the API — display labels come from the dictionary.
const CHANNEL_IDS = ["settlements", "ieepa", "drawback", "freight"];

const VOLUME_VALUES = ["Under $10K", "$10–50K", "$50–250K", "$250K–1M", "Over $1M"];

export function Waitlist() {
  const { t, tArr } = useI18n();
  const perks = tArr<string>("waitlist.perks");
  const volumeLabels = tArr<string>("waitlist.volumeOptions");
  const channelLabels = tArr<string>("waitlist.channelOptions");

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState<string>("");
  const [channels, setChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: t("waitlist.invalidEmailTitle"),
        description: t("waitlist.invalidEmailDescription"),
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: company || undefined,
          volume: volume || undefined,
          channels: channels.join(", ") || undefined,
          source: "waitlist",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
      toast({
        title: t("waitlist.joinedToastTitle"),
        description: t("waitlist.joinedToastDescription"),
      });
    } catch {
      toast({
        title: t("waitlist.errorToastTitle"),
        description: t("waitlist.errorToastDescription"),
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleChannel(id: string) {
    setChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  return (
    <section id="waitlist" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.55} />
      <div
        aria-hidden="true"
        className="aurora-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 36% at 50% 100%, rgba(251,191,36,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <Card className="panel-black panel-beam animate-glow overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="relative overflow-hidden bg-black p-8 text-white lg:col-span-2 sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(70% 55% at 18% 0%, rgba(251,191,36,0.18) 0%, transparent 58%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
                />
                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                    {t("waitlist.eyebrow")}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {t("waitlist.headingA")}{" "}
                    <span className="text-gradient-gold">{t("waitlist.headingGold")}</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {t("waitlist.lead")}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                      {perks[0] ?? ""}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                      {perks[1] ?? ""}
                    </li>
                  </ul>

                  {/* Spots progress — filling live */}
                  <div className="mt-7 rounded-xl border border-amber-400/[0.16] bg-[#050506] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-amber-300/70">
                        {t("waitlist.spotsClaimed")}
                      </p>
                      <p className="tabular text-sm font-bold text-gradient-gold">
                        <CountUp to={21} duration={1.4} ssrValue /> / 50
                      </p>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-amber-400/[0.08]">
                      <div
                        className="grow-bar h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.55)]"
                        style={{ width: "42%" }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                      {t("waitlist.spotsNote")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:col-span-3 sm:p-10">
                {done ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-12 w-12 text-amber-400" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {t("waitlist.successTitle")}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                      {t("waitlist.successText")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="wl-email" className="text-zinc-300">{t("waitlist.emailLabel")}</Label>
                        <Input
                          id="wl-email"
                          type="email"
                          placeholder={t("waitlist.emailPlaceholder")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wl-company" className="text-zinc-300">{t("waitlist.companyLabel")}</Label>
                        <Input
                          id="wl-company"
                          placeholder={t("waitlist.companyPlaceholder")}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wl-volume" className="text-zinc-300">{t("waitlist.volumeLabel")}</Label>
                      <Select value={volume} onValueChange={setVolume}>
                        <SelectTrigger id="wl-volume" className="w-full">
                          <SelectValue placeholder={t("waitlist.volumePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {VOLUME_VALUES.map((v, i) => (
                            <SelectItem key={v} value={v}>
                              {volumeLabels[i] ?? v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">{t("waitlist.channelsLabel")}</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {CHANNEL_IDS.map((id, i) => (
                          <label
                            key={id}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-400/[0.16] bg-[#050506] px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-amber-400/40 hover:bg-amber-400/[0.05] has-[:checked]:border-amber-400/60 has-[:checked]:bg-amber-400/10"
                          >
                            <Checkbox
                              checked={channels.includes(id)}
                              onCheckedChange={() => toggleChannel(id)}
                            />
                            {channelLabels[i] ?? ""}
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="btn-shimmer w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_36px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                      {loading ? t("waitlist.savingLabel") : t("waitlist.submitLabel")}
                    </Button>
                    <p className="text-center text-xs text-zinc-600">
                      {t("waitlist.privacyNote")}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
