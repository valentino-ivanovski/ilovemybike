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
      }, 
      {
        protocol: "https",
        hostname: "www.burchda-official.com",
      },
      {
        protocol: "https",
        hostname: "burchda-official.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
