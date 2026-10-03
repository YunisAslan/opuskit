import type { Metadata } from 'next'
import { SeasonStrip, ShopGrid } from '@/components/blocks'
import { SwapButton } from '@/components/pieces/SwapButton'
import { CollectionSection } from '@/components/sections/Collection'
import { LookbookSection } from '@/components/sections/Lookbook'
import { RollLink } from '@/components/RollLink'
import { assets } from '@/config/assets'

export const metadata: Metadata = { title: 'Collections', description: 'Ember, Autumn Winter 2026: waxed wool, leather and heavy cotton in black, cut in runs of forty in Tbilisi.' }

const a = assets
const strip = [
  { src: a.look2.src, alt: a.look2.alt, caption: 'Heavy tee and Vake trouser' },
  { src: a.product2.src, alt: a.product2.alt, caption: 'Sololaki rider' },
  { src: a.detail.src, alt: a.detail.alt, caption: 'Leather and stitching, up close' },
  { src: a.product5.src, alt: a.product5.alt, caption: 'Slouch boot' },
  { src: a.product7.src, alt: a.product7.alt, caption: 'Rib turtleneck' },
  { src: a.product6.src, alt: a.product6.alt, caption: 'Round bag' },
]

export default function Collections() {
  return (
    <>
      <CollectionSection as="h1" season="Autumn Winter 2026" title="Ember"
        text="Ember is what is left when the fire is out: black that still holds heat. Twenty-two pieces, made to be worn hard from October to April and kept for years after."
        image={a.look3.src} alt={a.look3.alt}>
        <SeasonStrip photos={strip} />
        <div className="mx-auto max-w-[1440px] px-4 pb-8 md:px-10">
          <SwapButton href="#shop" label="Shop the collection" className="[--color-text:var(--color-background)]" />
        </div>
      </CollectionSection>

      <LookbookSection id="lookbook" link={RollLink} title="Three looks for the cold" looks={[
        { number: '1', image: a.look1.src, alt: a.look1.alt, detail: a.product1.src, detailAlt: a.product1.alt, pieces: 'Narikala coat, rib turtleneck, Vake trouser, slouch boots', href: '#shop' },
        { number: '2', image: a.look2.src, alt: a.look2.alt, detail: a.product3.src, detailAlt: a.product3.alt, pieces: 'Heavy tee, Vake trouser, waxed cap', href: '#shop' },
        { number: '3', image: a.look3.src, alt: a.look3.alt, full: true, line: 'Coat to the shin, boots that fold, and nothing else to carry.', pieces: 'Narikala coat, Vake trouser, slouch boots, round bag', href: '#shop' },
      ]} />

      <ShopGrid id="shop" title="Every piece in the run" />
    </>
  )
}
