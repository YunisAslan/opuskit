'use client'
import * as React from 'react'
import { Label as LabelPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn('type-utility block text-(--color-text) data-[error=true]:text-(--color-error)', className)} {...props} />
}
