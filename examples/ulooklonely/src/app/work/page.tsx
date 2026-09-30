import type { Metadata } from 'next'
import { media } from '@/components/MediaAsset'
import { Grid } from '@/components/Hydrated'
import { LineReveal } from '@/components/Reveal'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { TitleCard } from '@/components/TitleCard'
import { WorkIndex } from '@/components/WorkIndex'
import { photoSet } from '@/config/assets'
import { index, projects } from '@/config/content'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Work', description: 'Selected short films, music videos and edits, 2019 to 2026.' }

export default function Work() {
  const photos = photoSet.map((k) => media(k, true))
  return (
    <>
      {/* Featured Work opens on the tilted grid of stills, one headline floating above it. */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
          <LineReveal immediate as="h1" lines={['Selected work,', '2019 to 2026']} mobile={['Selected', 'work, 2019', 'to 2026']} className="type-display" />
        </div>
        <div className="mt-12 px-2 md:mt-16 md:px-6">
          <Grid photos={photos.slice(0, 15)} columns={3} className="md:hidden" />
          <Grid photos={photos} columns={5} className="hidden md:block" />
        </div>
      </section>
      <FeaturedWorkSection title="Five films to start with" projects={projects}>
        <WorkIndex rows={index} />
      </FeaturedWorkSection>
      <TitleCard lines={['One film,', 'up close']} line="Orange Hours: nineteen seconds, one man, and a colour that would not leave." />
      <CaseStudySection
        title="Orange Hours"
        image="stillCar"
        facts={[{ label: 'Client', value: 'Self-initiated' }, { label: 'Role', value: 'Edit, grade and sound' }, { label: 'Outcome', value: 'The cut the studio is named after' }]}
        paragraphs={[
          'Twenty hours of footage and one feeling to keep: being alone in a place built for crowds. Every early cut explained too much.',
          'I cut on faces, never on action, and let each shot run a beat longer than felt safe. The grade pushes warm against cold so each room reads as a mood, not a location.',
          'A nineteen-second film that plays forward and backward under your scroll on this site. It became the brief I now hand to every new project.',
        ]}
        href="/services"
        hrefLabel="Start a conversation"
        email={site.email}
      />
    </>
  )
}
