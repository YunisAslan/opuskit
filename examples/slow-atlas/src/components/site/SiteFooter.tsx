import Link from 'next/link'
import { FooterSection } from '@/components/sections/Footer'
import { essays, essayHref, site } from '@/content/magazine'
import { Logo } from './Logo'

export function SiteFooter() {
  return (
    <FooterSection
      link={Link}
      variant="signature"
      logo={<Logo size="lg" />}
      columns={[
        { title: 'Read', links: [{ label: 'Latest essay', href: essayHref(essays[0]) }, { label: 'Articles', href: '/articles' }, { label: 'Newsletter', href: '/newsletter' }] },
        { title: 'Magazine', links: [{ label: 'About', href: '/about' }, { label: 'The editors', href: '/about#team' }, { label: 'Subscribe', href: '/newsletter#subscribe' }] },
        { title: 'Contact', links: [{ label: site.email, href: `mailto:${site.email}` }, { label: 'Pitch an essay', href: `mailto:${site.email}?subject=Pitch` }] },
      ]}
      legal={[{ label: 'Privacy', href: '/newsletter#privacy' }, { label: 'Unsubscribe', href: `mailto:${site.email}?subject=Unsubscribe` }]}
      copyright="© 2026 Slow Atlas"
    />
  )
}
