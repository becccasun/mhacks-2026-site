// Set NEXT_PUBLIC_BASE_PATH (e.g. "/mhacks-2026-site") when deploying under a
// subpath such as GitHub Pages. lib/asset.ts reads the same variable so raw
// <img>/CSS asset URLs stay in sync with basePath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // macOS fs.watch (kqueue) EMFILE mitigation. Tell Watchpack to skip
      // heavy folders and use a polling-friendly aggregation window.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/screens/**",
          "**/scripts/**",
        ],
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
