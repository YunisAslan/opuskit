import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A fully static site: `next build` writes every page to out/.
  output: 'export',
  images: { unoptimized: true },
  // Pin the build root to this folder: without it Turbopack walks up to OpusKit's lockfile and treats OpusKit as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
};

export default nextConfig;
