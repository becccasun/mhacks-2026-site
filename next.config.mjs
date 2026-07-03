/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
