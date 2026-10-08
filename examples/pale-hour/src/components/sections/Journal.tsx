// Journal — the latest three entries: the opening picture, date and category, title. Three columns from 768px,
// a ruled list on phones (a small picture beside each title). The title underlines on hover.
import type { ElementType, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Badge } from '@/components/ui/badge'
import type { Media } from '@/config/assets'

export type Entry = { title: string; date: string; iso: string; category: string; href: string; image: Media }

export function JournalSection({ tone, link: L = 'a', title, entries }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title: ReactNode; entries: Entry[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {title}
        <Reveal as="ul" className="mt-[calc(var(--section-y)*0.4)] grid border-t border-(--color-text) md:grid-cols-3 md:gap-x-(--gutter) md:border-t-0">
          {entries.map((e, n) => (
            <li key={e.href + e.title} className="rv border-b border-(--color-border) md:border-b-0" style={i(n)}>
              <L href={e.href} className="group grid grid-cols-[5.5rem_1fr] items-start gap-4 py-5 md:block md:py-0">
                <div className="overflow-hidden md:mb-5">
                  <MediaAsset m={e.image} sizes="(min-width: 768px) 30vw, 88px" className="aspect-(--ratio-media) object-cover" />
                </div>
                <div>
                  <p className="type-caption flex flex-wrap items-center gap-x-3 gap-y-1 text-(--color-muted)">
                    <time dateTime={e.iso}>{e.date}</time>
                    <Badge>{e.category}</Badge>
                  </p>
                  <h3 className="type-heading mt-3 [font-size:clamp(1.2rem,1.7vw,1.5rem)] decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">{e.title}</h3>
                </div>
              </L>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
