import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["profile.line-scdn.net"],
  },
};

export default nextConfig;
