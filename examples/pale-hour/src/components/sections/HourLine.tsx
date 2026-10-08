'use client'
// The hour line — Visit's remembered moment. The week drawn as a ruled timetable from 08:00 to 22:00: each day's open
// hours a bar, Thursday's talk marked, today's row in ink and a vermilion line where the clock stands now (venue time,
// live). Above it, in words: open now and until when, or when the doors open next.
// Motion: the bars draw from the left one day after another (60ms apart), then the now line drops in. Phones: the
// same drawing, shorter day names and an hour label every four hours. Reduced motion: drawn in place, a short fade.
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { DAYS, hoursFor, status, toMin, venueNow } from '@/lib/hours'
import { useNow } from '@/lib/useVenueStatus'
import { cn } from '@/lib/utils'
import { visitPage } from '@/content/site'

const START = 8 * 60, END = 22 * 60
const at = (m: number) => `${((m - START) / (END - START)) * 100}%`
const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first
const TICKS = [8, 10, 12, 14, 16, 18, 20, 22]

export function HourLine({ talkAt = '19:00', talkDay = 4 }: { talkAt?: string; talkDay?: number }) {
  const copy = visitPage.hourLine
  const now = useNow()
  const v = now ? venueNow(now) : null
  const s = now ? status(now) : null
  const line = !s ? ' ' : s.kind === 'open' ? copy.open(s.until) : s.kind === 'later' ? copy.later(s.from) : copy.next(s.nextDay, s.from)
  const clock = v ? `${String(Math.floor(v.minutes / 60)).padStart(2, '0')}:${String(v.minutes % 60).padStart(2, '0')}` : ''
  const showNow = v && v.minutes >= START && v.minutes <= END

  return (
    <Reveal className="mt-(--section-y) border-t border-(--color-text) pt-6">
      <div className="grid gap-x-(--gutter) gap-y-3 md:grid-cols-12 md:items-baseline">
        <h2 className="type-utility rv-text md:col-span-3" style={i(0)}>{copy.title}{v && <span className="text-(--color-muted)">, {DAYS[v.day]}</span>}</h2>
        <p className="type-display rv-text [font-size:clamp(2.25rem,5vw,4.5rem)] md:col-span-9" style={i(1)} aria-live="polite" suppressHydrationWarning>{line}</p>
      </div>

      <div aria-hidden className="mt-12 grid grid-cols-[3rem_1fr] gap-x-4 md:mt-16 md:grid-cols-[9rem_1fr] md:gap-x-(--gutter)">
        {/* hour axis */}
        <div />
        <div className="relative h-6">
          {TICKS.map((t) => (
            <span key={t} className={cn('type-caption absolute -translate-x-1/2 tabular-nums text-(--color-muted)', t % 4 !== 0 && 'max-md:hidden', t === 22 && '-translate-x-full', t === 8 && 'translate-x-0', showNow && Math.abs(t * 60 - v.minutes) < 50 && 'invisible', showNow && Math.abs(t * 60 - v.minutes) < 180 && 'max-md:invisible')} style={{ left: at(t * 60) }}>
              {String(t).padStart(2, '0')}:00
            </span>
          ))}
        </div>

        {ORDER.map((d, n) => {
          const h = hoursFor(d)
          const today = v?.day === d
          return (
            <div key={d} className="contents">
              <p className={cn('type-utility flex min-h-12 items-center', today ? 'text-(--color-text)' : 'text-(--color-muted)')}>
                <span className="md:hidden">{DAYS[d].slice(0, 3)}</span><span className="max-md:hidden">{DAYS[d]}</span>
              </p>
              <div className="relative min-h-12 border-t border-(--color-border)">
                {TICKS.map((t) => <span key={t} className="absolute inset-y-0 w-px bg-(--color-border)" style={{ left: at(t * 60) }} />)}
                {h ? (
                  <span className={cn('hl-bar absolute top-1/2 h-3 -translate-y-1/2', today ? 'bg-(--color-text)' : 'bg-(--color-muted)/45')}
                    style={{ left: at(h.openMin), width: `calc(${at(h.closeMin)} - ${at(h.openMin)})`, ...i(n) }} />
                ) : (
                  <span className="type-caption absolute left-0 top-1/2 -translate-y-1/2 bg-(--color-background) pr-3 text-(--color-muted)">{copy.closed}</span>
                )}
                {d === talkDay && h && (
                  <span className="hl-bar absolute inset-y-1 w-px bg-(--color-background)" style={{ left: at(toMin(talkAt)), ...i(n) }}>
                    <span className="type-caption absolute -top-1 left-2 whitespace-nowrap text-(--color-muted) max-md:left-auto max-md:right-2">{copy.talk} {talkAt}</span>
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {/* the now line, across the whole week at this hour */}
        <div />
        <div className="relative h-0">
          {showNow && (
            <span className="hl-now absolute bottom-0 w-px bg-(--color-accent)" style={{ left: at(v.minutes), height: `calc(${ORDER.length} * 3rem)` }}>
              <span className="type-caption absolute -top-6 left-0 z-10 -translate-x-1/2 whitespace-nowrap bg-(--color-background) px-1.5 text-(--color-text) tabular-nums">{copy.now} {clock}</span>
            </span>
          )}
        </div>
      </div>
    </Reveal>
  )
}
