import type { Metadata, Viewport } from 'next'
import { Zalando_Sans } from 'next/font/google'
import { ViewTransition } from 'react'
import './globals.css'
import { Nav, MobileBook } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { RevealObserver } from '@/components/RevealObserver'

const zalando = Zalando_Sans({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-zalando',
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: { default: 'KOFİİ — Coffee, made to order', template: '%s | KOFİİ' },
  description: 'A small coffee shop in Old Town. Espresso, iced drinks, matcha and cake, each one made to order.',
}

export const viewport: Viewport = { themeColor: '#CEDE91' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={zalando.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-svh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-button focus:bg-surface focus:px-4 focus:py-3">
          Skip to content
        </a>
        <Nav />
        <ViewTransition name="page">
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBook />
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  )
}
