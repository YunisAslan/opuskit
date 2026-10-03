import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder: without it Turbopack walks up to OpusKit's lockfile and treats OpusKit as the root.
  turbopack: { root: new URL('.', import.meta.url).pathname },
  // A fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: 'export',
  // No image server in a static export: next/image picks from WebP sizes made ahead of time by scripts/media.sh.
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts', deviceSizes: [640, 1080, 1600, 2400], imageSizes: [320] },
};

export default nextConfig;
