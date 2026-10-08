// OpusKit section — Footer "Say hello" (contact variant), fitted to Low Hum: a big lowercase invitation with the email
// and phone as display-size links, address and hours beside it, one small row of links, copyright and the legal line —
// then the name, huge and cropped by the bottom edge, like a shop sign. A checker band is the gate into it.
import type { ElementType, ReactNode } from 'react'

type Link = { label: string; href: string; current?: boolean }

export function FooterSection({ link: L = 'a', invite, contact, details, links, copyright, legal, brand, signoff }: {
  link?: ElementType; invite: string; contact: Link[]; details: { title: string; body: ReactNode }[]
  links: Link[]; copyright: string; legal: string; brand: string; signoff?: string
}) {
  const ext = (href: string) => /^https?:/.test(href)
  return (
    <footer className="relative overflow-hidden bg-(--color-background) text-(--color-text)">
      <div aria-hidden className="checker h-12 md:h-16" />
      <div className="px-(--gutter) pt-(--section-y)">
        <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2 className="type-poster [font-size:clamp(2.6rem,6.2vw,5.75rem)]">{invite}</h2>
            <ul className="mt-10 space-y-2">
              {contact.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="type-poster link-hum inline-block py-1 [font-size:clamp(1.6rem,3.4vw,2.75rem)] break-all sm:break-normal">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-4 md:col-start-9 md:grid-cols-1 md:pt-4">
            {details.map((d) => (
              <div key={d.title}>
                <h3 className="type-utility text-(--color-muted)">{d.title}</h3>
                <div className="type-body mt-3">{d.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 flex max-w-(--container) flex-col gap-6 border-t border-(--color-border) pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  {ext(l.href)
                    ? <a href={l.href} target="_blank" rel="noreferrer" className="type-utility link-hum inline-flex h-11 items-center [font-size:0.9375rem]">{l.label}</a>
                    : <L href={l.href} aria-current={l.current ? 'page' : undefined} className="type-utility link-hum inline-flex h-11 items-center [font-size:0.9375rem]">{l.label}</L>}
                </li>
              ))}
            </ul>
          </nav>
          <p className="type-caption flex flex-wrap gap-x-6 gap-y-1 text-(--color-muted)"><span>{copyright}</span><span>{legal}</span></p>
        </div>
        {signoff && <p className="type-caption mx-auto mt-16 max-w-(--container) text-center text-(--color-muted)">{signoff}</p>}
      </div>
      <p aria-hidden className="type-poster mt-4 -mb-[0.24em] text-center leading-[0.8] whitespace-nowrap text-(--color-secondary) select-none [font-size:clamp(5rem,27vw,26rem)]">{brand}</p>
    </footer>
  )
}
