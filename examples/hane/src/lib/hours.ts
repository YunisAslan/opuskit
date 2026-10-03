// Opening hours and the live status line's wording. Pure, so scripts/check-hours.ts can test it.
// Days: 0 = Sunday … 6 = Saturday. Times in minutes after midnight, studio time (Europe/London).
export const TIME_ZONE = 'Europe/London'
export const HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [8 * 60, 20 * 60], 2: [8 * 60, 20 * 60], 3: [8 * 60, 20 * 60], 4: [8 * 60, 20 * 60], 5: [8 * 60, 20 * 60],
  6: [9 * 60, 14 * 60],
}
export const HOURS_LINES = ['Monday to Friday, 08:00 to 20:00', 'Saturday, 09:00 to 14:00', 'Sunday, closed']
export const STATUS_FALLBACK = 'Open weekdays 08:00 to 20:00'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

export function statusAt(day: number, minutes: number): { open: boolean; text: string } {
  const today = HOURS[day]
  if (today && minutes >= today[0] && minutes < today[1]) return { open: true, text: `Open now, until ${hhmm(today[1])}` }
  if (today && minutes < today[0]) return { open: false, text: `Closed, opens at ${hhmm(today[0])}` }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const h = HOURS[d]
    if (h) return { open: false, text: `Closed, opens ${i === 1 ? 'tomorrow' : DAY_NAMES[d]} at ${hhmm(h[0])}` }
  }
  return { open: false, text: STATUS_FALLBACK }
}

/** The studio's weekday and minutes right now, whatever the visitor's own time zone. */
export function studioNow(date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}
