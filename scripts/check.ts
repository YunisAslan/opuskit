// Runnable check: every seed composes into a complete recipe, remix updates dependents,
// and every adapter produces a valid, tool-specific package.  Run: npm run check
import assert from 'node:assert/strict'
import type { DirectionId, PieceId, RecipeSpec, SectionId } from '../src/types/domain'
import { spawnSync } from 'node:child_process'
import { palettes, typography } from '../src/data/ingredients'
import { contrast, deltaE, oklab } from '../src/lib/color'
import { recipeSeeds } from '../src/data/recipes'
import { concepts, heroes, imagePresentations, signaturePatterns } from '../src/data/patterns'
import { behaviours, isMoment, pieces } from '../src/data/pieces'
import { blockSource, heroSource, pieceSource } from '../src/data/pieces-source.generated'
import { blockFor } from '../src/data/blocks'
import { sections } from '../src/data/patterns'
import { TYPE_UTILITIES } from '../src/lib/type-tokens'
import { GENERATED, piecesSource } from './pieces-source'
import { existsSync, readFileSync } from 'node:fs'
import { inferGoal, heroTitle, libraryFor, removeSection, toggleChrome, behaviourPick, isPhotoSection, sectionPhotos, setBehaviour, setSectionPhotos, setSectionVariant, EMPTY_PLAN, addPage, addSection, toggleSitePiece, cleanPlan, hasBlock, inferPurpose, moveSection, piecesFor, placeSection, addSuggested, isStandardPage, missingPages, pageSuggestions, planToSpec, sectionGroups, specFromChoices, specToPlan, swapOptions, replaceSection, resetPage, setPagePurpose, usualPages, effectOn, effectWhere, starters, setHero, setPartHero, heroOf, setStyle, start, togglePiece } from '../src/features/kit/plan'
import { resources } from '../src/data/resources'
import { directions, families, goals, purposes } from '../src/data/taxonomy'
import { lookImages } from '../src/data/look-images'
import { adapters } from '../src/features/build-packages'
import { visualQa } from '../src/features/build-packages/shared'
import { pageTypes } from '../src/data/patterns'
import { examples } from '../src/data/examples'
import { sectionGuide } from '../src/data/section-guide'
import exampleSpecs from '../src/data/example-specs.generated.json'
import { closestChrome, closestPiece, closestSection, closestSite } from '../src/features/kit/closest'
import { LOVABLE_KNOWLEDGE_LIMIT, lovableKnowledge } from '../src/features/build-packages/lovable'
import { recipeToMarkdown } from '../src/features/recipes/markdown'
import { allSites, applyItems, takenFrom, takenOf, cleanCollection, collectionToPlan, lookFor, notes, placement, siteSpec, startSite, type Collection, type SiteRef } from '../src/features/library/collection'
import { OFFERS, OFFER_IDS, directionsFor, kindFor, offerOf, pagesFromWords, purposeFrom, siteTraits } from '../src/features/library/inspire'
import { COLOUR_WORDS, SHAPE_WORDS, TYPE_WORDS, recommendSectionPhotos, cleanPieces, defaultPagesFor, pieceIssues, composeRecipe, isValidSpec, rankPalettes, remix, specFromSeed, validateRecipe } from '../src/features/recipes/engine'

assert.equal(recipeSeeds.length, 10, 'exactly 10 seed recipes')
assert.equal(new Set(recipeSeeds.map((s) => s.slug)).size, 10, 'unique slugs')
for (const f of Object.values(families)) for (const d of f.directions) assert.ok(directions[d], `family ${f.id} → ${d}`)
for (const d of Object.values(directions)) {
  assert.ok(recipeSeeds.some((s) => s.slug === d.baseRecipe), `direction ${d.id} base recipe exists`)
  assert.ok(d.palettes.includes(d.defaults.palette) && d.typography.includes(d.defaults.typography), `${d.id} defaults are in its lists`)
}

// Palette by fit: only the look's palettes, and photo-led sites get a calm ground while type-led ones may carry colour.
for (const d of Object.values(directions)) for (const lead of ['photography', 'typography'] as const) {
  const r = rankPalettes({ direction: d.id, purpose: 'studio', lead })
  assert.ok(r.length === d.palettes.length && r.every((id) => d.palettes.includes(id)), `${d.id}: ranks only its own palettes`)
}
{ const ground = (id: string) => oklab(palettes[id as keyof typeof palettes].colors.background).C
  assert.ok(ground(rankPalettes({ direction: 'organic-modern', purpose: 'restaurant', lead: 'photography' })[0]) < 0.03, 'a photo-led restaurant gets a neutral ground')
  assert.ok(ground(rankPalettes({ direction: 'organic-modern', purpose: 'restaurant', lead: 'illustration' })[0]) >= 0.05, 'an illustrated one may carry colour') }

