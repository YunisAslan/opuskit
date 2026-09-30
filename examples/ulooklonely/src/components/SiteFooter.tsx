'use client'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { Band } from '@/components/Hydrated'
import { FooterSection } from '@/components/sections/Footer'
import { site } from '@/config/site'

export function SiteFooter() {
  const path = usePathname()
  const pages = [['Home', '/'], ['Work', '/work'], ['About', '/about'], ['Services', '/services']] as const
  return (
    <>
      <Band text="You look lonely. Stay a while. " className="type-display border-y-2 border-(--color-text) py-6 [font-size:clamp(3rem,12vw,10rem)] leading-none" />
      <FooterSection
        light
        logo={<><Logo size="lg" /><p className="type-body mt-6 max-w-[34ch] text-(--color-muted)">Its presentation of loneliness. Short films and edits, made slowly.</p></>}
        columns={[
          { title: 'Contact', links: [{ label: site.email, href: `mailto:${site.email}` }, { label: site.city, href: '/services' }] },
          { title: 'Pages', links: pages.map(([label, href]) => ({ label, href, current: path === href })) },
          { title: 'Elsewhere', links: site.social },
        ]}
        copyright={`© ${new Date().getFullYear()} ulooklonely. All films and stills belong to their makers.`}
      />
    </>
  )
}
