import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { StepsSection } from '@/components/sections/Steps'
import { about } from '@/content/copy'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'The house' }

// About — About (portrait, statement, bio) → Process (steps down a line).
export default function AboutPage() {
  return (
    <>
      <AboutSection
        media="side"
        title={about.about.title}
        image="aboutPortrait"
        statement={about.about.statement}
        bio={about.about.bio}
      />
      <div id="process">
        <StepsSection variant="rail" title={about.process.title} steps={about.process.steps} />
      </div>
      <section id="contact" className="px-(--gutter) pb-(--section-y)">
        <div className="mx-auto max-w-(--container) border-t border-(--color-border) pt-8">
          <p className="type-body max-w-[52ch] text-(--color-muted)">
            Write to us at{' '}
            <a href={`mailto:${site.email}`} className="text-(--color-text) underline underline-offset-4">
              {site.email}
            </a>{' '}
            or find the studio at {site.address}.
          </p>
        </div>
      </section>
    </>
  )
}