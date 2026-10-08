import Link from 'next/link'
import { FooterSection } from '@/components/sections/Footer'
import { footer, nav, site } from '@/content/site'
import { Logo } from './Logo'
import { OpenStatus } from './OpenStatus'

export function SiteFooter() {
  const newsletter = `mailto:${site.email}?subject=${encodeURIComponent(footer.newsletterSubject)}`
  return (
    <FooterSection
      link={Link}
      logo={<Link href="/" aria-label={nav.home} className="inline-block"><Logo className="block [font-size:clamp(3.5rem,9vw,8rem)] leading-[0.9]" /></Link>}
      line={footer.line}
      columns={[
        {
          title: footer.columns.visit,
          extra: (
            <div className="type-utility mt-4 space-y-1">
              <address className="not-italic">{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <OpenStatus mark className="pt-3" />
            </div>
          ),
          links: [
            { label: 'Get directions', href: site.mapUrl, external: true },
            { label: site.phone.label, href: site.phone.href },
          ],
        },
        { title: footer.columns.pages, links: [{ label: 'Home', href: '/' }, ...nav.left] },
        {
          title: footer.columns.elsewhere,
          links: [
            { label: footer.links.instagram, href: site.instagram, external: true },
            { label: footer.links.newsletter, href: newsletter },
            { label: footer.links.email, href: `mailto:${site.email}` },
          ],
        },
      ]}
      legal={footer.legal}
      copyright={footer.copyright}
    />
  )
}
