// Temporary media generator — Maison Vey
// Produces replaceable placeholder pictures (SVG) in the Oxblood Room palette so every part of the
// site has a same-subject, same-format picture until the owner's own photography arrives.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'media')
mkdirSync(out, { recursive: true })

const BG = '#4A1119', SURFACE = '#5A1A23', SECONDARY = '#6B2530', TEXT = '#F8ECE8',
  MUTED = '#D7B5B0', BORDER = '#6E2A34', ACCENT = '#A9D6FF'

// A glass bottle sitting on a seamless surface, front-lit from the left.
function bottle({ label, hour, w, h, scale = 1, flip = false }) {
  const cx = w / 2
  const bh = h * 0.5 * scale
  const bw = w * 0.26 * scale
  const top = h * 0.30
  const bodyTop = top + h * 0.12 * scale
  const x = flip ? cx + w * 0.06 : cx - w * 0.02
  const capW = bw * 0.42, neckW = bw * 0.30
  const lx = x - bw / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${SECONDARY}"/><stop offset="0.28" stop-color="#7E2E38"/>
      <stop offset="0.62" stop-color="${SECONDARY}"/><stop offset="1" stop-color="#3E0E14"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#B49A93"/><stop offset="0.5" stop-color="${MUTED}"/><stop offset="1" stop-color="#8A6B66"/>
    </linearGradient>
    <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#000" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.42" cy="0.4" r="0.8">
      <stop offset="0" stop-color="#6C2531"/><stop offset="0.55" stop-color="${SURFACE}"/><stop offset="1" stop-color="${BG}"/>
    </radialGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <ellipse cx="${x}" cy="${top + bh + h * 0.10}" rx="${bw * 0.95}" ry="${bw * 0.20}" fill="url(#floor)"/>
  <rect x="${x - capW / 2}" y="${top}" width="${capW}" height="${bodyTop - top - h * 0.045 * scale}" fill="url(#cap)"/>
  <rect x="${x - neckW / 2}" y="${bodyTop - h * 0.02 * scale}" width="${neckW}" height="${h * 0.05 * scale}" fill="url(#glass)"/>
  <path d="M ${lx} ${bodyTop + bh} L ${lx} ${bodyTop + h * 0.09 * scale}
           Q ${lx} ${bodyTop + h * 0.02 * scale} ${x - neckW / 2} ${bodyTop}
           L ${x + neckW / 2} ${bodyTop}
           Q ${x + bw / 2} ${bodyTop + h * 0.02 * scale} ${x + bw / 2} ${bodyTop + h * 0.09 * scale}
           L ${x + bw / 2} ${bodyTop + bh} Z" fill="url(#glass)"/>
  <rect x="${lx + bw * 0.12}" y="${bodyTop + h * 0.12 * scale}" width="${bw * 0.10}" height="${bh * 0.7}" fill="url(#shine)"/>
  <rect x="${x - bw * 0.32}" y="${bodyTop + bh * 0.34}" width="${bw * 0.64}" height="${bh * 0.46}" fill="${BG}" stroke="${BORDER}"/>
  <text x="${x}" y="${bodyTop + bh * 0.46}" fill="${TEXT}" font-family="Georgia, serif" font-size="${bw * 0.16}" text-anchor="middle">MAISON VEY</text>
  <text x="${x}" y="${bodyTop + bh * 0.60}" fill="${TEXT}" font-family="Georgia, serif" font-size="${bw * 0.13}" text-anchor="middle">${label}</text>
  <text x="${x}" y="${bodyTop + bh * 0.72}" fill="${MUTED}" font-family="Helvetica, Arial, sans-serif" font-size="${bw * 0.058}" letter-spacing="${bw * 0.02}" text-anchor="middle">${hour.toUpperCase()}</text>
</svg>`
}
// A quiet abstract field — a place, a light, a texture — for editorial and lifestyle parts.
function field({ w, h, label = '' }) {
  const horizon = h * 0.62
  const bars = Array.from({ length: 6 }, (_, i) => {
    const bw = w * (0.05 + (i % 3) * 0.03)
    const bx = w * (0.08 + i * 0.15)
    return `<rect x="${bx}" y="${h * 0.12}" width="${bw}" height="${horizon - h * 0.12}" fill="${SECONDARY}" opacity="${0.18 + (i % 3) * 0.08}"/>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6C2531"/><stop offset="0.6" stop-color="${SURFACE}"/><stop offset="1" stop-color="${BG}"/>
    </linearGradient>
    <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BG}"/><stop offset="1" stop-color="#380A10"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <circle cx="${w * 0.7}" cy="${h * 0.34}" r="${h * 0.16}" fill="${ACCENT}" opacity="0.10"/>
  ${bars}
  <rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#fl)"/>
  <rect x="0" y="${horizon}" width="${w}" height="1" fill="${BORDER}"/>
  ${label ? `<text x="${w * 0.06}" y="${h * 0.92}" fill="${MUTED}" font-family="Helvetica, Arial, sans-serif" font-size="${h * 0.028}" letter-spacing="${h * 0.006}">${label}</text>` : ''}
</svg>`
}

function portrait({ w, h, label = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SURFACE}"/><stop offset="1" stop-color="${BG}"/></linearGradient>
    <radialGradient id="pl" cx="0.4" cy="0.32" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.14"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#pbg)"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.40}" rx="${w * 0.30}" ry="${h * 0.44}" fill="${SECONDARY}" opacity="0.55"/>
  <rect width="${w}" height="${h}" fill="url(#pl)"/>
  ${label ? `<text x="${w * 0.08}" y="${h * 0.94}" fill="${MUTED}" font-family="Helvetica, Arial, sans-serif" font-size="${h * 0.022}" letter-spacing="${h * 0.004}">${label}</text>` : ''}
</svg>`
}

const scents = [
  { slug: 'quiet-harbour', label: 'Quiet Harbour', hour: '6 a.m.' },
  { slug: 'warm-orchard', label: 'Warm Orchard', hour: '3 p.m.' },
  { slug: 'reading-room', label: 'Reading Room', hour: '11 a.m.' },
  { slug: 'first-rain', label: 'First Rain', hour: '7 p.m.' },
  { slug: 'night-garden', label: 'Night Garden', hour: '9 p.m.' },
]

const files = {}
files['hero-product.svg'] = bottle({ label: 'Quiet Harbour', hour: '6 a.m.', w: 1600, h: 2000, scale: 1.05 })
files['hero-stage.svg'] = field({ w: 2400, h: 1350 })
files['collection.svg'] = field({ w: 1600, h: 2000, label: 'The Hours' })
files['editorial-place.svg'] = field({ w: 2400, h: 1600 })
files['editorial-detail.svg'] = field({ w: 1600, h: 2000 })
files['about-portrait.svg'] = portrait({ w: 1600, h: 2000, label: 'Vera, in the workshop' })

for (const s of scents) {
  files[`${s.slug}.svg`] = bottle({ label: s.label, hour: s.hour, w: 1600, h: 2000 })
  files[`${s.slug}-alt.svg`] = bottle({ label: s.label, hour: s.hour, w: 1600, h: 2000, scale: 1.12, flip: true })
  files[`highlight-${s.slug}.svg`] = bottle({ label: s.label, hour: s.hour, w: 1600, h: 1600, scale: 1.35 })
}

for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg)
console.log(`wrote ${Object.keys(files).length} placeholder pictures to public/media`)