'use client'
// The shop without a checkout: a bag kept in this browser (localStorage), a product panel to pick a size, and a
// bag panel whose "Check out" opens an email with the order written out.
import { createContext, useContext, useState, useSyncExternalStore, type ReactNode, type MouseEvent } from 'react'
import { toast } from 'sonner'
import { Minus, Plus, X } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SwapButton } from '@/components/pieces/SwapButton'
import { ORDERS, bySlug, euro, type ShopProduct } from '@/data/shop'

type Line = { slug: string; size: string; qty: number }

// --- the bag: a tiny external store over localStorage ---
const KEY = 'saint-ashe-bag'
const EMPTY: Line[] = []
let lines: Line[] | null = null
const subs = new Set<() => void>()
function read(): Line[] {
  if (lines === null) {
    try { lines = (JSON.parse(localStorage.getItem(KEY) ?? '[]') as Line[]).filter((l) => bySlug(l.slug)) } catch { lines = [] }
  }
  return lines
}
function write(next: Line[]) {
  lines = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* private mode: the bag lives for this visit only */ }
  subs.forEach((f) => f())
}
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }

export function useBag() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY)
  const add = (slug: string, size: string) => {
    const hit = items.find((l) => l.slug === slug && l.size === size)
    write(hit ? items.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l)) : [...items, { slug, size, qty: 1 }])
  }
  const setQty = (i: number, qty: number) => write(qty < 1 ? items.filter((_, j) => j !== i) : items.map((l, j) => (j === i ? { ...l, qty } : l)))
  const count = items.reduce((n, l) => n + l.qty, 0)
  const total = items.reduce((n, l) => n + l.qty * bySlug(l.slug)!.price, 0)
  return { items, add, setQty, count, total }
}

export function orderMail(items: Line[], total: number) {
  const body = [
    'Hello Saint Ashe,', '', 'I would like to order:',
    ...items.map((l) => { const p = bySlug(l.slug)!; return `${l.qty} x ${p.name}, size ${l.size}, ${euro(p.price * l.qty)}` }),
    '', `Total: ${euro(total)}`, '', 'Name:', 'Delivery address:', 'Phone:', '',
  ].join('\n')
  return `mailto:${ORDERS}?subject=${encodeURIComponent('Order from saintashe.ge')}&body=${encodeURIComponent(body)}`
}

// --- which panel is open ---
const Ctx = createContext<{ openProduct: (slug: string) => void; openBag: () => void }>({ openProduct: () => {}, openBag: () => {} })
export const useShop = () => useContext(Ctx)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ShopProduct | null>(null)
  const [bagOpen, setBagOpen] = useState(false)
  const openBag = () => { setProduct(null); setBagOpen(true) }
  return (
    <Ctx.Provider value={{ openProduct: (slug) => setProduct(bySlug(slug) ?? null), openBag }}>
      {children}
      <ProductPanel product={product} onClose={() => setProduct(null)} onAdded={openBag} />
      <BagPanel open={bagOpen} onOpenChange={setBagOpen} />
    </Ctx.Provider>
  )
}

