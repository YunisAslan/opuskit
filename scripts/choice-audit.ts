// Do the recipe's options (the kit's choices, and what a recipe carries in from its source) change what the AI is told to build?
// For every choice, every option is applied to the spec to 10 different starting
// sites, the recipe is composed, and its design-relevant output is fingerprinted. Reported per question:
//   • ignored  — the option was overridden by the engine, so picking it changed nothing
//   • twins    — two options that produce the identical output in most starting sites
//   • reach    — how many output areas the question changes (palette, type, hero, pages, copy…)
// Run: npx tsx scripts/choice-audit.ts
import { palettes, typography } from '../src/data/ingredients'
import { EFFECTS, heroes, imagePresentations, navStyles, shapeStyles, signaturePatterns } from '../src/data/patterns'
import { recipeSeeds } from '../src/data/recipes'
import { directions, families, goals, motionLevels, purposes } from '../src/data/taxonomy'
import { composeRecipe, defaultPagesFor, normalizeSpec, resolveHero, specFromSeed } from '../src/features/recipes/engine'
import type { DirectionId, MotionLevel, RecipeSpec, UniversalRecipe } from '../src/types/domain'

const defaults = (id: DirectionId) => { const x = directions[id].defaults; return { palette: x.palette, typography: x.typography, layout: x.layout, lead: x.lead, motion: x.motion, hero: undefined, customPalette: undefined } }

/** Design-relevant output, by area. Two options are twins when every area matches. */
function fingerprint(r: UniversalRecipe): Record<string, string> {
  return {
    colors: r.visualSystem.palette.tokens.map((t) => t.hex).join(),
    type: r.visualSystem.typography.id,
    shape: r.visualSystem.shape.id,
    layout: r.layoutSystem.id,
    hero: r.media.hero.id,
    motion: [r.motion.level.id, ...r.motion.patterns.map((p) => p.id)].join(),
    menu: r.chrome.nav.id,
    touches: r.signatures.map((s) => `${s.id}@${s.where}`).join(),
    pages: r.pages.map((p) => `${p.label}:${p.sections.map((s) => s.id).join('+')}`).join(),
    controls: r.implementation.ui.components.map((c) => c.slug).join(),
    copy: [r.contentDirection.headlineExamples, r.contentDirection.ctaExamples, r.contentDirection.ctaStyle, r.contentDirection.tone].flat().join('|'),
    direction: [...r.creativeDirection.visualPrinciples, ...r.creativeDirection.do, ...r.creativeDirection.avoid].join('|'),
    photos: r.media.imagery?.presentation.id ?? '',
    assets: r.assetRequirements.map((a) => `${a.label}:${a.status}`).join(),
  }
}

type Q = { id: string; options: string[]; apply: (s: RecipeSpec, o: string) => RecipeSpec; kept: (s: RecipeSpec, o: string) => boolean; applies?: (s: RecipeSpec) => boolean }
const Qs: Q[] = [
  { id: 'purpose', options: Object.keys(purposes), apply: (s, o) => ({ ...s, purpose: o as RecipeSpec['purpose'], pages: defaultPagesFor(o as RecipeSpec['purpose']) }), kept: (s, o) => s.purpose === o },
  { id: 'goal', options: Object.keys(goals), apply: (s, o) => ({ ...s, brief: { ...s.brief, goal: o as never } }), kept: (s, o) => s.brief?.goal === o },
  { id: 'feel', options: Object.keys(families), apply: (s, o) => { const d = families[o as keyof typeof families].directions[0]; return { ...s, direction: d, base: directions[d].baseRecipe, ...defaults(d) } }, kept: () => true },
  { id: 'direction', options: Object.keys(directions), apply: (s, o) => ({ ...s, direction: o as DirectionId, base: directions[o as DirectionId].baseRecipe, ...defaults(o as DirectionId) }), kept: (s, o) => s.direction === o },
  { id: 'first screen', options: EFFECTS.map((e) => e.hero), apply: (s, o) => { const e = EFFECTS.find((x) => x.hero === o)!; return { ...s, hero: e.hero, lead: e.lead, motion: e.motion } }, kept: (s, o) => resolveHero(s).id === o },
  { id: 'motion', options: Object.keys(motionLevels), apply: (s, o) => ({ ...s, motion: o as MotionLevel }), kept: (s, o) => s.motion === o,
    applies: (s) => true },
  { id: 'palette', options: Object.keys(palettes), apply: (s, o) => ({ ...s, palette: o as RecipeSpec['palette'], customPalette: undefined }), kept: (s, o) => s.palette === o },
  { id: 'typography', options: Object.keys(typography), apply: (s, o) => ({ ...s, typography: o as RecipeSpec['typography'] }), kept: (s, o) => s.typography === o },
  { id: 'shape', options: Object.keys(shapeStyles), apply: (s, o) => ({ ...s, shape: o as RecipeSpec['shape'] }), kept: (s, o) => s.shape === o },
  { id: 'menu', options: Object.keys(navStyles), apply: (s, o) => ({ ...s, nav: o as RecipeSpec['nav'] }), kept: (s, o) => s.nav === o },
  // Special touches are checked separately below, the way the engine offers them.
  { id: 'photo layout', options: Object.keys(imagePresentations), apply: (s, o) => ({ ...s, lead: 'photography', imagePresentation: o as RecipeSpec['imagePresentation'] }), kept: (s, o) => s.imagePresentation === o },
]

const contexts = recipeSeeds.map((seed) => ({ name: seed.slug, spec: { ...specFromSeed(seed), target: 'claude-code' as const } }))
const areas = Object.keys(fingerprint(composeRecipe(contexts[0].spec)))

