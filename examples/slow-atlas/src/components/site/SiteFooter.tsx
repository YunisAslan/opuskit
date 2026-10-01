'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { categories, site } from '@/content/magazine'
import { Logo } from './Logo'

// Footer — Signature columns: the name set large once, three link columns, then copyright and legal.
export function SiteFooter() {
  const path = usePathname()
  const l = (label: string, href: string) => ({ label, href, current: path === href })
  return (
    <FooterSection link={Link} variant="signature" logo={<Logo large />}
      columns={[
        { title: 'Read', links: [l('All essays', '/articles'), ...categories.map((c) => l(c.name, `/routes/${c.slug}`))] },
        { title: 'Magazine', links: [l('About', '/about'), l('Newsletter', '/newsletter'), l('Colophon', '/colophon')] },
        { title: 'Write to us', links: [l(site.email, `mailto:${site.email}`), l('Pitch an essay', `mailto:${site.pitches}`)] },
      ]}
      legal={[l('Privacy', '/colophon#privacy'), l('Photo credits', '/colophon#credits')]}
      copyright="© 2026 Slow Atlas. Independent since 2024." />
  )
}
