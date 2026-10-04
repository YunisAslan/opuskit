import { AboutSection } from '@/components/sections/About'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { IntroSection } from '@/components/sections/Intro'
import { ProcessSection } from '@/components/sections/Process'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { BeforeAfter } from '@/components/site/BeforeAfter'
import { Chapter } from '@/components/site/Chapter'
import { FaqList } from '@/components/site/FaqList'
import { Hero } from '@/components/site/Hero'
import { Lines } from '@/components/site/Lines'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Parallax } from '@/components/site/Parallax'
import { PricingBlock } from '@/components/site/PricingBlock'
import { ScrambleLink } from '@/components/site/ScrambleLink'
import { assets } from '@/config/assets'
import { cohorts, faqs, quotes, site, weekRun } from '@/content/site'
import { longDate, shortDate } from '@/lib/status'

const next = cohorts.find((c) => c.seatsLeft > 0) ?? cohorts[0]
const withPhoto = (q: { image?: keyof typeof assets }) => (q.image ? { image: assets[q.image].src, alt: assets[q.image].alt } : {})

export default function Home() {
  return (
    <>
      <Hero
        line="Grade film from flat log to finished frame: eight weeks, live, beside a colourist who still grades for a living."
        action={{ label: 'Reserve a seat', href: '#enrol' }}
        meta={`${site.price}, starts ${shortDate(next.start)}`}
        preview={{ label: 'Watch a free lesson', href: '#preview' }}
        facts={[
          { label: 'Length', value: '8 weeks' },
          { label: 'Live, Oslo time', value: 'Tue, Thu 19:00' },
          { label: 'Cohort size', value: '12 students' },
          { label: `Cohort ${next.n}`, value: `${next.seatsLeft} seats left` },
        ]}
      />

      <Chapter n="01" name="The course">
        <IntroSection
          statement={<Lines lines={['Eight weeks of grading real footage,', 'live, two evenings a week,', 'one shot at a time.']} mobile={['Eight weeks of', 'grading real footage,', 'live, two evenings', 'a week, one shot', 'at a time.']} />}
          body="For editors, camera people and directors who already cut their own work and want the grade to stop being guesswork. Twelve people in the room, every grade reviewed, footage from real productions."
          media={
            <div className="grid gap-4 md:grid-cols-12">
              <Parallax className="aspect-video rounded-(--radius-media) md:col-span-8"><MediaAsset id="suite" sizes="(min-width: 768px) 66vw, 100vw" /></Parallax>
              <div className="flex flex-col gap-4 md:col-span-4">
                <Parallax className="aspect-square rounded-(--radius-media) md:aspect-auto md:flex-1"><MediaAsset id="scope" sizes="(min-width: 768px) 33vw, 100vw" /></Parallax>
                <p className="type-utility text-(--color-muted)">Week 2: reading the signal before touching a wheel.</p>
              </div>
            </div>
          }
        />
      </Chapter>

      <Chapter n="02" name="One shot">
        <CaseStudySection title="One shot, before and after"
          intro="The golden-hour shot on the console above, as the camera recorded it and as it leaves the suite. Drag the line."
          chapters={[{
            key: 'Golden hour', media: <BeforeAfter before="log2" after="grade2" />,
            facts: [{ label: 'Week', value: '5, Skin' }, { label: 'In the suite', value: '45 minutes' }, { label: 'Nodes', value: '7' }],
            paragraphs: [
              'The problem: log keeps the sun in the sky and the detail in her hair, and leaves everything grey. Backlit, her face sits two stops under the field.',
              'The approach: balance on the scopes first. Gamma lifts the face, a soft window holds the sky, and a skin key puts her on the vectorscope’s skin line instead of guessing by eye.',
              'The result: warm light that belongs to the evening, a sky that keeps its detail, and skin that reads as skin. Students grade this shot in week 5.',
            ],
          }]} />
      </Chapter>

      <Chapter n="03" name="A week" grid>
        <ProcessSection title="How a week runs" steps={weekRun} />
      </Chapter>

      <Chapter n="04" name="Instructor">
        <AboutSection title="Who teaches" image={assets.instructor.src} alt={assets.instructor.alt}
          statement="I teach colour the way I learnt it: on real shots, with someone looking over your shoulder."
          bio="Hanne Vik is a colourist in Oslo. She graded The Salt Year, Low Tide Hotel and both seasons of Northern Line, and has run Night Shift since 2023. She still grades by day, which is why the course runs in the evening.">
          <p className="mt-8"><ScrambleLink href="/instructor" className="type-utility inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">Credits and background</ScrambleLink></p>
        </AboutSection>
      </Chapter>

      <Chapter n="05" name="Students">
        <TestimonialsSection title="From the last two cohorts" quotes={quotes.home.map((q) => ({ ...q, ...withPhoto(q) }))} />
      </Chapter>

      <Chapter n="06" name="Price">
        <PricingBlock title="One price, three ways in">
          <p className="mt-6"><ScrambleLink href="/enrol" className="type-utility inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">Cohort calendar</ScrambleLink></p>
        </PricingBlock>
      </Chapter>

      <Chapter n="07" name="Questions">
        <FaqSection title="Before you enrol"><FaqList items={faqs.start} /></FaqSection>
      </Chapter>

      <Chapter n="08" name="Enrol">
        <ContactCtaSection link={ScrambleLink} headline="Twelve seats, two evenings a week." quiet={`Cohort ${next.n} starts ${longDate(next.start)}.`}
          action={{ label: 'Reserve a seat', href: '#enrol' }} meta={`${site.price}, starts ${shortDate(next.start)}`} email={site.email} />
      </Chapter>
    </>
  )
}
