import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

// shadcn/ui Pagination, themed to the tokens.
export function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav role="navigation" aria-label="Pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props} />
}

export const PaginationContent = forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />,
)
PaginationContent.displayName = 'PaginationContent'

export const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

export function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: React.ComponentProps<'a'> & { isActive?: boolean; size?: 'default' | 'sm' | 'lg' | 'icon' }) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'ghost', size }),
        'tabular-nums [font-size:0.9rem]',
        className,
      )}
      {...props}
    />
  )
}

export function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn('gap-1 px-3', className)} {...props}>
      <ChevronLeft className="size-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

export function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 px-3', className)} {...props}>
      <span>Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  )
}

export function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span aria-hidden className={cn('flex size-11 items-center justify-center text-(--color-muted)', className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}