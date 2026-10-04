import type { ElementType } from 'react'
// OpusKit section — Services: what you offer. Three designs:
//   rows  — one row each, with rules between; the hovered row lifts (a clear list beside the title).
//   big   — each service name set large in the display face, its line small beneath (few services, said loudly).
//   cards — a card per service on the surface, in a grid (many services, scanned at a glance).
type Service = { name: string; line: string; href?: string }

export function ServicesSection({ tone, variant = 'rows', link: L = 'a', title, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'rows' | 'big' | 'cards'; link?: ElementType; title: string; items: Service[] }) {
  const t = tone === 'ground' ? undefined : tone
  const name = (s: Service) => (s.href ? <L href={s.href} className="hover:underline hover:underline-offset-4">{s.name}</L> : s.name)
  if (variant === 'big') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        <ul className="mt-10 space-y-10 md:space-y-14">
          {items.map((s) => (
            <li key={s.name} className="grid gap-3 md:grid-cols-12 md:items-baseline">
              <h3 className="type-display [font-size:clamp(2.2rem,6vw,5.5rem)] leading-[0.95] md:col-span-8">{name(s)}</h3>
              <p className="type-body text-(--color-muted) md:col-span-4">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  if (variant === 'cards') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <li key={s.name} className="flex flex-col justify-between gap-10 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-7 shadow-(--shadow-card)">
              <h3 className="type-heading [font-size:clamp(1.3rem,2vw,1.7rem)]">{name(s)}</h3>
              <p className="type-body text-(--color-muted)">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <ul className="border-t border-(--color-border) md:col-span-8">
          {items.map((s) => (
            <li key={s.name} className="group grid gap-2 border-b border-(--color-border) py-6 transition-colors hover:bg-(--color-surface) md:grid-cols-2 md:px-4">
              <h3 className="type-heading [font-size:clamp(1.25rem,2vw,1.75rem)]">{name(s)}</h3>
              <p className="type-body text-(--color-muted)">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
