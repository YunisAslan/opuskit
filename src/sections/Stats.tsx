// OpusKit section — Stats: three or four real numbers that prove something, each with a plain label. Numbers are set
// in the display face; nothing counts up (a number people can read at once is the point). Three designs:
//   row    — the numbers side by side under a rule.
//   giant  — the first number huge across the page, the others small in a row beneath (one number matters most).
//   ledger — one line per number: the label on the left, the number on the right, rules between (a calm, exact list).
type Stat = { value: string; label: string }

export function StatsSection({ tone, variant = 'row', title, stats, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'row' | 'giant' | 'ledger'; title?: string; stats: Stat[]; note?: string }) {
  const t = tone === 'ground' ? undefined : tone
  const [first, ...rest] = stats
  const row = (list: Stat[], size: string) => (
    <dl className="mt-8 grid grid-cols-2 gap-y-10 border-t border-(--color-border) pt-8 md:grid-cols-4">
      {list.map((s) => (
        <div key={s.label} className="flex flex-col pr-6">
          <dt className="type-utility order-2 mt-3 text-(--color-muted)">{s.label}</dt>
          <dd className={`type-display order-1 leading-none ${size}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.85)]">
      <div className="mx-auto max-w-(--container)">
        {title && <h2 className="type-utility text-(--color-muted)">{title}</h2>}
        {variant === 'giant' && first ? <>
          <p className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
            <span className="type-display leading-[0.85] [font-size:clamp(5rem,18vw,15rem)]">{first.value}</span>
            <span className="type-heading pb-[0.6em] [font-size:clamp(1.1rem,2vw,1.6rem)]">{first.label}</span>
          </p>
          {rest.length > 0 && row(rest, '[font-size:clamp(1.8rem,3vw,2.6rem)]')}
        </> : variant === 'ledger' ? (
          <dl className="mt-8 border-t border-(--color-border)">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-6 border-b border-(--color-border) py-5">
                <dt className="type-body text-(--color-muted)">{s.label}</dt>
                <dd className="type-heading tabular-nums [font-size:clamp(1.6rem,3.2vw,2.8rem)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : row(stats, '[font-size:clamp(2.4rem,5vw,4.5rem)]')}
        {note && <p className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
