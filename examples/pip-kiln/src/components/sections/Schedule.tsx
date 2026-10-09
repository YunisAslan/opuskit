'use client'
// OpusKit section — Schedule: the programme day by day — time, what happens, a line of detail — no tabs, everything
// readable at once. Pip & Kiln: the days stack in the right-hand column (times stay left) and the "Lump to mug"
// drawing sits beside them, following the row you are reading.
import { useEffect, useRef, useState } from 'react'
import { SectionHead } from '@/components/parts/SectionHead'
import { LumpToMug } from '@/components/workshops/LumpToMug'

type Item = { time: string; title: string; detail?: string; stage: number }

export function ScheduleSection({ title, lines, days, stages }: { title: string; lines: string[]; days: { label: string; items: Item[] }[]; stages: string[] }) {
  const scope = useRef<HTMLElement>(null)
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const rows = scope.current?.querySelectorAll<HTMLElement>('[data-stage]')
    if (!rows) return
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.stage))
    }, { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <section id="schedule" ref={scope} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <SectionHead text={title} lines={lines} />
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
          <div className="sticky top-(--nav-h) z-10 -mx-(--gutter) border-b border-(--color-border) bg-(--color-background) px-(--gutter) py-3 md:hidden">
            <LumpToMug compact stage={stage} label={stages[stage]} scope={scope} />
          </div>
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-[calc(var(--nav-h)+8vh)]"><LumpToMug stage={stage} label={stages[stage]} scope={scope} /></div>
          </div>
          <div className="grid gap-14 md:col-span-6 md:col-start-7">
            {days.map((d) => (
              <div key={d.label}>
                <h3 className="t-card border-b border-(--color-text) pb-3 [font-size:clamp(1.3rem,2vw,1.7rem)]">{d.label}</h3>
                <ol className="divide-y divide-(--color-text)/25">
                  {d.items.map((it) => (
                    <li key={it.time + it.title} data-stage={it.stage} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-4 py-5 md:grid-cols-[6rem_minmax(0,1fr)]">
                      <span className="t-card tabular-nums">{it.time}</span>
                      <div>
                        <p className="type-display leading-[0.95] [font-size:clamp(1.6rem,2.6vw,2.4rem)]">{it.title}</p>
                        {it.detail && <p className="type-body mt-2 max-w-[44ch]">{it.detail}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
