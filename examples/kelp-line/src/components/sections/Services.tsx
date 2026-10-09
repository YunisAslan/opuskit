import type { ElementType, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
// OpusKit section — Services, "rows" design, fitted to Kelp Line: one row per way of joining in, rules between, beside
// the title. The hovered row takes the surface and, where it links, an arrow fades in at its end; a press answers.
// Phones: full-width rows, the line beneath the name. `lead` puts the page's own title above it (Programs).
type Service = { name: string; line: string; href?: string }

export function ServicesSection({ tone, link: L = 'a', title, intro, items, lead }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title: string; intro?: string; items: Service[]; lead?: ReactNode }) {
  if (!items.length) return null
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className={lead ? 'section-pad first-pad' : 'section-pad'}>
      <div className="frame">
        {lead}
        <div className={`grid gap-10 md:grid-cols-12 md:gap-x-(--gutter) ${lead ? 'mt-16 md:mt-24' : ''}`}>
          <div data-fade className="md:col-span-4">
            <div className="md:sticky md:top-28">
              {lead ? <h2 className="type-utility text-(--color-muted)">{title}</h2> : <h2 className="type-heading">{title}</h2>}
              {intro && <p className={`type-body max-w-[34ch] text-(--color-muted) ${lead ? 'mt-3' : 'mt-4'}`}>{intro}</p>}
            </div>
          </div>
          <ul className="border-t border-(--color-border) md:col-span-8">
            {items.map((s, i) => {
              const row = (
                <>
                  <h3 className="type-title">{s.name}</h3>
                  <p className="type-body max-w-[46ch] text-(--color-muted)">{s.line}</p>
                  {s.href && <ArrowUpRight aria-hidden strokeWidth={1.25} className="absolute right-3 top-6 hidden size-5 text-(--color-muted) opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 md:block" />}
                </>
              )
              const cls = 'grid gap-2 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8 md:px-4 md:pr-12'
              return (
                <li key={s.name} data-fade style={{ ['--i' as string]: i }} className="border-b border-(--color-border)">
                  {s.href
                    ? <L href={s.href} className={`group press relative rounded-(--radius-button) transition-colors duration-150 hover:bg-(--color-surface) focus-visible:bg-(--color-surface) active:scale-[0.99] ${cls}`}>{row}</L>
                    : <div className={`rounded-(--radius-button) transition-colors duration-150 hover:bg-(--color-surface) ${cls}`}>{row}</div>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
