'use client'
// Select and date picker that open as a bottom sheet under 640px (recipe/ui.md), and as a Select / Popover above.
import { format } from 'date-fns'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { useMedia } from '@/lib/use-media'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const useSmallScreen = () => useMedia('(max-width: 639px)')

const trigger = 'type-body flex h-11 w-full items-center justify-between gap-2 border-2 border-input bg-surface px-3 text-left outline-none focus-visible:border-ring aria-invalid:border-destructive data-[state=open]:border-ring'

type Choice = { id: string; value?: string; onChange: (v: string) => void; options: string[]; placeholder: string; label: string; invalid?: boolean }

export function ChoiceField({ id, value, onChange, options, placeholder, label, invalid }: Choice) {
  const small = useSmallScreen()
  const [open, setOpen] = useState(false)
  if (!small) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} aria-invalid={invalid} className="w-full"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent position="popper">{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    )
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id={id} aria-invalid={invalid} className={trigger}>
        <span className={value ? '' : 'text-muted-foreground'}>{value ?? placeholder}</span><ChevronDownIcon className="size-4" aria-hidden />
      </SheetTrigger>
      <SheetContent side="bottom" className="border-t-2 border-(--color-text) bg-(--color-surface) pb-[max(env(safe-area-inset-bottom),24px)]">
        <SheetHeader><SheetTitle className="type-heading">{label}</SheetTitle><SheetDescription className="sr-only">Choose one</SheetDescription></SheetHeader>
        <ul role="listbox" aria-label={label} className="grid px-4">
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button type="button" onClick={() => { onChange(o); setOpen(false) }} className="type-body flex min-h-12 w-full items-center border-b-2 border-(--color-border) px-2 text-left aria-selected:bg-(--color-secondary) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)" aria-pressed={o === value}>{o}</button>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export function DateField({ id, value, onChange, label, invalid }: { id: string; value?: Date; onChange: (d?: Date) => void; label: string; invalid?: boolean }) {
  const small = useSmallScreen()
  const [open, setOpen] = useState(false)
  const shown = <><span className={value ? '' : 'text-muted-foreground'}>{value ? format(value, 'd MMMM yyyy') : 'Pick a date'}</span><CalendarIcon className="size-4" aria-hidden /></>
  const cal = <Calendar mode="single" selected={value} onSelect={(d) => { onChange(d); setOpen(false) }} disabled={{ before: new Date() }} autoFocus />
  if (!small) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} aria-invalid={invalid} className={trigger}>{shown}</PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">{cal}</PopoverContent>
      </Popover>
    )
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id={id} aria-invalid={invalid} className={trigger}>{shown}</SheetTrigger>
      <SheetContent side="bottom" className="items-center border-t-2 border-(--color-text) bg-(--color-surface) pb-[max(env(safe-area-inset-bottom),24px)]">
        <SheetHeader className="w-full"><SheetTitle className="type-heading">{label}</SheetTitle><SheetDescription className="sr-only">Pick a date</SheetDescription></SheetHeader>
        {cal}
      </SheetContent>
    </Sheet>
  )
}
