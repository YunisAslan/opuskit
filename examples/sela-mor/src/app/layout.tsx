import type { Metadata, Viewport } from 'next'
import { Martian_Mono, Mona_Sans } from 'next/font/google'
import { AmbientSound } from '@/components/pieces/AmbientSound'
import { PageFade } from '@/components/pieces/PageFade'
import { MotionRoot } from '@/components/motion/MotionRoot'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { Nav } from '@/components/Nav'
import { SiteFooter } from '@/components/SiteFooter'
import { Toaster } from '@/components/ui/sonner'
import { assets } from '@/config/assets'
import './globals.css'

// One width-axis family for everything; Martian Mono only for data (dates, lengths, counters).
const mona = Mona_Sans({ variable: '--font-mona', subsets: ['latin', 'latin-ext'], axes: ['wdth'], display: 'swap' })
const martian = Martian_Mono({ variable: '--font-martian', subsets: ['latin'], axes: ['wdth'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Sela Mor, sound artist and composer from Baku', template: '%s, Sela Mor' },
  description: 'Sela Mor records wind, water and machines on the Absheron coast and turns them into music for rooms, films and long nights. Works, tracks, live dates and contact.',
}

export const viewport: Viewport = { themeColor: '#000000' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${mona.variable} ${martian.variable}`}>
      <body className="min-h-svh antialiased">
        <MotionRoot>
          <Nav sound={<AmbientSound src={assets.ambientSound.src} placement="whitespace-nowrap" />} />
          <main id="top">{children}</main>
          <SiteFooter />
          <PageFade />
        </MotionRoot>
        <SmoothScroll />
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
