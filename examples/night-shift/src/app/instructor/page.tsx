import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { StatsSection } from '@/components/sections/Stats'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { Chapter } from '@/components/site/Chapter'
import { PageHead } from '@/components/site/PageHead'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { assets } from '@/config/assets'
import { credits, quotes } from '@/content/site'

export const metadata: Metadata = { title: 'Instructor', description: 'Hanne Vik, colourist in Oslo: features, series and commercials since 2009, and the teacher of Night Shift.' }

export default function Instructor() {
  return (
    <>
      <PageHead label="Instructor" title="Hanne Vik" lead="Colourist in Oslo. Features, series and commercials since 2009; Night Shift since 2023." />

      <Chapter n="01" name="About">
        <AboutSection title="Point of view" image={assets.instructor.src} alt={assets.instructor.alt}
          statement="Most people who grade learn alone, from tutorials, and never sit in on a working session. Night Shift is that session."
          bio="Hanne started as an assistant at a post house in 2009 and has graded freelance since 2014: the cold night exteriors of Northern Line, the low sun of The Salt Year, commercials that need skin to look like skin. She started the course in 2023, between jobs, and still grades by day.">
          <div className="mt-10">
            <h3 className="type-utility text-(--color-muted)">Selected credits</h3>
            <Table className="type-body mt-3 tabular-nums">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="type-utility text-(--color-muted)">Year</TableHead>
                  <TableHead className="type-utility text-(--color-muted)">Title</TableHead>
                  <TableHead className="type-utility hidden text-(--color-muted) sm:table-cell">Kind</TableHead>
                  <TableHead className="type-utility text-(--color-muted)">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credits.map((c) => (
                  <TableRow key={c.title} className="hover:bg-(--color-surface)/50">
                    <TableCell className="align-top">{c.year}</TableCell>
                    <TableCell className="whitespace-normal">{c.title}</TableCell>
                    <TableCell className="hidden whitespace-normal text-(--color-muted) sm:table-cell">{c.kind}</TableCell>
                    <TableCell className="whitespace-normal">{c.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </AboutSection>
      </Chapter>

      <Chapter n="02" name="Numbers" grid>
        <StatsSection title="In numbers"
          stats={[{ value: '17', label: 'Years grading' }, { value: '9', label: 'Feature films' }, { value: '24', label: 'Series episodes' }, { value: '68', label: 'Students in six cohorts' }]}
          note="Counted as colourist or assistant colourist. Commercials are not counted; there are too many short ones to be honest about." />
      </Chapter>

      <Chapter n="03" name="References">
        <TestimonialsSection title="From directors and students" quotes={quotes.instructor.map((q) => ({ ...q, ...(q.image ? { image: assets[q.image].src, alt: assets[q.image].alt } : {}) }))} />
      </Chapter>
    </>
  )
}
