// OpusKit section — Journal: the latest 3 entries as an editorial list — date, category, title.
// Phones get a plain list (no images); from md up, three framed cards.
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/MediaAsset'
import { ClipReveal, Reveal, RevealItem } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'

export type Entry = { title: string; date: string; category: string; href: string; image?: AssetKey; alt?: string }

export function JournalSection({ title, entries, allHref, footer }: { title: string; entries: Entry[]; allHref?: string; footer?: ReactNode }) {
  return (
    <section id="journal" className="scroll-mt-8 px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-baseline justify-between gap-4"><h2 className="type-heading">{title}</h2>{allHref && <Link href={allHref} className="type-body underline underline-offset-4">All entries</Link>}</div>
        <Reveal as="ul" stagger className="mt-12 grid border-t-2 border-(--color-text) md:mt-16 md:grid-cols-3 md:gap-6 md:border-t-0">
          {entries.map((e) => (
            <RevealItem as="li" key={e.href + e.title} className="border-b-2 border-(--color-text) md:border-b-0">
              <Link href={e.href} className="group block py-6 md:py-0">
                {e.image && (
                  <ClipReveal className="mb-6 hidden border-2 border-(--color-text) md:block">
                    <MediaAsset id={e.image} alt={e.alt} thumb className="aspect-[3/2] w-full rounded-(--radius-media) object-cover" />
                  </ClipReveal>
                )}
                <p className="type-utility flex flex-wrap items-center gap-3 text-(--color-muted)"><time>{e.date}</time><Badge variant="outline">{e.category}</Badge></p>
                <h3 className="type-heading mt-3 [font-size:clamp(1.25rem,1.8vw,1.5rem)] decoration-2 underline-offset-4 group-hover:underline group-focus-visible:underline">{e.title}</h3>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
        {footer}
      </div>
    </section>
  )
}
