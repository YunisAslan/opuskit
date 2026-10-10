// The Library's clips of pieces being used: a piece that only moves on hover, a drag, a click or the page's scroll is
// recorded on its demo page (/library/demo/{id}, OpusKit's standard theme) in real time with Cap — 60 fps, the Mac's
// own cursor moved by mouse.py — and cut to 16:10. Writes public/library/demos/{id}.mp4 and, in
// src/data/demo-clips.generated.json, a hash of the piece's source: `npm run check` fails when a piece changed after its
// clip, so a clip never shows code the Library no longer ships.
//
// node scripts/capture/demo-clips.mjs [id …]   (all of CLIPS when none given; `npm run dev` on :3000 first)
// Needs, once: Cap (cap.so) with its CLI at ~/.local/bin/cap, Screen Recording for Cap, Accessibility for the terminal
// (the pointer), uv (for pyobjc), ffmpeg. Only Chrome's own window is recorded — never the screen.
import { chromium } from 'playwright-core'
import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { screenOf, startHand } from './hand.mjs'

const ROOT = path.resolve(import.meta.dirname, '../..')
const OUT = `${ROOT}/public/library/demos`, MANIFEST = `${ROOT}/src/data/demo-clips.generated.json`
const CAP = `${os.homedir()}/.local/bin/cap`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// What each clip does. `at` finds a point on the page (CSS px, from the viewport's top-left); a hand is a list of
// moves — { to: [[dx, dy], …] from that point, s: seconds, press?: 'click' | 'drag', wait?: ms after }.
const centre = (sel) => `(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`
const byText = (re) => `(() => { const el = [...document.querySelectorAll('button')].find((b) => ${re}.test(b.textContent)); const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`
const PIECE = centre('[data-demo] > *')
// Every clip starts with the pointer just off the piece and ends just after the thing happens: no long trips to it and
// away (the user, 2026-10-10 — a second or two of travel in a five-second loop).
const approach = (from) => [{ to: [from, [-30, 12]], s: 0.7, wait: 120 }, { to: [[-30, 12], [-80, 18], [-30, -14], [60, -14], [80, 14], [10, 6]], s: 1.4, wait: 500 },
  { to: [[10, 6], [from[0] * -0.9, from[1]]], s: 0.7, wait: 400 }]
// The page change demo: the nav link after the current one (the current one is underlined), three times round.
const NEXT_LINK = `(() => { const bs = [...document.querySelectorAll('[data-demo] nav button')], i = bs.findIndex((b) => b.classList.contains('underline')), r = bs[(i + 1) % bs.length].getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`
const clicks = (n) => Array.from({ length: n }, () => ({ at: NEXT_LINK, to: [[0, 0]], s: 0.9, press: 'click', wait: 1800 }))
export const CLIPS = {
  magnetic: { at: PIECE, start: [-190, 100], hand: approach([-190, 100]) },
  'swap-button': { at: PIECE, start: [-190, 100], hand: approach([-190, 100]) },
  'brand-cursor': { at: PIECE, start: [-190, 40], rawCursor: true, hand: [
    { to: [[-190, 40], [-80, 20], [-30, -26], [50, -20], [80, 20], [10, 30], [-50, 6], [0, -12]], s: 2.6, wait: 300 },
    { to: [[0, -12], [190, -30]], s: 0.6, wait: 400 }] },
  'image-trail': { at: PIECE, start: [-230, 20], hand: [{ to: [[-230, 20], [-140, -25], [-40, 30], [60, -25], [150, 25], [230, 0]], s: 2.6, wait: 700 }] },
  'image-comparison': { at: centre('[aria-label="Compare photos"]'), start: [-70, 70], hand: [
    { to: [[-70, 70], [0, 0]], s: 0.6, wait: 150 }, { to: [[0, 0], [-150, 2], [140, -2], [30, 0]], s: 2.6, press: 'drag', wait: 300 }, { to: [[30, 0], [80, 60]], s: 0.4, wait: 300 }] },
  'drag-photos': { at: centre('[data-demo] img'), start: [-60, 70], hand: [
    { to: [[-60, 70], [0, 0]], s: 0.6, wait: 150 }, { to: [[0, 0], [70, 40], [150, 60]], s: 1.3, press: 'drag', wait: 400 }, { to: [[150, 60], [190, 110]], s: 0.4, wait: 300 }] },
  // wide: it opens over the whole screen, so the clip keeps the whole window.
  lightbox: { wide: true, at: centre('[data-demo] button'), start: [-70, 60], hand: [
    { to: [[-70, 60], [0, 0]], s: 0.7, press: 'click', wait: 1200 },
    { at: byText(/^›$/), to: [[0, 0]], s: 0.7, press: 'click', wait: 1100 }, { at: byText(/^›$/), to: [[0, 0]], s: 0.3, press: 'click', wait: 1100 }, { key: 'Escape', wait: 700 }] },
  'ambient-sound': { at: centre('[data-opuskit-sound]'), start: [120, -80], hand: [{ to: [[120, -80], [0, 0]], s: 0.7, press: 'click', wait: 2200 }, { to: [[0, 0]], s: 0.2, press: 'click', wait: 900 }] },
  'fade-transition': { at: PIECE, start: [60, 120], hand: clicks(3) },
  'blob-transition': { at: PIECE, start: [60, 120], hand: clicks(3) },
  'curtain-transition': { at: PIECE, start: [60, 120], hand: clicks(3) },
  // Scrolled pages: no pointer, the page itself moving (to: a page y, or 'end'; ms). from: the clip starts with the
  // piece ([data-target]) this far down the screen (0…1), not on the plain text above it.
  'tilted-grid': { from: 0.9, scroll: [{ to: 'el:[data-target]', ms: 3600 }] },
  'scroll-progress': { scroll: [{ to: 'end', ms: 6000 }] },
  'chapter-colours': { from: 0.15, scroll: [{ to: 'end', ms: 8000 }] },
}

