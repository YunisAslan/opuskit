'use client'
// Footer "Signature columns": a white band (the text colour as ground), the mark large on the left, two link
// columns, the brand name as the last giant word, then the copyright and legal row.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mark } from '@/components/Logo'
import { FooterSection } from '@/components/sections/Footer'
import { nav, site } from '@/content/site'

export function SiteFooter() {
  const path = usePathname()
  const pages = [{ label: 'Home', href: '/' }, ...nav, { label: 'Contact', href: '/contact' }]
  return (
    <FooterSection
      link={Link}
      logo={
        <div>
          <Mark className="size-24 md:size-32" />
          <p className="type-body mt-6 max-w-[34ch]">{site.line}</p>
        </div>
      }
      brand={site.name}
      columns={[
        { title: 'Pages', links: pages.map((l) => ({ ...l, current: path === l.href })) },
        { title: 'Write', links: [
          { label: site.email, href: `mailto:${site.email}` },
          { label: `Live bookings: ${site.bookings}`, href: `mailto:${site.bookings}` },
        ] },
      ]}
      legal={[{ label: 'Privacy', href: '/contact#privacy' }]}
      copyright={`© ${new Date().getFullYear()} Sela Mor, Baku and Berlin`}
    />
  )
}
