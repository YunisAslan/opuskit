'use client'
import Link from 'next/link'
import { Masthead } from '@/components/pieces/Masthead'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Qty } from '@/components/site/Qty'
import { useCart } from '@/components/site/cart'
import { bag, cart } from '@/content/copy'
import { formatPrice, getScent, scents } from '@/content/products'
import { toProduct } from '@/content/view'

export function CartView() {
  const { lines, subtotal, delivery, setQty, remove, ready } = useCart()
  const inBag = new Set(lines.map((l) => l.slug))
  const suggestions = scents.filter((s) => !inBag.has(s.slug)).slice(0, 3).map(toProduct)

  return (
    <>
      <section className="px-(--gutter)">
        <div className="mx-auto max-w-(--container)">
          <Masthead title={cart.title} intro={cart.intro} />
          {!ready ? <div className="min-h-64" /> : lines.length === 0 ? (
            <div className="grid gap-x-(--grid-gap) gap-y-8 border-t border-(--color-border) pt-12 md:grid-cols-12">
              <MediaAsset id="productPhotography" preload sizes="(min-width: 768px) 25vw, 50vw" className="w-1/2 md:col-span-3 md:w-auto" />
              <div className="md:col-span-5 md:col-start-5 md:self-end">
                <p className="type-body max-w-[40ch] text-(--color-muted)">{bag.empty}</p>
                <Link href="/shop" className="btn-secondary mt-8">{bag.emptyAction}</Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-x-(--grid-gap) gap-y-16 md:grid-cols-12">
              <div className="md:col-span-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{cart.columns.item}</TableHead>
                      <TableHead className="hidden sm:table-cell">{cart.columns.qty}</TableHead>
                      <TableHead className="text-right">{cart.columns.price}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lines.map((l) => {
                      const s = getScent(l.slug)!
                      return (
                        <TableRow key={l.slug + l.size}>
                          <TableCell>
                            <div className="flex gap-4 md:gap-6">
                              <MediaAsset id={s.images.front} alt={s.alt.front} sizes="7rem" className="w-20 shrink-0 md:w-28" />
                              <div className="flex flex-col gap-1">
                                <Link href={`/shop/${s.slug}`} className="type-body link-quiet">{s.name}</Link>
                                <span className="type-caption text-(--color-muted)">{l.size}, {formatPrice(l.price)} each</span>
                                <div className="mt-3 sm:hidden"><Qty size="sm" label={`Quantity of ${s.name}`} value={l.qty} onChange={(n) => setQty(l.slug, l.size, n)} /></div>
                                <button type="button" onClick={() => remove(l.slug, l.size)} className="type-caption link-quiet mt-1 min-h-11 cursor-pointer self-start text-(--color-muted)">{bag.remove}</button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell"><Qty size="sm" label={`Quantity of ${s.name}`} value={l.qty} onChange={(n) => setQty(l.slug, l.size, n)} /></TableCell>
                          <TableCell className="text-right tabular-nums">{formatPrice(l.total)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <aside aria-label="Summary" className="self-start md:pt-[68px] md:sticky md:top-[calc(var(--nav-h)+48px)] md:col-span-4">
                <dl className="type-body space-y-2">
                  <div className="flex justify-between"><dt className="text-(--color-muted)">{bag.subtotal}</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-(--color-muted)">{bag.delivery}</dt><dd className="tabular-nums">{delivery ? formatPrice(delivery) : bag.deliveryFree}</dd></div>
                </dl>
                <Separator className="my-5" />
                <div className="flex items-baseline justify-between">
                  <span className="type-body">{bag.total}</span>
                  <span className="type-heading tabular-nums [font-size:1.75rem]">{formatPrice(subtotal + delivery)}</span>
                </div>
                <p className="type-caption mt-4 text-(--color-muted)">{bag.sample}</p>
                <Link href="/checkout" className="btn-primary mt-8 w-full">{bag.checkout}</Link>
                <Link href="/shop" className="type-caption link-quiet mt-3 flex min-h-11 items-center justify-center">{bag.continue}</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
      <ProductGridSection link={Link} title={cart.gridTitle} products={suggestions} />
    </>
  )
}
