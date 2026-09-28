"use client"
import Link from "next/link";
import { useState } from "react";
import { AddToBag } from "@/components/AddToBag";
import type { Product } from "@/data/products";

export function BuyBox({ product: p }: { product: Product }) {
  const [size, setSize] = useState(p.sizes?.[2]);
  return (
    <div className="mt-10">
      {p.sizes && (
        <fieldset>
          <legend className="label">Size <Link href="/size-guide" className="link ml-2 inline-flex min-h-11 items-center text-muted">Size guide</Link></legend>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} className="peer sr-only" />
                <span className="flex h-12 min-w-12 items-center justify-center rounded-full border border-muted px-4 font-utility transition-colors duration-150 peer-checked:bg-primary peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-text">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="mt-6"><AddToBag product={p} size={size} /></div>
    </div>
  );
}
