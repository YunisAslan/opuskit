import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { TimelineSection } from '@/components/sections/Timeline'
import { about } from '@/content/site'

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  openGraph: { title: about.meta.title, description: about.meta.description, images: [{ url: '/media/about.jpg', width: 1800, height: 2400, alt: about.portraitAlt }] },
}

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <TestimonialsSection tone="surface" title={about.testimonials.title} quotes={about.testimonials.quotes} />
      <TimelineSection title={about.timeline.title} text={about.timeline.text} steps={about.timeline.steps} />
    </>
  )
}
