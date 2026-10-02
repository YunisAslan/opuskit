import type { Metadata } from 'next'
import { Spot } from '@/components/Spot'
import { StartProject } from '@/components/StartProject'
import { stickers } from '@/components/Stickers'
import { AboutSection } from '@/components/sections/About'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { ProcessSection } from '@/components/sections/Process'
import { TeamSection } from '@/components/sections/Team'
import { assets } from '@/config/assets'
import { brand, steps, team } from '@/content/site'

export const metadata: Metadata = { title: 'About', description: 'Sticky Weather is three people at one long table in Bristol, making brands people want to pick up.' }

export default function About() {
  return (
    <>
      <AboutSection as="h1" title="Sticky Weather is three people at one long table in Bristol."
        statement="Small studio? Big drawer of paper."
        bio="Mara started Sticky Weather in 2019 after ten years of packaging nobody kept. Rio joined to fold things, Arjun to make them move. We work with small brands that would rather be loved than everywhere: cafés, shops, makers and the odd paper mill. No account managers, no decks for decks. You talk to the people drawing."
        image={assets.studio1.src} alt={assets.studio1.alt} width={assets.studio1.width} height={assets.studio1.height} />
      <div className="relative">
        <Spot className="-top-12 right-[5%] w-[clamp(84px,10vw,140px)]">{stickers.sun}</Spot>
        <TeamSection eyebrow="Hover a face. It peels a little." title="Small team? Big opinions." people={team} />
      </div>
      <ProcessSection eyebrow="Seven weeks, give or take a print run." title="Long brief? Short steps." steps={steps} ground="var(--color-chapter-1)" ink="var(--color-surface)" />
      <ContactCtaSection inverse eyebrow="Three people, one table, room for your brand." headline="Like us?" quiet="We like you too."
        cta={<StartProject onDark />} email={brand.email} />
    </>
  )
}
