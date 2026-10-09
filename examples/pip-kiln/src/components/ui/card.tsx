import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Card: very round, on the surface, 1px border, no shadow.
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('flex flex-col rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-card)', className)} {...props} />
}
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('flex flex-col gap-2 p-6 md:p-8', className)} {...props} />
}
function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={cn('t-card', className)} {...props} />
}
function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="card-description" className={cn('type-body text-(--color-muted)', className)} {...props} />
}
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6 md:px-8', className)} {...props} />
}
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('mt-auto flex items-center p-6 md:p-8', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
