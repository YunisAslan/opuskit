'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { Glaze, Product } from '@/content/products'
import { useCart } from '@/lib/cart'

/** Add to the bag: the button reads "Added" for 1.5s, the menu count bumps, a toast offers the way to the bag. */
export function useAddToBag() {
  const { add } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const t = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(t.current), [])
  const go = useCallback((p: Product, glaze: Glaze = 'Sunshine', qty = 1) => {
    add(p.slug, glaze, qty)
    setAdded(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setAdded(false), 1500)
    toast(`${qty > 1 ? `${qty} × ` : ''}${p.name} (${glaze}) is in your bag.`, { action: { label: 'See bag', onClick: () => router.push('/cart') } })
  }, [add, router])
  return { add: go, added }
}
