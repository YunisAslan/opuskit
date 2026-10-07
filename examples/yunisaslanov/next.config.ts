import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root: this project sits inside OpusKit, whose lockfile Turbopack would otherwise take as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
};

export default nextConfig;
