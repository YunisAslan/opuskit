import Link from 'next/link'
import { CtaBandSection } from '@/components/sections/CtaBand'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { HeroSection } from '@/components/sections/Hero'
import { JournalSection } from '@/components/sections/Journal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { TimelineSection } from '@/components/sections/Timeline'
import { asset } from '@/config/assets'
import { home, site } from '@/content/site'

export default function Home() {
  return (
    <>
      <HeroSection link={Link} />
      <TimelineSection title={home.timeline.title} text={home.timeline.text} steps={home.timeline.steps} />
      <StatsSection tone="surface" title={home.stats.title} stats={home.stats.stats} note={home.stats.note} />
      <ServicesSection link={Link} title={home.services.title} items={home.services.items} />
      <EditorialStorySection
        image="storyHome"
        media="side"
        openLarge
        title={['A forest you cannot', 'see from the shore']}
        mobileTitle={['A forest', 'you cannot see', 'from the shore']}
        alt={asset('storyHome').alt}
        caption={home.story.caption}
        paragraphs={home.story.paragraphs}
        quote={home.story.quote}
        quoteBy={home.story.quoteBy}
      />
      <CtaBandSection tone="inverse" link={Link} text={home.ctaBand.text} action={home.ctaBand.action} note={home.ctaBand.note} />
      <JournalSection link={Link} title={home.journal.title} entries={home.journal.entries.map((e, i) => ({ ...e, image: i, alt: asset('journal', i).alt }))} />
      <NewsletterSection {...home.newsletter} to={site.email} />
    </>
  )
}
