import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaqSection } from '@/components/sections/Faq'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { SpecsSection } from '@/components/sections/Specs'
import { StepsSection } from '@/components/sections/Steps'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { BuyBox } from '@/components/site/BuyBox'
import { Crumbs } from '@/components/site/Crumbs'
import { FaqList } from '@/components/site/Faq'
import { Stop } from '@/components/site/Stop'
import { bySlug, productFaq, products, testimonials } from '@/data/shop'
import { gridItems } from '@/lib/grid'

export const dynamicParams = false
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/shop/[slug]'>): Promise<Metadata> {
  const p = bySlug((await params).slug)
  return p ? { title: p.name, description: p.line } : {}
}

export default async function ProductPage({ params }: PageProps<'/shop/[slug]'>) {
  const p = bySlug((await params).slug)
  if (!p) notFound()
  const others = products.filter((o) => o.slug !== p.slug && !o.extra).slice(0, 4)
  return (
    <>
      <Crumbs trail={[{ label: 'Shop', href: '/shop' }]} here={p.name} />
      <Stop id="bottle" name="The bottle" fade={false}><BuyBox slug={p.slug} /></Stop>
      <Stop id="label" name="The label">
        <SpecsSection variant="table" title="What is on the label" text="Everything we would want to know before buying it ourselves." specs={p.specs}
          note="Each bottle carries its batch number and the day it was poured, written by hand." />
      </Stop>
      <Stop id="pour" name="The pour">
        <StepsSection variant="rail" title="How a batch is made, from the lake to your shelf" steps={[
          { name: 'Rake', text: 'Salt from Masazir, raked by hand in August, dried on the lab roof for a week and washed twice in lake water.' },
          { name: 'Steep', text: 'Saffron from Bilgah sits in squalane for six weeks, until the oil turns the colour of late afternoon.' },
          { name: 'Pour', text: 'Nigar mixes each batch in the lab in Mardakan and pours it in one day, 300 bottles at a time.' },
          { name: 'Number', text: 'Every bottle is labelled by hand with its batch and the day it was poured, then rests a week before it leaves.' },
        ]} />
      </Stop>
      <Stop id="bathrooms" name="Other bathrooms">
        <TestimonialsSection tone="surface" variant="lead" title="From the people who tested it" quotes={testimonials} />
      </Stop>
      <Stop id="questions" name="Questions">
        <FaqSection title="Before you buy"><FaqList items={productFaq} /></FaqSection>
      </Stop>
      <Stop id="beside" name="Beside it">
        <div className="focus-grid"><ProductGridSection link={Link} title="It works well beside" products={gridItems(others)} /></div>
      </Stop>
    </>
  )
}
