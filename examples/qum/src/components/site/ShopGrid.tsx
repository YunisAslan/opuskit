'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { products, TYPES } from '@/data/shop'
import { gridItems } from '@/lib/grid'

const MAX = Math.max(...products.map((p) => p.price))
const MIN = Math.min(...products.map((p) => p.price))

// The product grid with a few quiet filters: kind (chips), price (slider), order (select).
export function ShopGrid({ fromUrl }: { fromUrl?: boolean }) {
  return fromUrl ? <FromUrl /> : <Grid initial="all" />
}
function FromUrl() {
  const t = useSearchParams().get('type') ?? 'all'
  return <Grid key={t} initial={TYPES.some((x) => x.id === t) ? t : 'all'} />
}

function Grid({ initial }: { initial: string }) {
  const [type, setType] = useState(initial)
  const [sort, setSort] = useState('ours')
  const [max, setMax] = useState(MAX)
  let list = products.filter((p) => (type === 'all' || p.type === type) && p.price <= max)
  if (sort !== 'ours') list = [...list].sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price))
  const group = TYPES.find((t) => t.id === type)?.name
  const title = `${group ?? 'Everything'}, ${list.length} ${list.length === 1 ? 'product' : 'products'}`
  return (
    <>
      <div className="px-(--gutter)">
        <div className="mx-auto flex max-w-(--container) flex-wrap items-end gap-x-10 gap-y-6 border-b border-(--color-border) pb-8">
          <ToggleGroup type="single" variant="outline" value={type} onValueChange={(v) => v && setType(v)} aria-label="Kind of product" className="flex-wrap">
            {[{ id: 'all', name: 'All' }, ...TYPES].map((t) => (
              <ToggleGroupItem key={t.id} value={t.id} className="type-utility rounded-(--radius-button) border-(--color-border) data-[state=on]:border-(--color-text)">{t.name}</ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="w-full max-w-60 space-y-4">
            <Label htmlFor="max-price" className="type-utility text-(--color-muted)">Up to <span className="tabular-nums text-(--color-text)">{max} ₼</span></Label>
            <Slider id="max-price" min={MIN} max={MAX} step={1} value={[max]} onValueChange={([v]) => setMax(v)} aria-label="Highest price" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort" className="type-utility text-(--color-muted)">Order</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger id="sort" className="type-utility w-52"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-(--color-surface)">
                <SelectItem value="ours" className="h-10">The order we use them in</SelectItem>
                <SelectItem value="low" className="h-10">Price, lowest first</SelectItem>
                <SelectItem value="high" className="h-10">Price, highest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {list.length > 0 ? (
        <div className="focus-grid [&>section]:pt-12"><ProductGridSection link={Link} title={title} products={gridItems(list)} /></div>
      ) : (
        <div className="px-(--gutter) py-(--section-y)">
          <div className="mx-auto max-w-(--container)">
            <p className="type-body text-(--color-muted)">Nothing in this group under {max} ₼.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setType('all'); setMax(MAX) }}>Show everything</Button>
          </div>
        </div>
      )}
    </>
  )
}
