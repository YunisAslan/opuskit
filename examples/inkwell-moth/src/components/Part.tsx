import type { ReactNode } from 'react'
// A named part of a page: the side index lists it and marks it while it is on screen.
export function Part({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return <div id={id} data-spy={label} className="scroll-mt-20">{children}</div>
}
