// Viewport screenshots while scrolling slowly: node scripts/peek.mjs <path> <width> <y,y,...> [name]
import { chromium } from 'playwright'
const [path, w, ys, name = 'peek'] = process.argv.slice(2)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: +w, height: +w > 800 ? 900 : 844 }, reducedMotion: process.env.REDUCE ? 'reduce' : 'no-preference' })
if (process.env.BAG) await ctx.addInitScript(() => localStorage.setItem('maison-vey-bag', JSON.stringify([{ slug: 'salt-quay', size: '50 ml', qty: 1 }, { slug: 'reading-room', size: '15 ml', qty: 2 }])))
const p = await ctx.newPage()
p.on('pageerror', (e) => console.log('PAGEERROR', e.message))
await p.goto('http://localhost:3018' + path, { waitUntil: 'networkidle' })
let cur = 0
for (const y of ys.split(',').map(Number)) {
  while (cur < y) { cur = Math.min(y, cur + 150); await p.mouse.wheel(0, 150); await p.waitForTimeout(40) }
  await p.waitForTimeout(1500)
  await p.screenshot({ path: `qa/${name}-${w}-${y}.png` })
  console.log(y, await p.evaluate(() => [window.scrollY, document.documentElement.scrollHeight]))
}
await b.close()
