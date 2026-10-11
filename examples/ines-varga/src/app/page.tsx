import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { HeroSection } from '@/components/sections/Hero'
import { Desk } from '@/components/site/Desk'
import { home, projects } from '@/content/site'

export default function Home() {
  const items = projects.map((p, n) => ({ ...p, n }))
  return (
    <>
      <HeroSection />
      <section aria-labelledby="work-title" className="px-(--gutter) py-(--section-y)">
        <Desk title={home.work.title} years={home.work.years} note={home.work.desk} sr={home.work.deskSr} />
        <div className="mt-16 md:mt-24">
          <FeaturedWorkSection variant="index" title={home.work.title} items={items} headingId="work-title" />
        </div>
      </section>
      <ContactCtaSection tone="surface" headline={[home.cta.headline]} quiet={home.cta.quiet} action={home.cta.action} />
    </>
  )
}
