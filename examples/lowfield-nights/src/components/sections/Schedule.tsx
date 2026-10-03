// OpusKit section — Schedule: the programme day by day — time, what happens, a line of detail. Days sit side by side
// on wide screens and stack on phones; no tabs, so everything stays readable and searchable.
export function ScheduleSection({ title, days }: { title: string; days: { label: string; items: { time: string; title: string; detail?: string }[] }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading">{title}</h2>
        <div className={`mt-12 grid gap-12 md:gap-10 ${days.length > 1 ? 'md:grid-cols-2' : ''} ${days.length > 2 ? 'xl:grid-cols-3' : ''}`}>
          {days.map((d) => (
            <div key={d.label}>
              <h3 className="type-utility border-b border-(--color-text) pb-3">{d.label}</h3>
              <ol className="divide-y divide-(--color-border)">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[5rem_1fr] gap-4 py-4">
                    <span className="type-body text-(--color-muted) tabular-nums">{it.time}</span>
                    <div>
                      <p className="type-heading [font-size:clamp(1.05rem,1.4vw,1.25rem)]">{it.title}</p>
                      {it.detail && <p className="type-body mt-1 text-(--color-muted)">{it.detail}</p>}
                    </div>
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
