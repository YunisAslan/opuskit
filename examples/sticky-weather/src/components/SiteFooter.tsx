'use client'
// Footer "Signature columns": dark band, the name large on the left (5 of 12 columns), link columns, then the legal row.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { AssembleName } from '@/components/AssembleName'
import { links } from '@/components/Nav'
import { brand, location } from '@/content/site'

export function SiteFooter() {
  const path = usePathname()
  return (
    <FooterSection link={Link} variant="signature" logo={<AssembleName name={brand.name} />} copyright={`© ${new Date().getFullYear()} Sticky Weather Studio Ltd, Bristol`}
      columns={[
        { title: 'Studio', links: [...links, { label: 'Contact', href: '/contact' }].map((l) => ({ ...l, current: l.href === '/' ? path === '/' : path.startsWith(l.href) })) },
        { title: 'Say hello', links: [{ label: brand.email, href: `mailto:${brand.email}` }, { label: brand.phone, href: brand.phoneHref }, { label: 'Instagram', href: brand.instagram }] },
        { title: 'Visit', links: [{ label: '12 Gasferry Road, Bristol', href: location.mapUrl }, { label: 'Hours and directions', href: '/contact' }] },
      ]}
      legal={[{ label: 'Privacy', href: '/privacy' }]} />
  )
}
