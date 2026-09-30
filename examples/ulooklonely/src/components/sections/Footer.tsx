// OpusKit section — Signature footer: a big signature logo, columns of links with a wavy underline on hover
// (pure CSS, no script), real contact details and the legal line. Dark by default (it closes the page).
import Link from 'next/link'
import type { ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }

const wavy = 'inline-flex min-h-11 items-center underline decoration-wavy decoration-transparent decoration-[1.5px] underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-(--color-chapter-2,var(--color-accent)) focus-visible:decoration-(--color-chapter-2,var(--color-accent)) aria-[current=page]:decoration-(--color-chapter-2,var(--color-accent))'

export function FooterSection({ logo, columns, legal, copyright, light = false }: { logo: ReactNode; columns: FooterColumn[]; legal?: { label: string; href: string }[]; copyright: string; light?: boolean }) {
  return (
    <footer className={`px-6 pb-32 pt-16 md:px-10 md:pb-32 ${light ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-text) text-(--color-background)'}`}>
      <div className="mx-auto grid max-w-[1200px] gap-12 border-t-2 border-current pt-16 md:grid-cols-12">
        <div className="md:col-span-5">{logo}</div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="type-heading [font-size:1.15rem]">{col.title}</h2>
            <ul className="type-utility mt-2">
              {col.links.map((l) => <li key={l.href + l.label}><Link href={l.href} aria-current={l.current ? 'page' : undefined} className={wavy}>{l.label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="type-utility mx-auto mt-16 flex max-w-[1200px] flex-wrap justify-between gap-4 border-t-2 border-current pt-6 [font-size:0.9rem]">
        <span>{copyright}</span>
        {legal && <span className="flex gap-6">{legal.map((l) => <Link key={l.href + l.label} href={l.href} className={wavy}>{l.label}</Link>)}</span>}
      </div>
    </footer>
  )
}
