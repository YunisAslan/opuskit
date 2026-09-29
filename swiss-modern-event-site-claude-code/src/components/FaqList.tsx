"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

export type Faq = { id: string; q: string; a: string }

// Search box (Command) jumps straight to a question; the accordion keeps the list scannable.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string>("")
  const [query, setQuery] = useState("")

  const pick = (id: string) => {
    setOpen(id)
    setQuery("")
    requestAnimationFrame(() => document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }))
  }

  return (
    <>
      <Command className="border border-input bg-background p-0" shouldFilter>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search questions, e.g. dress, parking, children" className="type-body h-12" />
        {/* Always mounted: the input's aria-controls must point at a real list. */}
        <CommandList className={query ? "border-t border-border" : "hidden"}>
          <CommandEmpty className="p-4 text-muted">No question matches. Write to us from the Contact page.</CommandEmpty>
          {faqs.map((f) => (
            <CommandItem key={f.id} value={`${f.q} ${f.a}`} onSelect={() => pick(f.id)} className="type-body px-4 py-3">
              {f.q}
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      <h2 className="sr-only">Questions</h2>
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="mt-12 border-t border-text">
        {faqs.map((f) => (
          <AccordionItem key={f.id} value={f.id} id={`faq-${f.id}`} className="border-b border-border">
            <AccordionTrigger className="type-heading min-h-16 items-center py-6 hover:no-underline focus-visible:underline [&_[data-slot=accordion-trigger-icon]]:size-6">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="type-body max-w-[36rem] pb-8 text-muted">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
