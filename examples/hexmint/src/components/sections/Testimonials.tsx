import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — Testimonials: what real people said, in their words, with their name and role. One large quote
// leads; the rest sit in a quiet row. No stars, no stock faces. The title is the chapter's // label.
export function TestimonialsSection({ title, quotes }: { title: string; quotes: { quote: string; name: string; role: string }[] }) {
  const [lead, ...rest] = quotes
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2><ChapterLabel>{title}</ChapterLabel></h2>
        {lead && (
          <figure data-reveal className="mt-8 max-w-[34ch] md:max-w-[28ch]">
            <blockquote className="type-heading text-balance [font-size:clamp(1.6rem,3.6vw,3rem)]">“{lead.quote}”</blockquote>
            <figcaption className="type-body mt-6"><span className="block">{lead.name}</span><span className="block text-(--color-muted)">{lead.role}</span></figcaption>
          </figure>
        )}
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-(--color-border) pt-10 md:grid-cols-3">
            {rest.map((q, i) => (
              <li key={q.name} data-reveal style={{ '--i': i + 2 } as React.CSSProperties}>
                <blockquote className="type-body">“{q.quote}”</blockquote>
                <p className="type-utility mt-4"><span className="block">{q.name}</span><span className="block text-(--color-muted)">{q.role}</span></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
