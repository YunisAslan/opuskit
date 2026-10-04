import type { ReactNode } from 'react'

// A section wrapper: an anchor for the menu links, and the fade & rise reveal (the section arrives as one piece).
export function Block({ id, children }: { id?: string; children: ReactNode }) {
  return <div id={id} data-reveal className="scroll-mt-16">{children}</div>
}
