import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s1.ticketm.net",
        port: "",
        pathname: "/dam/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
