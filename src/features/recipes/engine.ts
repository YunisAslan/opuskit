// Design Decision Engine: deterministic composition of curated ingredients into a Universal Recipe.
// Same spec in → same recipe out. Remix = change one spec field and recompose.

import { characters, directions, leads, motionLevels, purposes } from '@/data/taxonomy'
import { colorRoles, layouts, palettes, typography } from '@/data/ingredients'
import { GENERIC_TELLS, components, heroes, media, motionPatterns, pageTypes, sections } from '@/data/patterns'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { resources } from '@/data/resources'
import { contrast, contrastLabel, isHex } from '@/lib/color'
import type {
  AssetCreationPath, AssetRequirement, AssetSpec, BuildTarget, ColorRole, ColorToken, ComponentId, HeroId, HeroPattern,
  LeadId, MotionLevel, PageBlueprint, PageSpec, PaletteColors, PaletteId, PurposeId, RecipeSeed, RecipeSpec, SectionId, TypographyId, UniversalRecipe,
} from '@/types/domain'

// ─── Spec helpers ────────────────────────────────────────────────────────────

export function defaultPagesFor(purpose: PurposeId): PageSpec[] {
  return purposes[purpose].pages.filter((p) => p.tier === 'recommended').map((p) => ({
    id: crypto.randomUUID().slice(0, 8),
    type: p.type,
    label: p.label,
    purpose: pageTypes[p.type].defaultPurpose,
    sections: p.sections ?? pageTypes[p.type].sections,
  }))
}

export function specFromSeed(seed: RecipeSeed): RecipeSpec {
  return { ...seed.spec, base: seed.slug, assets: [], pages: defaultPagesFor(seed.spec.purpose), target: 'not-sure' }
}

export function heroOptions(lead: LeadId, motion: MotionLevel): HeroPattern[] {
  return Object.values(heroes).filter((h) => h.leads.includes(lead) && h.motion.includes(motion))
}

export function resolveHero(spec: Pick<RecipeSpec, 'lead' | 'motion' | 'hero'>): HeroPattern {
  const options = heroOptions(spec.lead, spec.motion)
  const chosen = spec.hero && options.find((h) => h.id === spec.hero)
  if (chosen) return chosen
  const byLead: Record<LeadId, HeroId> = {
    photography: spec.motion === 'dynamic' || spec.motion === 'immersive' ? 'parallax-photo' : 'editorial-image',
    video: spec.motion === 'immersive' ? 'scroll-video' : 'ambient-video',
    typography: spec.motion === 'dynamic' || spec.motion === 'immersive' ? 'kinetic-type' : 'type-statement',
    product: 'product-stage', illustration: 'illustrated', '3d': 'webgl-scene',
  }
  return heroes[byLead[spec.lead]]
}

/** Keeps a spec coherent after any change (questionnaire or Remix). Only dependent decisions move. */
export function normalizeSpec(spec: RecipeSpec): RecipeSpec {
  const next = { ...spec, characters: spec.characters.slice(0, 2) }
  if (next.hero && !heroOptions(next.lead, next.motion).some((h) => h.id === next.hero)) delete next.hero
  const hero = resolveHero(next)
  if (hero.forcesLayout) next.layout = hero.forcesLayout
  const locked = directions[next.direction].layoutLocked
  if (locked) next.layout = locked
  if (next.lead !== 'video' && next.mediaPlan === 'image-to-video') delete next.mediaPlan
  if (next.customPalette && !Object.values(next.customPalette).every(isHex)) delete next.customPalette
  if (!seedBySlug[next.base]) next.base = directions[next.direction].baseRecipe
  if (next.pages.length === 0) next.pages = defaultPagesFor(next.purpose)
  return next
}

export function remix(spec: RecipeSpec, change: Partial<RecipeSpec>): RecipeSpec {
  const next = { ...spec, ...change }
  if (change.palette) delete next.customPalette
  if (change.lead && change.lead !== spec.lead) { delete next.hero; delete next.mediaPlan }
  if (change.direction) next.base = directions[change.direction].baseRecipe
  if (change.purpose && change.purpose !== spec.purpose) next.pages = defaultPagesFor(change.purpose)
  return normalizeSpec(next)
}

