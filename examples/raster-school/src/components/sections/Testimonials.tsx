// OpusKit section — Testimonials, `single`: one quote only, large, under a big quotation mark in the accent; the
// person under it. No stars, no stock faces. Fitted to Raster School: the label holds columns 1–3, the quote runs from
// column 4 to the edge, and the person hangs on column 4 under it. Fades up once.
import { Section } from '@/components/site/SectionHead'
import type { Quote } from '@/content/site'

export function TestimonialsSection({ tone, title, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'single'; title: string; quotes: Quote[] }) {
  const [lead] = quotes
  if (!lead) return null
  return (
    <Section tone={tone}>
      <div className="raster border-t border-(--color-text) pt-4">
        <h2 className="type-utility col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-3">{title}</h2>
        <figure data-reveal className="col-span-4 mt-8 sm:col-span-6 lg:col-span-9 lg:mt-0">
          <span aria-hidden className="type-display block h-[0.5em] select-none leading-[0.8] text-(--color-accent) [font-size:clamp(5rem,10vw,9rem)]">“</span>
          <blockquote className="type-heading mt-2 max-w-[24ch] [font-size:clamp(1.875rem,4.2vw,4rem)] leading-[1.08] tracking-[-0.03em]">
            <p>{lead.quote}</p>
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:mt-14">
            <span className="type-body">{lead.name}</span>
            <span className="type-utility text-(--color-muted)">{lead.role}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
