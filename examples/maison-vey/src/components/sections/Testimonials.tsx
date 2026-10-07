// OpusKit section — Testimonials, "One leads": one quote large beside its label, the rest in a quiet row.
// Fitted to Maison Vey: on the surface tone; a hairline instead of the accent rule (the accent is kept for time-codes);
// no cards around the small quotes, only a rule above each, so the row reads as part of the page.
import { FadeRise, RevealGroup } from '@/components/motion/Reveal'

type Quote = { quote: string; name: string; role: string }

function Person({ q, className = '' }: { q: Quote; className?: string }) {
  return (
    <figcaption className={className}>
      <span className="type-body block">{q.name}</span>
      <span className="type-caption block text-(--color-muted)">{q.role}</span>
    </figcaption>
  )
}

export function TestimonialsSection({ tone, title, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; quotes: Quote[] }) {
  const [lead, ...rest] = quotes
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <RevealGroup className="mx-auto max-w-(--container)">
        <div className="grid gap-x-(--grid-gap) gap-y-8 md:grid-cols-12">
          <FadeRise as="h2" i={0} className="type-caption text-(--color-muted) md:col-span-3 md:pt-3">{title}</FadeRise>
          {lead && (
            <FadeRise as="figure" i={1} className="md:col-span-9">
              <blockquote className="type-heading max-w-[30ch] text-balance [font-size:clamp(1.75rem,3.4vw,3rem)]">“{lead.quote}”</blockquote>
              <Person q={lead} className="mt-8" />
            </FadeRise>
          )}
        </div>
        {rest.length > 0 && (
          <ul className={`mt-24 grid gap-x-(--grid-gap) gap-y-12 md:ml-[calc((100%+var(--grid-gap))*3/12)] ${rest.length === 1 ? '' : rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {rest.map((q, i) => (
              <FadeRise as="li" key={q.name} i={i + 2}>
                <figure className="flex h-full flex-col justify-between gap-8 border-t border-(--color-border) pt-6">
                  <blockquote className="type-body">“{q.quote}”</blockquote>
                  <Person q={q} />
                </figure>
              </FadeRise>
            ))}
          </ul>
        )}
      </RevealGroup>
    </section>
  )
}
