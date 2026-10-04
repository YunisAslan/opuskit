import { FooterSection } from '@/components/sections/Footer'
import { FooterLink } from '@/components/InkLinks'
import { Logo } from '@/components/Logo'
import { Motif } from '@/components/Motif'
import { site } from '@/data/site'

// Footer — Signature columns. The line of light comes to rest here, under the name: the walk is over.
export function SiteFooter() {
  return (
    <FooterSection
      link={FooterLink}
      logo={
        <div className="flex flex-col gap-6">
          <Logo large />
          <Motif len={220} rot={-3} className="ml-[5.25rem] md:ml-24" />
          <p className="type-body max-w-[34ch] opacity-80">{site.description}</p>
        </div>
      }
      columns={[
        { title: 'The houses', links: [{ label: 'All twelve', href: '/residences' }, { label: 'The show house', href: '/residences/ten' }, { label: 'Questions', href: '/residences#questions' }] },
        { title: 'Visit', links: [{ label: 'Book a viewing', href: '/book' }, { label: 'The site', href: '/#the-site' }, { label: 'Sales office', href: '/book#office' }] },
        { title: 'Contact', links: [{ label: site.email, href: `mailto:${site.email}` }, { label: site.phone, href: site.phoneHref }, { label: site.office.street, href: site.officeMap }] },
      ]}
      legal={[{ label: 'Privacy', href: '/privacy' }, { label: `Architecture by ${site.architect.name}`, href: '/#architect' }]}
      copyright={`© 2026 ${site.name}, Shikhov`}
    />
  )
}
