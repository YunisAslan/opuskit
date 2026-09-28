import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, Hanken_Grotesk } from 'next/font/google'
import { ViewTransition } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MotionRuntime from '@/components/MotionRuntime'
import './globals.css'

const display = Big_Shoulders({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-big-shoulders', display: 'swap', adjustFontFallback: false })
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-hanken', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Keepers Citrus Coffee Soda', template: '%s | Keepers' },
  description: 'Sparkling cold-brew coffee with orange and lemon peel, in a 330 ml can. 45 mg caffeine, 35 kcal.',
}

export const viewport: Viewport = { themeColor: '#D6FF3D' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="type-body antialiased">
        <a href="#main" className="skip-link btn btn-primary">
          Skip to content
        </a>
        <Navigation />
        <ViewTransition>
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <MotionRuntime />
      </body>
    </html>
  )
}
