import Link from 'next/link'
import { footerLinks, site } from '@/config/site'

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/90 pb-24 pt-24 md:pb-12">
      <div className="container-text grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-3xl font-extrabold tracking-[-0.03em]">KOFİİ</p>
          <address className="mt-4 not-italic">
            {site.address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            <a href={`mailto:${site.email}`} className="mt-4 flex min-h-11 items-center underline md:min-h-8">{site.email}</a>
            <a href={site.phoneHref} className="flex min-h-11 items-center underline md:min-h-8">{site.phone}</a>
          </address>
          <dl className="mt-4 grid gap-1 text-muted">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt className="inline">{h.days}: </dt>
                <dd className="inline">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <FooterList title="Explore" links={footerLinks.explore} />
        <FooterList title="Follow" links={site.social} external />
        <FooterList title="Legal" links={footerLinks.legal} />
      </div>
      <p className="container-text type-utility mt-16 text-muted">© {new Date().getFullYear()} KOFİİ. Made to order.</p>
    </footer>
  )
}

function FooterList({ title, links, external }: { title: string; links: { href: string; label: string }[]; external?: boolean }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-bold">{title}</h2>
      <ul className="mt-4 grid gap-1">
        {links.map((l) => (
          <li key={l.href}>
            {external ? (
              <a href={l.href} className="inline-flex min-h-11 items-center hover:underline md:min-h-8" rel="noopener" target="_blank">{l.label}</a>
            ) : (
              <Link href={l.href} className="inline-flex min-h-11 items-center hover:underline md:min-h-8">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
