'use client'
// Tiny localStorage store with React subscription. MVP persistence layer.
// ponytail: browser-only storage; swap read/write for Supabase calls when accounts need to sync across devices.

import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
const cache = new Map<string, { raw: string | null; value: unknown }>()

function read<T>(key: string, fallback: T): T {
  let raw: string | null = null
  try { raw = localStorage.getItem(key) } catch { return fallback }
  const hit = cache.get(key)
  if (hit && hit.raw === raw) return hit.value as T
  let value: T = fallback
  try { value = raw ? (JSON.parse(raw) as T) : fallback } catch { /* corrupted entry → fallback */ }
  cache.set(key, { raw, value })
  return value
}

export function write<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private mode / quota */ }
  listeners.forEach((l) => l())
}

export function get<T>(key: string, fallback: T): T {
  return typeof window === 'undefined' ? fallback : read(key, fallback)
}

function subscribe(l: () => void) {
  listeners.add(l)
  const onStorage = () => l()
  window.addEventListener('storage', onStorage)
  return () => { listeners.delete(l); window.removeEventListener('storage', onStorage) }
}

/** `fallback` must be a stable (module-level) value. */
export function useStored<T>(key: string, fallback: T): T {
  return useSyncExternalStore(subscribe, () => read(key, fallback), () => fallback)
}

const noop = () => () => {}
/** false during SSR/hydration, true once client storage can be read. */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false)

export const KEYS = {
  generations: 'opuskit:generations',
  saved: 'opuskit:saved',
  recent: 'opuskit:recent',
  entitlements: 'opuskit:entitlements',
  user: 'opuskit:user',
  kit: 'opuskit:kit', // retired 2026-09-29: pieces-only kit, migrated into plan
  plan: 'opuskit:plan',
  collection: 'opuskit:collection',
  composed: 'opuskit:composed', // the Collection the Studio's plan was last built from
  step: 'opuskit:step', // the building step last open (Brand or Pages), where Continue building returns
} as const
