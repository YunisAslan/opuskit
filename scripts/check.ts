// Runnable check: every seed composes into a complete recipe, remix updates dependents,
// and every adapter produces a valid, tool-specific package.  Run: npm run check
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { palettes, typography } from '../src/data/ingredients'
import { contrast, deltaE, oklab } from '../src/lib/color'
import { recipeSeeds } from '../src/data/recipes'
import { imagePresentations } from '../src/data/patterns'
import { resources } from '../src/data/resources'
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

  // Off-shape uploads: a vertical video fills wide screens at 16:9 unless the owner keeps its shape.
  const tallUp = [{ asset: 'video' as const, name: 'tall.mp4', kind: 'video' as const, width: 1080, height: 1920, duration: 8, fileId: 't' }]
  const tall = composeRecipe({ ...specFromSeed(recipeSeeds[1]), lead: 'video', motion: 'immersive', hero: 'scroll-video', assets: ['video'], uploads: tallUp })
  assert.match(tall.media.framing ?? '', /16:9, edge to edge/, 'vertical upload is shown 16:9 on desktop')
  assert.ok(tall.assetRequirements.some((a) => a.label === 'Widescreen version' && a.status === 'create'), 'vertical upload needs a widescreen version')
  assert.ok(tall.assetCreationPaths.some((p) => /widescreen/.test(p.title)), 'vertical upload gets a widescreen creation path')
  const kept = composeRecipe({ ...tall.metadata.spec, videoFrame: 'original' })
  assert.match(kept.media.framing ?? '', /own shape/, 'owner can keep the original shape')
  assert.ok(!kept.assetRequirements.some((a) => a.label === 'Widescreen version'), 'no widescreen version when the shape is kept')
  const wideUp = [{ ...tallUp[0], width: 1920, height: 1080 }]
  assert.equal(composeRecipe({ ...tall.metadata.spec, uploads: wideUp }).media.framing, undefined, '16:9 uploads need no framing rule')

  // Design choices: user picks for menu, shape and special touches reach the recipe and every package.
  const picked = composeRecipe({ ...specFromSeed(recipeSeeds[0]), nav: 'bottom-dock', shape: 'pill', signatures: ['number-ticker', 'timeline-line', 'nope'] })
  assert.equal(picked.chrome.nav.id, 'bottom-dock', 'menu choice is kept')
  assert.match(picked.chrome.navbar.composition, /dock/, 'menu choice drives the navbar composition')
  assert.equal(picked.visualSystem.shape.id, 'pill', 'shape choice is kept')
  assert.deepEqual(picked.metadata.spec.signatures, ['number-ticker', 'timeline-line'], 'unknown signature ids are dropped')
  assert.ok(picked.signatures.every((x) => ['number-ticker', 'timeline-line'].includes(x.id)), 'only picked signatures are used')
  for (const a of Object.values(adapters)) {
    const all = (await a.generate(picked)).files.map((f) => f.content).join('')
    assert.match(all, /Floating dock/, `${a.id} carries the menu style`)
    assert.match(all, /--radius-button: 999px|Pill/, `${a.id} carries the shape`)
  }
  for (const seed of recipeSeeds) assert.ok(composeRecipe(specFromSeed(seed)).chrome.nav && composeRecipe(specFromSeed(seed)).visualSystem.shape, `${seed.slug} gets a menu and shape`)

  // UI kit: controls come from shadcn/ui, chosen by page, themed with the recipe's own hex values.
  const table = composeRecipe({ ...specFromSeed(recipeSeeds.find((x) => x.spec.purpose === 'restaurant')!) })
  const slugs = table.implementation.ui.components.map((c) => c.slug)
  assert.ok(['calendar', 'popover', 'select', 'form'].every((x) => slugs.includes(x)), 'reservations get a real date picker and form')
  assert.match(table.implementation.ui.theme, new RegExp(`--background: ${table.visualSystem.palette.tokens[0].hex}`, 'i'), 'shadcn theme uses the recipe hex values')
  assert.ok(!/var\(--color-/.test(table.implementation.ui.theme), 'shadcn theme never points back at --color-* (no loop)')
  for (const a of Object.values(adapters)) assert.match((await a.generate(table)).files.map((f) => f.content).join(''), /shadcn\/ui/, `${a.id} asks for shadcn/ui controls`)

  // No focus rings in generated sites: the rules forbid them and nothing asks for one.
  const md = recipeToMarkdown(table)
  assert.match(md, /No focus rings/, 'generated rules forbid focus rings')
  assert.ok(!/focus rings use|2px outline, 2px offset/.test(md), 'nothing asks the builder for a focus ring')

  // Copy examples follow the kind of site, not the base recipe it borrowed its look from.
  const shop = composeRecipe({ ...specFromSeed(recipeSeeds[1]), purpose: 'ecommerce', pages: [] })
  assert.ok(!shop.contentDirection.headlineExamples.some((h) => /Selected work|Films for/.test(h)), 'a store never gets portfolio headlines')
  assert.ok(!shop.contentDirection.ctaExamples.includes('View the reel'), 'a store never gets a portfolio CTA')

  // Questions keep earning their place (full report: npx tsx scripts/choice-audit.ts).
  const fams = Object.values(families)
  assert.equal(new Set(fams.map((f) => f.directions[0])).size, fams.length, 'every feeling opens on a different style (distinct preview card)')
  for (let i = 0; i < fams.length; i++) for (let j = i + 1; j < fams.length; j++) {
    const shared = fams[i].directions.filter((d) => fams[j].directions.includes(d)).length
    assert.ok(shared / Math.min(fams[i].directions.length, fams[j].directions.length) < 0.5, `feelings ${fams[i].id}/${fams[j].id} show mostly the same styles`)
  }
  assert.ok(Object.keys(directions).every((d) => fams.some((f) => f.directions.includes(d as never))), 'every style is reachable from some feeling')
  for (const g of Object.keys(goals)) {
    const r = composeRecipe({ ...specFromSeed(recipeSeeds[0]), brief: { goal: g as never } })
    assert.equal(r.contentDirection.ctaExamples[0], goals[g as keyof typeof goals].cta[0], `goal ${g} sets the main button`)
  }

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
  // Video recipes ship scripts/prepare-video.sh (valid bash); others don't.
  const vid = await adapters['claude-code'].generate(composeRecipe(specFromSeed(recipeSeeds[1])))
  const sh = vid.files.find((f) => f.path === 'scripts/prepare-video.sh')
  assert.ok(sh && /-crf 20 -g 6/.test(sh.content), 'video recipe ships prepare-video.sh')
  assert.equal(spawnSync('bash', ['-n'], { input: sh.content }).status, 0, 'prepare-video.sh is valid bash')
  assert.ok(!(await adapters['claude-code'].generate(composeRecipe(specFromSeed(recipeSeeds[3])))).files.some((f) => f.path.endsWith('prepare-video.sh')), 'no script without video')

  // Photos work under any lead: count + shape decide the layout, the user's choice wins, and the files back "Your photos" only.
  const photo = (i: number, w: number, h: number) => ({ asset: 'images' as const, name: `p${i}.jpg`, kind: 'image' as const, width: w, height: h, fileId: `f${i}` })
  const vspec = specFromSeed(recipeSeeds[1])
  const withPhotos = (ps: ReturnType<typeof photo>[], extra = {}) => composeRecipe({ ...vspec, uploads: [...(vspec.uploads ?? []), ...ps], ...extra })
  assert.equal(composeRecipe(vspec).media.imagery, undefined, 'no photo plan without photos')
  assert.equal(withPhotos([photo(1, 3000, 2000)]).media.imagery?.presentation.id, 'single-feature', 'one photo gets room')
  const mixed = withPhotos(Array.from({ length: 8 }, (_, i) => photo(i, i % 2 ? 2000 : 3000, i % 2 ? 3000 : 2000)), { purpose: 'portfolio' })
  assert.equal(mixed.media.imagery?.presentation.id, 'masonry-gallery', '8 mixed-shape photos → gallery wall')
  const yours = mixed.assetRequirements.find((a) => a.label === 'Your photos')
  assert.equal(yours?.providedFiles?.length, 8, 'uploaded photos back "Your photos"')
  assert.ok(!mixed.assetRequirements.some((a) => a.label === 'Poster image' && a.providedFiles), 'photos are not claimed by the video poster')
  const oneVideo = composeRecipe({ ...vspec, assets: ['video'], uploads: [{ asset: 'video', name: 'film.mp4', kind: 'video', fileId: 'v1' }] }).assetRequirements
  assert.equal(oneVideo.find((a) => a.label === 'Secondary video')?.status, 'optional', 'one uploaded video does not mark the optional secondary video as "have"')
  assert.equal(withPhotos([photo(1, 2000, 3000), photo(2, 2000, 3000), photo(3, 2000, 3000), photo(4, 2000, 3000)], { purpose: 'fashion' }).media.imagery?.presentation.id, 'lookbook-spreads', 'portrait fashion → lookbook')
  assert.equal(withPhotos([photo(1, 3000, 2000)], { imagePresentation: 'uniform-grid' }).media.imagery?.presentation.id, 'uniform-grid', 'user choice wins')
  assert.match(recipeToMarkdown(mixed), /### Photos — Gallery wall/, 'photo plan reaches the markdown')
  const asked = composeRecipe({ ...vspec, brief: { photos: 'I want a liquid glass carousel for the menu shots' } })
  assert.equal(asked.media.imagery?.presentation.id, 'liquid-glass', 'the owner’s note alone creates the plan and picks the approach')
  assert.equal(composeRecipe({ ...vspec, brief: { photos: 'Fotolar üçün 3D slayder' } }).media.imagery?.presentation.id, 'ring-3d', 'Azerbaijani note: 3D slider → ring')
  assert.ok(asked.resources.includes('componentry') && /componentry\.dev/.test(recipeToMarkdown(asked)) && /Owner’s request/.test(recipeToMarkdown(asked)), 'component source + note reach the recipe')
  for (const x of Object.values(imagePresentations)) for (const id of x.resources) assert.ok(resources.some((r) => r.id === id), `${x.id}: resource ${id} exists`)

  console.log(`✓ ${recipeSeeds.length} recipes × ${Object.keys(adapters).length} adapters, remix and asset logic OK`)
}

main().catch((e) => { console.error(e); process.exit(1) })
