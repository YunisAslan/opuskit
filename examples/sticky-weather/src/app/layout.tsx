import type { Metadata } from 'next'
import { Stack_Sans_Headline, Stack_Sans_Text } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { SiteFooter } from '@/components/SiteFooter'
import { BlobTransition } from '@/components/pieces/BlobTransition'
import { BrandCursor } from '@/components/pieces/BrandCursor'
import { Preloader } from '@/components/pieces/Preloader'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GateScript } from '@/components/Gate'

// Self-hosted by next/font; the tokens read them through these variables (src/styles/tokens.css).
const headline = Stack_Sans_Headline({ subsets: ['latin'], weight: ['500', '600'], display: 'swap', adjustFontFallback: false, variable: '--font-stack-headline' })
const text = Stack_Sans_Text({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', adjustFontFallback: false, variable: '--font-stack-text' })

export const metadata: Metadata = {
  title: { default: 'Sticky Weather, a design studio for brands that want to be picked up', template: '%s | Sticky Weather' },
  description: 'Sticky Weather is a small design studio in Bristol making identities, packaging and websites that feel like stickers on a laptop.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${headline.variable} ${text.variable} antialiased`}>
      <head>
        {/* Marks a returning visit before paint, so the gate on Home never flashes. */}
        <GateScript />
      </head>
      <body className="min-h-svh">
        <TooltipProvider delayDuration={150}>
          <Nav />
          <main>{children}</main>
          <SiteFooter />
        </TooltipProvider>
        <Toaster position="bottom-center" toastOptions={{ classNames: { toast: 'type-body rounded-none! border! border-(--color-text)! bg-(--color-paper)! text-(--color-text)!' } }} />
        <BlobTransition />
        <Preloader brand="Sticky Weather" />
        <BrandCursor />
        <SmoothScroll />
      </body>
    </html>
  )
}
