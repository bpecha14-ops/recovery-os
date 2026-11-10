"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n/context";
import { Loader2 } from "lucide-react";

interface ClaimDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: string;
  source: string;
}

export function ClaimDialog({ open, onOpenChange, context, source }: ClaimDialogProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { t, tArr } = useI18n();
  const nextSteps = tArr<string>("claim.nextSteps");
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: t("claim.invalidEmailTitle"),
        description: t("claim.invalidEmailBody"),
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: company || undefined, source }),
      });
      if (!res.ok) throw new Error("request failed");
      setDone(true);
      toast({
        title: t("claim.queuedTitle"),
        description: t("claim.queuedBody"),
      });
    } catch {
      toast({
        title: t("claim.errorTitle"),
        description: t("claim.errorBody"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) {
          setDone(false);
          setEmail("");
          setCompany("");
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {done ? t("claim.titleDone") : t("claim.title")}
          </DialogTitle>
          <DialogDescription>
            {done
              ? t("claim.descriptionDone")
              : context
                ? t("claim.descriptionContext", { context })
                : t("claim.descriptionDefault")}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/[0.07] p-4 text-sm text-emerald-200/90">
            <p className="font-medium text-emerald-300">{t("claim.nextStepsTitle")}</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claim-email">{t("claim.emailLabel")}</Label>
              <Input
                id="claim-email"
                type="email"
                placeholder={t("claim.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claim-company">{t("claim.companyLabel")}</Label>
              <Input
                id="claim-company"
                placeholder={t("claim.companyPlaceholder")}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="btn-shimmer w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 shadow-[0_0_32px_-10px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t("claim.submitting") : t("claim.submit")}
              </Button>
            </DialogFooter>
            <p className="text-center text-xs text-muted-foreground">
              {t("claim.footerNote")}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
