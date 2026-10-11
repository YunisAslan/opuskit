// Research, part 2 (docs/research/awwwards/PLAN.md): which typefaces the recent Sites of the Day use. Awwwards does not
// list them, so each winner's own live page is read: its stylesheets' @font-face families (and Google Fonts / Adobe
// Fonts links). Only the family names are kept, for study — nothing of the sites is copied into OpusKit.
// node scripts/research/awwwards-fonts.mjs   → docs/research/awwwards/data/fonts.json (reads data/sotd.json)
// Polite: one site at a time, at most 6 stylesheets each, ~1 s apart, a normal browser user agent, 12 s timeouts.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const IN = `${ROOT}/docs/research/awwwards/data/sotd.json`, OUT = `${ROOT}/docs/research/awwwards/data/fonts.json`
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const get = async (url) => { const r = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(12000), redirect: 'follow' }); if (!r.ok) throw new Error(`${r.status}`); return r.text() }

// Names that are fallbacks, icon sets or the browser's own, not a typeface choice.
const NOISE = /^(inherit|initial|sans-serif|serif|monospace|system-ui|-apple-system|blinkmacsystemfont|arial|helvetica|times new roman|georgia|segoe ui|roboto fallback|.*icons?|swiper-icons|slick|fontawesome|font awesome.*|webflow-icons|__.*|var\(.*)$/i

export function families(css) {
  const out = new Set()
  for (const m of css.matchAll(/@font-face\s*{([^}]*)}/g)) {
    const f = m[1].match(/font-family\s*:\s*["']?([^;"']+)["']?/i)?.[1]?.trim()
    if (f && !NOISE.test(f)) out.add(f.replace(/\s+/g, ' '))
  }
  return out
}
const google = (url) => [...new URL(url).searchParams.getAll('family')].flatMap((f) => f.split('|')).map((f) => f.split(':')[0].replace(/\+/g, ' '))

if (process.argv[1]?.endsWith('awwwards-fonts.mjs')) {
  const { sites } = JSON.parse(fs.readFileSync(IN, 'utf8'))
  const data = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { sites: {} }
  for (const s of sites) {
    if (data.sites[s.slug] || !s.live) continue
    const found = new Set(), notes = []
    try {
      const html = await get(s.live), base = new URL(s.live)
      for (const f of families(html)) found.add(f) // inline <style>
      const links = [...html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*>/g)].map((m) => m[0]).filter((l) => /stylesheet|\.css|fonts\.googleapis|typekit/.test(l)).map((l) => l.match(/href=["']([^"']+)["']/)[1])
      for (const href of links.slice(0, 6)) {
        const url = new URL(href.replace(/&amp;/g, '&'), base).href
        if (/fonts\.googleapis\.com/.test(url)) { google(url).forEach((f) => found.add(f)); continue }
        try { for (const f of families(await get(url))) found.add(f) } catch (e) { notes.push(`css ${e.message}`) }
        await sleep(300)
      }
    } catch (e) { notes.push(`page ${e.message}`) }
    data.sites[s.slug] = { title: s.title, live: s.live, fonts: [...found], ...(notes.length ? { notes } : {}) }
    process.stdout.write(found.size ? '.' : 'o')
    await sleep(900)
  }
  data.collected = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
  const n = Object.values(data.sites).filter((x) => x.fonts.length).length
  console.log(`\n${n} of ${Object.keys(data.sites).length} sites with fonts → ${path.relative(ROOT, OUT)}`)
}
