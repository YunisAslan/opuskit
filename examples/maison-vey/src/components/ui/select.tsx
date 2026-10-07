'use client'
import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetDescription } from './sheet'

// shadcn/ui Select, restyled: a field with a muted outline; options change their ground when highlighted.
// Under 640px the same choice opens as a bottom sheet (ResponsiveSelect), per the recipe.
const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

const field = 'type-body flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-4 text-left text-(--color-text) transition-colors duration-150 focus:border-(--color-text) aria-invalid:border-(--color-accent) data-invalid:border-(--color-accent) data-[placeholder]:text-(--color-muted)'
const Chevron = () => <svg aria-hidden viewBox="0 0 12 12" className="size-3 shrink-0 text-(--color-muted)"><path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger data-slot="select-trigger" className={cn(field, className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><Chevron /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={4}
        className={cn('z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-y-auto border border-(--color-muted) bg-(--color-surface) text-(--color-text) data-[state=open]:animate-[vey-fade-in_150ms_ease-out]', className)}
        {...props}
      >
        <SelectPrimitive.Viewport className="py-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn('type-body flex min-h-11 cursor-pointer select-none items-center justify-between gap-4 px-4 outline-none data-[highlighted]:bg-(--color-secondary) data-[state=checked]:text-(--color-text)', className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator><span aria-hidden className="block size-1.5 bg-(--color-text)" /></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

type Option = { value: string; label: string }

/** A Select on wide screens; a bottom sheet with the same options under 640px. */
function ResponsiveSelect({ id, label, value, onValueChange, options, placeholder, invalid, className }: {
  id?: string; label: string; value?: string; onValueChange: (v: string) => void; options: Option[]; placeholder?: string; invalid?: boolean; className?: string
}) {
  const wide = useMediaQuery('(min-width: 640px)')
  const [open, setOpen] = React.useState(false)
  const current = options.find((o) => o.value === value)
  if (wide) return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} aria-invalid={invalid || undefined} className={className}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
    </Select>
  )
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button id={id} type="button" aria-haspopup="dialog" data-invalid={invalid || undefined} onClick={() => setOpen(true)} data-placeholder={current ? undefined : ''} className={cn(field, className)}>
        <span className="truncate">{current?.label ?? placeholder}</span><Chevron />
      </button>
      <SheetContent side="bottom" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{label}</SheetTitle>
          <SheetClose className="type-caption link-quiet min-h-11">Close</SheetClose>
        </SheetHeader>
        <SheetDescription className="sr-only">Choose one option</SheetDescription>
        <ul role="listbox" aria-label={label} className="pb-6">
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button type="button" onClick={() => { onValueChange(o.value); setOpen(false) }} className="type-body flex min-h-12 w-full items-center justify-between px-(--gutter) text-left focus-visible:bg-(--color-secondary) active:bg-(--color-secondary)">
                {o.label}{o.value === value && <span aria-hidden className="block size-1.5 bg-(--color-text)" />}
              </button>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, ResponsiveSelect }
