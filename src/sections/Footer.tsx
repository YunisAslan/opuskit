// OpusKit section — Signature footer: a big signature logo, columns of links with a wavy underline on hover
// (pure CSS, no script), real contact details and the legal line. Dark by default (it closes the page).
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }

const wavy = 'underline decoration-wavy decoration-transparent decoration-[1.5px] underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-(--color-chapter-2,var(--color-accent)) focus-visible:decoration-(--color-chapter-2,var(--color-accent)) aria-[current=page]:decoration-(--color-chapter-2,var(--color-accent))'

export function FooterSection({ link: L = 'a', logo, columns, legal, copyright, light = false }: { link?: ElementType; logo: ReactNode; columns: FooterColumn[]; legal?: { label: string; href: string }[]; copyright: string; light?: boolean }) {
  return (
    <footer className={`px-5 pb-8 pt-16 md:px-10 ${light ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-text) text-(--color-background)'}`}>
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-current/20 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">{logo}</div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="type-heading [font-size:1.15rem]">{col.title}</h2>
            <ul className="type-utility mt-4 space-y-2 opacity-90">
              {col.links.map((l) => <li key={l.href + l.label}><L href={l.href} aria-current={l.current ? 'page' : undefined} className={wavy}>{l.label}</L></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="type-utility mx-auto mt-16 flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-current/20 pt-6 [font-size:0.9rem] opacity-70">
        <span>{copyright}</span>
        {legal && <span className="flex gap-6">{legal.map((l) => <L key={l.href + l.label} href={l.href} className={wavy}>{l.label}</L>)}</span>}
      </div>
    </footer>
  )
}
