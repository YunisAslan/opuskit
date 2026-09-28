"use client"
import Link from "next/link"
import { ViewTransition } from "react"
import { formatPrice, type Product } from "@/data/products"
import { MediaAsset } from "./MediaAsset"
import { AddToBag } from "./AddToBag"

/** 4:5 image, name, price, availability. Hover swaps to the alternate image; quick add appears on desktop only. */
export function ProductCard({ product: p, priority }: { product: Product; priority?: boolean }) {
  const sizes = "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
  return (
    <article className="group relative">
      <Link href={`/shop/${p.slug}`} className="block">
        <ViewTransition name={`product-${p.slug}`} share="auto" default="none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
            <MediaAsset id={p.images[0]} fill sizes={sizes} priority={priority} />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <MediaAsset id={p.images[1]} fill sizes={sizes} />
            </div>
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="font-heading text-base font-semibold">{p.name}</h3>
          <p className="shrink-0">{formatPrice(p.price)}</p>
        </div>
        <p className="mt-1 font-utility text-utility text-muted">{p.availability}</p>
      </Link>
      {p.availability !== "Sold out" && (
        <div className="absolute top-3 right-3 hidden opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 lg:block">
          <AddToBag product={p} size={p.sizes?.[2]} label="Quick add" className="btn btn-primary min-h-11 px-4" />
        </div>
      )}
    </article>
  )
}
