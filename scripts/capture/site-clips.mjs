// Clips of sections that move as the page scrolls, recorded on their site (the Library shows these as the site has
// them): a film played by scrolling, a photo with depth, a stack of projects. Real time with Cap, 60 fps, only Chrome's
// own window (never the screen), a laptop-shaped page (1440 CSS px wide), no pointer. Writes
// examples/{slug}/public/media/clips/{sectionId}.mp4; register it in that example's `sectionClips`.
// node scripts/capture/site-clips.mjs [slug:sectionId …]   (`npm run dev` on :3000 first; Cap as in demo-clips.mjs)
// Two keys record the whole site instead of a part: `slug:site` (its `clip`: the first screen, then down through home,
// ~12 s) and `slug:full` (its `fullClip`: the landing page top to footer at a reading pace). docs/capture.md has the rest.
import { chromium } from 'playwright-core'
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { screenOf, startHand } from './hand.mjs'

const ROOT = path.resolve(import.meta.dirname, '../..')
const CAP = `${os.homedir()}/.local/bin/cap`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
// The page, the section (its place among the page's top-level sections), how far to scroll through it (in screens) and
// for how long (0 screens: it moves by itself, the page holds still); then `late`: seconds more to cut from the start
// (a film that answers the scroll late: Halden's), `session`: what the page finds in sessionStorage (its welcome already
// passed; `local`: the same for localStorage — a bag with a mug in it), `reload`: the clip opens on the page arriving (stickers that pop in), `hand`: the Mac's pointer moves through
// these points (fractions of the screen) over `s` seconds, for a part that answers the pointer (a 3D object that turns
// toward it), `crop`: [centre x, centre y, width] as fractions of the screen — a small thing shown large (a thermometer in
// a filter bar), `prep` / `act`: what happens before and during the recording, for an idea that is used — a form filled in,
// a tab pressed, a name hovered (helpers below: `tap`, `hover`, `type`, `glide`, `wait`). A scroll goes down and comes back, so the loop on the card has no jump (the user, 2026-10-11).
export const SHOTS = {
  'halden:hero': ['', 0, 1.6, 4200, { late: 1.6 }],
  'fieldhouse:hero': ['', 0, 0.7, 3000],
  'ninth-row:featured-work': ['', 3, 2.4, 5200],
  'hexmint:hero': ['', 0, 0.5, 1800, { hand: { s: 3.2, to: [[0.5, 0.45], [0.85, 0.3], [0.8, 0.8], [0.2, 0.75], [0.15, 0.25], [0.55, 0.4]] } }],
  'sticky-weather:hero': ['', 0, 0.3, 2400, { reload: true, late: 0.45, session: { 'sw-gate': '1', 'opuskit-preloaded': '1' } }],
  'inkwell-moth:hero': ['', 0, 0.45, 3200, { session: { 'im-sheet': '1' } }],
  // Ideas a site invented (src/data/site-ideas.ts): `slug:idea-{id}`.
  'pip-kiln:idea-mug-stage': ['', 0, 1.3, 3400, { late: 1.1, hand: { s: 2.2, to: [[0.5, 0.42], [0.74, 0.3], [0.7, 0.62], [0.32, 0.62], [0.26, 0.32], [0.5, 0.42]] } }],
  'pip-kiln:idea-kiln-thermometer': ['/shop', 0, 1.5, 4600, { crop: [0.74, 0.3, 0.5] }],
  'pip-kiln:idea-mug-gauge': ['/cart', 0, 0, 0, { local: { 'pip-kiln-bag': JSON.stringify([{ slug: 'morning-person-mug', glaze: 'Sunshine', qty: 1 }]) },
    act: async (h) => { for (let n = 0; n < 3; n++) { await h.tap('[aria-label="One more"]'); await h.wait(1300) } await h.wait(1600) } }],
  'pip-kiln:idea-lump-to-mug': ['/workshops', 1, 1.3, 4400],
  // Filled in, never sent: sending opens the Mail app over the window (a mail link), and Cap records whatever covers the
  // window — once the user's own drafts. The label printing as the form fills is the idea.
  'low-hum:idea-pressed-record': ['/reservations', 0, 0, 0, { prep: (h) => h.scrollTo('form', 40), act: async (h) => {
    await h.tap('button:has-text("Pick a day")', 0, 0.45); await h.wait(350); await h.tap('[role="gridcell"] button:not([disabled])', 9, 0.4); await h.wait(350)
    await h.tap('button:has-text("Pick a time")', 0, 0.4); await h.wait(300); await h.tap('[role="option"]', 3, 0.35); await h.wait(300)
    await h.tap('button:has-text("How many")', 0, 0.4); await h.wait(300); await h.tap('[role="option"]', 1, 0.35); await h.wait(300)
    await h.tap('input[name="name"]', 0, 0.4); await h.type('Mara Lind'); await h.wait(500) } }],
  'low-hum:idea-sleeve-record': ['/menu', 0, 0, 0, { prep: (h) => h.scrollTo('[role="tablist"]', 320), act: async (h) => {
    await h.glide(0.5, 2200); await h.wait(300); await h.glide(-0.5, 1800); await h.wait(300)
    await h.tap('[role="tab"]:has-text("Side B")'); await h.wait(2000); await h.tap('[role="tab"]:has-text("Side A")'); await h.wait(1600) } }],
  'raster-school:idea-faq-search': ['/faq', 0, 0, 0, { act: async (h) => {
    await h.tap('input'); await h.type('can I pay later'); await h.wait(1600)
    await h.p.keyboard.press('Meta+A'); await h.p.keyboard.press('Backspace'); await h.wait(400); await h.type('online'); await h.wait(1600) } }],
  'fieldhouse:idea-barn-index': ['', 1, 0, 0, { act: async (h) => {
    await h.glide(0.6, 2600); await h.wait(300)
    for (const n of [0, 1, 2, 3]) { await h.hover('main section h3', n, 0.5); await h.wait(900) }
    await h.glide(-0.6, 2000) } }],
  'fieldhouse:idea-names-reveal': ['/work/hollins-barn', 3, 0, 0, { act: async (h) => {
    for (const n of [0, 1, 2]) { await h.hover('main section:last-of-type h3', n, 0.7); await h.wait(1000) }
    await h.wait(500) } }],
  'qum:idea-salt-walk': ['/the-salt', 4, 2.6, 6200],
  'kur-delta-watch:idea-giant-word': ['', 0, 0, 0, { prep: (h) => h.p.evaluate(() => { const s = [...document.querySelectorAll('main section')].filter((x) => !x.parentElement.closest('section'))[3]; scrollTo(0, s.getBoundingClientRect().top + scrollY - innerHeight * 0.55) }),
    act: async (h) => { await h.glide(1.0, 3600); await h.wait(300); await h.glide(-1.0, 3000) } }],
}
// A site's welcome, passed for its whole-site clips (a gate that covers the first visit).
const WELCOMES = { 'inkwell-moth': { 'im-sheet': '1' }, 'sticky-weather': { 'sw-gate': '1', 'opuskit-preloaded': '1' } }
const PAGE = { site: ['', 0, 0, 0], full: ['', 0, 0, 0] }
const top = () => [...document.querySelectorAll('main section, body > div section')].filter((s) => !s.parentElement.closest('section') && !s.hasAttribute('aria-live') && s.getBoundingClientRect().height > 40)
const cap = (...args) => {
  const r = spawnSync(CAP, [...args, '--json'], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`cap ${args.join(' ')} → ${r.status}\n${r.stdout}\n${r.stderr}`)
  try { return [JSON.parse(r.stdout)] } catch { return r.stdout.trim().split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return { raw: l } } }) }
}
// Every scroll at one even speed: a short soft start and stop (~0.4 s), constant between — never slow then fast (the
// user, 2026-10-11: some clips crawled, then rushed). Every display frame, no wheel steps.
const steady = (page, by, ms) => page.evaluate(([by, ms]) => new Promise((done) => {
  const from = scrollY, to = by === 'end' ? document.documentElement.scrollHeight - innerHeight : from + by * innerHeight, r = Math.min(0.25, 400 / ms)
  const pos = (t) => (t < r ? (t * t) / (2 * r) : t > 1 - r ? 1 - r - ((1 - t) * (1 - t)) / (2 * r) : r / 2 + (t - r)) / (1 - r)
  const t0 = performance.now()
  const step = (now) => { const t = Math.min(1, (now - t0) / ms); scrollTo(0, from + (to - from) * Math.min(1, pos(t))); t < 1 ? requestAnimationFrame(step) : done() }
  requestAnimationFrame(step)
}), [by, ms])
const glide = steady
// The whole landing page at a brisk reading pace (px a second), the same even speed.
const read = async (page, pxPerSec) => { const d = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY); await steady(page, 'end', (d / pxPerSec) * 1000 + 800) }

