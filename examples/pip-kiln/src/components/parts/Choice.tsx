'use client'
// One select for the whole site: the shadcn Select from 640px up; on phones the same trigger opens a bottom sheet
// with the options as big radio rows (thumb-reachable, no tiny native list).
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { usePhone } from '@/lib/use-media'
import { cn } from '@/lib/utils'

type Opt = { value: string; label: string }
type Props = { id?: string; label: string; value?: string; onChange: (v: string) => void; options: Opt[]; placeholder: string; invalid?: boolean; className?: string; 'aria-describedby'?: string }

export function Choice({ id, label, value, onChange, options, placeholder, invalid, className, ...aria }: Props) {
  const phone = usePhone()
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value)
  if (!phone) return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={invalid || undefined} className={className} {...aria}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
    </Select>
  )
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id={id} aria-invalid={invalid || undefined} {...aria}
        className={cn('type-body flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-5 text-left [font-size:max(16px,var(--type-body-size))] focus:border-(--color-text) aria-invalid:border-(--color-error)', !current && 'text-(--color-muted)', className)}>
        <span className="truncate">{current?.label ?? placeholder}</span><ChevronDown className="size-5 shrink-0" />
      </SheetTrigger>
      <SheetContent side="bottom" aria-describedby={undefined} className="px-(--gutter) pt-6">
        <SheetTitle className="t-card mb-4">{label}</SheetTitle>
        <RadioGroup value={value} onValueChange={(v) => { onChange(v); setOpen(false) }} className="gap-0">
          {options.map((o) => (
            <label key={o.value} className="type-body flex min-h-14 items-center gap-4 border-b border-(--color-text)/20">
              <RadioGroupItem value={o.value} />{o.label}
            </label>
          ))}
        </RadioGroup>
      </SheetContent>
    </Sheet>
  )
}
