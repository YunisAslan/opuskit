'use client'
// Saved: the site being built, then the recipes kept in this browser — each shown as its brand (decision 40).
import Link from 'next/link'
import { useGoogleFonts } from '@/components/FontLoader'
import { PageIntro } from '@/components/ui'
import { directions, purposes } from '@/data/taxonomy'
import { resolveRef, toggleSaved, useGenerations, useSaved } from '@/features/recipes/library'
import { usePlan } from '@/lib/plan'
import { useHydrated } from '@/lib/store'
import type { PaletteColors, UniversalRecipe } from '@/types/domain'
import { BrandSheetMini } from '@/components/BrandCard'

export default function SavedPage() {
  const gens = useGenerations()
  const saved = useSaved().map((s) => ({ ref: s.ref, hit: resolveRef(s.ref, gens) })).filter((x) => x.hit)
  const hydrated = useHydrated()
  const plan = usePlan()

  if (!hydrated) return <div className="min-h-screen" />
  return (
    <>
      <PageIntro label="Yours · kept in this browser" title="Saved recipes" />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        {/* The site being built — one draft, kept until it becomes a recipe. */}
        {plan.pages.length > 0 && (
          <Link href="/studio/direction" className="mb-10 flex flex-wrap items-center justify-between gap-3 border border-line bg-white p-5 transition-colors hover:bg-paper-2">
            <span><span className="label block text-muted">Site in progress</span>
              <span className="mt-1.5 block text-lg">{plan.name || 'Untitled site'}</span>
              <span className="block text-sm text-muted">Continue where you left off.</span></span>
            <span className="btn btn-ink btn-sm">Continue</span>
          </Link>
        )}
        {saved.length === 0 ? (
          <div className="border-t border-line py-20">
            <p className="display text-3xl">Nothing saved yet.</p>
            <p className="mt-3 text-ink-2">A recipe you save from its page shows up here.</p>
            <Link href="/library" className="btn btn-ink mt-6">Open the Library</Link>
          </div>
        ) : (
          <ul className="grid border-l border-t border-line md:grid-cols-2 xl:grid-cols-3">
            {saved.map(({ ref, hit }) => (
              <li key={ref} className="group relative border-b border-r border-line bg-white">
                <Link href={hit!.href} className="block after:absolute after:inset-0" aria-label={`Open ${hit!.recipe.metadata.spec.brief?.name || hit!.recipe.title}`}><Brand r={hit!.recipe} /></Link>
                <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                  <span className="label truncate text-muted">{purposes[hit!.recipe.metadata.spec.purpose].name} · {directions[hit!.recipe.metadata.spec.direction].name}</span>
                  <button type="button" className="link relative z-10 text-sm" onClick={() => toggleSaved(ref)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

/** A saved recipe as its brand: the same brand sheet as Direction and the recipe page, small. */
function Brand({ r }: { r: UniversalRecipe }) {
  const t = r.visualSystem.typography, spec = r.metadata.spec
  const c = Object.fromEntries(r.visualSystem.palette.tokens.map((x) => [x.role, x.hex])) as PaletteColors
  useGoogleFonts(t.googleFamilies)
  return <BrandSheetMini name={spec.brief?.name || r.title.split(' — ')[0]} about={spec.brief?.offer || r.summary} colors={c} type={t} nameSize="2.2rem" className="aspect-[16/10]" />
}
