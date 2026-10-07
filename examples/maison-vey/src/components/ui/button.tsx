import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// shadcn/ui Button, restyled: body face, sharp corners, 1px borders; focus changes the ground, never a ring.
const buttonVariants = cva('cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      /** Set exactly like the menu links: same role, size and width. */
      nav: 'type-utility link-quiet inline-flex min-h-11 items-center gap-2',
      link: 'type-body link-quiet inline-flex min-h-11 items-center',
      icon: 'inline-flex size-11 items-center justify-center text-(--color-text) transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)',
    },
    width: { auto: '', full: 'w-full' },
  },
  defaultVariants: { variant: 'primary', width: 'auto' },
})

function Button({ className, variant, width, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, width }), className)} {...props} />
}

export { Button, buttonVariants }
