'use client'
// The user's site plan from the showcase (/kit), kept in the browser like saved recipes.
import { useMemo } from 'react'
import { EMPTY_PLAN, cleanPlan } from '@/features/kit/plan'
import type { KitPlan } from '@/types/domain'
import { KEYS, get, useStored, write } from './store'

// ponytail: one-time upgrade of the pieces-only kit (2026-09-29): its pieces had no place yet, so it starts fresh.
export const readPlan = (): KitPlan => cleanPlan(get<unknown>(KEYS.plan, null))
export const writePlan = (p: KitPlan) => write(KEYS.plan, p)
export const updatePlan = (f: (p: KitPlan) => KitPlan) => writePlan(f(readPlan()))

export function usePlan(): KitPlan {
  const raw = useStored<unknown>(KEYS.plan, null)
  return useMemo(() => (raw ? cleanPlan(raw) : EMPTY_PLAN), [raw])
}

/** What is in the plan — for the bag badge and tooltip. */
export function planSummary(p: KitPlan) {
  const sections = p.pages.reduce((n, pg) => n + pg.sections.filter((s) => s.id !== 'hero').length, 0)
  const pieces = p.pages.reduce((n, pg) => n + pg.sections.reduce((m, s) => m + s.pieces.length, 0), 0)
  return { pages: p.pages.length, sections, pieces, count: p.pages.length + pieces + [p.direction, p.palette, p.typography, p.shape, p.nav, p.hero, p.imagePresentation].filter(Boolean).length }
}
