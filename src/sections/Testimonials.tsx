// OpusKit section — Testimonials: what real people said, in their words, with their name and role. No stars, no stock
// faces. Three designs:
//   lead   — one large quote leads; the rest sit in a quiet row.
//   single — one quote only, set in the display face across the page; the person under it.
//   wall   — every quote in columns of cards, like notes pinned to a board (many short quotes).
type Quote = { quote: string; name: string; role: string }

export function TestimonialsSection({ tone, variant = 'lead', title, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'lead' | 'single' | 'wall'; title: string; quotes: Quote[] }) {
  const t = tone === 'ground' ? undefined : tone
  const [lead, ...rest] = quotes
  if (variant === 'single') return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*1.15)]">
      <figure className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        {lead && <>
          <blockquote className="type-display mt-10 text-balance [font-size:clamp(2rem,5.4vw,5rem)] leading-[1.02]">“{lead.quote}”</blockquote>
          <figcaption className="type-body mt-10 flex flex-wrap gap-x-3"><span>{lead.name}</span><span className="text-(--color-muted)">{lead.role}</span></figcaption>
        </>}
      </figure>
    </section>
  )
  if (variant === 'wall') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 gap-5 [column-width:18rem]">
          {quotes.map((q) => (
            <li key={q.name} className="mb-5 break-inside-avoid rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6">
              <blockquote className="type-body">“{q.quote}”</blockquote>
              <p className="type-utility mt-5 text-(--color-muted)">{q.name}, {q.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        {lead && (
          <figure className="mt-8 max-w-[34ch] md:max-w-[28ch]">
            <blockquote className="type-heading text-balance [font-size:clamp(1.6rem,3.6vw,3rem)]">“{lead.quote}”</blockquote>
            <figcaption className="type-body mt-6 text-(--color-muted)">{lead.name}, {lead.role}</figcaption>
          </figure>
        )}
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-(--color-border) pt-10 md:grid-cols-3">
            {rest.map((q) => (
              <li key={q.name}>
                <blockquote className="type-body">“{q.quote}”</blockquote>
                <p className="type-utility mt-4 text-(--color-muted)">{q.name}, {q.role}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
