"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

/**
 * "Report an error" — a public, standing invitation on every program
 * page. The published response time is part of the product's honesty
 * contract. The GitHub issue template is offered as the alternative
 * route; the form itself is a mailto hand-off (no server storage — see
 * /privacy).
 */

const ISSUE_URL = "https://github.com/bpecha14-ops/recovery-os/issues/new";

const FIELDS = [
  "Amount",
  "Deadline",
  "Eligibility rules",
  "Steps to claim",
  "Documents",
  "Source link",
  "Other",
] as const;

export function ReportError({
  programId,
  programName,
}: {
  programId: string;
  programName: string;
}) {
  const [sent, setSent] = useState(false);
  const [field, setField] = useState<string>("Amount");
  const [what, setWhat] = useState("");
  const [email, setEmail] = useState("");

  const subject = encodeURIComponent(`Error report: ${programName} (${programId}) — ${field}`);
  const body = encodeURIComponent(
    `Program: ${programName} (${programId})\nField: ${field}\n\nWhat is wrong:\n${what}\n\nOptional contact: ${email || "—"}\n`,
  );
  const mailto = `mailto:civicclaim-reports@users.noreply.github.com?subject=${subject}&body=${body}`;

  return (
    <section id="report" className="scroll-mt-24">
      <div className="panel-black rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
              <AlertTriangle
                className="h-4 w-4 text-amber-400"
                aria-hidden="true"
              />
              Spotted an error?
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Every figure links to its source — if the official page says
              something different, tell us. We respond within 5 working
              days.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100">
                Report an error
              </Button>
            </DialogTrigger>
            <DialogContent className="border-cf-line bg-cf-base/95 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Report an error</DialogTitle>
                <DialogDescription>
                  {programName} · response within 5 working days.
                </DialogDescription>
              </DialogHeader>
              {sent ? (
                <p className="flex items-start gap-2 rounded-lg border border-cf-teal/30 bg-cf-teal/10 p-3 text-sm text-cf-teal">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Your email draft is ready — press send in your mail app,
                  or use the issue template below. Thank you.
                </p>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = mailto;
                    setSent(true);
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="re-field">Which field is wrong?</Label>
                    <Select value={field} onValueChange={setField}>
                      <SelectTrigger id="re-field" className="border-cf-line bg-cf-deep/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-cf-line bg-cf-base">
                        {FIELDS.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="re-what">What&apos;s wrong?</Label>
                    <Textarea
                      id="re-what"
                      required
                      value={what}
                      onChange={(e) => setWhat(e.target.value)}
                      placeholder="The official page now says…"
                      className="min-h-24 border-cf-line bg-cf-deep/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="re-email">
                      Email (optional — only if you want a reply)
                    </Label>
                    <Input
                      id="re-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.org"
                      className="border-cf-line bg-cf-deep/60"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20"
                  >
                    Open error report
                  </Button>
                </form>
              )}
              <a
                href={ISSUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-cf-cyan"
              >
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                Prefer GitHub? Open an issue instead
              </a>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
