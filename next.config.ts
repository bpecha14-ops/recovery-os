import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Next.js 16 compares the request's bare hostname (no protocol) against
  // these entries, so they must be hostnames/wildcards — never full URLs.
  // `*.space-z.ai` covers every preview subdomain across sessions.
  allowedDevOrigins: [
    "*.space-z.ai",
    "space-z.ai",
    "localhost",
    "*.localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
