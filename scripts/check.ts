// Runnable check: every seed composes into a complete recipe, remix updates dependents,
// and every adapter produces a valid, tool-specific package.  Run: npm run check
import assert from 'node:assert/strict'
import type { RecipeSpec, SectionId } from '../src/types/domain'
import { spawnSync } from 'node:child_process'
import { palettes, typography } from '../src/data/ingredients'
import { contrast, deltaE, oklab } from '../src/lib/color'
import { recipeSeeds } from '../src/data/recipes'
import { concepts, imagePresentations, signaturePatterns } from '../src/data/patterns'
import { behaviours, isMoment, pieces } from '../src/data/pieces'
import { blockSource, pieceSource } from '../src/data/pieces-source.generated'
import { blockFor } from '../src/data/blocks'
import { sections } from '../src/data/patterns'
import { TYPE_UTILITIES } from '../src/lib/type-tokens'
import { GENERATED, piecesSource } from './pieces-source'
import { existsSync, readFileSync } from 'node:fs'
import { heroTitle, libraryFor, removeSection, toggleChrome, behaviourPick, isPhotoSection, sectionPhotos, setBehaviour, setSectionPhotos, EMPTY_PLAN, addPage, addSection, toggleSitePiece, cleanPlan, hasBlock, inferPurpose, moveSection, piecesFor, placeSection, addSuggested, isStandardPage, missingPages, pageSuggestions, planToSpec, sectionGroups, specFromChoices, specToPlan, swapOptions, replaceSection, resetPage, setPagePurpose, usualPages, effectOn, effectWhere, starters, setHero, setStyle, start, togglePiece } from '../src/features/kit/plan'
import { resources } from '../src/data/resources'
import { directions, families, goals } from '../src/data/taxonomy'
import { adapters } from '../src/features/build-packages'
import { visualQa } from '../src/features/build-packages/shared'
import { pageTypes } from '../src/data/patterns'
import { examples } from '../src/data/examples'
import { sectionGuide } from '../src/data/section-guide'
import exampleSpecs from '../src/data/example-specs.generated.json'
import { closestChrome, closestSection, closestSite } from '../src/features/kit/closest'
import { LOVABLE_KNOWLEDGE_LIMIT, lovableKnowledge } from '../src/features/build-packages/lovable'
import { recipeToMarkdown } from '../src/features/recipes/markdown'
import { cleanPieces, pieceIssues, composeRecipe, isValidSpec, remix, specFromSeed, validateRecipe } from '../src/features/recipes/engine'

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
  assert.ok(picked.signatures.every((x) => ['number-ticker', 'timeline-line', ...(picked.concept ? concepts[picked.concept.id].signatures : [])].includes(x.id)), 'only picked signatures (and the big idea’s own) are used')
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
  // bash reads the bytes of "…"/"×" as part of an unbraced name ($DIR… → "unbound variable"): always ${DIR}…
  assert.ok(!/\$[A-Za-z_][A-Za-z0-9_]*[^\x00-\x7F]/.test(sh.content), 'prepare-video.sh braces every $VAR next to non-ASCII')
  assert.match(sh.content, /realesrgan-ncnn-vulkan-20220424-\$os\.zip/, 'prepare-video.sh fetches Real-ESRGAN itself')
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

  // Kit: pieces ship as the exact code OpusKit type-checks, MIT only, one per slot, with notices.
  assert.equal(readFileSync(GENERATED, 'utf8'), piecesSource(), 'pieces-source.generated.ts is up to date (run npm run pieces)')
  for (const p of Object.values(pieces)) {
    const src = readFileSync(new URL(`../src/pieces/${p.file}`, import.meta.url), 'utf8')
    assert.match(src, new RegExp(p.source.license), `${p.id}: source file carries its ${p.source.license} attribution`)
    assert.match(src, new RegExp(`export function ${p.exportName}\\b`), `${p.id}: exports ${p.exportName}`)
    // Lenis (MIT) only in a piece that lists it as a dependency, so its package says to install it.
    const own = p.deps.includes('lenis') ? '|lenis' : ''
    assert.ok(!new RegExp(`@/lib/utils|from ['"](?!react|motion/react|@paper-design/shaders-react|next/navigation${own})[^'"]+['"]`).test(src), `${p.id}: no imports beyond react, motion, Paper Shaders, next/navigation (and Lenis, when listed)`)
    assert.ok(/reactbits|aceternity|hover\.dev/.test(p.source.url) === false, `${p.id}: never from a library that forbids redistribution`)
  }
  assert.deepEqual(cleanPieces(['text-effect', 'text-loop', 'marquee', 'nope']), ['text-loop', 'marquee'], 'one piece per slot, later pick wins, unknown dropped')
  const kitted = composeRecipe({ ...vspec, pieces: ['text-effect', 'number-ticker', 'ring-carousel', 'image-field' as never] })
  assert.equal(kitted.pieces.length, 3, 'photo slot keeps one piece')
  const kitPkg = await adapters['claude-code'].generate(kitted)
  for (const p of kitted.pieces) assert.ok(kitPkg.files.some((f) => f.path === p.path && f.content === pieceSource[p.id]), `${p.id}: shipped verbatim`)
  assert.ok(kitPkg.files.some((f) => f.path === 'THIRD-PARTY-NOTICES.md' && /Motion Primitives[\s\S]*Permission is hereby granted/.test(f.content)), 'MIT notices ship with the kit')
  assert.match(kitPkg.files.find((f) => f.path === 'recipe/motion.md')!.content, /## Your Kit/, 'kit reaches recipe/motion.md')
  assert.ok(kitted.implementation.dependencies.some((x) => x.name === 'motion'), 'kit adds the motion dependency')
  assert.ok(pieceIssues({ motion: 'still', pieces: ['text-effect'] })['text-effect'], 'a moving piece on a still site is flagged')
  assert.equal(composeRecipe({ ...vspec, imagePresentation: 'marquee-rows', uploads: [photo(1, 3000, 2000), photo(2, 3000, 2000), photo(3, 3000, 2000)] }).pieces[0]?.id, 'marquee', 'photo layout brings its piece')
  for (const x of [...Object.values(imagePresentations).flatMap((i) => i.components), ...signaturePatterns.flatMap((s) => s.components ?? [])]) assert.ok(!/reactbits|aceternity|hover\.dev/.test(x.url), `no link to a redistribution-restricted library: ${x.url}`)

  // Ready sections: every content section has a component, shipped verbatim for the sections a recipe uses.
  for (const sid of Object.keys(sections) as (keyof typeof sections)[]) {
    if (sid === 'navbar' || sid === 'hero') continue
    const b = blockFor(sid)
    assert.ok(b, `${sid}: has ready section code`)
    const src = readFileSync(new URL(`../src/sections/${b!.file}`, import.meta.url), 'utf8')
    assert.match(src, new RegExp(`export function ${b!.exportName}\\b`), `${sid}: exports ${b!.exportName}`)
    assert.ok(!/from ['"](?!react|motion\/react)[^'"]+['"]/.test(src), `${sid}: section imports nothing but react and motion`)
    assert.ok(!/#[0-9a-fA-F]{3,6}\b/.test(src), `${sid}: no raw hex — tokens only`)
  }
  const secPkg = await adapters.cursor.generate(composeRecipe(specFromSeed(recipeSeeds[0])))
  const used = [...new Set(composeRecipe(specFromSeed(recipeSeeds[0])).pages.flatMap((p) => p.sections).filter((s) => s.code).map((s) => s.id))]
  assert.ok(used.length > 0 && used.every((id) => secPkg.files.some((f) => f.path === `src/components/sections/${blockFor(id)!.file}` && f.content === blockSource[id])), 'used sections ship their code')
  assert.match(recipeToMarkdown(composeRecipe(specFromSeed(recipeSeeds[0]))), /Ready code:\*\* `src\/components\/sections\//, 'ready code reaches the recipe')
  const tokens = secPkg.files.find((f) => f.path.endsWith('tokens.css'))!.content
  assert.ok(tokens.includes(TYPE_UTILITIES) && readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8').includes(TYPE_UTILITIES), 'type utilities identical in packages and OpusKit previews')

  // Showcase plan: style for every page, then page by page with pieces attached to exact sections.
  let plan = start(EMPTY_PLAN, 'event')
  plan = setStyle(plan, 'direction', 'swiss-editorial')
  plan = setHero(plan, 'scroll-video')
  const home = plan.pages[0], second = plan.pages[1]
  plan = addSection(plan, second.id, 'gallery', 0)
  const heroKey = plan.pages[0].sections[0].key
  plan = togglePiece(plan, home.id, heroKey, 'shader-grain')
  plan = togglePiece(plan, home.id, heroKey, 'text-effect')
  plan = togglePiece(plan, home.id, heroKey, 'cut-reveal') // same job as text-effect on the same section → replaces it
  plan = addPage(plan, 'faq').plan
  const gKey = plan.pages[1].sections[0].key
  plan = moveSection(plan, second.id, gKey, 1)
  const fromPlan = composeRecipe(planToSpec(plan))
  assert.equal(fromPlan.metadata.spec.purpose, 'event', 'starter sets the kind of site')
  assert.equal(fromPlan.metadata.spec.direction, 'swiss-editorial', 'look sets the direction')
  assert.equal(fromPlan.media.hero.id, 'scroll-video', 'chosen first screen is kept')
  assert.equal(fromPlan.pages[0].sections[0].id, 'hero', 'the first screen tops the first page')
  assert.equal(fromPlan.pages[1].sections[1]?.id, 'gallery', 'a section lands where it was inserted, and moves')
  assert.ok(fromPlan.pages.some((p) => p.type === 'faq'), 'added pages are in the recipe')
  assert.deepEqual(fromPlan.pieces.map((p) => p.id).sort(), ['cut-reveal', 'shader-grain'], 'one piece per job per section')
  assert.ok(fromPlan.pieces.every((p) => p.where.startsWith(`${home.label} → Hero`)), 'pieces are placed on the section they were attached to')
  // Touches come only from what the kit shows: the big idea (Design → Big idea, recommended until changed) — never extras.
  assert.ok(fromPlan.concept && fromPlan.signatures.every((x) => concepts[fromPlan.concept!.id].signatures.includes(x.id)), 'a kit recipe gets only its big idea’s touches')
  assert.equal(composeRecipe(planToSpec(setStyle(plan, 'concept', 'off'))).signatures.length, 0, 'no big idea, no touches')
  assert.equal(composeRecipe(planToSpec(setStyle(plan, 'concept', 'live-console'))).concept?.id, 'live-console', 'a picked big idea is kept')
  assert.equal(specToPlan(composeRecipe(planToSpec(setStyle(plan, 'concept', 'off'))).metadata.spec).concept, 'off', 'Customise keeps the big idea')
  assert.equal(composeRecipe({ ...planToSpec(setStyle(plan, 'concept', 'playful-way-in')), motion: 'subtle' }).concept?.id !== 'playful-way-in', true, 'a big idea that needs more movement falls back to the recommendation')
  // Recipes follow the owner's picks: no GSAP guidance anywhere (licence), and seed rules name colour roles, not hues.
  for (const a of Object.values(adapters)) {
    const all = (await a.generate(shopFilm)).files.map((f) => f.content).join('').replace(/No GSAP[^.]*\./g, '')
    assert.ok(!/gsap|scrolltrigger/i.test(all), `${a.id}: no GSAP guidance`)
  }
  for (const seed of recipeSeeds) for (const line of [...seed.do, ...seed.principles, ...Object.values(seed.sectionNotes)] as string[]) assert.ok(!/\b(blue|pink|red|violet|rose|leaf green|powder)\b/i.test(line), `${seed.slug}: a rule names a hue of its own palette — use a colour role: ${line}`)
  // Award vibe (docs/plan-vibe.md C): every seed has a big idea that its pages can carry, and the package says how.
  for (const seed of recipeSeeds) { const r = composeRecipe(specFromSeed(seed)); assert.ok(r.concept && r.signatures.some((x) => concepts[r.concept!.id].signatures.includes(x.id)), `${seed.slug}: has a big idea with a moment on its pages`) }
  {
    const r = composeRecipe(planToSpec(toggleSitePiece(toggleSitePiece(setStyle(plan, 'concept', 'giant-chapters'), 'smooth-scroll'), 'ambient-sound'))) // shader-grain is on its first screen
    const files = (await adapters['claude-code'].generate(r)).files, file = (path: string) => files.find((f) => f.path === path)!.content
    assert.match(file('recipe/design.md'), /## The Big Idea — Chapters in giant words[\s\S]*## Award checklist/, 'design.md carries the big idea and the award checklist')
    assert.match(file('CLAUDE.md'), /The big idea — Chapters in giant words/, 'CLAUDE.md names the big idea')
    assert.match(file('recipe/media.md'), /## WebGL checklist/, 'a shader piece brings the WebGL checklist')
    assert.ok(!/## WebGL checklist/.test(recipeToMarkdown(composeRecipe(specFromSeed(recipeSeeds[0])))), 'no WebGL checklist without WebGL')
    assert.ok(r.implementation.dependencies.some((d) => d.name === 'lenis'), 'smooth scroll brings lenis')
    assert.ok(r.assetRequirements.some((a) => a.asset === 'audio' && a.level === 'required'), 'sound needs its audio file')
    assert.ok(visualQa(r).some((l) => l.startsWith('Big idea')), 'QA checks the big idea')
  }
  assert.equal(behaviourPick(setBehaviour(setBehaviour(plan, 'transitions', 'blob-transition'), 'transitions', 'curtain-transition'), 'transitions'), 'curtain-transition', 'one page transition at a time')
  assert.ok(piecesFor(plan.pages[0].sections[0]).every((id) => pieces[id].sections.includes('hero')), 'only pieces made for a section are offered on it')
  assert.equal(inferPurpose({ ...EMPTY_PLAN, pages: [addPage(EMPTY_PLAN, 'shop').plan.pages[0]] }), 'ecommerce', 'purpose inferred from pages')
  assert.equal(setStyle(setStyle(plan, 'palette', 'signal-white'), 'direction', 'japanese-minimal').palette, 'signal-white', 'a new look keeps the colours you picked')
  assert.equal(setStyle(setStyle(plan, 'palette', undefined), 'direction', 'japanese-minimal').palette, undefined, 'colours you never picked follow the new look')
  // Drag and drop: every part lands where it is dropped — the film/image part too, which can sit mid-page.
  const hp = plan.pages[0], last = hp.sections.at(-1)!
  const dropped = placeSection(plan, hp.id, last.key, 0).pages[0].sections
  assert.equal(dropped[0].key, last.key, 'a dragged section lands at the drop spot, even above the first screen')
  const mid = placeSection(plan, hp.id, heroKey, 3)
  assert.equal(mid.pages[0].sections[2].key, heroKey, 'the film/image part moves mid-page')
  assert.equal(moveSection(plan, hp.id, hp.sections[1].key, -1).pages[0].sections[0].key, hp.sections[1].key, 'a part can move above it')
  assert.equal(setHero(mid, 'kinetic-type').pages[0].sections.filter((x) => x.id === 'hero').length, 1, 'picking what it shows never adds a second one')
  {
    const r = composeRecipe(planToSpec(mid)), hs = r.pages[0].sections[2]
    assert.equal(hs.id, 'hero'); assert.equal(r.pages[0].sections[0].id, mid.pages[0].sections[0].id, 'the recipe keeps the page order')
    assert.ok(hs.name.endsWith('mid-page') && hs.composition.startsWith('Placed mid-page'), 'a mid-page hero is described as a band at its spot, not a first screen')
    assert.deepEqual(validateRecipe(r), [], 'a mid-page hero is a complete recipe')
    assert.ok(visualQa(r).some((l) => l.includes('sits mid-page')), 'QA checks it stays mid-page')
    assert.equal(effectWhere(mid, 'shader-grain'), `${hp.label} · Film or image`, 'its moments say where it sits')
    // Menu & footer: a footer style flows to the recipe and its ready code; a page can leave either out.
    const hid = toggleChrome(setStyle(plan, 'footer', 'wordmark'), hp.id, 'footer')
    const rh = composeRecipe(planToSpec(hid))
    assert.equal(rh.chrome.footerStyle.id, 'wordmark', 'the chosen footer is the recipe footer')
    assert.ok(rh.chrome.footer.code?.usage.includes('variant="wordmark"'), 'its ready code gets the matching variant')
    assert.deepEqual(rh.pages[0].hide, ['footer'], 'a page can leave the footer out')
    assert.ok(visualQa(rh).some((l) => l.includes(`${hp.label} — no footer`)), 'QA names the page without a footer')
    assert.equal(cleanPlan(JSON.parse(JSON.stringify(hid))).pages[0].hide?.[0], 'footer', 'it survives storage')
    assert.equal(specToPlan(planToSpec(hid)).footer, 'wordmark', 'and Customise')
    assert.equal(toggleChrome(hid, hp.id, 'footer').pages[0].hide, undefined, 'toggling again brings it back')
    // "Add to page" follows the page: a FAQ page leads with questions, Home with the film/image part.
    assert.equal(libraryFor('faq')[0].ids[0], 'faq', 'a FAQ page lists the FAQ first')
    assert.equal(libraryFor('home')[0].ids[0], 'hero', 'Home lists the film or image first')
    assert.equal(libraryFor('menu')[0].ids[0], 'menu', 'a menu page lists the menu first')
    assert.equal(libraryFor('privacy-policy').flatMap((g) => g.ids).length, 1 + sectionGroups.flatMap((g) => g.ids).length, 'every part stays listed')
    const noHero = removeSection(plan, hp.id, heroKey)
    assert.deepEqual(validateRecipe(composeRecipe(planToSpec(noHero))), [], 'a site without the part is still complete')
  }
  const down = placeSection(plan, hp.id, hp.sections[1].key, hp.sections.length).pages[0].sections
  assert.equal(down.at(-1)!.key, hp.sections[1].key, 'dropping at the end moves a section to the bottom')
  // Guided pages: no page starts blank by accident; suggestions land where they read right; missing pages are offered.
  for (const t of Object.keys(pageTypes) as (keyof typeof pageTypes)[]) {
    if (isStandardPage(t)) continue
    assert.ok(addPage(EMPTY_PLAN, t).plan.pages[0].sections.length > 0, `a new ${t} page starts with sections`)
    assert.ok((pageSuggestions[t] ?? []).every((id) => id in sections), `${t} suggestions are real sections`)
  }
  let g = start(EMPTY_PLAN, 'agency')
  const contact = g.pages.find((p) => p.sections.some((x) => x.id === 'contact-cta')) ?? g.pages[0]
  g = addSuggested(g, contact.id, 'clients')
  const secs = g.pages.find((p) => p.id === contact.id)!.sections.map((x) => x.id)
  if (secs.includes('contact-cta')) assert.ok(secs.indexOf('clients') < secs.indexOf('contact-cta'), 'a suggested section goes before the closing contact section')
  assert.ok(missingPages(start(EMPTY_PLAN, 'agency')).every((m) => !m.recommended), 'a starter already has every recommended page')
  assert.ok(missingPages({ ...EMPTY_PLAN, purpose: 'agency', pages: [addPage(EMPTY_PLAN, 'home').plan.pages[0]] }).some((m) => m.recommended), 'missing recommended pages are offered')

  // Customise: any recipe opens in the kit and comes back out as the same recipe (the kit is the one editor).
  for (const seed of recipeSeeds) {
    const spec = { ...specFromSeed(seed), brief: { name: 'Test', offer: 'A test', goal: 'contact' as const, photos: 'keep them warm' } }
    const back = planToSpec(specToPlan(spec, 'gen1'))
    for (const k of ['direction', 'palette', 'typography', 'lead', 'motion', 'layout', 'purpose'] as const) assert.deepEqual(back[k], spec[k], `${seed.slug}: ${k} survives Customise`)
    assert.deepEqual(back.characters, spec.characters, `${seed.slug}: voice survives Customise`)
    assert.deepEqual(back.brief, spec.brief, `${seed.slug}: brief survives Customise`)
    assert.deepEqual(back.pages.map((p) => p.sections), spec.pages.map((p) => p.sections), `${seed.slug}: pages survive Customise`)
    assert.equal(cleanPlan(JSON.parse(JSON.stringify(specToPlan(spec, 'gen1')))).fromId, 'gen1', 'the source id survives storage')
  }
  // Pages arrive with their kind's real anatomy (docs/research/2026-10-home-anatomy.md): never empty, short where real
  // sites are short (portfolio, experiment), and 6+ parts where real sites are long.
  const LONG = new Set(['saas', 'product', 'ecommerce', 'clinic', 'nonprofit', 'course'])
  for (const st of starters) {
    const parts = start(EMPTY_PLAN, st.id).pages[0].sections.filter((x) => x.id !== 'hero').length
    assert.ok(parts >= 1, `${st.id}: Home arrives filled`)
    if (LONG.has(st.id)) assert.ok(parts >= 6, `${st.id}: a long kind's Home starts with 6+ parts`)
  }

  // Swap, don't build: every section on every starter page has something to swap to. Moments sit on one section and
  // stay there; behaviours are site-wide.
  for (const st of [...starters.map((x) => start(EMPTY_PLAN, x.id)), start(EMPTY_PLAN, null)]) {
    for (const pg of st.pages) {
      assert.ok(pg.sections.length || isStandardPage(pg.type), `${st.purpose ?? 'blank'}: ${pg.label} arrives filled`)
      for (const sec of pg.sections) if (sec.id !== 'hero') { const o = swapOptions(pg, sec.id); assert.ok(o.job.length + o.page.length > 0, `${pg.label}: ${sec.id} can be swapped`) }
    }
    for (const pg of st.pages) for (const sec of pg.sections) for (const id of piecesFor(sec)) {
      assert.ok(isMoment(id), `${id}: only moments are offered on a section`)
      const on = togglePiece(st, pg.id, sec.key, id)
      assert.equal(effectWhere(on, id), `${pg.label} · ${sec.id === 'hero' ? heroTitle(pg, sec) : sections[sec.id].name}`, `${id}: sits exactly where it was put`)
      assert.ok(composeRecipe(planToSpec(on)).pieces.some((p) => p.id === id && p.where.startsWith(pg.label)), `${id} reaches the recipe on ${pg.label}`)
    }
    const pg = st.pages.find((p) => p.sections.some((x) => x.id !== 'hero' && piecesFor(x).length))
    if (pg) {
      const sec = pg.sections.find((x) => x.id !== 'hero' && piecesFor(x).length)!
      const o = swapOptions(pg, sec.id), other = [...o.job, ...o.page][0]
      const swapped = replaceSection(st, pg.id, sec.key, other)
      const at = swapped.pages.find((p) => p.id === pg.id)!.sections.findIndex((x) => x.key === sec.key)
      assert.equal(swapped.pages.find((p) => p.id === pg.id)!.sections[at].id, other, 'swap replaces in place')
      assert.equal(at, pg.sections.indexOf(sec), 'swap keeps the position')
      const fx = piecesFor(sec)[0]
      const withFx = togglePiece(st, pg.id, sec.key, fx)
      assert.equal(resetPage(setPagePurpose(st, pg.id, 'custom'), pg.id).pages.find((p) => p.id === pg.id)!.purpose, pageTypes[pg.type].defaultPurpose, 'reset page restores its brief')
      const count = (x: typeof st) => x.pages.reduce((n, p) => n + p.sections.length, 0)
      assert.equal(count(replaceSection(withFx, pg.id, sec.key, other)), count(withFx), 'a swap never adds sections')
      const after = replaceSection(withFx, pg.id, sec.key, other)
      assert.equal(effectOn(after, fx), pieces[fx].sections.includes(other), `${fx}: stays when the new look can carry it, else off`)
      assert.ok(after.pages.flatMap((p) => p.sections).every((x) => x.key === sec.key || !x.pieces.includes(fx)), `${fx}: never wanders to another section`)
      assert.ok(!effectOn(resetPage(withFx, pg.id), fx), 'reset page takes its moments with the old sections')
    }
  }

  // Behaviour: one per kind, on every page; the whole-site extras toggle.
  {
    let b = start(EMPTY_PLAN, 'agency')
    b = setBehaviour(b, 'headlines', 'text-effect'); b = setBehaviour(b, 'headlines', 'cut-reveal'); b = setBehaviour(b, 'links', 'scribble-link')
    assert.equal(behaviourPick(b, 'headlines'), 'cut-reveal', 'a new headline behaviour replaces the old one')
    const r = composeRecipe(planToSpec(b))
    assert.ok(r.pieces.some((p) => p.id === 'cut-reveal' && p.where.startsWith('Every page')), 'behaviours apply to every page')
    assert.ok(!r.pieces.some((p) => p.id === 'text-effect'), 'the replaced behaviour is gone')
    assert.equal(behaviourPick(setBehaviour(b, 'headlines', undefined), 'headlines'), undefined, 'a behaviour can be set to none')
    for (const k of Object.keys(behaviours) as (keyof typeof behaviours)[]) for (const id of behaviours[k].ids) assert.ok(!piecesFor({ key: 'x', id: 'hero', pieces: [] }).includes(id) && !isMoment(id), `${id}: a behaviour, never a moment`)
    // Older plans: behaviours found on sections move to the site; moments stay put.
    const old = cleanPlan({ pages: [{ id: 'h', type: 'home', label: 'Home', purpose: '', sections: [{ key: 'a', id: 'hero', pieces: ['text-effect', 'shader-grain'] }] }] })
    assert.deepEqual(old.sitePieces, ['text-effect'], 'a behaviour on a section becomes site-wide')
    assert.deepEqual(old.pages[0].sections[0].pieces, ['shader-grain'], 'moments stay on their section')
  }

  // Photo layout, per photo section: each chooses its own; others get the recommendation; older site-wide picks spread.
  {
    let ph = start(EMPTY_PLAN, 'portfolio')
    ph = addSection(ph, ph.pages[0].id, 'gallery', 1)
    ph = addSection(ph, ph.pages[0].id, 'product-grid', 2)
    const home = ph.pages[0], gal = home.sections.find((x) => x.id === 'gallery')!, grid = home.sections.find((x) => x.id === 'product-grid')!
    ph = setSectionPhotos(ph, home.id, gal.key, 'ring-3d')
    const r = composeRecipe(planToSpec(ph))
    const secs = r.pages[0].sections
    assert.equal(secs.find((x) => x.id === 'gallery')?.photos?.id, 'ring-3d', 'a section keeps its own photo layout')
    assert.equal(secs.find((x) => x.id === 'product-grid')?.photos?.id, 'uniform-grid', 'another section gets its own recommendation')
    assert.ok(!secs.find((x) => x.id === 'faq')?.photos, 'sections without photo sets have no photo layout')
    assert.ok(r.pieces.some((p) => p.id === 'ring-carousel' && p.where.includes('Gallery')), 'a photo layout brings its ready code onto that section')
    assert.ok(sectionPhotos(ph, grid).recommended === 'uniform-grid' && !sectionPhotos(ph, grid).chosen, 'recommendation shows until the owner picks')
    assert.equal(specToPlan(planToSpec(ph)).pages[0].sections.find((x) => x.id === 'gallery')?.photos, 'ring-3d', 'section photo layouts survive Customise')
    const legacy = cleanPlan({ imagePresentation: 'masonry-gallery', pages: [{ id: 'h', type: 'home', label: 'Home', purpose: '', sections: ['gallery', 'faq'] }] })
    assert.equal(legacy.pages[0].sections[0].photos, 'masonry-gallery', 'an older site-wide photo layout moves onto its photo sections')
    assert.equal(legacy.pages[0].sections[1].photos, undefined, 'and only onto photo sections')
  }

  // Changing the kind of site later: the usual pages arrive, style / brief / first screen / behaviours stay.
  {
    let a0 = setBehaviour(setHero(setStyle({ ...start(EMPTY_PLAN, 'portfolio'), name: 'Keep me' }, 'palette', 'signal-white'), 'kinetic-type'), 'links', 'wavy-link')
    const b0 = usualPages(a0, 'restaurant')
    assert.ok(b0.pages.some((p) => p.type === 'menu'), 'the new kind brings its usual pages')
    assert.equal(b0.name, 'Keep me'); assert.equal(b0.palette, 'signal-white'); assert.equal(b0.hero, 'kinetic-type')
    assert.equal(b0.pages[0].sections[0].id, 'hero', 'the first screen keeps its place')
    assert.equal(behaviourPick(b0, 'links'), 'wavy-link', 'behaviours stay with the site')
    a0 = b0
  }

  // What the questionnaire used to ask, the kit now asks — and it reaches the recipe.
  {
    const p = { ...start(EMPTY_PLAN, 'restaurant'), goal: 'book' as const, motion: 'still' as const, photoNote: 'warm light only' }
    const spec = planToSpec(p)
    assert.equal(spec.brief?.goal, 'book', 'kit goal reaches the brief')
    assert.equal(spec.brief?.photos, 'warm light only', 'kit photo note reaches the brief')
    assert.equal(spec.motion, 'still', 'kit movement wins over the look default')
    assert.equal(planToSpec(setStyle(p, 'motion', undefined)).motion, directions[spec.direction].defaults.motion, 'clearing movement returns to the look default')
    assert.equal(cleanPlan({ ...p, goal: 'nope', motion: 'wild' }).goal, undefined, 'unknown goal is dropped')
  }
  // Examples and the generator agree: each example's recipe, composed today, has the pages, sections, first screen,
  // menu and shape its own recipe/layout.md lists — so what the kit shows for it is what the site has.
  for (const e of examples) {
    const spec = (exampleSpecs as Record<string, RecipeSpec>)[e.slug]
    assert.ok(spec && isValidSpec(spec), `${e.slug}: has a generated spec (run npm run examples)`)
    const path = `examples/${e.slug}/recipe/layout.md`
    if (!existsSync(path)) continue
    const md = readFileSync(path, 'utf8'), r = composeRecipe(spec)
    for (const p of r.pages) {
      const block = md.split('\n---\n').find((b) => b.match(/^## (.+)$/m)?.[1]?.trim() === p.label)
      assert.ok(block, `${e.slug}: page ${p.label} is in its layout.md`)
      const heads = [...block.matchAll(/^### \d+ (.+)$/gm)].map((m) => m[1].trim().replace(/^Hero — .*/, 'Hero'))
      assert.deepEqual(p.sections.map((x) => (x.id === 'hero' ? 'Hero' : x.name)), heads, `${e.slug} · ${p.label}: sections match the built site`)
    }
    const hero = md.match(/^### 01 Hero — (.+)$/m)?.[1]
    if (hero) assert.equal(r.media.hero.name, hero, `${e.slug}: first screen matches`)
    for (const [re, got] of [[/^### Menu — (.+)$/m, r.chrome.nav.name], [/^### Shape — (.+)$/m, r.visualSystem.shape.name]] as const) {
      const want = md.match(re)?.[1]; if (want) assert.equal(got, want, `${e.slug}: ${re.source.slice(5, 10)} matches`)
    }
    const kit = planToSpec(specToPlan(spec))
    assert.deepEqual(kit.pages.map((p) => p.sections), spec.pages.map((p) => p.sections), `${e.slug}: Customise in kit keeps every page as built`)
    assert.equal(kit.hero, spec.hero, `${e.slug}: Customise keeps the first screen`)
    assert.equal(kit.motion, spec.motion, `${e.slug}: Customise keeps the movement`)
    assert.deepEqual([...(kit.pieces ?? [])].sort(), [...(spec.pieces ?? [])].sort(), `${e.slug}: Customise keeps every effect`)
    for (const x of spec.piecePlacements ?? []) assert.ok(x.page === '*' || spec.pages.some((p) => p.id === x.page), `${e.slug}: effect ${x.piece} points at a real page`)
  }
  for (const e of examples) {
    const spec = specFromChoices(e.choices)
    assert.ok(spec, `${e.slug}: its recorded choices rebuild a recipe`)
    assert.ok(isValidSpec(spec), `${e.slug}: rebuilt recipe is valid`)
    // Choices alone can't name a custom page; an example that ships opuskit.json carries it exactly.
    if (!existsSync(`examples/${e.slug}/opuskit.json`)) assert.ok(!spec.pages.some((p) => p.type === 'custom'), `${e.slug}: every page is a known page type`)
  }
  // The kit's "a site like this" clips (plan §8): every clip exists, sits on a part the site has, and only fair matches show.
  for (const e of examples) {
    const spec = (exampleSpecs as Record<string, RecipeSpec>)[e.slug]
    for (const src of [e.clip, ...Object.values(e.sectionClips ?? {})].filter(Boolean)) assert.ok(existsSync(`public${src}`), `${e.slug}: clip ${src} is on disk`)
    const chrome = (id: SectionId): id is 'navbar' | 'footer' => id === 'navbar' || id === 'footer'
    for (const id of Object.keys(e.sectionClips ?? {}) as SectionId[]) assert.ok(chrome(id) || spec.pages.some((p) => p.sections.includes(id)), `${e.slug}: has the ${id} it shows a clip of`)
    if (e.legacy || !e.clip) continue // a site waiting for its clip is simply not offered yet
    assert.equal(closestSite(spec)?.example.slug, e.slug, `${e.slug}: its own recipe finds it`)
    for (const id of Object.keys(e.sectionClips ?? {}) as SectionId[]) assert.equal((chrome(id) ? closestChrome(spec, id) : closestSection(spec, id))?.example.slug, e.slug, `${e.slug}: its own ${id} finds it`)
  }
  {
    const atlas = (exampleSpecs as Record<string, RecipeSpec>)['slow-atlas']
    assert.ok(!closestSite({ ...atlas, lead: 'video', motion: 'immersive', hero: 'scroll-video' }), 'a film first screen gets no clip of a typographic site — and never an old example')
    assert.ok(!closestSite({ ...atlas, motion: 'dynamic', hero: 'kinetic-type' }), 'same first screen but livelier movement is not "a site like this"')
    assert.ok(!closestSection({ ...atlas, motion: 'immersive' }, 'journal'), 'a section clip needs the same kind of movement')
    assert.ok(!closestSection(atlas, 'pricing'), 'no clip for a part no real site has yet')
    assert.ok(!closestChrome({ ...atlas, nav: 'bottom-dock' }, 'navbar'), 'a different menu style gets no menu clip')
  }
  const legacy = cleanPlan({ pages: [{ id: 'x', type: 'home', label: 'Home', purpose: '', sections: ['intro', 'bogus'] }], direction: 'nope', pieces: ['grain'] })
  assert.deepEqual(legacy.pages[0].sections.map((s) => s.id), ['intro'], 'older flat plans upgrade; unknown sections dropped')
  assert.equal(legacy.direction, undefined, 'unknown ids are dropped at the trust boundary')
  assert.ok(planToSpec(EMPTY_PLAN).pages.length > 0, 'an empty plan still composes a whole site')
  for (const g of sectionGroups) for (const id of g.ids) assert.ok(sections[id] && hasBlock(id), `library section ${id} exists and has code`)
  // Pages speaks plain words: every part has a job, a look and a 'best when'.
  for (const g of sectionGroups) { assert.ok(g.job, `${g.name} has a job`); for (const id of g.ids) assert.ok(sectionGuide[id]?.look && sectionGuide[id]?.bestWhen, `${id} has a plain look and best-when`) }

  // In-site links in ready code go through the \`link\` component the site passes (next/link), never a bare <a> —
  // a bare one reloads the page and ignores basePath. Only mailto:, tel: and outside links stay <a>.
  for (const [name, src] of [...Object.entries(blockSource), ...Object.entries(pieceSource)] as [string, string][]) {
    for (const m of src.matchAll(/<a href=\{([^}]*)\}/g)) assert.ok(/mailto|tel:|mapUrl/.test(m[1]), `${name}: in-site link <a href={${m[1]}}> should use the link prop`)
  }

  // Sticker Studio (extrafazant-style): two voices, colour chapters, orbit hero, whole-site pieces, brand stickers.
  let st = start(EMPTY_PLAN, 'agency')
  st = setStyle(st, 'direction', 'sticker-studio')
  st = setHero(st, 'orbit-stickers')
  st = addSection(st, st.pages[0].id, 'chapters', 1)
  for (const id of ['blob-transition', 'brand-cursor', 'cookie-note'] as const) st = toggleSitePiece(st, id)
  const sr = composeRecipe(planToSpec(st))
  assert.equal(sr.visualSystem.typography.id, 'two-voice', 'the look brings its two-voice lettering')
  assert.equal(sr.visualSystem.rotation?.id, 'sticker-pop', 'the look brings its colour chapters')
  assert.ok(sr.contentDirection.voice.includes('small joke'), 'the look brings its cheeky voice')
  assert.ok(sr.assetRequirements.some((a) => a.asset === 'stickers' && a.level === 'required'), 'the orbit hero asks for brand stickers')
  assert.ok(sr.pieces.filter((p) => p.slot === 'site').every((p) => p.where.startsWith('Whole site')), 'site pieces go in the root layout')
  const sp = await adapters['claude-code'].generate(sr)
  for (const f of ['src/components/sections/OrbitHero.tsx', 'src/components/sections/ColourChapters.tsx', 'src/components/sections/Footer.tsx', 'src/components/pieces/BlobTransition.tsx', 'src/components/pieces/BrandCursor.tsx', 'src/components/pieces/CookieNote.tsx']) assert.ok(sp.files.some((x) => x.path === f && x.content.length > 200), `ships ${f}`)
  assert.match(sp.files.find((x) => x.path.endsWith('tokens.css'))!.content, /--color-chapter-1: #0038FF/, 'chapter colours reach tokens.css')
  assert.equal(composeRecipe(planToSpec(setStyle(st, 'rotation', 'off'))).visualSystem.rotation, undefined, 'colour chapters can be switched off')
  assert.ok(composeRecipe(specFromSeed(recipeSeeds[0])).chrome.footer.code, 'every recipe ships the footer code')

  console.log(`✓ ${recipeSeeds.length} recipes × ${Object.keys(adapters).length} adapters, remix and asset logic OK`)
}

main().catch((e) => { console.error(e); process.exit(1) })
