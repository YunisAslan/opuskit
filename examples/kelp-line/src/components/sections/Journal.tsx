import type { ElementType } from 'react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Badge } from '@/components/ui/badge'
// OpusKit section — Journal, fitted to Kelp Line: the latest three entries from the logbook — picture, date, category
// (a quiet badge) and title; the title underlines on hover. Phones: a list, small picture beside the words.
export type Entry = { title: string; date: string; category: string; href: string; image: number; alt: string }

export function JournalSection({ tone, link: L = 'a', title, entries }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title: string; entries: Entry[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame">
        <h2 data-fade className="type-heading">{title}</h2>
        {entries.length === 0 ? (
          <p className="type-body mt-8 text-(--color-muted)">The next entry is being written on the quay. Sign up to the tide letter below to get it first.</p>
        ) : (
          <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-x-(--gutter) md:gap-y-10">
            {entries.map((e, i) => (
              <li key={e.title} data-fade style={{ ['--i' as string]: i }}>
                <L href={e.href} className="group press grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4 rounded-(--radius-media) active:scale-[0.99] md:block">
                  <MediaAsset id="journal" index={e.image} alt={e.alt} ratio="var(--ratio-media)" sizes="(min-width: 768px) 30vw, 120px" />
                  <div className="md:mt-5">
                    <p className="type-caption flex flex-wrap items-center gap-x-3 gap-y-1 text-(--color-muted)"><time>{e.date}</time><Badge>{e.category}</Badge></p>
                    <h3 className="type-title mt-2 decoration-1 underline-offset-4 group-hover:underline group-focus-visible:underline">{e.title}</h3>
                  </div>
                </L>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
