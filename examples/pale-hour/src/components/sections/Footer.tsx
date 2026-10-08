// Footer — Signature columns. A dark band (the text colour as ground): the name large on the left across 5 of 12
// columns with one line about the building, then three link columns with headings, then a hairline and one row:
// copyright left, legal links right. Phones: the name, the columns stacked, the legal row wrapped.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean; external?: boolean }[]; extra?: ReactNode }
type Link = { label: string; href: string }

export function FooterSection({ link: L = 'a', logo, line, columns, legal, copyright }: {
  link?: ElementType; logo: ReactNode; line?: ReactNode; columns: FooterColumn[]; legal?: Link[]; copyright: string
}) {
  const item = (l: Link & { current?: boolean; external?: boolean }) => {
    const Tag = l.external || /^(https?:|mailto:|tel:)/.test(l.href) ? 'a' : L
    return (
      <Tag key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className="link inline-flex min-h-8 items-center"
        {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</Tag>
    )
  }
  return (
    <footer data-tone="inverse" className="relative z-10 px-(--gutter) pb-8 pt-[calc(var(--section-y)*0.66)]">
      <div className="mx-auto grid max-w-(--container) gap-x-(--gutter) gap-y-14 md:grid-cols-12">
        <div className="md:col-span-5">
          {logo}
          {line && <p className="type-body mt-6 max-w-[32ch] text-(--color-muted)">{line}</p>}
        </div>
        {columns.map((col, n) => (
          <nav key={col.title} aria-label={col.title} className={n === 0 ? 'md:col-span-2 md:col-start-7' : 'md:col-span-2'}>
            <h2 className="type-utility text-(--color-muted)">{col.title}</h2>
            {col.extra}
            <ul className="type-utility mt-4 space-y-1">
              {col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="type-utility mx-auto mt-[calc(var(--section-y)*0.5)] flex max-w-(--container) flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-(--color-border) pt-6 text-(--color-muted)">
        <span>{copyright}</span>
        {legal && <span className="flex gap-8">{legal.map(item)}</span>}
      </div>
    </footer>
  )
}
