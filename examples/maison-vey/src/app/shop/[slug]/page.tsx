import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductBuySection } from '@/components/sections/ProductBuy'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { FaqSection } from '@/components/sections/Faq'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faq, home, product as copy } from '@/content/copy'
import { getScent, scents } from '@/content/products'
import { otherProducts } from '@/content/view'

export function generateStaticParams() {
  return scents.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps<'/shop/[slug]'>): Promise<Metadata> {
  const s = getScent((await params).slug)
  return s ? { title: s.name, description: s.line } : {}
}

// Product: Product buy box → Product Highlight → Testimonials → FAQ → Product Grid
export default async function ProductPage({ params }: PageProps<'/shop/[slug]'>) {
  const s = getScent((await params).slug)
  if (!s) notFound()
  const set = s.slug === 'discovery-set'
  // The quote that names this scent leads, when there is one.
  const quotes = [...home.testimonials.quotes].sort((a, b) => Number(b.quote.includes(s.name)) - Number(a.quote.includes(s.name)))
  return (
    <>
      <ProductBuySection
        slug={s.slug} name={s.name} place={s.place} hour={s.hour || undefined} line={s.line}
        images={[{ id: s.images.front, alt: s.alt.front }, { id: s.images.angle, alt: s.alt.angle }, { id: s.images.detail, alt: s.alt.detail }]}
        sizes={s.sizes} optionLabel={copy.option} details={s.details} action={copy.action} note={copy.note}
        crumb={{ label: copy.breadcrumb, href: '/shop' }}
      />
      <ProductHighlightSection
        slug={s.slug} name={set ? 'Inside the box' : 'Up close'} text={s.details[0].text}
        image={s.images.detail} alt={s.alt.detail}
        details={set
          ? [{ label: 'Vials', value: '5 × 2 ml, with sprayers' }, { label: 'Credit', value: '€38 off a full bottle' }, { label: 'Lasts', value: 'About a week of each' }]
          : [{ label: 'Notes', value: s.notes.join(', ') }, { label: 'Place', value: s.place }, { label: 'Hour', value: s.hour }, { label: 'Bottle', value: 'Ground glass stopper, numbered' }]}
        sizes={s.sizes} action={copy.highlightAction}
      />
      <TestimonialsSection tone="surface" title={home.testimonials.title} quotes={quotes} />
      <FaqSection title="Questions">
        <Accordion type="single" collapsible>
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
      <ProductGridSection title={copy.gridTitle} products={otherProducts(s.slug)} />
    </>
  )
}
