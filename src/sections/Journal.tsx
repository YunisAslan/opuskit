// OpusKit section — Journal: the latest 3 entries as an editorial list — date, category, title.
export type Entry = { title: string; date: string; category: string; href: string; image?: string; alt?: string }

export function JournalSection({ title, entries, allHref }: { title: string; entries: Entry[]; allHref?: string }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-baseline justify-between gap-4"><h2 className="type-heading">{title}</h2>{allHref && <a href={allHref} className="type-body underline underline-offset-4">All entries</a>}</div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {entries.map((e) => (
            <li key={e.href}><a href={e.href} className="group block">
              {e.image && <img src={e.image} alt={e.alt ?? ''} loading="lazy" className="mb-4 aspect-[3/2] w-full rounded-(--radius-media) object-cover" />}
              <p className="type-utility text-(--color-muted)"><time>{e.date}</time>, {e.category}</p>
              <h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.45rem)] group-hover:underline group-hover:underline-offset-4">{e.title}</h3>
            </a></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
