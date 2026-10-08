'use client'
// shadcn/ui Sheet, restyled: square, on the page ground with a hairline edge, sliding on the drawer curve and leaving
// the way it came. Under reduced motion it fades.
import * as React from 'react'
import { Dialog as SheetPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export const Sheet = (props: React.ComponentProps<typeof SheetPrimitive.Root>) => <SheetPrimitive.Root data-slot="sheet" {...props} />
export const SheetTrigger = (props: React.ComponentProps<typeof SheetPrimitive.Trigger>) => <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
export const SheetClose = (props: React.ComponentProps<typeof SheetPrimitive.Close>) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />

const sides = {
  right:
    'inset-y-0 right-0 h-dvh w-full border-l sm:max-w-[34rem] data-[state=open]:animate-[sheet-in-right_var(--duration-sheet)_var(--ease-drawer)] data-[state=closed]:animate-[sheet-out-right_280ms_var(--ease-drawer)]',
  bottom:
    'inset-x-0 bottom-0 max-h-[85dvh] border-t pb-[env(safe-area-inset-bottom,0px)] data-[state=open]:animate-[sheet-in-bottom_var(--duration-sheet)_var(--ease-drawer)] data-[state=closed]:animate-[sheet-out-bottom_280ms_var(--ease-drawer)]',
}

export function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-(--color-secondary)/70 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-out]" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed z-50 flex flex-col overflow-y-auto overscroll-contain border-(--color-border) bg-(--color-background) text-(--color-text) reduced:!animate-[fade-in_180ms_ease-out]',
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => (
  <SheetPrimitive.Title className={cn('type-heading', className)} {...props} />
)
export const SheetDescription = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) => (
  <SheetPrimitive.Description className={cn('type-body text-(--color-muted)', className)} {...props} />
)
