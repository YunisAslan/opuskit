// Footer — Big name, on the page ground. One row at the top: the link columns, the box office and the night's next film
// (wrapping to two columns on phones). Under it the name Ninth Row in the display face, spanning the whole container on
// one line and drawn as an outline in the text colour; then the copyright and legal links, small. The name is sized
// from its own measure: "Ninth Row" in Sofia Sans Extra Condensed 700 is 2.96em wide, so 100cqi / 2.97 fills the
// container at any width. Links share the site's underline; the current page keeps it.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
type L = { label: string; href: string }

export function FooterSection({ link: Link = 'a', name, home, columns, contact, tonight, legal, copyright }: {
  link?: ElementType; name: string; home: string; columns: FooterColumn[]; contact: { title: string; lines: ReactNode[] }; tonight: { title: string; body: ReactNode }; legal: L[]; copyright: string
}) {
  const item = (l: L & { current?: boolean }) => {
    const external = l.href.startsWith('mailto:') || l.href.startsWith('tel:')
    const C = external ? 'a' : Link
    return <C key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className="press link-line inline-block py-1.5">{l.label}</C>
  }
  return (
    <footer className="bg-(--color-background) px-(--gutter) pb-[max(32px,env(safe-area-inset-bottom,0px))] text-(--color-text)">
      <div className="mx-auto max-w-(--container) border-t border-(--color-border) pt-16 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="min-w-0 md:col-span-2">
              <h2 className="type-utility text-(--color-muted)">{col.title}</h2>
              <ul className="type-utility mt-4 text-base">{col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}</ul>
            </nav>
          ))}
          <div className="min-w-0 md:col-span-3 md:col-start-6">
            <h2 className="type-utility text-(--color-muted)">{contact.title}</h2>
            <div className="type-utility mt-4 space-y-1.5 text-base [&_a]:py-1.5">{contact.lines.map((l, i) => <p key={i}>{l}</p>)}</div>
          </div>
          <div className="min-w-0 md:col-span-4 md:col-start-9">
            <h2 className="type-utility text-(--color-muted)">{tonight.title}</h2>
            <div className="mt-4">{tonight.body}</div>
          </div>
        </div>

        <Link href={home} aria-label={`${name}, home`} className="press mt-16 block [container-type:inline-size] md:mt-24">
          <span aria-hidden className="block font-(family-name:--font-display) text-[calc(100cqi/2.97)] leading-[0.8] font-bold tracking-[-0.01em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_var(--color-text)] md:[-webkit-text-stroke:1.5px_var(--color-text)]">
            {name}
          </span>
        </Link>

        <div className="type-caption mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-(--color-border) pt-6 text-(--color-muted)">
          <span>{copyright}</span>
          <span className="flex gap-6">{legal.map(item)}</span>
        </div>
      </div>
    </footer>
  )
}
