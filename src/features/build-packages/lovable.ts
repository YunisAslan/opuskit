// Lovable: Project Knowledge (≤ 10,000 chars, applied to every message) + incremental prompts
// (plan first, one component at a time, say what must stay untouched). Also reads AGENTS.md from a connected repo.
// Docs: https://docs.lovable.dev/features/knowledge · https://docs.lovable.dev/prompting/prompting-one

import { purposes } from '@/data/taxonomy'
import { chromeNote } from '@/features/recipes/engine'
import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import type { BuildPackageAdapter, UniversalRecipe } from '@/types/domain'
import { assertComplete, assetManifest, manifestJson, tokensCss } from './shared'

export const LOVABLE_KNOWLEDGE_LIMIT = 10_000

export function lovableKnowledge(r: UniversalRecipe) {
  const t = r.visualSystem.typography
  const p = purposes[r.metadata.spec.purpose]
  const text = `# ${r.title}

## Product intent
${r.summary}
Type: ${p.name}. Primary action: ${r.contentDirection.ctaExamples[0]}.

## Target users
People who come to ${p.hint.toLowerCase()}. They should feel: ${r.creativeDirection.mood.join(', ').toLowerCase()}.

## Design system
Colors: ${r.visualSystem.palette.tokens.map((x) => `${x.role} ${x.hex}`).join(', ')}. Accent under 5% of any view.
Fonts: display ${t.display.family} ${t.display.weight} (${t.display.size}); heading ${t.heading.family}; body ${t.body.family} ${t.body.size}/${t.body.lineHeight}; labels ${t.utility.family}${t.utility.uppercase ? ' uppercase' : ''}.
Spacing: 8px scale. Layout: ${r.layoutSystem.name} — ${r.layoutSystem.columns}; ${r.layoutSystem.sectionSpacing}.

## Visual direction
${r.creativeDirection.visualPrinciples.map((x) => `- ${x}`).join('\n')}
Do: ${r.creativeDirection.do.join('; ')}.
Avoid: ${r.creativeDirection.avoid.join('; ')}; gradients; glassmorphism; generic cards.
Not the generic AI look: ${r.creativeDirection.genericAvoid.join('; ')}.

## Page structure
${r.pages.map((p, i) => `${i + 1}. ${p.label} — ${p.purpose}`).join('\n')}
Every page shares the navbar (${r.chrome.navbar.composition}) and footer (${r.chrome.footer.composition}).${r.pages.filter((p) => p.hide).map((p) => ` ${p.label}: ${chromeNote(p)}`).join('')}

## Components
${r.components.map((c) => `${c.id}: ${c.purpose}`).join('; ')}.
Controls and forms: shadcn/ui (${r.implementation.ui.components.map((c) => c.slug).join(', ')}), restyled to the colors, fonts and ${r.visualSystem.shape.name.toLowerCase()} shape above; date fields are a Calendar in a Popover; never unstyled native selects or date inputs.
All media goes through one MediaAsset component reading an assets config object. Temporary assets must stay replaceable.

## Motion
${r.motion.level.name}: ${r.motion.principle} Always respect prefers-reduced-motion.

## Content
Tone: ${r.contentDirection.tone}. ${r.contentDirection.voice} Never use: ${r.contentDirection.wordsToAvoid.join(', ')}.

## Assets
${r.assetRequirements.map((a) => `${a.label} (${a.level}, ${a.status})`).join('; ')}.
`
  return text.length > LOVABLE_KNOWLEDGE_LIMIT ? text.slice(0, LOVABLE_KNOWLEDGE_LIMIT - 1) + '…' : text
}

export const lovableAdapter: BuildPackageAdapter = {
  id: 'lovable',
  name: 'Lovable',
  description: "A structured product/design specification tailored for Lovable's workflow.",
  receives: ['Project Knowledge (fits the 10k limit)', 'Plan-first prompt sequence', 'Design system document', 'Asset manifest', 'Full recipe for reference'],
  async generate(r) {
    assertComplete(r)
    const keep = 'Keep the design system, fonts and existing sections untouched.'
    const prompts = [
      `(Plan mode) Read the project knowledge. Propose a build plan for "${r.title}": pages (${r.pages.map((p) => p.label).join(', ')}), components, and the order you will build them. Don't write code yet.`,
      `Set up the design system only: color tokens, fonts, spacing scale, and a MediaAsset component that reads media from a config object. No sections yet.`,
      `Build the shared navigation: ${r.chrome.navbar.composition} ${keep}`,
      ...r.pages.flatMap((p) => [
        `Set up the ${p.label} page: ${p.purpose}`,
        // In the page's own order: the hero can sit mid-page, so it is built where it stands.
        ...p.sections.map((s) => s.id === 'hero'
          ? `On the ${p.label} page, build the hero (${s.name}): ${s.composition} ${keep}`
          : `On the ${p.label} page, add the ${s.name} section: ${s.composition}. Content: ${s.content}. ${keep}`),
      ]),
      `Add the shared footer: ${r.chrome.footer.composition} ${keep}`,
      `Make every page responsive: ${r.implementation.responsive.slice(0, 3).join(' ')} Only change layout at breakpoints.`,
      ...(r.motion.level.id !== 'still' ? [`Add motion: ${r.motion.patterns.filter((p) => p.id !== 'state-feedback').map((p) => `${p.name} — ${p.behavior}`).join('; ')}. Respect prefers-reduced-motion. Don't change layout or copy.`] : []),
      ...r.signatures.map((s) => `Add the signature moment "${s.name}" on ${s.where}: ${s.experience} ${s.implementation} On mobile: ${s.mobile} Don't change layout or copy.`),
    ]
    return {
      recipeId: r.id, target: 'lovable', assets: assetManifest(r),
      files: [
        { path: 'KNOWLEDGE.md', content: lovableKnowledge(r) },
        { path: 'PROMPTS.md', content: `# Prompt sequence\n\nSend one prompt at a time. Bookmark a working version before each big change.\n\n${prompts.map((p, i) => `## ${i + 1}\n${p}`).join('\n\n')}\n` },
        { path: 'design-system.md', content: [S.color(r), S.typography(r), S.layout(r), S.components(r)].join('\n\n') + '\n' },
        { path: 'tokens.css', content: tokensCss(r) },
        { path: 'assets/manifest.json', content: manifestJson(r) },
        { path: 'recipe.md', content: recipeToMarkdown(r) },
      ],
      instructions: `1. Create a new Lovable project.\n2. Open Project settings → Knowledge and paste KNOWLEDGE.md.\n3. Upload any real images/logo you have in the chat.\n4. Send the prompts in PROMPTS.md one at a time, starting in Plan mode.\n5. If you connect GitHub later, commit recipe.md and design-system.md to the repo for reference.`,
    }
  },
}
