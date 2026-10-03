'use client'
// The hand-drawn underline link (ScribbleLink) wired to next/link, usable from server components.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { ScribbleLink } from '@/components/pieces/ScribbleLink'

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <ScribbleLink link={Link} href={href} current={usePathname() === href} className={className}>{children}</ScribbleLink>
}
