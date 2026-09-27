'use client'
import Link from 'next/link'
import { use, useMemo } from 'react'
import { composeRecipe, isValidSpec } from '@/features/recipes/engine'
import { saveGeneration, useGenerations } from '@/features/recipes/library'
import { RecipeDocument } from '@/features/recipes/RecipeDocument'
import { useHydrated } from '@/lib/store'

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const gen = useGenerations()[id]
  const recipe = useMemo(() => (gen && isValidSpec(gen.spec) ? composeRecipe(gen.spec, id) : null), [gen, id])

  if (!useHydrated()) return <div className="min-h-screen" />
  if (!recipe) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="display text-4xl">We can&apos;t find this recipe.</h1>
        <p className="mt-4 text-ink-2">Recipes you create are stored in this browser. Open it on the device you made it on, or create a new one.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/create" className="btn btn-ink">Create a recipe</Link><Link href="/explore" className="btn btn-line">Explore recipes</Link></div>
      </div>
    )
  }
  return <RecipeDocument recipe={recipe} recipeRef={`gen:${id}`} onRemix={(spec) => saveGeneration(spec, id)} />
}
