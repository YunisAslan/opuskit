import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Jost } from 'next/font/google'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { BagSheet } from '@/components/site/BagSheet'
import { CartProvider } from '@/components/site/cart'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { brand } from '@/content/copy'
import './globals.css'

// Gala Night: Bodoni Moda (display, optical size axis) with Jost (body and utility), self-hosted by next/font.
const bodoni = Bodoni_Moda({ variable: '--font-bodoni', subsets: ['latin'], axes: ['opsz'], display: 'swap' })
const jost = Jost({ variable: '--font-jost', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Maison Vey, five scents made by hand', template: '%s, Maison Vey' },
  description: brand.description,
}

export const viewport: Viewport = { themeColor: '#4A1119' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="flex min-h-svh flex-col">
        <CartProvider>
          <TooltipProvider>
            <a href="#main" className="type-caption sr-only z-50 bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
            <BagSheet />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </body>
    </html>
  )
}
