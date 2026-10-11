import type { ElementType } from 'react'
// OpusKit section — Categories: the range at a glance — a name and how many are inside. Two designs:
//   tiles — a picture over each name.
//   words — no pictures: each category's name set huge on its own rule, its count beside it.
export function CategoriesSection({ tone, variant = 'tiles', link: L = 'a', title, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'tiles' | 'words'; link?: ElementType; title: string; items: { name: string; href?: string; image?: string; alt?: string; count?: string }[] }) {
  if (variant === 'words') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        <ul className="mt-6 border-t border-(--color-text)">
          {items.map((c) => {
            const row = <><span className="type-display [font-size:clamp(2.2rem,7vw,6rem)] leading-[0.95] transition-[translate] duration-300 ease-(--ease-out) [@media(hover:hover)]:group-hover:translate-x-3">{c.name}</span>{c.count && <span className="type-utility shrink-0 text-(--color-muted)">{c.count}</span>}</>
            return <li key={c.name} className="border-b border-(--color-border)">{c.href ? <L href={c.href} className="group flex items-baseline justify-between gap-6 py-4">{row}</L> : <div className="flex items-baseline justify-between gap-6 py-4">{row}</div>}</li>
          })}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 ${items.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
          {items.map((c) => {
            const tile = (
              <>
                <div className="aspect-(--ratio-card) overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
                  {c.image && <img src={c.image} alt={c.alt ?? ''} loading="lazy" className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="type-heading [font-size:clamp(1.1rem,1.6vw,1.4rem)] group-hover:underline group-hover:underline-offset-4">{c.name}</h3>
                  {c.count && <span className="type-utility shrink-0 text-(--color-muted)">{c.count}</span>}
                </div>
              </>
            )
            return <li key={c.name}>{c.href ? <L href={c.href} className="group block">{tile}</L> : tile}</li>
          })}
        </ul>
      </div>
    </section>
  )
}
