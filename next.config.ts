import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "https://preview-chat-6c63c6c2-eb47-46ff-ab96-4fc6bcab19bb.space-z.ai",
  ],
};

export default nextConfig;
