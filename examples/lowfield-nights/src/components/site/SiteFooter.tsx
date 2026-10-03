'use client'
// Footer "Big name" — and the last stop of every page: the way in, with a line that is true right now.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'
import { StatusLine } from './StatusLine'
import { brand, contactEmail } from '@/content/site'
import { EVENT } from '@/lib/event'

const pages = [
  { label: 'Home', href: '/' },
  { label: 'RSVP', href: '/rsvp' },
  { label: 'Venue & travel', href: '/venue-and-travel' },
  { label: 'FAQ', href: '/faq' },
]

export function SiteFooter() {
  const path = usePathname()
  return (
    // The wordmark spans the content width exactly: "Lowfield Nights" in Newsreader is 7.062 em wide (measured). The width
    // comes from this wrapper (a size container), so a desktop scrollbar is never counted the way 100vw would count it.
    <div className="@container relative [--wordmark-size:calc((min(100cqw,1520px)-2.5rem)/7.062)] md:[--wordmark-size:calc((min(100cqw,1520px)-5rem)/7.062)]">
      <FooterSection
        variant="wordmark"
        light
        link={Link}
        brand={brand}
        logo={<Logo />}
        columns={[
          { title: 'Pages', links: pages.map((p) => ({ ...p, current: p.href === path })) },
          { title: 'Contact', links: [{ label: contactEmail, href: `mailto:${contactEmail}` }, { label: EVENT.phone, href: `tel:${EVENT.phone.replace(/\s/g, '')}` }] },
        ]}
        note={
          <div className="flex flex-col items-start gap-3 md:items-end">
            <StatusLine />
            <Button asChild><Link href="/rsvp">RSVP, entry is free</Link></Button>
          </div>
        }
        copyright="© 2026 Lowfield Nights. Hangar 2, Lowfield airstrip, Zira coast road, Absheron."
      />
    </div>
  )
}
