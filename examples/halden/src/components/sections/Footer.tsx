// Footer — Signature columns, made Halden's own: a band in the text colour (the page's light, turned into ground),
// the signature large across 5 of 12 columns with the one line under it, three columns of links, then a hairline and
// one row: copyright left, legal right. Links underline on hover and focus; the current page keeps its underline.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
type Link = { label: string; href: string }

export function FooterSection({ link: L = 'a', logo, sign, columns, legal, copyright }: {
  link?: ElementType; logo: ReactNode; sign?: string; columns: FooterColumn[]; legal?: Link[]; copyright: string
}) {
  const item = (l: Link & { current?: boolean }) => {
    const external = /^(https?:|tel:|mailto:)/.test(l.href)
    const Comp = external ? 'a' : L
    return (
      <Comp key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className="link-line inline-flex min-h-11 items-center md:min-h-0" {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {l.label}
      </Comp>
    )
  }
  return (
    <footer className="bg-(--color-text) px-(--gutter) pt-24 pb-[calc(32px+76px)] text-(--color-background) selection:bg-(--color-background) selection:text-(--color-text) md:pt-32 md:pb-8">
      <div className="mx-auto grid max-w-(--container) gap-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          {logo}
          {sign && <p className="type-body mt-6 opacity-70">{sign}</p>}
        </div>
        {columns.map((col, i) => (
          <nav key={col.title} aria-label={col.title} className={`${col.links.some((l) => l.label.includes('@')) ? 'md:col-span-3' : 'md:col-span-2'} ${i === 0 ? 'md:col-start-6' : ''}`}>
            <h2 className="type-utility opacity-60">{col.title}</h2>
            <ul className="type-utility mt-4 space-y-0 md:space-y-3">
              {col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="type-utility mx-auto mt-24 flex max-w-(--container) flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-current/20 pt-6">
        <span className="opacity-70">{copyright}</span>
        {legal && <span className="flex gap-6">{legal.map(item)}</span>}
      </div>
    </footer>
  )
}
