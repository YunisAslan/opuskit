import type { Metadata, Viewport } from 'next'
import { Hedvig_Letters_Sans, Hedvig_Letters_Serif } from 'next/font/google'
import { RevealObserver } from '@/components/motion/RevealObserver'
import { Nav } from '@/components/site/Nav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/content/site'
import './globals.css'

const serif = Hedvig_Letters_Serif({ variable: '--font-hedvig-letters-serif', subsets: ['latin'], weight: '400', display: 'swap' })
const sans = Hedvig_Letters_Sans({ variable: '--font-hedvig-letters-sans', subsets: ['latin'], weight: '400', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${site.name}: kelp forests, replanted by volunteers`, template: `%s | ${site.name}` },
  description: site.description,
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0F3F2E' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* reveals hide content only once script is running, so the site reads in full without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="type-utility press sr-only rounded-(--radius-button) bg-(--color-primary) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <Toaster />
      </body>
    </html>
  )
}
