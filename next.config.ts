import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // public/live/{slug}/ holds static exports whose pages are written as `about.html` but linked as `/about`.
  // public/ files are exact-match, so map the extensionless link onto its file (only when nothing else matched).
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: '/live/:slug', destination: '/live/:slug/index.html' },
        { source: '/live/:slug/:path*', destination: '/live/:slug/:path*.html' },
      ],
    }
  },
}

export default nextConfig
