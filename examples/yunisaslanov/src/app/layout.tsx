import type { Metadata } from 'next'
import { Hubot_Sans, IBM_Plex_Sans } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Logo } from '@/components/Logo'
import { Reveals } from '@/components/Reveals'
import { SiteLink } from '@/components/SiteLink'
import { FooterSection } from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/config/site'
import './globals.css'

const hubot = Hubot_Sans({ subsets: ['latin'], axes: ['wdth'], variable: '--font-hubot', display: 'swap' })
const plex = IBM_Plex_Sans({ subsets: ['latin'], axes: ['wdth'], variable: '--font-plex', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Yunis Aslanov', template: '%s, Yunis Aslanov' },
  description: 'The portfolio and workspace of Yunis Aslanov. Come in, look around, say hello.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${hubot.variable} ${plex.variable}`}>
      <body>
        <TooltipProvider>
          <a href="#main" className="type-utility sr-only z-[70] bg-(--color-primary) px-4 py-3 text-(--color-background) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <FooterSection
            variant="line"
            link={SiteLink}
            logo={<Logo />}
            columns={[{ title: 'Site', links: [...site.nav, { href: `mailto:${site.email}`, label: site.email }] }]}
            copyright={`© ${new Date().getFullYear()} ${site.name}`}
          />
          <Toaster position="bottom-center" />
          <Reveals />
        </TooltipProvider>
      </body>
    </html>
  )
}
