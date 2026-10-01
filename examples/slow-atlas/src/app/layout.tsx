import type { Metadata } from 'next'
import { Schibsted_Grotesk, Source_Serif_4 } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MotionProvider } from '@/components/site/motion'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { essays, essayHref, nav, site, subscribeHref } from '@/content/magazine'
import './globals.css'

const schibsted = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-schibsted', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Slow Atlas — One place, told slowly', template: '%s — Slow Atlas' },
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-GB" className={`${schibsted.variable} ${sourceSerif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <TooltipProvider delayDuration={200}>
            <SiteHeader links={nav} places={essays.map((e) => ({ place: e.place, href: essayHref(e) }))} subscribeHref={subscribeHref} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster position="bottom-center" />
          </TooltipProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