const cap = (...args) => {
  const r = spawnSync(CAP, [...args, '--json'], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`cap ${args.join(' ')} → ${r.status}\n${r.stdout}\n${r.stderr}`)
  try { return [JSON.parse(r.stdout)] } catch { return r.stdout.trim().split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return { raw: l } } }) }
}
const { mouse, stop } = startHand()
const glide = (page, to, ms) => page.evaluate(([to, ms]) => new Promise((done) => {
  const end = to === 'end' ? document.documentElement.scrollHeight - innerHeight
    : to.startsWith?.('el:') ? (() => { const r = document.querySelector(to.slice(3)).getBoundingClientRect(); return r.top + scrollY + r.height / 2 - innerHeight / 2 })() : to
  const from = scrollY, t0 = performance.now(), ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)
  const step = (now) => { const t = Math.min(1, (now - t0) / ms); scrollTo(0, from + (end - from) * ease(t)); t < 1 ? requestAnimationFrame(step) : done() }
  requestAnimationFrame(step)
}), [to, ms])
const sourceHash = (id) => {
  const file = fs.readFileSync(`${ROOT}/src/data/pieces.ts`, 'utf8').match(new RegExp(`(?:'${id}'|\\b${id}): \\{[\\s\\S]*?file: '([^']+)'`))?.[1]
  // ponytail: hashes the piece's own file only; a change to its demo in PieceDemo.tsx needs the clip re-recorded by hand.
  return createHash('sha1').update(fs.readFileSync(`${ROOT}/src/pieces/${file}`)).digest('hex').slice(0, 12)
}

