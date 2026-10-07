'use client'
// Testimonials — A wall of notes, made Halden's own: what guests said on the way out, in their words, with their
// name and when they come. No stars, no faces. Each note is a hairline frame; the notes stand in two columns and
// rise in one after another. Phones: one column, the same order.
import { Lines, Reveal } from '@/components/motion/Reveal'
import { STAGGER } from '@/lib/motion'

type Quote = { quote: string; name: string; role: string }

export function TestimonialsSection({ tone, title, quotes }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; quotes: readonly Quote[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading" />
        <ul className="mt-12 gap-6 md:columns-2">
          {quotes.map((q, i) => (
            <Reveal as="li" key={q.name} delay={0.2 + i * STAGGER} className="mb-6 break-inside-avoid">
              <figure className="flex flex-col gap-10 border border-(--color-border) p-8 md:p-10">
                <div>
                  <span aria-hidden className="type-display block select-none text-(--color-muted) [font-size:4.5rem] leading-[0.6]">“</span>
                  <blockquote className="type-body mt-2 md:text-[1.125rem]">{q.quote}</blockquote>
                </div>
                <figcaption className="flex items-baseline gap-3">
                  <span aria-hidden className="h-px w-6 shrink-0 -translate-y-[0.3em] bg-(--color-muted)" />
                  <span className="min-w-0">
                    <span className="type-body block leading-tight">{q.name}</span>
                    <span className="type-utility block text-(--color-muted)">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
