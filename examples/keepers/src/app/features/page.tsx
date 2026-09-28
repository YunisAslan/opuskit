import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import StackCards, { type Feature } from '@/components/StackCards'
import HoverIndex, { type IndexRow } from '@/components/HoverIndex'

export const metadata: Metadata = { title: 'Features' }

const features: Feature[] = [
  {
    title: 'Cold brew, not instant',
    body: 'Coarse-ground arabica steeps in 4°C water for 18 hours. Cold extraction pulls out about 60% less acid than hot brewing, so the coffee tastes of chocolate and stone fruit rather than char.',
    proof: 'pH 5.1, measured per batch',
    image: 'pour',
  },
  {
    title: 'Real peel, no flavouring',
    body: 'We zest Sicilian oranges and Amalfi lemons and steep the peel with the coffee. The oils carry the citrus, so there is no added flavouring and no citric acid on the label.',
    proof: '2.4 g of peel in every can',
    image: 'ingredients',
  },
  {
    title: 'Fine bubbles that last',
    body: 'Carbonated to 2.8 volumes, a little softer than tonic. The bubbles stay small, so the drink feels bright without the bloat of a cola.',
    proof: '2.8 volumes CO₂',
    image: 'glassIce',
  },
  {
    title: 'A can that comes back',
    body: 'Aluminium is recycled more often than any other drinks packaging in Europe. Ours starts at 68% recycled content and carries no plastic ring or shrink wrap.',
    proof: '68% recycled aluminium',
    image: 'ringpull',
  },
]

const rows: IndexRow[] = [
  { name: 'Cold-brew arabica', origin: 'Finca La Primavera, Huila, Colombia', amount: '18 g', image: 'beans' },
  { name: 'Orange peel', origin: 'Sicily, Italy', amount: '1.6 g', image: 'posterImage' },
  { name: 'Lemon peel', origin: 'Amalfi coast, Italy', amount: '0.8 g', image: 'ingredients' },
  { name: 'Cane sugar', origin: 'Organic, Paraguay', amount: '6 g', image: 'pour' },
  { name: 'Sparkling water', origin: 'Filtered, London', amount: '310 ml', image: 'glassIce' },
]

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        title={['Four things', 'we refuse', 'to cut.']}
        mobile={['Four', 'things we', 'refuse', 'to cut.']}
        meta="What is in the can"
        intro="Most canned coffee is brewed hot, cooled and sweetened to hide it. Keepers is brewed cold, zested by hand and carbonated gently. Here is what that means for the drink."
      />
      <section aria-label="Features" className="container-text pb-32 md:pb-40">
        <StackCards items={features} />
      </section>
      <section className="container-text pb-32 md:pb-40">
        <SectionHeader label="Per 330 ml can" title={['Every ingredient,', 'and where it grows.']} className="mb-12" />
        <div data-reveal>
          <HoverIndex rows={rows} />
        </div>
      </section>
    </>
  )
}
