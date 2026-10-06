'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { DrawnLink } from '@/components/pieces/DrawnLink'

// Footer and inline text links: the wave underline, kept on the current page. Ignores the plain-underline class the
// footer passes, so only the drawn line shows.
export function SiteLink({ href, children }: { href: string; children: ReactNode }) {
  const path = usePathname()
  return <DrawnLink link={Link} stroke="wave" href={href} current={href !== '/' && path.startsWith(href)}>{children}</DrawnLink>
}
