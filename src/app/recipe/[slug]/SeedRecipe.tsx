'use client'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { seedBySlug } from '@/data/recipes'
import { composeRecipe, specFromSeed } from '@/features/recipes/engine'
import { saveGeneration } from '@/features/recipes/library'
import { RecipeDocument } from '@/features/recipes/RecipeDocument'

export function SeedRecipe({ slug }: { slug: string }) {
  const router = useRouter()
  const recipe = useMemo(() => composeRecipe(specFromSeed(seedBySlug[slug])), [slug])
  // Changing a curated recipe (e.g. adding your own logo) creates your own copy; the original stays untouched.
  return <RecipeDocument recipe={recipe} recipeRef={`seed:${slug}`} onChange={(spec) => router.push(`/result/${saveGeneration(spec)}#media`)} />
}
