'use client'
// The Library's Collection, kept in the browser like the kit's plan.
import { useMemo } from 'react'
import { EMPTY_COLLECTION, applyItems, cleanCollection, collectionToPlan, itemKey, type Collection } from '@/features/library/collection'
import type { PieceId } from '@/types/domain'
import { readPlan, updatePlan, writePlan } from './kit'
import { KEYS, get, useStored, write } from './store'

export const readCollection = (): Collection => cleanCollection(get<unknown>(KEYS.collection, null))
export const updateCollection = (f: (c: Collection) => Collection) => write(KEYS.collection, f(readCollection()))

export function useCollection(): Collection {
  const raw = useStored<unknown>(KEYS.collection, null)
  return useMemo(() => (raw ? cleanCollection(raw) : EMPTY_COLLECTION), [raw])
}

/** Collection → building. The pages are built from the Collection once — and again only when the kind of site changes.
 *  After that, what is newly collected joins the pages the person has arranged (`applyItems`, adding, never
 *  replacing); a newly collected site's parts wait in the Collection panel on Pages. Name and sentence always follow. */
type Composed = { purpose?: string; keys: string[] }
export function planFromStudio(opts: { rebuild?: boolean } = {}): { rebuilt: boolean; unplaced: PieceId[]; added: number; undo?: () => void } {
  const c = readCollection(), plan = readPlan(), last = get<Composed | string | null>(KEYS.composed, null)
  const keys = c.items.map(itemKey)
  const kind = c.purpose ?? (plan.via === 'studio' ? plan.purpose : undefined)
  const same = plan.via === 'studio' && plan.pages.length && last && typeof last === 'object' && last.purpose === kind && !opts.rebuild
  if (same) {
    const fresh = c.items.filter((i) => !last.keys.includes(itemKey(i)))
    const r = applyItems(plan, fresh, false)
    writePlan({ ...r.plan, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined })
    write(KEYS.composed, { purpose: kind, keys })
    return { rebuilt: false, unplaced: r.unplaced, added: r.added.length, undo: fresh.length ? () => { writePlan(plan); write(KEYS.composed, last) } : undefined }
  }
  const r = collectionToPlan(c)
  // Keeps the recipe it made last time, and the owner's files, so the recipe updates instead of multiplying.
  writePlan({ ...r.plan, via: 'studio', fromId: plan.via === 'studio' ? plan.fromId : undefined, uploads: plan.via === 'studio' ? plan.uploads : r.plan.uploads })
  write(KEYS.composed, { purpose: r.plan.purpose, keys })
  return { rebuilt: true, unplaced: r.unplaced, added: 0, undo: plan.pages.length ? () => writePlan(plan) : undefined }
}
