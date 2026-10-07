// Writes a plain, clearly temporary picture for every image in src/config/assets.ts, at its exact size, into
// public/media under the name the asset layer expects. Light cool grey on the dark site — never lost in the page.
// Usage: node scripts/make-placeholders.mjs   (skips files that are no longer placeholders: pass --force to redo all)
import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = readFileSync(join(root, 'src/config/assets.ts'), 'utf8')
const force = process.argv.includes('--force')
const out = join(root, 'public/media')
mkdirSync(out, { recursive: true })

// Parse the image(...) calls: key: image('/media/x.jpg', w, h, 'alt', 'usage', 'subject')
const re = /(\w+):\s*image\('([^']+)',\s*(\d+),\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'/g
const posterOf = {}
for (const m of source.matchAll(/(\w+): \{ kind: 'video'[^}]*poster: '(\w+)'/g)) (posterOf[m[2]] ??= []).push(m[1])

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\'/g, '’')
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

let made = 0
for (const [, key, src, w, h, , usage, subject] of source.matchAll(re)) {
  const W = +w, H = +h
  const file = join(root, 'public', src)
  if (existsSync(file) && !force) {
    const meta = await sharp(file).metadata().catch(() => null)
    if (!meta?.exif?.toString('latin1').includes('opuskit-placeholder')) { console.log(`keep  ${src} (not a placeholder)`); continue }
  }
  const g = gcd(W, H)
  const unit = Math.min(W, H) / 1000
  const pad = Math.round(56 * unit)
  const big = Math.round(76 * unit)
  const small = Math.round(30 * unit)
  const films = posterOf[key] ? `Poster for ${posterOf[key].join(', ')}` : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#A3ABB2"/>
  <g stroke="#8D969E" stroke-width="${Math.max(2, Math.round(2 * unit))}">
    <line x1="0" y1="0" x2="${W}" y2="${H}"/><line x1="${W}" y1="0" x2="0" y2="${H}"/>
  </g>
  <rect x="${pad / 2}" y="${pad / 2}" width="${W - pad}" height="${H - pad}" fill="none" stroke="#181D21" stroke-opacity="0.35" stroke-width="${Math.max(2, Math.round(2 * unit))}"/>
  <rect x="${pad}" y="${pad}" width="${Math.round(big * 0.62 * key.length + big * 0.9)}" height="${Math.round(big * 1.55)}" fill="#181D21"/>
  <text x="${pad + big * 0.45}" y="${pad + big * 1.1}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${big}" font-weight="700" fill="#FFFFFF">${esc(key)}</text>
  <text x="${pad}" y="${pad + big * 1.55 + small * 1.9}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${small}" font-weight="600" fill="#181D21">TEMPORARY  ${W} × ${H}  (${W / g}:${H / g})  ${esc(src)}</text>
  <text x="${pad}" y="${H - pad - small * 1.6}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${small}" fill="#181D21">${esc(subject)}</text>
  <text x="${pad}" y="${H - pad - small * 0.2}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${small}" fill="#181D21" fill-opacity="0.75">${esc(films || usage)}</text>
</svg>`
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).withMetadata({ exif: { IFD0: { ImageDescription: 'opuskit-placeholder' } } }).toFile(file)
  console.log(`made  ${src}  ${W}×${H}`)
  made++
}
console.log(`${made} placeholder(s) written to public/media`)
