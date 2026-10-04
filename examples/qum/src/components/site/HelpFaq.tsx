'use client'
import { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type Q = { q: string; a: string; id?: string }

// Help: a search box over every question (picking one opens it), then the full list.
export function HelpFaq({ items }: { items: Q[] }) {
  const [open, setOpen] = useState('')
  const [query, setQuery] = useState('')
  useEffect(() => {
    const fromHash = () => { const hit = items.find((i) => i.id && `#${i.id}` === location.hash); if (hit) setOpen(hit.q) }
    fromHash(); addEventListener('hashchange', fromHash)
    return () => removeEventListener('hashchange', fromHash)
  }, [items])
  const pick = (q: Q) => { setOpen(q.q); setQuery(''); requestAnimationFrame(() => document.getElementById(`q-${items.indexOf(q)}`)?.scrollIntoView({ block: 'center' })) }
  return (
    <>
      <Command className="mb-8 h-auto overflow-visible bg-transparent p-0" label="Search the questions" filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)}>
        <CommandInput placeholder="Search: delivery, saffron, returns…" value={query} onValueChange={setQuery} aria-label="Search the questions" />
        {query && (
          <CommandList className="mt-2 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-1">
            <CommandEmpty className="type-utility py-4 text-center text-(--color-muted)">Nothing yet. Write to us at hello@qum.az.</CommandEmpty>
            {items.map((q) => <CommandItem key={q.q} value={`${q.q} ${q.a}`} onSelect={() => pick(q)} className="type-utility min-h-10 px-3">{q.q}</CommandItem>)}
          </CommandList>
        )}
      </Command>
      <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={f.q} id={f.id} className="scroll-mt-28 border-(--color-border)">
            <span id={`q-${i}`} className="sr-only" />
            <AccordionTrigger className="type-body">{f.q}</AccordionTrigger>
            <AccordionContent className="max-w-[60ch] pb-5">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
