import * as React from 'react'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

function Breadcrumb(props: React.ComponentProps<'nav'>) { return <nav aria-label="Breadcrumb" data-slot="breadcrumb" {...props} /> }
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumb-list" className={cn('type-utility flex flex-wrap items-center gap-2 text-(--color-muted)', className)} {...props} />
}
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) { return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-2', className)} {...props} /> }
function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<'a'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'a'
  return <Comp data-slot="breadcrumb-link" className={cn('text-(--color-text)', className)} {...props} />
}
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className={cn('text-(--color-muted)', className)} {...props} />
}
// A little dot between steps — not a meta string, just a path.
function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-separator" role="presentation" aria-hidden className={cn('size-1.5 rounded-full bg-(--color-muted)', className)} {...props} />
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator }
