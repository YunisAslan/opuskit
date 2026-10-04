// Run: node src/lib/status.check.ts
import assert from 'node:assert/strict'
import { statusAt, inDays, shortDate } from './status.ts'

const cohorts = [
  { n: '07', start: '2026-10-27', end: '2026-12-17', seatsLeft: 5 },
  { n: '08', start: '2027-02-02', end: '2027-03-25', seatsLeft: 9 },
]

// Sunday 4 Oct 2026, noon in Oslo (CEST, UTC+2): next cohort in 23 days.
assert.deepEqual(statusAt(new Date('2026-10-04T10:00:00Z'), cohorts, 12), { kind: 'next', cohort: '07', start: '2026-10-27', days: 23, seatsLeft: 5, seats: 12 })
// Tue 3 Nov 2026 19:30 Oslo (CET, UTC+1) = 18:30Z: week 2 is live.
assert.deepEqual(statusAt(new Date('2026-11-03T18:30:00Z'), cohorts, 12), { kind: 'live', cohort: '07', week: 2 })
// Same day 21:30 Oslo: the session has ended, so the next cohort is shown.
assert.equal(statusAt(new Date('2026-11-03T20:30:00Z'), cohorts, 12).kind, 'next')
// Wednesday during a cohort: not live.
assert.equal(statusAt(new Date('2026-11-04T18:30:00Z'), cohorts, 12).kind, 'next')
// After the last cohort.
assert.deepEqual(statusAt(new Date('2027-04-01T12:00:00Z'), cohorts, 12), { kind: 'none' })
// 23:30Z on 26 Oct is 00:30 on 27 Oct in Oslo: the cohort starts today, not tomorrow.
assert.equal((statusAt(new Date('2026-10-26T23:30:00Z'), cohorts, 12) as { days: number }).days, 0)
assert.equal(inDays(1), 'tomorrow')
assert.equal(shortDate('2026-10-27'), 'Tue 27 Oct')
console.log('status: ok')
