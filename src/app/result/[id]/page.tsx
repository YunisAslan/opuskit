'use client'
import Link from 'next/link'
import { use, useMemo } from 'react'
import { updatePlan, usePlan } from '@/lib/plan'
import { composeRecipe, isValidSpec } from '@/features/recipes/engine'
import { saveGeneration, useGenerations } from '@/features/recipes/library'
import { RecipeDocument } from '@/features/recipes/RecipeDocument'
import { useHydrated } from '@/lib/store'

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const gen = useGenerations()[id]
  const recipe = useMemo(() => (gen && isValidSpec(gen.spec) ? composeRecipe(gen.spec, id) : null), [gen, id])
  // The recipe being built shows the steps bar; any other opens in the building steps when changed.
  const kit = usePlan()
  const own = kit.fromId === id && kit.via === 'studio'

  if (!useHydrated()) return <div className="min-h-screen" />
  if (!recipe) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="display text-4xl">We can&apos;t find this recipe.</h1>
        <p className="mt-4 text-ink-2">Recipes you create are stored in this browser. Open it on the device you made it on, or create a new one.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/library" className="btn btn-ink">Start a site</Link></div>
      </div>
    )
  }
  return (
    <>
      <RecipeDocument recipe={recipe} recipeRef={`gen:${id}`} onChange={(spec) => {
        saveGeneration(spec, id)
        // Files added here are the plan's files too, so the next update from the steps keeps them.
        if (own) updatePlan((p) => ({ ...p, from: spec, uploads: spec.uploads, assets: spec.assets, mediaPlan: spec.mediaPlan }))
      }} studio={own} />
    </>
  )
}
