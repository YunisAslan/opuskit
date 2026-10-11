import type { ElementType } from 'react'
// OpusKit section — Journal: the latest entries — date, category, title. Three designs:
//   cards — three columns, a picture over each title.
//   index — no pictures: each title set large on its own rule, the date and category at the side, like a contents page.
//   lead  — the newest entry large with its picture; the next ones stacked beside it as plain titles.
export type Entry = { title: string; date: string; category: string; href: string; image?: string; alt?: string }

export function JournalSection({ tone, variant = 'cards', link: L = 'a', title, entries, allHref }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'cards' | 'index' | 'lead'; link?: ElementType; title: string; entries: Entry[]; allHref?: string }) {
  const meta = (e: Entry) => <p className="type-utility text-(--color-muted)"><time>{e.date}</time>, {e.category}</p>
  const head = <div className="flex items-baseline justify-between gap-4"><h2 className="type-heading">{title}</h2>{allHref && <L href={allHref} className="type-body underline underline-offset-4">All entries</L>}</div>
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'index') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {head}
        <ul className="mt-10 border-t border-(--color-border)">
          {entries.map((e) => (
            <li key={e.href} className="border-b border-(--color-border)"><L href={e.href} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
              <div className="md:col-span-3">{meta(e)}</div>
              <h3 className="type-display text-balance [font-size:clamp(1.6rem,3.4vw,3rem)] leading-[1.05] transition-[translate] duration-300 ease-(--ease-out) md:col-span-9 [@media(hover:hover)]:group-hover:translate-x-2">{e.title}</h3>
            </L></li>
          ))}
        </ul>
      </div>
    </section>
  )
  if (variant === 'lead') {
    const [first, ...rest] = entries
    return (
      <section data-tone={t} className="px-(--gutter) py-(--section-y)">
        <div className="mx-auto max-w-(--container)">
          {head}
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            {first && <L href={first.href} className="group block md:col-span-7">
              {first.image && <img src={first.image} alt={first.alt ?? ''} loading="lazy" className="mb-5 aspect-(--ratio-media) w-full rounded-(--radius-media) object-cover" />}
              {meta(first)}
              <h3 className="type-display mt-3 text-balance [font-size:clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] group-hover:underline group-hover:underline-offset-4">{first.title}</h3>
            </L>}
            <ul className="divide-y divide-(--color-border) md:col-span-4 md:col-start-9 md:self-end">
              {rest.map((e) => (
                <li key={e.href}><L href={e.href} className="group block py-5">{meta(e)}<h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.45rem)] group-hover:underline group-hover:underline-offset-4">{e.title}</h3></L></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {head}
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {entries.map((e) => (
            <li key={e.href}><L href={e.href} className="group block">
              {e.image && <img src={e.image} alt={e.alt ?? ''} loading="lazy" className="mb-4 aspect-(--ratio-media) w-full rounded-(--radius-media) object-cover" />}
              {meta(e)}
              <h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.45rem)] group-hover:underline group-hover:underline-offset-4">{e.title}</h3>
            </L></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
