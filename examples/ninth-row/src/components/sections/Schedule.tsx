'use client'
// Schedule — the week day by day, everything readable at once (no tabs). Days sit as columns (four to a row on wide
// screens, two on tablets, stacked on phones with the times kept left). Each screening is a link straight into the
// booking form, filled in; hovering one dims the others. Tonight's column carries the accent dot. The last cell is the
// booking action with the date beside it, repeated after the programme.
import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { After } from '@/components/motion/Reveal'
import type { Day } from '@/content/programme'
import { cn } from '@/lib/utils'

const noop = () => () => {}

export function bookHref(day: string, time: string, title: string) {
  const q = new URLSearchParams({ film: title, day, time })
  return `/tickets?${q.toString()}#book`
}

export function ScheduleSection({ title, line, days, action, empty, id }: { title: string; line?: string; days: Day[]; action: string; empty: string; id?: string }) {
  // the visitor's own day — unknown on the server, read once the page is in the browser
  const today = useSyncExternalStore(noop, () => new Date().getDay(), () => null)
  const dateLine = useSyncExternalStore(noop, () => new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }), () => '')
  return (
    <section id={id} className="scroll-mt-24 px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-6">
          <h2 className="type-heading md:col-span-6">{title}</h2>
          {line && <p className="type-body text-(--color-muted) md:col-span-5 md:col-start-8">{line}</p>}
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 md:mt-16 xl:grid-cols-4">
          {days.map((d, di) => {
            const tonight = today === d.weekday
            return (
              <After key={d.label} delay={0.06 * (di % 4)}>
                <h3 className="type-utility flex items-center justify-between border-b border-(--color-text) pb-3 text-base">
                  <span>{d.label}</span>
                  {tonight && <span className="flex items-center gap-2 text-(--color-accent)"><span aria-hidden className="size-1.5 bg-(--color-accent)" />Tonight</span>}
                </h3>
                {d.items.length === 0 ? (
                  <p className="type-body py-4 text-(--color-muted)">{empty}</p>
                ) : (
                  <ol className="group/day divide-y divide-(--color-border)">
                    {d.items.map((it) => (
                      <li key={it.time + it.title}>
                        <Link
                          href={bookHref(d.label, it.time, it.title)}
                          aria-label={`${it.title}, ${d.label} at ${it.time}. Book tickets`}
                          className="press grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 py-4 transition-opacity duration-200 group-hover/day:opacity-60 hover:opacity-100! focus-visible:bg-(--color-surface)"
                        >
                          <span className="type-utility pt-0.5 text-base tabular-nums text-(--color-muted)">{it.time}</span>
                          <span>
                            <span className={cn('type-heading block text-[clamp(1.15rem,1.5vw,1.35rem)] leading-[1.1]')}>{it.title}</span>
                            <span className="type-caption mt-1 block text-(--color-muted)">{it.detail}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </After>
            )
          })}
          <After delay={0.18} className="flex flex-col justify-end gap-4 border-t border-(--color-border) pt-6 xl:border-t-0">
            <p className="type-utility text-base text-(--color-muted)" suppressHydrationWarning>{dateLine || 'Every night this week'}</p>
            <Link href="/tickets#book" className="btn btn-solid self-start">{action}</Link>
          </After>
        </div>
      </div>
    </section>
  )
}
