// OpusKit section — Schedule, fitted to Kelp Line (the first screen of Contact): the week on the coast day by day —
// time, what happens, a line of detail. Days side by side on wide screens, stacked on phones with the times kept left.
// No tabs: everything readable at once.
import { Lines } from '@/components/motion/Lines'

type Day = { label: string; items: { time: string; title: string; detail?: string }[] }

export function ScheduleSection({ tone, title, mobileTitle, intro, days }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string[]; mobileTitle?: string[]; intro?: string; days: Day[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad first-pad">
      <div className="frame">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-x-(--gutter)">
          <Lines as="h1" onLoad lines={title} mobile={mobileTitle} className="type-display-2 md:col-span-7" />
          {intro && <p className="type-lead rise max-w-[36ch] text-(--color-muted) md:col-span-4 md:col-start-9" style={{ ['--i' as string]: 2 }}>{intro}</p>}
        </div>
        {days.length === 0 ? (
          <p className="type-body mt-12 text-(--color-muted)">The new season’s days are being set. Write to us and we will tell you the next one.</p>
        ) : (
          <div className={`mt-14 grid gap-12 md:mt-20 md:gap-x-(--gutter) ${days.length > 1 ? 'md:grid-cols-2' : ''} ${days.length > 2 ? 'lg:grid-cols-3' : ''}`}>
            {days.map((d, i) => (
              <div key={d.label} className="rise" style={{ ['--i' as string]: 3 + i }}>
                <h2 className="type-title border-b border-(--color-text) pb-3">{d.label}</h2>
                <ol className="divide-y divide-(--color-border)">
                  {d.items.map((it) => (
                    <li key={it.time + it.title} className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-4 py-5">
                      <span className="type-body tabular-nums text-(--color-muted)">{it.time}</span>
                      <div>
                        <h3 className="type-body">{it.title}</h3>
                        {it.detail && <p className="type-caption mt-1 text-(--color-muted)">{it.detail}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
