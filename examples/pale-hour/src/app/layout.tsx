import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { ViewTransition } from 'react'
import './globals.css'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/content/site'

// Self-hosted from src/fonts (Google Fonts, SIL OFL), exposed under the variables tokens.css reads.
const prata = localFont({ src: '../fonts/Prata-Regular.ttf', weight: '400', variable: '--font-prata', display: 'swap', fallback: ['Georgia', 'serif'] })
const publicSans = localFont({
  src: [
    { path: '../fonts/PublicSans-VariableFont_wght.ttf', weight: '100 900', style: 'normal' },
    { path: '../fonts/PublicSans-Italic-VariableFont_wght.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-public-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: { default: `${site.name}, photography gallery and bookshop`, template: `%s, ${site.name}` },
  description: site.description,
}

export const viewport: Viewport = { themeColor: '#DAD8DB' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${prata.variable} ${publicSans.variable}`}>
      <head>
        <noscript><style>{'[data-reveal] .rv,[data-reveal].rv,[data-reveal] .rv-img,[data-reveal] .rv-text{clip-path:none!important;translate:none!important;opacity:1!important}[data-reveal] .rv-img>*{scale:none!important}'}</style></noscript>
      </head>
      <body className="type-body min-h-svh">
        <a href="#main" className="type-utility sr-only z-[200] bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <SiteHeader />
        <ViewTransition default="page">
          <main id="main">{children}</main>
        </ViewTransition>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}
