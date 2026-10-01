// Writes a recipe's Claude Code Build Package into a folder — the same files the result page's Download zips (no uploads).
// For example sites (docs/plan-for-fit.md §6 step 4): npx tsx scripts/build-package.ts path/to/spec.json examples/{slug}
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { adapters } from '../src/features/build-packages'
import { composeRecipe } from '../src/features/recipes/engine'
const [specPath, out] = process.argv.slice(2)
const r = composeRecipe(JSON.parse(readFileSync(specPath, 'utf8')))
async function main() {
const pkg = await adapters['claude-code'].generate(r)
for (const f of pkg.files) { mkdirSync(dirname(join(out, f.path)), { recursive: true }); writeFileSync(join(out, f.path), f.content) }
// Same README the result page's Download adds (no uploads).
writeFileSync(join(out, 'OPUSKIT-README.md'), `# ${r.title} — ${adapters[pkg.target].name} Build Package\n\n${pkg.instructions}\n\nYou didn't attach any files during creation, so \`public/media/\` only has placeholder paths — add your own files there before building.\n`)
console.log(pkg.files.length + 1, 'files →', out)
}
main()
