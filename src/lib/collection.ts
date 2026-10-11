'use client'
// The Library's Collection, kept in the browser like the kit's plan.
import { useMemo } from 'react'
import { EMPTY_COLLECTION, cleanCollection, collectionSig, type Collection } from '@/features/library/collection'
import { specToPlan } from '@/features/studio/plan'
import type { StudioPlan, RecipeSpec } from '@/types/domain'
import { writePlan } from './plan'
import { KEYS, get, useStored, write } from './store'

export const readCollection = (): Collection => cleanCollection(get<unknown>(KEYS.collection, null))
export const updateCollection = (f: (c: Collection) => Collection) => write(KEYS.collection, f(readCollection()))

export function useCollection(): Collection {
  const raw = useStored<unknown>(KEYS.collection, null)
  return useMemo(() => (raw ? cleanCollection(raw) : EMPTY_COLLECTION), [raw])
}

/** Opens a finished recipe (a saved one, an example's) in Direction, kept as it is (decision 44): its name, sentence
 *  and kind become You's, and Direction is told the plan was made from them, so it is not composed again. What was
 *  taken in the Library stays there; taking more, or changing the sentence or kind, starts again from it. */
export function openInStudio(spec: RecipeSpec, fromId: string | undefined, opened: string) {
  const plan = { ...specToPlan(spec, fromId), via: 'studio' as const }
  writePlan(plan)
  adoptPlan(plan, opened)
}

/** You takes the plan's name, sentence and kind, and Direction keeps the plan as it is. Also mends a plan being built
 *  whose You is empty (one opened before decision 44), so You is filled in and Direction is open. */
export function adoptPlan(plan: StudioPlan, opened: string) {
  const c = cleanCollection({ ...readCollection(), name: plan.name, about: plan.about, purpose: plan.purpose, offer: undefined })
  write(KEYS.collection, c)
  write(KEYS.composed, { sig: collectionSig(c), pick: 0, opened })
}
