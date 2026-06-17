import type { NextConfig, SizeLimit } from "next";

const API_URL = process.env.API_SERVER_ADDRESS;
const SUPABASE_STORAGE = process.env.SUPABASE_STORAGE_URL;

const remoteUrls = [API_URL, SUPABASE_STORAGE]
  .filter((url) => !!url?.trim())
  .map((url) => new URL(url!));

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit:
        process.env.NODE_ENV == "development"
          ? undefined
          : (process.env.BodySizeLimit as SizeLimit),
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
    remotePatterns: remoteUrls,
    unoptimized: true,
  },

  output: "standalone",
};

export default nextConfig;
