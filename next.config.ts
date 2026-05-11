import type { NextConfig } from "next";

const API_URL = new URL(process.env.API_SERVER_ADDRESS!);

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10MB",
    },
  },
  turbopack: {
    rules: {
      "./src/assets/**/*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },

  images: {
    remotePatterns: [API_URL],
    unoptimized: true,
  },
};

export default nextConfig;
