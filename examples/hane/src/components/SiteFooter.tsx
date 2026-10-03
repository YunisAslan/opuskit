import { FooterSection } from '@/components/sections/Footer'
import { Logo } from '@/components/Logo'
import { FillLink } from '@/components/SiteLink'
import { StatusLine } from '@/components/StatusLine'
import { site } from '@/config/site'
import { HOURS_LINES } from '@/lib/hours'

// Footer — Say hello: the last stop is the way in. A big invitation, the email and phone as large links, the address,
// hours and a line that is true right now beside it, then one small row of links.
export function SiteFooter() {
  return (
    <FooterSection variant="contact" light link={FillLink} logo={<div><Logo /></div>}
      invite="Come in and lie down."
      contact={[{ label: site.phone, href: site.tel }, { label: site.email, href: `mailto:${site.email}` }]}
      details={
        <>
          <div><StatusLine /></div>
          <address className="whitespace-pre-line not-italic">{site.address}</address>
          <ul className="space-y-1 text-(--color-muted)">{HOURS_LINES.map((h) => <li key={h}>{h}</li>)}</ul>
        </>
      }
      columns={[{ title: 'Pages', links: [...site.nav, site.book] }]}
      copyright={`© ${new Date().getFullYear()} Hane. This site keeps no data: booking opens your own mail app.`} />
  )
}
