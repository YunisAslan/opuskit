'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { assets } from '@/config/assets'
import { bySlug, money } from '@/data/shop'
import { useBag } from '@/lib/bag'

// The bag, one tap away on every page: a slide-in panel with what's in it and the way to the checkout.
export function Bag() {
  const { items, count, subtotal, setQty } = useBag()
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" className="type-utility gap-2 px-3" aria-label={`Your bag, ${count} ${count === 1 ? 'item' : 'items'}`}>
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
              <span className="tabular-nums">Bag {count > 0 ? `(${count})` : ''}</span>
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>Your bag stays here until orders open</TooltipContent>
      </Tooltip>
      <SheetContent className="gap-0 bg-(--color-background) p-0">
        <SheetHeader className="border-b border-(--color-border) p-6">
          <SheetTitle className="type-heading text-[length:var(--type-heading-size)]!">Your bag</SheetTitle>
          <SheetDescription className="type-utility text-(--color-muted)">Orders open in spring. Until then, your bag keeps everything you add.</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 p-6">
            <p className="type-body text-(--color-muted)">Nothing here yet. Most people start with the cleanser and the serum.</p>
            <SheetClose asChild><Button asChild variant="outline" className="mt-6"><Link href="/shop">See the six</Link></Button></SheetClose>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-(--color-border) overflow-y-auto px-6">
            {items.map((l) => {
              const p = bySlug(l.slug)!
              const img = assets[p.images[0]]
              return (
                <li key={l.slug + l.option} className="flex gap-4 py-5">
                  <img src={img.src} alt="" className="aspect-(--ratio-card) w-20 rounded-(--radius-media) object-cover" />
                  <div className="type-body flex-1">
                    <p className="flex justify-between gap-3"><span>{p.name}</span><span className="tabular-nums">{money(p.price * l.qty)}</span></p>
                    <p className="type-utility text-(--color-muted)">{p.size}{l.option ? `, ${l.option}` : ''}</p>
                    <div className="mt-3 flex items-center gap-1">
                      <Button size="icon" variant="ghost" aria-label={`One fewer ${p.name}`} onClick={() => setQty(l.slug, l.option, l.qty - 1)}>−</Button>
                      <span className="w-6 text-center tabular-nums">{l.qty}</span>
                      <Button size="icon" variant="ghost" aria-label={`One more ${p.name}`} onClick={() => setQty(l.slug, l.option, l.qty + 1)}>+</Button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {items.length > 0 && (
          <SheetFooter className="border-t border-(--color-border) p-6">
            <p className="type-body flex justify-between"><span>Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></p>
            <p className="type-utility text-(--color-muted)">Delivery is worked out at the checkout. Nothing is charged until orders open in spring.</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <SheetClose asChild><Button asChild variant="outline"><Link href="/cart">See your bag</Link></Button></SheetClose>
              <SheetClose asChild><Button asChild><Link href="/checkout">Checkout</Link></Button></SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
