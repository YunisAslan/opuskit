// OpusKit section — Schedule: the programme day by day — time, what happens, a line of detail. Days sit side by side
// and stack on phones; no tabs, so everything stays readable. Fitted to Raster School: each day takes four columns on
// desktop, the times hold their own narrow column , the day heads sit on a white rule.
import { Section, SectionHead } from '@/components/site/SectionHead'

type Day = { label: string; items: { time: string; title: string; detail?: string }[] }

export function ScheduleSection({ tone, title, aside, days }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; aside?: string; days: Day[] }) {
  return (
    <Section tone={tone}>
      <SectionHead title={title} aside={aside} />
      <div className="raster mt-10 gap-y-12 lg:mt-16">
        {days.map((d) => (
          <div key={d.label} className="col-span-4 sm:col-span-3 lg:col-span-4">
            <h3 className="type-heading border-b border-(--color-text) pb-3 [font-size:clamp(1.25rem,1.8vw,1.5rem)]">{d.label}</h3>
            <ol className="divide-y divide-(--color-border)">
              {d.items.map((it) => (
                <li key={it.time + it.title} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-3.5">
                  <span className="type-utility pt-[0.2em] text-(--color-muted)">{it.time}</span>
                  <div>
                    <p className="type-body">{it.title}</p>
                    {it.detail && <p className="type-caption mt-0.5 text-(--color-muted)">{it.detail}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  )
}
