import { Lines, Reveal } from '@/components/motion'
// Testimonials — lead: one quote leads, large, under a quotation mark in the accent; the rest sit in a quiet row.
// No stars, no faces: a short accent rule leads each name. Phones: stacked, the lead quote stays large.
type Quote = { quote: string; name: string; role: string }

function Person({ q, className = '' }: { q: Quote; className?: string }) {
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

export function TestimonialsSection({ id, title, quotes }: { id?: string; title: string; quotes: Quote[] }) {
  const [lead, ...rest] = quotes
  return (
    <section id={id} data-tone="surface" className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <Lines lines={[title]} className="type-utility text-(--color-muted) md:col-span-3" />
          {lead && (
            <Reveal className="md:col-span-9">
              <figure>
                <span aria-hidden className="type-display block select-none leading-[0.6] text-(--color-accent) [font-size:clamp(3.5rem,6vw,5.5rem)]">“</span>
                <blockquote className="type-heading mt-1 max-w-[30ch] text-balance [font-size:clamp(1.6rem,3vw,2.6rem)] leading-[1.18]">{lead.quote}</blockquote>
                <Person q={lead} className="mt-10" />
              </figure>
            </Reveal>
          )}
        </div>
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-6 md:ml-[25%] md:grid-cols-2 md:gap-8">
            {rest.map((q, i) => (
              <li key={q.name}>
                <Reveal delay={0.08 * i} className="h-full">
                  <figure className="flex h-full flex-col justify-between gap-8 rounded-card border border-(--color-border) p-6 md:p-8">
                    <blockquote className="type-body">“{q.quote}”</blockquote>
                    <Person q={q} />
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
