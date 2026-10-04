import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

// A named stop on the walk through a page. The StopIndex finds every [data-stop] and shows where the visitor is.
export function Stop({ id, name, children, fade = true }: { id: string; name: string; children: ReactNode; fade?: boolean }) {
  return <Reveal off={!fade} id={id} data-stop={name} className="scroll-mt-24">{children}</Reveal>
}

// The small card that names a stop and says one useful thing.
export function StopCard({ name, children, className = '' }: { name: string; children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-sm rounded-(--radius-card) bg-(--color-surface) p-5 text-(--color-text) ${className}`}>
      <p className="type-utility flex items-center gap-2"><span aria-hidden className="size-1.5 rounded-full bg-(--color-accent)" />{name}</p>
      <div className="type-body mt-2 space-y-3 text-(--color-muted)">{children}</div>
    </div>
  )
}
