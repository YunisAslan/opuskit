'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { brand, footer } from '@/content/copy'
import { Logo } from './Logo'

export function Footer() {
  const path = usePathname()
  const columns = footer.columns.map((c) => ({ ...c, links: c.links.map((l) => ({ ...l, current: l.href === path })) }))
  return (
    <FooterSection
      link={Link}
      logo={<Link href="/" aria-label="Maison Vey, home" className="inline-block"><Logo size="signature" /></Link>}
      line={footer.line}
      columns={columns}
      aside={{
        title: footer.visit,
        body: (
          <address className="not-italic">
            {brand.address.map((l) => <span key={l} className="block">{l}</span>)}
            <a href={`mailto:${brand.email}`} className="link-quiet mt-3 inline-flex min-h-11 items-center md:min-h-0">{brand.email}</a>
          </address>
        ),
      }}
      legal={footer.legal}
      copyright={footer.copyright}
    />
  )
}
