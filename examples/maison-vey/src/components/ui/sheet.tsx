'use client'
import * as React from 'react'
import { Dialog as SheetPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Sheet: a slide-in panel on the surface tone, hairline edge, no shadow.
const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-50 bg-(--color-background)/70 data-[state=open]:animate-[vey-fade-in_200ms_ease-out] data-[state=closed]:animate-[vey-fade-out_200ms_ease-out]', className)}
      {...props}
    />
  )
}

const sides = {
  right: 'inset-y-0 right-0 h-full w-full border-l sm:max-w-md data-[state=open]:animate-[vey-slide-in-right_420ms_var(--ease-page)] data-[state=closed]:animate-[vey-slide-out-right_300ms_var(--ease-page)]',
  bottom: 'inset-x-0 bottom-0 max-h-[85svh] border-t data-[state=open]:animate-[vey-slide-in-bottom_380ms_var(--ease-page)] data-[state=closed]:animate-[vey-slide-out-bottom_260ms_var(--ease-page)]',
  top: 'inset-x-0 top-0 h-svh border-b data-[state=open]:animate-[vey-slide-in-top_420ms_var(--ease-page)] data-[state=closed]:animate-[vey-slide-out-top_300ms_var(--ease-page)]',
}

function SheetContent({ className, children, side = 'right', ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn('fixed z-50 flex flex-col overflow-y-auto border-(--color-border) bg-(--color-surface) text-(--color-text) outline-none', sides[side], className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex min-h-(--nav-h) items-center justify-between border-b border-(--color-border) px-(--gutter)', className)} {...props} />
}
function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-3 border-t border-(--color-border) p-(--gutter)', className)} {...props} />
}
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn('type-utility', className)} {...props} />
}
function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn('type-caption text-(--color-muted)', className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
