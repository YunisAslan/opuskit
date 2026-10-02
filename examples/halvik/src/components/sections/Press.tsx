// OpusKit section — Press: what outlets wrote, the outlet set as type (no borrowed logos), and awards in a quiet line.
export function PressSection({ title, quotes, awards }: { title: string; quotes: { outlet: string; quote: string }[]; awards?: string[] }) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
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
        {awards && awards.length > 0 && (
          <ul aria-label="Awards" className="type-utility mt-8 flex flex-wrap gap-x-8 gap-y-2 text-(--color-muted)">
            {awards.map((a) => <li key={a}>{a}</li>)}
          </ul>
        )}
      </div>
    </section>
  )
}
