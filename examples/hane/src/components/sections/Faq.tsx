'use client'
// OpusKit section — FAQ: real questions in a narrow column; each answer opens in place (shadcn Accordion, keyboard and
// screen-reader friendly). `search`: a search box above the list — pick a match and its answer opens.
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

export function FaqSection({ title, items, search = false }: { title: string; items: { q: string; a: string }[]; search?: boolean }) {
  const [open, setOpen] = useState('')
  const [query, setQuery] = useState('')
  const pick = (q: string) => {
    setOpen(q)
    setQuery('')
    document.getElementById(`faq-${items.findIndex((it) => it.q === q)}`)?.scrollIntoView({ block: 'center' })
  }
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <div className="md:col-span-7 md:col-start-6">
          {search && (
            <Command label="Search the questions" filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)} className="mb-10 h-auto rounded-(--radius-card) border border-(--color-muted) bg-(--color-surface) p-0 has-[input:focus]:border-(--color-text)">
              <CommandInput value={query} onValueChange={setQuery} placeholder="Search the questions, e.g. insurance" className="type-body h-12" />
              {query && (
                <CommandList className="border-t border-(--color-border) p-1">
                  <CommandEmpty className="type-body p-4 text-(--color-muted)">Nothing matches that. Ask us below and we will answer.</CommandEmpty>
                  {items.map((it) => (
                    <CommandItem key={it.q} value={`${it.q} ${it.a}`} onSelect={() => pick(it.q)} className="type-body min-h-11 px-3">{it.q}</CommandItem>
                  ))}
                </CommandList>
              )}
            </Command>
          )}
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-(--color-border)">
            {items.map((it, i) => (
              <AccordionItem key={it.q} value={it.q} id={`faq-${i}`} className="border-b border-(--color-border)">
                <AccordionTrigger className="type-heading rounded-none py-5 [font-size:clamp(1.05rem,1.5vw,1.25rem)] hover:no-underline focus-visible:underline">{it.q}</AccordionTrigger>
                <AccordionContent className="type-body max-w-[62ch] pb-6 text-(--color-muted)">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
