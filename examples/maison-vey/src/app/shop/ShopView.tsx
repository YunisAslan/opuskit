'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { CollectionSection } from '@/components/sections/Collection'
import { FaqSection } from '@/components/sections/Faq'
import { Masthead } from '@/components/pieces/Masthead'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ResponsiveSelect } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faq, shop } from '@/content/copy'
import { fromPrice, getScent, scents, type Hours } from '@/content/products'
import { toPiece, toProduct } from '@/content/view'

export function ShopView() {
  const [hours, setHours] = useState<'all' | Hours>('all')
  const [sort, setSort] = useState('house')
  const list = useMemo(() => {
    const l = scents.filter((s) => hours === 'all' || (s.slug !== 'discovery-set' && s.hours === hours))
    if (sort === 'price-asc') return [...l].sort((a, b) => fromPrice(a) - fromPrice(b))
    if (sort === 'price-desc') return [...l].sort((a, b) => fromPrice(b) - fromPrice(a))
    return l
  }, [hours, sort])
  const hl = getScent(shop.highlight.product)!

  const controls = (
    <div className="flex w-full flex-wrap items-end justify-between gap-x-(--grid-gap) gap-y-6 border-t border-(--color-border) pt-4">
      <ToggleGroup type="single" value={hours} onValueChange={(v) => v && setHours(v as typeof hours)} aria-label={shop.filters.label}>
        {(['all', 'morning', 'afternoon', 'night'] as const).map((h) => <ToggleGroupItem key={h} value={h}>{shop.filters[h]}</ToggleGroupItem>)}
      </ToggleGroup>
      <div className="flex w-full items-center gap-4 sm:w-64">
        <label htmlFor="sort" className="type-caption shrink-0 text-(--color-muted)">{shop.sort.label}</label>
        <ResponsiveSelect id="sort" label={shop.sort.label} value={sort} onValueChange={setSort} options={shop.sort.options} />
      </div>
    </div>
  )

  return (
    <>
      <ProductGridSection
        link={Link} compact
        heading={<Masthead title={shop.title} intro={shop.intro} />}
        controls={controls}
        products={list.map(toProduct)}
        empty={shop.empty}
      />
      <ProductHighlightSection
        slug={hl.slug} name={shop.highlight.name} text={shop.highlight.text}
        image="highlight-salt-quay" details={shop.highlight.details} sizes={hl.sizes} action={shop.highlight.action}
      />
      <CollectionSection link={Link} season={shop.collection.season} title={shop.collection.title} titleLines={['The early', 'hours']} text={shop.collection.text} pieces={shop.collection.pieces.map(toPiece)} />
      <FaqSection id="questions" title={shop.faqTitle}>
        <Accordion type="single" collapsible>
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </>
  )
}
