import type { Metadata } from 'next'
import { Spot } from '@/components/Spot'
import { StartProject } from '@/components/StartProject'
import { stickers } from '@/components/Stickers'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { GallerySection } from '@/components/sections/Gallery'
import { assets } from '@/config/assets'
import { brand, gallery, work } from '@/content/site'

export const metadata: Metadata = { title: 'Practice', description: 'Six projects by Sticky Weather: packaging, shop identities, sticker sets, a colour system and business cards, each in its own colours.' }

export default function Practice() {
  return (
    <>
      <FeaturedWorkSection titleAs="h1" eyebrow="Packaging, identities, stickers and the odd colour system." title="Six jobs. No wallflowers."
          projects={work.map((w) => ({ id: w.slug, title: w.title, meta: w.meta, text: w.text, image: assets[w.photo].src, alt: assets[w.photo].alt, ground: w.ground, ink: w.ink }))} />
      <div className="relative">
        <Spot className="top-8 right-[4%] w-[clamp(90px,11vw,150px)] max-md:-top-12 max-md:w-20">{stickers.badge}</Spot>
        <EditorialStorySection eyebrow="How a job moves from the table to the screen." title="Too much screen? Back to paper."
          image={assets.studio4.src} alt={assets.studio4.alt} width={assets.studio4.width} height={assets.studio4.height} caption="The drawing desk, Tuesday morning."
          quote="If it doesn’t work as a sticker, it won’t work as a billboard."
          paragraphs={[
            'Every project here starts on the big table, not on a screen. We cut, fold, print and peel until the idea fits in the palm of a hand, because a brand that only works as a PDF isn’t much of a brand.',
            'That’s why the screen-print frame lives by the window and the paper drawer is never quite shut. The Squeeze Club box was folded forty times before it was drawn once. Linden’s colour system started as a pile of offcuts that Rio sorted on a Sunday, by feel.',
            'Then it goes digital. The websites we build move the way the paper did: things pop, peel and stick back down. Same idea, same hand, any size. And when it’s done, you get the files, the stickers and a short note on how to keep it all looking like you.',
          ]} />
      </div>
      <GallerySection eyebrow="Tap any photo to see the set up close." title="Messy desk? Tidy work." photos={gallery} />
      <ContactCtaSection inverse eyebrow="Seen something you’d like for yourself?" headline="Seen enough?" quiet="Let’s make yours."
        cta={<StartProject onDark />} email={brand.email} />
    </>
  )
}
