'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Faq } from '@/content/site'
import type { ReactNode } from 'react'

export function FaqList({ items, render }: { items: Faq[]; render?: (text: string) => ReactNode }) {
  return (
    <Accordion type="single" collapsible className="border-t border-(--color-border)">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger>{render ? render(f.q) : f.q}</AccordionTrigger>
          <AccordionContent>{render ? render(f.a) : f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
