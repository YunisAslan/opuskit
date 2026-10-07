import type { Metadata } from 'next'
import { Cormorant, Karla } from 'next/font/google'
import { SideIndex } from '@/components/SideIndex'
import { SiteFooter } from '@/components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { studio } from '@/content/site'
import './globals.css'

const cormorant = Cormorant({ variable: '--font-cormorant', subsets: ['latin'], style: ['normal', 'italic'], weight: ['500', '600'], display: 'swap' })
const karla = Karla({ variable: '--font-karla', subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Fieldhouse — Architects for old barns', template: '%s — Fieldhouse' },
  description: studio.line,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="type-body">
        <TooltipProvider delayDuration={200}>
          <SideIndex />
          <div className="pt-16 lg:pt-0 lg:pl-(--nav-w)">
            <main>{children}</main>
            <SiteFooter />
          </div>
          <Toaster position="bottom-right" />
        </TooltipProvider>
      </body>
    </html>
  )
}
