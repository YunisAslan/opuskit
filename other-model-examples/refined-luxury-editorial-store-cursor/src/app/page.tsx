import Link from 'next/link'
import { Hero } from '@/components/sections/Hero'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { CollectionSection } from '@/components/sections/Collection'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { TrustSection } from '@/components/sections/Trust'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { home } from '@/content/copy'
import { scents } from '@/content/products'

// Home — Hero → Product Grid → Collection → Editorial Story → Testimonials → Trust → Newsletter.
export default function HomePage() {
  const products = scents.map((s) => ({
    name: s.name,
    price: s.price,
    image: s.image,
    hoverImage: s.hoverImage,
    href: `/product/${s.slug}`,
  }))
  const pieces = scents.slice(0, 3).map((s) => ({
    name: s.name,
    price: s.price,
    image: s.image,
    href: `/product/${s.slug}`,
  }))

  return (
    <>
      <Hero />
      <ProductGridSection link={Link} title={home.productGrid.title} products={products} />
      <CollectionSection
        link={Link}
        season={home.collection.season}
        title={home.collection.title}
        text={home.collection.text}
        image="collection"
        pieces={pieces}
      />
      <EditorialStorySection
        media="side"
        title={home.editorial.title}
        image="editorialDetail"
        caption={home.editorial.caption}
        paragraphs={home.editorial.paragraphs}
        pullQuote={home.editorial.pullQuote}
      />
      <TestimonialsSection variant="lead" title={home.testimonials.title} quotes={home.testimonials.quotes} />
      <TrustSection items={home.trust.items} />
      <NewsletterSection
        title={home.newsletter.title}
        text={home.newsletter.text}
        placeholder={home.newsletter.placeholder}
        button={home.newsletter.button}
        note={home.newsletter.note}
      />
    </>
  )
}