'use client'
// shadcn/ui Select, restyled — and on phones (< 640px) the same choice opens as a bottom sheet of large rows, as the
// recipe asks. The popover grows out of its trigger (Radix transform origin), 200ms on --ease-out, leaving the same way.
import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { fieldClass } from './input'
import { Sheet, SheetContent, SheetTitle } from './sheet'
import { useMediaQuery } from '@/hooks/use-media-query'

export type Option = { value: string; label: string; detail?: string }

const Chevron = () => (
  <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M3.5 6 8 10.5 12.5 6" />
  </svg>
)

type Props = {
  id?: string
  value?: string
  onValueChange: (v: string) => void
  options: Option[]
  placeholder: string
  label: string
  invalid?: boolean
  describedBy?: string
}

export function Select({ id, value, onValueChange, options, placeholder, label, invalid, describedBy }: Props) {
  const phone = useMediaQuery('(max-width: 639px)')
  const [open, setOpen] = React.useState(false)
  const current = options.find((o) => o.value === value)
  const trigger = cn(fieldClass, 'data-[invalid]:border-(--color-error) press flex min-h-12 items-center justify-between gap-3 text-left active:scale-[0.99]')

  if (phone)
    return (
      <>
        <button
          id={id}
          type="button"
          aria-haspopup="dialog"
          data-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onClick={() => setOpen(true)}
          className={trigger}
        >
          <span className={cn('min-w-0 truncate', !current && 'text-(--color-muted)')}>{current?.label ?? placeholder}</span>
          <Chevron />
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" aria-describedby={undefined}>
            <SheetTitle className="px-(--gutter) pt-6 pb-3">{label}</SheetTitle>
            <div role="radiogroup" aria-label={label} className="border-t border-(--color-border)">
              {options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={o.value === value}
                  onClick={() => {
                    onValueChange(o.value)
                    setOpen(false)
                  }}
                  className="flex min-h-14 w-full items-center justify-between gap-4 border-b border-(--color-border) px-(--gutter) py-3 text-left transition-colors duration-150 active:bg-(--color-surface) aria-checked:bg-(--color-surface)"
                >
                  <span className="min-w-0">
                    <span className="type-body block">{o.label}</span>
                    {o.detail && <span className="type-caption block text-(--color-muted)">{o.detail}</span>}
                  </span>
                  <span aria-hidden className={cn('size-3 shrink-0 border border-(--color-text)', o.value === value && 'bg-(--color-text)')} />
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </>
    )

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger id={id} aria-invalid={invalid || undefined} aria-describedby={describedBy} className={cn(trigger, 'data-[placeholder]:text-(--color-muted)')}>
        <span className="min-w-0 truncate"><SelectPrimitive.Value placeholder={placeholder} /></span>
        <SelectPrimitive.Icon asChild><Chevron /></SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-[60] max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-hidden border border-(--color-text) bg-(--color-background) text-(--color-text) data-[state=open]:animate-[pop-in_var(--duration-menu)_var(--ease-out)] data-[state=closed]:animate-[pop-out_160ms_var(--ease-out)] reduced:data-[state=open]:animate-[fade-in_150ms_ease-out]"
        >
          <SelectPrimitive.Viewport>
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="flex min-h-12 cursor-pointer select-none flex-col justify-center border-b border-(--color-border) px-4 py-2.5 outline-none last:border-b-0 data-[highlighted]:bg-(--color-surface) data-[state=checked]:bg-(--color-secondary)"
              >
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                {o.detail && <span className="type-caption text-(--color-muted)">{o.detail}</span>}
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
