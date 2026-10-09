'use client'
// OpusKit section — Product Grid: browse and choose. Even tiles, one ratio, second photo on hover, honest availability.
// Pip & Kiln: the 2:3 shot-list ratio on every tile, 4 / 3 / 2 columns; the hovered tile stays sharp while the others
// dim (focus cards); a quick add on desktop only; each picture is named so it morphs into its product page.
import Link from 'next/link'
import { ViewTransition, type ElementType, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { media } from '@/config/assets'
import { Cut } from '@/components/motion/Cut'
import { Badge } from '@/components/ui/badge'
import { useAddToBag } from '@/components/parts/use-add-to-bag'
import { stockLabel, type Product } from '@/content/products'
import { price } from '@/lib/format'

function Card({ p, L }: { p: Product; L: ElementType }) {
  const { add, added } = useAddToBag()
  const sold = p.stock <= 0
  return (
    <li className="relative">
      <L href={`/shop/${p.slug}`} className="press focus-title group block">
        <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
          <div className="relative overflow-hidden rounded-(--radius-media)">
            <MediaAsset id="productGrid" index={p.photo - 1} sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw" className="rounded-(--radius-media)" />
            {/* the second view on hover — held back while that file is still a placeholder */}
            {!media('productPageBuy', { index: 1, product: p.slug }).temporary && (
              <MediaAsset id="productPageBuy" index={1} product={p.slug} alt="" sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
                className="!absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" ownRatio={false} />
            )}
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="title t-card min-w-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{p.name}</h3>
          <span className="t-card shrink-0 tabular-nums">{price(p.price)}</span>
        </div>
        <p className={`type-caption mt-1 ${sold ? 'text-(--color-muted)' : ''}`}>{stockLabel(p.stock)}</p>
      </L>
      {sold ? (
        <Badge variant="ink" className="absolute left-3 top-3">{stockLabel(p.stock)}</Badge>
      ) : (
        <button type="button" onClick={() => add(p)} aria-label={`Add ${p.name} to bag`}
          className="btn btn-ink pointer-coarse:hidden absolute right-3 top-3 min-h-11 gap-1.5 px-4 opacity-0 transition-[opacity,background-color,color] duration-150 hover:opacity-100 focus-visible:opacity-100 [li:hover>&]:opacity-100">
          {added ? 'Added' : <><Plus className="size-4" strokeWidth={3} />Add</>}
        </button>
      )}
    </li>
  )
}

export function ProductGridSection({ link: L = Link, head, products, controls, empty, id, flush }: {
  link?: ElementType; head: ReactNode; products: Product[]; controls?: ReactNode; empty?: ReactNode; id?: string; flush?: 'top'
}) {
  return (
    <section id={id} className={`px-(--gutter) ${flush === 'top' ? 'pb-(--section-y) pt-12 md:pt-16' : 'py-(--section-y)'}`}>
      <div className="mx-auto max-w-(--container)">
        {head}
        {controls}
        {products.length === 0 ? empty : (
          <Cut as="ul" className={`focus-cards mt-12 grid grid-cols-2 gap-x-(--gutter) gap-y-12 md:mt-16 md:grid-cols-3 ${products.length % 3 === 0 ? "" : "xl:grid-cols-4"}`}>
            {products.map((p) => <Card key={p.slug} p={p} L={L} />)}
          </Cut>
        )}
      </div>
    </section>
  )
}
