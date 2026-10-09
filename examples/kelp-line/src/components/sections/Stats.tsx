// OpusKit section — Stats, "ledger" design, fitted to Kelp Line: one line per number, the label left and the number
// right, rules between — a calm, exact list. Nothing counts up: a number people can read at once is the point. The
// title and note hold the left columns on wide screens; on phones the ledger runs full width under them.
type Stat = { value: string; label: string }

export function StatsSection({ tone, title, stats, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title?: string; stats: Stat[]; note?: string }) {
  if (!stats.length) return null
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="band-pad">
      <div className="frame grid gap-10 md:grid-cols-12 md:gap-x-(--gutter)">
        <div data-fade className="flex flex-col justify-between gap-6 md:col-span-4">
          {title && <h2 className="type-heading">{title}</h2>}
          {note && <p className="type-caption max-w-[34ch] text-(--color-muted)">{note}</p>}
        </div>
        <dl data-fade style={{ ['--i' as string]: 1 }} className="border-t border-(--color-border) md:col-span-7 md:col-start-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between gap-6 border-b border-(--color-border) py-5 md:py-6">
              <dt className="type-body min-w-0 text-(--color-muted)">{s.label}</dt>
              <dd className="type-number shrink-0 text-right">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
