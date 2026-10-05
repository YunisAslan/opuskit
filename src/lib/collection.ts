'use client'
// The Library's Collection, kept in the browser like the kit's plan.
import { useMemo } from 'react'
import { EMPTY_COLLECTION, cleanCollection, collectionToPlan, type Collection } from '@/features/library/collection'
import type { PieceId } from '@/types/domain'
import { readPlan, updatePlan, writePlan } from './kit'
import { KEYS, get, useStored, write } from './store'

export const readCollection = (): Collection => cleanCollection(get<unknown>(KEYS.collection, null))
export const updateCollection = (f: (c: Collection) => Collection) => write(KEYS.collection, f(readCollection()))

export function useCollection(): Collection {
  const raw = useStored<unknown>(KEYS.collection, null)
  return useMemo(() => (raw ? cleanCollection(raw) : EMPTY_COLLECTION), [raw])
}

/** Studio → Pages: the plan is (re)built from the Collection only when what was collected changed, so page edits survive
 *  a trip back to the Studio to fix a name. Name and sentence always follow the Studio.
 *  ponytail: any change to the Collection rebuilds the pages (edits there are lost, with Undo); merge if that bites. */
export function planFromStudio(): { rebuilt: boolean; unplaced: PieceId[]; undo?: () => void } {
  const c = readCollection(), sig = JSON.stringify([c.items, c.purpose, c.look]), plan = readPlan()
  if (plan.via === 'studio' && plan.pages.length && get<string | null>(KEYS.composed, null) === sig) {
    updatePlan((p) => ({ ...p, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined }))
    return { rebuilt: false, unplaced: [] }
  }
  const r = collectionToPlan(c)
  // Keeps the recipe it made last time, and the owner's files, so the recipe updates instead of multiplying.
  writePlan({ ...r.plan, via: 'studio', fromId: plan.via === 'studio' ? plan.fromId : undefined, uploads: plan.via === 'studio' ? plan.uploads : r.plan.uploads })
  write(KEYS.composed, sig)
  return { rebuilt: true, unplaced: r.unplaced, undo: plan.pages.length ? () => writePlan(plan) : undefined }
}
