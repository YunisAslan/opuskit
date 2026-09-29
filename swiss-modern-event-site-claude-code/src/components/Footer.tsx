import Link from "next/link"
import { accountLinks, legalLinks, primaryLinks, secondaryLinks, site } from "@/config/site"

export function Footer() {
  const year = 2027
  return (
    <footer className="border-t border-text pb-28 sm:pb-0">
      <div className="page grid-page gap-y-12 py-16">
        <div className="col-span-4 sm:col-span-6 lg:col-span-3">
          <p className="font-display text-2xl leading-none tracking-[-0.02em]">{site.name}</p>
          <p className="mt-4 text-muted">{site.event}, {site.dates}</p>
        </div>

        <FooterCol title="Contact" className="lg:col-start-5">
          <li><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
          <li><a href={site.phoneHref} className="hover:underline">{site.phone}</a></li>
          <li className="pt-2 text-muted">{site.address.map((l) => <span key={l} className="block">{l}</span>)}</li>
        </FooterCol>

        <FooterCol title="Pages">
          {[{ href: "/rsvp", label: "RSVP" }, ...primaryLinks, ...secondaryLinks, ...accountLinks].map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Follow">
          <li><a href={site.instagram} className="hover:underline" rel="noopener">Instagram</a></li>
          <li><a href={`mailto:${site.email}?subject=Newsletter`} className="hover:underline">Newsletter by email</a></li>
        </FooterCol>

        <FooterCol title="Legal">
          {legalLinks.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></li>
          ))}
        </FooterCol>
      </div>
      <div className="page border-t border-border py-6">
        <p className="type-utility text-muted">© {year} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`col-span-2 sm:col-span-3 lg:col-span-2 ${className}`}>
      <h2 className="type-utility mb-4">{title}</h2>
      <ul className="sm:space-y-2 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center sm:[&_a]:min-h-0">{children}</ul>
    </div>
  )
}
