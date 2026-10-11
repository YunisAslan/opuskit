// Research, part 3 (docs/research/awwwards/PLAN.md): how the winners tagged Transitions, Scrolling, Parallax,
// Storytelling or Infinite Scroll move. Each live page is opened in a real (headless) browser and measured — smooth
// scroll, GSAP / ScrollTrigger pins, WebGL canvases, sticky parts, split lettering, a custom cursor, a preloader, a page
// transition library — then scrolled through. Only these facts are kept (data/motion.json); the scroll contact sheets
// go to a folder given on the command line, for study only — never into the repo.
// node scripts/research/awwwards-motion.mjs <sheets-dir> [top=12]
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(import.meta.dirname, '../..')
const IN = `${ROOT}/docs/research/awwwards/data/sotd.json`, OUT = `${ROOT}/docs/research/awwwards/data/motion.json`
const TAGS = ['Transitions', 'Scrolling', 'Parallax', 'Storytelling', 'Infinite Scroll']
const [sheets = '', top = '12'] = process.argv.slice(2)
if (!sheets) throw new Error('usage: awwwards-motion.mjs <sheets-dir> [top]')
fs.mkdirSync(sheets, { recursive: true })

// Runs in the page: what it is built with and what moves.
const measure = () => {
  const all = [...document.querySelectorAll('body *')].slice(0, 6000)
  const cls = (re) => all.filter((e) => re.test(typeof e.className === 'string' ? e.className : '')).length
  const style = all.map((e) => getComputedStyle(e))
  const w = /** @type {any} */ (window)
  return {
    lenis: document.documentElement.className.includes('lenis') || !!w.lenis || !!w.Lenis,
    locomotive: !!document.querySelector('[data-scroll-container]') || document.documentElement.className.includes('has-scroll-smooth'),
    gsap: !!w.gsap, scrollTrigger: !!w.ScrollTrigger, pins: document.querySelectorAll('.pin-spacer').length,
    canvases: document.querySelectorAll('canvas').length,
    sticky: style.filter((s) => s.position === 'sticky').length,
    fixed: style.filter((s) => s.position === 'fixed').length,
    split: cls(/\b(char|chars|word|words|line|lines|split)\b/i),
    cursor: all.some((e, i) => /cursor/i.test(typeof e.className === 'string' ? e.className : '') && style[i].position === 'fixed'),
    preloader: cls(/preload|loader|loading/i) > 0,
    pageLib: !!(w.barba || w.Swup || w.taxi || document.querySelector('[data-barba],[data-taxi],[data-swup]')),
    marquee: cls(/marquee|ticker/i), videos: document.querySelectorAll('video').length,
    clipPath: style.filter((s) => s.clipPath && s.clipPath !== 'none').length,
    mixBlend: style.filter((s) => s.mixBlendMode && s.mixBlendMode !== 'normal').length,
    height: Math.round(document.documentElement.scrollHeight / innerHeight),
  }
}

const { sites } = JSON.parse(fs.readFileSync(IN, 'utf8'))
const study = sites.filter((s) => s.live && s.tags.some((t) => TAGS.includes(t))).sort((a, b) => b.scores.overall - a.scores.overall)
const data = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { sites: {} }
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--mute-audio'] })
for (const [n, s] of study.entries()) {
  if (data.sites[s.slug]) continue
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }), p = await ctx.newPage()
  try {
    await p.goto(s.live, { waitUntil: 'load', timeout: 30000 }); await p.waitForTimeout(4500)
    const m = await p.evaluate(measure)
    if (n < Number(top)) { // a contact sheet: six stops down the page
      const shots = []
      for (let i = 0; i < 6; i++) {
        await p.mouse.wheel(0, i ? 900 : 0); await p.waitForTimeout(1300)
        const f = `${sheets}/${s.slug}-${i}.jpg`; await p.screenshot({ path: f, type: 'jpeg', quality: 55 }); shots.push(f)
      }
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...shots.flatMap((f) => ['-i', f]), '-filter_complex', `${shots.map((_, i) => `[${i}]scale=480:-1[s${i}]`).join(';')};${shots.map((_, i) => `[s${i}]`).join('')}xstack=inputs=6:layout=0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0`, `${sheets}/${s.slug}.jpg`])
      shots.forEach((f) => fs.rmSync(f))
    }
    data.sites[s.slug] = { title: s.title, tags: s.tags.filter((t) => TAGS.includes(t)), overall: s.scores.overall, ...m }
    process.stdout.write('.')
  } catch (e) { data.sites[s.slug] = { title: s.title, error: String(e.message).slice(0, 80) }; process.stdout.write('x') }
  await ctx.close()
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
}
await b.close()
data.collected = new Date().toISOString().slice(0, 10)
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
console.log(`\n${Object.keys(data.sites).length} sites → ${path.relative(ROOT, OUT)}`)
