import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: OpusKit (one level up) has its own lockfile.
  turbopack: { root: new URL('.', import.meta.url).pathname },
};

export default nextConfig;
