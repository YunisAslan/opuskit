// Writes src/data/example-specs.generated.json: the exact recipe each example was built from, so "Customise in kit"
// opens what the site really has. Source, best first:
//   1. examples/{slug}/opuskit.json — the spec every Build Package now ships (exact).
//   2. Older examples: their recorded choices (look, colours, lettering, movement, photos) plus what their own
//      recipe/layout.md lists — every page with its sections in order, the first screen, layout, shape and menu.
// Run: npm run examples
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { examples } from '../src/data/examples'
import { layouts, palettes } from '../src/data/ingredients'
import { footerStyles, heroes, navStyles, pageTypes, sections, shapeStyles } from '../src/data/patterns'
import { specFromChoices } from '../src/features/kit/plan'
import { isValidSpec, normalizeSpec } from '../src/features/recipes/engine'
import type { PageSpec, PaletteColors, RecipeSpec, SectionId } from '../src/types/domain'

const find = <T extends { name: string }>(kb: Record<string, T>, name?: string) =>
  name ? Object.keys(kb).find((k) => kb[k].name.toLowerCase() === name.trim().toLowerCase()) : undefined

export function specFromLayout(base: RecipeSpec, md: string): RecipeSpec {
  const blocks = md.split('\n---\n').slice(1).map((b) => ({ label: b.match(/^## (.+)$/m)?.[1]?.trim(), purpose: b.match(/^## .+\n\n(.+)$/m)?.[1]?.trim(), heads: [...b.matchAll(/^### \d+ (.+)$/gm)].map((m) => m[1].trim()) }))
  const pages: PageSpec[] = blocks.filter((b) => b.label && b.label !== 'Site Chrome').map((b, i) => {
    const known = base.pages.find((p) => p.label === b.label)
    const ids = b.heads.map((h) => (h.startsWith('Hero') ? 'hero' : find(sections, h))).filter(Boolean) as SectionId[]
    const type = known?.type ?? 'custom'
    return { id: `p${i + 1}`, type, label: b.label!, purpose: b.purpose ?? known?.purpose ?? pageTypes[type].defaultPurpose, sections: ids }
  })
  return normalizeSpec({
    ...base,
    pages: pages.length ? pages : base.pages,
    hero: (find(heroes, md.match(/^### 01 Hero — (.+)$/m)?.[1]) as RecipeSpec['hero']) ?? base.hero,
    layout: (find(layouts, md.match(/^## Layout System — (.+)$/m)?.[1]) as RecipeSpec['layout']) ?? base.layout,
    shape: (find(shapeStyles, md.match(/^### Shape — (.+)$/m)?.[1]) as RecipeSpec['shape']) ?? base.shape,
    nav: (find(navStyles, md.match(/^### Menu — (.+)$/m)?.[1]) as RecipeSpec['nav']) ?? base.nav,
  })
}

const out: Record<string, RecipeSpec> = {}
for (const e of examples) {
  const root = `examples/${e.slug}`
  const shipped = existsSync(`${root}/opuskit.json`) ? JSON.parse(readFileSync(`${root}/opuskit.json`, 'utf8')).spec : undefined
  const base = specFromChoices(e.choices)
  const spec = isValidSpec(shipped) ? shipped : base && existsSync(`${root}/recipe/layout.md`) ? specFromLayout(base, readFileSync(`${root}/recipe/layout.md`, 'utf8')) : base
  if (!spec) throw new Error(`${e.slug}: no recipe could be recovered — add opuskit.json or fix its choices`)
  // The footer it was built with: a recommended one moves with the engine, the built site does not.
  const layoutMd = existsSync(`${root}/recipe/layout.md`) ? readFileSync(`${root}/recipe/layout.md`, 'utf8') : ''
  spec.footer ??= find(footerStyles, layoutMd.match(/^### \d+ Footer — (.+)$/m)?.[1]) as RecipeSpec['footer']
  // The colours it was built with: a palette tuned later (2026-10-04 colour round) must not repaint a built site.
  const tokens = existsSync(`${root}/src/styles/tokens.css`) ? readFileSync(`${root}/src/styles/tokens.css`, 'utf8') : ''
  const built = Object.fromEntries(Object.keys(palettes[spec.palette].colors).map((k) => [k, tokens.match(new RegExp(`--color-${k}:\\s*(#[0-9A-Fa-f]{6})`))?.[1]?.toUpperCase()]))
  if (!spec.customPalette && Object.values(built).every(Boolean) && Object.entries(built).some(([k, v]) => v !== palettes[spec.palette].colors[k as keyof PaletteColors].toUpperCase()))
    spec.customPalette = built as RecipeSpec['customPalette']
  // Stable ids, no browser-only file handles: the file is committed.
  // (effect placements point at page ids, so they move with the rename).
  const ids = Object.fromEntries(spec.pages.map((p, i) => [p.id, `p${i + 1}`]))
  out[e.slug] = { ...spec, pages: spec.pages.map((p) => ({ ...p, id: ids[p.id] })), piecePlacements: spec.piecePlacements?.map((x) => ({ ...x, page: x.page === '*' ? '*' : ids[x.page] ?? x.page })), uploads: spec.uploads?.map(({ fileId: _, ...u }) => u) }
  console.log(`✓ ${e.slug} — ${shipped ? 'opuskit.json' : 'choices + recipe/layout.md'} · ${spec.pages.length} pages · hero ${spec.hero ?? '—'} · menu ${spec.nav ?? '—'} · shape ${spec.shape ?? '—'}`)
}
writeFileSync('src/data/example-specs.generated.json', JSON.stringify(out, null, 1) + '\n')