/** Used as the sections' `link`: a product tile whose href is "#slug" opens the product panel instead of navigating. */
export function ProductLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const { openProduct } = useShop()
  const open = (e: MouseEvent) => { e.preventDefault(); openProduct(href.replace(/^#/, '')) }
  return <a href={href} className={className} onClick={open} aria-haspopup="dialog">{children}</a>
}

const panel = 'w-full gap-0 overflow-y-auto border-(--color-border) bg-(--color-background) p-0 text-(--color-text) sm:max-w-md'

function ProductPanel({ product: p, onClose, onAdded }: { product: ShopProduct | null; onClose: () => void; onAdded: () => void }) {
  const [size, setSize] = useState('')
  const { add } = useBag()
  const chosen = p && (p.sizes.length === 1 ? p.sizes[0] : size)
  const addToBag = () => {
    if (!p || !chosen) return
    add(p.slug, chosen)
    toast(`${p.name} is in your bag`, { description: `Size ${chosen}, ${euro(p.price)}`, action: { label: 'View bag', onClick: onAdded } })
    onClose()
  }
  return (
    <Sheet open={!!p} onOpenChange={(o) => { if (!o) { onClose(); setSize('') } }}>
      <SheetContent className={panel}>
        {p && <>
          <img src={p.image} alt={p.alt} className="aspect-[4/5] w-full object-cover" />
          <SheetHeader className="gap-2 px-6 pt-6 pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <SheetTitle className="type-heading">{p.name}</SheetTitle>
              <span className="type-body tabular-nums">{euro(p.price)}</span>
            </div>
            {p.stock === 'few' && <Badge className="type-utility bg-(--color-secondary) text-(--color-text)">Last few in this run</Badge>}
            <SheetDescription className="type-body text-(--color-muted)">{p.note}</SheetDescription>
            <p className="type-utility text-(--color-muted)">{p.material}</p>
          </SheetHeader>
          <div className="px-6 pt-6">
            {p.sizes.length > 1 && (
              <fieldset>
                <legend className="type-utility mb-3 text-(--color-muted)">Size</legend>
                <RadioGroup value={size} onValueChange={setSize} className="flex flex-wrap gap-2" disabled={p.stock === 'out'}>
                  {p.sizes.map((s) => (
                    <Label key={s} htmlFor={`size-${s}`} className="type-utility flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 border border-(--color-border) px-3 has-data-[state=checked]:border-(--color-text) has-data-[state=checked]:bg-(--color-surface)">
                      <RadioGroupItem id={`size-${s}`} value={s} className="sr-only" />{s}
                    </Label>
                  ))}
                </RadioGroup>
              </fieldset>
            )}
          </div>
          <SheetFooter className="px-6 pt-6 pb-8">
            <Button onClick={addToBag} disabled={p.stock === 'out' || !chosen} className="type-body h-12 w-full bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted)">
              {p.stock === 'out' ? 'Sold out' : chosen ? 'Add to bag' : 'Choose a size'}
            </Button>
          </SheetFooter>
        </>}
      </SheetContent>
    </Sheet>
  )
}

function BagPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { items, setQty, total } = useBag()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={panel}>
        <SheetHeader className="px-6 pt-8">
          <SheetTitle className="type-heading">Your bag</SheetTitle>
          <SheetDescription className="type-utility text-(--color-muted)">
            There is no online payment yet. Check out writes your order into an email; we reply within a day with payment and delivery.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0
          ? <p className="type-body px-6 pt-4 text-(--color-muted)">Nothing here yet.</p>
          : <ul className="border-t border-(--color-border)">
            {items.map((l, i) => {
              const p = bySlug(l.slug)!
              return (
                <li key={l.slug + l.size} className="flex gap-4 border-b border-(--color-border) px-6 py-4">
                  <img src={p.image} alt="" className="aspect-[4/5] w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="type-body flex justify-between gap-2"><span>{p.name}</span><span className="tabular-nums">{euro(p.price * l.qty)}</span></p>
                    <p className="type-utility text-(--color-muted)">Size {l.size}</p>
                    <div className="mt-auto flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-11" onClick={() => setQty(i, l.qty - 1)} aria-label={`One fewer ${p.name}`}><Minus /></Button>
                      <span className="type-body w-6 text-center tabular-nums" aria-live="polite">{l.qty}</span>
                      <Button variant="ghost" size="icon" className="size-11" onClick={() => setQty(i, l.qty + 1)} aria-label={`One more ${p.name}`}><Plus /></Button>
                      <Button variant="ghost" size="icon" className="ml-auto size-11" onClick={() => setQty(i, 0)} aria-label={`Remove ${p.name}`}><X /></Button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>}
        {items.length > 0 && (
          <SheetFooter className="gap-6 px-6 pt-6 pb-8">
            <p className="type-body flex justify-between"><span>Total, before delivery</span><span className="tabular-nums">{euro(total)}</span></p>
            <SwapButton href={orderMail(items, total)} label="Check out by email" className="self-start [--color-text:var(--color-background)]" />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
