// OpusKit section — Footer in four variants (the recipe's footer style):
//   signature — a big signature logo, columns of links with a wavy underline on hover (pure CSS, no script), the legal line. Dark.
//   wordmark  — links and contact in a row, then the brand name spanning the full width.
//   contact   — one big invitation with the email/phone as large links, details beside it.
//   line      — logo, a few links and © in one quiet line.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
export type FooterVariant = 'signature' | 'wordmark' | 'contact' | 'line'
type Link = { label: string; href: string }

const wavy = 'underline decoration-wavy decoration-transparent decoration-[1.5px] underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-(--color-chapter-2,var(--color-accent)) focus-visible:decoration-(--color-chapter-2,var(--color-accent)) aria-[current=page]:decoration-(--color-chapter-2,var(--color-accent))'

export function FooterSection({ link: L = 'a', variant = 'signature', logo, brand, columns, legal, copyright, invite = 'Let’s talk', contact = [], details, light = false }: {
  link?: ElementType; variant?: FooterVariant; logo: ReactNode; /** The name as text — the wordmark variant sets it huge. */ brand?: string; columns: FooterColumn[]
  legal?: Link[]; copyright: string; /** contact variant: the invitation and the ways to reach you. */ invite?: string; contact?: Link[]; /** contact variant: address, hours, a live line — shown beside the invitation */ details?: ReactNode; light?: boolean
}) {
  const links = columns.flatMap((c) => c.links)
  const item = (l: Link & { current?: boolean }) => <L key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className={wavy}>{l.label}</L>
  const bottom = (
    <div className="type-utility mx-auto mt-16 flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-current/20 pt-6 [font-size:0.9rem] opacity-70">
      <span>{copyright}</span>
      {legal && <span className="flex gap-6">{legal.map(item)}</span>}
    </div>
  )
  const ground = light || variant === 'line' ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-text) text-(--color-background)'

  if (variant === 'line') return (
    <footer className={`px-5 py-8 md:px-10 ${ground}`}>
      <div className="type-utility mx-auto flex max-w-[1440px] flex-col items-center gap-4 border-t border-current/20 pt-6 text-center md:flex-row md:justify-between md:text-left">
        <div>{logo}</div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-6">{links.slice(0, 5).map(item)}</nav>
        <span className="opacity-70 [font-size:0.9rem]">{copyright}</span>
      </div>
    </footer>
  )

  if (variant === 'wordmark') return (
    <footer className={`overflow-hidden px-5 pb-8 pt-16 md:px-10 ${ground}`}>
      <nav aria-label="Footer" className="type-utility mx-auto flex max-w-[1440px] flex-wrap gap-x-8 gap-y-3">{links.map(item)}</nav>
      <p aria-hidden className="type-display mx-auto mt-12 max-w-[1440px] whitespace-nowrap leading-[0.8] [font-size:clamp(4rem,17vw,16rem)]">{brand ?? logo}</p>
      {bottom}
    </footer>
  )

  if (variant === 'contact') return (
    <footer className={`px-[5vw] pb-8 pt-[clamp(60px,8vw,120px)] ${ground}`}>
      <div className="grid gap-x-[2vw] gap-y-12 border-t border-current/20 pt-[clamp(48px,6vw,96px)] md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="type-display text-balance">{invite}</h2>
          <ul className="type-heading mt-10 space-y-3 [font-size:clamp(1.6rem,3vw,2.6rem)]">{contact.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}</ul>
        </div>
        <div className="type-body space-y-6 md:col-span-4 md:col-start-9 md:self-end">
          {logo}
          {details}
        </div>
      </div>
      <nav aria-label="Footer" className="type-utility mt-16 flex flex-wrap gap-x-6 gap-y-3">{links.map(item)}</nav>
      {bottom}
    </footer>
  )

  return (
    <footer className={`px-5 pb-8 pt-16 md:px-10 ${ground}`}>
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-current/20 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">{logo}</div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="type-heading [font-size:1.15rem]">{col.title}</h2>
            <ul className="type-utility mt-4 space-y-2 opacity-90">
              {col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}
            </ul>
          </nav>
        ))}
      </div>
      {bottom}
    </footer>
  )
}
