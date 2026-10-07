import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Card, restyled: no box, no shadow — structure comes from space and the hairline under it.
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('rounded-(--radius-card) text-(--color-text) shadow-(--shadow-card)', className)} {...props} />
}
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-baseline justify-between gap-4', className)} {...props} />
}

export { Card, CardContent, CardFooter }
