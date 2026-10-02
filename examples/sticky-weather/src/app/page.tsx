import { HomeHero } from '@/components/HomeHero'
import { Spot } from '@/components/Spot'
import { StartProject } from '@/components/StartProject'
import { stickers } from '@/components/Stickers'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { JournalSection } from '@/components/sections/Journal'
import { ManifestoSection } from '@/components/sections/Manifesto'
import { assets } from '@/config/assets'
import { brand, journal, work } from '@/content/site'

const featured = ['squeeze-club', 'starling-goods', 'foam-party', 'linden-mill'].map((s) => work.find((w) => w.slug === s)!)

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedWorkSection eyebrow="Four of the latest, each in its own colours." title="Blending in? Not on our watch."
        projects={featured.map((w) => ({ title: w.title, meta: w.meta, image: assets[w.photo].src, alt: assets[w.photo].alt, href: `/practice#${w.slug}`, ground: w.ground, ink: w.ink }))} />
      <div className="relative">
        <Spot className="-top-24 right-[4%] w-[clamp(96px,12vw,170px)] max-md:-top-16">{stickers.label}</Spot>
        <ManifestoSection attribution="Mara Lindqvist, founder"
          lines={['Most brands are wallpaper.', 'We make the kind people', 'peel off, pass around', 'and stick on the fridge.']}
          mobileLines={['Most brands', 'are wallpaper.', 'We make the', 'kind people', 'peel off, pass', 'around and stick', 'on the fridge.']} />
      </div>
      <JournalSection eyebrow="Notes from the big table, mostly about paper." title="Busy studio? Here’s the gossip." entries={journal} />
      <ContactCtaSection inverse eyebrow="Got a brand that keeps getting left on the shelf?" headline="Got a brand?" quiet="We’ve got glue."
        cta={<StartProject onDark />} email={brand.email} />
    </>
  )
}
