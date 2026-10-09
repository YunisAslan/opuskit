import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { ViewTransition, type ReactNode } from 'react'
import { Bagel_Fat_One, Epilogue } from 'next/font/google'
import { Providers } from '@/components/site/Providers'
import { Nav } from '@/components/site/Nav'
import { Logo } from '@/components/site/Logo'
import { FooterSection } from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/sonner'
import { footer, site } from '@/content/site'
import './globals.css'

const bagel = Bagel_Fat_One({ weight: '400', subsets: ['latin'], variable: '--font-bagel-fat-one', display: 'swap' })
const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${site.name} — bright mugs, plates and vases`, template: `%s — ${site.name}` },
  description: site.description,
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FFDE47' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${bagel.variable} ${epilogue.variable} antialiased`}>
      <body className="type-body">
        <Providers>
          <Nav />
          <ViewTransition default="page">
            <main id="main" className="flex-1">{children}</main>
          </ViewTransition>
          <FooterSection
            logo={<Link href="/" aria-label={`${site.name}, home`} className="press inline-block"><Logo stacked className="[font-size:clamp(4.5rem,11vw,10.5rem)]" /></Link>}
            sticker={footer.sticker}
            columns={footer.columns}
            legal={footer.legal}
            copyright={footer.copyright}
            line={footer.line}
          />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
