'use client'
// Footer — Signature columns on the text-colour band; it ends on the live status line and a plain sign-off.
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { brand, nav } from '@/content/site'
import { Logo } from './Logo'
import { SiteLink, START } from './SiteLink'
import { StatusLine } from './StatusLine'

export function SiteFooter() {
  const path = usePathname()
  return (
    <FooterSection link={SiteLink} logo={<Logo large />} copyright="© 2026 Hexmint"
      columns={[
        { title: 'Product', links: [{ label: 'Home', href: '/', current: path === '/' }, ...nav.map((l) => ({ ...l, current: path === l.href }))] },
        { title: 'Start', links: [{ label: 'Start free', href: START }, { label: 'See pricing', href: '/pricing' }] },
        { title: 'Contact', links: [{ label: brand.email, href: `mailto:${brand.email}` }, { label: brand.support, href: `mailto:${brand.support}` }] },
      ]}
      end={
        <div className="type-utility mx-auto mt-4 flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-2 tabular-nums">
          <StatusLine dot="bg-(--color-background)" />
          <p>{'// End of page. Your books can look this tidy.'}</p>
        </div>
      } />
  )
}
