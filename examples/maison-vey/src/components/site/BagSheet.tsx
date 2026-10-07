'use client'
// The bag as a slide-in panel — the main action of the site lives here on every page.
import Link from 'next/link'
import { bag as copy } from '@/content/copy'
import { formatPrice, getScent } from '@/content/products'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useCart } from './cart'
import { Qty } from './Qty'

export function BagSheet() {
  const { open, setOpen, lines, subtotal, delivery, setQty, remove } = useCart()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{copy.title}</SheetTitle>
          <SheetClose className="type-utility link-quiet inline-flex min-h-11 cursor-pointer items-center">Close</SheetClose>
        </SheetHeader>
        <SheetDescription className="sr-only">The scents you have chosen</SheetDescription>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col gap-8 p-(--gutter)">
            <MediaAsset id="productPhotography" sizes="(min-width: 640px) 28rem, 100vw" className="w-1/2" />
            <p className="type-body max-w-[32ch] text-(--color-muted)">{copy.empty}</p>
            <SheetClose asChild><Link href="/shop" className="btn-secondary self-start">{copy.emptyAction}</Link></SheetClose>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-(--color-border) px-(--gutter)">
              {lines.map((l) => {
                const s = getScent(l.slug)!
                return (
                  <li key={l.slug + l.size} className="grid grid-cols-[5rem_1fr] gap-4 py-6">
                    <MediaAsset id={s.images.front} alt={s.alt.front} sizes="5rem" />
                    <div className="flex flex-col gap-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <SheetClose asChild><Link href={`/shop/${l.slug}`} className="type-body link-quiet">{l.name}</Link></SheetClose>
                        <span className="type-body tabular-nums">{formatPrice(l.total)}</span>
                      </div>
                      <p className="type-caption text-(--color-muted)">{l.size}</p>
                      <div className="flex items-center justify-between gap-3">
                        <Qty size="sm" label={`Quantity of ${l.name}`} value={l.qty} onChange={(n) => setQty(l.slug, l.size, n)} />
                        <button type="button" onClick={() => remove(l.slug, l.size)} className="type-caption link-quiet min-h-11 cursor-pointer text-(--color-muted)">{copy.remove}</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <SheetFooter>
              <dl className="type-body space-y-1">
                <div className="flex justify-between"><dt className="text-(--color-muted)">{copy.subtotal}</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-(--color-muted)">{copy.delivery}</dt><dd className="tabular-nums">{delivery ? formatPrice(delivery) : copy.deliveryFree}</dd></div>
              </dl>
              <p className="type-caption text-(--color-muted)">{copy.sample}</p>
              <SheetClose asChild><Link href="/checkout" className="btn-primary w-full">{copy.checkout}</Link></SheetClose>
              <SheetClose asChild><Link href="/cart" className="type-caption link-quiet self-center py-2">{copy.view}</Link></SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
