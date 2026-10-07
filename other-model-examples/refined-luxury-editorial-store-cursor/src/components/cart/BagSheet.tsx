'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { cartCopy } from '@/content/copy'
import { formatPrice, useCart } from './cart-context'

// The primary action, everywhere: a slide-in panel that reviews the bag and leads to checkout.
export function BagSheet() {
  const { detailed, count, subtotal, setQty, remove } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 px-4">
          <ShoppingBag className="size-4" aria-hidden />
          <span>Bag</span>
          {count > 0 && <span className="tabular-nums text-(--color-accent)">{count}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{cartCopy.title}</SheetTitle>
          <SheetDescription>
            {count > 0 ? `${count} item${count > 1 ? 's' : ''}, posted from the studio.` : cartCopy.empty}
          </SheetDescription>
        </SheetHeader>

        {detailed.length > 0 ? (
          <>
            <ul className="flex-1 divide-y divide-(--color-border)">
              {detailed.map(({ product, qty, option }) => (
                <li key={product.slug + (option ?? '')} className="flex gap-4 py-4">
                  <MediaAsset id={product.image} alt="" className="h-24 w-20 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <Link href={`/product/${product.slug}`} onClick={() => setOpen(false)} className="type-body hover:underline">
                        {product.name}
                      </Link>
                      <span className="type-body tabular-nums">{formatPrice(product.priceValue * qty)}</span>
                    </div>
                    <p className="type-utility mt-1 text-(--color-muted)">{option ?? product.size}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="type-body flex items-center border border-(--color-border)">
                        <button type="button" aria-label="One fewer" onClick={() => setQty(product.slug, qty - 1, option)} className="px-3 py-1.5">−</button>
                        <span aria-live="polite" className="w-7 text-center tabular-nums">{qty}</span>
                        <button type="button" aria-label="One more" onClick={() => setQty(product.slug, qty + 1, option)} className="px-3 py-1.5">+</button>
                      </div>
                      <button type="button" onClick={() => remove(product.slug, option)} className="type-utility text-(--color-muted) transition-colors hover:text-(--color-text) hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4">
              <Separator />
              <div className="type-body flex justify-between">
                <span>{cartCopy.subtotal}</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout" onClick={() => setOpen(false)}>{cartCopy.checkout}</Link>
              </Button>
              <Button asChild variant="link" className="w-full">
                <Link href="/cart" onClick={() => setOpen(false)}>View bag</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col justify-between gap-6">
            <p className="type-body max-w-[36ch] text-(--color-muted)">{cartCopy.empty}</p>
            <Button asChild size="lg" className="w-full">
              <Link href="/shop" onClick={() => setOpen(false)}>Shop the five scents</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}