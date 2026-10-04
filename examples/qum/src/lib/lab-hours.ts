// The live status line: is the lab in Mardakan open right now? Times are Baku time (Asia/Baku, UTC+4, no DST).
// Mon–Fri 09:00–18:00, Sat 10:00–14:00 (visitors welcome), Sun closed. Index 0 = Sunday.
export const HOURS: ([number, number] | null)[] = [null, [9, 18], [9, 18], [9, 18], [9, 18], [9, 18], [10, 14]]
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const pad = (h: number) => `${String(h).padStart(2, '0')}:00`

export function labStatus(now: Date): { open: boolean; time: string; text: string } {
  const baku = new Date(now.getTime() + 4 * 3600_000) // read the UTC fields of this as Baku wall time
  const day = baku.getUTCDay(), hour = baku.getUTCHours() + baku.getUTCMinutes() / 60
  const time = `${String(baku.getUTCHours()).padStart(2, '0')}:${String(baku.getUTCMinutes()).padStart(2, '0')}`
  const today = HOURS[day]
  if (today && hour >= today[0] && hour < today[1]) return { open: true, time, text: `the lab is open until ${pad(today[1])}` }
  if (today && hour < today[0]) return { open: false, time, text: `the lab opens at ${pad(today[0])}` }
  for (let i = 1; i <= 7; i++) {
    const h = HOURS[(day + i) % 7]
    if (h) return { open: false, time, text: `the lab opens ${i === 1 ? 'tomorrow' : DAYS[(day + i) % 7]} at ${pad(h[0])}` }
  }
  return { open: false, time, text: 'the lab is closed' }
}
