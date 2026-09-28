import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Pins this project as its own build root — without it, Turbopack walks up and finds
  // OpusKit's lockfile, misidentifies OpusKit as the workspace root, and scopes file
  // tracing there instead of here (this once wiped OpusKit's own node_modules/.next).
  turbopack: { root: new URL(".", import.meta.url).pathname },
};

export default nextConfig;
