// The facts the live status line and the RSVP form are computed from. Baku keeps UTC+4 all year (no DST).
export const EVENT = {
  tz: 'Asia/Baku',
  offset: '+04:00',
  doors: '19:00',
  closes: '01:00',
  email: 'rsvp@lowfieldnights.az',
  phone: '+994 50 555 01 27',
  seats: 220,
  nights: [
    { date: '2027-06-12', label: 'Saturday 12 June', short: 'Sat 12 June' },
    { date: '2027-06-13', label: 'Sunday 13 June', short: 'Sun 13 June' },
    { date: '2027-06-14', label: 'Monday 14 June', short: 'Mon 14 June' },
  ],
} as const

const HOUR = 3_600_000
const DAY = 24 * HOUR
const doorsAt = (date: string) => new Date(`${date}T${EVENT.doors}:00${EVENT.offset}`).getTime()
// Midnight in Baku of a given instant, as a UTC timestamp — so "days to go" counts calendar days in Baku.
const bakuDay = (t: number) => Math.floor((t + 4 * HOUR) / DAY)

export const FALLBACK_STATUS = '12–14 June, doors at 19:00'

export function statusAt(now: number): { text: string; open: boolean } {
  const clock = new Intl.DateTimeFormat('en-GB', { timeZone: EVENT.tz, hour: '2-digit', minute: '2-digit' }).format(now)
  for (const n of EVENT.nights) {
    const doors = doorsAt(n.date)
    if (now >= doors && now < doors + 6 * HOUR) return { text: `Open now, until ${EVENT.closes}`, open: true }
    if (bakuDay(now) === bakuDay(doors) && now < doors) return { text: `Baku ${clock}. Tonight, doors at ${EVENT.doors}`, open: false }
  }
  const first = doorsAt(EVENT.nights[0].date)
  if (now < first) {
    const days = bakuDay(first) - bakuDay(now)
    return { text: days === 1 ? `Baku ${clock}. Tomorrow, doors at ${EVENT.doors}` : `Baku ${clock}. First night in ${days} days`, open: false }
  }
  return { text: 'Back next June. Dates soon', open: false }
}
