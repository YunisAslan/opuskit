'use client'
// The bag: a client-side store kept in localStorage (no shop backend yet). Lines are keyed by product + glaze.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { productBySlug, type Glaze, type Product } from '@/content/products'
import { site } from '@/content/site'

export type Line = { slug: string; glaze: Glaze; qty: number }
type Cart = {
  lines: (Line & { product: Product })[]
  count: number
  subtotal: number
  delivery: number
  ready: boolean
  /** bumps each time something is added — the menu's count answers it */
  pulse: number
  add: (slug: string, glaze: Glaze, qty?: number) => void
  setQty: (slug: string, glaze: Glaze, qty: number) => void
  remove: (slug: string, glaze: Glaze) => void
  clear: () => void
}

const KEY = 'pip-kiln-bag'
const Ctx = createContext<Cart | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([])
  const [ready, setReady] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Line[]
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the saved bag once after hydration
      if (Array.isArray(saved)) setRaw(saved.filter((l) => productBySlug(l.slug) && l.qty > 0))
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(KEY, JSON.stringify(raw)) } catch {}
  }, [raw, ready])

  const add = useCallback((slug: string, glaze: Glaze, qty = 1) => {
    setRaw((ls) => {
      const hit = ls.find((l) => l.slug === slug && l.glaze === glaze)
      return hit ? ls.map((l) => (l === hit ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...ls, { slug, glaze, qty }]
    })
    setPulse((p) => p + 1)
  }, [])
  const setQty = useCallback((slug: string, glaze: Glaze, qty: number) => {
    setRaw((ls) => ls.map((l) => (l.slug === slug && l.glaze === glaze ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)))
  }, [])
  const remove = useCallback((slug: string, glaze: Glaze) => setRaw((ls) => ls.filter((l) => !(l.slug === slug && l.glaze === glaze))), [])
  const clear = useCallback(() => setRaw([]), [])

  const value = useMemo<Cart>(() => {
    const lines = raw.flatMap((l) => { const product = productBySlug(l.slug); return product ? [{ ...l, product }] : [] })
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const delivery = subtotal === 0 || subtotal >= site.freeDeliveryFrom ? 0 : site.deliveryCost
    return { lines, count, subtotal, delivery, ready, pulse, add, setQty, remove, clear }
  }, [raw, ready, pulse, add, setQty, remove, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart outside CartProvider')
  return c
}
