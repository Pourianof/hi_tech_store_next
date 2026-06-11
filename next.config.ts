import type { NextConfig } from "next";

const API_URL = process.env.API_SERVER_ADDRESS;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10MB",
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
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
    remotePatterns: API_URL ? [new URL(API_URL)] : [],
    unoptimized: true,
  },

  output: "standalone",
};

export default nextConfig;
