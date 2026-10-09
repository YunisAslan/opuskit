// Which screenings are next — read from the programme in the copy deck, on the visitor's own clock.
import { week, type Screening } from '@/content/programme'

export type Next = { day: (typeof week)[number]; item: Screening; at: Date; today: boolean }

/** The next screening that has not started yet, looking up to a week ahead. */
export function nextScreening(now = new Date()): Next | null {
  for (let offset = 0; offset < 8; offset++) {
    const date = new Date(now)
    date.setDate(now.getDate() + offset)
    const day = week.find((d) => d.weekday === date.getDay())
    if (!day) continue
    for (const item of day.items) {
      const [h, m] = item.time.split(':').map(Number)
      const at = new Date(date)
      at.setHours(h, m, 0, 0)
      if (at > now) return { day, item, at, today: offset === 0 }
    }
  }
  return null
}

export function dayFor(date: Date) {
  return week.find((d) => d.weekday === date.getDay())
}
