// OpusKit section — Schedule: the programme day by day — time, what happens, a line of detail. Days sit side by side
// on wide screens and stack on phones; no tabs, so everything stays readable and searchable.
export function ScheduleSection({ title, days }: { title: string; days: { label: string; items: { time: string; title: string; detail?: string }[] }[] }) {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading max-w-[20ch]">{title}</h2>
        <div className={`mt-12 grid gap-12 md:gap-10 ${days.length > 1 ? 'md:grid-cols-2' : ''} ${days.length > 2 ? 'xl:grid-cols-3' : ''}`}>
          {days.map((d) => (
            <div key={d.label}>
              <h3 className="type-body border-b border-(--color-text) pb-3 font-bold">{d.label}</h3>
              <ol className="divide-y divide-(--color-border)">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4">
                    <span className="type-utility pt-0.5 text-(--color-muted)">{it.time}</span>
                    <div>
                      <p className="type-body font-bold">{it.title}</p>
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
