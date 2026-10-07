'use client'
// OpusKit section — Product buy box, "Buy column stays": the pictures stacked down the left, the buy column in view
// beside them. Fitted to Maison Vey: phones get a swipeable carousel with a counter, then the buy column with a
// full-width button; the size is a radio group, the price follows it in place; one detail open at a time.
import Link from 'next/link'
import { useState, type ElementType } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Carousel, CarouselContent, CarouselCounter, CarouselItem } from '@/components/ui/carousel'
import { RadioChoice, RadioGroup } from '@/components/ui/radio-group'
import { Qty } from '@/components/site/Qty'
import { useCart } from '@/components/site/cart'
import { formatPrice, type Size } from '@/content/products'

type Img = { id: AssetKey; alt: string }
export type BuyDetail = { title: string; text: string }

export function ProductBuySection({ tone, link: L = Link, slug, name, place, hour, line, images, sizes, optionLabel, details = [], action, note, crumb }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType
  slug: string; name: string; place: string; hour?: string; line: string; images: Img[]; sizes: Size[]; optionLabel: string
  details?: BuyDetail[]; action: string; note?: string; crumb: { label: string; href: string }
}) {
  const { add } = useCart()
  const [size, setSize] = useState(sizes[Math.min(1, sizes.length - 1)].label)
  const [qty, setQty] = useState(1)
  const price = sizes.find((s) => s.label === size)?.price ?? sizes[0].price

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="pb-(--section-y) pt-8 md:px-(--gutter) md:pt-12">
      <div className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) gap-y-10 md:grid-cols-12">
        {/* Phones: a swipeable row */}
        <div className="md:hidden">
          <Carousel label={`${name}, pictures`} after={<CarouselCounter className="mt-4 px-(--gutter)" />}>
            <CarouselContent className="gap-(--grid-gap) px-(--gutter)">
              {images.map((m, i) => (
                <CarouselItem key={m.id} className="basis-[86%]">
                  <MediaAsset id={m.id} alt={m.alt} sizes="86vw" preload={i === 0} className="aspect-[4/5]" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* Wider: stacked */}
        <div className="hidden space-y-(--grid-gap) md:col-span-7 md:block">
          {images.map((m, i) => <MediaAsset key={m.id} id={m.id} alt={m.alt} sizes="58vw" preload={i === 0} className={i === 2 ? 'aspect-square' : 'aspect-[4/5]'} />)}
        </div>

        <div className="self-start px-(--gutter) md:sticky md:top-[calc(var(--nav-h)+48px)] md:col-span-5 md:px-0 lg:col-span-4 lg:col-start-9">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><L href={crumb.href} className="link-quiet inline-flex min-h-11 items-center">{crumb.label}</L></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="type-display mt-6 [font-size:clamp(3.25rem,5.5vw,5.5rem)]">{name}</h1>
          <p className="type-caption mt-4 text-(--color-muted)">{place}{hour && <>, <span className="tabular-nums text-(--color-accent)">{hour}</span></>}</p>
          <p className="type-body mt-6 max-w-[46ch]">{line}</p>
          <p aria-live="polite" className="type-heading mt-8 tabular-nums [font-size:1.75rem]">{formatPrice(price)}</p>

          {sizes.length > 1 && (
            <div className="mt-8">
              <p id={`${slug}-size`} className="type-caption text-(--color-muted)">{optionLabel}</p>
              <RadioGroup aria-labelledby={`${slug}-size`} value={size} onValueChange={setSize} className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => <RadioChoice key={s.label} value={s.label}>{s.label}</RadioChoice>)}
              </RadioGroup>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Qty label="Quantity" value={qty} onChange={setQty} className="self-start" />
            <button type="button" onClick={() => add(slug, size, qty)} className="btn-primary w-full cursor-pointer sm:flex-1">{action}</button>
          </div>
          {note && <p className="type-caption mt-4 text-(--color-muted)">{note}</p>}

          {details.length > 0 && (
            <Accordion type="single" collapsible defaultValue="d0" className="mt-12 border-t border-(--color-border)">
              {details.map((d, i) => (
                <AccordionItem key={d.title} value={`d${i}`}>
                  <AccordionTrigger>{d.title}</AccordionTrigger>
                  <AccordionContent>{d.text}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  )
}
