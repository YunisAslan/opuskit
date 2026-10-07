// v0 (v0.app): no repo context file. Context = a prompt built from product surface + context of use + constraints/taste,
// plus attachments (md, css, images) and optional account-level Instructions (Title + Rule).
// Docs: https://v0.app/docs/text-prompting · https://v0.app/docs/instructions · https://vercel.com/blog/how-to-prompt-v0

import { purposes } from '@/data/taxonomy'
import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import type { BuildPackageAdapter, UniversalRecipe } from '@/types/domain'
import { assertComplete, assetManifest, manifestJson, tokensCss, visualQa } from './shared'

function prompt(r: UniversalRecipe) {
  const t = r.visualSystem.typography
  const c = Object.fromEntries(r.visualSystem.palette.tokens.map((x) => [x.role, x.hex]))
  const p = purposes[r.metadata.spec.purpose]
  return `Build the site for a ${p.noun.toLowerCase()} — "${r.title}".

## Product surface
Pages, in this order:
${r.pages.map((pg, i) => `${i + 1}. ${pg.label} (${pg.type}) — ${pg.purpose}`).join('\n')}

Every page shares this navbar and footer:
- Navbar: ${r.chrome.navbar.composition}
- Footer: ${r.chrome.footer.composition}

Sections per page:
${r.pages.map((pg) => `### ${pg.label}\n${pg.sections.map((s, i) => `${i + 1}. ${s.name}: ${s.composition}. Content: ${s.content}.${s.note ? ` Note: ${s.note}` : ''}`).join('\n')}`).join('\n\n')}

Components: ${r.components.map((x) => x.id).join(', ')}. Render every image/video through a single <MediaAsset id="…"/> component that reads from a config object (see attached manifest) — no hardcoded media paths.

## Context of use
Visitors come to ${p.hint.toLowerCase()}. They should feel: ${r.creativeDirection.mood.join(', ').toLowerCase()}. Primary action: ${r.contentDirection.ctaExamples[0]}. ${r.contentDirection.ctaStyle}

## Constraints & taste
- Next.js App Router, TypeScript, Tailwind CSS. Use the attached tokens.css as globals.
- Colors (exact): background ${c.background}, surface ${c.surface}, text ${c.text}, muted ${c.muted}, primary ${c.primary}, accent ${c.accent} (accent < 5% of any view), border ${c.border}.
- Fonts via next/font/google: display ${t.display.family} ${t.display.weight} (${t.display.size}, line-height ${t.display.lineHeight}, letter-spacing ${t.display.letterSpacing}); headings ${t.heading.family} ${t.heading.weight}; body ${t.body.family} ${t.body.size}/${t.body.lineHeight}; labels ${t.utility.family}${t.utility.uppercase ? ' uppercase' : ''} ${t.utility.letterSpacing}.
- Layout: ${r.layoutSystem.name}. ${r.layoutSystem.container}. ${r.layoutSystem.columns}. Section spacing ${r.layoutSystem.sectionSpacing}.
- Hero: ${r.media.hero.name} — ${r.media.hero.composition}
- Motion: ${r.motion.level.name}. ${r.motion.principle} Respect prefers-reduced-motion.
- Copy tone: ${r.contentDirection.tone}. Headline examples: ${r.contentDirection.headlineExamples.map((h) => `"${h}"`).join(', ')}.
- Do: ${r.creativeDirection.do.join('; ')}.
- Don't: ${r.creativeDirection.avoid.join('; ')}; no shadcn default look, no gradients, no generic SaaS cards.
- Not the generic AI look: ${r.creativeDirection.genericAvoid.join('; ')}.
- Controls and forms: shadcn/ui ${r.implementation.ui.components.map((x) => x.slug).join(', ')} — restyled to these colors, fonts and ${r.visualSystem.shape.name.toLowerCase()} shape (buttons ${r.visualSystem.shape.button}, cards ${r.visualSystem.shape.card}). Date fields = Calendar in a Popover; no native select/date inputs.
- Mobile-first; no horizontal scroll at 390px.

## Room to invent
Keep exactly: the colors, fonts, pages, section order and the facts in the copy. Everything else — composition inside each section, how sections hand over, type moments, every hover and state — is yours to design as a ${r.style.look} designer would. This style is known for: ${r.style.moves.join('; ')}. Give every page one moment people remember (Home: the hero); start from these sparks or invent better: ${r.style.sparks.join('; ')}. Avoid: ${r.style.traps.join('; ')}. Name the moments you added when you finish.
The attached recipe.md contains the full design rationale. Build static layout first; motion comes in a follow-up.`
}

export const v0Adapter: BuildPackageAdapter = {
  id: 'v0',
  name: 'v0',
  description: 'A context-rich build prompt with visual direction, constraints, references, and assets.',
  receives: ['Primary build prompt', 'Reusable v0 Instruction', 'Follow-up prompts', 'tokens.css to attach', 'Full recipe to attach', 'Asset manifest'],
  async generate(r) {
    assertComplete(r)
    return {
      recipeId: r.id, target: 'v0', assets: assetManifest(r),
      files: [
        { path: 'PROMPT.md', content: prompt(r) + '\n' },
        { path: 'INSTRUCTION.md', content: `# v0 Instruction\n\nAdd via the + menu → Instructions. Toggle it on for this chat.\n\n**Title:** ${r.title} design rules\n\n**Rule:**\nKeep what the attached recipe.md fixes: only its colors and fonts, its pages and section order, the facts in its copy. Design the rest yourself, from its Room to invent and What this style is known for. Render media through <MediaAsset/>. Never add gradients, glassmorphism, generic cards or stock SaaS sections. Every animation needs a prefers-reduced-motion fallback.\n` },
        { path: 'FOLLOW-UPS.md', content: `# Follow-up prompts (send one at a time)\n\n1. "Make every section responsive. Mobile is its own composition: ${r.implementation.responsive.slice(0, 3).join(' ')}"\n2. "Add motion: ${r.motion.patterns.filter((p) => p.id !== 'state-feedback').map((p) => `${p.name} (${p.behavior})`).join('; ') || 'hover and focus states only'}. Each must respect prefers-reduced-motion."\n${r.signatures.length ? `3. "Add these signature moments exactly where placed: ${r.signatures.map((x) => `${x.name} on ${x.where} — ${x.experience} ${x.implementation} Mobile: ${x.mobile}`).join(' ')} Respect prefers-reduced-motion."\n\n` : ''}${r.signatures.length ? 4 : 3}. "Review against this checklist and fix deviations: ${visualQa(r).slice(0, 6).join(' ')}"\n\nUse Design Mode for small visual tweaks instead of prompting.\n` },
        { path: 'attachments/tokens.css', content: tokensCss(r) },
        { path: 'attachments/recipe.md', content: recipeToMarkdown(r) },
        { path: 'attachments/manifest.json', content: manifestJson(r) },
        { path: 'references.md', content: S.references(r) + '\n' },
      ],
      instructions: `1. In v0, add INSTRUCTION.md as an Instruction (+ menu → Instructions) and toggle it on.\n2. Start a new chat. Attach the three files in attachments/ (tokens.css, recipe.md, manifest.json) and any real images you have.\n3. Paste PROMPT.md as your message.\n4. Send the prompts in FOLLOW-UPS.md one at a time.`,
    }
  },
}
