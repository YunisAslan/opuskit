// OpusKit section — Testimonials, "lead" design, fitted to Kelp Line (the first screen of Stories): the page title,
// then one quote leading beside its label, large, under the accent quotation mark; the rest in a quiet row of cards.
// No stars, no stock faces: a short accent rule leads each name. Phones: quotes stack; the lead stays large.
import { Lines } from '@/components/motion/Lines'

type Quote = { quote: string; name: string; role: string }

function Person({ q, className = '' }: { q: Quote; className?: string }) {
  return (
    <figcaption className={`flex items-baseline gap-3 ${className}`}>
      <span aria-hidden className="h-px w-6 shrink-0 -translate-y-[0.3em] bg-(--color-accent)" />
      <span className="min-w-0">
        <span className="type-body block leading-tight">{q.name}</span>
        <span className="type-utility mt-1 block text-(--color-muted)">{q.role}</span>
      </span>
    </figcaption>
  )
}

export function TestimonialsSection({ tone, title, heading, mobileHeading, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; heading: string[]; mobileHeading?: string[]; quotes: Quote[] }) {
  const t = tone === 'ground' ? undefined : tone
  const [lead, ...rest] = quotes
  const s = (n: number) => ({ ['--i' as string]: n })
  return (
    <section data-tone={t} className="px-(--gutter) pb-[calc(var(--section-y)*0.5)] pt-(--nav-clear)">
      <div className="frame">
        <Lines as="h1" onLoad lines={heading} mobile={mobileHeading} className="type-display-2 max-w-[16ch]" />
        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-x-(--gutter)">
          <h2 className="type-utility rise text-(--color-muted) md:col-span-3 md:pt-4" style={s(2)}>{title}</h2>
          {lead && (
            <figure className="rise md:col-span-9" style={s(3)}>
              <span aria-hidden className="type-display block select-none leading-[0.6] text-(--color-accent) [font-size:clamp(3.5rem,6vw,5.5rem)]">“</span>
              <blockquote className="type-heading mt-1 max-w-[34ch] text-balance [font-size:clamp(1.5rem,2.8vw,2.4rem)] leading-[1.22]">{lead.quote}</blockquote>
              <Person q={lead} className="mt-8" />
            </figure>
          )}
        </div>
        {rest.length > 0 && (
          <ul className={`mt-14 grid gap-4 md:ml-[25%] md:mt-20 md:gap-(--gutter) ${rest.length === 1 ? '' : rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {rest.map((q, i) => (
              <li key={q.name} data-fade style={s(i)}>
                <figure className="flex h-full flex-col justify-between gap-8 rounded-(--radius-card) border border-(--color-border) p-6">
                  <blockquote className="type-body">“{q.quote}”</blockquote>
                  <Person q={q} />
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
