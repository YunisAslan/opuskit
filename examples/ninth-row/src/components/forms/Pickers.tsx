'use client'
// Choice and DatePick — a Select and a Calendar-in-a-Popover on wide screens; on phones (< 640px) both open as a bottom
// sheet with 48 px options, so nothing tiny floats under a thumb.
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { useMedia } from '@/lib/motion'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { fieldClass } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const useSmall = () => useMedia('(max-width: 639px)')

type Option = { value: string; label: string }

export function Choice({ id, label, value, onChange, options, placeholder, empty, invalid, describedBy }: {
  id: string; label: string; value: string | undefined; onChange: (v: string) => void; options: Option[]; placeholder: string; empty?: string; invalid?: boolean; describedBy?: string
}) {
  const small = useSmall()
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value)
  if (small) return (
    <>
      <button id={id} type="button" aria-haspopup="dialog" aria-describedby={describedBy} onClick={() => setOpen(true)} className={cn(fieldClass, 'flex items-center justify-between gap-3 text-left', !current && 'text-(--color-muted)', invalid && 'border-(--color-error)')}>
        <span className="truncate">{current?.label ?? placeholder}</span>
        <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-(--color-muted)" />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="px-(--gutter) pt-6 pb-[max(24px,env(safe-area-inset-bottom,0px))]">
          <SheetTitle>{label}</SheetTitle>
          {options.length === 0 ? <p className="type-body mt-4 text-(--color-muted)">{empty}</p> : (
            <div role="listbox" aria-label={label} className="mt-3 divide-y divide-(--color-border)">
              {options.map((o) => (
                <button key={o.value} type="button" role="option" aria-selected={o.value === value} onClick={() => { onChange(o.value); setOpen(false) }}
                  className={cn('press type-body flex min-h-12 w-full items-center justify-between text-left', o.value === value && 'text-(--color-text)')}>
                  {o.label}{o.value === value && <span aria-hidden className="size-1.5 bg-(--color-accent)" />}
                </button>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
  return (
    <Select items={options} value={value ?? null} onValueChange={(v) => v != null && onChange(String(v))}>
      <SelectTrigger id={id} aria-invalid={invalid} aria-describedby={describedBy}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 ? <p className="type-body px-4 py-3 text-(--color-muted)">{empty}</p> : options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

export function DatePick({ id, label, value, onChange, placeholder, invalid, describedBy }: {
  id: string; label: string; value: Date | undefined; onChange: (d: Date | undefined) => void; placeholder: string; invalid?: boolean; describedBy?: string
}) {
  const small = useSmall()
  const [open, setOpen] = useState(false)
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const text = value ? value.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : placeholder
  const cal = <Calendar mode="single" selected={value} onSelect={(d) => { onChange(d); setOpen(false) }} disabled={{ before: today }} weekStartsOn={1} defaultMonth={value} />
  const trigger = cn(fieldClass, 'flex items-center justify-between gap-3 text-left', !value && 'text-(--color-muted)')
  const inner = <><span className="truncate">{text}</span><CalendarIcon aria-hidden className="size-4 shrink-0 text-(--color-muted)" /></>
  if (small) return (
    <>
      <button id={id} type="button" aria-haspopup="dialog" aria-describedby={describedBy} onClick={() => setOpen(true)} className={cn(trigger, invalid && 'border-(--color-error)')}>{inner}</button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="items-center pt-6 pb-[max(24px,env(safe-area-inset-bottom,0px))]">
          <SheetTitle className="self-start px-(--gutter)">{label}</SheetTitle>
          {cal}
        </SheetContent>
      </Sheet>
    </>
  )
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} aria-invalid={invalid} aria-describedby={describedBy} className={trigger}>{inner}</PopoverTrigger>
      <PopoverContent>{cal}</PopoverContent>
    </Popover>
  )
}
