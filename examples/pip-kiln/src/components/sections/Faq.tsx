// OpusKit section — FAQ: real questions in a narrow column beside the title. The list is the shadcn/ui Accordion
// (type="single" collapsible); this section lays it out. Pip & Kiln: the title in the section size, the list on ink rules.
import { SectionHead } from '@/components/parts/SectionHead'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqSection({ id = 'questions', title, lines, items }: { id?: string; title: string; lines: string[]; items: { q: string; a: string }[] }) {
  return (
    <section id={id} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5"><SectionHead text={title} lines={lines} className="md:sticky md:top-[calc(var(--nav-h)+32px)]" /></div>
        <Accordion type="single" collapsible className="border-t border-(--color-text) md:col-span-6 md:col-start-7">
          {items.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
