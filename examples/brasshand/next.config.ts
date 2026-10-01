import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: `next build` writes every page to out/.
  output: 'export',
  // Pin the build root to this folder: without it Turbopack walks up to OpusKit's lockfile and treats OpusKit as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
};

export default nextConfig;
