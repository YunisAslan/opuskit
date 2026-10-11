import type { Metadata, Viewport } from 'next'
import { Caveat, Caveat_Brush, Winky_Sans } from 'next/font/google'
import { PageShutter } from '@/components/pieces/PageShutter'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { FooterSection } from '@/components/sections/Footer'
import { Header } from '@/components/site/Header'
import { Toaster } from '@/components/ui/sonner'
import { home, site } from '@/content/site'
import './globals.css'

const caveatBrush = Caveat_Brush({ variable: '--font-caveat-brush', weight: '400', subsets: ['latin'], display: 'swap' })
const caveat = Caveat({ variable: '--font-caveat', weight: '700', subsets: ['latin'], display: 'swap' }) // the heading role is 700 only
const winky = Winky_Sans({ variable: '--font-winky-sans', subsets: ['latin'], display: 'swap', fallback: ['system-ui', 'sans-serif'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.meta.title, template: `%s, ${site.name}` },
  description: home.meta.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en', images: [{ url: '/media/featuredWork-2.jpg', width: 2400, height: 1600, alt: 'A hand-drawn city map by Ines Varga' }] },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#DAD8DB' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${caveatBrush.variable} ${caveat.variable} ${winky.variable} antialiased`}>
      <head>
        {/* Marks that scripts run, so parts that wait for them (the gathering headline) may hide until placed */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="type-utility sr-only z-[200] rounded-(--radius-button) bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to the content</a>
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1">{children}</main>
        <FooterSection />
        <PageShutter bars={5} />
        <Toaster />
      </body>
    </html>
  )
}
