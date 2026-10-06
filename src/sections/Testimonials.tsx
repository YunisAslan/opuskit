// OpusKit section — Testimonials: what real people said, in their words, with their name and role. No stars, no stock
// faces, no initials standing in for a picture: a short accent rule leads each name. Three designs:
//   lead   — one quote leads beside its label; the rest sit in a quiet row of cards.
//   single — one quote only, large, under a big quotation mark in the accent; the person under it.
//   wall   — every quote in columns of cards, like notes pinned to a board (many short quotes).
type Quote = { quote: string; name: string; role: string }


function Person({ q, className = '' }: { q: Quote; size?: 'sm' | 'md'; className?: string }) {
  return (
    <figcaption className={`flex items-baseline gap-3 ${className}`}>
      <span aria-hidden className="h-px w-6 shrink-0 -translate-y-[0.3em] bg-(--color-accent)" />
      <span className="min-w-0">
        <span className="type-body block leading-tight">{q.name}</span>
        <span className="type-utility block text-(--color-muted)">{q.role}</span>
      </span>
    </figcaption>
  )
}

/** The big quotation mark, drawn in the display face and the accent. */
const Mark = ({ className = '' }: { className?: string }) => (
  <span aria-hidden className={`type-display block select-none leading-[0.6] text-(--color-accent) ${className}`}>“</span>
)

export function TestimonialsSection({ tone, variant = 'lead', title, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'lead' | 'single' | 'wall'; title: string; quotes: Quote[] }) {
  const t = tone === 'ground' ? undefined : tone
  const [lead, ...rest] = quotes
  if (variant === 'single') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-8 border-t border-(--color-border) pt-8 md:grid-cols-12 md:gap-6">
        <h2 className="type-utility text-(--color-muted) md:col-span-3">{title}</h2>
        {lead && (
          <figure className="md:col-span-9">
            <Mark className="[font-size:clamp(4.5rem,9vw,8rem)]" />
            <blockquote className="type-heading mt-2 max-w-[30ch] text-balance [font-size:clamp(1.6rem,3.4vw,2.9rem)] leading-[1.15]">{lead.quote}</blockquote>
            <Person q={lead} className="mt-10" />
          </figure>
        )}
      </div>
    </section>
  )
  if (variant === 'wall') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 gap-5 [column-width:18rem]">
          {quotes.map((q) => (
            <li key={q.name} className="mb-5 break-inside-avoid">
              <figure className="flex flex-col gap-6 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6">
                <div>
                  <Mark className="[font-size:3.5rem]" />
                  <blockquote className="type-body mt-1">{q.quote}</blockquote>
                </div>
                <Person q={q} size="sm" />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <h2 className="type-utility text-(--color-muted) md:col-span-3">{title}</h2>
          {lead && (
            <figure className="md:col-span-9">
              <Mark className="[font-size:clamp(3.5rem,6vw,5.5rem)]" />
              <blockquote className="type-heading mt-1 max-w-[34ch] text-balance [font-size:clamp(1.4rem,2.8vw,2.3rem)] leading-[1.2]">{lead.quote}</blockquote>
              <Person q={lead} className="mt-8" />
            </figure>
          )}
        </div>
        {rest.length > 0 && (
          <ul className={`mt-14 grid gap-5 md:ml-[25%] ${rest.length === 1 ? '' : rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {rest.map((q) => (
              <li key={q.name}>
                <figure className="flex h-full flex-col justify-between gap-6 rounded-(--radius-card) border border-(--color-border) p-6">
                  <blockquote className="type-body">“{q.quote}”</blockquote>
                  <Person q={q} size="sm" />
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
