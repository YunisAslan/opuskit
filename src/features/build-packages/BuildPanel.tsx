'use client'
import { strToU8, zipSync } from 'fflate'
import { Check, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CopyButton } from '@/components/ui'
import { getFile } from '@/lib/files'
import type { BuildPackage, BuildTarget, UniversalRecipe } from '@/types/domain'
import { adapters } from '.'
import { providedFilePaths } from './shared'

const PREP = ['Recipe', 'Design System', 'Motion System', 'Assets', 'References', 'Implementation guide', 'Skills', 'Verification notes']

async function download(pkg: BuildPackage, recipe: UniversalRecipe) {
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

export function BuildPanel({ recipe, locked, onUnlock }: { recipe: UniversalRecipe; locked: boolean; onUnlock: () => void }) {
  const [target, setTarget] = useState<BuildTarget | null>(null)
  const [pkg, setPkg] = useState<BuildPackage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [prepared, setPrepared] = useState(0)
  const [file, setFile] = useState<string | null>(null)
  const [zipping, setZipping] = useState(false)
  const rec = recipe.metadata.recommendedTarget

  useEffect(() => {
    if (!target) return
    let cancelled = false
    setPkg(null); setError(null); setPrepared(0); setFile(null)
    adapters[target].generate(recipe).then((p) => {
      if (cancelled) return
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      const steps = target === 'claude-code' ? PREP : PREP.filter((s) => s !== 'Skills')
      steps.forEach((_, i) => setTimeout(() => !cancelled && setPrepared(i + 1), reduce ? 0 : (i + 1) * 160))
      setTimeout(() => !cancelled && setPkg(p), reduce ? 0 : steps.length * 160 + 200)
    }).catch((e: Error) => !cancelled && setError(e.message))
    return () => { cancelled = true }
  }, [target, recipe])

  const steps = target === 'claude-code' ? PREP : PREP.filter((s) => s !== 'Skills')
  const open = pkg?.files.find((f) => f.path === file)

  return (
    <div>
      <div role="radiogroup" aria-label="Build tool" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Object.values(adapters).map((a) => (
          <button key={a.id} type="button" role="radio" aria-checked={target === a.id} onClick={() => (locked ? onUnlock() : setTarget(a.id))} className="choice p-5">
            <span className="flex items-center justify-between gap-2"><span className="text-lg font-medium">{a.name}</span>{a.id === rec && <span className="pencil">Recommended</span>}</span>
            <span className="mt-1 block text-sm text-ink-2">{a.description}</span>
            <span className="mt-3 block text-xs text-muted">You&apos;ll receive: {a.receives.join(', ')}</span>
          </button>
        ))}
      </div>
      {locked && <p className="mt-4 text-sm text-muted">Build Packages are part of the full recipe. <button type="button" className="link text-ink" onClick={onUnlock}>Unlock this recipe</button></p>}

      {error && (
        <p role="alert" className="mt-6 rounded-lg border border-warn p-4 text-warn">We can&apos;t build a package from this recipe yet: {error}. Your Universal Recipe is still available above.</p>
      )}

      {target && !error && (
        <div className="mt-8 rounded-lg bg-ink p-6 text-paper md:p-8" aria-live="polite">
          {!pkg ? (
            <>
              <p className="text-lg">Preparing your {adapters[target].name} package…</p>
              <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
                {steps.map((s, i) => (
                  <li key={s} className={`flex items-center gap-2 ${i < prepared ? 'text-paper' : 'text-paper/30'}`}>
                    {i < prepared ? <Check size={14} aria-hidden /> : <Circle size={14} aria-hidden />} {s}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="display text-4xl">Your build kit is ready.</p>
              <p className="mt-2 text-paper/70">{pkg.files.length} files for {adapters[target].name}, generated from the same Universal Recipe.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" disabled={zipping} className="btn bg-paper text-ink hover:bg-white disabled:opacity-60" onClick={async () => { setZipping(true); try { await download(pkg, recipe) } finally { setZipping(false) } }}>{zipping ? 'Preparing download…' : 'Download package (.zip)'}</button>
                <CopyButton text={pkg.instructions} label="Copy instructions" className="border-paper! text-paper hover:bg-paper! hover:text-ink!" />
                <button type="button" className="btn btn-sm text-paper link" onClick={() => setFile(file ? null : pkg.files[0].path)}>{file ? 'Close build guide' : 'Open build guide'}</button>
              </div>
              <ol className="mt-6 list-decimal space-y-1 pl-5 text-sm text-paper/80">{pkg.instructions.split('\n').map((l) => <li key={l}>{l.replace(/^\d+\.\s*/, '')}</li>)}</ol>
              {file && (
                <div className="mt-6 grid gap-4 md:grid-cols-[16rem_1fr]">
                  <ul className="space-y-0.5 font-mono text-xs">
                    {pkg.files.map((f) => (
                      <li key={f.path}><button type="button" onClick={() => setFile(f.path)} className={`w-full truncate rounded px-2 py-1 text-left ${f.path === file ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper'}`}>{f.path}</button></li>
                    ))}
                  </ul>
                  <pre className="max-h-[32rem] overflow-auto rounded bg-black/40 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-paper/90">{open?.content}</pre>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
