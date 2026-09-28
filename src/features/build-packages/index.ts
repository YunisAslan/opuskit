import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import type { BuildPackageAdapter, BuildTarget } from '@/types/domain'
import { claudeCodeAdapter } from './claude-code'
import { cursorAdapter } from './cursor'
import { lovableAdapter } from './lovable'
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
        { path: 'tokens.css', content: tokensCss(r) },
        { path: 'assets/manifest.json', content: manifestJson(r) },
        { path: 'src/config/assets.ts', content: assetsConfigTs(r) },
      ],
      instructions: '1. Read RECIPE.md top to bottom once.\n2. Copy tokens.css into your global styles and src/config/assets.ts into your project.\n3. Follow implementation-plan.md in order.',
    }
  },
}

// Every package whose recipe needs a video also gets scripts/prepare-video.sh — added here once, for every tool.
const withVideoScript = (a: BuildPackageAdapter): BuildPackageAdapter => ({
  ...a,
  async generate(r) {
    const pkg = await a.generate(r)
    if (!needsVideo(r)) return pkg
    return {
      ...pkg,
      files: [...pkg.files, ...videoFiles(r)],
      instructions: `${pkg.instructions}\nBefore building: run bash scripts/prepare-video.sh path/to/your-original-video.mp4 — it makes every video file the hero needs (add --upscale footage or --upscale cgi if the original is under 1920 px wide).`,
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
