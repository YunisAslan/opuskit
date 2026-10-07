'use client'
// FAQ — real questions in a narrow column beside the title, made Halden's own. The list is the project's shadcn/ui
// Accordion (single, collapsible), restyled to the tokens: hairlines, the question in the title step, the answer in
// body type. On the FAQ page a search box (shadcn Command) sits above it: pick a question and it opens and scrolls in.
import { useEffect, useState } from 'react'
import { Lines, Reveal } from '@/components/motion/Reveal'
import { Opening, PageIntro, type Intro } from '@/components/sections/PageIntro'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

type Item = { id?: string; q: string; a: string }
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)

export function FaqSection({ tone, title, items, intro, search }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; items: readonly Item[]; intro?: Intro; search?: { placeholder: string; empty: string }
}) {
  const [open, setOpen] = useState('')
  const [query, setQuery] = useState('')
  const key = (it: Item) => it.id ?? slug(it.q)
  // Arriving on /faq#faq-privacy (the footer's legal links) opens that answer.
  useEffect(() => {
    const apply = () => {
      const k = decodeURIComponent(location.hash.replace(/^#faq-/, ''))
      if (k && items.some((it) => (it.id ?? slug(it.q)) === k)) setOpen(k)
    }
    const frame = requestAnimationFrame(apply)
    window.addEventListener('hashchange', apply)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', apply) }
  }, [items])
  const pick = (k: string) => {
    setOpen(k)
    setQuery('')
    requestAnimationFrame(() => document.getElementById(`faq-${k}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <Opening on={!!intro}>
      <div className="mx-auto max-w-(--container)">
        {intro && <PageIntro intro={intro} />}
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          {intro ? <h2 className="sr-only">{title}</h2> : <Lines lines={[title]} className="type-heading md:col-span-4" />}
          <Reveal delay={0.3} className={`md:col-span-7 ${intro ? 'md:col-start-1' : 'md:col-start-6'}`}>
            {search && (
              <Command shouldFilter filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)} className="mb-12 h-auto overflow-visible rounded-none bg-transparent p-0 text-(--color-text)">
                <CommandInput value={query} onValueChange={setQuery} placeholder={search.placeholder} className="type-body h-12" />
                {/* Always mounted, so the input's aria-controls points at a real list; hidden until there is a query. */}
                <CommandList hidden={!query} className="border border-t-0 border-(--color-border) bg-(--color-surface)">
                  <CommandEmpty className="type-body px-4 py-4 text-(--color-muted)">{search.empty}</CommandEmpty>
                  <CommandGroup className="p-0">
                    {items.map((it) => (
                      <CommandItem key={key(it)} value={`${it.q} ${it.a}`} onSelect={() => pick(key(it))} className="type-body min-h-11 rounded-none px-4 py-3 data-[selected=true]:bg-(--color-secondary)">{it.q}</CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
            <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-(--color-border)">
              {items.map((it) => (
                <AccordionItem key={key(it)} value={key(it)} id={`faq-${key(it)}`} className="scroll-mt-32 border-b border-(--color-border)">
                  <AccordionTrigger className="type-title min-h-11 items-center rounded-none py-6 text-left hover:no-underline focus-visible:underline focus-visible:underline-offset-4 [&>svg]:size-5 [&>svg]:text-(--color-muted)">{it.q}</AccordionTrigger>
                  <AccordionContent className="type-body max-w-[60ch] pb-8 text-(--color-muted)">{it.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
      </Opening>
    </section>
  )
}
