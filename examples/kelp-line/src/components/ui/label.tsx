'use client'
// shadcn/ui Label — the utility role, muted; tied to its field by Radix.
import { Label as LabelPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn('type-utility block select-none text-(--color-muted)', className)} {...props} />
}
