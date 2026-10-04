import type { Metadata } from 'next'
import { Big_Shoulders, Hanken_Grotesk } from 'next/font/google'
import { ViewTransition } from 'react'
import { Reveals } from '@/components/Reveals'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const display = Big_Shoulders({ subsets: ['latin', 'latin-ext'], axes: ['opsz'], variable: '--font-big-shoulders', display: 'swap' })
const body = Hanken_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-hanken', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Kür Delta Watch — 2,140 tonnes out of the river so far', template: '%s — Kür Delta Watch' },
  description: 'A volunteer river watch in Neftchala, where the Kür meets the Caspian: we pull rubbish out of the river, test the water every month and publish what we find.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="type-utility sr-only z-50 bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <SiteHeader />
        <ViewTransition default="page">
          <main id="main" className="flex-1">{children}</main>
        </ViewTransition>
        <SiteFooter />
        <Reveals />
        <Toaster />
      </body>
    </html>
  )
}
