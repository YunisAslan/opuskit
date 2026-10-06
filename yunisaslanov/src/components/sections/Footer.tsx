// OpusKit section — Footer in four variants (the recipe's footer style):
//   signature — a big signature logo, columns of links, the legal line. Dark.
//   wordmark  — links and contact in a row, then the brand name spanning the full width — set whole (`full`), cut off
//               by the bottom edge (`cropped`), or drawn as an outline (`outline`).
//   contact   — one big invitation with the email/phone as large links, details beside it.
//   line      — logo, a few links and © in one quiet line.
//   index     — every page, service and post in 3–4 columns, a map of the whole site, on the page ground.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
export type FooterVariant = 'signature' | 'wordmark' | 'contact' | 'line' | 'index'
type Link = { label: string; href: string }

// A plain underline on hover — the site's Links behaviour (scribble, roll, fill…) replaces it when one is picked.
const plain = 'underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current focus-visible:decoration-current aria-[current=page]:decoration-current'

export function FooterSection({ link: L = 'a', variant = 'signature', wordmark = 'full', logo, brand, columns, legal, copyright, invite = 'Let’s talk', contact = [], light = false }: {
  link?: ElementType; variant?: FooterVariant; wordmark?: 'full' | 'cropped' | 'outline'; logo: ReactNode; /** The name as text — the wordmark variant sets it huge. */ brand?: string; columns: FooterColumn[]
  legal?: Link[]; copyright: string; /** contact variant: the invitation and the ways to reach you. */ invite?: string; contact?: Link[]; light?: boolean
}) {
  const links = columns.flatMap((c) => c.links)
  const item = (l: Link & { current?: boolean }) => <L key={l.href + l.label} href={l.href} aria-current={l.current ? 'page' : undefined} className={plain}>{l.label}</L>
  const bottom = (
    <div className="type-utility mx-auto mt-16 flex max-w-(--container) flex-wrap justify-between gap-4 border-t border-current/20 pt-6 [font-size:0.9rem] opacity-70">
      <span>{copyright}</span>
      {legal && <span className="flex gap-6">{legal.map(item)}</span>}
    </div>
  )
  const ground = light || variant === 'line' || variant === 'index' ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-text) text-(--color-background)'

  if (variant === 'line') return (
    <footer className={`px-(--gutter) py-8 ${ground}`}>
      <div className="type-utility mx-auto flex max-w-(--container) flex-col items-center gap-4 border-t border-current/20 pt-6 text-center md:flex-row md:justify-between md:text-left">
        <div>{logo}</div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 *:py-3.5">{links.slice(0, 5).map(item)}</nav>
        <span className="opacity-70 [font-size:0.9rem]">{copyright}</span>
      </div>
    </footer>
  )

  if (variant === 'index') return (
    <footer className={`px-(--gutter) pb-8 pt-16 ${ground}`}>
      <div className="mx-auto max-w-(--container) border-t border-current/20 pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div>{logo}</div>
          {contact.length > 0 && <p className="type-body flex flex-wrap gap-x-6 gap-y-1">{contact.map(item)}</p>}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="type-utility opacity-70">{col.title}</h2>
              <ul className="type-body mt-3 space-y-1.5">{col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}</ul>
            </nav>
          ))}
        </div>
      </div>
      {bottom}
    </footer>
  )

  if (variant === 'wordmark' && wordmark === 'cropped') return (
    <footer className={`overflow-hidden px-(--gutter) pt-16 ${ground}`}>
      <nav aria-label="Footer" className="type-utility mx-auto flex max-w-(--container) flex-wrap gap-x-8 gap-y-3">{links.map(item)}</nav>
      <div className="type-utility mx-auto mt-8 flex max-w-(--container) flex-wrap justify-between gap-4 [font-size:0.9rem] opacity-70"><span>{copyright}</span>{legal && <span className="flex gap-6">{legal.map(item)}</span>}</div>
      <p aria-hidden className="type-display mx-auto mt-10 -mb-[0.22em] max-w-(--container) whitespace-nowrap leading-[0.8] [font-size:clamp(5rem,23vw,22rem)]">{brand ?? logo}</p>
    </footer>
  )

  if (variant === 'wordmark') return (
    <footer className={`overflow-hidden px-(--gutter) pb-8 pt-16 ${ground}`}>
      <nav aria-label="Footer" className="type-utility mx-auto flex max-w-(--container) flex-wrap gap-x-8 gap-y-3">{links.map(item)}</nav>
      <p aria-hidden className={`type-display mx-auto mt-12 max-w-(--container) whitespace-nowrap leading-[0.8] [font-size:clamp(4rem,17vw,16rem)] ${wordmark === 'outline' ? '[-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_currentColor]' : ''}`}>{brand ?? logo}</p>
      {bottom}
    </footer>
  )

  if (variant === 'contact') return (
    <footer className={`px-(--gutter) pb-8 pt-20 ${ground}`}>
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <h2 className="type-display [font-size:clamp(2.6rem,6vw,5.5rem)]">{invite}</h2>
          <ul className="type-heading mt-8 space-y-2 [font-size:clamp(1.3rem,2.4vw,2rem)]">{contact.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}</ul>
        </div>
        <div className="type-body space-y-6 opacity-90 md:col-span-4">
          {logo}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="type-utility opacity-70">{col.title}</h3>
              <ul className="mt-2 space-y-1">{col.links.map((l) => <li key={l.href + l.label}>{item(l)}</li>)}</ul>
            </nav>
          ))}
        </div>
      </div>
      {bottom}
    </footer>
  )

  return (
    <footer className={`px-(--gutter) pb-8 pt-16 ${ground}`}>
      <div className="mx-auto grid max-w-(--container) gap-12 border-t border-current/20 pt-16 md:grid-cols-12">
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
