'use client'
import Link from 'next/link'
import { toast } from 'sonner'
import { ProductBuySection } from '@/components/sections/ProductBuy'
import { TextEffect } from '@/components/pieces/TextEffect'
import { assets } from '@/config/assets'
import { bySlug, delivery, money } from '@/data/shop'
import { useBag } from '@/lib/bag'
import { useRouter } from 'next/navigation'

export function BuyBox({ slug }: { slug: string }) {
  const p = bySlug(slug)!
  const { add } = useBag()
  const router = useRouter()
  return (
    <ProductBuySection variant="sticky" link={Link}
      name={<TextEffect as="span">{p.name}</TextEffect>}
      price={`${money(p.price)}, ${p.size}`} line={p.line}
      images={p.images.map((k) => ({ src: assets[k].src, alt: assets[k].alt }))}
      option={{ label: 'Scent', values: ['Unscented', 'Rose geranium'] }}
      details={[
        { title: 'What is inside', text: p.inside },
        { title: 'How to use it', text: p.use },
        { title: 'Delivery', text: delivery },
        { title: 'Returns', text: 'Unopened, within 30 days, for a full refund. Opened and it did not suit you? Write to us anyway; we would rather know.' },
      ]}
      action={{ label: 'Add to bag', href: '/cart' }}
      onAction={(qty, option) => {
        add(p.slug, qty, option)
        toast(`${p.name} is in your bag`, { description: `${qty} × ${option ?? ''}. Orders open in spring; your bag keeps it until then.`, action: { label: 'See bag', onClick: () => router.push('/cart') } })
      }}
      note="Orders open in spring. Add it now and your bag will keep it." />
  )
}
