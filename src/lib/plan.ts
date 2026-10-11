'use client'
// The studio's site plan, kept in the browser like saved recipes.
import { useMemo } from 'react'
import { EMPTY_PLAN, cleanPlan } from '@/features/studio/plan'
import type { StudioPlan } from '@/types/domain'
import { KEYS, get, useStored, write } from './store'

// ponytail: one-time upgrade of the pieces-only kit (2026-09-29): its pieces had no place yet, so it starts fresh.
export const readPlan = (): StudioPlan => cleanPlan(get<unknown>(KEYS.plan, null))
export const writePlan = (p: StudioPlan) => write(KEYS.plan, p)
export const updatePlan = (f: (p: StudioPlan) => StudioPlan) => writePlan(f(readPlan()))

export function usePlan(): StudioPlan {
  const raw = useStored<unknown>(KEYS.plan, null)
  return useMemo(() => (raw ? cleanPlan(raw) : EMPTY_PLAN), [raw])
}

/** What is in the plan — for the bag badge and tooltip. */
