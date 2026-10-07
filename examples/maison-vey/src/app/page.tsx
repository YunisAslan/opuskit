import { HeroSection } from '@/components/sections/Hero'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { CollectionSection } from '@/components/sections/Collection'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { TrustSection } from '@/components/sections/Trust'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { home } from '@/content/copy'
import { allProducts, toPiece } from '@/content/view'

// Home: Hero → Product Grid → Collection → Editorial Story → Testimonials → Trust Strip → Newsletter
export default function Home() {
  const { hero, grid, collection, story, testimonials, trust, newsletter } = home
  return (
    <>
      <HeroSection
        image="hero" imageMobile="hero-mobile"
        eyebrow={hero.eyebrow} title={hero.title} line={hero.line} priceLine={hero.priceLine}
        action={{ label: hero.action, slug: hero.product, size: '50 ml' }}
        secondary={{ label: hero.secondary, href: '/shop' }}
      />
      <ProductGridSection title={grid.title} products={allProducts} />
      <CollectionSection season={collection.season} title={collection.title} titleLines={['The late', 'hours']} text={collection.text} pieces={collection.pieces.map(toPiece)} />
      <EditorialStorySection
        title={{ desktop: ['The hour is', 'an ingredient'], mobile: ['The hour', 'is an', 'ingredient'] }}
        image="editorial-place" caption={story.caption} detail="editorial-hands"
        paragraphs={story.paragraphs} quote={story.quote} quoteBy={story.quoteBy}
      />
      <TestimonialsSection tone="surface" title={testimonials.title} quotes={testimonials.quotes} />
      <TrustSection items={trust} />
      <NewsletterSection {...newsletter} />
    </>
  )
}
