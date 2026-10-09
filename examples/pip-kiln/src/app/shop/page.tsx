import type { Metadata } from 'next'
import { ShopGrid } from '@/components/shop/ShopGrid'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { CollectionSection } from '@/components/sections/Collection'
import { FaqSection } from '@/components/sections/Faq'
import { BuyButton } from '@/components/parts/BuyButton'
import { productBySlug } from '@/content/products'
import { shop } from '@/content/shop'

export const metadata: Metadata = { title: 'Shop', description: 'Mugs, plates and vases, thrown and glazed by hand in small batches.' }

export default function ShopPage() {
  const h = productBySlug(shop.highlight.product)!
  const c = shop.collection
  const pieces = c.pieces.map((slug, i) => { const p = productBySlug(slug)!; return { name: p.name, price: p.price, index: i, href: `/shop/${p.slug}` } })
  return (
    <>
      <ShopGrid />
      <ProductHighlightSection name={h.highlight.title} eyebrow={h.name} text={h.highlight.text} media={{ id: 'productHighlight' }}
        details={h.highlight.facts} action={<BuyButton slug={h.slug} label={shop.highlight.action} />} />
      <CollectionSection season={c.season} title={c.title} lines={c.lines} text={c.text} action={{ label: c.action, href: '/shop' }} pieces={pieces} />
      <FaqSection title={shop.faq.title} lines={['Questions?', 'Answered.']} items={shop.faq.items} />
    </>
  )
}