/** Trust boundary: specs come back from localStorage / URLs. */
// Palette/type ids retired on 2026-09-27 (the cream + trend-font library). Saved recipes are upgraded in place.
// ponytail: drop once recipes saved before that date no longer matter.
const LEGACY_PALETTE: Record<string, PaletteId> = {
  'warm-ivory': 'legal-pad', 'rice-paper': 'pink-plaster', 'dark-cinematic': 'black-box', monochrome: 'signal-white', earthy: 'celery-room',
  'muted-color': 'pink-plaster', 'deep-color': 'oxblood-room', 'high-contrast': 'hazard-yellow', 'swiss-signal': 'signal-white',
  'atelier-noir': 'bottle-green', 'midnight-signal': 'night-ink', 'gallery-cobalt': 'klein-field',
}
const LEGACY_TYPE: Record<string, TypographyId> = {
  'editorial-serif': 'high-low', 'modern-sans': 'grid-discipline', 'elegant-contrast': 'soft-couture', 'bold-display': 'photocopy-zine',
  technical: 'control-room', experimental: 'stretch-test', 'quiet-serif': 'ink-and-paper', 'swiss-grotesk': 'grid-discipline',
  'soft-humanist': 'corner-bakery', 'warm-classic': 'main-street', 'raw-grotesk': 'workshop-manual',
}

export function isValidSpec(x: unknown): x is RecipeSpec {
  if (!x || typeof x !== 'object') return false
  const s = x as Record<string, unknown>
  if (typeof s.palette === 'string' && LEGACY_PALETTE[s.palette]) s.palette = LEGACY_PALETTE[s.palette]
  if (typeof s.typography === 'string' && LEGACY_TYPE[s.typography]) s.typography = LEGACY_TYPE[s.typography]
  const inKb = (v: unknown, kb: object) => typeof v === 'string' && Object.hasOwn(kb, v)
  return inKb(s.purpose, purposes) && inKb(s.direction, directions) && inKb(s.lead, leads) && inKb(s.motion, motionLevels)
    && inKb(s.layout, layouts) && inKb(s.palette, palettes) && inKb(s.typography, typography)
    && Array.isArray(s.characters) && s.characters.every((c) => inKb(c, characters))
    && Array.isArray(s.assets) && Array.isArray(s.pages) && typeof s.base === 'string' && typeof s.target === 'string'
}

export function recommendedTarget(spec: RecipeSpec): BuildTarget {
  if (spec.target !== 'not-sure') return spec.target
  const c = complexity(spec)
  return c === 'advanced' ? 'claude-code' : c === 'moderate' ? 'cursor' : 'v0'
}

export function complexity(spec: Pick<RecipeSpec, 'lead' | 'motion'>): UniversalRecipe['metadata']['complexity'] {
  if (spec.motion === 'immersive' || spec.lead === '3d') return 'advanced'
  if (spec.motion === 'dynamic' || spec.lead === 'video') return 'moderate'
  return 'light'
}

// ─── Composition ─────────────────────────────────────────────────────────────

const uniq = <T,>(xs: T[]) => [...new Set(xs)]
const camel = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c: string) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '')
const sameCore = (a: RecipeSeed['spec'], b: RecipeSpec) =>
  a.purpose === b.purpose && a.direction === b.direction && a.lead === b.lead && a.motion === b.motion
  && a.layout === b.layout && a.palette === b.palette && a.typography === b.typography && !b.customPalette

const TEXTURED = new Set(['japanese-minimal', 'organic-modern', 'film-inspired', 'raw-editorial', 'warm-hospitality'])

const WORDS_TO_AVOID = ['Elevate your brand', 'The future of…', 'Seamless experiences', 'Unlock your potential', 'Built for modern teams', 'Cutting-edge', 'Revolutionary', 'World-class']

