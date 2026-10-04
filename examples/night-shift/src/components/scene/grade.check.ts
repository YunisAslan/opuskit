// Run: node src/components/scene/grade.check.ts
import assert from 'node:assert/strict'
import { gradeFromPointer, gradeChannel, rgbOf, cbcr, luma } from './grade.ts'

const near = (a: number, b: number, e = 1e-6) => assert.ok(Math.abs(a - b) < e, `${a} ≉ ${b}`)
// Centre of the screen: no grade at all.
const zero = gradeFromPointer(0, 0)
for (const v of [0, 0.18, 0.5, 1]) for (const ch of [0, 1, 2] as const) near(gradeChannel(v, ch, zero), v)
// Wheel pushes are zero-sum: they tint, they don't brighten.
const p = rgbOf(0.6, -0.3); near(p[0] + p[1] + p[2], 0)
// Pointer right warms the mids (red up, blue down); pointer up lifts them.
const right = gradeFromPointer(1, 0)
assert.ok(gradeChannel(0.5, 0, right) > 0.5 && gradeChannel(0.5, 2, right) < 0.5)
assert.ok(luma(...([0, 1, 2] as const).map((c) => gradeChannel(0.4, c, gradeFromPointer(0, 1))) as [number, number, number]) > 0.4)
// Grey has no colour on the vectorscope; red sits up and to the left (BT.709).
near(cbcr(0.5, 0.5, 0.5)[0], 0); near(cbcr(0.5, 0.5, 0.5)[1], 0)
const [rcb, rcr] = cbcr(1, 0, 0); assert.ok(rcb < 0 && rcr > 0)
console.log('grade: ok')
