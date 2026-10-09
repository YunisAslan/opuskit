'use client'
// Shop → Product Grid: the page's h1, filter chips (toggle-group) and a sort (select) in a bar that sticks under the
// menu, the kiln thermometer riding along in it, then the even grid.
import { Suspense, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { SectionHead } from '@/components/parts/SectionHead'
import { Choice } from '@/components/parts/Choice'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { products, typeLabel, type ProductType } from '@/content/products'
import { shop } from '@/content/shop'
import { KilnThermo } from './KilnThermo'

const TYPES = Object.keys(typeLabel) as ProductType[]

const valid = (t?: string | null) => (TYPES.includes(t as ProductType) ? t! : 'all')

/** Reads ?type= from the address (the menu's Mugs / Plates / Vases links); the static page shows everything first. */
export function ShopGrid() {
  return <Suspense fallback={<Grid />}><FromAddress /></Suspense>
}
function FromAddress() {
  return <Grid param={useSearchParams().get('type')} />
}

function Grid({ param }: { param?: string | null }) {
  const [type, setType] = useState<string>(valid(param))
  const [seen, setSeen] = useState(param)
  if (param !== seen) { setSeen(param); setType(valid(param)) }
  const [sort, setSort] = useState('featured')
  const wrap = useRef<HTMLDivElement>(null)
  const list = useMemo(() => {
    const l = products.filter((p) => type === 'all' || p.type === type)
    return sort === 'low' ? [...l].sort((a, b) => a.price - b.price) : sort === 'high' ? [...l].sort((a, b) => b.price - a.price) : l
  }, [type, sort])
  const pick = (v: string) => {
    const next = v || 'all'
    setType(next)
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('type'); else url.searchParams.set('type', next)
    window.history.replaceState(null, '', url)
  }
  const g = shop.grid
  return (
    <div ref={wrap}>
      <ProductGridSection
        flush="top"
        head={<SectionHead as="h1" text={g.title} lines={[g.title]} line={g.line} />}
        controls={
          <div className="sticky top-(--nav-h) z-30 -mx-(--gutter) mt-10 border-y border-(--color-border) bg-(--color-background) px-(--gutter) py-3">
            <div className="flex items-center gap-3">
              <ToggleGroup type="single" value={type} onValueChange={pick} aria-label={g.filterLabel} className="min-w-0 flex-1 flex-nowrap overflow-x-auto [scrollbar-width:none]">
                <ToggleGroupItem value="all" className="shrink-0">{g.all}</ToggleGroupItem>
                {TYPES.map((t) => <ToggleGroupItem key={t} value={t} className="shrink-0">{typeLabel[t]}</ToggleGroupItem>)}
              </ToggleGroup>
              <div className="hidden w-60 shrink-0 lg:block"><Choice label={g.sortLabel} value={sort} onChange={setSort} options={g.sorts} placeholder={g.sortLabel} aria-describedby={undefined} /></div>
              <div className="shrink-0"><KilnThermo target={wrap} /></div>
            </div>
            <div className="mt-3 lg:hidden"><Choice label={g.sortLabel} value={sort} onChange={setSort} options={g.sorts} placeholder={g.sortLabel} className="h-11" /></div>
          </div>
        }
        products={list}
        empty={
          <div className="mt-12 rounded-(--radius-card) border border-(--color-text) p-10 text-center">
            <p className="t-sticker">{g.empty}</p>
            <Button className="mt-6" onClick={() => pick('all')}>{g.emptyAction}</Button>
          </div>
        }
      />
    </div>
  )
}
