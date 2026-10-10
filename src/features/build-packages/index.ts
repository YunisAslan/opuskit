import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import { blockSource, heroSource, pieceSource } from '@/data/pieces-source.generated'
import type { BuildFile, BuildPackageAdapter, BuildTarget, UniversalRecipe } from '@/types/domain'
import { claudeCodeAdapter } from './claude-code'
import { cursorAdapter } from './cursor'
import { lovableAdapter } from './lovable'
import { MIT, craftGuide } from './craft'
import { assertComplete, assetManifest, assetsConfigTs, manifestJson, tokensCss } from './shared'
import { v0Adapter } from './v0'
import { needsVideo, videoFiles } from './video'

const ownCodeAdapter: BuildPackageAdapter = {
  id: 'own-code',
  name: 'Build it yourself',
  description: 'The Universal Recipe as documentation plus ready-to-use tokens and an asset layer — for any stack or team.',
  receives: ['Full recipe document', 'CSS design tokens', 'Asset manifest + config', 'Implementation plan'],
  async generate(r) {
    assertComplete(r)
    return {
      recipeId: r.id, target: 'own-code', assets: assetManifest(r),
      files: [
        { path: 'RECIPE.md', content: recipeToMarkdown(r) },
        { path: 'implementation-plan.md', content: S.implementation(r) + '\n' },
        { path: 'interaction-craft.md', content: craftGuide(r) },
        { path: 'tokens.css', content: tokensCss(r) },
        { path: 'assets/manifest.json', content: manifestJson(r) },
        { path: 'src/config/assets.ts', content: assetsConfigTs(r) },
      ],
      instructions: '1. Read RECIPE.md top to bottom once.\n2. Copy tokens.css into your global styles and src/config/assets.ts into your project.\n3. Follow implementation-plan.md in order.\n4. Build every control, motion and phone detail as interaction-craft.md says.',
    }
  },
}

// Every package whose recipe has a kit ships the pieces' real code, plus the MIT notices of the libraries they came from.
export function kitFiles(r: UniversalRecipe): BuildFile[] {
  // Ready sections: one file per distinct section with code, used anywhere in the recipe's pages.
  const secs = [...new Map([...r.pages.flatMap((p) => p.sections), r.chrome.footer].filter((s) => s.code).map((s) => [s.code!.path, s])).values()]
  const sectionFiles = secs.map((s) => ({ path: s.code!.path, content: s.id === 'hero' ? heroSource[r.media.hero.id]! : blockSource[s.id]! }))
  if (!r.pieces.length) return sectionFiles
  const libs = [...new Map(r.pieces.map((p) => [p.source.library, p.source])).values()]
  return [
    ...sectionFiles,
    ...r.pieces.filter((p, i) => r.pieces.findIndex((q) => q.path === p.path) === i).map((p) => ({ path: p.path, content: pieceSource[p.id] })), // two kit entries can share one file (DrawnLink, TextEffect)
    { path: 'THIRD-PARTY-NOTICES.md', content: `# Third-party notices\n\nThe components in src/components/pieces/ were adapted by OpusKit from these libraries (MIT), or use them as an npm dependency (Apache-2.0).\n\n${libs.map((l) => l.license === 'MIT'
      ? `## ${l.library} — ${l.url}\n\nMIT License\n\n${l.copyright}\n\n${MIT}`
      : `## ${l.library} — ${l.url}\n\nUsed as an npm dependency. ${l.copyright}. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.`).join('\n\n')}\n` },
  ]
}

// Every package whose recipe needs a video also gets scripts/prepare-video.sh — added here once, for every tool.
const withVideoScript = (a: BuildPackageAdapter): BuildPackageAdapter => ({
  ...a,
  async generate(r) {
    const pkg0 = await a.generate(r)
    const kit = kitFiles(r)
    const secCount = kit.filter((f) => f.path.startsWith('src/components/sections/')).length
    // opuskit.json: the exact recipe spec, so a site built from this package can be opened in the studio again as it is.
    const spec = { ...r.metadata.spec, uploads: r.metadata.spec.uploads?.map(({ fileId: _, ...u }) => u) }
    pkg0.files.push({ path: 'opuskit.json', content: JSON.stringify({ opuskit: 1, recipe: r.id, note: 'The OpusKit recipe this site was built from. Keep it: OpusKit reads it to open the site in the studio.', spec }, null, 2) + '\n' })
    const pkg = kit.length ? { ...pkg0, files: [...pkg0.files, ...kit], instructions: `${pkg0.instructions}${secCount ? `\nReady sections: ${secCount} section component${secCount > 1 ? 's' : ''} in src/components/sections/ — the design of each part to start from: pass real copy and media as props, and fit each into the site.` : ''}${r.pieces.length ? `\nYour kit: ${r.pieces.length} ready component${r.pieces.length > 1 ? 's' : ''} in src/components/pieces/ (${r.pieces.map((p) => p.exportName).join(', ')}) — build on them, fitted to the site${r.pieces.some((p) => p.deps.length) ? `; run npm i ${[...new Set(r.pieces.flatMap((p) => p.deps))].join(' ')}` : ''}.` : ''}` } : pkg0
    if (!needsVideo(r)) return pkg
    return {
      ...pkg,
      files: [...pkg.files, ...videoFiles(r)],
      instructions: `0. Video — do this first, before anything else:\n   bash scripts/prepare-video.sh path/to/your-original-video.mp4\n   A source too small for the screen (under 1920 px wide) is sharpened automatically with Real-ESRGAN (free; downloaded once). For people and real scenes add --upscale footage — slower, most natural.\n   Always pass the original export from your camera or AI tool — never a web-compressed copy.\n${pkg.instructions}`,
    }
  },
})

// Adding a tool = adding an adapter here. The Universal Recipe schema never changes.
export const adapters: Record<BuildTarget, BuildPackageAdapter> = {
  'claude-code': withVideoScript(claudeCodeAdapter),
  cursor: withVideoScript(cursorAdapter),
  v0: withVideoScript(v0Adapter),
  lovable: withVideoScript(lovableAdapter),
  'own-code': withVideoScript(ownCodeAdapter),
}
