import { ViewTransition, type ReactNode } from 'react'
// Page transition: on navigation the old page lifts away fast and the new one settles in (CSS in globals.css,
// reduced motion: instant).
export function Page({ children }: { children: ReactNode }) {
  return <ViewTransition enter="page" exit="page" default="none"><div>{children}</div></ViewTransition>
}
