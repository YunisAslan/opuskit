// Clips of sections that move as the page scrolls, recorded on their site (the Library shows these as the site has
// them): a film played by scrolling, a photo with depth, a stack of projects. Real time with Cap, 60 fps, only Chrome's
// own window (never the screen), a laptop-shaped page (1440 CSS px wide), no pointer. Writes
// examples/{slug}/public/media/clips/{sectionId}.mp4; register it in that example's `sectionClips`.
// node scripts/capture/site-clips.mjs [slug:sectionId …]   (`npm run dev` on :3000 first; Cap as in demo-clips.mjs)
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
// passed), `reload`: the clip opens on the page arriving (stickers that pop in), `hand`: the Mac's pointer moves through
// these points (fractions of the screen) over `s` seconds, for a part that answers the pointer (a 3D object that turns
// toward it). A scroll goes down and comes back, so the loop on the card has no jump (the user, 2026-10-11).
export const SHOTS = {
  'halden:hero': ['', 0, 1.6, 4200, { late: 1.6 }],
  'fieldhouse:hero': ['', 0, 0.7, 3000],
  'ninth-row:featured-work': ['', 3, 2.4, 5200],
  'hexmint:hero': ['', 0, 0.5, 1800, { hand: { s: 3.2, to: [[0.5, 0.45], [0.85, 0.3], [0.8, 0.8], [0.2, 0.75], [0.15, 0.25], [0.55, 0.4]] } }],
  'sticky-weather:hero': ['', 0, 0.3, 2400, { reload: true, late: 0.45, session: { 'sw-gate': '1', 'opuskit-preloaded': '1' } }],
  'inkwell-moth:hero': ['', 0, 0.45, 3200, { session: { 'im-sheet': '1' } }],
}
const top = () => [...document.querySelectorAll('main section, body > div section')].filter((s) => !s.parentElement.closest('section') && !s.hasAttribute('aria-live') && s.getBoundingClientRect().height > 40)
const cap = (...args) => {
  const r = spawnSync(CAP, [...args, '--json'], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`cap ${args.join(' ')} → ${r.status}\n${r.stdout}\n${r.stderr}`)
  try { return [JSON.parse(r.stdout)] } catch { return r.stdout.trim().split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) } catch { return { raw: l } } }) }
}
// Eased, every display frame (no wheel steps).
const glide = (page, by, ms) => page.evaluate(([by, ms]) => new Promise((done) => {
  const from = scrollY, to = from + by * innerHeight, t0 = performance.now(), ease = (t) => 1 - (1 - t) ** 2.4 // moving from the first frame, slowing to a stop
  const step = (now) => { const t = Math.min(1, (now - t0) / ms); scrollTo(0, from + (to - from) * ease(t)); t < 1 ? requestAnimationFrame(step) : done() }
  requestAnimationFrame(step)
}), [by, ms])

async function record(key) {
  const [slug, id] = key.split(':'), [route, i, screens, ms, { late = 0, session = {}, reload = false, hand } = {}] = SHOTS[key], url = `http://localhost:3000/live/${slug}${route}`
  const tmp = fs.mkdtempSync(`${os.tmpdir()}/opuskit-site-`)
  const b = await chromium.launchPersistentContext(`${tmp}/profile`, { headless: false, viewport: null, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ignoreDefaultArgs: ['--enable-automation'], args: [`--app=${url}`, '--window-position=130,33', '--window-size=1210,923', '--force-device-scale-factor=1.68', '--hide-scrollbars', '--mute-audio'] })
  const p = b.pages()[0] ?? await b.newPage()
  await p.addInitScript((kv) => { for (const [k, v] of Object.entries(kv)) sessionStorage.setItem(k, v) }, session)
  let rid
  try {
    // 'load', not 'networkidle': a page with a film keeps streaming and never goes idle.
    await p.goto(url, { waitUntil: 'load' }); await sleep(4000)
    await p.evaluate(() => scrollTo(0, 0)); await sleep(300)
    if (i > 0) { await p.evaluate(([f, i]) => { const el = eval(f)()[i]; scrollTo(0, el.getBoundingClientRect().top + scrollY) }, [`(${top})`, i]); await sleep(1500) }
    const geo = await p.evaluate(() => ({ w: innerWidth, h: innerHeight, top: outerHeight - innerHeight }))
    // The pointer: measured onto the page, then waiting where its path starts.
    const { X, Y } = hand ? await screenOf(p, pointer.mouse) : {}
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
    if (screens) { await glide(p, screens, ms); await sleep(350); await glide(p, -screens, ms * 0.8) }
    await sleep(500)
    cap('record', 'stop', '--id', rid); rid = undefined
    const cfg = JSON.parse(fs.readFileSync(`${tmp}/c.cap/project-config.json`, 'utf8'))
    cfg.cursor = { ...cfg.cursor, hide: !hand, raw: true, size: 110, motionBlur: 0.3 }
    cfg.background = { ...cfg.background, padding: 0, rounding: 0, shadow: 0 }
    cap('project', 'config', 'set', '--settings-json', JSON.stringify(cfg), `${tmp}/c.cap`)
    const W = 1920, H = Math.round(W * win.bounds.height / win.bounds.width / 2) * 2
    cap('export', `${tmp}/c.cap`, '-o', `${tmp}/raw.mp4`, '--fps', '60', '--resolution', `${W}x${H}`, '--quality', 'maximum')
    // Under the title bar and inside the window's frame, 16:10, 1280 wide.
    const bar = Math.round((geo.top / win.bounds.height) * H / 2) * 2, edge = 4, w = W - 2 * edge, h = Math.round(w * 0.625 / 2) * 2
    const out = `${ROOT}/examples/${slug}/public/media/clips/${id}.mp4`
    fs.mkdirSync(path.dirname(out), { recursive: true })
    // From a breath before the page starts to move (Cap's start-up and the wait cut away); a film that never stands
    // still (Halden's) hides that moment, so then a fixed cut.
    const still = spawnSync('ffmpeg', ['-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${edge}:${bar + 2},freezedetect=n=0.001:d=0.2`, '-an', '-f', 'null', '-'], { encoding: 'utf8' }).stderr
    const lead = /freeze_start: 0(?:\.0+)?\b[\s\S]*?freeze_end: ([\d.]+)/.exec(still)?.[1]
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String((lead ? Math.max(0, Number(lead) - 0.4) : 1.5) + late), '-i', `${tmp}/raw.mp4`, '-vf', `crop=${w}:${h}:${edge}:${bar + 2},scale=1280:-2:flags=lanczos`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '60', '-movflags', '+faststart', out])
    console.log('recorded', key)
  } finally {
    if (rid) cap('record', 'stop', '--id', rid) // never a recording left running
    await b.close(); fs.rmSync(tmp, { recursive: true, force: true })
  }
}

const pointer = startHand()
for (const key of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS)) await record(key)
pointer.stop()
