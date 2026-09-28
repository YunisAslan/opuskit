"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { AssetKey } from "@/config/assets"

export type CartItem = { id: string; href: string; name: string; price: number; image: AssetKey; option?: string; qty: number }

type Cart = {
  items: CartItem[]
  count: number
  subtotal: number
  add: (item: Omit<CartItem, "qty">) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<Cart | null>(null)
const KEY = "buytolose-bag"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after SSR
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  const save = (next: CartItem[]) => {
    setItems(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }

  const cart: Cart = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    add: (item) => {
      const hit = items.find((i) => i.id === item.id)
      save(hit ? items.map((i) => (i === hit ? { ...i, qty: i.qty + 1 } : i)) : [...items, { ...item, qty: 1 }])
    },
    setQty: (id, qty) => save(qty < 1 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i))),
    clear: () => save([]),
  }

  return <CartContext value={cart}>{children}</CartContext>
}

export function useCart() {
  const c = useContext(CartContext)
  if (!c) throw new Error("useCart outside CartProvider")
  return c
}
