import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map(({ q, a }) => (
        <AccordionItem key={q} value={q} className="border-(--color-border)">
          <AccordionTrigger className="type-body min-h-16 items-center rounded-none py-5 font-medium hover:no-underline focus-visible:underline">{q}</AccordionTrigger>
          <AccordionContent className="type-body max-w-[60ch] pb-6 text-(--color-muted)">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
