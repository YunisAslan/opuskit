import type { Metadata, Viewport } from 'next'
import { Archivo, Geist, Geist_Mono } from 'next/font/google'
import { Footer, Header } from '@/components/SiteChrome'
import { THEME_SCRIPT } from '@/components/ThemeToggle'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap', axes: ['wdth'] })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'OpusKit — Design a site from real ones. Build it with AI.', template: '%s — OpusKit' },
  description: 'Collect real, built sites. Make one your own — name, colours, lettering, pages. Get a Build Package your AI tool turns into a finished site: Claude Code, Cursor, v0 or Lovable.',
}

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#EFEFEB' }, { media: '(prefers-color-scheme: dark)', color: '#111113' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* Light or dark before the first paint (the class is set here, so React is told not to mind it). */}
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
        <TooltipProvider delayDuration={200}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Toaster position="top-center" offset={76} />
        </TooltipProvider>
      </body>
    </html>
  )
}
