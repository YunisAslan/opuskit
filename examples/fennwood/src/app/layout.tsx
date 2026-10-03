import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { ViewTransition, type ReactNode } from 'react'
import './globals.css'
import { Nav } from '@/components/Nav'
import { SiteFooter } from '@/components/SiteFooter'
import { TravellingMotif } from '@/components/Motif'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/config/site'

const rubik = Rubik({ variable: '--font-rubik', subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Fennwood, a wood-fire kitchen in Bristol', template: '%s at Fennwood' },
  description: site.description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={rubik.variable}>
      <body>
        <TooltipProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-(--radius-button) focus:bg-(--color-text) focus:px-4 focus:py-3 focus:text-(--color-background)">Skip to content</a>
          <Nav />
          <TravellingMotif />
          <ViewTransition>{children}</ViewTransition>
          <SiteFooter />
          <Toaster position="bottom-center" />
        </TooltipProvider>
      </body>
    </html>
  )
}
