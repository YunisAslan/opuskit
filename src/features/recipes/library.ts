'use client'
// Client-side recipe library: generated recipes, saved + recent references.
// A "ref" is `seed:<slug>` or `gen:<id>` so seeds and generated recipes share one saved/recent list.

import { seedBySlug } from '@/data/recipes'
import { KEYS, get, useStored, write } from '@/lib/store'
import type { RecipeSpec, UniversalRecipe } from '@/types/domain'
import { composeRecipe, isValidSpec, specFromSeed } from './engine'

export type Generation = { spec: RecipeSpec; createdAt: number }
type Generations = Record<string, Generation>
export type SavedItem = { ref: string; savedAt: number }

const NO_GENS: Generations = {}
const NO_SAVED: SavedItem[] = []

export const useGenerations = () => useStored(KEYS.generations, NO_GENS)
export const useSaved = () => useStored(KEYS.saved, NO_SAVED)

export function saveGeneration(spec: RecipeSpec, id = crypto.randomUUID().slice(0, 8)) {
  const all = get(KEYS.generations, NO_GENS)
  write(KEYS.generations, { ...all, [id]: { spec, createdAt: all[id]?.createdAt ?? Date.now() } })
  return id
}

export function resolveRef(ref: string, gens: Generations): { recipe: UniversalRecipe; href: string } | null {
  const [kind, key] = ref.split(':')
  if (kind === 'seed' && seedBySlug[key]) return { recipe: composeRecipe(specFromSeed(seedBySlug[key])), href: `/studio/open?from=seed:${key}` }
  const g = gens[key]
  if (kind === 'gen' && g && isValidSpec(g.spec)) return { recipe: composeRecipe(g.spec, key), href: `/result/${key}` }
  return null
}

export function toggleSaved(ref: string) {
  const saved = get(KEYS.saved, NO_SAVED)
  write(KEYS.saved, saved.some((s) => s.ref === ref) ? saved.filter((s) => s.ref !== ref) : [{ ref, savedAt: Date.now() }, ...saved])
}

