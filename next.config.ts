import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        hostname: "127.0.0.1",
        port: "54321",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
