// Runnable check: every seed composes into a complete recipe, remix updates dependents,
// and every adapter produces a valid, tool-specific package.  Run: npm run check
import assert from 'node:assert/strict'
import { palettes, typography } from '../src/data/ingredients'
import { contrast, deltaE, oklab } from '../src/lib/color'
import { recipeSeeds } from '../src/data/recipes'
import { directions, families, goals } from '../src/data/taxonomy'
import { adapters } from '../src/features/build-packages'
import { LOVABLE_KNOWLEDGE_LIMIT, lovableKnowledge } from '../src/features/build-packages/lovable'
import { recipeToMarkdown } from '../src/features/recipes/markdown'
import { composeRecipe, isValidSpec, remix, specFromSeed, validateRecipe } from '../src/features/recipes/engine'

assert.equal(recipeSeeds.length, 10, 'exactly 10 seed recipes')
assert.equal(new Set(recipeSeeds.map((s) => s.slug)).size, 10, 'unique slugs')
for (const f of Object.values(families)) for (const d of f.directions) assert.ok(directions[d], `family ${f.id} → ${d}`)
for (const d of Object.values(directions)) {
  assert.ok(recipeSeeds.some((s) => s.slug === d.baseRecipe), `direction ${d.id} base recipe exists`)
  assert.ok(d.palettes.includes(d.defaults.palette) && d.typography.includes(d.defaults.typography), `${d.id} defaults are in its lists`)
}

// ─── Distinctiveness: stop the library collapsing back into one look ─────────
const pal = Object.values(palettes)
for (const p of pal) {
  assert.ok(contrast(p.colors.text, p.colors.background) >= 7, `${p.id}: text/bg ≥ 7:1`)
  assert.ok(contrast(p.colors.muted, p.colors.background) >= 4.5, `${p.id}: muted/bg ≥ 4.5:1`)
  assert.ok(contrast(p.colors.accent, p.colors.background) >= 3, `${p.id}: accent/bg ≥ 3:1`)
}
for (let i = 0; i < pal.length; i++) for (let j = i + 1; j < pal.length; j++) {
  const d = deltaE(pal[i].colors.background, pal[j].colors.background)
  assert.ok(d >= 0.06, `grounds too similar: ${pal[i].id} ~ ${pal[j].id} (ΔE_OK ${d.toFixed(3)})`)
}
// The "cream" band: pale, near-neutral, warm-yellow grounds. At most one.
const cream = pal.filter((p) => { const o = oklab(p.colors.background); return o.L > 0.9 && o.C > 0.004 && o.C < 0.03 && o.H > 60 && o.H < 110 })
assert.ok(cream.length <= 1, `more than one cream-band ground: ${cream.map((p) => p.id).join(', ')}`)
// Clay/terracotta accents (hue 25–60, chroma 0.08–0.19) are the other half of the cliché.
const clay = pal.filter((p) => { const o = oklab(p.colors.accent); return o.H > 25 && o.H < 60 && o.C > 0.08 && o.C < 0.19 })
assert.ok(clay.length <= 1, `clay accents in ${clay.map((p) => p.id).join(', ')}`)

const types = Object.values(typography)
const famUse = new Map<string, number>()
for (const t of types) for (const f of new Set([t.display.family, t.heading.family, t.body.family, t.utility.family])) famUse.set(f, (famUse.get(f) ?? 0) + 1)
for (const [f, n] of famUse) assert.ok(n <= 2, `${f} used in ${n} pairings (max 2)`)
for (const f of ['Inter', 'DM Sans', 'Space Grotesk', 'Syne', 'Bricolage Grotesque', 'Fraunces', 'Instrument Serif', 'Geist', 'Playfair Display', 'Poppins', 'Montserrat'])
  assert.ok(!famUse.has(f), `${f} is an AI-default face — keep it out of the library`)
