// Visual QA: screenshots of every page at 1440px and 390px, plus overflow and console checks.
// PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright node scripts/shoot.mjs [page ...]
import { chromium } from 'playwright'
const base = process.env.BASE ?? 'http://localhost:3018'
const all = { home: '/', shop: '/shop', product: '/shop/salt-quay', cart: '/cart', checkout: '/checkout', about: '/about', legal: '/legal', notfound: '/nope' }
const pick = process.argv.slice(2)
const pages = Object.entries(all).filter(([k]) => !pick.length || pick.includes(k))
const widths = (process.env.WIDTHS ?? '1440,390').split(',').map(Number)
const browser = await chromium.launch()
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w > 800 ? 900 : 844 }, deviceScaleFactor: 1, reducedMotion: process.env.REDUCE ? 'reduce' : 'no-preference' })
  if (process.env.BAG) await ctx.addInitScript(() => localStorage.setItem('maison-vey-bag', JSON.stringify([{ slug: 'salt-quay', size: '50 ml', qty: 1 }, { slug: 'reading-room', size: '15 ml', qty: 2 }])))
  for (const [name, path] of pages) {
    const p = await ctx.newPage()
    const errors = []
    p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text().slice(0, 200)) })
    p.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message))
    await p.goto(base + path, { waitUntil: 'networkidle' })
    await p.screenshot({ path: `qa/${name}-${w}-first.png` })
    // scroll through so every reveal runs
    const h = await p.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 400) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(60) }
    await p.waitForTimeout(1300)
    await p.evaluate(() => window.scrollTo(0, 0))
    await p.waitForTimeout(300)
    const over = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h1: document.querySelectorAll('h1').length,
      wide: [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('[class*="overflow-x-auto"],[class*="overflow-hidden"],.no-scrollbar,[aria-roledescription=carousel]') }).slice(0, 5).map((e) => e.tagName + '.' + (e.className?.toString?.() ?? '').slice(0, 60)) }))
    await p.screenshot({ path: `qa/${name}-${w}.png`, fullPage: true })
    console.log(w, name, JSON.stringify(over), errors.length ? errors : '')
    await p.close()
  }
  await ctx.close()
}
await browser.close()
