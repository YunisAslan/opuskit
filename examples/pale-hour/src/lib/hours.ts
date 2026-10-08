// Opening hours in venue time (Europe/London), whatever the visitor's own clock says.
import { site } from '@/content/site'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }

/** Venue-local weekday (0 Sunday) and minutes since midnight. */
export function venueNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: site.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type HoursToday = { open: string; close: string; openMin: number; closeMin: number; late?: string } | null

export function hoursFor(day: number): HoursToday {
  const h = site.hours.find((x) => x.day === day)
  return h ? { ...h, openMin: toMin(h.open), closeMin: toMin(h.close) } : null
}

export type Status =
  | { kind: 'open'; until: string }
  | { kind: 'later'; from: string }
  | { kind: 'closed'; nextDay: string; from: string }

export function status(date = new Date()): Status {
  const { day, minutes } = venueNow(date)
  const today = hoursFor(day)
  if (today && minutes >= today.openMin && minutes < today.closeMin) return { kind: 'open', until: today.close }
  if (today && minutes < today.openMin) return { kind: 'later', from: today.open }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7, h = hoursFor(d)
    if (h) return { kind: 'closed', nextDay: i === 1 ? 'tomorrow' : DAYS[d], from: h.open }
  }
  return { kind: 'closed', nextDay: '', from: '' }
}

/** Short line for the menu and the hero: "Open today until 18:00". */
export function statusLine(s: Status) {
  if (s.kind === 'open') return `Open today until ${s.until}`
  if (s.kind === 'later') return `Opens today at ${s.from}`
  return `Closed, opens ${s.nextDay} at ${s.from}`
}

export { DAYS, toMin }
