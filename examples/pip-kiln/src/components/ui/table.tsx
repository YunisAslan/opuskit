import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Table, ruled with hairlines; rows lay out as cards on phones (the caller sets the cell grid).
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <div className={cn('relative w-full min-w-0', className)}><table data-slot="table" className="w-full caption-bottom border-collapse" {...props} /></div>
}
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) { return <thead data-slot="table-header" className={cn('', className)} {...props} /> }
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) { return <tbody data-slot="table-body" className={cn('', className)} {...props} /> }
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) { return <tfoot data-slot="table-footer" className={cn('', className)} {...props} /> }
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) { return <tr data-slot="table-row" className={cn('border-b border-(--color-text)/25', className)} {...props} /> }
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th data-slot="table-head" className={cn('type-utility py-3 text-left align-bottom font-semibold text-(--color-muted)', className)} {...props} />
}
function TableCell({ className, ...props }: React.ComponentProps<'td'>) { return <td data-slot="table-cell" className={cn('py-5 align-middle', className)} {...props} /> }
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return <caption data-slot="table-caption" className={cn('type-caption mt-4 text-(--color-muted)', className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
