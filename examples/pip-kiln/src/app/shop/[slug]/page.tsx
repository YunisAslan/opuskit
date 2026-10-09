import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductBuySection } from '@/components/sections/ProductBuy'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { FaqSection } from '@/components/sections/Faq'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { SectionHead } from '@/components/parts/SectionHead'
import { BuyButton } from '@/components/parts/BuyButton'
import { productBySlug, products } from '@/content/products'
import { product as copy, shop } from '@/content/shop'
import { home } from '@/content/home'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug)
  return p ? { title: p.name, description: p.line } : {}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug)
  if (!p) notFound()
  const others = products.filter((x) => x.slug !== p.slug && x.type === p.type).concat(products.filter((x) => x.slug !== p.slug && x.type !== p.type)).slice(0, 4)
  return (
    <>
      <ProductBuySection p={p} />
      <ProductHighlightSection name={p.highlight.title} eyebrow={p.name} text={p.highlight.text} media={{ id: 'productPageHighlight', product: p.slug }}
        alt={`${p.name} up close, in use`} details={p.highlight.facts}
        action={p.stock > 0 ? <BuyButton slug={p.slug} label={copy.action} /> : undefined} />
      <div className="h-(--section-y)" />
      <TestimonialsSection title={copy.testimonialsTitle} quotes={home.testimonials.quotes} />
      <FaqSection title={shop.faq.title} lines={['Questions?', 'Answered.']} items={shop.faq.items} />
      <ProductGridSection head={<SectionHead text={copy.gridTitle} lines={copy.gridLines} />} products={others} />
    </>
  )
}
