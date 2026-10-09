'use client'
// The date picker: a Calendar in a Popover from 640px up, a Calendar in a bottom sheet on phones. Only Saturdays from
// next week on can be picked — the workshops run on Saturdays.
import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { usePhone } from '@/lib/use-media'
import { cn } from '@/lib/utils'

const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
export const formatDay = (d: Date) => fmt.format(d)

export function DateField({ id, label, value, onChange, placeholder, invalid, ...aria }: { id?: string; label: string; value?: Date; onChange: (d?: Date) => void; placeholder: string; invalid?: boolean; 'aria-describedby'?: string }) {
  const phone = usePhone()
  const [open, setOpen] = useState(false)
  const [first] = useState(() => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3); return d })
  const trigger = cn('type-body flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-5 text-left [font-size:max(16px,var(--type-body-size))] focus:border-(--color-text) aria-invalid:border-(--color-error)', !value && 'text-(--color-muted)')
  const cal = (
    <Calendar mode="single" selected={value} weekStartsOn={1} startMonth={first}
      disabled={[{ before: first }, { dayOfWeek: [0, 1, 2, 3, 4, 5] }]}
      onSelect={(d) => { onChange(d); setOpen(false) }} />
  )
  const inner = <><span className="truncate">{value ? formatDay(value) : placeholder}</span><CalendarDays className="size-5 shrink-0" /></>
  if (phone) return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id={id} aria-invalid={invalid || undefined} className={trigger} {...aria}>{inner}</SheetTrigger>
      <SheetContent side="bottom" aria-describedby={undefined} className="px-(--gutter) pt-6">
        <SheetTitle className="t-card mb-4">{label}</SheetTitle>{cal}
      </SheetContent>
    </Sheet>
  )
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} aria-invalid={invalid || undefined} className={trigger} {...aria}>{inner}</PopoverTrigger>
      <PopoverContent className="w-[22rem]">{cal}</PopoverContent>
    </Popover>
  )
}
