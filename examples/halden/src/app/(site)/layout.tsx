import Link from 'next/link'
import { ViewTransition } from 'react'
import { Logo } from '@/components/Logo'
import { FooterSection } from '@/components/sections/Footer'
import { Navbar } from '@/components/site/Navbar'
import { StickyReserve } from '@/components/site/SiteChrome'
import { footer } from '@/content/site'

// Every page but Sign in / Sign up: the bar, the page, the signature footer. The page crossfades between routes.
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <a href="#main" className="type-utility sr-only z-50 bg-(--color-text) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <ViewTransition>
        <main id="main">{children}</main>
      </ViewTransition>
      <FooterSection link={Link} logo={<Logo size="sign" />} sign={footer.sign} columns={footer.columns} legal={footer.legal} copyright={footer.copyright} />
      <StickyReserve />
    </>
  )
}
