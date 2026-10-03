'use client'
// The FAQ lists: the project's shadcn Accordion (one answer open at a time) inside the ready FaqSection. The FAQ page
// adds a search box (shadcn Command) that jumps to and opens the matching answer.
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import type { Faq } from '@/content/site'
import { scrollToY } from '@/lib/motion'

export function FaqAccordion({ items, value, onValueChange }: { items: Faq[]; value?: string; onValueChange?: (v: string) => void }) {
  return (
    <Accordion type="single" collapsible value={value} onValueChange={onValueChange}>
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id} id={`q-${f.id}`} className="scroll-mt-28 border-b border-(--color-border)">
          <AccordionTrigger className="type-heading min-h-11 py-5 [font-size:clamp(1.15rem,1.6vw,1.375rem)] hover:no-underline hover:text-(--color-muted) focus-visible:underline">{f.q}</AccordionTrigger>
          <AccordionContent className="type-body max-w-[60ch] pb-6 text-(--color-muted)">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function FaqExplorer({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState('')
  const [query, setQuery] = useState('')
  const pick = (id: string) => {
    setOpen(id)
    setQuery('')
    const el = document.getElementById(`q-${id}`)
    if (el) scrollToY(el.getBoundingClientRect().top + scrollY - 120)
  }
  return (
    <>
      <Command className="mb-8 h-auto border border-(--color-muted) bg-transparent p-0 focus-within:border-(--color-text)" label="Search the questions">
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search: shuttle, cold, children…" className="type-body h-11" />
        {query && (
          <CommandList className="border-t border-(--color-border)">
            <CommandEmpty className="type-body px-3 py-4 text-(--color-muted)">Nothing yet. Write to us below and we’ll answer.</CommandEmpty>
            <CommandGroup>
              {items.map((f) => (
                <CommandItem key={f.id} value={`${f.q} ${f.a}`} onSelect={() => pick(f.id)} className="type-body min-h-11 px-3">{f.q}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
      <FaqAccordion items={items} value={open} onValueChange={setOpen} />
    </>
  )
}
