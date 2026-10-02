'use client'
// OpusKit section — FAQ: real questions in a narrow column; each answer opens in place (shadcn Accordion — keyboard
// and screen-reader friendly; the height animation is dropped under reduced motion).
import type { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqSection({ title, items, id }: { title: ReactNode; items: { q: string; a: string }[]; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">{typeof title === 'string' ? <h2 className="type-heading">{title}</h2> : title}</div>
        <Accordion type="single" collapsible className="border-t border-(--color-border) md:col-span-7 md:col-start-6">
          {items.map((it) => (
            <AccordionItem key={it.q} value={it.q} className="border-b border-(--color-border) not-last:border-b">
              <AccordionTrigger className="type-heading items-center gap-6 [font-size:clamp(1.05rem,1.5vw,1.25rem)]">{it.q}</AccordionTrigger>
              <AccordionContent className="type-body max-w-[62ch] text-(--color-muted) motion-reduce:animate-none">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
