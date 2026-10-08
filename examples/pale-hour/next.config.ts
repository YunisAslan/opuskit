import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: OpusKit (one level up) has its own lockfile.
  turbopack: { root: new URL('.', import.meta.url).pathname },
  // AVIF first (smaller for detailed photographs such as brick and cobbles), WebP for browsers without it.
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
