// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['coin-images.coingecko.com','aceternity.com'], // Allow images from this domain
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
