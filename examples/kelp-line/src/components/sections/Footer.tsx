// OpusKit section — Footer "One quiet line", fitted to Kelp Line: one row on the page ground under a hairline — the
// wordmark and the count on the left, five links centred, the time on the coast and © on the right. Phones: three
// short centred lines. The ending is the count, said once more, quietly.
import type { ElementType, ReactNode } from 'react'

type Link = { label: string; href: string; current?: boolean }

export function FooterSection({ link: L = 'a', logo, lead, links, aside, copyright }: {
  link?: ElementType; logo: ReactNode; /** a quiet line beside the logo */ lead?: ReactNode; links: Link[]; /** live detail before © */ aside?: ReactNode; copyright: string
}) {
  return (
    <footer className="px-(--gutter) pb-[calc(28px+env(safe-area-inset-bottom,0px))] pt-[calc(var(--section-y)*0.5)]">
      <div className="type-utility frame grid items-center gap-5 border-t border-(--color-border) pt-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:text-left">
        <div className="flex flex-col items-center gap-x-4 gap-y-1 lg:flex-row lg:items-baseline">
          <L href="/" className="press link-quiet">{logo}</L>
          {lead && <span className="text-(--color-muted)">{lead}</span>}
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-x-6">
            {links.map((l) => (
              <li key={l.href}>
                <L href={l.href} aria-current={l.current ? 'page' : undefined} className="press link-quiet inline-flex min-h-11 items-center text-(--color-muted) hover:text-(--color-text) aria-[current=page]:text-(--color-text)">{l.label}</L>
              </li>
            ))}
          </ul>
        </nav>
        <p className="flex flex-wrap items-baseline justify-center gap-x-4 text-(--color-muted) lg:justify-end">
          {aside}
          <span>{copyright}</span>
        </p>
      </div>
    </footer>
  )
}
