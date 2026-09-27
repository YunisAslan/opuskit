'use client'
import Link from 'next/link'
import { useState } from 'react'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { PageIntro, Swatches } from '@/components/ui'
import { resolveRef, toggleSaved, useGenerations, useRecent, useSaved } from '@/features/recipes/library'
import { useHydrated } from '@/lib/store'
import type { UniversalRecipe } from '@/types/domain'

export default function SavedPage() {
  const gens = useGenerations()
  const saved = useSaved().map((s) => ({ ref: s.ref, hit: resolveRef(s.ref, gens) })).filter((x) => x.hit)
  const recent = useRecent().map((ref) => ({ ref, hit: resolveRef(ref, gens) })).filter((x) => x.hit)
  const [compare, setCompare] = useState<string[]>([])
  const hydrated = useHydrated()
  const pair = compare.map((ref) => saved.find((s) => s.ref === ref)?.hit?.recipe).filter(Boolean) as UniversalRecipe[]

  if (!hydrated) return <div className="min-h-screen" />
  return (
    <>
      <PageIntro title="Saved recipes" />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        {saved.length === 0 ? (
          <div className="border-t border-line py-20">
            <p className="text-2xl tracking-tight">Nothing saved yet.</p>
            <p className="mt-2 text-ink-2">Start exploring recipes worth remembering.</p>
            <Link href="/explore" className="btn btn-ink mt-6">Explore recipes</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted">Select two recipes to compare them side by side.</p>
            <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {saved.map(({ ref, hit }) => (
                <li key={ref}>
                  <Link href={hit!.href} className="group block"><SitePreview {...previewFromRecipe(hit!.recipe)} className="rounded-lg border border-line" /><p className="mt-3 text-lg font-medium group-hover:text-pencil">{hit!.recipe.title}</p></Link>
                  <div className="mt-2 flex gap-4 text-sm">
                    <label className="flex items-center gap-2"><input type="checkbox" className="accent-pencil" checked={compare.includes(ref)} onChange={(e) => setCompare(e.target.checked ? [...compare, ref].slice(-2) : compare.filter((c) => c !== ref))} />Compare</label>
                    <button type="button" className="link" onClick={() => toggleSaved(ref)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            {pair.length === 2 && <Compare a={pair[0]} b={pair[1]} />}
          </>
        )}

        {recent.length > 0 && (
          <section className="mt-20" aria-labelledby="recent">
            <h2 id="recent" className="border-t border-ink pt-3 text-2xl font-medium tracking-tight">Recently viewed</h2>
            <ul className="mt-4 divide-y divide-line">
              {recent.map(({ ref, hit }) => <li key={ref}><Link href={hit!.href} className="flex justify-between py-3 hover:text-pencil"><span>{hit!.recipe.title}</span><span className="text-sm text-muted">{ref.startsWith('gen:') ? 'Your recipe' : 'Curated'}</span></Link></li>)}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}

function Compare({ a, b }: { a: UniversalRecipe; b: UniversalRecipe }) {
  const rows: [string, (r: UniversalRecipe) => React.ReactNode][] = [
    ['Mood', (r) => r.creativeDirection.mood.join(', ')],
    ['Palette', (r) => <><span>{r.visualSystem.palette.name}</span><Swatches colors={r.visualSystem.palette.tokens.map((t) => t.hex)} /></>],
    ['Typography', (r) => `${r.visualSystem.typography.display.family} + ${r.visualSystem.typography.body.family}`],
    ['Layout', (r) => r.layoutSystem.name],
    ['Hero', (r) => r.media.hero.name],
    ['Motion', (r) => `${r.motion.level.name} — ${r.motion.libraries.join(', ')}`],
    ['Required assets', (r) => r.assetRequirements.filter((x) => x.level === 'required').map((x) => x.label).join(', ')],
    ['Complexity', (r) => r.metadata.complexity],
  ]
  return (
    <section className="mt-14 overflow-x-auto" aria-label="Comparison">
      <table className="w-full min-w-[40rem] text-sm">
        <thead><tr className="text-left"><th className="w-40" /><th className="pb-3 text-lg font-medium">{a.title}</th><th className="pb-3 text-lg font-medium">{b.title}</th></tr></thead>
        <tbody>{rows.map(([k, f]) => <tr key={k} className="border-t border-line align-top"><th className="py-3 pr-4 text-left font-normal text-muted">{k}</th><td className="py-3 pr-4">{f(a)}</td><td className="py-3">{f(b)}</td></tr>)}</tbody>
      </table>
    </section>
  )
}
