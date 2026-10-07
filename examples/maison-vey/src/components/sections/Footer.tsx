// OpusKit section — Footer, "Signature columns": a dark band (the text colour as ground), the logo large over five of
// twelve columns, link columns with headings, then a hairline and one row: copyright left, legal links right.
// Fitted to Maison Vey: menu and footer links share the utility face; the closing line is the house's one sentence.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
type Link = { label: string; href: string }

export function FooterSection({ link: L = 'a', logo, columns, legal, copyright, aside, line }: {
  link?: ElementType; logo: ReactNode; columns: FooterColumn[]; legal?: Link[]; copyright: string
  /** A last column that is not links (address, email). */ aside?: { title: string; body: ReactNode }
  /** One closing sentence under the logo. */ line?: string
}) {
  const item = (l: Link & { current?: boolean }) => (
    <L key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className="link-quiet inline-flex min-h-11 items-center md:min-h-0">{l.label}</L>
  )
  return (
    <footer className="bg-(--color-text) px-(--gutter) pb-8 pt-24 text-(--color-background) md:pt-32">
      <div className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) gap-y-16 md:grid-cols-12">
        <div className="md:col-span-5">
          {logo}
          {line && <p className="type-body mt-8 max-w-[32ch]">{line}</p>}
        </div>
        <div className="grid grid-cols-2 gap-x-(--grid-gap) gap-y-12 md:col-span-7 md:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="type-utility opacity-70">{col.title}</h2>
              <ul className="type-utility mt-5 space-y-0 md:space-y-3">
                {col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}
              </ul>
            </nav>
          ))}
          {aside && (
            <div className="col-span-2 md:col-span-1">
              <h2 className="type-utility opacity-70">{aside.title}</h2>
              <div className="type-caption mt-5">{aside.body}</div>
            </div>
          )}
        </div>
      </div>
      <div className="type-caption mx-auto mt-24 flex max-w-(--container) flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-current/20 pt-6 md:mt-32">
        <span>{copyright}</span>
        {legal && <span className="flex gap-6">{legal.map(item)}</span>}
      </div>
    </footer>
  )
}
