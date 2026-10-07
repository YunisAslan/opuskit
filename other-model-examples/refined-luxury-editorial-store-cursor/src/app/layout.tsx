import type { Metadata } from 'next'
import { Bodoni_Moda, Jost } from 'next/font/google'
import './globals.css'
import { site } from '@/config/site'
import { Providers } from './providers'
import { Navbar } from '@/components/chrome/Navbar'
import { Footer } from '@/components/chrome/Footer'

// Gala Night lettering: Bodoni Moda for display and headings, Jost for body and utility.
const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni', display: 'swap' })
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://maisonvey.example'),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="min-h-svh">
        <Providers>
          <a
            href="#main"
            className="type-body sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-(--color-primary) focus:px-4 focus:py-2 focus:text-(--color-background)"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}