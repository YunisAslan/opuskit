import type { ReactNode } from 'react'
import { FooterSection } from '@/components/sections/Footer'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { contact, pages } from '@/content/site'

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => <UnderlineFill href={href}>{children}</UnderlineFill>

// Big name: a quiet row of links and contact, then the name set large once — the site's calm ending.
export function SiteFooter() {
  return (
    <FooterSection
      variant="wordmark"
      light
      link={FooterLink}
      brand="Kür Delta Watch"
      logo={null}
      columns={[
        { title: 'Pages', links: pages.slice(1) },
        { title: 'Contact', links: [
          { label: contact.email, href: `mailto:${contact.email}` },
          { label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
          { label: 'Boat shed 3, Neftchala', href: contact.mapUrl },
        ] },
      ]}
      copyright="© 2026 Kür Delta Watch, a volunteer public association in Neftchala, Azerbaijan"
    />
  )
}