function paletteTokens(colors: PaletteColors, usage: Partial<Record<ColorRole, string>>): ColorToken[] {
  const bg = colors.background
  const check: Partial<Record<ColorRole, [string, string]>> = {
    text: [colors.text, bg], muted: [colors.muted, bg], primary: [colors.primary, bg], accent: [colors.accent, bg], surface: [colors.text, colors.surface],
  }
  return (Object.keys(colorRoles) as ColorRole[]).map((role) => {
    const pair = check[role]
    const ratio = pair && contrast(pair[0], pair[1])
    return {
      role, hex: colors[role].toUpperCase(), purpose: colorRoles[role].purpose, usage: usage[role] ?? colorRoles[role].usage,
      contrast: ratio ? `${role === 'surface' ? 'Text on surface' : 'On background'}: ${ratio.toFixed(2)}:1 — ${contrastLabel(ratio)}` : undefined,
    }
  })
}

function assetStatus(spec: RecipeSpec, a: AssetSpec): AssetRequirement['status'] {
  if (spec.assets.includes(a.asset) || spec.uploads?.some((u) => u.asset === a.asset)) return 'have'
  if (a.level === 'optional') return 'optional'
  if (a.asset === 'video' && spec.mediaPlan === 'image-to-video') return 'create'
  if (spec.mediaPlan === 'temporary' && a.level === 'required' && ['images', 'video', 'product-photos', 'illustrations', '3d'].includes(a.asset)) return 'temporary'
  if (a.asset === 'copy' || a.asset === 'logo') return 'create'
  return 'find'
}

const SOURCE: Record<string, string> = {
  images: 'Unsplash / Pexels', video: 'Pexels Videos / Coverr', 'product-photos': 'Own photoshoot', illustrations: 'Commissioned illustrator',
  '3d': 'Spline / Poly Haven', fonts: 'Google Fonts', copy: 'Written by you', logo: 'Your brand identity',
}

function buildAssets(spec: RecipeSpec, hero: HeroPattern): AssetRequirement[] {
  const t = typography[spec.typography]
  const list: AssetSpec[] = [
    { asset: 'logo', label: 'Logo', quantity: '1 set', level: 'required', usage: 'Navigation, footer, favicon', specs: 'SVG; dark and light versions; square symbol for favicon' },
    { asset: 'fonts', label: 'Typefaces', quantity: `${uniq([t.display.family, t.body.family, t.utility.family]).length} families`, level: 'required', usage: 'All text', specs: uniq([t.display.family, t.heading.family, t.body.family, t.utility.family]).join(', ') + ` (${t.source})` },
    { asset: 'copy', label: 'Final copy', quantity: 'All sections', level: 'required', usage: 'Headlines, body, CTAs', specs: 'Written in the recipe voice before layout; headlines ≤ 8 words' },
    ...media[spec.lead].assets,
  ]
  if (hero.id === 'scroll-video') list.push({ asset: 'video', label: 'Scrub-ready encode', quantity: '1 file', level: 'required', usage: 'Scroll-controlled hero', specs: 'ffmpeg -i hero.mp4 -g 1 -crf 23 -an hero-scrub.mp4 (all-intra for smooth seeking)' })
  if (TEXTURED.has(spec.direction)) list.push({ asset: 'images', label: 'Texture', quantity: '1–2', level: 'optional', usage: 'Subtle paper/grain overlay at ≤ 4% opacity', specs: 'Seamless tile, 1024px, WebP' })

  // Ties uploaded files to the first requirement row of the same asset type (list order), so a single
  // uploaded video backs "Hero video" rather than being claimed by every video-shaped row at once.
  const claimed = new Set<string>()
  return list.map((a) => {
    const status = assetStatus(spec, a)
    const files = (spec.uploads ?? []).filter((u) => u.asset === a.asset && u.fileId && !claimed.has(u.fileId))
    files.forEach((u) => claimed.add(u.fileId!))
    const providedFiles = files.length ? files.map((u) => ({ fileId: u.fileId!, name: u.name })) : undefined
    const providedNote = providedFiles ? `user-provided: ${providedFiles.map((f) => f.name).join(', ')}` : 'marked as available — no file attached yet'
    return {
      ...a, key: camel(a.label), status, providedFiles,
      source: status === 'have' ? providedNote : status === 'temporary' ? 'curated-placeholder' : status === 'create' && a.asset === 'video' ? 'image-to-video' : SOURCE[a.asset],
      replaceWith: status === 'have' ? '—' : `user-owned-${a.asset}`,
    }
  })
}

