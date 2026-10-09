'use client'
// Cart → Product Grid: the pieces not in the bag yet.
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { SectionHead } from '@/components/parts/SectionHead'
import { cart as copy } from '@/content/cart'
import { products } from '@/content/products'
import { useCart } from '@/lib/cart'

export function CartGrid() {
  const { lines } = useCart()
  const inBag = new Set(lines.map((l) => l.slug))
  const rest = products.filter((p) => !inBag.has(p.slug) && p.stock > 0)
  const list = (rest.length ? rest : products.filter((p) => p.stock > 0)).slice(0, 4)
  return <ProductGridSection head={<SectionHead text={copy.gridTitle} lines={copy.gridLines} />} products={list} />
}
