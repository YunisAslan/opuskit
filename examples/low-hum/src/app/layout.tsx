import type { Metadata, Viewport } from 'next'
import { Gloock, Figtree } from 'next/font/google'
import { ViewTransition } from 'react'
import './globals.css'
import { MotionRoot } from '@/components/site/MotionRoot'
import { Navbar } from '@/components/site/Navbar'
import { SiteFooter } from '@/components/site/SiteFooter'
import { StickyBook } from '@/components/site/StickyBook'
import { Toaster } from '@/components/ui/sonner'
import { brand } from '@/content/site'

const gloock = Gloock({ weight: '400', subsets: ['latin'], variable: '--font-gloock', display: 'swap' })
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Low Hum — listening bar, small plates until late', template: '%s at Low Hum' },
  description: brand.offer,
}

export const viewport: Viewport = { themeColor: '#2A1A14' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${gloock.variable} ${figtree.variable}`}>
      <body className="type-body">
        <a href="#main" className="type-utility sr-only z-[60] rounded-(--radius-button) bg-(--color-primary) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <MotionRoot>
          <Navbar />
          <ViewTransition>
            <main id="main">{children}</main>
          </ViewTransition>
          <SiteFooter />
          <StickyBook />
        </MotionRoot>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
