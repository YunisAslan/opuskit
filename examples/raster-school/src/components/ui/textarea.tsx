import * as React from 'react'
import { cn } from '@/lib/utils'
import { fieldClass } from './input'

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldClass, 'min-h-28 resize-y', className)} {...props} />
}
