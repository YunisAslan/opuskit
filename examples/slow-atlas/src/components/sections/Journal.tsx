import type { ElementType } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Headline, Reveal } from '@/components/site/motion'
import type { AssetKey } from '@/config/assets'

// OpusKit section — Journal: entries as bordered modules (desktop) or a ruled list (mobile) — date, category, title.
export type Entry = { title: string; date: string; dateTime: string; category: string; place?: string; href: string; image?: AssetKey }

export function JournalSection({ link: L = 'a', title, titleLines, headingAs = 'h2', lede, entries, all, pages }: {
  link?: ElementType
  title: string
  /** Manual line breaks for the page-level (h1) version; see Headline. */
  titleLines?: (string | string[])[]
  headingAs?: 'h1' | 'h2'
  lede?: string
  entries: Entry[]
  all?: { label: string; href: string }
  pages?: { current: number; total: number; href: (page: number) => string }
}) {
  const page = headingAs === 'h1'
  return (
    <section className="border-t border-(--color-border) px-6 py-12 first:border-t-0 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <Headline
          as={headingAs}
          lines={titleLines ?? [title]}
          className={page ? 'type-display [font-size:clamp(3rem,7vw,6.5rem)]' : 'type-display [font-size:clamp(2.25rem,5vw,4.5rem)]'}
        />
        {all && <L href={all.href} className="type-utility inline-flex min-h-11 items-center underline underline-offset-4 [font-size:1rem] hover:decoration-2">{all.label}</L>}
      </div>
      {lede && <p className="type-body mt-6 max-w-[56ch]">{lede}</p>}

      <ul className="mt-8 border-t border-(--color-border) md:mt-12 md:grid md:grid-cols-6 md:border-l lg:grid-cols-12">
        {entries.map((e, i) => (
          <li key={e.href} className="border-b border-(--color-border) md:col-span-3 md:border-r lg:col-span-4">
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <L href={e.href} className="group grid h-full grid-cols-[6rem_1fr] gap-4 py-6 md:flex md:flex-col md:gap-0 md:p-6">
                {e.image && (
                  <div className="aspect-square md:mb-6 md:aspect-[4/3]">
                    <MediaAsset id={e.image} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 96px" />
                  </div>
                )}
                <div>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Badge variant="secondary" className="type-utility h-6 px-2">{e.category}</Badge>
                    <time dateTime={e.dateTime} className="type-utility text-(--color-muted)">{e.date}</time>
                  </p>
                  <h3 className="type-heading mt-3 text-balance decoration-2 underline-offset-4 [font-size:clamp(1.25rem,2vw,1.75rem)] group-hover:underline group-focus-visible:underline">{e.title}</h3>
                  {e.place && <p className="type-utility mt-2 text-(--color-muted) [font-size:0.9375rem]">{e.place}</p>}
                </div>
              </L>
            </Reveal>
          </li>
        ))}
      </ul>

      {pages && pages.total > 1 && (
        <Pagination className="mt-12 justify-start">
          <PaginationContent className="gap-0 border-l border-(--color-border)">
            {Array.from({ length: pages.total }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n} className="border-y border-r border-(--color-border)">
                <Button asChild variant={n === pages.current ? 'default' : 'ghost'} size="icon">
                  <L href={pages.href(n)} aria-current={n === pages.current ? 'page' : undefined} aria-label={`Page ${n}`}>{n}</L>
                </Button>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </section>
  )
}
