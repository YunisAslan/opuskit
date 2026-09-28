import type { Metadata, Viewport } from 'next'
import { ViewTransition } from 'react'
import { Anybody, Spectral } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { assets } from '@/config/assets'
import './globals.css'

const anybody = Anybody({ subsets: ['latin'], axes: ['wdth'], variable: '--font-anybody', display: 'swap' })
const spectral = Spectral({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-spectral', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: { default: 'CHEEKY, a fashion house for the 911', template: '%s | CHEEKY' },
  description: 'Porsche 911s, filmed and shown like a collection. Selected cars, one season at a time.',
}

export const viewport: Viewport = { themeColor: '#4A1119' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${spectral.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-surface focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Navigation />
        <ViewTransition>
          <main id="main" className="page-sheet min-h-svh">{children}</main>
        </ViewTransition>
        <Footer />
        <div aria-hidden className="grain" style={{ backgroundImage: `url(${assets.texture.src})` }} />
        <SmoothScroll />
      </body>
    </html>
  )
}
