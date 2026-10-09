'use client'
import { Button } from '@/components/ui/button'
import { productBySlug } from '@/content/products'
import { price } from '@/lib/format'
import { useAddToBag } from './use-add-to-bag'

/** "Add to bag" for an editorial part: adds the Sunshine glaze, reads "Added" for 1.5s. */
export function BuyButton({ slug, label }: { slug: string; label: string }) {
  const p = productBySlug(slug)!
  const { add, added } = useAddToBag()
  return <Button size="lg" onClick={() => add(p)} className="min-w-[13rem]">{added ? 'Added' : `${label}, ${price(p.price)}`}</Button>
}
