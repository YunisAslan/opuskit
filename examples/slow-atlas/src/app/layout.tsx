import type { Metadata } from 'next'
import { Schibsted_Grotesk, Source_Serif_4 } from 'next/font/google'
import { PageCurtain } from '@/components/pieces/PageCurtain'
import { Preloader } from '@/components/pieces/Preloader'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/site/Providers'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/content/magazine'
import './globals.css'

const display = Schibsted_Grotesk({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-schibsted', display: 'swap' })
const body = Source_Serif_4({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Slow Atlas | Long-form travel essays', template: '%s | Slow Atlas' },
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Providers>
          <TooltipProvider delayDuration={300}>
            <a href="#main" className="type-utility sr-only z-50 bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
            <SiteHeader />
            <main id="main" className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster />
          </TooltipProvider>
          <PageCurtain />
          <Preloader brand="Slow Atlas" />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  )
}
