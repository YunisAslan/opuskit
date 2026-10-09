import * as React from 'react'
import { cn } from '@/lib/utils'
import { field } from './input'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(field, 'min-h-28 rounded-(--radius-card) py-3', className)} {...props} />
}

export { Textarea }
