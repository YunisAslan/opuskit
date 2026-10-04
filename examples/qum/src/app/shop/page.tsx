import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { CategoriesSection } from '@/components/sections/Categories'
import { TrustSection } from '@/components/sections/Trust'
import { PageHeader } from '@/components/site/PageHeader'
import { ShopGrid } from '@/components/site/ShopGrid'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'
import { products, TYPES } from '@/data/shop'

export const metadata: Metadata = { title: 'Shop', description: 'Six products and a hand balm, side by side, with prices in manat. Orders open in spring.' }

export default function Shop() {
  return (
    <>
      <PageHeader title="Six products, one ritual" line="Everything we make, side by side, with prices in manat. Orders open in spring; until then your bag keeps whatever you add." />
      <Stop id="range" name="The range">
        <CategoriesSection link={Link} title="Start with what your skin needs" items={TYPES.map((t) => ({
          name: t.name, href: `/shop?type=${t.id}#counter`, image: assets[t.image].src, alt: t.alt,
          count: `${products.filter((p) => p.type === t.id).length} products`,
        }))} />
      </Stop>
      <Stop id="counter" name="The counter">
        <Suspense fallback={<ShopGrid />}><ShopGrid fromUrl /></Suspense>
      </Stop>
      <Stop id="promise" name="The promise">
        <TrustSection tone="surface" items={[
          { title: 'Orders open in spring', text: 'Your bag keeps everything until then.' },
          { title: 'Free delivery in Baku', text: 'On orders over 60 ₼. Elsewhere in Azerbaijan, 2 to 4 days.' },
          { title: '30 days to return', text: 'Unopened, for a full refund.' },
          { title: 'Batches of 300', text: 'Every bottle numbered and dated by hand.' },
        ]} />
      </Stop>
    </>
  )
}