async function record(id) {
  const c = CLIPS[id], url = `http://localhost:3000/library/demo/${id}`
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/opuskit-demo-`)
  await mouse([[1460, 940]], 0.1) // the pointer out of the way while the window opens
  // A laptop-shaped app window (no tabs, no address bar, no automation bar), muted. A piece on its own is shown large by
  // the browser's own zoom (a pixel ratio of 3), never by CSS zoom or a transform: those leave the pointer and the page
  // in different pixels, so a dragged photo drifted from the cursor (the user, 2026-10-10). A scrolled page: 1.68.
  const b = await chromium.launchPersistentContext(`${tmp}/profile`, { headless: false, viewport: null, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ignoreDefaultArgs: ['--enable-automation'], args: [`--app=${url}`, '--window-position=130,33', '--window-size=1210,923', `--force-device-scale-factor=${c.scroll ? 1.68 : 3}`, '--hide-scrollbars', '--mute-audio'] })
  const p = b.pages()[0] ?? await b.newPage()
  await p.goto(url, { waitUntil: 'networkidle' }); await sleep(2000)
  const geo = await p.evaluate(() => ({ w: innerWidth, h: innerHeight, sx: screenX, sy: screenY, top: outerHeight - innerHeight }))
  const { X, Y } = await screenOf(p, mouse)
  if (c.from != null) { await p.evaluate((f) => scrollTo(0, document.querySelector('[data-target]').getBoundingClientRect().top + scrollY - innerHeight * f), c.from); await sleep(800) }
  const origin = c.at ? await p.evaluate(c.at) : null
  const stage = c.scroll || c.wide ? null : await p.evaluate(() => { const r = document.querySelector('[data-demo]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height } })
  if (c.start) { const [dx, dy] = c.start; await mouse([[X(origin.x + dx), Y(origin.y + dy)], [X(origin.x + dx + 1), Y(origin.y + dy + 1)]], 0.1) }

  // The window by its title, set just for this (the window list can lag the title by a moment).
  let win
  for (let i = 0; i < 10 && !win; i++) {
    await p.evaluate((t) => { document.title = t }, `opuskit-demo-${id}`); await sleep(300)
    win = cap('targets').find((x) => x.windows)?.windows.find((w) => /chrome/i.test(w.ownerName) && w.name === `opuskit-demo-${id}`)
  }
  if (!win) { await b.close(); throw new Error(`no Chrome window for ${id}`) }
  const proj = `${tmp}/${id}.cap`
  const rid = cap('record', 'start', '--window', win.id, '--fps', '60', '--mode', 'studio', '--path', proj, '--detach').find((e) => e.recordingId)?.recordingId
  try {
    await sleep(800) // Cap takes a moment to start capturing; a shorter wait loses the first move
    for (const s of c.scroll ?? []) { await glide(p, s.to, s.ms); await sleep(1000) }
    for (const m of c.hand ?? []) {
      if (m.key) await p.keyboard.press(m.key)
      else { const o = m.at ? await p.evaluate(m.at) : origin; await mouse(m.to.map(([dx, dy]) => [X(o.x + dx), Y(o.y + dy)]), m.s, m.press) }
      await sleep(m.wait ?? 0)
    }
  } finally { cap('record', 'stop', '--id', rid); await b.close() } // never a recording left running

  // The Mac's own cursor where the clip is about the pointer; edge to edge.
  const cfg = JSON.parse(fs.readFileSync(`${proj}/project-config.json`, 'utf8'))
  // raw: the cursor where the pointer really was — smoothing made it trail behind a dragged photo.
  cfg.cursor = { ...cfg.cursor, hide: !c.hand, type: 'auto', size: 110, motionBlur: 0.3, raw: true, ...(c.rawCursor && { useSvg: false }) }
  cfg.background = { ...cfg.background, padding: 0, rounding: 0, shadow: 0 }
  cap('project', 'config', 'set', '--settings-json', JSON.stringify(cfg), proj)
  const W = 1920, H = Math.round(W * win.bounds.height / win.bounds.width / 2) * 2
  cap('export', proj, '-o', `${tmp}/raw.mp4`, '--fps', '60', '--resolution', `${W}x${H}`, '--quality', 'maximum')
  // A 16:10 cut, 1280 wide: a piece on its own is cut to its stage (with a little air), a scrolled page keeps its width
  // and its top (a reading line lives there), under the title bar.
  const bar = Math.round((geo.top / win.bounds.height) * H / 2) * 2, k = W / geo.w, even = (n) => Math.round(n / 2) * 2
  const w = even(stage ? stage.w * 1.06 * k : W * 0.9), h = even(w * 0.625)
  const x = even(stage ? (stage.x + stage.w / 2) * k - w / 2 : (W - w) / 2), y = even(stage ? bar + (stage.y + stage.h / 2) * k - h / 2 : c.wide ? bar + (H - bar - h) / 2 : bar + 2)
  fs.mkdirSync(OUT, { recursive: true })
  // The clip starts where something first moves (less a breath): Cap's start-up and the pointer's wait are cut away.
  const still = spawnSync('ffmpeg', ['-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${x}:${y},freezedetect=n=0.001:d=0.2`, '-an', '-f', 'null', '-'], { encoding: 'utf8' }).stderr
  const lead = /freeze_start: 0(?:\.0+)?\b[\s\S]*?freeze_end: ([\d.]+)/.exec(still)?.[1]
  const from = lead ? Math.max(0, Number(lead) - 0.15) : 0
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(from), '-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${x}:${y},scale=1280:-2:flags=lanczos`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '60', '-movflags', '+faststart', `${OUT}/${id}.mp4`])
  fs.rmSync(tmp, { recursive: true, force: true })
  console.log('recorded', id)
}

const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CLIPS)
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {}
for (const id of ids) {
  if (!CLIPS[id]) throw new Error(`no clip plan for ${id}`)
  // Cap's window list now and then misses a fresh window: a second go.
  await record(id).catch(async (e) => { console.warn(`${id}: ${e.message.split('\n')[0]} — again`); await record(id) })
  manifest[id] = { src: `/library/demos/${id}.mp4`, source: sourceHash(id) }
  fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + '\n')
}
stop()
