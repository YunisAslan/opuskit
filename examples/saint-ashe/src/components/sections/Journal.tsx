import type { ElementType } from 'react'
// OpusKit section — Journal: the latest 3 entries as an editorial list — date, category, title.
export type Entry = { title: string; date: string; category: string; href: string; image?: string; alt?: string }

export function JournalSection({ link: L = 'a', title, entries, allHref, preview = false, titleHidden = false }: { link?: ElementType; title: string; entries: Entry[]; allHref?: string; /** images show on hover (HoverPreview) instead of inline */ preview?: boolean; /** the chapter's giant word already titles it */ titleHidden?: boolean }) {
  return (
    <section className="px-4 pb-32 pt-12 md:px-10 md:pb-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-baseline justify-between gap-4"><h2 className={titleHidden ? 'sr-only' : 'type-heading'}>{title}</h2>{allHref && <L href={allHref} className="type-body underline underline-offset-4">All entries</L>}</div>
        <ul className={preview ? 'mt-4 border-t border-(--color-border)' : 'mt-10 grid gap-8 md:grid-cols-3'}>
          {entries.map((e) => (
            <li key={e.title} data-image={preview ? e.image : undefined} className={preview ? 'border-b border-(--color-border)' : undefined}><L href={e.href} className={preview ? 'group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:py-8' : 'group block'}>
              {!preview && e.image && <img src={e.image} alt={e.alt ?? ''} loading="lazy" className="mb-4 aspect-[3/2] w-full rounded-(--radius-media) object-cover" />}
              <p className="type-utility text-(--color-muted) md:col-span-3"><time>{e.date}</time>, {e.category}</p>
              <h3 className={`type-heading group-hover:underline group-hover:underline-offset-4 ${preview ? '[font-size:clamp(1.5rem,2.6vw,2.4rem)] md:col-span-9' : 'mt-2 [font-size:clamp(1.15rem,1.6vw,1.45rem)]'}`}>{e.title}</h3>
            </L></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
