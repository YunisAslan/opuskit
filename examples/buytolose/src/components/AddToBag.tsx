"use client"
import { useState } from "react"
import type { Product } from "@/data/products"
import { useCart } from "./Cart"

export function AddToBag({ product: p, size, label = "Add to bag", className = "btn btn-primary w-full" }:
  { product: Product; size?: string; label?: string; className?: string }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const soldOut = p.availability === "Sold out"
  return (
    <button type="button" className={className} disabled={soldOut} aria-live="polite"
      onClick={() => {
        add({ id: `${p.slug}${size ? `-${size}` : ""}`, href: `/shop/${p.slug}`, name: p.name, price: p.price, image: p.images[0], option: size })
        setAdded(true)
        setTimeout(() => setAdded(false), 1600)
      }}>
      {soldOut ? "Sold out" : added ? "Added" : label}
    </button>
  )
}
