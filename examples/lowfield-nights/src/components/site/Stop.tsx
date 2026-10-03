import type { ReactNode } from 'react'

// One named stop of the walk. The quiet index (StopIndex) reads data-stop; `film` leaves the ground see-through so the
// page film stays visible, otherwise the stop sits on the graphite ground at 85% over it.
export function Stop({ id, name, film, ownIndex, className = '', children }: { id: string; name: string; film?: boolean; ownIndex?: boolean; className?: string; children: ReactNode }) {
  return (
    <div id={id} data-stop={name} data-own-index={ownIndex || undefined} className={`relative scroll-mt-16 ${film ? '' : 'bg-(--color-background)/85'} ${className}`}>
      {children}
    </div>
  )
}
