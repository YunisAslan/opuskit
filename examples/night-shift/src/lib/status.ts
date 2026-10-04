// The live status line: what is true right now about Night Shift, computed from the cohort dates in Oslo time.
// Pure (no imports) so it can be checked with `node src/lib/status.check.ts`.
export type CohortLike = { n: string; start: string; end: string; seatsLeft: number }
export type Status =
  | { kind: 'live'; cohort: string; week: number }
  | { kind: 'next'; cohort: string; start: string; days: number; seatsLeft: number; seats: number }
  | { kind: 'none' }

const TZ = 'Europe/Oslo'
const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' })
const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

/** Oslo wall clock for an instant: date as YYYY-MM-DD, weekday 0–6, minutes since midnight. */
export function osloClock(now: Date) {
  const p = Object.fromEntries(parts.formatToParts(now).map((x) => [x.type, x.value]))
  return { date: `${p.year}-${p.month}-${p.day}`, weekday: WEEKDAYS[p.weekday], minutes: Number(p.hour) * 60 + Number(p.minute) }
}

const dayNumber = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86_400_000

export function statusAt(now: Date, cohorts: CohortLike[], seats: number, session = { days: [2, 4], from: 19 * 60, to: 21 * 60 + 30 }): Status {
  const c = osloClock(now)
  const running = cohorts.find((k) => k.start <= c.date && c.date <= k.end)
  if (running && session.days.includes(c.weekday) && c.minutes >= session.from && c.minutes < session.to) {
    return { kind: 'live', cohort: running.n, week: Math.floor((dayNumber(c.date) - dayNumber(running.start)) / 7) + 1 }
  }
  const next = cohorts.find((k) => k.start >= c.date)
  if (!next) return { kind: 'none' }
  return { kind: 'next', cohort: next.n, start: next.start, days: dayNumber(next.start) - dayNumber(c.date), seatsLeft: next.seatsLeft, seats }
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
export const shortDate = (iso: string) => dateFmt.format(new Date(iso + 'T12:00:00Z'))
const longFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })
export const longDate = (iso: string) => longFmt.format(new Date(iso + 'T12:00:00Z'))
const rel = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
export const inDays = (days: number) => rel.format(days, 'day')

/** `short` drops the date so the line fits one row on a phone. */
export function statusText(s: Status, short = false, until = '21:30') {
  if (s.kind === 'live') return short ? `Live now: cohort ${s.cohort}, week ${s.week}.` : `Live now: cohort ${s.cohort}, week ${s.week}, until ${until} Oslo time.`
  if (s.kind === 'none') return 'Next cohort dates coming soon.'
  const when = s.days > 1 ? inDays(s.days) : s.days === 1 ? 'tomorrow' : 'today'
  return short ? `Cohort ${s.cohort} starts ${when}. ${s.seatsLeft} of ${s.seats} seats left.`
    : `Cohort ${s.cohort} starts ${shortDate(s.start)}, ${when}. ${s.seatsLeft} of ${s.seats} seats left.`
}
