import type { Metadata, Viewport } from 'next'
import { Special_Gothic, Special_Gothic_Expanded_One } from 'next/font/google'
import { ViewTransition } from 'react'
import { Deferred } from '@/components/Deferred'
import { Dock } from '@/components/Dock'
import { Logo } from '@/components/Logo'
import { SiteFooter } from '@/components/SiteFooter'
import { TooltipProvider } from '@/components/ui/tooltip'
import { assets } from '@/config/assets'
import './globals.css'

const display = Special_Gothic_Expanded_One({ weight: '400', subsets: ['latin'], variable: '--font-sg-expanded' })
const body = Special_Gothic({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sg' })

export const metadata: Metadata = {
  title: { default: 'ulooklonely', template: '%s | ulooklonely' },
  description: 'Its presentation of loneliness. Short films and edits about being alone somewhere crowded.',
}

export const viewport: Viewport = { themeColor: '#B6DADA' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="type-body">
        <TooltipProvider delayDuration={200}>
          <a href="#main" className="type-utility sr-only z-50 border-2 border-(--color-text) bg-(--color-surface) px-4 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Skip to content</a>
          <header className="relative z-50" style={{ viewTransitionName: 'logo' }}><Logo /></header>
          <ViewTransition>
            <main id="main">{children}</main>
            <SiteFooter />
          </ViewTransition>
          <Dock />
        </TooltipProvider>
        {/* Grain: warmth, not a filter — static, ≤ 4% opacity. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-multiply" style={{ backgroundImage: `url("${assets.texture.src}")` }} />
        <Deferred />
      </body>
    </html>
  )
}
