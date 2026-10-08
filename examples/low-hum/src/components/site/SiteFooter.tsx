'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { brand, footer, hours } from '@/content/site'

export function SiteFooter() {
  const path = usePathname()
  return (
    <FooterSection
      link={Link}
      invite={footer.invite}
      contact={[
        { label: brand.email, href: `mailto:${brand.email}` },
        { label: brand.phoneDisplay, href: `tel:${brand.phone.replace(/\s/g, '')}` },
      ]}
      details={[
        {
          title: footer.detailsTitle,
          body: (
            <>
              <address className="whitespace-pre-line not-italic">{brand.address}</address>
              <a href={brand.mapUrl} target="_blank" rel="noreferrer" className="link-hum mt-2 inline-flex h-11 items-center text-(--color-muted)">Open in maps</a>
            </>
          ),
        },
        { title: footer.hoursTitle, body: <ul className="space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul> },
      ]}
      links={footer.links.map((l) => ({ ...l, current: l.href === path }))}
      copyright={footer.copyright}
      legal={footer.legal}
      brand="low hum"
      signoff={footer.signoff}
    />
  )
}
