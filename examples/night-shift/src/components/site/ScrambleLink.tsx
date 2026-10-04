'use client'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { TextScramble } from '@/components/pieces/TextScramble'

// The `link` every ready section gets: next/link (client navigation, basePath), with short text labels scrambled
// (the Scrambled labels piece). Long strings and addresses stay plain.
export function ScrambleLink({ children, ...props }: ComponentProps<typeof Link>) {
  const scramble = typeof children === 'string' && children.length <= 24 && !children.includes('@')
  return <Link {...props}>{scramble ? <TextScramble>{children}</TextScramble> : children}</Link>
}
