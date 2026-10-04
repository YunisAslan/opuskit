import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Faq } from '@/content/site'

export const faqTrigger = 'type-body min-h-11 py-5 text-[1.0625rem] font-semibold hover:no-underline hover:text-(--color-muted)'
export const faqContent = 'type-body max-w-[60ch] pb-6 text-(--color-muted)'

// The FAQ list: shadcn Accordion, one answer open at a time.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className={faqTrigger}>{f.q}</AccordionTrigger>
          <AccordionContent className={faqContent}>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
