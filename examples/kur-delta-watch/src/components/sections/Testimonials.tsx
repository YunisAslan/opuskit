// OpusKit section — Testimonials: what real people said, in their words, with their name and role. One large quote
// leads; the rest sit in a quiet row. No stars, no stock faces.
export function TestimonialsSection({ title, quotes }: { title: string; quotes: { quote: string; name: string; role: string }[] }) {
  const [lead, ...rest] = quotes
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        {lead && (
          <figure className="mt-8 max-w-[34ch] md:max-w-[28ch]">
            <blockquote className="type-heading text-balance [font-size:clamp(1.6rem,3.6vw,3rem)]">“{lead.quote}”</blockquote>
            <figcaption className="type-body mt-6 text-(--color-muted)">{lead.name}, {lead.role}</figcaption>
          </figure>
        )}
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t-2 border-(--color-border) pt-10 md:grid-cols-3">
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
