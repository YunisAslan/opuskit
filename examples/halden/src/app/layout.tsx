import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Imbue } from 'next/font/google'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { ReadingLine } from '@/components/site/SiteChrome'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { brand } from '@/content/site'
import './globals.css'

// Opening Credits: Imbue (display, with its optical-size axis) and Hanken Grotesk (body and utility), self-hosted.
const imbue = Imbue({ subsets: ['latin'], axes: ['opsz'], variable: '--font-imbue', display: 'swap' })
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${brand.name} — wood-fired sauna and cold sea`, template: `%s — ${brand.name}` },
  description: `${brand.offer} ${brand.promise}`,
}

export const viewport: Viewport = { themeColor: '#181D21', colorScheme: 'dark' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${imbue.variable} ${hanken.variable}`}>
      <body className="min-h-svh">
        <SmoothScroll />
        <ReadingLine />
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
