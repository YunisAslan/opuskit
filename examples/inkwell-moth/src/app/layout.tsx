import type { Metadata } from 'next'
import { Courier_Prime, Permanent_Marker } from 'next/font/google'
import { SideIndex } from '@/components/SideIndex'
import { SiteFooter } from '@/components/SiteFooter'
import { Reveals } from '@/components/Reveals'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const marker = Permanent_Marker({ weight: '400', subsets: ['latin'], variable: '--font-marker', display: 'swap' })
const courier = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-courier', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Inkwell & Moth — picture books by Nell Arden', template: '%s — Inkwell & Moth' },
  description: 'The picture-book studio of illustrator Nell Arden: ink, watercolour and small night creatures, drawn by hand in an old bakery in Sheki.',
}

// Marks the page as scripted before first paint, so reveal states never flash; and remembers a lifted tracing sheet.
const boot = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('im-sheet'))document.documentElement.dataset.sheet='lifted'}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marker.variable} ${courier.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="min-h-svh">
        <SideIndex />
        <div className="lg:pl-(--rail)">
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
        <Reveals />
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
