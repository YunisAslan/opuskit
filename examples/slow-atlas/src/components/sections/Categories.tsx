import type { ElementType } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'
// OpusKit section — Categories: tiles that show the range at a glance — a picture, a name and how many are inside.
export function CategoriesSection({ link: L = 'a', title, items }: { link?: ElementType; title: string; items: { name: string; href?: string; image?: string; alt?: string; count?: string }[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <CutReveal className="type-heading">{title}</CutReveal>
      <ul className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-10 ${items.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
        {items.map((c) => {
          const tile = (
            <>
              <div className="aspect-[4/5] overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
                {c.image && <img src={c.image} alt={c.alt ?? ''} loading="lazy" className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" />}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-(--color-border) pt-3">
                <h3 className="type-heading decoration-2 underline-offset-[6px] [font-size:clamp(1.15rem,1.8vw,1.6rem)] group-hover:underline group-focus-visible:underline">{c.name}</h3>
                {c.count && <span className="type-utility shrink-0 text-(--color-muted)">{c.count}</span>}
              </div>
            </>
          )
          return <li key={c.name}>{c.href ? <L href={c.href} className="group block">{tile}</L> : tile}</li>
        })}
      </ul>
    </section>
  )
}
