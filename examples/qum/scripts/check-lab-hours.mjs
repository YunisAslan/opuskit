// node scripts/check-lab-hours.mjs — the live status line's opening-hours logic.
import assert from 'node:assert/strict'
import { labStatus } from '../src/lib/lab-hours.ts'

const at = (iso) => labStatus(new Date(iso)) // ISO in UTC; Baku = UTC+4
assert.deepEqual(at('2026-10-05T06:30:00Z'), { open: true, time: '10:30', text: 'the lab is open until 18:00' }) // Mon
assert.equal(at('2026-10-05T04:00:00Z').text, 'the lab opens at 09:00') // Mon 08:00
assert.equal(at('2026-10-05T14:00:00Z').text, 'the lab opens tomorrow at 09:00') // Mon 18:00
assert.equal(at('2026-10-10T11:00:00Z').text, 'the lab opens Monday at 09:00') // Sat 15:00
assert.equal(at('2026-10-10T07:00:00Z').text, 'the lab is open until 14:00') // Sat 11:00
assert.equal(at('2026-10-09T21:00:00Z').text, 'the lab opens at 10:00') // Sat 01:00
console.log('lab hours ok')
