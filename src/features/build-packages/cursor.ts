// Cursor: Project Rules in .cursor/rules/*.mdc (frontmatter: description, globs, alwaysApply) + AGENTS.md.
// Rule types: Always (alwaysApply: true) · Apply Intelligently (description) · Specific Files (globs) · Manual (@rule).
// Docs: https://cursor.com/docs/context/rules

import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import type { BuildFile, BuildPackageAdapter, UniversalRecipe } from '@/types/domain'
import { assertComplete, assetManifest, assetsConfigTs, manifestJson, tokensCss, visualQa, workingRules } from './shared'

const mdc = (fm: { description?: string; globs?: string; alwaysApply: boolean }, body: string) =>
  `---\ndescription: ${fm.description ?? ''}\nglobs: ${fm.globs ?? ''}\nalwaysApply: ${fm.alwaysApply}\n---\n\n${body}`

function rules(r: UniversalRecipe): BuildFile[] {
  const t = r.visualSystem.typography
  const out: BuildFile[] = [
    { path: '.cursor/rules/design-system.mdc', content: mdc({ alwaysApply: true }, `# ${r.title} — design system\n\nSource of truth: @docs/recipe.md. Do not invent colors, fonts, spacing or sections.\n\n- Tokens only (src/styles/tokens.css). No raw hex in components.\n- Fonts: display ${t.display.family} ${t.display.weight}; heading ${t.heading.family}; body ${t.body.family}; utility ${t.utility.family}.\n- Spacing: 8px scale (${r.visualSystem.spacing.scale.join(', ')}).\n- Layout: ${r.layoutSystem.name} — ${r.layoutSystem.columns}.\n- Mood: ${r.creativeDirection.mood.join(', ')}.\n\n## Do\n${r.creativeDirection.do.map((x) => `- ${x}`).join('\n')}\n\n## Avoid\n${[...r.creativeDirection.avoid, ...r.creativeDirection.genericAvoid].map((x) => `- ${x}`).join('\n')}\n`) },
    { path: '.cursor/rules/components.mdc', content: mdc({ globs: 'src/components/**/*.tsx,src/app/**/*.tsx', alwaysApply: false }, `# Components & layout\n\n${S.components(r)}\n\n## Pages\n${r.pages.map((p, i) => `${i + 1}. ${p.label} (${p.type}) — ${p.purpose}\n   ${p.sections.map((s) => `${s.name} — ${s.composition}${s.note ? ` (${s.note})` : ''}`).join('\n   ')}`).join('\n')}\n\n## Site chrome (every page)\n- Navbar — ${r.chrome.navbar.composition}\n- Footer — ${r.chrome.footer.composition}\n\n## Responsive\n${r.implementation.responsive.map((x) => `- ${x}`).join('\n')}\n\n## Accessibility\n${r.implementation.accessibility.map((x) => `- ${x}`).join('\n')}\n`) },
  ]
  if (r.motion.level.id !== 'still') out.push({ path: '.cursor/rules/motion.mdc', content: mdc({ description: `Motion system for ${r.title}. Apply when adding animation, scroll effects, transitions or reduced-motion handling.`, alwaysApply: false }, [S.motion(r), S.signatures(r)].join('\n\n') + '\n') })
  if (r.metadata.spec.lead !== 'typography') out.push({ path: '.cursor/rules/media.mdc', content: mdc({ description: 'Media handling: asset config layer, posters, crops, temporary assets. Apply when rendering images, video or 3D.', alwaysApply: false }, `${S.media(r)}\n\n## Asset layer\n- Render all media via <MediaAsset id="…" /> reading src/config/assets.ts.\n- Asset statuses live in @assets/manifest.json. Temporary assets must stay replaceable.\n`) })
  out.push({ path: '.cursor/rules/visual-qa.mdc', content: mdc({ alwaysApply: false }, `# Visual QA (invoke with @visual-qa)\n\nCompare the implementation to @docs/recipe.md and report deviations (section → expected → actual → fix).\n\n${visualQa(r).map((x) => `- [ ] ${x}`).join('\n')}\n`) })
  return out
}

export const cursorAdapter: BuildPackageAdapter = {
  id: 'cursor',
  name: 'Cursor',
  description: 'A coding context package with project rules, implementation direction, and assets.',
  receives: ['AGENTS.md overview', 'Project Rules (.cursor/rules/*.mdc)', 'Full recipe document', 'Asset manifest + config', 'Implementation plan'],
  async generate(r) {
    assertComplete(r)
    const files: BuildFile[] = [
      { path: 'AGENTS.md', content: `# ${r.title}\n\n${r.summary}\n\nBuilt from an OpusKit Universal Recipe (docs/recipe.md). Follow the rules in .cursor/rules. Build order: docs/implementation-plan.md.\n\nStack: ${r.implementation.stack.join(', ')}.\n\n${workingRules(r, 'docs/implementation-plan.md', '@visual-qa')}` },
      ...rules(r),
      { path: 'docs/recipe.md', content: recipeToMarkdown(r) },
      { path: 'docs/implementation-plan.md', content: `# Implementation plan\n\n${r.implementation.sequence.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n${S.implementation(r)}\n` },
      { path: 'assets/manifest.json', content: manifestJson(r) },
      { path: 'src/styles/tokens.css', content: tokensCss(r) },
      { path: 'src/config/assets.ts', content: assetsConfigTs(r) },
    ]
    return {
      recipeId: r.id, target: 'cursor', files, assets: assetManifest(r),
      instructions: `1. Unzip into your project root (adds AGENTS.md, .cursor/rules, docs/, assets/ and two src/ files).\n2. Open the folder in Cursor. The design-system rule applies automatically; component rules attach to .tsx files.\n3. In Agent: "Read AGENTS.md and build the whole site following @docs/implementation-plan.md." It works through every step, runs @visual-qa on itself, and replies with a localhost URL when done.`,
    }
  },
}
