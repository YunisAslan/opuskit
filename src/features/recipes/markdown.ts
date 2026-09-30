// Universal Recipe → Markdown. Shared by "copy section" buttons and every Build Package adapter.

import { resources } from '@/data/resources'
import { inspirationSources } from '@/data/patterns'
import type { FontSpec, UniversalRecipe } from '@/types/domain'

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

  color: (r: UniversalRecipe) => {
    const p = r.visualSystem.palette
    const rows = p.tokens.map((t) => `| ${t.role} | \`${t.hex}\` | ${t.purpose} | ${t.usage} | ${t.contrast ?? '—'} |`).join('\n')
    const css = p.tokens.map((t) => `  --color-${t.role}: ${t.hex};`).join('\n')
    const rot = r.visualSystem.rotation
    return `## Color System — ${p.name}\n\n| Role | Hex | Purpose | Usage | Contrast |\n|---|---|---|---|---|\n${rows}\n\n\`\`\`css\n:root {\n${css}\n}\n\`\`\``
      + (rot ? `\n\n### Colour chapters — ${rot.name}\n\n${rot.line}. ${rot.why} The page stays on the palette above; each chapter section (Colour Chapters, and any section you mark as a chapter) takes the next colour in turn as a full field — \`--color-chapter-1\` ${rot.colors[0]}, \`--color-chapter-2\` ${rot.colors[1]}, \`--color-chapter-3\` ${rot.colors[2]}. Never two chapter colours in one view; never a thin stripe of one.` : '')
  },

  typography: (r: UniversalRecipe) => {
    const t = r.visualSystem.typography
    return `## Typography — ${t.name}\n\n| Role | Family | Weight | Size | Line-height | Letter-spacing | Use |\n|---|---|---|---|---|---|---|\n${font('Display', t.display)}\n${font('Heading', t.heading)}\n${font('Body', t.body)}\n${font('Utility', t.utility)}\n\nSource: ${t.source} (${t.googleFamilies.map((g) => g.split(':')[0].replace(/\+/g, ' ')).join(', ')})\n\n**Why this pairing works:** ${t.why}`
  },

  layout: (r: UniversalRecipe) => {
    const l = r.layoutSystem
    const s = r.visualSystem.spacing
    return `## Layout System — ${l.name}\n\n| | |\n|---|---|\n| Container | ${l.container} |\n| Grid | ${l.grid} |\n| Columns | ${l.columns} |\n| Gutters | ${l.gutters} |\n| Section spacing | ${l.sectionSpacing} |\n| Alignment | ${l.alignment} |\n| Hero composition | ${l.heroComposition} |\n| Card proportions | ${l.cardProportions} |\n| Media proportions | ${l.mediaProportions} |\n\n**Spacing scale (base ${s.base}):** ${s.scale.join(', ')}. ${s.note}\n\n### Shape — ${r.visualSystem.shape.name}\n\n${r.visualSystem.shape.line} Buttons ${r.visualSystem.shape.button}, cards ${r.visualSystem.shape.card}, media ${r.visualSystem.shape.media}, borders ${r.visualSystem.shape.border}, shadow ${r.visualSystem.shape.shadow}. ${r.visualSystem.shape.rule}\n\n### Menu — ${r.chrome.nav.name}\n\n${r.chrome.nav.line}\n- **Composition:** ${r.chrome.nav.composition}\n- **Behavior:** ${r.chrome.nav.behavior}\n- **Responsive:** ${r.chrome.nav.responsive}` + (r.chrome.nav.components.length ? `\n- **Start from:** ${r.chrome.nav.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens and type; never ship a component’s demo look.` : '')
  },

  structure: (r: UniversalRecipe) => {
    const section = (s: UniversalRecipe['chrome']['navbar'], i: number) =>
      `### ${String(i + 1).padStart(2, '0')} ${s.name}\n- **Purpose:** ${s.purpose}\n- **Composition:** ${s.composition}\n- **Content:** ${s.content}\n- **Behavior:** ${s.behavior}\n- **Responsive:** ${s.responsive}${s.note ? `\n- **Recipe note:** ${s.note}` : ''}${'code' in s && s.code ? `\n- **Ready code:** \`${s.code.path}\` → \`${s.code.usage}\` — start from it: real copy and media through props, \`link={Link}\` (next/link) for in-site links, proportions tuned to this recipe, tokens only.` : ''}`
    const pages = r.pages.map((p) => `## ${p.label}\n\n${p.purpose}\n\n${p.sections.map(section).join('\n\n') || '_No composed sections — see purpose above._'}`).join('\n\n---\n\n')
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
          + `\n- **Composition:** ${x.composition}\n- **Behavior:** ${x.behavior}\n- **Responsive:** ${x.responsive}\n- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.`
          + (x.components.length ? `\n- **Start from:** ${x.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens and type; never ship a component’s demo look.` : '')
      })() : '')
  },

  motion: (r: UniversalRecipe) =>
    `## Motion System — ${r.motion.level.name}\n\n${r.motion.principle}\n\n**Rule:** animation for demonstration, not decoration.\n\n**Libraries:** ${r.motion.libraries.join(', ')}\n\n` +
    r.motion.patterns.map((p) => `### ${p.name}\n- **Purpose:** ${p.purpose}\n- **Trigger:** ${p.trigger}\n- **Behavior:** ${p.behavior}\n- **Duration:** ${p.duration}\n- **Easing:** ${p.easing}\n- **Implementation:** ${p.implementation}\n- **Performance:** ${p.performance}\n- **Reduced motion:** ${p.reducedMotion}`).join('\n\n'),

  signatures: (r: UniversalRecipe) => r.signatures.length
    ? `## Signature Moments\n\nThe small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.\n\n${r.signatures.map((s) => `### ${s.name} — ${s.where}\n- **What visitors experience:** ${s.experience}\n- **How:** ${s.implementation}\n- **Mobile:** ${s.mobile}\n- **Reduced motion:** ${s.reducedMotion}` + (s.components?.length ? `\n- **Start from:** ${s.components.map((c) => `[${c.name}](${c.url})`).join(', ')} — restyle to this recipe’s tokens; never ship the demo look.` : '')).join('\n\n')}`
    : '## Signature Moments\n\nNone — this recipe keeps interaction deliberately quiet.',

  kit: (r: UniversalRecipe) => r.pieces.length
    ? `## Your Kit — ready pieces\n\nThe owner picked these components. Their code is already in the project at \`src/components/pieces/\` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (\`--color-*\`, \`--font-*\`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.\n\n${r.pieces.map((p) => `### ${p.name} — ${p.where}\n${p.line}\n- **Code:** \`${p.path}\` → \`import { ${p.exportName} } from '@/components/pieces/${p.file.replace(/\.tsx$/, '')}'\`\n- **Use:** \`${p.usage}\`\n${p.rules.map((x) => `- ${x}`).join('\n')}` + (p.issue ? `\n- **Note:** ${p.issue}` : '')).join('\n\n')}\n\nLicences: adapted from MIT-licensed libraries — see \`THIRD-PARTY-NOTICES.md\`.`
    : '',

  content: (r: UniversalRecipe) => {
    const c = r.contentDirection
    return `## Content Direction\n\n- **Tone:** ${c.tone}\n- **Voice:** ${c.voice}\n- **Headline style:** ${c.headlineStyle}\n- **Headline examples:** ${c.headlineExamples.map((h) => `"${h}"`).join(', ')}\n- **Paragraph length:** ${c.paragraphLength}\n- **CTA style:** ${c.ctaStyle}\n- **CTA examples:** ${c.ctaExamples.map((h) => `"${h}"`).join(', ')}\n- **Content density:** ${c.density}\n- **Words to avoid:** ${c.wordsToAvoid.map((w) => `"${w}"`).join(', ')}`
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

export type RecipeSectionKey = keyof typeof recipeSections

export const recipeToMarkdown = (r: UniversalRecipe) =>
  Object.values(recipeSections).map((fn) => fn(r)).filter(Boolean).join('\n\n---\n\n') + '\n'
