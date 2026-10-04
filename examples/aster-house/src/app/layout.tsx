import type { Metadata } from 'next'
import { Host_Grotesk, Literata } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { SiteFooter } from '@/components/SiteFooter'
import { PageFade } from '@/components/pieces/PageFade'
import { SmoothScroll } from '@/components/SmoothScroll'
import { RevealObserver } from '@/components/RevealObserver'
import { MotifTraveller } from '@/components/MotifTraveller'
import { Toaster } from '@/components/ui/sonner'
import { site } from '@/data/site'

const literata = Literata({ subsets: ['latin'], axes: ['opsz'], variable: '--font-literata', display: 'swap' })
const grotesk = Host_Grotesk({ subsets: ['latin'], variable: '--font-host-grotesk', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${site.name}, twelve houses above the Caspian`, template: `%s, ${site.name}` },
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${literata.variable} ${grotesk.variable}`}>
      <body className="min-h-svh">
        <Nav />
        <main>{children}</main>
        <SiteFooter />
        <MotifTraveller />
        <PageFade />
        <SmoothScroll />
        <RevealObserver />
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
