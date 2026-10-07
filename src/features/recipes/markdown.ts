// Universal Recipe → Markdown. Shared by "copy section" buttons and every Build Package adapter.

import { chromeNote } from '@/features/recipes/engine'
import { resources } from '@/data/resources'
import { inspirationSources } from '@/data/patterns'
import { errorColor } from '@/lib/frame'
import type { FontSpec, PaletteColors, UniversalRecipe } from '@/types/domain'

const list = (xs: string[]) => xs.map((x) => `- ${x}`).join('\n')
const font = (label: string, f: FontSpec) =>
  `| ${label} | ${f.family} | ${f.weight}${f.italic ? ' italic' : ''} | ${f.size} | ${f.lineHeight} | ${f.letterSpacing}${f.uppercase ? ' (uppercase)' : ''}${f.stretch ? ` · width ${f.stretch}` : ''} | ${f.use} |`
const STATUS = { have: '✓ Have it', create: '✎ Create it', find: '⌕ Find it', temporary: '⚠ Temporary placeholder', optional: '○ Optional' } as const

export const recipeSections = {
  summary: (r: UniversalRecipe) => `# ${r.title}\n\n${r.summary}\n\nComplexity: ${r.metadata.complexity} · Recipe id: ${r.id}`,

  direction: (r: UniversalRecipe) => {
    const c = r.creativeDirection
    return `## Creative Direction\n\n**Mood:** ${c.mood.join(', ')}\n\n**Personality:** ${c.personality}\n\n### Visual principles\n${list(c.visualPrinciples)}\n\n### Do\n${list(c.do)}\n\n### Avoid\n${list(c.avoid)}\n\n### Not the generic AI look\n${list(c.genericAvoid)}\n\n### Design principles\n${list(r.designPrinciples)}`
  },

  concept: (r: UniversalRecipe) => {
    const c = r.concept
    if (!c) return ''
    return `## The Big Idea — ${c.name}\n\n${c.line} ${c.why}\n\nBuild the whole site around this one idea. Every page gets one moment that serves it, and nothing else competes with that moment.\n\n- **What guides the scroll:** ${c.motif}\n- **How each chapter opens:** ${c.chapters}\n- **The moment people remember:** ${c.moment}\n- **How the site ends:** ${c.ending}`
      + (r.signatures.length ? `\n\nIt reaches the pages through these signature moments (details in the motion recipe): ${r.signatures.map((s) => `${s.name} — ${s.where}`).join('; ')}.` : '')
  },

  style: (r: UniversalRecipe) => {
    const k = r.style
    const seen = k.seen.map((x) => (x.startsWith('example:') ? `${x.slice(8)} (built with OpusKit)` : x)).join(', ')
    return `## What ${k.look} is known for\n\nWhat the best sites in this style do — from OpusKit’s study of award sites and from the sites it has built. Not a checklist to copy: use it to design like someone who knows the style.\n\n### Its moves\n${list(k.moves)}\n\n### The craft\n${list(k.craft)}\n\n### Sparks — seeds for a remembered moment\n${list(k.sparks)}\n\n### Traps\n${list(k.traps)}\n\nLearned from: ${seen}.`
  },

  room: (r: UniversalRecipe) => `## Room to invent\n\nThis recipe fixes what the owner chose and leaves the rest to you — and a literal, safe build of it is a failure too. The test: the owner recognises every part they picked, and is surprised by how good it feels.\n\n### Locked — the owner chose these; keep them\n${list(lockedList(r))}\n\n### Free — yours to design, and expected\n${list(FREE)}\n\n### Your move\n${list(yourMove(r))}`,

  award: (r: UniversalRecipe) => `## Award checklist\n\nWhat separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.\n\n${list(awardChecklist(r))}`,

  color: (r: UniversalRecipe) => {
    const p = r.visualSystem.palette
    const rows = p.tokens.map((t) => `| ${t.role} | \`${t.hex}\` | ${t.purpose} | ${t.usage} | ${t.contrast ?? '—'} |`).join('\n')
    const css = p.tokens.map((t) => `  --color-${t.role}: ${t.hex};`).join('\n')
    const rot = r.visualSystem.rotation
    const err = errorColor(Object.fromEntries(p.tokens.map((t) => [t.role, t.hex])) as PaletteColors)
    return `## Color System — ${p.name}\n\n| Role | Hex | Purpose | Usage | Contrast |\n|---|---|---|---|---|\n${rows}\n| error | \`${err}\` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |\n\n\`\`\`css\n:root {\n${css}\n  --color-error: ${err};\n}\n\`\`\``
      + (rot ? `\n\n### Colour chapters — ${rot.name}\n\n${rot.line}. ${rot.why} The page stays on the palette above; each chapter section (Colour Chapters, and any section you mark as a chapter) takes the next colour in turn as a full field — \`--color-chapter-1\` ${rot.colors[0]}, \`--color-chapter-2\` ${rot.colors[1]}, \`--color-chapter-3\` ${rot.colors[2]}. Never two chapter colours in one view; never a thin stripe of one.` : '')
  },

  typography: (r: UniversalRecipe) => {
    const t = r.visualSystem.typography
    return `## Typography — ${t.name}\n\n| Role | Family | Weight | Size | Line-height | Letter-spacing | Use |\n|---|---|---|---|---|---|---|\n${font('Display', t.display)}\n${font('Heading', t.heading)}\n${font('Body', t.body)}\n${font('Utility', t.utility)}\n\nCaptions, prices beside pictures and small notes use \`type-caption\` (${t.body.family}, small, sentence case) — the utility role is for the menu and labels.${(['display', 'heading', 'body', 'utility'] as const).some((k) => t[k].italic) ? ` Italic roles (${(['display', 'heading', 'body', 'utility'] as const).filter((k) => t[k].italic).join(', ')}) are italic in their type-* class already.` : ''}\n\nSource: ${t.source} (${t.googleFamilies.map((g) => g.split(':')[0].replace(/\+/g, ' ')).join(', ')})\n\n**Why this pairing works:** ${t.why}`
  },

  layout: (r: UniversalRecipe) => {
    const l = r.layoutSystem
    const s = r.visualSystem.spacing
    return `## Layout System — ${l.name}\n\nThe frame is already in \`src/styles/tokens.css\`: \`--container\`, \`--gutter\`, \`--section-y\`, \`--ratio-card\`, \`--ratio-media\` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.\n\n| | |\n|---|---|\n| Container | ${l.container} |\n| Grid | ${l.grid} |\n| Columns | ${l.columns} |\n| Gutters | ${l.gutters} |\n| Section spacing | ${l.sectionSpacing} |\n| Alignment | ${l.alignment} |\n| Hero composition | ${l.heroComposition} |\n| Card proportions | ${l.cardProportions} |\n| Media proportions | ${l.mediaProportions} |\n\n**Spacing scale (base ${s.base}):** ${s.scale.join(', ')}. ${s.note}\n\n### Shape — ${r.visualSystem.shape.name}\n\n${r.visualSystem.shape.line} Buttons ${r.visualSystem.shape.button}, cards ${r.visualSystem.shape.card}, media ${r.visualSystem.shape.media}, borders ${r.visualSystem.shape.border}, shadow ${r.visualSystem.shape.shadow}. ${r.visualSystem.shape.rule}\n\n### Menu — ${r.chrome.nav.name}\n\n${r.chrome.nav.line}\n- **Composition:** ${r.chrome.nav.composition}\n- **Behavior:** ${r.chrome.nav.behavior}\n- **Responsive:** ${r.chrome.nav.responsive}` + (r.chrome.nav.components.length ? `\n- **Start from:** ${r.chrome.nav.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens and type; never ship a component’s demo look.` : '')
  },

  structure: (r: UniversalRecipe) => {
    const section = (s: UniversalRecipe['chrome']['navbar'], i: number) =>
      `### ${String(i + 1).padStart(2, '0')} ${s.name}\n- **Purpose:** ${s.purpose}\n- **Composition:** ${s.composition}\n- **Content:** ${s.content}\n- **Behavior:** ${s.behavior}\n- **Responsive:** ${s.responsive}${'tone' in s && s.tone ? `\n- **Tone:** ${s.tone} — pass \`tone="${s.tone}"\` (sets data-tone; tokens.css swaps the colours for it)` : ''}${'media' in s && s.media ? `\n- **Media:** ${s.media} — pass \`media="${s.media}"\`` : ''}${'variant' in s && s.variant ? `\n- **Design — ${s.variant.name}${s.variant.chosen ? '' : ' (recommended)'}:** ${s.variant.line} Pass \`variant="${s.variant.id}"\`.` : ''}${s.note ? `\n- **Recipe note:** ${s.note}` : ''}${'photos' in s && s.photos ? `\n- **Photos — ${s.photos.name}${s.photos.chosen ? '' : ' (recommended)'}:** ${s.photos.composition} ${s.photos.behavior} Mobile: ${s.photos.responsive}` : ''}${'code' in s && s.code ? `\n- **Reference code:** \`${s.code.path}\` → \`${s.code.usage}\` — its design to start from: real copy and media through props, \`link={Link}\` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.` : ''}`
    const pages = r.pages.map((p) => `## ${p.label}\n\n${p.purpose}\n\n${chromeNote(p) ? `**${chromeNote(p)}**\n\n` : ''}${p.sections.map(section).join('\n\n') || '_No composed sections — see purpose above._'}`).join('\n\n---\n\n')
    return `## Page Structure\n\nPages: ${r.pages.map((p) => p.label).join(' · ')}\n\n---\n\n${pages}\n\n---\n\n## Site Chrome\n\n${[r.chrome.navbar, r.chrome.footer].map(section).join('\n\n')}`
  },

  components: (r: UniversalRecipe) =>
    `## Component System\n\n| Component | Purpose | Anatomy | Behavior |\n|---|---|---|---|\n${r.components.map((c) => `| ${c.id} | ${c.purpose} | ${c.anatomy} | ${c.behavior} |`).join('\n')}`,

  media: (r: UniversalRecipe) => {
    const m = r.media
    return `## Media Direction — ${m.name}\n\n${m.direction}\n\n### Treatment\n${list(m.treatment)}\n\n**Formats:** ${m.formats}\n\n### Hero — ${m.hero.name}\n- **Composition:** ${m.hero.composition}\n- **Behavior:** ${m.hero.behavior}\n- **Responsive:** ${m.hero.responsive}\n- **Requires:** ${m.hero.requires.join('; ')}\n- **Fallback:** ${m.hero.fallback}` + (m.framing ? `\n\n### Your video’s shape\n\n${m.framing}` : '') + (m.storytelling ? `\n\n### Scroll storytelling\n\nscroll → film moves → scene changes → its message arrives → it leaves → next scene. One coordinated timeline.\n\n${list(m.storytelling)}` : '')
      + (m.imagery ? (() => {
        const i = m.imagery, x = i.presentation
        return `\n\n### Photos — ${x.name}\n\n${x.line} ${i.photos ? `${i.photos} photos supplied (${i.orientation}), in /media — keep their order.` : `Suits ${x.ideal}.`}${i.recommended === x.id ? ` Chosen because: ${i.why}.` : ' Chosen by the owner.'}`
          + (i.note ? `\n\n**Owner’s request (follow it):** “${i.note}”` : '')
          + `\n- **Composition:** ${x.composition}\n- **Behavior:** ${x.behavior}\n- **Responsive:** ${x.responsive}\n- **Where:** the site’s default for photo sets; a part with its own **Photos** line in recipe/layout.md follows that line instead.`
          + (x.components.length ? `\n- **Start from:** ${x.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens and type; never ship a component’s demo look.` : '')
      })() : '')
      + (m.shots.length ? `\n\n### Shot list — part by part\n\nWhat each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.\n\n| Where | | What it shows | Format |\n|---|---|---|---|\n${m.shots.map((x) => `| ${x.where} | ${x.kind} | ${x.shows} | ${x.format} |`).join('\n')}` : '')
  },

  webgl: (r: UniversalRecipe) => usesWebgl(r) ? `## WebGL checklist\n\nThis site draws on the GPU (${webglParts(r).join(', ')}). Every canvas follows these rules.\n\n${list(WEBGL_CHECKLIST)}` : '',

  motion: (r: UniversalRecipe) =>
    `## Motion System — ${r.motion.level.name}\n\n${r.motion.principle}\n\n**Rule:** animation for demonstration, not decoration.\n\n**Libraries:** ${r.motion.libraries.join(', ')}\n\n` +
    r.motion.patterns.map((p) => `### ${p.name}\n- **Purpose:** ${p.purpose}\n- **Trigger:** ${p.trigger}\n- **Behavior:** ${p.behavior}\n- **Duration:** ${p.duration}\n- **Easing:** ${p.easing}\n- **Implementation:** ${p.implementation}\n- **Performance:** ${p.performance}\n- **Reduced motion:** ${p.reducedMotion}`).join('\n\n'),

  signatures: (r: UniversalRecipe) => r.signatures.length
    ? `## Signature Moments\n\nThe small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.\n\n${r.signatures.map((s) => `### ${s.name} — ${s.where}\n- **What visitors experience:** ${s.experience}\n- **How:** ${s.implementation}\n- **Mobile:** ${s.mobile}\n- **Reduced motion:** ${s.reducedMotion}` + (s.components?.length ? `\n- **Start from:** ${s.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens; never ship the demo look.` : '')).join('\n\n')}`
    : `## Signature Moments\n\nNone were picked: the first screen (${r.media.hero.name})${r.pieces.length ? ' and the effects the owner picked (Your Kit)' : ''} carry Home. Every other page gets one moment you design yourself — see Room to invent: one per page, never more.`,

  kit: (r: UniversalRecipe) => r.pieces.length
    ? `## Your Kit — ready pieces\n\nThe owner picked these components. Their code is already in the project at \`src/components/pieces/\` — it does the hard part (the animation, shader or interaction, and its reduced-motion version), so build on it rather than from scratch, and do not add other animation libraries for the same job. It reads colours and fonts from the recipe tokens (\`--color-*\`, \`--font-*\`). It is a reference, not a sealed part: keep what the owner picked it for — its behaviour — and fit everything else to the site (size, place, spacing, the type around it), editing its code wherever its defaults disagree.\n\n${r.pieces.map((p) => `### ${p.name} — ${p.where}\n${p.line}\n- **Code:** \`${p.path}\` → \`import { ${p.exportName} } from '@/components/pieces/${p.file.replace(/\.tsx$/, '')}'\`\n- **Use:** \`${p.usage}\`\n${p.rules.map((x) => `- ${x}`).join('\n')}` + (p.issue ? `\n- **Note:** ${p.issue}` : '')).join('\n\n')}\n\nLicences: adapted from MIT-licensed libraries — see \`THIRD-PARTY-NOTICES.md\`.`
    : '',

  content: (r: UniversalRecipe) => {
    const c = r.contentDirection
    return `## Content Direction\n\n- **Tone:** ${c.tone}\n- **Voice:** ${c.voice}\n- **Headline style:** ${c.headlineStyle}\n- **Headline examples:** ${c.headlineExamples.map((h) => `"${h}"`).join(', ')}\n- **Paragraph length:** ${c.paragraphLength}\n- **CTA style:** ${c.ctaStyle}\n- **CTA examples:** ${c.ctaExamples.map((h) => `"${h}"`).join(', ')}\n- **Content density:** ${c.density}\n- **Words to avoid:** ${c.wordsToAvoid.map((w) => `"${w}"`).join(', ')}\n\n## Copy deck — write it before any layout\n\n${c.source}\n\n${c.copy.map((p) => `### ${p.page}\n${p.brief}\n\n${p.parts.map((x) => `- **${x.part}:** ${x.says}`).join('\n') || '- Written in full from the page brief above.'}`).join('\n\n')}`
  },

  assets: (r: UniversalRecipe) => {
    const label = (a: UniversalRecipe['assetRequirements'][number]) =>
      a.providedFiles ? `${a.label} — you provided: ${a.providedFiles.map((f) => f.name).join(', ')}` : a.status === 'have' ? `${a.label} (marked as available — no file attached yet)` : a.label
    return `## Asset Checklist — What you'll need\n\n| Status | Asset | Quantity | Level | Usage | Specs |\n|---|---|---|---|---|---|\n${r.assetRequirements.map((a) => `| ${STATUS[a.status]} | ${label(a)} | ${a.quantity} | ${a.level} | ${a.usage} | ${a.specs} |`).join('\n')}` +
    (r.assetCreationPaths.length ? '\n\n### Asset Creation Paths\n\n' + r.assetCreationPaths.map((p) => `#### ${p.title}\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}${p.prompt ? `\n\n**Prompt:**\n\n> ${p.prompt}` : ''}${p.settings ? '\n\n' + Object.entries(p.settings).map(([k, v]) => `- ${k}: ${v}`).join('\n') : ''}\n\nTools: ${p.tools.map((id) => resources.find((x) => x.id === id)?.name ?? id).join(', ')}`).join('\n\n') : '')
  },

  resources: (r: UniversalRecipe) =>
    `## Curated Resources\n\n${r.resources.map((id) => resources.find((x) => x.id === id)).filter(Boolean).map((x) => `- **${x!.name}** (${x!.category}) — ${x!.url}\n  ${x!.why} _License: ${x!.license}_`).join('\n')}`,

  references: (r: UniversalRecipe) =>
    `## References\n\nStudy the principle. Build something original — never copy a referenced site.\n\n${r.references.map((x) => `### ${x.title} (${inspirationSources.find((s) => s.id === x.source)?.name ?? x.source})\n${x.url}\n- **Study:** ${x.study}\n- **Why it matters:** ${x.why}\n- **Principle:** ${x.principle}`).join('\n\n')}`,

  why: (r: UniversalRecipe) => {
    const w = r.whyItWorks
    return `## Why It Works\n\n### Why the visual direction works\n${w.direction}\n\n### Why the typography works\n${w.typography}\n\n### Why the palette works\n${w.palette}\n\n### Why the layout works\n${w.layout}\n\n### Why the motion works\n${w.motion}\n\n### Why the chosen assets work\n${w.assets}`
  },

  ui: (r: UniversalRecipe) => {
    const u = r.implementation.ui
    return `## UI Components — ${u.library}\n\nEvery control and form uses these ready-made, accessible components (${u.url}), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.\n\n\`\`\`bash\n${u.install}\n\`\`\`\n\n| Component | Used on |\n|---|---|\n${u.components.map((c) => `| ${c.name} (\`${c.slug}\`) | ${c.where.join(', ')} |`).join('\n')}\n\n### Theme (paste over the :root values shadcn init writes)\n\n\`\`\`css\n${u.theme}\n\`\`\`\n\n### Rules\n${list(u.rules)}`
  },

  implementation: (r: UniversalRecipe) => {
    const i = r.implementation
    return `## Implementation Guide\n\n**Recommended stack:** ${i.stack.join(', ')}\n\n### Dependencies\n${i.dependencies.length ? list(i.dependencies.map((d) => `\`${d.name}\` — ${d.why}`)) : '- None beyond the stack. CSS handles all motion.'}\n\n### Suggested file structure\n\`\`\`\n${i.fileStructure}\n\`\`\`\n\n### Implementation sequence\n${i.sequence.map((s, n) => `${n + 1}. ${s}`).join('\n')}\n\n### Responsive\n${list(i.responsive)}\n\n### Accessibility\n${list(i.accessibility)}\n\n### Performance\n${list(i.performance)}`
  },
} satisfies Record<string, (r: UniversalRecipe) => string>

