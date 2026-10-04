// OpusKit section — Press: what outlets wrote, the outlet set as type (no borrowed logos), awards in a quiet line.
// Two designs:
//   grid  — every quote in a ruled cell, its outlet large beneath.
//   quote — the best line as one big pull quote, the other outlets named in a row under it.
export function PressSection({ tone, variant = 'grid', title, quotes, awards }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'grid' | 'quote'; title: string; quotes: { outlet: string; quote: string }[]; awards?: string[] }) {
  const t = tone === 'ground' ? undefined : tone
  const [lead, ...rest] = quotes
  return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.85)]">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        {variant === 'quote' && lead ? (
          <figure className="mt-10">
            <blockquote className="type-heading max-w-[30ch] text-balance [font-size:clamp(1.8rem,4vw,3.6rem)] leading-[1.08]">“{lead.quote}”</blockquote>
            <figcaption className="type-display mt-8 [font-size:clamp(1.3rem,2.2vw,1.9rem)]">{lead.outlet}</figcaption>
            {rest.length > 0 && <p className="type-utility mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-(--color-border) pt-6 text-(--color-muted)"><span>Also in</span>{rest.map((q) => <span key={q.outlet} className="text-(--color-text)">{q.outlet}</span>)}</p>}
          </figure>
        ) : (
          <ul className="mt-8 grid border-l border-t border-(--color-border) md:grid-cols-3">
            {quotes.map((q) => (
              <li key={q.outlet} className="border-b border-r border-(--color-border) p-6 md:p-8">
                <figure className="flex h-full flex-col justify-between gap-10">
                  <blockquote className="type-body text-balance [font-size:clamp(1.05rem,1.4vw,1.25rem)]">“{q.quote}”</blockquote>
                  <figcaption className="type-display [font-size:clamp(1.2rem,1.8vw,1.6rem)]">{q.outlet}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
        {awards && awards.length > 0 && (
          <ul aria-label="Awards" className="type-utility mt-8 flex flex-wrap gap-x-8 gap-y-2 text-(--color-muted)">
            {awards.map((a) => <li key={a}>{a}</li>)}
          </ul>
        )}
      </div>
    </section>
  )
}
