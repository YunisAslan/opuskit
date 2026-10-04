import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqList({ items }: { items: { q: string; a: string; id?: string }[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} id={f.id} className="scroll-mt-28 border-(--color-border)">
          <AccordionTrigger className="type-body">{f.q}</AccordionTrigger>
          <AccordionContent className="max-w-[60ch] pb-5">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
