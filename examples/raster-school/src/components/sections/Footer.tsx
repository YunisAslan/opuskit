// OpusKit section — Footer, `wordmark` / `cropped` (Big name), `light` (on the page ground). Links and contact in one
// row at the top, the copyright and legal line, then the brand name in the display face across the full container
// width, cut off by the bottom edge of the page. Fitted to Raster School: the top row sits on the column lines (pages,
// contact, the next cohort, the studio's time). The name is sized to fit in one line from the container's own width
// (container query units), so it spans edge to edge at every width with no script — the hero's split wordmark, closed
// into one word at the end of every page.
import type { ElementType, ReactNode } from 'react'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }

export function FooterSection({ link: L = 'a', brand, columns, contact, extra, legal, copyright }: {
  link?: ElementType; variant?: 'wordmark'; wordmark?: 'cropped'; light?: boolean; brand: string; columns: FooterColumn[]
  contact: ReactNode; extra?: ReactNode; legal?: string; copyright: string
}) {
  return (
    <footer className="relative overflow-hidden bg-(--color-background) px-(--gutter) pt-16 text-(--color-text) lg:pt-24">
      <div className="raster gap-y-10 border-t border-(--color-text) pt-4">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="col-span-2 sm:col-span-2 lg:col-span-3">
            <h2 className="type-utility text-(--color-muted)">{col.title}</h2>
            <ul className="mt-3">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <L href={l.href} aria-current={l.current ? 'page' : undefined} className="press type-utility link-line inline-flex min-h-9 items-center [font-size:0.9375rem]">{l.label}</L>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="col-span-4 sm:col-span-4 lg:col-span-3">
          <h2 className="type-utility text-(--color-muted)">Contact</h2>
          <div className="type-utility mt-3 [font-size:0.9375rem]">{contact}</div>
        </div>
        {extra && <div className="col-span-4 sm:col-span-2 lg:col-span-3">{extra}</div>}
      </div>
      <div className="type-caption mt-16 flex flex-wrap justify-between gap-x-6 gap-y-1 text-(--color-muted) lg:mt-24">
        <span>{copyright}</span>
        {legal && <span>{legal}</span>}
      </div>
      <div className="mt-4 [container-type:inline-size]">
        <p aria-hidden className="type-display -mb-[0.13em] whitespace-nowrap leading-[0.78] [font-size:calc(100cqw/var(--wordmark-em,6.27))]">{brand}</p>
      </div>
    </footer>
  )
}
