import type { Metadata } from 'next'
import { GiantWord, Lines } from '@/components/motion'
import { SwapButton } from '@/components/pieces/SwapButton'
import { AboutSection } from '@/components/sections/About'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { TeamSection } from '@/components/sections/Team'
import { assets as a } from '@/config/assets'

export const metadata: Metadata = { title: 'About', description: 'Three people and two machines in a Tbilisi workshop, cutting black clothing in runs of forty or fewer.' }

export default function About() {
  return (
    <>
      <div className="pt-20 md:pt-28"><GiantWord word="Workshop" as="h1" /></div>

      <AboutSection title="About Saint Ashe" image={a.studio.src} alt={a.studio.alt}
        statement="We make black clothes that get better the longer you keep them."
        bio="Saint Ashe is three people and two machines in a workshop above Kote Afkhazi Street in Tbilisi. Since 2021 we have cut every piece ourselves, in runs of forty or fewer, from cloth and leather that wears in instead of out. When a run is gone, it is gone." />

      <EditorialStorySection id="story"
        title={<Lines lines={['Cut close,', 'worn loose']} />}
        image={a.detail.src} alt={a.detail.alt} caption="Leather and stitching, up close, in the workshop."
        quote="Black is not one colour. Wool, leather and cotton each wear it differently, and none of them stay the same."
        paragraphs={[
          'Every Saint Ashe piece starts as a paper pattern pinned to the wall of the workshop. Nino cuts it close to the body, then lets it out until it moves. That is why the coats feel narrow at the shoulder and loose everywhere else.',
          'We buy cloth by the bolt from two mills we have visited, and leather from one tannery that still uses bark. Waxed wool turns from glossy to matt where your arms swing. Leather darkens where your hands go. Heavy cotton softens at the collar and stays square at the hem.',
          'Nothing goes on sale. When a run sells out we cut the next one when the cloth arrives, usually in a few months, sometimes in a different weight. Anything you buy from us comes back to us for repair, for as long as you own it.',
        ]} />

      <TeamSection title="The three of us" people={[
        { name: 'Nino Beridze', role: 'Patterns and cutting', line: 'I draw every pattern twice: once for the body, once for ten years later.', image: a.team1.src, alt: a.team1.alt },
        { name: 'Levan Abashidze', role: 'Leather and repairs', line: 'If it comes back with a broken seam, it comes back to me.', image: a.team2.src, alt: a.team2.alt },
        { name: 'Tamar Kvaratskhelia', role: 'The shop and your orders', line: 'I answer every email, usually before lunch.', image: a.team3.src, alt: a.team3.alt },
      ]} />

      <div className="mx-auto max-w-[1440px] px-4 pb-32 md:px-10 md:pb-40">
        <SwapButton href="/contact#visit" label="Visit the workshop" className="[--color-text:var(--color-background)]" />
      </div>
    </>
  )
}
