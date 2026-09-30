'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useMemo } from 'react'
import { StepBar } from '@/app/kit/StepBar'
import { specToPlan } from '@/features/kit/plan'
import { updatePlan, usePlan } from '@/lib/kit'
import { composeRecipe, isValidSpec } from '@/features/recipes/engine'
import { saveGeneration, useGenerations } from '@/features/recipes/library'
import { RecipeDocument } from '@/features/recipes/RecipeDocument'
import { useHydrated } from '@/lib/store'

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const gen = useGenerations()[id]
  const recipe = useMemo(() => (gen && isValidSpec(gen.spec) ? composeRecipe(gen.spec, id) : null), [gen, id])
  // Step 3 of the kit: the bar reads the kit's plan when this recipe came from it, else this recipe as a plan.
  const kit = usePlan(), router = useRouter()
  const own = kit.fromId === id
  const plan = useMemo(() => (own ? kit : gen && isValidSpec(gen.spec) ? specToPlan(gen.spec, id) : kit), [own, kit, gen, id])

  if (!useHydrated()) return <div className="min-h-screen" />
  if (!recipe) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="display text-4xl">We can&apos;t find this recipe.</h1>
        <p className="mt-4 text-ink-2">Recipes you create are stored in this browser. Open it on the device you made it on, or create a new one.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/kit" className="btn btn-ink">Start a site</Link><Link href="/explore" className="btn btn-line">Explore recipes</Link></div>
      </div>
    )
  }
  return (
    <>
      <StepBar plan={plan} step="recipe" sticky={false} onGo={(s) => s !== 'recipe' && router.push(`/kit?step=${s}${own ? '' : `&from=gen:${id}`}`)} />
      <RecipeDocument recipe={recipe} recipeRef={`gen:${id}`} onChange={(spec) => {
        saveGeneration(spec, id)
        // Files added here are the kit's files too, so the next update from the kit keeps them.
        if (own) updatePlan((p) => ({ ...p, from: spec, uploads: spec.uploads, assets: spec.assets, mediaPlan: spec.mediaPlan }))
      }} inKit />
    </>
  )
}
