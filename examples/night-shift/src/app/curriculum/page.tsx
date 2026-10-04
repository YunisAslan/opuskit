import type { Metadata } from 'next'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { FaqSection } from '@/components/sections/Faq'
import { FeatureGridSection } from '@/components/sections/FeatureGrid'
import { ProcessSection } from '@/components/sections/Process'
import { TextScramble } from '@/components/pieces/TextScramble'
import { BeforeAfter } from '@/components/site/BeforeAfter'
import { Chapter } from '@/components/site/Chapter'
import { FaqList } from '@/components/site/FaqList'
import { PageHead } from '@/components/site/PageHead'
import { assets } from '@/config/assets'
import { faqs, finalScene, modules, shots } from '@/content/site'

export const metadata: Metadata = { title: 'Curriculum', description: 'Eight weeks, eight modules: what each covers, the lessons in it, the real shot you grade that week and what you hand in.' }

export default function Curriculum() {
  return (
    <>
      <PageHead label="Curriculum" title="Eight weeks in the suite"
        lead="Each week has a technique, a real shot to grade and a hand-in. Weeks 1 to 6 use the course shots so everyone grades the same frames; weeks 7 and 8 use a scene from the library." />

      <Chapter n="01" name="Weeks" grid>
        <FeatureGridSection title="What each week covers"
          intro="Two live sessions a week: Tuesday teaches the technique on the week’s shot, Thursday reviews every student’s grade of it."
          features={modules.map((m, i) => ({
            name: m.title, text: m.text, image: assets[m.image].src, alt: assets[m.image].alt,
            label: (
              <p className="type-utility flex items-baseline justify-between gap-4">
                <span className="inline-block min-w-[13ch]"><TextScramble duration={0.6} replayOnHover={false} className="text-(--color-text)">{`// ${m.n} ${m.key}`}</TextScramble></span>
                <span className="tabular-nums text-(--color-muted)">Week {i + 1}</span>
              </p>
            ),
            details: (
              <div className="mt-6 flex flex-1 flex-col justify-between gap-6">
                <ol className="type-body space-y-1.5 border-t border-(--color-border) pt-4 text-[0.9375rem]">
                  {m.lessons.map((l, j) => <li key={l} className="grid grid-cols-[2.25rem_1fr]"><span className="tabular-nums text-(--color-muted)">{i + 1}.{j + 1}</span>{l}</li>)}
                </ol>
                <dl className="type-body grid gap-3 border-t border-(--color-border) pt-4 text-[0.9375rem]">
                  <div><dt className="type-utility text-(--color-muted)">The shot</dt><dd>{m.shot}</dd></div>
                  <div><dt className="type-utility text-(--color-muted)">Hand in</dt><dd>{m.handIn}</dd></div>
                </dl>
              </div>
            ),
          }))} />
      </Chapter>

      <Chapter n="02" name="Final scene">
        <ProcessSection title="Your final scene, weeks 6 to 8" steps={finalScene} />
      </Chapter>

      <Chapter n="03" name="The shots">
        <CaseStudySection title="The shots you grade"
          intro="Three camera originals in log, graded in weeks 1 to 6. Drag the line to compare the flat file with the finished frame."
          chapters={shots.map((s) => ({ key: s.key, media: <BeforeAfter before={s.before} after={s.after} />, facts: s.facts, paragraphs: s.paragraphs }))} />
      </Chapter>

      <Chapter n="04" name="Questions">
        <FaqSection title="About the course"><FaqList items={faqs.course} /></FaqSection>
      </Chapter>
    </>
  )
}