async function record(key) {
  const [slug, id] = key.split(':'), [route, i, screens, ms, { late = 0, session = WELCOMES[slug] ?? {}, reload = false, hand, crop, prep, act, local = {} } = {}] = SHOTS[key] ?? PAGE[id], url = `http://localhost:3000/live/${slug}${route}`
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/opuskit-site-`)
  const b = await chromium.launchPersistentContext(`${tmp}/profile`, { headless: false, viewport: null, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ignoreDefaultArgs: ['--enable-automation'], args: [`--app=${url}`, '--window-position=130,33', '--window-size=1210,923', '--force-device-scale-factor=1.68', '--hide-scrollbars', '--mute-audio'] })
  const p = b.pages()[0] ?? await b.newPage()
  // Nothing may leave the browser while it records: a mail or phone link would bring another app over the window.
  await p.addInitScript(() => addEventListener('click', (e) => { if (e.target.closest?.('a[href^="mailto:"], a[href^="tel:"]')) e.preventDefault() }, true))
  await p.addInitScript(([kv, lv]) => { for (const [k, v] of Object.entries(kv)) sessionStorage.setItem(k, v); for (const [k, v] of Object.entries(lv)) localStorage.setItem(k, v) }, [session, local])
  let rid
  try {
    // 'load', not 'networkidle': a page with a film keeps streaming and never goes idle.
    await p.goto(url, { waitUntil: 'load' }); await sleep(4000)
    // Our scroll moves the page every frame: a page's own smooth scroll-behavior (Inkwell & Moth) or snapping (Qum's
    // walk) would fight it — the page stood still, then jumped.
    await p.addStyleTag({ content: 'html, html * { scroll-behavior: auto !important; scroll-snap-type: none !important }' })
    await p.evaluate(() => scrollTo(0, 0)); await sleep(300)
    if (i > 0) { await p.evaluate(([f, i]) => { const el = eval(f)()[i]; scrollTo(0, el.getBoundingClientRect().top + scrollY) }, [`(${top})`, i]); await sleep(1500) }
    const geo = await p.evaluate(() => ({ w: innerWidth, h: innerHeight, top: outerHeight - innerHeight }))
    // The pointer: measured onto the page, then waiting where its path starts.
    const { X, Y } = hand || act ? await screenOf(p, pointer.mouse, pointer.within) : {}
    // Helpers for `prep` and `act`: the real pointer onto a Playwright selector's middle (n-th match).
    const box = async (sel, n = 0) => { await p.locator(sel).nth(n).scrollIntoViewIfNeeded(); const b = await p.locator(sel).nth(n).boundingBox(); if (!b) throw new Error(`${key}: nothing at ${sel}`); return [b.x + b.width / 2, b.y + b.height / 2] }
    const do_ = {
      p, wait: sleep, glide: (by, ms) => glide(p, by, ms),
      hover: async (sel, n = 0, s = 0.6) => { const [x, y] = await box(sel, n); await pointer.mouse([[X(x), Y(y)]], s) },
      tap: async (sel, n = 0, s = 0.6) => { const [x, y] = await box(sel, n); await pointer.mouse([[X(x), Y(y)]], s, 'click') },
      type: (text) => p.keyboard.type(text, { delay: 55 }),
      scrollTo: (sel, offset = 0) => p.locator(sel).first().evaluate((el, o) => scrollTo(0, el.getBoundingClientRect().top + scrollY - o), offset),
    }
    if (prep) { await prep(do_); await sleep(900) }
    if (hand) await pointer.mouse([[X(hand.to[0][0] * geo.w), Y(hand.to[0][1] * geo.h)]], 0.4)
    let win
    for (let n = 0; n < 10 && !win; n++) {
      await p.evaluate((t) => { document.title = t }, `opuskit-site-${slug}-${id}`); await sleep(300)
      win = cap('targets').find((x) => x.windows)?.windows.find((w) => /chrome/i.test(w.ownerName) && w.name === `opuskit-site-${slug}-${id}`)
    }
    if (!win) throw new Error(`no Chrome window for ${key}`)
    rid = cap('record', 'start', '--window', win.id, '--fps', '60', '--mode', 'studio', '--path', `${tmp}/c.cap`, '--detach').find((e) => e.recordingId)?.recordingId
    await sleep(1100) // Cap's start-up, then a breath on the section standing still
    if (reload) { await p.reload({ waitUntil: 'load' }); await sleep(1300) }
    if (hand) await pointer.mouse(hand.to.map(([fx, fy]) => [X(fx * geo.w), Y(fy * geo.h)]), hand.s)
    if (act) await act(do_)
    if (screens) { await glide(p, screens, ms); await sleep(350); await glide(p, -screens, ms * 0.8) }
    if (id === 'site') { await sleep(600); await steady(p, 3.4, 6800); await sleep(700) }
    if (id === 'full') { await sleep(600); await read(p, 520); await sleep(1000) }
    await sleep(500)
    cap('record', 'stop', '--id', rid); rid = undefined
    const cfg = JSON.parse(fs.readFileSync(`${tmp}/c.cap/project-config.json`, 'utf8'))
    cfg.cursor = { ...cfg.cursor, hide: !hand && !act, raw: true, size: 110, motionBlur: 0.3 }
    cfg.background = { ...cfg.background, padding: 0, rounding: 0, shadow: 0 }
    cap('project', 'config', 'set', '--settings-json', JSON.stringify(cfg), `${tmp}/c.cap`)
    const W = 1920, H = Math.round(W * win.bounds.height / win.bounds.width / 2) * 2
    cap('export', `${tmp}/c.cap`, '-o', `${tmp}/raw.mp4`, '--fps', '60', '--resolution', `${W}x${H}`, '--quality', 'maximum')
    // Under the title bar and inside the window's frame, 16:10, 1280 wide.
    const bar = Math.round((geo.top / win.bounds.height) * H / 2) * 2, edge = 4, even = (n) => Math.round(n / 2) * 2
    const vw = W - 2 * edge, vh = H - bar - edge, w = even(crop ? vw * crop[2] : vw), h = even(w * 0.625)
    const x0 = crop ? even(Math.min(Math.max(edge + vw * crop[0] - w / 2, edge), edge + vw - w)) : edge
    const y0 = crop ? even(Math.min(Math.max(bar + vh * crop[1] - h / 2, bar), bar + vh - h)) : bar + 2
    const out = `${ROOT}/examples/${slug}/public/media/clips/${id}.mp4`
    fs.mkdirSync(path.dirname(out), { recursive: true })
    // From a breath before the page starts to move (Cap's start-up and the wait cut away); a film that never stands
    // still (Halden's) hides that moment, so then a fixed cut.
    const still = spawnSync('ffmpeg', ['-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${x0}:${y0},freezedetect=n=0.001:d=0.2`, '-an', '-f', 'null', '-'], { encoding: 'utf8' }).stderr
    const lead = /freeze_start: 0(?:\.0+)?\b[\s\S]*?freeze_end: ([\d.]+)/.exec(still)?.[1]
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String((lead ? Math.max(0, Number(lead) - 0.4) : 1.5) + late), '-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${x0}:${y0},scale=1280:-2:flags=lanczos`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '60', '-movflags', '+faststart', out])
    console.log('recorded', key)
  } finally {
    if (rid) cap('record', 'stop', '--id', rid) // never a recording left running
    await b.close(); fs.rmSync(tmp, { recursive: true, force: true })
  }
}

const pointer = startHand()
// Cap's window list now and then misses a fresh window: a second go.
for (const key of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS)) await record(key).catch(async (e) => { console.warn(`${key}: ${e.message.split('\n')[0]} — again`); await record(key) })
pointer.stop()
