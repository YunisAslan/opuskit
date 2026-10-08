import type { Metadata } from 'next'
import { CurriculumSection } from '@/components/sections/Curriculum'
import { StepsSection } from '@/components/sections/Steps'
import { FaqSection } from '@/components/sections/Faq'
import { anEvening, curriculum } from '@/content/course'
import { faqsFor } from '@/content/site'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Curriculum', description: 'Six weeks, week by week: the baseline, columns, modules, letters, the poster and print day.' }

export default function CurriculumPage() {
  const items = faqsFor(['The course'])
  return (
    <>
      <CurriculumSection title={curriculum.title} text={curriculum.text} modules={curriculum.modules} note={curriculum.note} />
      <StepsSection variant="columns" title={anEvening.title} aside="Tuesday and Thursday, 18:30 to 21:30" steps={anEvening.steps} />
      <FaqSection title="About the course" items={items} more={{ label: 'All questions', href: '/faq' }} link={Link} />
    </>
  )
}
