// Run: node scripts/check-hours.mts — asserts the live status line's wording.
import assert from 'node:assert/strict'
import { statusAt, studioNow } from '../src/lib/hours.ts'

assert.deepEqual(statusAt(1, 9 * 60), { open: true, text: 'Open now, until 20:00' })
assert.deepEqual(statusAt(1, 7 * 60), { open: false, text: 'Closed, opens at 08:00' })
assert.deepEqual(statusAt(1, 20 * 60), { open: false, text: 'Closed, opens tomorrow at 08:00' })
assert.deepEqual(statusAt(6, 14 * 60), { open: false, text: 'Closed, opens Monday at 08:00' })
assert.deepEqual(statusAt(0, 12 * 60), { open: false, text: 'Closed, opens tomorrow at 08:00' })
assert.deepEqual(statusAt(5, 21 * 60), { open: false, text: 'Closed, opens tomorrow at 09:00' })
// 2026-10-05 08:30 UTC is 09:30 in London (BST), a Monday.
assert.deepEqual(studioNow(new Date('2026-10-05T08:30:00Z')), { day: 1, minutes: 9 * 60 + 30 })
console.log('hours: ok')
