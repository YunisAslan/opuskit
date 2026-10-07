'use client'
// The bag: a small client-side store (kept in this browser only) with the bag sheet's open state.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { getScent } from '@/content/products'
import { bag as copy, product as productCopy } from '@/content/copy'

export type Line = { slug: string; size: string; qty: number }
export type PricedLine = Line & { name: string; price: number; total: number }

type Ctx = {
  lines: PricedLine[]
  count: number
  subtotal: number
  delivery: number
  ready: boolean
  add: (slug: string, size: string, qty?: number) => void
  setQty: (slug: string, size: string, qty: number) => void
  remove: (slug: string, size: string) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const CartContext = createContext<Ctx | null>(null)
const KEY = 'maison-vey-bag'

function price(l: Line): PricedLine | null {
  const s = getScent(l.slug)
  const z = s?.sizes.find((x) => x.label === l.size)
  if (!s || !z) return null
  return { ...l, name: s.name, price: z.price, total: z.price * l.qty }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([])
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from this browser once
      if (Array.isArray(v)) setRaw(v)
    } catch {}
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(KEY, JSON.stringify(raw)) } catch {}
  }, [raw, ready])

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setRaw((ls) => {
      const hit = ls.find((l) => l.slug === slug && l.size === size)
      return hit ? ls.map((l) => (l === hit ? { ...l, qty: Math.min(9, l.qty + qty) } : l)) : [...ls, { slug, size, qty }]
    })
    const name = getScent(slug)?.name ?? ''
    toast(productCopy.added(name), { action: { label: productCopy.viewBag, onClick: () => setOpen(true) } })
  }, [])
  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setRaw((ls) => ls.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, Math.min(9, qty)) } : l)))
  }, [])
  const remove = useCallback((slug: string, size: string) => setRaw((ls) => ls.filter((l) => !(l.slug === slug && l.size === size))), [])
  const clear = useCallback(() => setRaw([]), [])

  const value = useMemo<Ctx>(() => {
    const lines = raw.map(price).filter((l): l is PricedLine => !!l)
    const subtotal = lines.reduce((n, l) => n + l.total, 0)
    return {
      lines, subtotal, ready,
      count: lines.reduce((n, l) => n + l.qty, 0),
      delivery: subtotal === 0 || subtotal >= copy.freeOver ? 0 : copy.deliveryPrice,
      add, setQty, remove, clear, open, setOpen,
    }
  }, [raw, ready, add, setQty, remove, clear, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const c = useContext(CartContext)
  if (!c) throw new Error('useCart outside CartProvider')
  return c
}
