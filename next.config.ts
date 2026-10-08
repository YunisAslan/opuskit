import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // public/live/{slug}/ holds static exports whose pages are written as `about.html` but linked as `/about`.
  // public/ files are exact-match, so map the extensionless link onto its file (only when nothing else matched).
  // Retired 2026-10-07 (the redesign): the kit, accounts, pricing and the old explore/recipe pages. Old links land on
  // what replaced them — a /kit?from=… link opens that recipe in the building steps.
  async redirects() {
    return [
      { source: '/kit', destination: '/studio/open', permanent: false },
      { source: '/kit/:path*', destination: '/library', permanent: false },
      { source: '/create', destination: '/library', permanent: false },
      { source: '/studio', destination: '/studio/direction', permanent: false },
      // Retired 2026-10-08 (decision 39): pages come from the kind of site and the sentence.
      { source: '/studio/pages', destination: '/studio/direction', permanent: false },
      { source: '/studio/brand', destination: '/studio/direction', permanent: false },
      { source: '/recipe/:slug', destination: '/studio/open?from=seed::slug', permanent: false },
      { source: '/:page(explore|resources)', destination: '/library', permanent: false },
      { source: '/:page(pricing|login|signup|account)', destination: '/', permanent: false },
      // Retired 2026-10-08: every built site has its page in the Library. Only a slug (no dot), so /examples/{slug}.jpg
      // and the symlinked /examples/{slug}/media/… stay files.
      { source: '/examples', destination: '/library', permanent: false },
      { source: '/examples/:slug([a-z0-9-]+)', destination: '/library/sites/example/:slug', permanent: false },
    ]
  },
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
