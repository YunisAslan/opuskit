import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Pins this project as its own build root — without it, Turbopack walks up and finds
  // OpusKit's lockfile, misidentifies OpusKit as the workspace root, and scopes file
  // tracing there instead of here (this is what wiped OpusKit's node_modules/.next once).
  turbopack: { root: new URL(".", import.meta.url).pathname },
};

export default nextConfig;
