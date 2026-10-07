// Footer — Signature columns: a dark band (the text colour as ground): the logo large on the left (5 of 12 columns),
// link columns with headings, then a hairline and one row: copyright left, legal links right.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[]; extra?: ReactNode }
type Link = { label: string; href: string; current?: boolean }

export function FooterSection({ link: L = 'a', logo, line, columns, legal, copyright }: {
  link?: ElementType; logo: ReactNode; line?: string; columns: FooterColumn[]; legal?: Link[]; copyright: string
}) {
  const item = (l: Link) => {
    const external = /^(https?:|mailto:|tel:)/.test(l.href)
    const Tag = external ? 'a' : L
    return <Tag key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className="link-line" {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</Tag>
  }
  return (
    <footer data-tone="inverse" className="px-(--gutter) pb-8 pt-12 md:pt-16">
      <div className="mx-auto grid max-w-(--container) gap-x-8 gap-y-14 border-t border-(--color-border) pt-16 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-5">
          {logo}
          {line && <p className="type-body mt-6 max-w-[34ch] text-(--color-muted)">{line}</p>}
        </div>
        {columns.map((col, i) => (
          <nav key={col.title} aria-label={col.title} className={`md:col-span-2 ${i === 0 ? 'md:col-start-7' : ''}`}>
            <h2 className="type-heading [font-size:1.25rem]">{col.title}</h2>
            {col.links.length > 0 && (
              <ul className="type-utility mt-5 space-y-3">
                {col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}
              </ul>
            )}
            {col.extra}
          </nav>
        ))}
      </div>
      <div className="type-utility mx-auto mt-20 flex max-w-(--container) flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-(--color-border) pt-6 text-(--color-muted)">
        <span>{copyright}</span>
        {legal && <span className="flex gap-6">{legal.map(item)}</span>}
      </div>
    </footer>
  )
}
