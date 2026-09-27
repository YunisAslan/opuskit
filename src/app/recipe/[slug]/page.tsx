import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { SeedRecipe } from './SeedRecipe'

export const generateStaticParams = () => recipeSeeds.map((s) => ({ slug: s.slug }))
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/recipe/[slug]'>): Promise<Metadata> {
  const seed = seedBySlug[(await props.params).slug]
  return seed ? { title: seed.title, description: seed.summary } : {}
}

export default async function RecipePage(props: PageProps<'/recipe/[slug]'>) {
  const { slug } = await props.params
  if (!seedBySlug[slug]) notFound()
  return <SeedRecipe slug={slug} />
}
