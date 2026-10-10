// The Mac's own pointer for recordings: one mouse.py process for the whole run (moves sent as JSON lines, no start-up
// pause between them), and the map from a page's pixels to screen points, measured rather than assumed.
import { spawn } from 'node:child_process'
import readline from 'node:readline'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export function startHand() {
  const proc = spawn('uvx', ['--with', 'pyobjc-framework-Quartz', 'python', '-I', `${import.meta.dirname}/mouse.py`], { stdio: ['pipe', 'pipe', 'inherit'] })
  const done = []
  readline.createInterface({ input: proc.stdout }).on('line', () => done.shift()?.())
  /** Move along points (screen points); press: 'click' at the end, or 'drag' all along. */
  const mouse = (points, seconds, press) => new Promise((r) => { done.push(r); proc.stdin.write(JSON.stringify({ points, seconds, press }) + '\n') })
  return { mouse, stop: () => proc.stdin.end() }
}

/** Page pixels to screen points: the pointer is put at two places in the window's top-left corner (clear of what is
 *  recorded) and the page says where it saw it. Returns X(x), Y(y). */
export async function screenOf(page, mouse) {
  const geo = await page.evaluate(() => ({ sx: screenX, sy: screenY, top: outerHeight - innerHeight }))
  await page.evaluate(() => addEventListener('mousemove', (e) => { window.__at = [e.clientX, e.clientY] }))
  const seen = []
  for (const pt of [[geo.sx + 30, geo.sy + geo.top + 30], [geo.sx + 90, geo.sy + geo.top + 80]]) { await mouse([pt], 0.3); await sleep(150); seen.push([pt, await page.evaluate(() => window.__at)]) }
  const [[[ax, ay], [acx, acy]], [[bx, by], [bcx, bcy]]] = seen
  const kx = (bx - ax) / (bcx - acx), ky = (by - ay) / (bcy - acy)
  return { X: (x) => ax + (x - acx) * kx, Y: (y) => ay + (y - acy) * ky }
}
