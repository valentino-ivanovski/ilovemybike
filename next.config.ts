import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "www.orient-bikes.gr",
      },
      {
        protocol: "https",
        hostname: "www.bike-discount.de",
      },
      {
        protocol: "https",
        hostname: "www.shengmilo-bikes.com",
      }
    ],
  },
};

export default nextConfig;
