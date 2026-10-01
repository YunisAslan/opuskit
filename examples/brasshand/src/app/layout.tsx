import type { Metadata } from 'next'
import { Bayon, Reddit_Sans } from 'next/font/google'
import { FooterSection } from '@/components/sections/Footer'
import { PageCurtain } from '@/components/pieces/PageCurtain'
import { Preloader } from '@/components/pieces/Preloader'
import { SmoothScroll } from '@/components/pieces/SmoothScroll'
import { Header } from '@/components/site/Header'
import { RollLink } from '@/components/site/links'
import { Logo } from '@/components/site/Logo'
import { Toaster } from '@/components/ui/sonner'
import { contact, nav } from '@/content/site'
import './globals.css'

const bayon = Bayon({ weight: '400', subsets: ['latin'], variable: '--font-bayon', display: 'swap' })
const reddit = Reddit_Sans({ subsets: ['latin'], variable: '--font-reddit', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Brasshand, a branding studio in Baku', template: '%s | Brasshand' },
  description: 'Brasshand is a three-person branding studio in Baku: names, identities and campaigns for food, music and culture.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bayon.variable} ${reddit.variable}`}>
      <body>
        <Preloader brand="Brasshand" />
        <SmoothScroll />
        <PageCurtain />
        <Header />
        <main>{children}</main>
        <FooterSection variant="wordmark" light link={RollLink} brand="Brasshand" logo={<Logo />}
          columns={[
            { title: 'Pages', links: nav },
            { title: 'Contact', links: [{ label: contact.email, href: `mailto:${contact.email}` }, { label: contact.phone, href: `tel:${contact.tel}` }, { label: 'Rasul Rza street 27, Baku', href: contact.mapUrl }] },
          ]}
          copyright={`© ${new Date().getFullYear()} Brasshand. Names, identities and campaigns, made in Baku.`} />
        <Toaster position="bottom-left" />
      </body>
    </html>
  )
}