function videoPrompt(spec: RecipeSpec): string {
  const d = directions[spec.direction]
  const p = palettes[spec.palette]
  return [
    `Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image.`,
    `Mood: ${d.mood.join(', ').toLowerCase()}. Lighting and color stay faithful to the image; ${p.dark ? 'deep shadows, soft highlights' : 'soft natural light, gentle contrast'}.`,
    `No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water).`,
    `Duration 5–8 seconds, 16:9, 24fps, stable horizon, end frame close to start frame so it can loop.`,
  ].join(' ')
}

function buildCreationPaths(spec: RecipeSpec, reqs: AssetRequirement[]): AssetCreationPath[] {
  const missing = new Set(reqs.filter((r) => r.level === 'required' && r.status !== 'have').map((r) => r.asset))
  const paths: AssetCreationPath[] = []
  if (missing.has('video')) {
    paths.push({
      asset: 'video', title: 'Turn an image into your hero video',
      steps: ['Pick one strong still with depth (foreground + background) and a clear focal point.', 'Generate 3–4 takes with the prompt below in an image-to-video tool.', 'Choose the steadiest take; trim to 5–8s; export 1920×1080 H.264.', 'Encode a WebM and a 9:16 mobile version; export the first frame as the poster.', 'Drop files into /public/media and update the asset config — no code changes needed.'],
      prompt: videoPrompt(spec),
      settings: { 'Source': 'Your image', 'Creation': 'Image → Video', 'Suggested motion': 'Slow cinematic forward camera movement', 'Suggested duration': '5–8 seconds', 'Aspect ratio': '16:9 (plus 9:16 for mobile)', 'Usage': resolveHero(spec).name },
      tools: ['runway', 'kling-ai', 'luma', 'google-flow', 'higgsfield'],
    })
    paths.push({
      asset: 'video', title: 'Use a temporary video now, replace it later',
      steps: ['Search free libraries for a slow, single-shot clip that matches the palette.', 'Download 1080p; mark it as temporary in the asset manifest.', 'Replace before launch — the asset layer makes this a one-line change.'],
      tools: ['pexels-videos', 'coverr', 'mixkit'],
    })
  }
  if (missing.has('images')) paths.push({
    asset: 'images', title: 'Find or shoot a consistent photo set',
    steps: ['Collect 15–20 candidates with the same light direction and color temperature.', 'Select 6–10; apply one shared grade (same warmth, contrast, grain).', 'Export 2400px long edge; let next/image generate responsive sizes.', 'Crop mobile versions with the focal point centred.'],
    tools: ['unsplash', 'pexels', 'squoosh'],
  })
  if (missing.has('product-photos')) paths.push({
    asset: 'product-photos', title: 'Shoot products on a seamless background',
    steps: [`Use a paper sweep in the recipe surface color (${palettes[spec.palette].colors.surface}).`, 'One soft key light at 45°, one fill card; same lens and height for every product.', 'Shoot front, 3/4 and one detail for each product.', 'Export 2400px, compress to AVIF/WebP.'],
    tools: ['squoosh', 'unsplash'],
  })
  if (missing.has('illustrations')) paths.push({
    asset: 'illustrations', title: 'Commission or source illustrations',
    steps: ['Brief one illustrator with the palette hex values and the mood words.', 'Ask for layered SVGs (background / midground / foreground) if motion is planned.', 'Use an open-licence set temporarily while the commission is in progress.'],
    tools: ['blush', 'open-peeps', 'undraw'],
  })
  if (missing.has('3d')) paths.push({
    asset: '3d', title: 'Create the 3D hero',
    steps: ['Block out the object in Spline or Blender; keep it under 100k triangles.', 'Light with one key and one rim light; use 2–3 materials maximum.', 'Export GLB with Draco compression (< 3MB) and render a poster image from the hero camera.', 'Until ready, use a pre-rendered still as the hero.'],
    tools: ['spline', 'poly-haven', 'three-js'],
  })
  return paths
}

