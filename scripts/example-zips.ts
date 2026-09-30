// Builds public/downloads/{slug}.zip for every example: the site's real code, as-is, with placeholder media.
// Photos become flat placeholders of the same size and format (so layouts hold); videos are left out and listed
// in MEDIA.md with what to put back. No third-party media is redistributed. Run: npm run examples
import { spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { zipSync } from 'fflate'
import sharp from 'sharp'
import { examples } from '../src/data/examples'

const SKIP = new Set(['node_modules', '.next', 'out', 'media-src', '.git', '.DS_Store', 'tsconfig.tsbuildinfo', 'next-env.d.ts'])
const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const VIDEO = new Set(['.mp4', '.webm', '.mov', '.m4v'])

// Secrets never ship: env files, keys, deploy links.
const secret = (n: string) => n.startsWith('.env') || n.endsWith('.pem') || n === '.vercel' || n === 'settings.local.json'

const walk = (dir: string): string[] => readdirSync(dir).filter((n) => !SKIP.has(n) && !secret(n)).flatMap((n) => {
  const p = join(dir, n)
  return statSync(p).isDirectory() ? walk(p) : [p]
})

const probe = (file: string) => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0:s=x', file], { encoding: 'utf8' })
  if (r.status !== 0) return ''
  const [size, duration] = r.stdout.trim().split('\n')
  return `${size} px, ${Math.round(Number(duration))} s`
}

async function main() {
  mkdirSync('public/downloads', { recursive: true })
  for (const e of examples) {
    const root = join('examples', e.slug)
    const files: Record<string, Uint8Array> = {}
    const media: string[] = []
    for (const file of walk(root)) {
      const rel = relative(root, file), ext = extname(file).toLowerCase()
      const inPublic = rel.startsWith('public/')
      if (inPublic && VIDEO.has(ext)) { media.push(`| \`${rel}\` | video | ${probe(file)} | left out |`); continue }
      if (inPublic && IMAGE.has(ext)) {
        const { width = 1600, height = 1000 } = await sharp(file).metadata()
        const fmt = ext === '.jpg' ? 'jpeg' : (ext.slice(1) as 'png' | 'webp' | 'avif' | 'jpeg')
        files[`${e.slug}/${rel}`] = await sharp({ create: { width, height, channels: 3, background: '#d8d4cc' } }).toFormat(fmt).toBuffer()
        media.push(`| \`${rel}\` | photo | ${width}×${height} px | placeholder |`)
        continue
      }
      files[`${e.slug}/${rel}`] = readFileSync(file)
    }
    files[`${e.slug}/MEDIA.md`] = new TextEncoder().encode([
      `# Media for ${e.title}`, '',
      'This copy has the site\'s real code. Its photos and videos are not included — they belong to the original site.',
      'Every photo is a flat placeholder of the same size, so the layout holds. Videos are left out; the page shows its poster until you add one.',
      'Put your own files at the same paths (same size or aspect ratio) and the site uses them.', '',
      '| File | Kind | Size | In this copy |', '|---|---|---|---|', ...media, '',
      'Run it: `npm install && npm run dev`.', '',
    ].join('\n'))
    const zip = zipSync(files, { level: 9 })
    writeFileSync(`public/downloads/${e.slug}.zip`, zip)
    console.log(`✓ ${e.slug}.zip — ${Object.keys(files).length} files, ${(zip.length / 1024).toFixed(0)} KB, ${media.length} media placeholders`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
