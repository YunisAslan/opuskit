import type { Metadata } from 'next'
import { Funnel_Display, Funnel_Sans } from 'next/font/google'
import { PageCurtain } from '@/components/pieces/PageCurtain'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { Nav } from '@/components/site/Nav'
import { RevealObserver } from '@/components/site/RevealObserver'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SignupLoader } from '@/components/site/SignupLoader'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const display = Funnel_Display({ variable: '--font-funnel-display', subsets: ['latin'] })
const sans = Funnel_Sans({ variable: '--font-funnel-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Hexmint: invoices, expenses and quarterly books for small studios', template: '%s | Hexmint' },
  description: 'Invoices, expenses and quarterly books for small studios. Set up in five minutes, closed in one click.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal styles hide content only once we know JS will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <TooltipProvider delayDuration={200}>
          <a href="#main" className="type-utility sr-only z-[60] rounded-(--radius-button) bg-(--color-primary) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <SiteFooter />
          <SignupLoader />
          <Toaster position="bottom-center" />
          <RevealObserver />
          <PageCurtain />
          <SmoothScroll />
        </TooltipProvider>
      </body>
    </html>
  )
}
