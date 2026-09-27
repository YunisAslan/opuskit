import { recipeSections as S, recipeToMarkdown } from '@/features/recipes/markdown'
import type { BuildPackageAdapter, BuildTarget } from '@/types/domain'
import { claudeCodeAdapter } from './claude-code'
import { cursorAdapter } from './cursor'
import { lovableAdapter } from './lovable'
import { assertComplete, assetManifest, assetsConfigTs, manifestJson, tokensCss } from './shared'
import { v0Adapter } from './v0'

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

// Adding a tool = adding an adapter here. The Universal Recipe schema never changes.
export const adapters: Record<BuildTarget, BuildPackageAdapter> = {
  'claude-code': claudeCodeAdapter,
  cursor: cursorAdapter,
  v0: v0Adapter,
  lovable: lovableAdapter,
  'own-code': ownCodeAdapter,
}