/** Parts of this site that render with WebGL: Paper Shader pieces, a 3D first screen, a 3D lead. */
export const webglParts = (r: UniversalRecipe) => [
  ...r.pieces.filter((p) => p.deps.includes('@paper-design/shaders-react')).map((p) => `the ${p.name} piece`),
  ...(r.media.hero.id === 'webgl-scene' || r.metadata.spec.lead === '3d' ? ['the 3D first screen'] : []),
]
export const usesWebgl = (r: UniversalRecipe) => webglParts(r).length > 0

// From docs/research/2026-10-webgl.md.
export const WEBGL_CHECKLIST = [
  'Poster first: a still image (or the CSS gradient beneath a shader) is on screen before any WebGL loads, and stays if it fails.',
  'Load it late: next/dynamic with ssr: false, mounted when the browser is idle or the canvas nears the viewport — never in the critical path.',
  'Budgets: ≤ 250 KB gzipped of JS for all GL code, models ≤ 3 MB (Draco), ≤ 100 draw calls.',
  'Device pixel ratio capped at 2 (1.5 on small screens).',
  'Render on demand: stop the frame loop when nothing moves, and pause it whenever the canvas is off-screen (IntersectionObserver) or the tab is hidden.',
  'Reduced motion: freeze the scene on a good frame (speed 0) — no movement, same look.',
  'Coarse pointers turn pointer effects off; weak GPUs (low hardwareConcurrency / deviceMemory, or a failed context) get the poster.',
  'Handle context loss (webglcontextlost / restored) and dispose geometries, materials and textures on unmount.',
  'The canvas is decorative: aria-hidden; every word and link it shows also exists as real HTML.',
  'Damp all motion (lerp 0.05–0.1); never hijack the scroll — the page moves exactly as far as the visitor scrolls.',
  'Licences: only MIT / Apache-2.0 code (Paper Shaders, three.js, OpusKit pieces); no Spline or Unicorn runtimes, LYGIA or Theatre Studio.',
  'Verify: Lighthouse on mobile and a 4× CPU-throttled run — still smooth, LCP still < 2.5 s.',
]

