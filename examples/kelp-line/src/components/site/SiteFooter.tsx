'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { count, nav, site } from '@/content/site'
import { number } from '@/lib/utils'
import { LocalTime } from './LocalTime'
import { Logo } from './Logo'

export function SiteFooter() {
  const path = usePathname()
  return (
    <FooterSection
      link={Link}
      logo={<Logo className="text-[1.15rem]" />}
      lead={<><span className="tabular-nums">{number(count.plants)}</span> plants in the water</>}
      links={nav.footer.map((l) => ({ ...l, current: path === l.href }))}
      aside={<span><LocalTime /> in {site.place}</span>}
      copyright={`© ${site.year} ${site.name}`}
    />
  )
}
