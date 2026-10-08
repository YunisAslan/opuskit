import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { StatsSection } from '@/components/sections/Stats'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { instructor } from '@/content/course'
import { quotes, site } from '@/content/site'

export const metadata: Metadata = { title: 'Instructor', description: `${instructor.first} ${instructor.last}, lead instructor at ${site.name}.` }

export default function InstructorPage() {
  return (
    <>
      <AboutSection
        media="full"
        first={instructor.first}
        last={instructor.last}
        label={instructor.label}
        since="Raster School, since 2015"
        caption="Inking the forme. One pass of the roller over the locked-up type, before every pull."
        statement={instructor.statement}
        bio={instructor.bio}
      />
      <StatsSection variant="giant" tone="surface" title={instructor.stats.title} stats={instructor.stats.items} note={instructor.stats.note} />
      <TestimonialsSection variant="single" title="What students say" quotes={[quotes[2]]} />
    </>
  )
}