assert.ok(types.filter((t) => /mono/i.test(t.utility.family)).length <= 1, 'monospace utility in more than one pairing')
assert.ok(types.filter((t) => t.utility.uppercase).length <= 1, 'uppercase utility labels in more than one pairing')

// Each palette / pairing is the default for at most two directions; seed recipes never share one.
const count = <T,>(xs: T[]) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<T, number>())
for (const [id, n] of count(Object.values(directions).map((d) => d.defaults.palette))) assert.ok(n <= 2, `palette ${id} is default for ${n} directions`)
for (const [id, n] of count(Object.values(directions).map((d) => d.defaults.typography))) assert.ok(n <= 2, `pairing ${id} is default for ${n} directions`)
assert.equal(new Set(recipeSeeds.map((s) => s.spec.palette)).size, recipeSeeds.length, 'seed recipes share a palette')
assert.equal(new Set(recipeSeeds.map((s) => s.spec.typography)).size, recipeSeeds.length, 'seed recipes share a type pairing')

const main = async () => {
  for (const seed of recipeSeeds) {
    const spec = specFromSeed(seed)
    assert.ok(isValidSpec(spec), `${seed.slug} spec valid`)
    const r = composeRecipe(spec)
    assert.deepEqual(validateRecipe(r), [], `${seed.slug} complete`)
    assert.equal(r.title, seed.title, `${seed.slug} keeps its curated title`)
    for (const a of Object.values(adapters)) {
      const pkg = await a.generate(r)
      assert.equal(pkg.target, a.id)
      assert.ok(pkg.files.length >= 4 && pkg.files.every((f) => f.content.length > 20), `${a.id} files for ${seed.slug}`)
      assert.equal(new Set(pkg.files.map((f) => f.path)).size, pkg.files.length, `${a.id} unique paths`)
    }
    assert.ok(lovableKnowledge(r).length <= LOVABLE_KNOWLEDGE_LIMIT, `${seed.slug} lovable knowledge fits`)
  }

  // Claude Code only ships relevant skills.
  const still = composeRecipe(remix(specFromSeed(recipeSeeds[3]), { motion: 'still' }))
  const cc = await adapters['claude-code'].generate(still)
  assert.ok(!cc.files.some((f) => f.path.includes('motion-system')), 'no motion skill for still recipes')
  for (const f of cc.files.filter((f) => f.path.endsWith('SKILL.md'))) {
    const name = f.path.split('/')[2]
    assert.match(f.content, new RegExp(`^---\\nname: ${name}\\ndescription: .+\\n---`), `${name} frontmatter`)
  }

  // Whole-page scroll video: its own hero, still needs the scrub-ready encode.
  const page = composeRecipe({ ...specFromSeed(recipeSeeds[1]), lead: 'video', motion: 'immersive', hero: 'scroll-video-page' })
  assert.equal(page.media.hero.id, 'scroll-video-page', 'whole-page scroll video is kept')
  assert.ok(page.assetRequirements.some((a) => a.label === 'Scrub-ready encode'), 'whole-page scroll video needs a scrub encode')

  assert.ok(page.media.storytelling?.some((x) => /whole page scroll/.test(x)), 'whole-page film gets scroll storytelling')
  const shopFilm = composeRecipe({ ...specFromSeed(recipeSeeds[1]), purpose: 'ecommerce', lead: 'video', motion: 'immersive', hero: 'scroll-video' })
  assert.ok(shopFilm.media.storytelling?.some((x) => /names the product/.test(x)), 'store films name products at each pause')
  assert.equal(composeRecipe(specFromSeed(recipeSeeds[0])).media.storytelling, undefined, 'no film guidance without a scroll film')
  for (const a of Object.values(adapters)) {
    const pkg = await a.generate(shopFilm)
    const all = pkg.instructions + pkg.files.map((f) => f.content).join('')
    assert.ok(!/stop (after each step|for review)/i.test(all), `${a.id} never asks the agent to stop between steps`)
    assert.match(all, /Scroll storytelling/, `${a.id} carries the scroll storytelling`)
  }

  // Signature moments: every seed gets 2–4, one per section, only on sections it has, at its motion level.
  for (const seed of recipeSeeds) {
    const r = composeRecipe(specFromSeed(seed))
    assert.ok(r.signatures.length >= (r.metadata.spec.motion === 'still' ? 1 : 2) && r.signatures.length <= 4, `${seed.slug}: ${r.signatures.length} signature moments`)
    assert.equal(new Set(r.signatures.map((s) => s.where)).size, r.signatures.length, `${seed.slug}: one signature per section`)
  }
  const store = composeRecipe({ ...specFromSeed(recipeSeeds[4]), purpose: 'ecommerce', pages: [] })
  assert.ok(store.signatures.some((s) => s.id === 'hover-preview-list'), 'stores get the floating-preview product list')
  assert.ok(!shopFilm.signatures.some((s) => s.where.startsWith('Home — Hero')), 'no cursor gimmick on top of a scroll film')
  for (const a of Object.values(adapters)) assert.match((await a.generate(store)).files.map((f) => f.content).join('') + '', /List with a floating preview/, `${a.id} carries signature moments`)

  // Remix: video → photography drops video requirements and the scroll-video hero.
  const cinematic = specFromSeed(recipeSeeds[1])
  const before = composeRecipe(cinematic)
  assert.ok(before.assetRequirements.some((a) => a.asset === 'video' && a.level === 'required'))
  assert.equal(before.media.hero.id, 'scroll-video')
  const after = composeRecipe(remix(cinematic, { lead: 'photography' }))
  assert.ok(!after.assetRequirements.some((a) => a.asset === 'video'), 'video requirement removed')
  assert.notEqual(after.media.hero.id, 'scroll-video')
  assert.ok(!after.motion.patterns.some((p) => p.id === 'video-scrub'), 'video motion removed')
  assert.equal(after.visualSystem.palette.id, before.visualSystem.palette.id, 'palette untouched by media remix')

  // Missing video + image-to-video plan → creation path with a prompt.
  const planned = composeRecipe({ ...cinematic, mediaPlan: 'image-to-video', assets: ['images'] })
  assert.equal(planned.assetRequirements.find((a) => a.key === 'heroVideo')?.status, 'create')
  assert.ok(planned.assetCreationPaths.some((p) => p.prompt), 'image-to-video prompt')

  // Custom palette survives, invalid one is dropped.
  const custom = composeRecipe({ ...cinematic, customPalette: { ...palettes[cinematic.palette].colors, accent: '#FF0000' } })
  assert.equal(custom.visualSystem.palette.tokens.find((t) => t.role === 'accent')?.hex, '#FF0000')
  assert.ok(!isValidSpec({ ...cinematic, palette: 'nope' }))

  // Brief: answers reach the recipe (title, CTA, summary), and junk from storage is dropped.
  const briefed = composeRecipe({ ...specFromSeed(recipeSeeds[0]), brief: { name: '  Oak & Awl  ', offer: 'Leather goods.', goal: 'book' } })
  assert.equal(composeRecipe({ ...specFromSeed(recipeSeeds[0]), brief: { goal: 'nope' as never } }).metadata.spec.brief?.goal, undefined, 'unknown goal is dropped')
  assert.ok(briefed.title.startsWith('Oak & Awl — '), 'brief name leads the title')
  assert.equal(briefed.contentDirection.ctaExamples[0], goals.book.cta[0], 'goal sets the primary CTA')
  assert.match(recipeToMarkdown(briefed), /Oak & Awl: Leather goods\./, 'offer reaches the markdown')
  console.log(`✓ ${recipeSeeds.length} recipes × ${Object.keys(adapters).length} adapters, remix and asset logic OK`)
}

main().catch((e) => { console.error(e); process.exit(1) })
