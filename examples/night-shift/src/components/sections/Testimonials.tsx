// OpusKit section — Testimonials: what real people said, in their words, with their name and role. One large quote
// leads; the rest sit in a quiet row. No stars, no stock faces — a portrait only when it is the person's own photo.
type Q = { quote: string; name: string; role: string; image?: string; alt?: string }

export function TestimonialsSection({ title, quotes }: { title: string; quotes: Q[] }) {
  const [lead, ...rest] = quotes
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        {lead && (
          <figure className="mt-8 grid items-end gap-8 md:grid-cols-12">
            {lead.image && <img src={lead.image} alt={lead.alt ?? ''} loading="lazy" width={1600} height={2400} className="aspect-[4/5] w-2/3 rounded-(--radius-media) object-cover md:col-span-3 md:w-full" />}
            <div className={lead.image ? 'md:col-span-8 md:col-start-5' : 'md:col-span-9'}>
              <blockquote className="type-heading max-w-[28ch] text-balance [font-size:clamp(1.6rem,3.6vw,3rem)]">“{lead.quote}”</blockquote>
              <figcaption className="type-body mt-6 text-(--color-muted)">{lead.name}, {lead.role}</figcaption>
            </div>
          </figure>
        )}
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-(--color-border) pt-10 md:grid-cols-3">
            {rest.map((q) => (
              <li key={q.name}>
                <blockquote className="type-body max-w-[46ch]">“{q.quote}”</blockquote>
                <div className="mt-4 flex items-center gap-3">
                  {q.image && <img src={q.image} alt={q.alt ?? ''} loading="lazy" width={1600} height={2400} className="size-12 rounded-(--radius-media) object-cover" />}
                  <p className="type-utility text-(--color-muted)">{q.name}, {q.role}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
