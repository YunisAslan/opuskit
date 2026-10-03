import { Hero } from '@/components/Hero'
import { GiantWord } from '@/components/motion'
import { JournalBlock, NewsletterBlock, ShopGrid } from '@/components/blocks'
import { ProductLink } from '@/components/shop'
import { SwapButton } from '@/components/pieces/SwapButton'
import { CollectionSection } from '@/components/sections/Collection'
import { assets } from '@/config/assets'
import { bySlug, euro } from '@/data/shop'
import { journal } from '@/data/journal'

const key = ['narikala-coat', 'sololaki-rider', 'slouch-boot'].map((s) => bySlug(s)!)

export default function Home() {
  return (
    <>
      <Hero>
        <h1 className="type-display [font-size:clamp(3.6rem,9vw,8rem)]">Black clothes<br /> that age<br /> with you</h1>
        <p className="type-body mt-6 max-w-[40ch]">Heavy cotton, waxed wool and leather, cut in small runs in Tbilisi.</p>
        <SwapButton href="#shop" label="Shop the collection" className="mt-8 [--color-text:var(--color-background)]" />
      </Hero>

      <CollectionSection link={ProductLink} season="Autumn Winter 2026" title="Ember"
        text="Twenty-two pieces in black, cut in runs of forty. Waxed wool for the rain, leather for the years, cotton heavy enough to stand up on its own."
        image={assets.look1.src} alt={assets.look1.alt}
        pieces={key.map((p) => ({ name: p.name, price: euro(p.price), image: p.image, alt: p.alt, href: `#${p.slug}` }))} />

      <ShopGrid id="shop" title="The pieces" />

      <GiantWord word="Journal" id="journal" />
      <JournalBlock entries={journal} />

      <NewsletterBlock />
    </>
  )
}
