import type { Metadata } from 'next'
import { Atkinson_Hyperlegible_Next, Science_Gothic } from 'next/font/google'
import { ViewTransition } from 'react'
import { Header } from '@/components/chrome/Header'
import { Dock } from '@/components/chrome/Dock'
import { SiteFooter } from '@/components/chrome/SiteFooter'
import { EnrolSheet } from '@/components/chrome/EnrolSheet'
import { SmoothScroll } from '@/components/chrome/SmoothScroll'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { cohorts, site } from '@/content/site'
import { statusAt, statusText } from '@/lib/status'
import './globals.css'

const display = Science_Gothic({ subsets: ['latin'], axes: ['wdth'], variable: '--font-science-gothic', display: 'swap' })
const body = Atkinson_Hyperlegible_Next({ subsets: ['latin'], variable: '--font-atkinson', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Night Shift: learn film colour grading, live, in eight weeks', template: '%s, Night Shift' },
  description: 'An eight-week online course in film colour grading, taught live by a working colourist: from flat log footage to a finished grade, one real shot at a time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The status line's server text, fixed at build time; the client replaces it with what is true right now.
  const now = statusAt(new Date(), cohorts, site.seatsPerCohort)
  const status: [string, string] = [statusText(now), statusText(now, true)]
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} /></head>
      <body className="min-h-svh pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
        <TooltipProvider delayDuration={80}>
          <Header status={status} />
          <ViewTransition>
            <main>{children}</main>
          </ViewTransition>
          <SiteFooter status={status} />
          <Dock />
          <EnrolSheet />
          <Toaster position="top-center" />
          <SmoothScroll />
        </TooltipProvider>
      </body>
    </html>
  )
}
