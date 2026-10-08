// OpusKit section — Schedule, fitted to Low Hum: the programme day by day — time, what happens, a line of detail.
// Days sit side by side on wide screens and stack on phones; times stay left. No tabs, everything readable at once.
import type { ReactNode } from 'react'
import { Reveal } from '@/components/site/Reveal'

export function ScheduleSection({ heading, intro, days }: { heading: ReactNode; intro?: string; days: { label: string; items: { time: string; title: string; detail?: string }[] }[] }) {
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="text-center">
          {heading}
          {intro && <p className="type-body mx-auto mt-6 max-w-[48ch] text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)]">{intro}</p>}
        </div>
        <div className="mt-14 grid gap-14 md:mt-16 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          {days.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.06}>
              <h3 className="type-heading border-b border-(--color-text) pb-4">{d.label}</h3>
              <ol className="divide-y divide-(--color-border)">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[4.25rem_1fr] gap-4 py-5">
                    <span className="type-body pt-0.5 tabular-nums text-(--color-muted)">{it.time}</span>
                    <div>
                      <p className="type-heading [font-size:clamp(1.2rem,1.5vw,1.375rem)]">{it.title}</p>
                      {it.detail && <p className="type-body mt-1.5 text-(--color-muted)">{it.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
