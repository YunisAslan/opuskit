import { EnquirySheet } from '@/components/EnquiryForm'
import { Hero } from '@/components/Hero'
import { BarnIndex } from '@/components/BarnIndex'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { StatementSection } from '@/components/sections/Statement'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { home, projects, studio } from '@/content/site'

// Home: Hero → Featured Work → Manifesto → Testimonials → Closing CTA. The hero pins; everything after slides over it.
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <BarnIndex
          id="work"
          title={home.work.title}
          items={projects.map((p) => ({ title: p.title, kind: p.kind, where: `${p.place}, ${p.year}`, image: p.image, href: `/work/${p.slug}` }))}
        />
        <StatementSection id="belief" lines={home.belief.lines} mobile={home.belief.mobile} attribution={home.belief.attribution} />
        <TestimonialsSection id="words" title={home.words.title} quotes={home.words.quotes} />
        <ContactCtaSection
          id="contact"
          tone="inverse"
          headline={home.contact.headline}
          quiet={home.contact.quiet}
          email={studio.email}
          phone={studio.phone}
          address={studio.address}
          actionSlot={<EnquirySheet label={home.contact.action.label} />}
        />
      </div>
    </>
  )
}
