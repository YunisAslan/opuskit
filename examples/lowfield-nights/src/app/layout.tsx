import type { Metadata, Viewport } from 'next'
import { Albert_Sans, Newsreader } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/site/Nav'
import { ScrollFilm } from '@/components/site/ScrollFilm'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { StopIndex } from '@/components/site/StopIndex'
import { PageCurtain } from '@/components/pieces/PageCurtain'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

const newsreader = Newsreader({ variable: '--font-newsreader', subsets: ['latin'], style: ['normal', 'italic'], display: 'swap' })
const albert = Albert_Sans({ variable: '--font-albert', subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Lowfield Nights — Silent films, live scores, 12–14 June', template: '%s — Lowfield Nights' },
  description: 'Three nights of silent films with live scores in a disused hangar on the Absheron coast, 12–14 June 2027. Entry free with an RSVP.',
}

export const viewport: Viewport = { themeColor: '#303030', colorScheme: 'dark' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${albert.variable}`}>
      <body className="min-h-svh">
        <TooltipProvider delayDuration={300}>
          <a href="#main" className="type-utility sr-only z-[60] bg-(--color-primary) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <ScrollFilm />
          <Nav />
          <main id="main">{children}</main>
          <SiteFooter />
          <StopIndex />
        </TooltipProvider>
        <Toaster position="bottom-center" />
        <PageCurtain />
        <SmoothScroll />
      </body>
    </html>
  )
}
