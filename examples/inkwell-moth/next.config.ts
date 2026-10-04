import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: without it Turbopack walks up to OpusKit's lockfile and treats OpusKit as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
  // A fully static site: `next build` writes it to out/.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
