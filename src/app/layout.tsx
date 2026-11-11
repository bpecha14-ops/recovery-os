import type { Metadata } from "next";
// Self-hosted fonts (geist npm package): zero network at build time —
// next/font/google would fetch from Google during `next build`, which
// fails in network-restricted deploy runners.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CivicClaim OS — the free global navigator of people's rights and money",
  description:
    "Find official benefits, compensations, tax credits, refunds and unclaimed money across the US, Canada, Europe and Australia. Anonymous eligibility check, claim assistant with checklists, open data engine — free forever for individuals.",
  keywords: [
    "benefits finder",
    "government programs eligibility",
    "unclaimed money",
    "tax credits",
    "compensation claims",
    "class action claims for business",
    "IEEPA tariff refund",
    "lost superannuation",
    "civic tech open data",
  ],
  authors: [{ name: "CivicClaim OS" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "CivicClaim OS — the free global navigator of people's rights and money",
    description:
      "Official programs from the US, Canada, Europe and Australia: search, check eligibility anonymously, and file with a step-by-step claim assistant. Free for people; API and tools for organizations.",
    siteName: "CivicClaim OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
