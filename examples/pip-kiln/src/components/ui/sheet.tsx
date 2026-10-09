'use client'
import * as React from 'react'
import { Dialog as SheetPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) { return <SheetPrimitive.Root data-slot="sheet" {...props} /> }
function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) { return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} /> }
function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) { return <SheetPrimitive.Close data-slot="sheet-close" {...props} /> }

const sides = {
  right: 'sheet-right inset-y-0 right-0 h-dvh w-full sm:w-[min(30rem,100%)] sm:rounded-l-(--radius-card) pb-[env(safe-area-inset-bottom,0px)]',
  bottom: 'sheet-bottom inset-x-0 bottom-0 max-h-[85dvh] rounded-t-(--radius-card) pb-[calc(16px+env(safe-area-inset-bottom,0px))]',
  top: 'sheet-top inset-0 h-dvh pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]',
}

// Slides on --ease-drawer (--duration-sheet) and leaves the way it came, a little faster.
function SheetContent({ className, children, side = 'right', ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="overlay fixed inset-0 z-50 bg-(--color-text)/60" />
      <SheetPrimitive.Content data-slot="sheet-content"
        className={cn('fixed z-50 flex flex-col overflow-y-auto overscroll-contain bg-(--color-background) text-(--color-text) outline-none', sides[side], className)} {...props}>
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn('t-sticker', className)} {...props} />
}
function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn('type-body text-(--color-muted)', className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
