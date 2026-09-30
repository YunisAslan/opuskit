import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: without it Turbopack walks up to OpusKit's lockfile and treats OpusKit as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
  // Bottom corners hold the dock and phone tab bar.
  devIndicators: { position: "top-right" },
};

export default nextConfig;
