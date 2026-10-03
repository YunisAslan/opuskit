import type { Metadata } from 'next'
import { Grenze_Gotisch, Work_Sans } from 'next/font/google'
import { ViewTransition } from 'react'
import './globals.css'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { RollLink } from '@/components/RollLink'
import { MotionObserver } from '@/components/motion'
import { ShopProvider } from '@/components/shop'
import { FooterSection } from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { EMAIL } from '@/data/shop'

const grenze = Grenze_Gotisch({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-grenze', display: 'swap' })
const work = Work_Sans({ subsets: ['latin'], variable: '--font-work', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Saint Ashe | Black clothing cut in small runs in Tbilisi', template: '%s | Saint Ashe' },
  description: 'Black clothing cut in small runs in Tbilisi: heavy cotton, waxed wool and leather that ages with you.',
}

const columns = [
  { title: 'Shop', links: [{ label: 'The collection', href: '/collections' }, { label: 'Every piece', href: '/collections#shop' }, { label: 'Lookbook', href: '/collections#lookbook' }] },
  { title: 'House', links: [{ label: 'About', href: '/about' }, { label: 'The workshop', href: '/about#story' }, { label: 'Journal', href: '/#journal' }] },
  { title: 'Help', links: [{ label: 'Contact', href: '/contact' }, { label: 'Visit the shop', href: '/contact#visit' }, { label: EMAIL, href: `mailto:${EMAIL}` }] },
]

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${grenze.variable} ${work.variable}`} suppressHydrationWarning>
      <head>
        {/* reveals start hidden only when scripts run, so the page never stays blank without them */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <TooltipProvider delayDuration={300}>
          <ShopProvider>
            <a href="#main" className="type-utility sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-(--color-text) focus:p-3 focus:text-(--color-background)">Skip to content</a>
            <Header />
            <ViewTransition>
              <main id="main">{children}</main>
            </ViewTransition>
            <FooterSection variant="signature" link={RollLink} logo={<Logo large />} columns={columns}
              copyright="© 2026 Saint Ashe, Tbilisi"
              legal={[{ label: 'Delivery and returns', href: '/contact#faq' }, { label: 'Privacy', href: '/contact#faq' }]} />
            <MotionObserver />
            <Toaster position="bottom-center" />
          </ShopProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
