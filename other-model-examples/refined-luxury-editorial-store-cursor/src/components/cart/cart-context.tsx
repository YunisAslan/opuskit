'use client'
// A small client-side bag. The store's goal is "buy something", so the whole flow — add, review,
// adjust, check out — works end to end without a server, and survives a refresh.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '@/content/products'

export type CartLine = { slug: string; qty: number; option?: string }
export type DetailedLine = { product: Product; qty: number; option?: string; lineTotal: number }

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  detailed: DetailedLine[]
  ready: boolean
  add: (slug: string, qty?: number, option?: string) => void
  remove: (slug: string, option?: string) => void
  setQty: (slug: string, qty: number, option?: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'maison-vey-bag'

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)

  // Load once on mount so the server render and the first client render agree.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw) as CartLine[])
    } catch {
      /* ignore malformed storage */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* ignore quota errors */
    }
  }, [lines, ready])

  const add = useCallback((slug: string, qty = 1, option?: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.option === option)
      if (i === -1) return [...prev, { slug, qty, option }]
      const next = [...prev]
      next[i] = { ...next[i], qty: next[i].qty + qty }
      return next
    })
  }, [])

  const remove = useCallback((slug: string, option?: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.option === option)))
  }, [])

  const setQty = useCallback((slug: string, qty: number, option?: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug && l.option === option ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const detailed = useMemo<DetailedLine[]>(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.slug)
          if (!product) return null
          return { product, qty: l.qty, option: l.option, lineTotal: product.priceValue * l.qty }
        })
        .filter((x): x is DetailedLine => x !== null),
    [lines],
  )

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines])
  const subtotal = useMemo(() => detailed.reduce((n, l) => n + l.lineTotal, 0), [detailed])

  const value = useMemo(
    () => ({ lines, count, subtotal, detailed, ready, add, remove, setQty, clear }),
    [lines, count, subtotal, detailed, ready, add, remove, setQty, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

/** Format pence-free pound strings from the numeric price value. */
export function formatPrice(value: number) {
  return `£${value}`
}