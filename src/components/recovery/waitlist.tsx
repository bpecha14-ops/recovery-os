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
import { Reveal, CountUp } from "./effects";

const CHANNEL_OPTIONS = [
  { id: "settlements", label: "Class action settlements" },
  { id: "ieepa", label: "IEEPA tariff refunds" },
  { id: "drawback", label: "Duty drawback" },
  { id: "freight", label: "Freight & parcel audits" },
];

const VOLUMES = ["Under $10K", "$10–50K", "$50–250K", "$250K–1M", "Over $1M"];

export function Waitlist() {
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
      toast({ title: "Enter a valid email", description: "One address is enough." });
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
        title: "You're on the list",
        description: "Launch spots go in order of signup. Watch your inbox.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
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
                    Launch list
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Found money should find{" "}
                    <span className="text-gradient-gold">you first.</span>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    Launch spots include 12 months of monitoring free,
                    founding-member success fee pricing (8%), and a first-pass
                    scan of your 2024–2026 purchases against every open fund.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                      No card, no commitment
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                      Cancel anytime once live
                    </li>
                  </ul>

                  {/* Spots progress — filling live */}
                  <div className="mt-7 rounded-xl border border-amber-400/[0.16] bg-[#050506] p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-amber-300/70">
                        Launch spots claimed
                      </p>
                      <p className="tabular text-sm font-bold text-gradient-gold">
                        <CountUp to={21} duration={1.4} /> / 50
                      </p>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-amber-400/[0.08]">
                      <div
                        className="grow-bar h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.55)]"
                        style={{ width: "42%" }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                      Spots go in order of signup — the bar only moves one way.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:col-span-3 sm:p-10">
                {done ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-12 w-12 text-amber-400" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      You're in. Welcome aboard.
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                      We'll send your launch onboarding and the document
                      checklist for the funds closest to closing. If you
                      imported anything under the 2025 tariffs, reply with a
                      rough duty figure and we'll start the IEEPA estimate.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="wl-email" className="text-zinc-300">Work email *</Label>
                        <Input
                          id="wl-email"
                          type="email"
                          placeholder="cfo@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wl-company" className="text-zinc-300">Company</Label>
                        <Input
                          id="wl-company"
                          placeholder="Company name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wl-volume" className="text-zinc-300">Monthly purchase volume</Label>
                      <Select value={volume} onValueChange={setVolume}>
                        <SelectTrigger id="wl-volume" className="w-full">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          {VOLUMES.map((v) => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Which recoveries interest you?</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {CHANNEL_OPTIONS.map((c) => (
                          <label
                            key={c.id}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-400/[0.16] bg-black/40 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-amber-400/40 hover:bg-amber-400/[0.05] has-[:checked]:border-amber-400/60 has-[:checked]:bg-amber-400/10"
                          >
                            <Checkbox
                              checked={channels.includes(c.id)}
                              onCheckedChange={() => toggleChannel(c.id)}
                            />
                            {c.label}
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
                      {loading ? "Saving…" : "Claim my launch spot"}
                    </Button>
                    <p className="text-center text-xs text-zinc-600">
                      We email about your money, nothing else. One click to leave.
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
