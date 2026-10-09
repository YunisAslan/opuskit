// FAQ — real questions in a narrow column beside the title. The list is the project's shadcn Accordion (one answer
// open at a time), styled through the tokens; hovering a question dims the others.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqSection({ id, title, items }: { id?: string; title: string; items: { q: string; a: string }[] }) {
  return (
    <section id={id} className="scroll-mt-16 px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:gap-6">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <div className="group/faq border-t border-(--color-border) md:col-span-7 md:col-start-6">
          <Accordion>
            {items.map((it) => (
              <AccordionItem key={it.q} value={it.q}>
                <AccordionTrigger>{it.q}</AccordionTrigger>
                <AccordionContent>{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
