import Link from 'next/link'
import { ProductStage } from '@/components/home/ProductStage'
import { CategoriesSection } from '@/components/sections/Categories'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { CollectionSection } from '@/components/sections/Collection'
import { StatementSection } from '@/components/sections/Statement'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { TrustSection } from '@/components/sections/Trust'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { SectionHead } from '@/components/parts/SectionHead'
import { WaveLink } from '@/components/parts/WaveLink'
import { home } from '@/content/home'
import { productBySlug, products, typeLabel, type ProductType } from '@/content/products'
import { workshops } from '@/content/workshops'
import { site } from '@/content/site'
import { count } from '@/lib/format'

const types: ProductType[] = ['mugs', 'plates', 'vases']

export default function Home() {
  const categories = [
    ...types.map((t, i) => ({
      name: typeLabel[t], href: `/shop?type=${t}`, index: i, alt: `Our best ${typeLabel[t].toLowerCase().replace(/s$/, '')}`,
      count: count(products.filter((p) => p.type === t).length, 'piece', 'pieces'),
    })),
    { name: home.categories.workshop.name, href: '/workshops', index: 3, alt: 'A Saturday workshop at the wheel', count: count(workshops.pricing.plans.length, 'way to book', 'ways to book') },
  ]
  const pieces = home.collection.pieces.map((slug, i) => {
    const p = productBySlug(slug)!
    return { name: p.name, price: p.price, index: i, alt: `${p.name} in the new butter glaze`, href: `/shop/${p.slug}` }
  })
  return (
    <>
      <ProductStage />
      <CategoriesSection link={Link} title={home.categories.title} lines={home.categories.lines} items={categories} />
      <ProductGridSection
        head={<SectionHead text={home.grid.title} lines={home.grid.lines} aside={<WaveLink href="/shop" className="t-action py-3">{home.grid.more}</WaveLink>} />}
        products={products.slice(0, 4)}
      />
      <CollectionSection season={home.collection.season} title={home.collection.title} lines={home.collection.lines} text={home.collection.text}
        action={{ label: home.collection.action, href: '/shop' }} pieces={pieces} />
      <StatementSection statement={home.manifesto.statement} lines={home.manifesto.lines} attribution={home.manifesto.attribution} />
      <TestimonialsSection title={home.testimonials.title} quotes={home.testimonials.quotes} />
      <TrustSection items={home.trust} />
      <NewsletterSection {...home.newsletter} to={site.email} />
    </>
  )
}
