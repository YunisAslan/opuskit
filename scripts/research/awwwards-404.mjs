// Research, part 7 (docs/research/awwwards/PLAN.md): what the winners show at an address that does not exist. Each
// site's /opuskit-missing-page is opened in a headless browser: the status, whether the page is the site's own (its
// fonts and colours) or the host's default, how many words, a way home, a picture or a moving part. Facts go to
// data/404.json; screenshots of the designed ones to a folder outside the repo, for study only.
// node scripts/research/awwwards-404.mjs <shots-dir>
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(import.meta.dirname, '../..')
const IN = `${ROOT}/docs/research/awwwards/data/sotd.json`, OUT = `${ROOT}/docs/research/awwwards/data/404.json`
const [shots = ''] = process.argv.slice(2)
if (!shots) throw new Error('usage: awwwards-404.mjs <shots-dir>')
fs.mkdirSync(shots, { recursive: true })

const { sites } = JSON.parse(fs.readFileSync(IN, 'utf8'))
const data = { sites: {} }
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--mute-audio'] })
for (const s of sites.filter((x) => x.live)) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }), p = await ctx.newPage()
  try {
    const url = new URL('/opuskit-missing-page', s.live).href
    const res = await p.goto(url, { waitUntil: 'load', timeout: 25000 }); await p.waitForTimeout(3500)
    const m = await p.evaluate(() => {
      const text = document.body.innerText.trim()
      const home = [...document.querySelectorAll('a')].some((a) => { try { const u = new URL(a.href); return u.origin === location.origin && (u.pathname === '/' || u.pathname === '') } catch { return false } })
      return { words: text.split(/\s+/).filter(Boolean).length, says404: /404|not found|lost|doesn.t exist|nothing here|wrong turn/i.test(text), home, media: document.querySelectorAll('img, video, canvas, svg').length, headline: (document.querySelector('h1')?.textContent ?? text.split('\n')[0] ?? '').trim().slice(0, 90) }
    })
    const status = res?.status() ?? 0
    const designed = m.says404 && m.words > 3 && m.home
    if (designed) await p.screenshot({ path: `${shots}/${s.slug}.jpg`, type: 'jpeg', quality: 50 })
    data.sites[s.slug] = { title: s.title, status, designed, ...m }
    process.stdout.write(designed ? '*' : '.')
  } catch (e) { data.sites[s.slug] = { title: s.title, error: String(e.message).slice(0, 80) }; process.stdout.write('x') }
  await ctx.close()
}
await b.close()
data.collected = new Date().toISOString().slice(0, 10)
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
console.log(`\n${Object.values(data.sites).filter((x) => x.designed).length} designed of ${Object.keys(data.sites).length} → ${path.relative(ROOT, OUT)}`)
