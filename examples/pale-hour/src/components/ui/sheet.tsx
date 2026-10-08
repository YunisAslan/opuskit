'use client'
// shadcn/ui Sheet (Radix Dialog), restyled: a flat panel on the ground, hairline edge, no shadow, no rounding.
import { Dialog as SheetPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close

export function SheetContent({ className, children, side = 'right', ...props }: ComponentProps<typeof SheetPrimitive.Content> & { side?: 'left' | 'right' }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-[100] bg-(--color-text)/40 data-[state=open]:animate-[fade-in_300ms_var(--ease-page)] data-[state=closed]:animate-[fade-out_200ms_var(--ease-page)]" />
      <SheetPrimitive.Content
        className={cn(
          'fixed inset-y-0 z-[101] flex w-full max-w-[min(100vw,30rem)] flex-col overflow-y-auto bg-(--color-background) text-(--color-text) outline-none',
          side === 'left'
            ? 'left-0 border-r border-(--color-border) data-[state=open]:animate-[sheet-in-left_500ms_var(--ease-page)] data-[state=closed]:animate-[sheet-out-left_300ms_var(--ease-page)]'
            : 'right-0 border-l border-(--color-border) data-[state=open]:animate-[sheet-in-right_500ms_var(--ease-page)] data-[state=closed]:animate-[sheet-out-right_300ms_var(--ease-page)]',
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title className={cn('type-heading', className)} {...props} />
}
export function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description className={cn('type-body text-(--color-muted)', className)} {...props} />
}
