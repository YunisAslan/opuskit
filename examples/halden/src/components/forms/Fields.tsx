'use client'
// Form fields in the recipe: shadcn/ui underneath, 48 px tall, a muted outline that turns to the text colour on focus,
// no rings. Pickers follow the UI rules: a Select / a Calendar in a Popover from 640 px up, and the same choice in a
// bottom Sheet on phones, where a thumb can reach it.
import dynamic from 'next/dynamic'
import { forwardRef, useState, type ComponentProps } from 'react'
import type { Calendar as CalendarType } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useMedia } from '@/lib/motion'

// The calendar (react-day-picker) loads the first time a day picker opens, not with the page.
const Calendar = dynamic(() => import('@/components/ui/calendar').then((m) => m.Calendar), {
  ssr: false,
  loading: () => <div className="h-[356px] w-[332px] max-w-full" aria-busy />,
})
const dayLabel = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

export const field = 'type-body h-12 w-full rounded-none border border-(--color-muted) bg-transparent px-4 text-(--color-text) shadow-none outline-none transition-colors duration-150 placeholder:text-(--color-muted) focus-visible:border-(--color-text) aria-invalid:border-(--color-accent) md:text-base'

const useWide = () => useMedia('(min-width: 640px)', true)

/** A trigger that looks like the other fields — for the phone pickers. */
const FieldButton = forwardRef<HTMLButtonElement, ComponentProps<'button'> & { empty: boolean }>(function FieldButton({ empty, className, children, ...props }, ref) {
  return (
    <button ref={ref} type="button" className={cn(field, 'flex items-center justify-between text-left', empty && 'text-(--color-muted)', className)} {...props}>
      <span className="truncate">{children}</span>
      <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-(--color-muted)"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
  )
})

function SheetPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <SheetContent side="bottom" showCloseButton={false} className="max-h-[85svh] gap-0 border-t border-(--color-border) bg-(--color-background) px-(--gutter) pt-6 pb-[max(24px,env(safe-area-inset-bottom))] text-(--color-text) shadow-none">
      <SheetTitle className="type-utility font-(family-name:--font-utility) text-(--color-muted)">{title}</SheetTitle>
      <SheetDescription className="sr-only">Choose one</SheetDescription>
      <div className="mt-4 overflow-y-auto">{children}</div>
    </SheetContent>
  )
}

export function ChoiceField({ value, onChange, options, placeholder, title, invalid, id, describedBy }: {
  value?: string; onChange: (v: string) => void; options: readonly string[]; placeholder: string; title: string; invalid?: boolean; id?: string; describedBy?: string
}) {
  const wide = useWide()
  const [open, setOpen] = useState(false)
  if (wide) return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={invalid} aria-describedby={describedBy} className={cn(field, 'w-full data-[size=default]:h-12 data-placeholder:text-(--color-muted) [&_svg]:text-(--color-muted)')}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="rounded-none border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-none">
        {options.map((o) => <SelectItem key={o} value={o} className="type-body min-h-11 rounded-none px-4 py-2 focus:bg-(--color-secondary) focus:text-(--color-text)">{o}</SelectItem>)}
      </SelectContent>
    </Select>
  )
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <FieldButton id={id} empty={!value} aria-invalid={invalid} aria-describedby={describedBy}>{value || placeholder}</FieldButton>
      </SheetTrigger>
      <SheetPanel title={title}>
        <ul role="listbox" aria-label={title}>
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button type="button" onClick={() => { onChange(o); setOpen(false) }} className={cn('type-body flex min-h-12 w-full items-center border-b border-(--color-border) text-left focus-visible:bg-(--color-secondary)', o === value && 'text-(--color-text) underline underline-offset-4')}>{o}</button>
            </li>
          ))}
        </ul>
      </SheetPanel>
    </Sheet>
  )
}

export function DateField({ value, onChange, placeholder, title, invalid, id, describedBy, disabled }: {
  value?: Date; onChange: (d?: Date) => void; placeholder: string; title: string; invalid?: boolean; id?: string; describedBy?: string
  disabled?: ComponentProps<typeof CalendarType>['disabled']
}) {
  const wide = useWide()
  const [open, setOpen] = useState(false)
  const label = value ? dayLabel(value) : placeholder
  const calendar = (
    <Calendar
      mode="single"
      selected={value}
      onSelect={(d) => { onChange(d); setOpen(false) }}
      disabled={disabled}
      weekStartsOn={1}
      className="bg-transparent p-3 [--cell-size:--spacing(11)]"
    />
  )
  const trigger = <FieldButton id={id} empty={!value} aria-invalid={invalid} aria-describedby={describedBy}>{label}</FieldButton>
  if (wide) return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto rounded-none border border-(--color-border) bg-(--color-surface) p-0 text-(--color-text) shadow-none">{calendar}</PopoverContent>
    </Popover>
  )
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetPanel title={title}><div className="flex justify-center">{calendar}</div></SheetPanel>
    </Sheet>
  )
}