/** What the builder must keep: everything the owner chose, said with this recipe's own names. */
export function lockedList(r: UniversalRecipe): string[] {
  const t = r.visualSystem.typography
  const picked = [...r.pieces.map((p) => `${p.name} (${p.where})`), ...r.signatures.map((s) => `${s.name} (${s.where})`)]
  return [
    `Colours: the ${r.visualSystem.palette.name} tokens in tokens.css — tints and shades of them are fine, new hues are not.`,
    `Lettering: ${[...new Set([t.display.family, t.heading.family, t.body.family, t.utility.family])].join(', ')}, each in its role.`,
    `Pages and the order of their parts: ${r.pages.map((p) => `${p.label} (${p.sections.length ? p.sections.map((x) => x.name.split(' — ')[0]).join(' → ') : 'its own form or text'})`).join('; ')}.`,
    `Each part’s design as the owner picked it (recipe/layout.md); the menu “${r.chrome.nav.name}”, the footer “${r.chrome.footerStyle.name}”, the shape “${r.visualSystem.shape.name}”, the first screen “${r.media.hero.name}”.`,
    'The facts in the copy deck — names, prices, times, places, promises. Sharpen the wording; never the facts.',
    'The owner’s files and the shot list (what each picture shows, its ratio).',
    ...(picked.length ? [`The effects the owner picked: ${picked.join('; ')}.`] : []),
    'One system, accessibility and speed (build/verification.md).',
  ]
}

