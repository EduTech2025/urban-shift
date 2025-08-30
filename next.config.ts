import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"], // ✅ allow picsum.photos
  },
};

export default nextConfig;
