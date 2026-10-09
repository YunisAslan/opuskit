'use client'
// OpusKit section — Product buy box, "mosaic": the first picture large, the rest beside it; the buy column beside them
// with the name (the page h1), price, one choice, how many, the add-to-bag button and the details people check, each
// opening in place (one at a time). Phones: the pictures first as a swipe row, then the buy column, button full width.
// Pip & Kiln's remembered moment, "Pick a glaze, get a personality": choosing a glaze rolls in the piece's nickname
// (the Optimist, the Show-off, the Night Owl) and turns the stage behind the pictures to that glaze's colour.
// Reduced motion: the nickname and colour change with a short fade, nothing rolls.
import Link from 'next/link'
import { useState, ViewTransition } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { RadioGroup, RadioGroupPrimitive } from '@/components/ui/radio-group'
import { useAddToBag } from '@/components/parts/use-add-to-bag'
import { glazeLine, glazes, stockLabel, typeLabel, type Glaze, type Product } from '@/content/products'
import { product as copy } from '@/content/shop'
import { site } from '@/content/site'
import { price } from '@/lib/format'
import { useReduced } from '@/lib/use-media'

// Each glaze brings its own stage, drawn from the palette's tints and shades — so the colour change means something.
const STAGE: Record<Glaze, string> = {
  Sunshine: 'bg-(--color-secondary)',
  Raspberry: 'bg-[color-mix(in_oklab,var(--color-accent)_32%,var(--color-surface))]',
  Liquorice: 'bg-(--color-text)',
}
const SWATCH: Record<Glaze, string> = { Sunshine: 'bg-(--color-background)', Raspberry: 'bg-(--color-accent)', Liquorice: 'bg-(--color-text)' }

export function ProductBuySection({ p }: { p: Product }) {
  const [glaze, setGlaze] = useState<Glaze>('Sunshine')
  const [qty, setQty] = useState(1)
  const { add, added } = useAddToBag()
  const reduce = useReduced()
  const sold = p.stock <= 0
  const max = Math.max(1, Math.min(p.stock, 10))
  const shots = [0, 1, 2].map((i) => ({ i, alt: `${p.name} in ${glaze}, ${['from the front', 'at three-quarters', 'close up'][i]}` }))

  return (
    <section className="px-(--gutter) pb-(--section-y) pt-8 md:pt-10">
      <div className="mx-auto max-w-(--container)">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">{copy.breadcrumbHome}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="/shop">{copy.breadcrumbShop}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link href={`/shop?type=${p.type}`}>{typeLabel[p.type]}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{p.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-10 md:mt-8 md:grid-cols-12 md:gap-6">
          {/* The pictures on their glaze's stage */}
          <div className={`-mx-(--gutter) p-3 transition-[background-color] duration-300 ease-(--ease-out) md:col-span-7 md:mx-0 md:self-start md:rounded-(--radius-card) md:p-4 ${STAGE[glaze]}`}>
            <div className="hidden grid-cols-[2fr_1fr] gap-3 md:grid md:gap-4">
              <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
                <div className="row-span-2"><MediaAsset id="productPageBuy" product={p.slug} index={0} alt={shots[0].alt} priority sizes="40vw" className="rounded-(--radius-media)" /></div>
              </ViewTransition>
              {shots.slice(1).map((s) => <MediaAsset key={s.i} id="productPageBuy" product={p.slug} index={s.i} alt={s.alt} sizes="20vw" className="rounded-(--radius-media)" />)}
            </div>
            <Carousel className="md:hidden" aria-label={`${p.name} photos`}>
              <CarouselContent>
                {shots.map((s) => (
                  <CarouselItem key={s.i} className="basis-[82%]">
                    <MediaAsset id="productPageBuy" product={p.slug} index={s.i} alt={s.alt} priority={s.i === 0} sizes="82vw" className="rounded-(--radius-media)" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* The buy column */}
          <div className="md:sticky md:top-[calc(var(--nav-h)+24px)] md:col-span-5 md:self-start md:pl-[2vw]">
            <h1 className="type-display leading-[0.86] [font-size:clamp(2.8rem,5.4vw,5.2rem)]">{p.name}</h1>
            <div aria-live="polite" className="mt-4 grid h-[2.6rem] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={glaze} className="t-sticker [grid-area:1/1] self-center"
                  initial={reduce ? { opacity: 0 } : { y: '110%' }} animate={reduce ? { opacity: 1 } : { y: '0%' }} exit={reduce ? { opacity: 0 } : { y: '-110%' }}
                  transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  {p.nicknames[glaze]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <p className="t-price">{price(p.price)}</p>
              <p className={`type-caption font-semibold ${sold ? 'text-(--color-error)' : ''}`}>{stockLabel(p.stock)}</p>
            </div>
            <p className="type-body mt-5 max-w-[44ch]">{p.line}</p>

            <fieldset className="mt-8">
              <legend className="type-utility">{copy.optionLabel}: <span className="font-bold">{glaze}</span></legend>
              <RadioGroup value={glaze} onValueChange={(v) => setGlaze(v as Glaze)} className="mt-3 flex flex-wrap gap-2">
                {glazes.map((g) => (
                  <RadioGroupPrimitive.Item key={g} value={g}
                    className="t-action press inline-flex min-h-12 items-center gap-2.5 rounded-(--radius-button) border border-(--color-text) bg-(--color-surface) py-2 pl-2.5 pr-5 transition-[background-color,color,transform] duration-150 hover:bg-(--color-background) focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4 data-[state=checked]:bg-(--color-text) data-[state=checked]:text-(--color-background)">
                    <span aria-hidden className={`size-7 rounded-full border border-current ${SWATCH[g]}`} />{g}
                  </RadioGroupPrimitive.Item>
                ))}
              </RadioGroup>
              <p className="type-caption mt-3">{glazeLine[glaze]}</p>
            </fieldset>

            {sold ? (
              <div className="mt-8">
                <Button disabled className="w-full">{copy.soldOut}</Button>
                <p className="type-caption mt-3">{copy.soldOutNote} <a className="font-semibold underline underline-offset-4" href={`mailto:${site.email}?subject=${encodeURIComponent(`Tell me when the ${p.name} is back`)}`}>{copy.soldOutAction}</a></p>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 shrink-0 items-center justify-between rounded-(--radius-button) border border-(--color-text) bg-(--color-surface) sm:justify-start" role="group" aria-label={copy.quantity}>
                  <button type="button" aria-label={copy.fewer} disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))} className="press grid size-12 place-items-center rounded-full disabled:opacity-40"><Minus className="size-4" /></button>
                  <span aria-live="polite" className="t-action w-8 text-center tabular-nums">{qty}</span>
                  <button type="button" aria-label={copy.more} disabled={qty >= max} onClick={() => setQty((q) => Math.min(max, q + 1))} className="press grid size-12 place-items-center rounded-full disabled:opacity-40"><Plus className="size-4" /></button>
                </div>
                <Button onClick={() => add(p, glaze, qty)} className="flex-1">{added ? copy.added : `${copy.action}, ${price(p.price * qty)}`}</Button>
              </div>
            )}
            <p className="type-caption mt-3">{copy.note}</p>

            <Accordion type="single" collapsible defaultValue="d0" className="mt-10 border-t border-(--color-text)">
              {p.details.map((d, i) => (
                <AccordionItem key={d.title} value={`d${i}`}>
                  <AccordionTrigger className="min-h-14 py-3 [font-size:1.05rem]">{d.title}</AccordionTrigger>
                  <AccordionContent>{d.text}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
