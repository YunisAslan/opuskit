'use client'
// shadcn/ui Select — on wider screens a popover that grows out of its trigger (scale 0.95 + opacity, --duration-menu);
// under 640px the same choice opens as a bottom Sheet (recipe/ui.md). A highlighted option only changes its ground.
import { Select as SelectPrimitive } from 'radix-ui'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useState, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { fieldClass } from './input'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './sheet'

const triggerClass = cn(fieldClass, 'data-[invalid]:border-(--color-error) press flex h-12 cursor-pointer items-center justify-between gap-3 text-left active:scale-[0.99] data-[placeholder]:text-(--color-muted)')

function usePhone() {
  const [phone, setPhone] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const on = () => setPhone(mq.matches)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return phone
}

type Props = {
  id?: string; value?: string; onValueChange: (v: string) => void; options: string[]; placeholder: string; label: string
  invalid?: boolean; name?: string; describedBy?: string
}

/** One select for every screen: Radix Select on desktop, a bottom Sheet of choices on phones. */
export function ResponsiveSelect({ id, value, onValueChange, options, placeholder, label, invalid, name, describedBy }: Props) {
  const phone = usePhone()
  const [open, setOpen] = useState(false)
  if (phone) return (
    <>
      <button type="button" id={id} name={name} aria-haspopup="dialog" data-invalid={invalid || undefined} aria-describedby={describedBy} data-placeholder={value ? undefined : ''} onClick={() => setOpen(true)} className={triggerClass}>
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="size-4 shrink-0 text-(--color-muted)" aria-hidden />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetTitle>{label}</SheetTitle>
          <SheetDescription className="sr-only">Choose one</SheetDescription>
          <ul className="mt-3 divide-y divide-(--color-border)">
            {options.map((o) => (
              <li key={o}>
                <button type="button" aria-pressed={o === value} onClick={() => { onValueChange(o); setOpen(false) }} className="type-body press flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left focus-visible:bg-(--color-secondary)">
                  {o}{o === value && <Check className="size-4" aria-hidden />}
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  )
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} name={name}>
      <SelectPrimitive.Trigger id={id} aria-invalid={invalid || undefined} aria-describedby={describedBy} className={triggerClass}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon><ChevronDown className="size-4 text-(--color-muted)" aria-hidden /></SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" sideOffset={6} className="anim-pop z-[130] max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-1 text-(--color-text)">
          <SelectPrimitive.Viewport>
            {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cn('type-body relative flex min-h-11 cursor-pointer select-none items-center rounded-(--radius-button) py-2 pl-3 pr-9 outline-none data-[highlighted]:bg-(--color-secondary)', className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3"><Check className="size-4" aria-hidden /></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
