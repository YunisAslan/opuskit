// shadcn/ui Table, restyled: ruled rows on the hairline, labels in the utility role, figures in the face's own (proportional) set.
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn('w-full caption-bottom border-collapse text-left', className)} {...props} />
    </div>
  )
}
export const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => <thead className={cn('border-b border-(--color-text)', className)} {...props} />
export const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => <tbody className={className} {...props} />
export const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => <tr className={cn('border-b border-(--color-border)', className)} {...props} />
export const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => <th className={cn('type-utility py-3 pr-4 align-bottom font-[inherit] text-(--color-muted)', className)} {...props} />
export const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => <td className={cn('type-body py-4 pr-4 align-middle', className)} {...props} />
