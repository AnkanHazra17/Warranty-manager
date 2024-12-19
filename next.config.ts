import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://140.138.41.76:7070/api/:path*",
      },
    ];
  },
  output: "export",
  distDir: "dist",
};

export default nextConfig;
