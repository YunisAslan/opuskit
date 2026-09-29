'use client'
import { strToU8, zipSync } from 'fflate'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CopyButton } from '@/components/ui'
import { ToolIcon } from '@/components/ToolIcon'
import { getFile } from '@/lib/files'
import type { BuildPackage, BuildTarget, UniversalRecipe } from '@/types/domain'
import { adapters } from '.'
import { providedFilePaths } from './shared'

/** Builds the zip (package files + the user's own uploads + a README) and hands it to the browser. */
export async function downloadPackage(pkg: BuildPackage, recipe: UniversalRecipe) {
  const files: Record<string, Uint8Array> = Object.fromEntries(pkg.files.map((f) => [f.path, strToU8(f.content)]))
  const provided = providedFilePaths(recipe)
  const included: typeof provided = []
  for (const f of provided) {
    const file = await getFile(f.fileId)
    if (file) { files[f.zipPath] = new Uint8Array(await file.arrayBuffer()); included.push(f) }
  }
  const missing = provided.filter((f) => !included.includes(f))

  let readme = `# ${recipe.title} — ${adapters[pkg.target].name} Build Package\n\n${pkg.instructions}\n`
  readme += included.length
    ? `\n## Your uploaded files\nIncluded in this package, at the paths ${'`'}src/config/assets.ts${'`'} already points to:\n${included.map((f) => `- ${f.zipPath} (from ${f.name})`).join('\n')}\n`
    : `\nYou didn't attach any files during creation, so ${'`'}public/media/${'`'} only has placeholder paths — add your own files there before building.\n`
  if (missing.length) readme += `\n## Not included\nThese were attached during creation but the browser no longer has their bytes (cleared storage, or a different browser/device). Re-attach them, or add the files yourself at:\n${missing.map((f) => `- ${f.zipPath} (was: ${f.name})`).join('\n')}\n`
  files['OPUSKIT-README.md'] = strToU8(readme)

  const blob = new Blob([zipSync(files) as BlobPart], { type: 'application/zip' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${recipe.slug}-${pkg.target}.zip`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

/** The package for one tool, regenerated whenever the recipe or tool changes. */
export function useBuildPackage(recipe: UniversalRecipe, target: BuildTarget | null, enabled: boolean) {
  const [pkg, setPkg] = useState<BuildPackage | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled || !target) { setPkg(null); return }
    let live = true
    setPkg(null); setError(null)
    adapters[target].generate(recipe).then((p) => live && setPkg(p)).catch((e: Error) => live && setError(e.message))
    return () => { live = false }
  }, [recipe, target, enabled])
  return { pkg, error }
}

/** Build tab: pick the tool, see the one prompt to start with, and look inside the kit. Download lives in the bottom bar. */
export function BuildTab({ recipe, target, onTarget, pkg, error }: { recipe: UniversalRecipe; target: BuildTarget | null; onTarget: (t: BuildTarget) => void; pkg: BuildPackage | null; error: string | null }) {
  const [file, setFile] = useState<string | null>(null)
  const open = pkg?.files.find((f) => f.path === file)
  return (
    <div className="space-y-10">
      <div role="radiogroup" aria-label="Build tool" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {Object.values(adapters).map((a) => (
          <button key={a.id} type="button" role="radio" aria-checked={target === a.id} onClick={() => { onTarget(a.id); setFile(null) }} className="choice p-4 text-left">
            <ToolIcon id={a.id} className="size-8" />
            <span className="mt-3 block font-medium">{a.name}</span>
            <span className="mt-1 block text-sm text-ink-2">{a.description}</span>
          </button>
        ))}
      </div>

      {!target && <p className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted">Choose the tool you build with to see your kit — every tool gets the same recipe, written the way it understands best.</p>}

      {error && <p role="alert" className="rounded-lg border border-warn p-4 text-warn">We can&apos;t build a package from this recipe yet: {error}.</p>}

      {pkg && (
        <>
          <div className="rounded-lg bg-ink p-6 text-paper">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-lg font-medium">How to start</p>
              <CopyButton text={pkg.instructions} label="Copy steps" className="border-paper! text-paper hover:bg-paper! hover:text-ink!" />
            </div>
            <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-paper/85">{pkg.instructions.split('\n').map((l) => <li key={l}>{l.replace(/^\d+\.\s*/, '')}</li>)}</ol>
          </div>

          <div>
            <p className="font-medium">Inside your build kit <span className="font-normal text-muted">· {pkg.files.length} files, plus your own uploads</span></p>
            <div className="mt-4 grid gap-4 md:grid-cols-[18rem_1fr]">
              <ul className="max-h-[28rem] space-y-0.5 overflow-auto rounded-lg border border-line bg-white p-2 font-mono text-xs">
                {pkg.files.map((f) => (
                  <li key={f.path}><button type="button" onClick={() => setFile(f.path)} className={`flex w-full items-center gap-2 truncate rounded px-2 py-1.5 text-left ${f.path === file ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-paper'}`}><FileText size={13} aria-hidden className="shrink-0" />{f.path}</button></li>
                ))}
              </ul>
              {open
                ? <pre className="max-h-[28rem] overflow-auto rounded-lg bg-ink p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-paper/90">{open.content}</pre>
                : <p className="grid place-items-center rounded-lg border border-dashed border-line p-8 text-sm text-muted">Pick a file to read it. Everything is written for {target && adapters[target].name}.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
