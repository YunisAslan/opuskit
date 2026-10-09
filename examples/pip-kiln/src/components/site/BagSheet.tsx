'use client'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Button } from '@/components/ui/button'
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { nav } from '@/content/site'
import { cart as copy } from '@/content/cart'
import { useCart } from '@/lib/cart'
import { price } from '@/lib/format'

/** The slide-in bag: what's in it, change how many, then the bag page or checkout. */
export function BagSheet() {
  const c = useCart()
  return (
    <SheetContent side="right" aria-describedby={undefined}>
      <div className="flex items-center justify-between gap-4 border-b border-(--color-text)/20 px-(--gutter) py-4">
        <SheetTitle>{nav.sheetTitle}</SheetTitle>
        <SheetClose className="btn btn-light min-h-11 px-4">{nav.close}</SheetClose>
      </div>
      {c.lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-(--gutter) py-12">
          <SheetDescription className="t-card max-w-[22ch] text-(--color-text) [font-size:1.4rem]">{nav.sheetEmpty}</SheetDescription>
          <SheetClose asChild><Button asChild><Link href="/shop">{nav.sheetShop}</Link></Button></SheetClose>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-(--color-text)/20 px-(--gutter)">
            {c.lines.map((l) => (
              <li key={l.slug + l.glaze} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4">
                <MediaAsset id="productGrid" index={l.product.photo - 1} alt="" className="rounded-[16px]" sizes="72px" />
                <div className="min-w-0">
                  <p className="t-card">{l.product.name}</p>
                  <p className="type-caption text-(--color-muted)">{l.glaze}</p>
                  <div className="mt-2 inline-flex items-center rounded-(--radius-button) border border-(--color-text)">
                    <button type="button" aria-label={`${copy.fewer}: ${l.product.name}`} disabled={l.qty <= 1} onClick={() => c.setQty(l.slug, l.glaze, l.qty - 1)} className="press grid size-9 place-items-center rounded-full disabled:opacity-40"><Minus className="size-4" /></button>
                    <span aria-live="polite" className="t-action w-6 text-center tabular-nums">{l.qty}</span>
                    <button type="button" aria-label={`${copy.more}: ${l.product.name}`} onClick={() => c.setQty(l.slug, l.glaze, l.qty + 1)} className="press grid size-9 place-items-center rounded-full"><Plus className="size-4" /></button>
                  </div>
                </div>
                <p className="t-action tabular-nums">{price(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 border-t border-(--color-text)/20 bg-(--color-background) px-(--gutter) pb-6 pt-4">
            <p className="flex items-baseline justify-between"><span className="type-body">{copy.subtotal}</span><span className="t-card tabular-nums">{price(c.subtotal)}</span></p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <SheetClose asChild><Button asChild variant="light"><Link href="/cart">{nav.sheetToBag}</Link></Button></SheetClose>
              <SheetClose asChild><Button asChild><Link href="/checkout">{nav.sheetCheckout}</Link></Button></SheetClose>
            </div>
          </div>
        </>
      )}
    </SheetContent>
  )
}
