'use client'
import { useState } from 'react'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useCart } from '@/components/cart/cart-context'

// OpusKit section — Product buy box: everything needed to buy one product on its own page — the
// pictures, the name and price, one choice as a shadcn RadioGroup, how many, the button, and the
// details people check, each opening in place with a shadcn Accordion.
export type BuyDetail = { title: string; text: string }

export function ProductBuySection({
  tone,
  variant = 'sticky',
  name,
  price,
  line,
  images,
  option,
  details = [],
  slug,
  note,
  meta = [],
  actionLabel = 'Add to bag',
}: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  variant?: 'sticky' | 'mosaic'
  name: string
  price: string
  line?: string
  images: AssetKey[]
  option?: { label: string; values: string[] }
  details?: BuyDetail[]
  slug: string
  note?: string
  meta?: string[]
  actionLabel?: string
}) {
  const { add } = useCart()
  const [pick, setPick] = useState(0)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    add(slug, qty, option?.values[pick])
    toast.success(`${name} added to your bag`, { description: 'Posted from the studio within two days.' })
  }

  const pics =
    variant === 'mosaic' ? (
      <div className="grid grid-cols-2 gap-3 md:col-span-7">
        {images.map((m, i) => (
          <MediaAsset
            key={`${m}-${i}`}
            id={m}
            alt=""
            className={i === 0 ? 'col-span-2 aspect-(--ratio-media) h-auto w-full' : 'aspect-(--ratio-card) h-auto w-full'}
          />
        ))}
      </div>
    ) : (
      <div className="-mx-(--gutter) flex snap-x snap-mandatory gap-3 overflow-x-auto px-(--gutter) md:col-span-7 md:mx-0 md:block md:space-y-3 md:overflow-visible md:px-0">
        {images.map((m, i) => (
          <MediaAsset
            key={`${m}-${i}`}
            id={m}
            alt=""
            className={`aspect-(--ratio-card) h-auto shrink-0 snap-center md:w-full ${images.length > 1 ? 'w-[85%]' : 'w-full'}`}
          />
        ))}
      </div>
    )

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-[calc(var(--section-y)*0.6)]">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        {pics}
        <div className={`md:col-span-5 ${variant === 'sticky' ? 'self-start md:sticky md:top-24' : ''}`}>
          <h1 className="type-heading [font-size:clamp(1.8rem,3vw,2.8rem)]">{name}</h1>
          <p className="type-heading mt-3 tabular-nums [font-size:1.4rem]">{price}</p>
          {line && <p className="type-body mt-4 max-w-[48ch] text-(--color-muted)">{line}</p>}
          {meta.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.map((m) => (
                <Badge key={m} variant="outline">
                  {m}
                </Badge>
              ))}
            </div>
          )}

          {option && (
            <div className="mt-8">
              <p className="type-utility text-(--color-muted)">{option.label}</p>
              <RadioGroup
                value={option.values[pick]}
                onValueChange={(v) => setPick(option.values.indexOf(v))}
                className="mt-3 flex flex-wrap gap-x-6 gap-y-3"
              >
                {option.values.map((v) => (
                  <label key={v} className="type-body flex cursor-pointer items-center gap-2.5">
                    <RadioGroupItem value={v} />
                    {v}
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <div className="type-body flex items-center rounded-(--radius-button) border border-(--color-border)">
              <button type="button" aria-label="One fewer" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3">
                −
              </button>
              <span aria-live="polite" className="w-8 text-center tabular-nums">
                {qty}
              </span>
              <button type="button" aria-label="One more" onClick={() => setQty((q) => q + 1)} className="px-4 py-3">
                +
              </button>
            </div>
            <Button onClick={handleAdd} className="flex-1">
              {actionLabel}
            </Button>
          </div>

          {note && (
            <div className="type-utility mt-3 flex items-center gap-2 text-(--color-muted)">
              <span>{note}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="About the sample"
                    className="inline-flex size-5 items-center justify-center rounded-full border border-(--color-border) focus-visible:outline-none"
                  >
                    <Info className="size-3" aria-hidden />
                  </button>
                </TooltipTrigger>
                <TooltipContent>A 2 ml sample of another scent is tucked into every parcel.</TooltipContent>
              </Tooltip>
            </div>
          )}

          {details.length > 0 && (
            <Accordion type="single" collapsible defaultValue={details[0]?.title} className="mt-10 border-t border-(--color-border)">
              {details.map((d) => (
                <AccordionItem key={d.title} value={d.title}>
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