import type { CSSProperties, ElementType } from 'react'
// OpusKit section — Featured Work: 3–6 best projects. Four designs:
//   staggered — large and small alternating, so the rhythm never repeats.
//   index     — a typographic list: each project a big title on a rule, its year/kind on the right, a small picture
//               beside it (many projects, the names matter).
//   grid      — an even two-column grid, every picture the same shape (a calm catalogue).
//   stack     — one project per row at full width, the picture first (few projects, big pictures).
export type Project = { title: string; meta: string; image: string; alt: string; href: string }

export function FeaturedWorkSection({ tone, variant = 'staggered', link: L = 'a', title, projects }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'staggered' | 'index' | 'grid' | 'stack'; link?: ElementType; title: string; projects: Project[] }) {
  const t = tone === 'ground' ? undefined : tone
  const caption = (p: Project) => (
    <div className="mt-4 flex items-baseline justify-between gap-4">
      <h3 className="type-heading [font-size:clamp(1.25rem,1.8vw,1.6rem)] group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
      <p className="type-utility shrink-0 text-(--color-muted)">{p.meta}</p>
    </div>
  )
  const img = (p: Project, ratio: string) => <div className="overflow-hidden rounded-(--radius-media)"><img src={p.image} alt={p.alt} loading="lazy" className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${ratio}`} /></div>

  if (variant === 'index') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        <ul className="mt-8 border-t border-(--color-border)">
          {projects.map((p, i) => (
            <li key={p.href} className="border-b border-(--color-border)">
              {/* Off-grid on purpose: each row starts at its own column of the 24, each print sits at its own angle */}
              <L href={p.href} style={{ '--o': [0, 3, 1, 5][i % 4], '--r': ['-3deg', '2.5deg', '-2deg', '3.5deg'][i % 4] } as CSSProperties}
                className="group grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-1 py-6 md:grid-cols-[1fr_10rem_7.5rem] md:gap-x-8 md:py-7 md:ps-[calc(var(--o)*100%/24)]">
                <span className="taped row-span-2 block rotate-(--r) transition-transform duration-300 group-hover:rotate-0 motion-reduce:transition-none md:order-3 md:row-span-1">
                  <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover md:opacity-80 md:transition-opacity md:group-hover:opacity-100" />
                </span>
                <h3 className="type-display leading-none [font-size:clamp(1.9rem,5.2vw,5rem)] transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transform-none">{p.title}</h3>
                <p className="type-utility text-(--color-muted) md:text-right">{p.meta}</p>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  if (variant === 'grid') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.map((p) => <li key={p.href}><L href={p.href} className="group block">{img(p, 'aspect-(--ratio-card)')}{caption(p)}</L></li>)}
        </ul>
      </div>
    </section>
  )
  if (variant === 'stack') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 space-y-20 md:space-y-28">
          {projects.map((p) => <li key={p.href}><L href={p.href} className="group block">{img(p, 'aspect-(--ratio-media)')}{caption(p)}</L></li>)}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-12">
          {projects.map((p, i) => (
            <li key={p.href} className={i % 3 === 0 ? 'md:col-span-7' : i % 3 === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-6 md:col-start-4'}>
              <L href={p.href} className="group block">{img(p, i % 3 === 1 ? 'aspect-(--ratio-card)' : 'aspect-(--ratio-media)')}{caption(p)}</L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
