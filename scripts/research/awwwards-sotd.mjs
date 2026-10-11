// Research, part 1 (docs/research/awwwards/PLAN.md): the recent Sites of the Day on Awwwards as data — what each is,
// its jury scores, the tags it was filed under (category, style and stack), its palette and its one-line pitch — so later parts
// (typography, transitions, colour, WebGL…) can ask "what do the winners do?" of real numbers. Only facts and short
// descriptions are kept, for study; nothing of the sites themselves is copied into OpusKit.
// node scripts/research/awwwards-sotd.mjs [pages=3]   → docs/research/awwwards/data/sotd.json
// Polite: one request at a time, ~1.2 s apart, a normal browser user agent, pages already fetched are kept.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const OUT = `${ROOT}/docs/research/awwwards/data/sotd.json`
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const get = async (url) => { const r = await fetch(url, { headers: { 'user-agent': UA } }); if (!r.ok) throw new Error(`${url} → ${r.status}`); return r.text() }
const unescape = (t) => t.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\\\//g, '/')

export function parse(slug, html) {
  const meta = (p) => unescape(html.match(new RegExp(`<meta property="${p}" content="([^"]*)"`))?.[1] ?? '')
  // The page's own record of the submission (tags, title, date) sits in a data attribute as escaped JSON.
  const rec = html.match(/&quot;slug&quot;:&quot;([^&]+)&quot;,&quot;title&quot;:&quot;(.*?)&quot;,&quot;createdAt&quot;:(\d+),&quot;tags&quot;:\[(.*?)\]/)
  const tags = rec ? JSON.parse(`[${unescape(rec[4])}]`) : []
  const colors = [...new Set([...html.matchAll(/list-palette__name"><strong>HEX<\/strong> (#[0-9A-Fa-f]{6})/g)].map((m) => m[1].toUpperCase()))]
  // Jury rows of the first tab (the Site of the Day vote): five numbers each — design, usability, creativity, content, overall.
  const jury = (() => {
    const i = html.indexOf('id="jury_votes"'); if (i < 0) return []
    const block = html.slice(i, html.indexOf('</ul>', html.indexOf('list-jury-notes', i)) + 5)
    return [...block.matchAll(/<li class="js-hidden-list-element list-jury-notes__item[\s\S]*?<\/li>/g)].map((m) => [...m[0].matchAll(/>\s*(\d+(?:\.\d+)?)\s*</g)].map((x) => Number(x[1])).slice(-5)).filter((r) => r.length === 5 && r.slice(0, 4).every(Number.isInteger)) // jurors vote whole numbers; the community's average row does not
  })()
  const avg = (k) => jury.length ? Math.round((jury.reduce((a, r) => a + r[k], 0) / jury.length) * 100) / 100 : null
  const live = unescape(html.match(/href="(https?:\/\/[^"]+)"[^>]*data-controller="visit-count"/)?.[1] ?? '')
  return {
    slug, title: rec ? unescape(rec[2]) : meta('og:title'), live, date: rec ? new Date(Number(rec[3]) * 1000).toISOString().slice(0, 10) : null,
    pitch: meta('og:description'), tags, colors,
    scores: { design: avg(0), usability: avg(1), creativity: avg(2), content: avg(3), overall: avg(4), jurors: jury.length },
  }
}

// Run directly only (the parser is imported by tests without crawling).
if (process.argv[1]?.endsWith('awwwards-sotd.mjs')) {
  const pages = Number(process.argv[2] ?? 3)
  const data = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { source: 'https://www.awwwards.com/websites/sites_of_the_day/', sites: [] }
  const have = new Set(data.sites.map((s) => s.slug))
  const slugs = []
  for (let p = 1; p <= pages; p++) {
    const html = await get(`https://www.awwwards.com/websites/sites_of_the_day/${p > 1 ? `?page=${p}` : ''}`)
    for (const m of html.matchAll(/href="\/sites\/([a-z0-9-]+)"/g)) if (!slugs.includes(m[1])) slugs.push(m[1])
    await sleep(1200)
  }
  for (const slug of slugs) {
    if (have.has(slug)) continue
    try { data.sites.push(parse(slug, await get(`https://www.awwwards.com/sites/${slug}`))); process.stdout.write('.') } catch (e) { console.warn(`\n${slug}: ${e.message}`) }
    await sleep(1200)
  }
  data.collected = new Date().toISOString().slice(0, 10)
  data.sites.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`\n${data.sites.length} sites → ${path.relative(ROOT, OUT)}`)
}
