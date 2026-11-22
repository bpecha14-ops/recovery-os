import type { Metadata, Viewport } from "next";
// Self-hosted fonts (@fontsource): zero network at build time —
// next/font/google would fetch from Google during `next build`, which
// fails in network-restricted deploy runners. IBM Plex Sans/Mono for UI
// and verifiable data, Source Serif 4 for official quotes only.
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/lib/i18n/context";
import { AmbientBackground } from "@/components/civic/ambient-background";
import { SiteHeader } from "@/components/civic/site-header";
import { SiteFooter } from "@/components/civic/site-footer";
import { AiGuide } from "@/components/recovery/ai-guide";
import { LazyAiAssistant } from "@/components/recovery/lazy-mounts";

export const metadata: Metadata = {
  title: {
    default: "CivicClaim — find out what you're owed under official programs",
    template: "%s | CivicClaim",
  },
  description:
    "Free and private. Every answer carries an official source, a verification date, and the next step. No source — no result.",
  applicationName: "CivicClaim",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "CivicClaim — find out what you're owed under official programs",
    description:
      "Official benefits, compensations, tax credits, refunds and unclaimed money — with a source and verification date on every answer. Free forever for individuals.",
    siteName: "CivicClaim",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060B18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <I18nProvider>
          {/* Living backdrop — shared by every page (aria-hidden). */}
          <AmbientBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          {/* Goldie — the constrained AI guide, available from any page. */}
          <AiGuide />
          <LazyAiAssistant />
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
