import Link from 'next/link'
import { Hero } from '@/components/site/Hero'
import { StatementSection } from '@/components/sections/Statement'
import { StepsSection } from '@/components/sections/Steps'
import { TeamSection } from '@/components/sections/Team'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { PricingSection } from '@/components/sections/Pricing'
import { ScheduleSection } from '@/components/sections/Schedule'
import { FaqSection } from '@/components/sections/Faq'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { closing, manifesto, pricing, schedule, team, wayIn } from '@/content/course'
import { faqs, nextCohort, quotes, site } from '@/content/site'

const homeFaqs = [0, 2, 6, 8, 11, 12].map((i) => faqs[i])

export default function Home() {
  return (
    <>
      <Hero />
      <StatementSection variant="giant" label="Why Raster" statement={manifesto.statement} attribution={manifesto.attribution} />
      <StepsSection variant="columns" title={wayIn.title} aside="From application to your first evening" steps={wayIn.steps} />
      <TeamSection variant="list" title={team.title} people={team.people} />
      <TestimonialsSection variant="single" tone="surface" title="What students say" quotes={[quotes[0]]} />
      <PricingSection
        variant="cards"
        title={pricing.title}
        plans={pricing.plans}
        note={pricing.note}
        preview={{ label: pricing.preview, href: `mailto:${site.email}?subject=${encodeURIComponent('Free preview lesson')}` }}
      />
      <ScheduleSection title={schedule.title} aside={schedule.aside} days={schedule.days} />
      <FaqSection title="Questions" items={homeFaqs} more={{ label: `All ${faqs.length} questions`, href: '/faq' }} link={Link} />
      <ContactCtaSection
        variant="statement"
        tone="inverse"
        headline={closing.headline}
        quiet={closing.quiet}
        action={{ label: closing.action, cohort: nextCohort.id }}
        email={site.email}
        phone={site.phone}
        address={site.address}
      />
    </>
  )
}
