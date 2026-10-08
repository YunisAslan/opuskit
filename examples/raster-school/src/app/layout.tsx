import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Nav } from '@/components/site/Nav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { Raster } from '@/components/site/Raster'
import { ApplyProvider } from '@/components/site/Apply'
import { RevealObserver } from '@/components/site/RevealObserver'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/content/site'

// Zalando Sans (Google Fonts, SIL OFL), self-hosted: the variable file (wght 200–900, wdth 75–125), latin subset.
// next/font/local measures it to size the fallback, so nothing reflows when the face arrives.
const zalando = localFont({
  src: '../fonts/ZalandoSans-Variable-latin.woff2',
  weight: '200 900',
  style: 'normal',
  variable: '--font-zalando-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
  declarations: [{ prop: 'font-stretch', value: '75% 125%' }],
})

export const metadata: Metadata = {
  title: { default: `${site.name}: grids, letters and a poster of your own`, template: `%s, ${site.name}` },
  description: site.sentence,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1F35D6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={zalando.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full">
        <ApplyProvider>
          <a href="#main" className="type-utility fixed top-2 left-2 z-50 -translate-y-20 bg-(--color-text) px-4 py-3 text-(--color-background) focus-visible:translate-y-0">
            Skip to content
          </a>
          <Raster />
          <Nav />
          <div className="relative z-[1]">
            <main id="main">{children}</main>
            <SiteFooter />
          </div>
          <RevealObserver />
          <Toaster />
        </ApplyProvider>
      </body>
    </html>
  )
}