// ─── Distinctiveness: stop the library collapsing back into one look ─────────
const pal = Object.values(palettes)
for (const p of pal) {
  assert.ok(contrast(p.colors.text, p.colors.background) >= 7, `${p.id}: text/bg ≥ 7:1`)
  assert.ok(contrast(p.colors.muted, p.colors.background) >= 4.5, `${p.id}: muted/bg ≥ 4.5:1`)
  assert.ok(contrast(p.colors.accent, p.colors.background) >= 3, `${p.id}: accent/bg ≥ 3:1`)
}
// Identity is ground + accent (award sites differ by accent, type and media, rarely by ground): two palettes collide
// only when both are close. Grounds-only spacing pushed the library into the greyed middle (docs/research/2026-10-04-colour.md §6).
for (let i = 0; i < pal.length; i++) for (let j = i + 1; j < pal.length; j++) {
  const a = pal[i], b = pal[j], d = deltaE(a.colors.background, b.colors.background)
  if (d >= 0.06) continue
  assert.ok(d >= 0.02 && a.dark === b.dark && deltaE(a.colors.accent, b.colors.accent) >= 0.12, `palettes too similar: ${a.id} ~ ${b.id} (ground ΔE_OK ${d.toFixed(3)})`)
}
// The dusty middle: greyed mid-tone grounds read as dated. Commit (C ≥ 0.12), go pale (L ≥ 0.86, C ≥ 0.05) or go deep.
const dusty = pal.filter((p) => { const o = oklab(p.colors.background); return o.L >= 0.36 && o.L < 0.89 && o.C >= 0.02 && o.C < 0.12 && !(o.L >= 0.86 && o.C >= 0.05) })
assert.deepEqual(dusty.map((p) => p.id), [], 'muddy mid-tone grounds')
// Ink is ink: text near-neutral or tinted toward the ground's own hue — never navy on pink or maroon on blue.
for (const p of pal) { const t = oklab(p.colors.text), g = oklab(p.colors.background), dh = Math.abs(((t.H - g.H + 540) % 360) - 180)
  assert.ok(t.C <= 0.05 || dh <= 40 || ['legal-pad', 'lido-blue', 'bubblegum'].includes(p.id), `${p.id}: text tinted toward another hue`) }
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
// Menu links (utility) sit beside buttons and text (body): one face at two widths reads as a mistake (yunisaslanov).
for (const t of types) if (t.utility.family === t.body.family)
  assert.equal(t.utility.stretch ?? '100%', t.body.stretch ?? '100%', `${t.name}: utility is the body face at another width`)

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

  assert.ok(composeRecipe({ ...specFromSeed(recipeSeeds[0]), motion: 'dynamic', pieces: ['smooth-scroll'] }).implementation.stack.includes('Lenis'), 'Lenis in the stack when the SmoothScroll piece ships')
  // Asset keys become identifiers in src/config/assets.ts: never one that starts with a digit (a 3D hero's "3D model…").
  for (const r of [composeRecipe({ ...specFromSeed(recipeSeeds[0]), lead: '3d', hero: 'webgl-scene', motion: 'immersive' }), ...recipeSeeds.map((sd) => composeRecipe(specFromSeed(sd)))]) for (const a of r.assetRequirements) assert.match(a.key, /^[A-Za-z_$][\w$]*$/, `asset key ${a.key} is a valid identifier`)
  for (const seed of recipeSeeds) { // a seed's voice is written for its own kind of site (a shop's "SKU, price, stock" never reaches a charity)
    const other = seed.spec.purpose === 'nonprofit' ? 'portfolio' : 'nonprofit'
    assert.deepEqual(composeRecipe({ ...specFromSeed(seed), purpose: other }).creativeDirection.visualPrinciples, directions[seed.spec.direction].principles, `${seed.slug}: its own voice stays with its own kind of site`)
  }
  assert.ok(!/\b(\w+) \1\b/.test(composeRecipe({ ...specFromSeed(recipeSeeds[0]), direction: 'sticker-studio', purpose: 'studio' }).title), 'no doubled word in a composed title')

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
  // Pages end on their own last word: the contact block closes only Home, Contact and a listing's own page.
  for (const pu of Object.values(purposes)) for (const pg of pu.pages) assert.ok(pg.sections?.at(-1) !== 'contact-cta' || ['home', 'contact', 'product-detail'].includes(pg.type), `${pu.id} ${pg.label}: ends on its own part, not contact-cta`)
  // Phase G: a product page sells (buy box first); other ways to start a kind of site compose whole sites.
  for (const pu of Object.values(purposes)) for (const pg of pu.pages) if (pg.type === 'product-detail' && pu.id !== 'real-estate') assert.equal(pg.sections?.[0], 'product-buy', `${pu.id}: its product page starts with the buy box`)
  for (const pu of Object.values(purposes)) for (const st of pu.starters ?? []) {
    const r = composeRecipe({ ...specFromSeed(recipeSeeds[0]), purpose: pu.id, pages: defaultPagesFor(pu.id, st.id) })
    assert.ok(r.pages.length === st.pages.filter((x) => x.tier === 'recommended').length && r.pages.every((x) => x.sections.length), `${pu.id}/${st.id}: starter composes every page`)
  }
  // Section entrances speak the look's family; a headline behaviour replaces the generic line reveal.
  const entrance = (direction: DirectionId, pieces: PieceId[] = []) => composeRecipe({ ...specFromSeed(recipeSeeds[0]), direction, motion: 'dynamic', pieces }).motion.patterns
  assert.notEqual(entrance('japanese-minimal').find((p) => p.id === 'fade-rise')?.name, entrance('swiss-modern').find((p) => p.id === 'fade-rise')?.name, 'quiet and bold looks enter differently')
  assert.ok(!entrance('swiss-modern', ['cut-reveal']).some((p) => p.id === 'line-reveal'), 'headline piece replaces line reveal')

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
  assert.ok(sh && /-crf CRF -g 6/.test(sh.content) && /fit_budget/.test(sh.content), 'video recipe ships prepare-video.sh (budget-fitted, short GOP for scrubbing)')
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
  assert.equal(kitted.pieces.filter((p) => ['text-effect', 'number-ticker', 'ring-carousel', 'image-field'].includes(p.id)).length, 3, 'photo slot keeps one piece') // a big-idea moment may add its own piece
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
  assert.match(recipeToMarkdown(composeRecipe(specFromSeed(recipeSeeds[0]))), /Reference code:\*\* `src\/components\/sections\//, 'reference code reaches the recipe')
  const tokens = secPkg.files.find((f) => f.path.endsWith('tokens.css'))!.content
  assert.ok(tokens.includes(TYPE_UTILITIES) && readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8').includes(TYPE_UTILITIES), 'type utilities identical in packages and OpusKit previews')

  {
    // Two film/image parts: each shows its own pick, and the first one stays the site's first screen.
    let two = setHero(start(EMPTY_PLAN, 'studio'), 'editorial-image')
    const pg = two.pages[0].id
    two = addSection(two, pg, 'hero', 2)
    const [a, b] = two.pages[0].sections.filter((x) => x.id === 'hero')
    const part = (k: string) => two.pages[0].sections.find((x) => x.key === k)!
    two = setPartHero(two, pg, b.key, 'orbit-stickers')
    assert.equal(heroOf(two, part(a.key)), 'editorial-image', 'picking for a second film/image part leaves the first screen alone')
    two = setPartHero(two, pg, a.key, 'kinetic-type')
    assert.equal(heroOf(two, part(b.key)), 'orbit-stickers', 'changing the first screen leaves the other part alone')
    assert.equal(two.hero, 'kinetic-type', 'the first film/image part is the first screen')
    const spec2 = planToSpec(two), r2 = composeRecipe(spec2)
    assert.deepEqual(spec2.heroBands?.map((x) => x.hero), ['orbit-stickers'], 'a part’s own pick reaches the recipe')
    assert.ok(r2.pages[0].sections.some((x) => x.name.includes(heroes['orbit-stickers'].name) && x.composition.includes('its own')), 'the builder is told that part shows something else and needs its own media')
    assert.equal(heroOf(specToPlan(spec2), specToPlan(spec2).pages[0].sections.filter((x) => x.id === 'hero')[1]), 'orbit-stickers', 'and it survives a round trip through the recipe')
    // A film band on a site whose first screen has no film still plans its film and ships the video script.
    const filmBand = composeRecipe(planToSpec(setPartHero(two, pg, b.key, 'ambient-video')))
    assert.ok(filmBand.assetRequirements.some((x) => x.asset === 'video' && x.level === 'required' && x.usage.includes('band')), 'a film band asks for its own film')
    assert.ok((await adapters['claude-code'].generate(filmBand)).files.some((f) => f.path === 'scripts/prepare-video.sh'), 'a film band ships prepare-video.sh')
    const scrubBand = composeRecipe({ ...planToSpec(setPartHero(two, pg, b.key, 'scroll-video')), motion: 'immersive' })
    assert.match((await adapters['claude-code'].generate(scrubBand)).files.find((f) => f.path === 'scripts/prepare-video.sh')!.content, /scrubReadyEncode/, 'a scroll-scrubbed film band gets the scrub-ready encode')
  }

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
  // Ready sections never ship the generic tells the recipe forbids: "→" after links, middle-dot joins, 01/02 markers.
  for (const [id, src] of Object.entries(blockSource)) assert.ok(!/→| · |padStart\(2, '0'\)/.test(src!), `${id}: ready section ships a generic tell`)
  // Controls are the project's shadcn/ui parts: a ready section never ships a plain browser control or disclosure.
  for (const [id, src] of Object.entries(blockSource)) assert.ok(!/<(select|details|summary)\b|type="(date|time|number|checkbox|radio)"/.test(src!), `${id}: ready section ships a native control`)
  { // Rules hold for any pick: no seed or look rule names a font family or a hex value (section notes may — they apply only with the seed's own lettering).
    const fams = [...new Set(Object.values(typography).flatMap((t) => [t.display.family, t.body.family, t.utility.family]))]
    for (const line of [...recipeSeeds.flatMap((x) => [...x.do, ...x.principles, ...x.avoid]), ...Object.values(directions).flatMap((d) => [...d.do, ...d.principles, ...d.avoid])]) assert.ok(!/#[0-9a-f]{6}\b/i.test(line) && !fams.some((f) => line.includes(f)), `a rule names a font or a hex — use a role: ${line}`)
  }
  for (const seed of recipeSeeds) for (const line of [...seed.do, ...seed.principles, ...Object.values(seed.sectionNotes)] as string[]) assert.ok(!/\b(blue|pink|red|violet|rose|leaf green|powder)\b/i.test(line), `${seed.slug}: a rule names a hue of its own palette — use a colour role: ${line}`)
  // Award vibe: every seed has a big idea that its pages can carry, and the package says how.
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
  for (const e of examples) assert.ok(/^\/live\/[a-z0-9-]+$/.test(e.livePath) && existsSync(`public${e.livePath}/index.html`), `${e.slug}: livePath is /live/{slug} (never index.html) and its export exists`)
  // The kit's "a site like this" clips (docs/plan-examples.md): every clip exists, sits on a part the site has, and only fair matches show.
  for (const e of examples) {
    const spec = (exampleSpecs as Record<string, RecipeSpec>)[e.slug]
    for (const src of [e.clip, ...Object.values(e.sectionClips ?? {}), ...Object.values(e.pieceClips ?? {}), ...Object.values(e.signatureClips ?? {})].filter(Boolean)) assert.ok(existsSync(`public${src}`), `${e.slug}: clip ${src} is on disk`)
    for (const id of Object.keys(e.pieceClips ?? {}) as PieceId[]) {
      assert.ok(spec.pieces?.includes(id), `${e.slug}: uses the ${id} it shows a clip of`)
      assert.ok(closestPiece(spec, id), `${e.slug}: its ${id} clip is offered`)
    }
    const sigs = composeRecipe(spec).signatures.map((x) => x.id)
    // The moment is in its recipe today, or was in the recipe it was built from (defaults move, built sites do not).
    const built = existsSync(`examples/${e.slug}/recipe/motion.md`) ? readFileSync(`examples/${e.slug}/recipe/motion.md`, 'utf8') : ''
    for (const id of Object.keys(e.signatureClips ?? {})) assert.ok(sigs.includes(id) || built.includes(`### ${signaturePatterns.find((p) => p.id === id)?.name} — `), `${e.slug}: has the ${id} moment it shows a clip of`)
    const chrome = (id: SectionId): id is 'navbar' | 'footer' => id === 'navbar' || id === 'footer'
    for (const id of Object.keys(e.sectionClips ?? {}) as SectionId[]) assert.ok(chrome(id) || spec.pages.some((p) => p.sections.includes(id)), `${e.slug}: has the ${id} it shows a clip of`)
    if (e.legacy || !e.clip) continue // a site waiting for its clip is simply not offered yet
    assert.equal(closestSite(spec)?.example.slug, e.slug, `${e.slug}: its own recipe finds it`)
    for (const id of Object.keys(e.sectionClips ?? {}) as SectionId[]) assert.equal((chrome(id) ? closestChrome(spec, id) : closestSection(spec, id))?.example.slug, e.slug, `${e.slug}: its own ${id} finds it`)
  }
  {
    const atlas = (exampleSpecs as Record<string, RecipeSpec>)['slow-atlas']
    assert.notEqual(closestSite({ ...atlas, lead: 'video', motion: 'immersive', hero: 'scroll-video' })?.example.slug, 'slow-atlas', 'a film first screen gets no clip of a typographic site')
    assert.notEqual(closestSite({ ...atlas, motion: 'dynamic', hero: 'kinetic-type' })?.example.slug, 'slow-atlas', 'same first screen but livelier movement is not "a site like this"')
    assert.notEqual(closestSection({ ...atlas, motion: 'immersive' }, 'journal')?.example.slug, 'slow-atlas', 'a section clip needs the same kind of movement')
    assert.ok(!closestSection(atlas, 'process'), 'no clip for a part no real site shows yet')
    assert.ok(!closestChrome({ ...atlas, nav: 'bottom-dock' }, 'navbar'), 'a different menu style gets no menu clip')
  }
  const legacy = cleanPlan({ pages: [{ id: 'x', type: 'home', label: 'Home', purpose: '', sections: ['intro', 'bogus'] }], direction: 'nope', pieces: ['grain'] })
  assert.deepEqual(legacy.pages[0].sections.map((s) => s.id), ['intro'], 'older flat plans upgrade; unknown sections dropped')
  assert.equal(legacy.direction, undefined, 'unknown ids are dropped at the trust boundary')
  assert.ok(planToSpec(EMPTY_PLAN).pages.length > 0, 'an empty plan still composes a whole site')
  for (const g of sectionGroups) for (const id of g.ids) assert.ok(sections[id] && hasBlock(id), `library section ${id} exists and has code`)
  // Pages speaks plain words: every part has a job, a look and a 'best when'.
  for (const g of sectionGroups) { assert.ok(g.job, `${g.name} has a job`); for (const id of g.ids) assert.ok(sectionGuide[id]?.look && sectionGuide[id]?.bestWhen, `${id} has a plain look and best-when`) }

  // The frame: sections use the layout tokens, take a tone, and the recipe gives each page a rhythm.
  {
    const { TONE_CSS, FRAMES } = await import('../src/lib/frame')
    assert.ok(readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8').includes(TONE_CSS), 'globals.css carries TONE_CSS exactly (src/lib/frame.ts)')
    for (const [id, src] of Object.entries(blockSource)) {
      assert.ok(!/max-w-\[1440px\]|px-5 py-2[048] md:px-10|md:py-32/.test(src!), `${id}: hardcoded frame — use --container / --gutter / --section-y`)
      if (id !== 'footer' && id !== 'chapters') assert.match(src!, /data-tone=/, `${id}: takes a tone`) // chapters are colour fields by nature
    }
    for (const lay of Object.keys(FRAMES) as (keyof typeof FRAMES)[]) {
      const r = composeRecipe({ ...specFromSeed(recipeSeeds[0]), layout: lay })
      const css = (await adapters['claude-code'].generate(r)).files.find((f) => f.path.endsWith('tokens.css'))!.content
      assert.ok(css.includes(`--container: ${FRAMES[lay].container};`) && css.includes(TONE_CSS), `${lay}: tokens.css carries the frame and the tones`)
    }
    for (const seed of recipeSeeds) for (const p of composeRecipe(specFromSeed(seed)).pages) {
      p.sections.forEach((x, i) => assert.ok(!x.tone || x.tone !== p.sections[i - 1]?.tone, `${seed.slug} ${p.label}: two neighbours share tone ${x.tone}`))
      const media = p.sections.filter((x) => x.media).map((x) => x.media)
      media.forEach((m, i) => assert.ok(i === 0 || m !== media[i - 1] || new Set(media).size === 1, `${seed.slug} ${p.label}: media placement repeats`))
    }
  }

  // Section designs: every design is a real variant of the shipped code, looks pick different ones,
  // the recipe tells the builder which, and an owner's pick survives the kit round trip.
  {
    const { sectionVariants } = await import('../src/data/section-variants')
    for (const [id, d] of Object.entries(sectionVariants)) for (const o of d!.options) assert.ok(blockSource[id as SectionId]?.includes(`'${o.id}'`), `${id}: design ${o.id} exists in its ready code`)
    const designs = (direction: DirectionId) => composeRecipe({ ...specFromSeed(recipeSeeds[0]), direction }).pages.flatMap((p) => p.sections.map((x) => x.variant?.id ?? '')).join()
    assert.notEqual(designs('japanese-minimal'), designs('neo-brutalist'), 'a quiet and a raw look lay the same parts out differently')
    const base = specFromSeed(recipeSeeds[0]), at = base.pages[0].sections.findIndex((x) => sectionVariants[x])
    if (at >= 0) {
      const want = sectionVariants[base.pages[0].sections[at]]!.options.at(-1)!.id
      const r = composeRecipe({ ...base, sectionVariants: [{ page: base.pages[0].id, index: at, variant: want }] })
      assert.equal(r.pages[0].sections[at].variant?.id, want, 'an owner-picked design is used')
      assert.ok(r.pages[0].sections[at].variant?.chosen, 'and marked as chosen')
    }
    const kp = start(EMPTY_PLAN, 'agency'), kpg = kp.pages[0], ks = kpg.sections.find((x) => sectionVariants[x.id])!
    const kspec = planToSpec(setSectionVariant(kp, kpg.id, ks.key, sectionVariants[ks.id]!.options[1].id))
    assert.equal(specToPlan(kspec).pages[0].sections.find((x) => x.id === ks.id)?.variant, sectionVariants[ks.id]!.options[1].id, 'a picked design survives plan → spec → plan')
  }

  // In-site links in ready code go through the \`link\` component the site passes (next/link), never a bare <a> —
  // a bare one reloads the page and ignores basePath. Only mailto:, tel: and outside links stay <a>.
  for (const [name, src] of [...Object.entries(blockSource), ...Object.entries(pieceSource)] as [string, string][]) {
    for (const m of src.matchAll(/<(?:motion\.)?a href=\{([^}]*)\}/g)) assert.ok(/mailto|tel:|mapUrl/.test(m[1]), `${name}: in-site link <a href={${m[1]}}> should use the link prop`)
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
  for (const m of sr.signatures) { const id = signaturePatterns.find((p) => p.id === m.id)?.piece; if (id) assert.ok(sr.pieces.some((p) => p.id === id), `the ${m.id} moment ships its ready ${id} piece`) }
  assert.ok(sr.pieces.some((p) => p.id === 'entry-gate'), 'a playful way in ships the EntryGate piece')
  const sp = await adapters['claude-code'].generate(sr)
  // Pinned moments build on the one PinnedStage piece; two kit entries sharing a file ship it once.
  { const pr = composeRecipe({ ...specFromSeed(recipeSeeds[3]), concept: 'giant-chapters', motion: 'dynamic' })
    if (pr.signatures.some((m) => m.id === 'pinned-proof')) assert.ok(pr.pieces.some((p) => p.id === 'pinned-stage'), 'proof one at a time ships PinnedStage')
    const files = (await adapters['claude-code'].generate(composeRecipe({ ...specFromSeed(recipeSeeds[3]), motion: 'dynamic', pieces: ['scribble-link', 'wavy-link'] }))).files.map((f) => f.path)
    assert.ok(files.filter((f) => f.endsWith('/DrawnLink.tsx')).length <= 1, 'DrawnLink ships once') }
  for (const f of ['src/components/sections/OrbitHero.tsx', 'src/components/sections/ColourChapters.tsx', 'src/components/sections/Footer.tsx', 'src/components/pieces/BlobTransition.tsx', 'src/components/pieces/BrandCursor.tsx', 'src/components/pieces/CookieNote.tsx']) assert.ok(sp.files.some((x) => x.path === f && x.content.length > 200), `ships ${f}`)
  assert.match(sp.files.find((x) => x.path.endsWith('tokens.css'))!.content, /--color-chapter-1: #0038FF/, 'chapter colours reach tokens.css')
  assert.equal(composeRecipe(planToSpec(setStyle(st, 'rotation', 'off'))).visualSystem.rotation, undefined, 'colour chapters can be switched off')
  assert.ok(composeRecipe(specFromSeed(recipeSeeds[0])).chrome.footer.code, 'every recipe ships the footer code')

  // The Library's Collection (docs/plan-library.md): free to fill, quiet notes, a plan where everything lands where it fits.
  {
    for (const r of allSites) assert.deepEqual(validateRecipe(composeRecipe(planToSpec(collectionToPlan({ items: [{ kind: 'site', site: r }] }).plan))), [], `${r} starts a complete plan`)
    for (const p of Object.keys(purposes) as (keyof typeof purposes)[]) { const d = lookFor(p); if (d) assert.ok(d in directions, `${p}'s starting look exists`) }
    // Two sites mixed never put one part twice on a page (Fennwood + Velmira once gave Home two Reservations).
    for (const [a, b] of allSites.flatMap((a, i) => allSites.slice(i + 1).map((b) => [a, b] as const)))
      for (const pg of collectionToPlan({ items: [{ kind: 'site', site: a }, { kind: 'site', site: b }] }).plan.pages) {
        const ids = pg.sections.map((s) => s.id).filter((id) => id !== 'hero')
        assert.equal(new Set(ids).size, ids.length, `${a} + ${b}: ${pg.label} has a part twice (${ids.join(', ')})`)
      }
    const blank = collectionToPlan({ items: [], purpose: 'portfolio', name: 'Ada' }).plan
    assert.equal(blank.direction, lookFor('portfolio'), 'no site: the kind of site brings its look')
    assert.equal(planToSpec(blank).brief?.name, 'Ada', 'the name from About you reaches the brief')
    const qum: Collection = { items: [{ kind: 'site', site: 'example:qum' }, { kind: 'effect', id: 'text-effect' }, { kind: 'effect', id: 'cut-reveal' }, { kind: 'section', id: 'faq' }], name: 'Mira' }
    const q = collectionToPlan(qum).plan, qs = siteSpec('example:qum')!
    assert.equal(q.direction, qs.direction, 'a site in the Collection is the start: its look')
    assert.deepEqual(q.pages.map((p) => p.label), qs.pages.map((p) => p.label), 'and its pages')
    assert.equal(planToSpec(q).brief?.name, 'Mira', 'the site’s own name never comes along')
    assert.equal(q.fromId, undefined, 'a new recipe, not an update of the example')
    assert.ok((q.sitePieces ?? []).includes('cut-reveal') && !(q.sitePieces ?? []).includes('text-effect'), 'one headline behaviour: the last one added')
    assert.ok(notes(qum).some((n) => n.keys.length === 2 && n.text.includes('same job')), 'two headline behaviours get a quiet note')
    const shop = collectionToPlan({ items: [{ kind: 'section', id: 'lookbook' }, { kind: 'section', id: 'categories' }, { kind: 'section', id: 'product-buy', variant: undefined }], purpose: 'ecommerce' }).plan
    const home = shop.pages[0].sections.map((x) => x.id)
    assert.ok(home.includes('lookbook') && home.includes('categories'), 'a part replaces the default doing its job; the next one of that job joins the page')
    assert.equal(shop.pages.filter((p) => p.sections.some((x) => x.id === 'product-buy')).length, 1, 'a part already on a page is not added twice')
    const v = collectionToPlan({ items: [{ kind: 'section', id: 'intro', variant: 'giant' }], purpose: 'portfolio' }).plan
    assert.equal(v.pages.flatMap((p) => p.sections).find((x) => x.id === 'intro')?.variant, 'giant', 'a collected design stays the design')
    const m = collectionToPlan({ items: [{ kind: 'effect', id: 'number-ticker' }], purpose: 'portfolio' })
    assert.ok(m.unplaced.includes('number-ticker') || m.plan.pages.some((p) => p.sections.some((x) => x.pieces.includes('number-ticker'))), 'a moment lands on a part that carries it, or is reported')
    const two: Collection = { items: [{ kind: 'site', site: 'example:qum' }, { kind: 'site', site: 'example:hane' }], look: 'example:hane' }
    assert.equal(startSite(two), 'example:hane', 'with two sites, the picked look is the start')
    // Inspiration, not imitation (decision 35): the kind of site is the owner's; no direction copies a liked site.
    assert.equal(purposeFrom('Small-batch tableware, thrown and glazed by hand in my studio.'), 'ecommerce', 'a maker who sells is a shop, read from the sentence')
    assert.equal(purposeFrom('A wood-fired bakery and café by the harbour'), 'restaurant')
    for (const p of Object.keys(purposes) as (keyof typeof purposes)[]) if (p !== 'other') assert.ok(offerOf(p), `"What do you offer?" covers every kind of site (${p})`)
    for (const o of OFFER_IDS) assert.equal(offerOf(kindFor(o), o), o, `picking ${o} keeps ${o} picked, even when its kind sits in another answer too`)
    for (const o of OFFER_IDS) for (const g of OFFERS[o].goals) assert.ok(goals[g], `${o} offers a known goal (${g})`)
    assert.equal(directionsFor({ items: [], purpose: 'ecommerce', goal: 'visit', name: 'Lind' })[0].plan.goal, 'visit', 'what visitors should do reaches the plan')
    for (const sites of [['example:fennwood'], ['example:fennwood', 'example:qum'], ['example:halden', 'example:maison-vey', 'example:fieldhouse']] as SiteRef[][]) {
      const dirs = directionsFor({ items: sites.map((site) => ({ kind: 'site' as const, site })), purpose: 'ecommerce', name: 'Lind' })
      assert.equal(dirs.length, 3, 'three directions')
      assert.equal(new Set(dirs.map((d) => JSON.stringify([d.plan.direction, d.plan.palette, d.plan.typography]))).size, 3, 'the three directions differ')
      for (const d of dirs) {
        assert.equal(d.plan.purpose, 'ecommerce', 'the pages are the owner’s kind, whatever the liked sites are')
        const sp = planToSpec(d.plan)
        for (const r of sites) {
          const t = siteTraits(r)!, same = [sp.direction === t.direction, sp.palette === t.palette, sp.typography === t.typography, !!d.plan.hero && d.plan.hero === t.hero].filter(Boolean).length
          assert.ok(same <= 2, `a direction takes at most two of look, colours, lettering, first screen from ${r} (took ${same})`)
        }
      }
    }
    for (const d of Object.keys(directions) as (keyof typeof directions)[]) assert.ok(lookImages[d], `every look has its mood photo (${d}, decision 41)`)
    { // Pages read from the sentence (decision 39): no Pages screen, so the sentence says what plainly changes them.
      const shop = start(EMPTY_PLAN, 'ecommerce'), types = (pl: typeof shop) => pl.pages.map((p) => p.type)
      assert.ok(types(shop).includes('cart'), 'a shop has a cart')
      assert.ok(!types(pagesFromWords(shop, 'Hand-thrown bowls, sold on Etsy and to order.')).some((t) => t === 'cart' || t === 'checkout'), 'selling elsewhere drops the cart and checkout')
      const ws = pagesFromWords(start(EMPTY_PLAN, 'portfolio'), 'A ceramics studio with weekend workshops and a journal.')
      assert.ok(ws.pages.some((p) => p.type === 'services' && p.label === 'Workshops'), 'workshops get their own page, named so')
      assert.ok(types(ws).includes('journal'), 'a journal gets its page')
      const ci = types(ws).indexOf('contact')
      assert.ok(ci < 0 || ci > types(ws).indexOf('journal'), 'a new page goes before Contact')
      assert.equal(purposeFrom('A photography gallery and bookshop: three exhibitions a year, talks on Thursdays.'), 'event', 'a gallery with exhibitions is an event venue, not a restaurant')
      assert.deepEqual(directionsFor({ items: [], purpose: 'event', name: 'Pale Hour', about: 'A photography gallery: three exhibitions a year.' })[0].plan.pages.map((p) => p.label), ['Home', 'Exhibitions', 'Visit', 'About'], 'and gets a gallery’s pages')
      assert.equal(inferGoal(directionsFor({ items: [], purpose: 'event', name: 'Pale Hour', about: 'A photography gallery: three exhibitions a year.' })[0].plan), 'visit', 'whose visitors come to visit, not to RSVP')
      { // Pages are never shown (decision 48): what the sentence asks for is there, and nothing is left without them.
        const ph = directionsFor({ items: [], purpose: 'event', name: 'Pale Hour', about: 'A photography gallery and bookshop: three exhibitions a year, photobooks to take home.' })[0].plan
        assert.ok(types(ph).includes('shop') && inferGoal(ph) === 'visit', 'a gallery’s bookshop gets a Shop page and stays a place to visit')
        assert.ok(types(directionsFor({ items: [], purpose: 'hotel', name: 'Arden', about: 'A small hotel by the sea with a restaurant and twelve rooms.' })[0].plan).includes('menu'), 'a hotel with a restaurant gets its Menu')
        assert.ok(!types(directionsFor({ items: [], purpose: 'restaurant', name: 'Low Hum', about: 'A listening bar with small plates until late.' })[0].plan).includes('shop'), 'a bar gets no Shop')
        const ways = ['contact', 'reservations', 'locations', 'contact-cta', 'reservation', 'location', 'newsletter', 'donate']
        for (const p of Object.keys(purposes).filter((k) => k !== 'other') as (keyof typeof purposes)[]) {
          const pl = directionsFor({ items: [], purpose: p, name: 'X', about: 'Something.' })[0].plan
          assert.ok(pl.pages.some((g) => ways.includes(g.type) || g.sections.some((s) => ways.includes(s.id))), `${p}: every site keeps a way to reach its owner`)
        } }
      assert.equal(pagesFromWords(shop, 'Small-batch tableware.'), shop, 'a sentence that says nothing about pages changes nothing') }
    { // What was taken rides on the recipe (decision 45): Direction writes it, the spec keeps it, a plan opened back has it.
      const col: Collection = { items: [{ kind: 'like', what: 'opening', site: 'example:fennwood' }, { kind: 'section', id: 'menu', from: 'example:fennwood' }, { kind: 'effect', id: 'text-effect', from: 'example:lowfield-nights' }], purpose: 'restaurant', name: 'Low Hum' }
      const taken = takenOf(col.items), spec = planToSpec({ ...directionsFor(col)[0].plan, taken })
      assert.deepEqual(spec.taken, taken, 'the recipe keeps what was taken')
      assert.deepEqual(specToPlan(spec).taken, taken, 'and a plan opened from it has it again')
      assert.deepEqual(takenFrom(taken), ['Fennwood’s first screen and Menu', 'Lowfield Nights’ Words that arrive'], 'in words, by site') }
    { // A taken part that replaces one never lands after the page's booking (Low Hum: Schedule after Reservation).
      const col: Collection = { items: [{ kind: 'section', id: 'menu', from: 'example:fennwood' }, { kind: 'section', id: 'reservation', from: 'example:fennwood' }, { kind: 'section', id: 'schedule', from: 'example:lowfield-nights' }], purpose: 'restaurant', name: 'Low Hum' }
      const home = directionsFor(col)[0].plan.pages[0].sections.map((x) => x.id)
      assert.ok(home.indexOf('schedule') < home.indexOf('reservation'), `the booking stays last on Home (${home})`) }
    { // A quality taken by name is in every direction; the three looks are not one family three times (decision 39).
      const col: Collection = { items: [{ kind: 'site', site: 'example:sela-mor' }, { kind: 'like', what: 'colours', site: 'example:fennwood' }, { kind: 'like', what: 'lettering', site: 'example:maison-vey' }], purpose: 'ecommerce', name: 'Lind' }
      const dirs = directionsFor(col), fw = siteTraits('example:fennwood')!, mv = siteTraits('example:maison-vey')!
      for (const d of dirs) {
        const sp = planToSpec(d.plan)
        assert.equal(sp.palette, fw.palette, 'colours taken by name are in every direction')
        assert.equal(sp.typography, mv.typography, 'lettering taken by name is in every direction')
      }
      const fams = dirs.map((d) => new Set(directions[d.plan.direction!].families))
      assert.ok(!fams[0].size || ![...fams[0]].some((f) => fams[1].has(f) && fams[2].has(f)), 'the three looks do not all share one family')
      assert.equal(new Set(dirs.map((d) => directions[d.plan.direction!].defaults.layout)).size, 3, 'with colours and lettering shared, the three packs differ in layout') }
    { const col: Collection = { items: [{ kind: 'site', site: 'example:qum' }, { kind: 'section', id: 'faq' }, { kind: 'effect', id: 'cut-reveal' }, { kind: 'site', site: 'example:hane' }] }
      const pl = collectionToPlan(col).plan, where = placement(pl, col)
      assert.ok(!where.waiting.some((i) => i.kind !== 'site'), 'parts and effects are on the pages')
      const noFaq = pl.pages.reduce((x, p) => p.sections.filter((s) => s.id === 'faq').reduce((y, s) => removeSection(y, p.id, s.key), x), pl)
      const gone = placement(noFaq, col)
      assert.ok(gone.waiting.some((i) => i.kind === 'section' && i.id === 'faq'), 'a collected part the owner removed is reported as waiting') }
    { const shopPlan = collectionToPlan({ items: [], purpose: 'portfolio' }).plan
      assert.equal(inferGoal(shopPlan), 'contact', 'a portfolio asks visitors to get in touch')
      assert.equal(inferGoal(addSection(shopPlan, shopPlan.pages[0].id, 'product-buy', 1)), 'buy', 'a buy box makes the goal buy, whatever the kind')
      assert.equal(inferGoal(addSection(shopPlan, shopPlan.pages[0].id, 'donate', 1)), 'donate', 'a donate part makes the goal donate')
      // What you see is what you get: a Library-built site carries no big idea it did not pick (decision 21).
      const studio = { ...shopPlan, via: 'studio' as const }
      assert.equal(planToSpec(studio).concept, 'off', 'a studio plan gets no unseen big idea')
      assert.equal(composeRecipe(planToSpec(studio)).concept, undefined, 'so its recipe has none')
      assert.equal(planToSpec({ ...studio, concept: 'one-guide' }).concept, 'one-guide', 'a picked one stays')
      assert.equal(planToSpec(shopPlan).brief?.goal, 'contact', 'the read goal reaches the brief') }
    { // Many sites: the kind's pages, each part taken from a site doing the same job, every site giving something.
      const mix: Collection = { items: [{ kind: 'site', site: 'example:sela-mor' }, { kind: 'site', site: 'example:inkwell-moth' }, { kind: 'site', site: 'example:brasshand' }], purpose: 'portfolio' }
      const m = collectionToPlan(mix).plan, from = new Set(m.pages.flatMap((p) => p.sections.map((x) => x.from)).filter(Boolean))
      assert.deepEqual(m.pages.map((p) => p.type), defaultPagesFor('portfolio').map((p) => p.type), 'several sites: the kind of site gives the pages')
      assert.ok(from.size >= 2, `several sites: parts come from more than one of them (${[...from].join(', ')})`)
      assert.ok(placement(m, mix).waiting.filter((i) => i.kind === 'site').length <= 1, 'a site that gave a part counts as placed')
      const home = m.pages[0], liked = collectionToPlan({ ...mix, like: { home: 'example:brasshand' } }).plan.pages[0]
      assert.ok(liked.sections.every((x) => x.from === 'example:brasshand'), 'Home like Brasshand: every part of Home is Brasshand’s')
      assert.notDeepEqual(liked.sections.map((x) => x.id), [], 'the liked page is not empty')
      assert.ok(home.sections.length > 0, 'a blended page keeps its parts')
      assert.deepEqual(validateRecipe(composeRecipe(planToSpec(m))), [], 'a blend of three sites is a complete recipe') }
    { // Adding later joins the pages as arranged: nothing moves, nothing is replaced.
      const base = collectionToPlan({ items: [], purpose: 'portfolio' }).plan
      const moved = moveSection(base, base.pages[0].id, base.pages[0].sections[1].key, -1)
      const r = applyItems(moved, [{ kind: 'section', id: 'testimonials' }, { kind: 'section', id: 'featured-work', variant: 'grid' }], false)
      const before = moved.pages[0].sections.map((x) => x.key), after = r.plan.pages.flatMap((p) => p.sections.map((x) => x.key))
      assert.ok(before.every((k) => after.includes(k)), 'adding later keeps every part already there')
      assert.deepEqual(r.plan.pages[0].sections.slice(0, 2).map((x) => x.key), moved.pages[0].sections.slice(0, 2).map((x) => x.key), 'and keeps their order')
      assert.equal(r.added.length, 2, 'both new parts were added') }
    const dirty = cleanCollection({ items: [{ kind: 'site', site: 'example:nope' }, { kind: 'section', id: 'hero' }, { kind: 'effect', id: 'grain' }, { kind: 'effect', id: 'grain' }, null], purpose: 'other', look: 'seed:nope' })
    assert.deepEqual(dirty, { items: [{ kind: 'effect', id: 'grain' }], purpose: undefined, name: undefined, about: undefined, look: undefined, goal: undefined, like: undefined }, 'unknown ids are dropped, duplicates once')
  }

  // The recipe speaks for this site, not the look it came from (docs/plan-library.md decision 26).
  {
    const tAll = Object.keys(typography) as (keyof typeof typography)[], pAll = Object.keys(palettes) as (keyof typeof palettes)[]
    for (const seed of recipeSeeds) {
      const d = directions[seed.spec.direction]
      const t = tAll.find((x) => !d.typography.includes(x) && x !== seed.spec.typography)!, pl = pAll.find((x) => !d.palettes.includes(x) && x !== seed.spec.palette)!
      const r = composeRecipe({ ...specFromSeed(seed), typography: t, palette: pl, shape: seed.spec.shape === 'brutal' ? 'round' : 'brutal' })
      for (const l of [...r.creativeDirection.do, ...r.creativeDirection.avoid, ...r.creativeDirection.visualPrinciples])
        assert.ok(!TYPE_WORDS.test(l) && !COLOUR_WORDS.test(l) && !SHAPE_WORDS.test(l), `${seed.slug} with other picks still says “${l}”`)
      const own = composeRecipe(specFromSeed(seed))
      assert.ok(own.creativeDirection.do.length >= 1, `${seed.slug} keeps its own do list`)
      assert.ok(!/\b[Aa] [aeiou]/.test(composeRecipe({ ...specFromSeed(seed), palette: pl }).summary), `${seed.slug}: “a” before a vowel in the summary`)
      // The copy deck covers every part of every page; every media part has a line in the shot list.
      own.pages.forEach((p, i) => { const parts = own.contentDirection.copy[i].parts; assert.ok(p.sections.every((x) => parts.some((y) => y.part === x.name.split(' — ')[0])) && parts.length >= Math.max(1, p.sections.length) || !p.sections.length, `${seed.slug}: copy deck covers every part of ${p.label}`) })
      for (const p of own.pages) for (const sct of p.sections) if (['gallery', 'featured-work', 'about', 'location', 'editorial-story', 'product-grid'].includes(sct.id))
        assert.ok(own.media.shots.some((x) => x.where.includes(sections[sct.id as keyof typeof sections].name)), `${seed.slug}: ${p.label} ${sct.id} has no shot`)
      assert.match(recipeToMarkdown(own), /## Copy deck/, `${seed.slug}: the copy deck reaches the recipe`)
    }
    // A gallery shows its photos — never a list of names hiding them, even on a moving studio site (Fieldhouse, #17).
    for (const purpose of ['studio', 'agency'] as const) assert.notEqual(recommendSectionPhotos({ ...specFromSeed(recipeSeeds[0]), purpose, motion: 'dynamic' }, 'gallery'), 'hover-reveal', `${purpose}: gallery hides its photos`)
    const named = composeRecipe({ ...specFromSeed(recipeSeeds[0]), brief: { name: 'Morrow', offer: 'A bakery and tea room in an old stone mill.' } })
    assert.match(named.contentDirection.source, /Morrow/, 'the copy deck starts from the owner’s words')
  }

  // Engine review, 2026-10-07 (docs/review-engine-2026-10-07.md): what Fieldhouse, Maison Vey and Halden had to settle by hand.
  {
    const { assetsConfigTs, tokensCss, shotAssets } = await import('../src/features/build-packages/shared')
    const built = ['fieldhouse', 'maison-vey', 'halden'].map((x) => composeRecipe(JSON.parse(readFileSync(`examples/${x}/opuskit.json`, 'utf8')).spec))
    for (const r of built) {
      const conf = assetsConfigTs(r), md = recipeToMarkdown(r), css = tokensCss(r)
      // 1 · The asset layer is the shot list: every photo shot has its key, its files and size; the checklist counts the same.
      for (const x of r.media.shots.filter((x) => x.kind === 'photo')) assert.ok(conf.includes(`  ${x.key}: { src:`), `${r.slug}: asset layer has ${x.key}`)
      const sets = r.assetRequirements.filter((a) => a.set), total = shotAssets(r).reduce((t, x) => t + x.files.length, 0)
      assert.equal(sets.reduce((t, a) => t + Number(/^(\d+)/.exec(a.quantity)?.[1] ?? 0), 0), total, `${r.slug}: checklist counts the shot list`)
      assert.ok(!/\bstatus: 'optional'/.test(conf), `${r.slug}: no optional entry no part uses`)
      // 2 · One number per frame value: the text says what tokens.css ships.
      const y = /--section-y: ([^;]+);/.exec(css)![1]
      assert.ok(r.layoutSystem.sectionSpacing.includes(y) && md.includes(y), `${r.slug}: section spacing text matches the token`)
      // 3 · One film length.
      if (r.media.hero.id.startsWith('scroll-video')) assert.ok(!/5–8 ?s|5–15 ?s/.test(md) && /not a loop/.test(r.media.shots.find((x) => x.kind === 'film')!.format), `${r.slug}: one film length, no loop for a scrubbed film`)
      // 4 · No rule forbids the owner's own picks.
      for (const l of [...r.creativeDirection.avoid, ...r.creativeDirection.genericAvoid]) assert.ok(!(palettes[r.metadata.spec.palette].dark && /charcoal|near-black/i.test(l)), `${r.slug}: “${l}” bans its own palette`)
      // 5 · Controls only where a part uses them; forms say where they go.
      assert.ok(!r.implementation.ui.components.some((c) => ['tooltip', 'navigation-menu', 'dropdown-menu', 'slider', 'pagination', 'input-otp'].includes(c.slug)), `${r.slug}: unused controls in the UI kit`)
      assert.ok(r.implementation.ui.rules.some((x) => x.startsWith('Where a form goes')), `${r.slug}: forms say where they go`)
      if (!r.implementation.ui.components.some((c) => c.slug === 'calendar')) assert.ok(!r.implementation.ui.rules.some((x) => /Calendar/.test(x)), `${r.slug}: no calendar rule without a date field`)
      // 6 · A dark palette keeps its footer on the ground; the error colour and caption role exist.
      if (palettes[r.metadata.spec.palette].dark) assert.match(r.chrome.footer.code?.usage ?? '<FooterSection light', /<FooterSection[^>]* light /, `${r.slug}: footer on the ground`)
      assert.ok(css.includes('--color-error:') && css.includes('@utility type-caption'), `${r.slug}: error colour and caption role`)
      // 7 · The reference call shows the design picked for the part.
      for (const p of r.pages) for (const x of p.sections) if (x.variant && x.code && /variant="/.test(x.code.usage)) assert.match(x.code.usage, new RegExp(`variant="${x.variant.id}"`), `${r.slug}: ${x.name} reference shows its design`)
    }
    // 8 · Featured work and case studies show their pictures; a spa is not a clinic; references are of the site's own kind.
    const studio = composeRecipe({ ...specFromSeed(recipeSeeds[0]), purpose: 'studio', motion: 'dynamic', pages: [{ id: 'w', type: 'project', label: 'Project', purpose: '', sections: ['case-study', 'gallery'] }, { id: 'h', type: 'home', label: 'Home', purpose: '', sections: ['hero', 'featured-work'] }] })
    assert.notEqual(studio.pages[1].sections[1].photos?.id, 'hover-reveal', 'featured work hides its photos by default')
    assert.equal(studio.pages[0].sections[0].media, 'full', 'a case study opens with its picture, full width')
    assert.ok(studio.media.shots.some((x) => x.per === 'project'), 'project pages need pictures per project')
    assert.ok(!defaultPagesFor('spa').some((p) => p.type === 'team') && purposes.spa.noun !== 'Practice', 'a spa is not a clinic')
    const shop = composeRecipe({ ...specFromSeed(recipeSeeds.find((x) => x.spec.purpose === 'fashion') ?? recipeSeeds[0]), purpose: 'studio' })
    assert.ok(!shop.references.some((x) => /fashion|e-commerce/i.test(x.title)), 'a studio on a fashion seed studies studios, not stores')
  }

  // Room to invent, 2026-10-07 (decision 32): every look carries what its best sites are known for, and every package
  // keeps the owner's picks while asking the builder to design the rest — never "do not invent" or "do not add".
  {
    const { lookKnowledge } = await import('../src/data/look-knowledge')
    const slugs = new Set(Object.keys(JSON.parse(readFileSync('src/data/example-specs.generated.json', 'utf8'))))
    for (const id of Object.keys(directions) as DirectionId[]) {
      const k = lookKnowledge[id]
      assert.ok(k, `${id}: look knowledge`)
      assert.ok(k.moves.length >= 3 && k.craft.length >= 2 && k.sparks.length >= 2 && k.traps.length >= 1 && k.seen.length >= 1, `${id}: knowledge has moves, craft, sparks, traps, seen`)
      for (const x of k.seen.filter((x) => x.startsWith('example:'))) assert.ok(slugs.has(x.slice(8)), `${id}: ${x} is a built example`)
      for (const x of [...k.moves, ...k.craft, ...k.sparks, ...k.traps]) assert.ok(!/\bGSAP\b|React Bits|Aceternity/i.test(x), `${id}: knowledge never needs a forbidden library — ${x}`)
    }
    for (const seed of recipeSeeds.slice(0, 4)) {
      const r = composeRecipe(specFromSeed(seed))
      for (const [id, a] of Object.entries(adapters)) {
        const text = (await a.generate(r)).files.map((f) => f.content).join('\n')
        assert.ok(/Room to invent/.test(text), `${seed.slug} · ${id}: the package gives room to invent`)
        assert.ok(text.includes(r.style.sparks[0]), `${seed.slug} · ${id}: the package carries the look's sparks`)
        assert.ok(!/do not invent|Do not add others|Never an effect nobody picked/i.test(text), `${seed.slug} · ${id}: nothing forbids inventing`)
      }
    }
  }

  // Interaction craft, 2026-10-08 (decision 50): every package says how controls, motion and phones feel — adapted from
  // Emil Kowalski's skills (MIT) — with its curves and times as tokens and its checks in the definition of done.
  {
    for (const seed of recipeSeeds) {
      const r = composeRecipe(specFromSeed(seed))
      const qa = visualQa(r).join('\n')
      assert.ok(/scale 0\.97/.test(qa) && /Worst case/.test(qa) && /svh/.test(qa) && /gentler, not gone/.test(qa), `${seed.slug}: QA checks feel, worst case, phone and reduced motion`)
      for (const p of [...r.motion.patterns, ...r.signatures]) for (const v of Object.values(p)) if (typeof v === 'string') assert.ok(!/transition:\s*all|scale\(0\)|\bease-in\b(?!-out)/.test(v), `${seed.slug}: ${p.name} never asks for transition: all, scale(0) or ease-in`)
    }
    const r = composeRecipe(specFromSeed(recipeSeeds[0]))
    for (const [id, a] of Object.entries(adapters)) {
      const tokens = (await a.generate(r)).files.find((f) => f.path.endsWith('tokens.css'))!.content
      assert.match(tokens, /--ease-out: cubic-bezier\(0\.23, 1, 0\.32, 1\)/, `${id}: tokens.css ships the strong curves`)
      assert.match(tokens, /--duration-menu: 200ms/, `${id}: tokens.css ships the UI times`)
    }
    const craft = (await adapters['claude-code'].generate(r)).files.find((f) => f.path === '.claude/skills/interaction-craft/SKILL.md')?.content ?? ''
    assert.ok(craft.includes('Copyright (c) 2026 Emil Kowalski') && craft.includes('Permission is hereby granted'), 'interaction-craft carries its MIT notice')
    assert.ok(craft.includes(`themeColor: '${r.visualSystem.palette.tokens[0].hex}'`), 'theme-color is the page ground')
    const still = composeRecipe(remix(specFromSeed(recipeSeeds[3]), { motion: 'still' }))
    assert.ok((await adapters['claude-code'].generate(still)).files.some((f) => f.path.includes('interaction-craft')), 'a still site gets interaction craft too')
    assert.ok((await adapters.cursor.generate(r)).files.some((f) => f.path === '.cursor/rules/interaction-craft.mdc'), 'Cursor gets the craft rule')
    // Seasoning — smooth loaders, micro-interactions, parallax: salt, not sauce. Every tool gets the dose and the guide.
    for (const seed of recipeSeeds) {
      const sr = composeRecipe(specFromSeed(seed))
      assert.ok(visualQa(sr).some((l) => l.startsWith('Seasoning')), `${seed.slug}: QA checks the seasoning`)
      assert.ok(!lovableKnowledge(sr).endsWith('…'), `${seed.slug}: Lovable knowledge is never cut off`)
      for (const [id, a] of Object.entries(adapters)) {
        const text = (await a.generate(sr)).files.map((f) => f.content).join('\n')
        assert.ok(/## Seasoning — smooth loaders, micro-interactions, parallax/.test(text) && /# Interaction craft/.test(text), `${seed.slug} · ${id}: the package carries the seasoning and the craft guide`)
      }
    }
    const stillSeason = recipeToMarkdown(still)
    assert.match(stillSeason, /### Parallax — none/, 'a still site gets no parallax')
    assert.ok(!/animation-timeline/.test(stillSeason.split('## Seasoning')[1].split('\n## ')[0]), 'a still site is never told how to build parallax')
    // Raster School (#22): a pill menu is round by definition — never the default on a site with square corners.
    for (const purpose of ['course', 'saas', 'product', 'nonprofit'] as const) assert.ok(!/pill/.test(composeRecipe({ ...specFromSeed(recipeSeeds[0]), direction: 'swiss-modern', purpose, nav: undefined, shape: 'sharp' }).chrome.nav.id), `${purpose}: no pill menu on a sharp site`)
    // Raster School (#22): a course taught “in our studio or online” was read as a shop — a bare “online” sells nothing.
    assert.equal(purposeFrom('A six-week evening course in typographic design: grids, lettering and a poster of your own at the end. Twelve seats a cohort, in our studio or online.'), 'course', 'a course taught online is a course')
    assert.equal(purposeFrom('Hand-thrown mugs, sold in our online shop.'), 'ecommerce', 'an online shop still sells')
    for (const src of [...Object.values(pieceSource), ...Object.values(blockSource), ...Object.values(heroSource)]) assert.ok(!/scale: 0[ ,}]|transition:\s*all|transition-all/.test(src!), 'no shipped piece or section enters from scale(0) or transitions all')
  }

  // Decision 52: a site lends only the parts that carry its design, and a taken part never replaces what the kind of
  // site needs (a booking, the address, prices, questions…) — those are the engine's, picked or not.
  {
    const { SIGNATURE_PARTS } = await import('../src/features/library/collection')
    const items = [...SIGNATURE_PARTS].map((id) => ({ kind: 'section' as const, id }))
    for (const purpose of Object.keys(purposes).filter((x) => x !== 'other') as (keyof typeof purposes)[]) {
      const base = start(EMPTY_PLAN, purpose)
      const after = applyItems(base, items, true).plan
      for (const pg of base.pages) {
        const kept = after.pages.find((x) => x.id === pg.id)!.sections.map((x) => x.id)
        for (const x of pg.sections) if (!SIGNATURE_PARTS.has(x.id)) assert.ok(kept.includes(x.id), `${purpose} · ${pg.label}: taking parts keeps its ${x.id}`)
      }
    }
  }

  console.log(`✓ ${recipeSeeds.length} recipes × ${Object.keys(adapters).length} adapters, remix and asset logic OK`)
}

main().catch((e) => { console.error(e); process.exit(1) })
