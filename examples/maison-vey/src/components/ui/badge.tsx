import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Badge: availability only (never a discount) — a caption on the page ground.
function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="badge" className={cn('type-caption inline-flex items-center bg-(--color-background) px-2 py-0.5 text-(--color-text)', className)} {...props} />
}

export { Badge }
