// Schedule — the programme day by day: time, what happens, a line of detail. Days sit side by side on wide screens and
// stack on phones, times always on the left; no tabs, so everything stays readable at once.
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'

export function ScheduleSection({ tone, title, intro, days, after, id }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: ReactNode; intro?: string; id?: string
  days: { label: string; items: { time: string; title: string; detail?: string }[] }[]; after?: ReactNode
}) {
  const cols = days.length >= 4 ? 'md:grid-cols-2 xl:grid-cols-4' : days.length === 3 ? 'md:grid-cols-3' : days.length === 2 ? 'md:grid-cols-2' : ''
  return (
    <section id={id} data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 scroll-mt-16 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-x-(--gutter) gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">{title}</div>
          {intro && <p className="type-body md:col-span-4 md:col-start-9">{intro}</p>}
        </div>
        <Reveal className={`mt-[calc(var(--section-y)*0.5)] grid gap-x-(--gutter) gap-y-14 ${cols}`}>
          {days.map((d, n) => (
            <div key={d.label} className="rv" style={i(n)}>
              <h3 className="type-utility border-b border-(--color-text) pb-3">{d.label}</h3>
              <ol className="divide-y divide-(--color-border)">
                {d.items.map((it) => (
                  <li key={it.time + it.title} className="grid grid-cols-[4rem_1fr] gap-4 py-4">
                    <span className="type-utility pt-[0.2em] text-(--color-muted) tabular-nums">{it.time}</span>
                    <div>
                      <p className="type-heading [font-size:clamp(1.15rem,1.5vw,1.35rem)]">{it.title}</p>
                      {it.detail && <p className="type-caption mt-1 text-(--color-muted)">{it.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </Reveal>
        {after && <div className="mt-[calc(var(--section-y)*0.4)]">{after}</div>}
      </div>
    </section>
  )
}
