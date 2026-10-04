'use client'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import type { Faq } from '@/content/site'
import { faqContent, faqTrigger } from './FaqList'

// FAQ page: a search box (shadcn Command) over every question; picking one opens it in the list below.
export function FaqExplorer({ groups }: { groups: { title: string; items: Faq[] }[] }) {
  const [open, setOpen] = useState('')
  const [query, setQuery] = useState('')
  const pick = (q: string) => {
    setOpen(q); setQuery('')
    requestAnimationFrame(() => document.getElementById(`faq-${groups.flatMap((g) => g.items).findIndex((f) => f.q === q)}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
  }
  let n = -1
  return (
    <div>
      <Command className="rounded-(--radius-card) border border-(--color-border) bg-transparent" loop filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)}>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search the questions: software, refund, time…" className="h-12 text-base" />
        {query && (
          <CommandList className="max-h-72">
            <CommandEmpty className="type-body px-4 py-6 text-(--color-muted)">No question matches. Write to me instead.</CommandEmpty>
            {groups.map((g) => (
              <CommandGroup key={g.title} heading={g.title}>
                {g.items.map((f) => <CommandItem key={f.q} value={`${f.q} ${f.a}`} onSelect={() => pick(f.q)} className="min-h-11">{f.q}</CommandItem>)}
              </CommandGroup>
            ))}
          </CommandList>
        )}
      </Command>
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="mt-10">
        {groups.map((g) => (
          <div key={g.title} className="mt-10 first:mt-0">
            <h3 className="type-utility border-b border-(--color-border) pb-3 text-(--color-muted)">{g.title}</h3>
            {g.items.map((f) => { n++; return (
              <AccordionItem key={f.q} value={f.q} id={`faq-${n}`} className="border-b">
                <AccordionTrigger className={faqTrigger}>{f.q}</AccordionTrigger>
                <AccordionContent className={faqContent}>{f.a}</AccordionContent>
              </AccordionItem>
            ) })}
          </div>
        ))}
      </Accordion>
    </div>
  )
}
