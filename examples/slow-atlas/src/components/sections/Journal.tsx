import type { ElementType, ReactNode } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'
import { Badge } from '@/components/ui/badge'
// OpusKit section — Journal: the latest entries as an editorial list — date, category, title.
// Bordered 4:3 modules on 3 columns from tablet up; a plain list with a square thumbnail on phones.
// layout="list": one row per entry at every width (the archive).
export type Entry = { title: string; date: string; category: string; href: string; image?: string; alt?: string }

export function JournalSection({ link: L = 'a', title, entries, allHref, allLabel = 'All essays', layout = 'cards', footer }: {
  link?: ElementType; title: string; entries: Entry[]; allHref?: string; allLabel?: string; layout?: 'cards' | 'list'; footer?: ReactNode
}) {
  const cards = layout === 'cards'
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="flex items-baseline justify-between gap-4">
        <CutReveal className="type-heading">{title}</CutReveal>
        {allHref && <L href={allHref} className="type-utility inline-flex min-h-11 items-center underline decoration-(--color-border) decoration-2 underline-offset-[6px] [font-size:1rem] hover:decoration-current">{allLabel}</L>}
      </div>
      <ul className={`mt-10 border-t border-(--color-border) ${cards ? 'sm:grid sm:grid-cols-3 sm:border-l' : ''}`}>
        {entries.map((e) => (
          <li key={e.href} className={`border-b border-(--color-border) ${cards ? 'sm:border-r' : ''}`}>
            <L href={e.href} className={`group flex gap-4 py-5 ${cards ? 'sm:h-full sm:flex-col sm:gap-0 sm:p-0' : 'md:grid md:grid-cols-12 md:items-center md:gap-4'}`}>
              {e.image && (
                <span className={`block shrink-0 overflow-hidden ${cards ? 'size-24 sm:aspect-[4/3] sm:size-auto' : 'size-24 md:col-span-2 md:aspect-[4/3] md:size-auto'}`}>
                  <img src={e.image} alt={e.alt ?? ''} loading="lazy" className="size-full rounded-(--radius-media) object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
                </span>
              )}
              <div className={`flex min-w-0 flex-col gap-2 ${cards ? 'sm:flex-1 sm:p-5 sm:pb-8' : 'md:col-span-10 md:grid md:grid-cols-10 md:items-baseline md:gap-4'}`}>
                <span className={`type-utility flex flex-wrap items-center gap-3 text-(--color-muted) ${cards ? '' : 'md:col-span-3'}`}>
                  <time>{e.date}</time>
                  <Badge variant="outline" className="h-6 border-(--color-border) px-2 text-(--color-text)">{e.category}</Badge>
                </span>
                <h3 className={`type-heading text-balance underline-offset-[6px] decoration-2 group-hover:underline group-focus-visible:underline ${cards ? '[font-size:clamp(1.2rem,1.8vw,1.6rem)]' : 'md:col-span-7 [font-size:clamp(1.2rem,2.4vw,2.1rem)]'}`}>{e.title}</h3>
              </div>
            </L>
          </li>
        ))}
      </ul>
      {footer}
    </section>
  )
}
