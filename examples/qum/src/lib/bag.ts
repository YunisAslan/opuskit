'use client'
import { useSyncExternalStore } from 'react'
import { bySlug } from '@/data/shop'

// The bag lives in this browser (localStorage) until orders open; nothing is sent anywhere.
export type Line = { slug: string; option?: string; qty: number }
const KEY = 'qum-bag'
const EMPTY: Line[] = []
let lines: Line[] | null = null
const listeners = new Set<() => void>()

function read(): Line[] {
  if (lines === null) {
    try { lines = (JSON.parse(localStorage.getItem(KEY) ?? '[]') as Line[]).filter((l) => bySlug(l.slug)) } catch { lines = [] }
  }
  return lines
}
function write(next: Line[]) {
  lines = next.filter((l) => l.qty > 0)
  try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch {}
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l) } }
const same = (a: Line, slug: string, option?: string) => a.slug === slug && a.option === option

export function useBag() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY)
  return {
    items,
    count: items.reduce((n, l) => n + l.qty, 0),
    subtotal: items.reduce((n, l) => n + l.qty * (bySlug(l.slug)?.price ?? 0), 0),
    add: (slug: string, qty = 1, option?: string) => {
      const cur = read()
      write(cur.some((l) => same(l, slug, option)) ? cur.map((l) => same(l, slug, option) ? { ...l, qty: l.qty + qty } : l) : [...cur, { slug, option, qty }])
    },
    setQty: (slug: string, option: string | undefined, qty: number) => write(read().map((l) => same(l, slug, option) ? { ...l, qty } : l)),
  }
}
