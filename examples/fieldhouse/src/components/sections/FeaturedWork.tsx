import type { ElementType } from 'react'
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
          {projects.map((p) => (
            <li key={p.href} className="border-b border-(--color-border)">
              <L href={p.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5 md:grid-cols-[1fr_10rem_7rem] md:py-6">
                <h3 className="type-display [font-size:clamp(1.8rem,4.4vw,4rem)] leading-none transition-transform duration-300 group-hover:translate-x-2">{p.title}</h3>
                <p className="type-utility text-(--color-muted) md:order-3 md:text-right">{p.meta}</p>
                <img src={p.image} alt={p.alt} loading="lazy" className="hidden aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover opacity-80 transition-opacity group-hover:opacity-100 md:block" />
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
