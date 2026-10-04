// OpusKit section — Stats: three or four real numbers that prove something, each with a plain label.
// Numbers are set big in the display face; nothing counts up (a number people can read at once is the point).
export function StatsSection({ title, stats, note }: { title?: string; stats: { value: string; label: string }[]; note?: string }) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        {title && <h2 className="type-utility text-(--color-muted)">{title}</h2>}
        <dl className="mt-8 grid grid-cols-2 gap-y-10 border-t-2 border-(--color-border) pt-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col pr-6">
              <dt className="type-utility order-2 mt-3 text-(--color-muted)">{s.label}</dt>
              <dd className="type-display order-1 [font-size:clamp(2.4rem,5vw,4.5rem)] leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
        {note && <p className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
