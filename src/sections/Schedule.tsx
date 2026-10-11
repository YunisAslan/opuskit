// OpusKit section — Schedule: the programme day by day — time, what happens, a line of detail. No tabs, so everything
// stays readable and searchable. Three designs:
//   columns  — days side by side on wide screens, stacked on phones.
//   timeline — one long list, each day a heading at the side; the times set large, like a departure board.
//   cards    — each day its own card on the surface colour.
type Day = { label: string; items: { time: string; title: string; detail?: string }[] }

export function ScheduleSection({ tone, variant = 'columns', title, days }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'columns' | 'timeline' | 'cards'; title: string; days: Day[] }) {
  const t = tone === 'ground' ? undefined : tone
  const item = (it: Day['items'][number]) => <div><p className="type-heading [font-size:clamp(1.05rem,1.4vw,1.25rem)]">{it.title}</p>{it.detail && <p className="type-body mt-1 text-(--color-muted)">{it.detail}</p>}</div>
  if (variant === 'timeline') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <div className="mt-12 space-y-16">
          {days.map((d) => (
            <div key={d.label} className="grid gap-6 md:grid-cols-12">
              <h3 className="type-utility md:sticky md:top-24 md:col-span-2 md:self-start">{d.label}</h3>
              <ol className="border-t border-(--color-text) md:col-span-10">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[minmax(5.5rem,auto)_1fr] items-baseline gap-6 border-b border-(--color-border) py-5 md:grid-cols-[12rem_1fr]">
                    <span className="type-display tabular-nums [font-size:clamp(1.6rem,3.4vw,3rem)] leading-none">{it.time}</span>
                    {item(it)}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <div className={`mt-12 grid gap-12 md:gap-10 ${days.length > 1 ? 'md:grid-cols-2' : ''} ${days.length > 2 ? 'xl:grid-cols-3' : ''} ${variant === 'cards' ? 'gap-6! md:gap-6!' : ''}`}>
          {days.map((d) => (
            <div key={d.label} className={variant === 'cards' ? 'rounded-(--radius-card) bg-(--color-surface) p-6 md:p-8' : undefined}>
              <h3 className={`type-utility pb-3 ${variant === 'cards' ? '' : 'border-b border-(--color-text)'}`}>{d.label}</h3>
              <ol className="divide-y divide-(--color-border)">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[5rem_1fr] gap-4 py-4">
                    <span className="type-body text-(--color-muted) tabular-nums">{it.time}</span>
                    {item(it)}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
