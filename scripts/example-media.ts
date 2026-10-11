// Writes src/data/example-media.generated.json: the real photos and films of every built example, offered as samples
// on the recipe page's Your files tab (a site's own pictures to start from until the owner has theirs). Paths are the
// public ones (/examples/{slug} is a symlink to examples/{slug}/public). Left out: section clips and site recordings
// (clip.mp4, clips/), posters (a film's first frame), PNGs (stickers and marks, not photographs), the encodes made from a
// film (only heroVideo.mp4 is offered). Run: npm run examples
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { examples } from '../src/data/examples'

const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f)
  return statSync(p).isDirectory() ? (f === 'clips' ? [] : walk(p)) : [p]
})

const out: Record<string, { photos: string[]; films: { src: string; poster?: string }[] }> = {}
for (const e of examples) {
  const media = `examples/${e.slug}/public/media`
  if (!existsSync(media)) continue
  const files = walk(media).map((p) => relative(`examples/${e.slug}/public`, p)).sort()
  const url = (f: string) => `/examples/${e.slug}/${f}`
  const photos = files.filter((f) => /\.(jpe?g|webp|avif)$/i.test(f) && !/poster|icon|logo|favicon|og-?image/i.test(f)).map(url)
  const films = files.filter((f) => /(^|\/)heroVideo\.mp4$/.test(f)).map((f) => {
    const poster = files.find((x) => x === f.replace(/heroVideo\.mp4$/, 'posterImage.jpg'))
    return { src: url(f), ...(poster ? { poster: url(poster) } : {}) }
  })
  if (photos.length || films.length) out[e.slug] = { photos, films }
}
writeFileSync('src/data/example-media.generated.json', JSON.stringify(out, null, 1) + '\n')
console.log(`✓ samples: ${Object.values(out).reduce((n, x) => n + x.photos.length, 0)} photos, ${Object.values(out).reduce((n, x) => n + x.films.length, 0)} films from ${Object.keys(out).length} sites`)
