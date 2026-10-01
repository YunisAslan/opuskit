'use client'
// FAQ page: the question list with a search field that narrows it as you type.
import { useId, useState } from 'react'
import { FaqSection } from '@/components/sections/Faq'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { faqAll } from '@/content/site'

export function FaqSearch() {
  const [q, setQ] = useState('')
  const id = useId()
  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  const items = faqAll.filter((f) => words.every((w) => `${f.q} ${f.a}`.toLowerCase().includes(w)))
  return (
    <FaqSection lead label="// 01 Answers" title="Questions, answered plainly" items={items}
      aside={
        <div className="mt-10 max-w-sm">
          <Label htmlFor={id} className="type-utility text-(--color-muted)">Search the answers</Label>
          <Input id={id} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="VAT, bank, cancel" className="mt-2" />
          <p className="type-utility mt-2 tabular-nums text-(--color-muted)" aria-live="polite">{items.length} of {faqAll.length} questions</p>
        </div>
      } />
  )
}
