import type { ElementType } from 'react'
import { Chapter } from '@/components/site/Motif'
import { Badge } from '@/components/ui/badge'

// OpusKit section — Journal: the latest 3 entries as an editorial list — picture, date, category, title.
// Phone: a plain list (small picture beside the words).
export type Entry = { title: string; date: string; dateTime?: string; category: string; href: string; image?: string; alt?: string }

export function JournalSection({ link: L = 'a', title, entries, allHref }: { link?: ElementType; title: string; entries: Entry[]; allHref?: string }) {
  return (
    <section data-reveal className="py-32 md:py-40">
      <div className="shell">
        <div className="flex items-baseline justify-between gap-4">
          <Chapter><h2 className="type-heading">{title}</h2></Chapter>
          {allHref && <L href={allHref} className="type-body underline underline-offset-4">All entries</L>}
        </div>
        <ul className="mt-12 divide-y divide-(--color-border) border-y border-(--color-border) md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:divide-y-0 md:border-0">
          {entries.map((e, i) => (
            <li key={e.href} data-rise style={{ '--i': i } as React.CSSProperties}>
              <L href={e.href} className="group grid grid-cols-[96px_1fr] items-center gap-5 py-6 md:block md:py-0">
                {e.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.image} alt={e.alt ?? ''} loading="lazy" decoding="async" className="aspect-square w-full rounded-(--radius-media) object-cover md:mb-6 md:aspect-[4/5]" />
                )}
                <div>
                  <p className="type-utility flex flex-wrap items-center gap-3 text-(--color-muted)">
                    <Badge variant="outline" className="h-6 rounded-button border-(--color-border) px-2.5 text-(--color-muted)">{e.category}</Badge>
                    <time dateTime={e.dateTime}>{e.date}</time>
                  </p>
                  <h3 className="type-heading mt-3 underline decoration-transparent decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-150 ease-out [font-size:clamp(1.15rem,1.6vw,1.45rem)] group-hover:decoration-current group-focus-visible:decoration-current">{e.title}</h3>
                </div>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
