// shadcn/ui Textarea — the same field, taller.
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { fieldClass } from './input'

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldClass, 'min-h-32 resize-y py-3', className)} {...props} />
}
