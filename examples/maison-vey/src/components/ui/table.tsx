import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Table: hairline rows, captions as headers.
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <div className="relative w-full overflow-x-auto"><table data-slot="table" className={cn('w-full caption-bottom border-collapse', className)} {...props} /></div>
}
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead className={cn('[&_tr]:border-b [&_tr]:border-(--color-border)', className)} {...props} />
}
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody className={cn('[&_tr]:border-b [&_tr]:border-(--color-border)', className)} {...props} />
}
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr className={cn(className)} {...props} />
}
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th className={cn('type-caption h-11 pr-4 text-left align-middle font-normal text-(--color-muted) last:pr-0', className)} {...props} />
}
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td className={cn('type-body py-6 pr-4 align-top last:pr-0', className)} {...props} />
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
