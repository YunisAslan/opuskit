import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { CartView } from '@/components/site/CartView'
import { PageHeader } from '@/components/site/PageHeader'
import { Stop } from '@/components/site/Stop'
import { gridItems } from '@/lib/grid'

export const metadata: Metadata = { title: 'Your bag', description: 'What you have chosen so far. Orders open in spring.' }

export default function Cart() {
  return (
    <>
      <Stop id="bag" name="Your bag" fade={false}>
        <PageHeader title="Your bag" line="Orders open in spring. Your bag keeps everything until then, so take your time." />
        <CartView />
      </Stop>
      <Stop id="beside" name="Beside it">
        <div className="focus-grid"><ProductGridSection link={Link} title="People often add" products={gridItems()} /></div>
      </Stop>
    </>
  )
}
