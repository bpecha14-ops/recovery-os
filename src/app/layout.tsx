import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecoveryOS — We find money your business forgot about",
  description:
    "RecoveryOS scans your purchases, tariffs and freight against every open refund channel — antitrust class settlements, IEEPA tariff refunds, duty drawback — then prepares and tracks claims until checks arrive. No recovery, no fee.",
  keywords: [
    "class action claims for business",
    "IEEPA tariff refund",
    "duty drawback",
    "antitrust settlement claims",
    "unclaimed money for business",
    "recovery audit software",
  ],
  authors: [{ name: "RecoveryOS" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "RecoveryOS — the recoveries department for small business",
    description:
      "Class action settlements. IEEPA tariff refunds. Duty drawback. We match your purchases against every open fund and file until checks arrive.",
    siteName: "RecoveryOS",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
