import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: OpusKit (one level up) has its own lockfile.
  turbopack: { root: new URL('.', import.meta.url).pathname },
  // A static site: `next build` writes every page to out/.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
