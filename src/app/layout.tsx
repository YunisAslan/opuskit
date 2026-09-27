import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Newsreader, Outfit } from 'next/font/google'
import { Footer, Header } from '@/components/SiteChrome'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap', style: ['normal', 'italic'] })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'OpusKit — Build websites worth remembering', template: '%s — OpusKit' },
  description: "Tell us what you want your website to feel like. We'll turn it into a buildable design recipe for Claude Code, Cursor, v0 or Lovable.",
}

export const viewport: Viewport = { themeColor: '#F5F0E6' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${newsreader.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