function pickResources(spec: RecipeSpec, textured: boolean): string[] {
  const ids = ['google-fonts', 'realtime-colors', 'webaim-contrast-checker', 'lucide']
  const byLead: Record<LeadId, string[]> = {
    photography: ['unsplash', 'pexels', 'squoosh'],
    video: ['pexels-videos', 'coverr', 'ffmpeg', 'handbrake', 'runway', 'kling-ai'],
    typography: ['google-fonts', 'fonts-in-use', 'velvetyne'],
    product: ['squoosh', 'unsplash'],
    illustration: ['blush', 'open-peeps'],
    '3d': ['spline', 'three-js', 'react-three-fiber', 'drei', 'poly-haven'],
  }
  ids.push(...byLead[spec.lead])
  if (spec.motion !== 'still') ids.push('motion')
  if (spec.motion === 'dynamic' || spec.motion === 'immersive') ids.push('gsap')
  if (spec.motion === 'immersive') ids.push('lenis')
  if (textured) ids.push('texturelabs', 'ambientcg')
  const known = new Set(resources.map((r) => r.id))
  return uniq(ids).filter((id) => known.has(id))
}

const TECH_LABEL = { css: 'CSS (transitions, scroll-driven animations)', motion: 'Motion', gsap: 'GSAP + ScrollTrigger', lenis: 'Lenis', three: 'React Three Fiber + drei' } as const

