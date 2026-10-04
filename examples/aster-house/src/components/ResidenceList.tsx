'use client'
// Residences: all twelve houses, filtered by availability with the recipe's filter chips (shadcn ToggleGroup).
import Link from 'next/link'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { StatusBadge } from '@/components/StatusBadge'
import { Motif } from '@/components/Motif'
import { media } from '@/config/assets'
import { houses, price, type Status } from '@/data/houses'

const filters: { value: 'all' | Status; label: string }[] = [
  { value: 'all', label: 'All twelve' }, { value: 'available', label: 'Available' }, { value: 'reserved', label: 'Reserved' }, { value: 'sold', label: 'Sold' },
]

export function ResidenceList() {
  const [show, setShow] = useState<'all' | Status>('all')
  const list = show === 'all' ? houses : houses.filter((h) => h.status === show)
  return (
    <ProductGridSection
      link={Link}
      level="h1"
      title={<><Motif len={88} rot={-4} />Residences</>}
      intro="Twelve houses, one release. Each is named after the hour it faces and built around that light. Prices include the terrace, the plunge pool and two parking spaces at the cliff top."
      filters={
        <ToggleGroup type="single" value={show} onValueChange={(v) => v && setShow(v as typeof show)} aria-label="Show houses" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <ToggleGroupItem key={f.value} value={f.value} className="type-utility h-11 rounded-(--radius-button)! border border-(--color-border) px-4 data-[state=on]:border-(--color-text) data-[state=on]:bg-(--color-text) data-[state=on]:text-(--color-background) hover:bg-(--color-surface) hover:text-(--color-text)">
              {f.label} <span className="ml-1.5 tabular-nums opacity-70">{f.value === 'all' ? houses.length : houses.filter((h) => h.status === f.value).length}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      }
      products={list.map((h) => ({
        name: h.name, price: h.status === 'sold' ? 'Sold' : price(h.price), image: media(h.image).src, alt: media(h.image).alt, hoverImage: media(h.second).src,
        href: `/residences/${h.slug}`, status: <StatusBadge status={h.status} />,
        details: [`Built around ${h.time}, facing ${h.facing}`, `${h.area} m², ${h.bedrooms} bedrooms`, `Terrace ${h.terrace} m²`],
      }))}
    />
  )
}
