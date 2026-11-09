"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Coins, Menu, ArrowRight } from "lucide-react";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#library", label: "World library" },
  { href: "#channels", label: "Channels" },
  { href: "#scanner", label: "Free scanner" },
  { href: "#settlements", label: "Open claims" },
  { href: "#ieepa", label: "Tariff refund" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      {/* Gold scroll progress — quiet luxury detail */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="group flex items-center gap-2.5" aria-label="RecoveryOS home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_20px_-4px_rgba(251,191,36,0.6)] transition-transform group-hover:scale-105">
            <Coins className="h-4 w-4 text-zinc-950" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            RecoveryOS
          </span>
          <span className="hidden rounded-md border border-amber-400/25 bg-amber-400/[0.08] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300/90 sm:inline-block">
            Beta
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-amber-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#scanner" className="hidden sm:block">
            <Button className="btn-shimmer h-9 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-8px_rgba(251,191,36,0.7)] transition-all hover:brightness-110">
              Run a free scan
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-amber-400/30 bg-transparent text-amber-200 hover:bg-amber-400/10 hover:text-amber-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-amber-400/[0.16] bg-[#0a0a0c] text-zinc-100"
            >
              <SheetTitle className="text-left text-white">RecoveryOS</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-amber-200/60 transition-colors hover:bg-amber-400/[0.08] hover:text-amber-200"
                  >
                    {item.label}
                  </a>
                ))}
                <a href="#scanner" onClick={() => setOpen(false)} className="mt-3">
                  <Button className="w-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 font-semibold text-zinc-950 hover:brightness-110">
                    Run a free scan
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
