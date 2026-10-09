'use client'
import * as React from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) { return <SelectPrimitive.Root data-slot="select" {...props} /> }
function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) { return <SelectPrimitive.Value data-slot="select-value" {...props} /> }

// A pill field; focus darkens its border, nothing glows.
function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger data-slot="select-trigger"
      className={cn('type-body flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-5 text-left [font-size:max(16px,var(--type-body-size))] focus:border-(--color-text) focus-visible:shadow-[inset_0_0_0_1px_var(--color-text)] aria-invalid:border-(--color-error) data-[placeholder]:text-(--color-muted) [&>span]:truncate', className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><ChevronDown className="size-5 shrink-0" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

// Opens out of its trigger: scale 0.95 + fade, --duration-menu, --ease-out.
function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content data-slot="select-content" position={position} sideOffset={8}
        className={cn('pop relative z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-hidden rounded-(--radius-card) border border-(--color-text) bg-(--color-surface) text-(--color-text)', className)} {...props}>
        <SelectPrimitive.Viewport className="p-2">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

// A highlighted option only changes its background.
function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item data-slot="select-item"
      className={cn('type-body relative flex min-h-11 cursor-pointer select-none items-center rounded-(--radius-button) py-2 pl-4 pr-10 outline-none data-[highlighted]:bg-(--color-secondary) data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50', className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-4 grid size-4 place-items-center"><SelectPrimitive.ItemIndicator><Check className="size-4" strokeWidth={3} /></SelectPrimitive.ItemIndicator></span>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }
