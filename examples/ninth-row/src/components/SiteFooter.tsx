'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { footer, site } from '@/content/site'
import { FooterSection } from './sections/Footer'
import { TonightLine } from './TonightLine'

export function SiteFooter() {
  const path = usePathname()
  const columns = footer.columns.map((c) => ({ ...c, links: c.links.map((l) => ({ ...l, current: l.href === path })) }))
  return (
    <FooterSection
      link={Link}
      name={site.name}
      home="/"
      columns={columns}
      contact={{
        title: 'Box office',
        lines: [
          <span key="a">{site.address.street}<br />{site.address.city}</span>,
          <a key="t" className="press link-line inline-block" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>,
          <a key="e" className="press link-line inline-block [overflow-wrap:anywhere]" href={`mailto:${site.email}`}>{site.email}</a>,
        ],
      }}
      tonight={{
        title: 'Next on the screen',
        body: <>
          <TonightLine className="type-utility text-base" />
          <p className="type-heading mt-4 text-(--color-muted)">{footer.sign}</p>
        </>,
      }}
      legal={footer.legal}
      copyright={footer.copyright}
    />
  )
}
