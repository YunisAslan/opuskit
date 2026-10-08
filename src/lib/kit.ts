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
