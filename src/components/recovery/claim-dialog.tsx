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
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: "Enter a valid email",
        description: "We need one address to send your claim pack to.",
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
        title: "You're in the queue",
        description:
          "We'll reach out with your claim pack and the exact documents needed.",
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
            {done ? "Claim pack requested" : "Claim with RecoveryOS"}
          </DialogTitle>
          <DialogDescription>
            {done
              ? "Check your inbox — we only ask for the documents the administrator actually requires."
              : context
                ? `We'll prepare the paperwork for ${context} and confirm every deadline with the official administrator. You pay only when funds arrive.`
                : "We'll prepare the paperwork, confirm deadlines with the official administrator, and file until funds arrive. You pay only when money lands in your account."}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/[0.07] p-4 text-sm text-emerald-200/90">
            <p className="font-medium text-emerald-300">Next steps</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Send us your purchase evidence (invoices / exports).</li>
              <li>We validate the claim and quote the success fee in writing.</li>
              <li>Funds always flow directly to your business account.</li>
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claim-email">Work email</Label>
              <Input
                id="claim-email"
                type="email"
                placeholder="cfo@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claim-company">Company</Label>
              <Input
                id="claim-company"
                placeholder="Company name"
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
                {loading ? "Saving…" : "Get my claim pack"}
              </Button>
            </DialogFooter>
            <p className="text-center text-xs text-muted-foreground">
              No recovery, no fee. You can always file yourself via the official
              administrator — we link to every fund.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
