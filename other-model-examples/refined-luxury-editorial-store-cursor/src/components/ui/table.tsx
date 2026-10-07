import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Table, themed: hairline rules, quiet headings.
export const Table = forwardRef<HTMLTableElement, React.ComponentProps<'table'>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto">
      <table ref={ref} className={cn('type-body w-full caption-bottom border-collapse', className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, React.ComponentProps<'thead'>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-(--color-border)', className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, React.ComponentProps<'tbody'>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />,
)
TableBody.displayName = 'TableBody'

export const TableFooter = forwardRef<HTMLTableSectionElement, React.ComponentProps<'tfoot'>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t border-(--color-border)', className)} {...props} />,
)
TableFooter.displayName = 'TableFooter'

export const TableRow = forwardRef<HTMLTableRowElement, React.ComponentProps<'tr'>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b border-(--color-border) transition-colors duration-150 hover:bg-(--color-secondary)/40', className)} {...props} />
  ),
)
TableRow.displayName = 'TableRow'

export const TableHead = forwardRef<HTMLTableCellElement, React.ComponentProps<'th'>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn('type-utility h-12 px-3 text-left align-middle text-(--color-muted)', className)} {...props} />
  ),
)
TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, React.ComponentProps<'td'>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn('p-3 align-middle', className)} {...props} />,
)
TableCell.displayName = 'TableCell'

export const TableCaption = forwardRef<HTMLTableCaptionElement, React.ComponentProps<'caption'>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('type-utility mt-4 text-(--color-muted)', className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'