'use client'
// shadcn/ui Command (cmdk), restyled for the FAQ page: the search box itself, set large. The list it filters is the
// FAQ accordion, so this component only carries the input and its keyboard behaviour.
import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'

export function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cn('flex w-full flex-col', className)} {...props} />
}

export function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return <CommandPrimitive.Input data-slot="command-input" className={cn('w-full min-w-0 bg-transparent outline-none', className)} {...props} />
}
