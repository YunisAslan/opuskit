import type { Metadata } from 'next'
import { Bellefair, Red_Hat_Display, Red_Hat_Text } from 'next/font/google'
import { Header } from '@/components/Header'
import { Reveals } from '@/components/Reveals'
import { SiteFooter } from '@/components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const bellefair = Bellefair({ weight: '400', subsets: ['latin'], variable: '--font-bellefair' })
const rhText = Red_Hat_Text({ subsets: ['latin'], variable: '--font-rh-text' })
const rhDisplay = Red_Hat_Display({ subsets: ['latin'], weight: ['500'], variable: '--font-rh-display' })

export const metadata: Metadata = {
  title: { default: 'Hane, physiotherapy and slow movement', template: '%s at Hane' },
  description: 'A small physiotherapy and slow-movement studio in Islington: hands-on treatment, then exercises you can keep doing at home.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${bellefair.variable} ${rhText.variable} ${rhDisplay.variable}`}>
      <head>
        {/* Hide reveal targets before first paint, only when JavaScript runs (so nothing stays hidden without it). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-on')" }} />
      </head>
      <body className="type-body pb-[68px] lg:pb-0">
        <TooltipProvider delayDuration={200}>
          <a href="#main" className="type-utility sr-only z-50 bg-(--color-surface) p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <SiteFooter />
          <Toaster position="bottom-center" mobileOffset={{ bottom: 84 }} toastOptions={{ classNames: { toast: 'type-body !rounded-(--radius-card) !border-(--color-border) !bg-(--color-surface) !text-(--color-text)', description: '!text-(--color-muted)' } }} />
        </TooltipProvider>
        <Reveals />
      </body>
    </html>
  )
}
