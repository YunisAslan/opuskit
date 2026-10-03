import type { Metadata, Viewport } from 'next'
import { Kalnia, SUSE } from 'next/font/google'
import './globals.css'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { MotifTraveller } from '@/components/site/MotifTraveller'
import { RevealObserver } from '@/components/site/RevealObserver'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

// Kalnia with its width axis: display type is set at 125% width (type-display).
const kalnia = Kalnia({ subsets: ['latin'], axes: ['wdth'], variable: '--font-kalnia', display: 'swap' })
const suse = SUSE({ subsets: ['latin'], variable: '--font-suse', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Velmira, a lake house in the Gabala hills', template: '%s at Velmira' },
  description: 'Nine rooms and a bathhouse on a lake in the Gabala hills: warm water, cold air, long quiet mornings.',
}

export const viewport: Viewport = { themeColor: '#271A70' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${kalnia.variable} ${suse.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Reveals only hide content once scripts can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <TooltipProvider delayDuration={300}>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <MotifTraveller />
          <RevealObserver />
          <Toaster position="top-center" />
        </TooltipProvider>
      </body>
    </html>
  )
}
