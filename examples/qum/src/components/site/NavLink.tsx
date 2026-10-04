'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'

// next/link that marks itself as the current page (a small green dot before it).
export function NavLink({ href, className = '', ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const path = usePathname()
  const current = path === href || (href !== '/' && path.startsWith(href + '/'))
  return <Link href={href} aria-current={current ? 'page' : undefined}
    className={`${className} aria-[current=page]:before:absolute aria-[current=page]:before:-left-2.5 aria-[current=page]:before:top-1/2 aria-[current=page]:before:size-1.5 aria-[current=page]:before:-translate-y-1/2 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-(--color-accent) aria-[current=page]:before:content-['']`} {...rest} />
}

// Every text link in the menu and footer: the kit's Filling underline, navigating with next/link.
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return href.startsWith('/') ? <UnderlineFill link={NavLink} href={href} className={className}>{children}</UnderlineFill>
    : <UnderlineFill href={href} className={className}>{children}</UnderlineFill>
}

// FooterSection hands its links this component; they become Filling-underline links.
export function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <TextLink href={href}>{children}</TextLink>
}