const FREE = [
  'Composition inside each part: scale, offsets, overlaps, crops, where the empty space goes — beyond the reference code’s defaults, as long as the part stays recognisable.',
  'The hand-over between parts: a shared edge, a colour turn, a line that carries on, a change of pace — the page reads as one piece, not stacked blocks.',
  'Typographic moments: where a headline breaks, one word set larger or in the italic, numerals, captions, small labels.',
  'Every state: hover, focus, press, loading, empty, success, error, the 404 — each in the style’s voice.',
  'Small details that make it feel made by hand for this owner: a caption that follows, a counter, a line in the footer, the favicon.',
  'Where the recipe is silent, decide as a designer of this style would — never the plainest default.',
]

function yourMove(r: UniversalRecipe): string[] {
  const placed = new Set(r.signatures.map((s) => s.where.split(' — ')[0]))
  const open = r.pages.slice(1).filter((p) => p.sections.length && !placed.has(p.label)).map((p) => p.label) // forms and legal pages stay plain
  const still = r.motion.level.id === 'still'
  return [
    `Every page gets one moment people remember. Home has it: the first screen (${r.media.hero.name}).${open.length ? ` Design one yourself for: ${open.join(', ')}.` : ''}`,
    `Start from the sparks in “What ${r.style.look} is known for”, or invent a better one. Make it this owner’s — tied to their words, pictures or trade — not a stock effect.`,
    still ? 'This site doesn’t move (motion: Still): your moment is composition, type or an interaction state — a size, a crop, a reveal on hover — not an animation.' : `Keep it inside the motion level (${r.motion.level.name}) and the Locked list; give it a mobile and a reduced-motion version.`,
    'Use at least three of the style’s moves and every craft detail that fits; avoid its traps.',
    'Name each moment in your plan before you build, and again in your final reply — so the owner can see what you added.',
  ]
}

