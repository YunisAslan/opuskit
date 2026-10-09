import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// shadcn/ui Button, restyled: a pill sticker with a hard shadow it drops into when pressed (globals.css → btn).
const buttonVariants = cva('btn', {
  variants: {
    variant: { ink: 'btn-ink', light: 'btn-light' },
    size: { default: '', lg: 'min-h-14 px-8 text-base', icon: 'size-12 min-h-12 px-0' },
  },
  defaultVariants: { variant: 'ink', size: 'default' },
})

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
