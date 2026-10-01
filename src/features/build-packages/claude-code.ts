// Claude Code: CLAUDE.md (project memory, imports via @path) + Agent Skills in .claude/skills/<name>/SKILL.md.
// Skill frontmatter follows the Agent Skills spec: name (a-z0-9-, matches folder) + description ("what + Use when…").
// Docs: https://code.claude.com/docs/en/skills · https://code.claude.com/docs/en/memory

import { recipeSections as S, usesWebgl, WEBGL_CHECKLIST } from '@/features/recipes/markdown'
import type { BuildFile, BuildPackageAdapter, UniversalRecipe } from '@/types/domain'
import { assertComplete, assetManifest, assetsConfigTs, flattenPages, frontmatter, manifestJson, tokensCss, visualQa, workingRules } from './shared'
import { needsVideo } from './video'

type Skill = { name: string; description: string; body: string }

function skills(r: UniversalRecipe): Skill[] {
  const lead = r.metadata.spec.lead
  const level = r.motion.level.id
  const t = r.visualSystem.typography
  const out: Skill[] = [{
    name: 'visual-direction',
    description: `Applies the "${r.title}" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component.`,
    body: `# Visual direction — ${r.title}\n\nRead \`recipe/design.md\`, \`recipe/color.md\` and \`recipe/typography.md\` before writing UI.\n\n## How to apply\n1. Use only the CSS variables in \`src/styles/tokens.css\` — never raw hex values in components.\n2. Typography roles: display = ${t.display.family} (${t.display.weight}, ${t.display.size}, lh ${t.display.lineHeight}, ls ${t.display.letterSpacing}); heading = ${t.heading.family}; body = ${t.body.family} ${t.body.size}/${t.body.lineHeight}; utility = ${t.utility.family}${t.utility.uppercase ? ' uppercase' : ''} ${t.utility.letterSpacing}.\n3. Spacing: only values from the 8px scale in \`recipe/layout.md\`. Space between sections > space within sections.\n4. One focal point per viewport. If two elements compete, reduce one.\n5. Accent color is a signal: active state, one highlight per view.\n6. Shape — ${r.visualSystem.shape.name}: rounded-button / rounded-card / rounded-media and shadow-card tokens only. ${r.visualSystem.shape.rule}\n7. Menu — ${r.chrome.nav.name}: ${r.chrome.nav.composition}\n\n## Principles\n${r.creativeDirection.visualPrinciples.map((p) => `- ${p}`).join('\n')}\n\n## Never\n${[...r.creativeDirection.avoid, ...r.creativeDirection.genericAvoid].map((p) => `- ${p}`).join('\n')}\n\n## Self-check before finishing a component\n- Does it use tokens only?\n- Is there exactly one visual priority?\n- Would it still look intentional in grayscale?\n`,
  }, {
    name: 'responsive-design',
    description: `Adapts the ${r.title} layout for mobile, tablet and desktop: grid changes, media crops, type scaling and touch targets. Use when building layouts, sections, navigation, or checking any breakpoint.`,
    body: `# Responsive design\n\nMobile is its own composition, not a squeezed desktop.\n\n## Breakpoints\n- Mobile < 640px · Tablet 640–1024px · Desktop 1024–1440px · Large > 1440px\n\n## Rules\n${r.implementation.responsive.map((x) => `- ${x}`).join('\n')}\n- Layout: ${r.layoutSystem.columns}. Container: ${r.layoutSystem.container}.\n- Media: ${r.layoutSystem.mediaProportions}. Provide dedicated mobile crops; keep focal points in the centre 60%.\n- Headlines: set explicit line breaks per breakpoint (\`<br className="hidden md:block" />\` or separate spans).\n\n## Section-specific\n${flattenPages(r).map((s) => `- **${s.page ? `${s.page} — ` : ''}${s.name}:** ${s.responsive}`).join('\n')}\n\n## Verify\nCheck 390px, 768px, 1280px and 1728px widths. No horizontal scroll at any width.\n`,
  }, {
    name: 'visual-qa',
    description: `Compares the implemented site against the ${r.title} recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.`,
    body: `# Visual QA\n\nRun the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.\n\n## Checklist\n${visualQa(r).map((x) => `- [ ] ${x}`).join('\n')}\n\nDo not mark work complete while any item fails. Fix, then re-check.\n`,
  }]

  if (level !== 'still') out.push({
    name: 'motion-system',
    description: `Implements the ${r.motion.level.name.toLowerCase()} motion system for ${r.title}: ${r.motion.patterns.filter((p) => p.id !== 'state-feedback').map((p) => p.name.toLowerCase()).join(', ')}. Use when adding animation, scroll effects, transitions or reduced-motion support.`,
    body: `# Motion system — ${r.motion.level.name}\n\n**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.\n\n${r.motion.principle}\n\nLibraries: ${r.motion.libraries.join(', ')}. Use CSS for simple transitions and Motion for everything else — reveals, scroll-linked and pinned sequences (useScroll + useTransform, position: sticky for pins). No GSAP: its licence excludes tools that compete with Webflow.\n\n## Patterns (implement in this order)\n${r.motion.patterns.map((p) => `### ${p.name}\n- Purpose: ${p.purpose}\n- Trigger: ${p.trigger}\n- Behavior: ${p.behavior}\n- Duration / easing: ${p.duration} · ${p.easing}\n- How: ${p.implementation}\n- Performance: ${p.performance}\n- Reduced motion: ${p.reducedMotion}`).join('\n\n')}\n\n${r.signatures.length ? `## Signature moments (build each one where it is placed)\n${r.signatures.map((s) => `- **${s.name}** on ${s.where}: ${s.experience} How: ${s.implementation} Mobile: ${s.mobile}${s.components?.length ? ` Start from: ${s.components.map((c) => `${c.name} (${c.url})`).join(', ')} — restyle to tokens.` : ''}`).join('\n')}\n\n` : ''}## Rules\n- Animate transform and opacity only.\n- Wrap every effect in a reduced-motion check (\`useReducedMotion()\` or \`matchMedia('(prefers-reduced-motion: reduce)')\`).\n- Clean up observers and listeners on unmount.\n`,
  })

  if (lead !== 'typography') out.push({
    name: 'media-experience',
    description: `Handles ${lead} media for ${r.title}: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media.`,
    body: `# Media experience — ${r.media.name}\n\n${r.media.direction}\n\n## Asset layer\n- All media is referenced by key through \`src/config/assets.ts\` and rendered by \`<MediaAsset id="…" />\`.\n- Never hardcode a media path in a component.\n- Assets with status \`temporary\` in \`assets/manifest.json\` must show a dev-only "Temporary" badge and are listed in the final report.\n\n## Treatment\n${r.media.treatment.map((x) => `- ${x}`).join('\n')}\n\n## Hero — ${r.media.hero.name}\n- ${r.media.hero.composition}\n- ${r.media.hero.behavior}\n- Mobile: ${r.media.hero.responsive}\n- Fallback: ${r.media.hero.fallback}\n${r.media.framing ? `\n## Your video’s shape\n${r.media.framing}\n` : ''}${r.media.storytelling ? `\n## Scroll storytelling (the hero film)\n${r.media.storytelling.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n` : ''}\n## Formats\n${r.media.formats}\n`,
  })

  out.push({
    name: 'ui-components',
    description: `Builds every control and form for ${r.title} from shadcn/ui, themed to the recipe: ${r.implementation.ui.components.map((c) => c.slug).join(', ')}. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast.`,
    body: `# UI components — shadcn/ui\n\nRead \`recipe/ui.md\`. Install once:\n\n\`\`\`bash\n${r.implementation.ui.install}\n\`\`\`\n\n## Theme\nReplace the :root values \`shadcn init\` writes with:\n\n\`\`\`css\n${r.implementation.ui.theme}\n\`\`\`\n\n## Where each one goes\n${r.implementation.ui.components.map((c) => `- **${c.name}** (\`${c.slug}\`): ${c.where.join(', ')}`).join('\n')}\n\n## Rules\n${r.implementation.ui.rules.map((x) => `- ${x}`).join('\n')}\n`,
  })

  if (level === 'dynamic' || level === 'immersive' || lead === 'video' || lead === '3d' || usesWebgl(r)) out.push({
    name: 'performance',
    description: `Keeps ${r.title} fast: media budgets, lazy loading, animation cost and Core Web Vitals targets. Use when adding media, animation, 3D or third-party code, and before shipping.`,
    body: `# Performance\n\nPerformance is part of the design.\n\n${r.implementation.performance.map((x) => `- ${x}`).join('\n')}\n\n## Check\n- Run \`next build\` and inspect bundle sizes; lazy-load anything heavy below the fold (\`next/dynamic\`).\n- Run Lighthouse (mobile). Fix LCP first (hero media), then CLS (reserve media aspect ratios).\n${usesWebgl(r) ? `\n## WebGL\n${WEBGL_CHECKLIST.map((x) => `- ${x}`).join('\n')}\n` : ''}`,
  })
  return out
}

