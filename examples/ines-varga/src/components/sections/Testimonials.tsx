// OpusKit section — Testimonials, "One big quote" (single), made this site's own: one quote set huge in the heading
// hand under a big marker quotation mark, the person under it with a short marker rule. Real quotes only.
import { Cut } from '@/components/motion'

type Quote = { quote: string; name: string; role: string }

export function TestimonialsSection({ tone, title, quotes }: { tone?: 'surface'; title: string; quotes: Quote[] }) {
  const [lead] = quotes
  if (!lead) return null
  return (
    <section data-tone={tone} aria-labelledby="quotes-title" className="px-(--gutter) py-(--section-y)">
      <div className="grid-site gap-y-8">
        <h2 id="quotes-title" className="type-h2 col-span-full lg:col-span-3">{title}</h2>
        <Cut as="figure" className="col-span-full lg:col-span-9">
          <span aria-hidden className="type-display block select-none leading-[0.5] text-(--color-accent) [font-size:clamp(5rem,10vw,9rem)]">“</span>
          <blockquote className="font-(family-name:--font-heading) mt-2 max-w-[26ch] text-balance [font-size:clamp(2rem,4.6vw,4rem)] [font-weight:700] leading-[1.05]">{lead.quote}</blockquote>
          <figcaption className="mt-10 flex items-baseline gap-3">
            <span aria-hidden className="h-[2px] w-8 shrink-0 -translate-y-[0.3em] rounded-full bg-(--color-accent)" />
            <span className="min-w-0"><span className="type-body block leading-tight">{lead.name}</span><span className="type-utility block text-(--color-muted)">{lead.role}</span></span>
          </figcaption>
        </Cut>
      </div>
    </section>
  )
}
