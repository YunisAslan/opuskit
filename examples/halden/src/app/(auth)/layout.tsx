import { ViewTransition } from 'react'

// Sign in and Sign up stand on their own: no menu, no footer — left out here, not hidden.
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <ViewTransition>
      <main id="main">{children}</main>
    </ViewTransition>
  )
}