export const claudeCodeAdapter: BuildPackageAdapter = {
  id: 'claude-code',
  name: 'Claude Code',
  description: 'A project-ready build package with instructions, design context, asset manifest, and recipe-specific skills.',
  receives: ['CLAUDE.md project memory', 'Recipe-specific skills (.claude/skills)', 'Recipe files by topic', 'Asset manifest + asset config', 'Implementation plan', 'Verification checklist'],
  async generate(r) {
    assertComplete(r)
    const sk = skills(r)
    const files: BuildFile[] = [
      { path: 'CLAUDE.md', content: `# ${r.title}\n\n${r.summary}\n\nThis project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.\n\n## Where things are\n- \`recipe/\` — the design recipe, split by topic (read the relevant file before working on that topic)\n- \`assets/manifest.json\` — every asset, its status (have / temporary / create / find) and usage\n- \`build/implementation-plan.md\` — build order\n- \`build/verification.md\` — definition of done\n- \`.claude/skills/\` — ${sk.map((s) => s.name).join(', ')}\n\n${r.concept ? `## The big idea — ${r.concept.name}\n${r.concept.line} Read it in \`recipe/design.md\` (“The Big Idea”) before building anything: every page serves it, and \`recipe/design.md\` ends with the award checklist every page must pass.\n\n` : ''}## Stack\n${r.implementation.stack.map((s) => `- ${s}`).join('\n')}\n\n## Non-negotiables\n- Use tokens from \`src/styles/tokens.css\`; never raw hex in components.\n- Fonts: ${r.visualSystem.typography.display.family} (display), ${r.visualSystem.typography.body.family} (body), ${r.visualSystem.typography.utility.family} (utility). Load with next/font.\n- All media goes through \`src/config/assets.ts\`. Temporary assets stay replaceable.\n- Every animation has a reduced-motion alternative.\n- Ready code: \`src/components/sections/\` (one component per content section) and \`src/components/pieces/\` (your kit) are the starting structure. Pass real copy and media through props; change proportions and spacing to fit the recipe; never restyle them outside the tokens.\n- Avoid: ${r.creativeDirection.avoid.join('; ')}.\n${needsVideo(r) ? `- Video files must be prepared with \`bash scripts/prepare-video.sh\` before you touch any code. Never serve the raw upload — it is unoptimised, wrong shape, and missing the mobile and scroll variants. It sharpens a small source automatically (never pass \`--no-upscale\`); for people and real scenes use \`--upscale footage\`. Read its "Result:" line: desktop must be ≥ 1920 px wide and phone ≥ 1080 px tall. If it prints ⚠ instead, do not hide it — name it in your final reply as the one thing still to fix.\n` : ''}\n${workingRules(r, '\`build/implementation-plan.md\`', 'the \`visual-qa\` skill')}\n## Core direction\n@recipe/design.md\n` },
      ...sk.map((s) => ({ path: `.claude/skills/${s.name}/SKILL.md`, content: frontmatter({ name: s.name, description: s.description }) + s.body })),
      { path: 'recipe/design.md', content: [S.summary(r), S.concept(r), S.direction(r), S.award(r), S.why(r), S.references(r)].filter(Boolean).join('\n\n') + '\n' },
      { path: 'recipe/typography.md', content: S.typography(r) + '\n' },
      { path: 'recipe/color.md', content: S.color(r) + '\n' },
      { path: 'recipe/layout.md', content: [S.layout(r), S.structure(r), S.components(r)].join('\n\n') + '\n' },
      { path: 'recipe/motion.md', content: [S.motion(r), S.signatures(r), S.kit(r)].filter(Boolean).join('\n\n') + '\n' },
      { path: 'recipe/media.md', content: [S.media(r), S.webgl(r), S.assets(r)].filter(Boolean).join('\n\n') + '\n' },
      { path: 'recipe/content.md', content: S.content(r) + '\n' },
      { path: 'recipe/ui.md', content: S.ui(r) + '\n' },
      { path: 'recipe/resources.md', content: S.resources(r) + '\n' },
      { path: 'assets/README.md', content: `# Assets\n\n${S.assets(r)}\n\n## Replacing temporary assets\nDrop the real file into \`public/media/\` with the same key name, or edit \`src/config/assets.ts\`. Nothing else changes.\n` },
      { path: 'assets/manifest.json', content: manifestJson(r) },
      { path: 'src/styles/tokens.css', content: tokensCss(r) },
      { path: 'src/config/assets.ts', content: assetsConfigTs(r) },
      { path: 'build/implementation-plan.md', content: `# Implementation plan\n\nWork through every step in order, in one pass — no pausing for review between steps. After each step, run the \`visual-qa\` skill on what you built, fix, and continue.\n\n${r.implementation.sequence.map((s, i) => `## Step ${i + 1}\n${s}`).join('\n\n')}\n\n${S.implementation(r)}\n` },
      { path: 'build/verification.md', content: `# Verification\n\nThe build is done when every item passes.\n\n${visualQa(r).map((x) => `- [ ] ${x}`).join('\n')}\n` },
    ]
    return {
      recipeId: r.id, target: 'claude-code', files, assets: assetManifest(r),
      instructions: `1. Create a Next.js project (npx create-next-app@latest) or open your existing one.\n2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).\n3. Run \`claude\` in the project folder.\n4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.`,
    }
  },
}
