'use client'
// The `link` every ready section gets: next/link for pages, and "#start" opens the sign-up panel instead.
import Link from 'next/link'
import type { ComponentProps } from 'react'

export const START = '#start'
export const startSignup = () => window.dispatchEvent(new Event('hexmint:start'))

export function SiteLink({ href = '/', ...rest }: ComponentProps<'a'>) {
  if (href === START) return <button type="button" onClick={startSignup} className={rest.className} aria-haspopup="dialog">{rest.children}</button>
  return <Link href={href} {...rest} />
}
