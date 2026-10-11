// Research, part 5 (docs/research/awwwards/PLAN.md): how the winners' menus and footers are made. Each live page is
// opened in a headless browser and measured — does the header stay, how many links show, is the menu behind one button
// and what opens; how tall the footer is and how big its largest word. Only these facts are kept (data/layout.json);
// screenshots of the open menu and the footer go to a folder given on the command line, for study only.
// node scripts/research/awwwards-layout.mjs <shots-dir> [top=16]
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(import.meta.dirname, '../..')
const IN = `${ROOT}/docs/research/awwwards/data/sotd.json`, OUT = `${ROOT}/docs/research/awwwards/data/layout.json`
const [shots = '', top = '16'] = process.argv.slice(2)
if (!shots) throw new Error('usage: awwwards-layout.mjs <shots-dir> [top]')
fs.mkdirSync(shots, { recursive: true })

const header = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < 140 && r.bottom > 0 }
  const links = [...document.querySelectorAll('a, button')].filter(vis)
  const menuBtn = links.find((e) => /^\s*(menu|☰|open menu|index)\s*$/i.test(e.textContent ?? '') || /menu|burger|hamburger/i.test(`${e.getAttribute('aria-label')} ${e.className}`))
  const fixed = [...document.querySelectorAll('header, nav, [class*="header"], [class*="nav"]')].some((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position))
  return { topLinks: links.filter((e) => e.tagName === 'A').length, menuButton: !!menuBtn, fixedHeader: fixed }
}
const footer = () => {
  const f = document.querySelector('footer') ?? [...document.querySelectorAll('body > *')].at(-1)
  if (!f) return { footer: false }
  const r = f.getBoundingClientRect()
  const big = Math.max(0, ...[...f.querySelectorAll('*')].filter((e) => e.childElementCount === 0 && (e.textContent ?? '').trim()).map((e) => parseFloat(getComputedStyle(e).fontSize)))
  const svgWide = [...f.querySelectorAll('svg')].some((s) => s.getBoundingClientRect().width > innerWidth * 0.6)
  return { footer: true, footerScreens: Math.round((r.height / innerHeight) * 10) / 10, footerBiggestVw: Math.round((big / innerWidth) * 1000) / 10, footerWideMark: svgWide, footerLinks: f.querySelectorAll('a').length }
}

const { sites } = JSON.parse(fs.readFileSync(IN, 'utf8'))
const study = sites.filter((s) => s.live).sort((a, b) => b.scores.overall - a.scores.overall)
const data = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { sites: {} }
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--mute-audio'] })
for (const [n, s] of study.entries()) {
  if (data.sites[s.slug]) continue
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }), p = await ctx.newPage()
  try {
    await p.goto(s.live, { waitUntil: 'load', timeout: 30000 }); await p.waitForTimeout(4000)
    const h = await p.evaluate(header)
    let menuOpens = null
    if (h.menuButton) {
      const before = await p.evaluate(() => document.body.innerText.length)
      await p.evaluate(() => { const e = [...document.querySelectorAll('a, button')].find((e) => /^\s*(menu|☰|open menu|index)\s*$/i.test(e.textContent ?? '') || /menu|burger|hamburger/i.test(`${e.getAttribute('aria-label')} ${e.className}`)); /** @type {HTMLElement} */ (e)?.click() })
      await p.waitForTimeout(1500)
      menuOpens = await p.evaluate(() => { const big = [...document.querySelectorAll('a')].filter((a) => { const r = a.getBoundingClientRect(); return r.width && r.height && r.top >= 0 && r.top < innerHeight }).map((a) => parseFloat(getComputedStyle(a).fontSize)); return { links: big.length, biggestVw: Math.round((Math.max(0, ...big) / innerWidth) * 1000) / 10 } })
      if (n < Number(top)) await p.screenshot({ path: `${shots}/${s.slug}-menu.jpg`, type: 'jpeg', quality: 50 })
      await p.keyboard.press('Escape'); void before
    }
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(2500)
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(1500)
    const f = await p.evaluate(footer)
    if (n < Number(top)) await p.screenshot({ path: `${shots}/${s.slug}-footer.jpg`, type: 'jpeg', quality: 50 })
    data.sites[s.slug] = { title: s.title, overall: s.scores.overall, ...h, menuOpens, ...f }
    process.stdout.write('.')
  } catch (e) { data.sites[s.slug] = { title: s.title, error: String(e.message).slice(0, 80) }; process.stdout.write('x') }
  await ctx.close()
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
}
await b.close()
data.collected = new Date().toISOString().slice(0, 10)
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
console.log(`\n${Object.keys(data.sites).length} sites → ${path.relative(ROOT, OUT)}`)
