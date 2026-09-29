import type { ReactNode } from 'react'
import { Lines } from './Lines'

export function PageHeader({ lines, mobile, children }: { lines: string[]; mobile?: string[]; children?: ReactNode }) {
  return (
    <header className="container-text pb-16 pt-40 md:pb-24 md:pt-48">
      <Lines as="h1" lines={lines} mobile={mobile} className="type-display" />
      {children && (
        <div className="mt-8 max-w-[56ch] text-lg" data-reveal="rise">
          {children}
        </div>
      )}
    </header>
  )
}