/** What separates an award site from a good template — the study's findings as checks, with this recipe's own idea in them. */
export function awardChecklist(r: UniversalRecipe): string[] {
  const t = r.visualSystem.typography
  const preloader = r.pieces.some((p) => p.id === 'preloader')
  return [
    r.concept ? `One idea: everything serves “${r.concept.name}”. A part that doesn’t serve it gets quieter, not louder.` : 'One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.',
    `One moment per page that people remember — and only one: on Home it is the first screen (${r.media.hero.name})${r.signatures.length ? ', on other pages the signature moments below, and where none is placed one you design' : ', on other pages one you design (Room to invent)'}. Never a stock effect pasted in — it grows out of this style; everything else on the page supports it.`,
    `Type scale contrast: the biggest ${t.display.family} size is at least 6× the body size on desktop, labels stay small (11–14 px, ${t.utility.family}), and nothing in between competes.`,
    'Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.',
    preloader ? 'The first seconds: the preloader follows real loading and is gone within 2.5 s; the first screen is complete the moment it lifts.' : 'The first seconds: the first screen is complete and readable before anything animates.',
    'Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.',
    `The ending is designed: the footer (${r.chrome.footerStyle.name}) is a moment${r.concept ? ` — ${r.concept.ending.charAt(0).toLowerCase()}${r.concept.ending.slice(1)}` : ', not leftovers'}`,
    'Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.',
    'Smooth is part of the effect: 60 fps on a mid-range laptop; animate only transform, opacity and clip-path; nothing runs off-screen.',
  ]
}

export type RecipeSectionKey = keyof typeof recipeSections

export const recipeToMarkdown = (r: UniversalRecipe) =>
  Object.values(recipeSections).map((fn) => fn(r)).filter(Boolean).join('\n\n---\n\n') + '\n'
