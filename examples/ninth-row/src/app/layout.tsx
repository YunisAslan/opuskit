import type { Metadata, Viewport } from 'next'
import { Sofia_Sans, Sofia_Sans_Condensed, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { PageCurtain } from '@/components/pieces/PageCurtain'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/content/site'

const display = Sofia_Sans_Extra_Condensed({ subsets: ['latin'], weight: ['700'], variable: '--font-sofia-sans-extra-condensed', display: 'swap' })
const body = Sofia_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sofia-sans', display: 'swap' })
const utility = Sofia_Sans_Condensed({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-sofia-sans-condensed', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Ninth Row — arthouse cinema, a film every night', template: '%s — Ninth Row' },
  description: site.promise,
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#040404' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${utility.variable}`}>
      <body>
        <a href="#main" className="type-utility sr-only z-[95] bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Skip to content</a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <div aria-hidden className="grain" />
        <Toaster />
        <PageCurtain />
      </body>
    </html>
  )
}