for (const q of Qs) {
  const ignored = new Map<string, number>()
  const twins = new Map<string, number>()
  const reach = new Set<string>()
  let pairsTotal = 0, diffSum = 0
  for (const c of contexts) {
    const prints = new Map<string, Record<string, string>>()
    for (const o of q.options) {
      const next = normalizeSpec(q.apply(c.spec, o))
      if (!q.kept(next, o)) ignored.set(o, (ignored.get(o) ?? 0) + 1)
      const r = composeRecipe(next)
      prints.set(o, fingerprint(r))
    }
    const os = [...prints.keys()]
    for (let i = 0; i < os.length; i++) for (let j = i + 1; j < os.length; j++) {
      const a = prints.get(os[i])!, b = prints.get(os[j])!
      const diff = areas.filter((k) => a[k] !== b[k])
      diff.forEach((k) => reach.add(k))
      pairsTotal++; diffSum += diff.length
      if (!diff.length) { const key = `${os[i]} = ${os[j]}`; twins.set(key, (twins.get(key) ?? 0) + 1) }
    }
  }
  const n = contexts.length
  console.log(`\n■ ${q.id} — ${q.options.length} options · changes ${reach.size}/${areas.length} areas (${[...reach].join(', ')}) · avg ${(diffSum / pairsTotal).toFixed(1)} areas between two options`)
  const ig = [...ignored].filter(([, k]) => k > 0).sort((a, b) => b[1] - a[1])
  if (ig.length) console.log(`  ignored: ${ig.map(([o, k]) => `${o} (${k}/${n})`).join(', ')}`)
  const tw = [...twins].filter(([, k]) => k >= Math.ceil(n * 0.8)).sort((a, b) => b[1] - a[1])
  if (tw.length) console.log(`  twins (identical in ≥80% of sites): ${tw.map(([p, k]) => `${p} (${k}/${n})`).join('; ')}`)
  if (!ig.length && !tw.length) console.log('  ✓ every option is kept and distinct')
}

// Hero ↔ movement: which movement levels can actually be chosen after each first screen.
console.log('\n■ motion availability per first screen:', EFFECTS.map((e) => `${e.hero}: ${heroes[e.hero].motion.join('/')}`).join(' · '))

// ─── Deeper checks ─────────────────────────────────────────────────────────
import { signatureChoices } from '../src/features/recipes/engine'

// (a) Special touches as the engine offers them: only placeable options are shown, and an option whose
// section is already taken is blocked (with a note) instead of accepted and silently dropped.
{
  let shown = 0, attempts = 0, blocked = 0, dropped = 0
  for (const c of contexts) {
    const choices = signatureChoices(composeRecipe(normalizeSpec(c.spec)))
    shown += choices.length
    for (let start = 0; start < choices.length; start++) {
      let picked: string[] = []
      for (const o of [...choices.slice(start), ...choices.slice(0, start)].map((x) => x.id)) {
        if (picked.length === 4) break
        attempts++
        const next = [...picked, o]
        const got = composeRecipe(normalizeSpec({ ...c.spec, signatures: next })).signatures.map((x) => x.id)
        if (!got.includes(o)) { blocked++; continue } // no free spot for it
        dropped += picked.filter((p) => !got.includes(p)).length // accepting o must never push out an earlier pick
        picked = got
      }
    }
  }
  console.log(`\n■ special touches — ${signaturePatterns.length} in the library, avg ${(shown / contexts.length).toFixed(1)} offered per site · ${blocked}/${attempts} tries shown as "No free spot" · ${dropped} earlier picks lost ${dropped ? '✗' : '✓'}`)
}

// (b) Styles that differ only in things later questions override anyway (colors, lettering, shape, menu).
{
  const later = new Set(['colors', 'type', 'shape', 'menu'])
  const twins = new Map<string, number>()
  for (const c of contexts) {
    const prints = Object.keys(directions).map((d) => [d, fingerprint(composeRecipe(normalizeSpec({ ...c.spec, direction: d as DirectionId, base: directions[d as DirectionId].baseRecipe, ...defaults(d as DirectionId) })))] as const)
    for (let i = 0; i < prints.length; i++) for (let j = i + 1; j < prints.length; j++) {
      const diff = areas.filter((k) => !later.has(k) && prints[i][1][k] !== prints[j][1][k])
      if (!diff.length) { const key = `${prints[i][0]} = ${prints[j][0]}`; twins.set(key, (twins.get(key) ?? 0) + 1) }
    }
  }
  const tw = [...twins].filter(([, k]) => k >= 8)
  console.log(`\n■ styles identical once colors/lettering/shape/menu are chosen: ${tw.length ? tw.map(([p, k]) => `${p} (${k}/10)`).join('; ') : 'none ✓'}`)
}

// (c) Feelings that lead to mostly the same styles.
{
  const f = Object.values(families)
  const rows: string[] = []
  for (let i = 0; i < f.length; i++) for (let j = i + 1; j < f.length; j++) {
    const shared = f[i].directions.filter((d) => f[j].directions.includes(d))
    const ratio = shared.length / Math.min(f[i].directions.length, f[j].directions.length)
    if (ratio >= 0.5) rows.push(`${f[i].id}/${f[j].id} share ${shared.length} of ${Math.min(f[i].directions.length, f[j].directions.length)}`)
  }
  const firsts = f.map((x) => x.directions[0])
  const sameFirst = f.filter((x, i) => firsts.indexOf(x.directions[0]) !== i).map((x) => `${x.id} starts like ${f[firsts.indexOf(x.directions[0])].id}`)
  console.log(`\n■ feelings overlapping ≥50%: ${rows.join('; ') || 'none ✓'}${sameFirst.length ? `\n  same preview card: ${sameFirst.join('; ')}` : ''}`)
}