export function composeRecipe(input: RecipeSpec, id?: string): UniversalRecipe {
  const spec = normalizeSpec(input)
  const seed = seedBySlug[spec.base] ?? recipeSeeds[0]
  const direction = directions[spec.direction]
  const purpose = purposes[spec.purpose]
  const palette = palettes[spec.palette]
  const type = typography[spec.typography]
  const layout = layouts[spec.layout]
  const motion = motionLevels[spec.motion]
  const hero = resolveHero(spec)
  const lead = media[spec.lead]
  const chars = spec.characters.map((c) => characters[c])
  const sameDirection = seed.spec.direction === spec.direction
  const unchanged = sameCore(seed.spec, spec)
  const textured = TEXTURED.has(spec.direction)

  const adjective = chars[0]?.adjective ?? ''
  const composedTitle = [direction.name.includes(adjective) ? '' : adjective, direction.name, purpose.noun].filter(Boolean).join(' ')
  const title = unchanged ? seed.title : composedTitle
  const slug = unchanged ? seed.slug : camel(composedTitle).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^-/, '')

  const summary = unchanged ? seed.summary
    : `A ${purpose.noun.toLowerCase()} with a ${direction.name.toLowerCase()} direction: ${type.name.toLowerCase()} typography, a ${palette.name.toLowerCase()} palette, ${leads[spec.lead].name.toLowerCase()} leading the experience and ${motion.name.toLowerCase()} motion.`

  const colors = { ...palette.colors, ...spec.customPalette }
  const patterns = motionPatterns.filter((p) => p.levels.includes(spec.motion) && (!p.leads || p.leads.includes(spec.lead)))
  const techs = uniq(patterns.map((p) => p.tech))
  const assetRequirements = buildAssets(spec, hero)

  const resolveSection = (sid: SectionId) => {
    const base = sections[sid]
    const note = sameDirection && seed.spec.purpose === spec.purpose ? seed.sectionNotes[sid] : undefined
    return sid === 'hero'
      ? { ...base, name: `Hero — ${hero.name}`, composition: hero.composition, behavior: hero.behavior, responsive: hero.responsive, note }
      : { ...base, note }
  }
  const chrome = { navbar: resolveSection('navbar'), footer: resolveSection('footer') }
  const pages: PageBlueprint[] = spec.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map(resolveSection) }))

  const componentIds = uniq<ComponentId>([...purpose.components, 'MediaAsset', 'SectionHeader'])

  const deps: { name: string; why: string }[] = []
  if (techs.includes('motion')) deps.push({ name: 'motion', why: 'Viewport reveals, hover and layout animations in React' })
  if (techs.includes('gsap')) deps.push({ name: 'gsap', why: 'ScrollTrigger for pinned and scrubbed sequences (all plugins are free)' })
  if (techs.includes('lenis')) deps.push({ name: 'lenis', why: 'Smooth scroll synced to ScrollTrigger (desktop only)' })
  if (techs.includes('three')) deps.push({ name: 'three', why: 'WebGL renderer' }, { name: '@react-three/fiber', why: 'Declarative Three.js in React' }, { name: '@react-three/drei', why: 'Loaders, controls and helpers (useGLTF, Environment)' })

  const heading = `${type.display.family} / ${type.body.family}`

  return {
    id: id ?? seed.slug,
    title, slug, summary,
    creativeDirection: {
      mood: sameDirection ? seed.mood : uniq([...direction.mood, ...chars.map((c) => c.name)]),
      personality: sameDirection ? seed.personality : chars.map((c) => `${c.name} — ${c.line.toLowerCase()}`).join('; ') || direction.line,
      visualPrinciples: sameDirection ? seed.principles : direction.principles,
      do: sameDirection ? seed.do : direction.do,
      avoid: sameDirection ? seed.avoid : direction.avoid,
      genericAvoid: GENERIC_TELLS,
    },
    designPrinciples: uniq([...(sameDirection ? seed.principles : direction.principles), motion.principle]),
    visualSystem: {
      palette: { id: palette.id, name: spec.customPalette ? `${palette.name} (customised)` : palette.name, custom: !!spec.customPalette, dark: palette.dark, tokens: paletteTokens(colors, palette.usage) },
      typography: type,
      spacing: { base: '8px', scale: ['4', '8', '12', '16', '24', '32', '48', '64', '96', '128', '160', '240'].map((n) => `${n}px`), sectionSpacing: layout.sectionSpacing, note: 'Use only values from the scale. Space between sections is always larger than space within them.' },
      grid: { container: layout.container, columns: layout.grid, gutters: layout.gutters },
    },
    layoutSystem: {
      id: layout.id, name: layout.name, container: layout.container, grid: layout.grid, columns: layout.columns, gutters: layout.gutters,
      sectionSpacing: layout.sectionSpacing, alignment: layout.alignment, heroComposition: hero.forcesLayout ? hero.composition : layout.heroComposition,
      cardProportions: layout.cardProportions, mediaProportions: layout.mediaProportions, why: layout.why,
    },
    chrome,
    pages,
    components: componentIds.map((c) => c === 'Hero' ? { ...components.Hero, anatomy: hero.composition, behavior: hero.behavior } : components[c]),
    media: { ...lead, hero },
    motion: { level: motion, principle: motion.principle, patterns, libraries: techs.map((t) => TECH_LABEL[t]) },
    contentDirection: {
      tone: sameDirection ? seed.content.tone : chars.flatMap((c) => c.tone).join(', '),
      voice: chars.map((c) => c.voice).join(' ') || 'Plain, specific, confident.',
      headlineStyle: chars[0]?.headlineStyle ?? 'Short, specific statements',
      headlineExamples: seed.content.headlineExamples,
      paragraphLength: spec.lead === 'typography' ? '1–3 sentences; let headlines carry the page' : '2–4 sentences (40–80 words); never more than 65 characters per line',
      ctaStyle: purpose.ctaPattern,
      ctaExamples: seed.content.ctaExamples,
      wordsToAvoid: WORDS_TO_AVOID,
      density: seed.content.density,
    },
    assetRequirements,
    assetCreationPaths: buildCreationPaths(spec, assetRequirements),
    resources: pickResources(spec, textured),
    references: seed.references,
    implementation: {
      stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', ...techs.filter((t) => t !== 'css').map((t) => TECH_LABEL[t])],
      dependencies: deps,
      fileStructure: [
        'src/',
        '  app/            — routes; layout.tsx loads fonts via next/font',
        '  components/     — ' + componentIds.join(', '),
        '  config/assets.ts — asset reference layer (every image/video by key)',
        '  styles/tokens.css — palette + type tokens as CSS variables',
        techs.includes('gsap') || techs.includes('lenis') ? '  lib/motion.ts   — ScrollTrigger/Lenis setup, reduced-motion guard' : '',
        techs.includes('three') ? '  components/scene/ — R3F canvas, lazy-loaded' : '',
        'public/media/     — optimised images and videos',
      ].filter(Boolean).join('\n'),
      sequence: [
        'Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.',
        'Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.',
        `Build static layout for all ${pages.length} pages (${pages.flatMap((p) => p.sections).length} sections plus navbar and footer) with real copy — no motion yet.`,
        `Build the hero: ${hero.name}.`,
        'Make every section responsive (mobile first, then tablet and desktop).',
        spec.motion === 'still' ? 'Add state feedback (hover/focus) only.' : `Add motion in order of importance: ${patterns.filter((p) => p.id !== 'state-feedback').map((p) => p.name).join(', ')}.`,
        'Add reduced-motion variants, then run the visual QA checklist against this recipe.',
      ],
      responsive: [
        'Design mobile as its own composition, not a squeezed desktop.',
        `Hero: ${hero.responsive}`,
        `Type: display scales with clamp() — ${type.display.size}; re-break headlines manually on mobile.`,
        `Grid: ${layout.grid}; ${layout.gutters}.`,
        'Touch targets ≥ 44px; primary action reachable with a thumb.',
      ],
      accessibility: [
        'Semantic landmarks (header, nav, main, footer) and one h1 per page.',
        'Visible focus states using the accent color (2px outline, 2px offset).',
        'Every animation has a prefers-reduced-motion alternative (see Motion System).',
        'Alt text for meaningful images; empty alt for decorative ones.',
        ...(spec.lead === 'video' ? ['Video: pause control, no autoplay with sound, captions if speech.'] : []),
        ...(spec.lead === '3d' ? ['3D canvas is decorative (aria-hidden); all information also exists in HTML.'] : []),
        `Check contrast: body text must pass AA (${contrast(colors.text, colors.background).toFixed(1)}:1 on background).`,
      ],
      performance: [
        'Only the hero media uses priority loading; everything else lazy-loads.',
        'Animate transform and opacity only; avoid animating layout properties.',
        `Self-host fonts with next/font; ${heading} — subset display faces.`,
        ...(spec.lead === 'video' ? ['Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.'] : []),
        ...(spec.lead === '3d' ? ['3D: lazy-load the canvas, Draco-compress models, cap DPR at 2, stop rendering off-screen.'] : []),
        ...(techs.includes('gsap') ? ['Import only the GSAP plugins you use; kill ScrollTriggers on unmount.'] : []),
        'Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.',
      ],
    },
    whyItWorks: {
      direction: sameDirection ? seed.whyDirection : direction.why,
      typography: type.why,
      palette: spec.customPalette ? `${palette.why} Your custom colors keep the same roles, so the system still holds — check the contrast notes above.` : palette.why,
      layout: layout.why,
      motion: `${motion.why} ${patterns.length > 1 ? `Here, ${patterns.filter((p) => p.id !== 'state-feedback').slice(0, 2).map((p) => p.name.toLowerCase()).join(' and ')} serve the story: ${patterns.find((p) => p.id !== 'state-feedback')?.purpose.toLowerCase() ?? ''}` : ''}`.trim(),
      assets: lead.why,
    },
    metadata: {
      spec, familyIds: direction.families, complexity: complexity(spec), recommendedTarget: recommendedTarget(spec), version: 1,
      image: unchanged ? seed.image : direction.image,
    },
  }
}

/** Never let an incomplete Recipe reach Build Package generation. */
export function validateRecipe(r: UniversalRecipe): string[] {
  const problems: string[] = []
  if (!r.title) problems.push('title')
  if (!r.summary) problems.push('summary')
  if (r.visualSystem.palette.tokens.length !== 8) problems.push('palette tokens')
  if (!r.visualSystem.typography.display.family) problems.push('typography')
  if (r.pages.length < 1) problems.push('pages')
  if (r.pages.flatMap((p) => p.sections).length < 4) problems.push('page structure')
  if (!r.pages.some((p) => p.sections.some((s) => s.id === 'hero'))) problems.push('hero section')
  if (r.components.length < 3) problems.push('components')
  if (r.motion.patterns.length < 1) problems.push('motion system')
  if (r.assetRequirements.length < 3) problems.push('asset requirements')
  if (r.references.length < 1) problems.push('references')
  if (Object.values(r.whyItWorks).some((v) => !v)) problems.push('why it works')
  return problems
}

export const seedRecipes = () => recipeSeeds.map((s) => composeRecipe(specFromSeed(s)))
