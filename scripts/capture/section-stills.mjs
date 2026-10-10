// Stills of the sections the Library shows as their site has them (`shownPure` false in src/data/takeables.ts): each
// framed on its own (its top at the top of the screen, after it settles), from the site's live export, 1440×900.
// Writes examples/{slug}/public/media/stills/{sectionId}.jpg; register it in that example's `sectionStills`.
// node scripts/capture/section-stills.mjs [slug:sectionId …]   (`npm run dev` on :3000 first)
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
// Where each one is: the page, and its place among the page's top-level sections (the recipe's order, hero first).
export const SHOTS = {
  'pale-hour:featured-work': ['', 2],
  'fieldhouse:case-study': ['/work/hollins-barn', 0],
  'fieldhouse:gallery': ['/work/hollins-barn', 1],
  'maison-vey:product-grid': ['', 1],
  'maison-vey:collection': ['', 2],
  'pip-kiln:product-highlight': ['/shop', 1],
}
const top = () => [...document.querySelectorAll('main section, body > div section')].filter((s) => !s.parentElement.closest('section') && !s.hasAttribute('aria-live') && s.getBoundingClientRect().height > 40)

const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS)
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
for (const key of keys) {
  const [slug, id] = key.split(':'), [route, i] = SHOTS[key]
  await p.goto(`http://localhost:3000/live/${slug}${route}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500)
  // Scrolled through once, so everything that waits to be seen has been seen; then framed on the section.
  for (let y = 0; y < 6000; y += 600) { await p.mouse.wheel(0, 600); await p.waitForTimeout(120) }
  const ok = await p.evaluate(([f, i]) => { const el = eval(f)()[i]; if (!el) return false; scrollTo(0, el.getBoundingClientRect().top + scrollY); return true }, [`(${top})`, i])
  if (!ok) throw new Error(`${key}: no section ${i}`)
  await p.waitForTimeout(1800)
  const out = `${ROOT}/examples/${slug}/public/media/stills/${id}.jpg`
  fs.mkdirSync(path.dirname(out), { recursive: true })
  await p.screenshot({ path: out, type: 'jpeg', quality: 86 })
  console.log('still', key)
}
await b.close()
