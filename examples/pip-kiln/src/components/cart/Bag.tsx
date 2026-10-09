'use client'
// Cart → the bag: each piece with its picture, name, glaze and price; change how many or remove it; the subtotal,
// what delivery costs or that it's free, and one button to checkout. Empty: one line and the way back to the shop.
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { SectionHead } from '@/components/parts/SectionHead'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { cart as copy } from '@/content/cart'
import { site } from '@/content/site'
import { useCart } from '@/lib/cart'
import { count, price } from '@/lib/format'
import { MugGauge } from './MugGauge'

export function Bag() {
  const c = useCart()
  const left = Math.max(0, site.freeDeliveryFrom - c.subtotal)
  const done = c.subtotal >= site.freeDeliveryFrom
  const empty = c.ready && c.lines.length === 0

  return (
    <section className="px-(--gutter) pb-[calc(var(--section-y)*0.6)] pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container)">
        <SectionHead as="h1" text={copy.title} lines={[copy.title]} line={c.ready && !empty ? count(c.count, 'piece', 'pieces') + ' waiting for a home.' : undefined} />

        {!c.ready ? (
          <div aria-hidden className="mt-12 grid gap-6 md:grid-cols-12">
            <div className="space-y-4 md:col-span-7">{[0, 1].map((i) => <div key={i} className="skeleton h-28 rounded-(--radius-card)" />)}</div>
            <div className="skeleton h-80 rounded-(--radius-card) md:col-span-4 md:col-start-9" />
          </div>
        ) : empty ? (
          <div className="mt-12 grid items-center gap-8 rounded-(--radius-card) border border-(--color-text) p-8 sm:grid-cols-[10rem_1fr] md:mt-16 md:p-12">
            <MugGauge fill={0} done={false} doneLabel={copy.gauge.done} className="mx-auto w-32 sm:w-40" />
            <div>
              <p className="t-section [font-size:clamp(2rem,4.4vw,4rem)]">{copy.emptyTitle}</p>
              <p className="type-body mt-3">{copy.emptyText}</p>
              <Button asChild className="mt-6"><Link href="/shop">{copy.emptyAction}</Link></Button>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
            <Table className="md:col-span-7">
              <TableHeader className="max-md:sr-only">
                <TableRow className="border-(--color-text)">
                  <TableHead colSpan={2}>{copy.headings.item}</TableHead>
                  <TableHead>{copy.headings.qty}</TableHead>
                  <TableHead className="text-right">{copy.headings.price}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {c.lines.map((l) => (
                  <TableRow key={l.slug + l.glaze} className="max-md:grid max-md:grid-cols-[5.5rem_minmax(0,1fr)_auto] max-md:gap-x-4 max-md:py-4">
                    <TableCell className="w-28 pr-5 max-md:row-span-2 max-md:w-auto max-md:p-0">
                      <Link href={`/shop/${l.slug}`} className="press block"><MediaAsset id="productGrid" index={l.product.photo - 1} alt={l.product.name} sizes="112px" className="rounded-[20px]" /></Link>
                    </TableCell>
                    <TableCell className="min-w-0 max-md:p-0">
                      <Link href={`/shop/${l.slug}`} className="t-card hover:underline hover:decoration-2 hover:underline-offset-4 focus-visible:underline">{l.product.name}</Link>
                      <p className="type-caption mt-1">{l.glaze}, {price(l.product.price)} each</p>
                      <button type="button" onClick={() => c.remove(l.slug, l.glaze)} className="type-caption mt-2 min-h-11 font-semibold underline decoration-(--color-text)/40 underline-offset-4 hover:decoration-(--color-text) md:min-h-0">{copy.remove}<span className="sr-only"> {l.product.name}</span></button>
                    </TableCell>
                    <TableCell className="max-md:col-start-2 max-md:p-0">
                      <div className="inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-text) bg-(--color-surface)" role="group" aria-label={`${copy.headings.qty}: ${l.product.name}`}>
                        <button type="button" aria-label={copy.fewer} disabled={l.qty <= 1} onClick={() => c.setQty(l.slug, l.glaze, l.qty - 1)} className="press grid size-11 place-items-center rounded-full disabled:opacity-40"><Minus className="size-4" /></button>
                        <span aria-live="polite" className="t-action w-7 text-center tabular-nums">{l.qty}</span>
                        <button type="button" aria-label={copy.more} onClick={() => c.setQty(l.slug, l.glaze, l.qty + 1)} className="press grid size-11 place-items-center rounded-full"><Plus className="size-4" /></button>
                      </div>
                    </TableCell>
                    <TableCell className="t-card text-right tabular-nums max-md:col-start-3 max-md:row-start-1 max-md:p-0">{price(l.product.price * l.qty)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <aside aria-label="Summary" className="md:col-span-4 md:col-start-9">
              <div className="rounded-(--radius-card) bg-(--color-surface) p-6 md:sticky md:top-[calc(var(--nav-h)+24px)] md:p-8">
                <div className="flex items-center gap-6 md:block">
                  <MugGauge fill={c.subtotal / site.freeDeliveryFrom} done={done} doneLabel={copy.gauge.sticker} className="w-24 shrink-0 md:mx-auto md:w-44" />
                  <p aria-live="polite" className="t-card md:mt-6 md:text-center">{done ? copy.gauge.done : copy.gauge.to(price(left))}</p>
                </div>
                <Separator className="my-6 bg-(--color-text)/25" />
                <dl className="type-body space-y-2">
                  <div className="flex justify-between gap-4"><dt>{copy.subtotal}</dt><dd className="tabular-nums">{price(c.subtotal)}</dd></div>
                  <div className="flex justify-between gap-4"><dt>{copy.delivery}</dt><dd className="tabular-nums">{c.delivery ? price(c.delivery) : copy.free}</dd></div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-(--color-text) pt-3"><dt className="t-card">{copy.total}</dt><dd className="t-price [font-size:2rem]">{price(c.subtotal + c.delivery)}</dd></div>
                </dl>
                <Button asChild size="lg" className="mt-6 w-full"><Link href="/checkout">{copy.checkout}</Link></Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
