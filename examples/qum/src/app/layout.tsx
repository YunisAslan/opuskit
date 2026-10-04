import type { Metadata } from 'next'
import { Petrona, Public_Sans } from 'next/font/google'
import { PageFade } from '@/components/pieces/PageFade'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { StopIndex } from '@/components/site/StopIndex'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const petrona = Petrona({ variable: '--font-petrona', subsets: ['latin', 'latin-ext'], weight: ['300', '400'], style: ['normal', 'italic'] })
const publicSans = Public_Sans({ variable: '--font-public-sans', subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: { default: 'QUM, skincare from the Caspian salt pans', template: '%s | QUM' },
  description: 'Six products made in small batches on the Absheron coast, with Caspian salt and saffron grown a few kilometres inland. One ritual.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${petrona.variable} ${publicSans.variable}`}>
      <body className="min-h-svh antialiased">
        <TooltipProvider>
          <a href="#main" className="type-utility sr-only z-[60] rounded-(--radius-button) bg-(--color-surface) px-4 py-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <StopIndex />
          <Toaster theme="light" position="bottom-right" />
        </TooltipProvider>
        <PageFade />
      </body>
    </html>
  )
}
