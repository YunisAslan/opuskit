'use client'
// next/link wrapped in the kit's Filling underline, for sections that take a `link` component.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'

type P = { href: string; children: ReactNode; className?: string }
const internal = (href: string) => href.startsWith('/')

export function TextLink({ href, children, className }: P) {
  return <UnderlineFill link={internal(href) ? Link : 'a'} href={href} className={className?.replace(/underline\S*/g, '')}>{children}</UnderlineFill>
}

// On the dark footer: the same piece with its two inks flipped through the tokens.
export function FooterLink({ href, children }: P) {
  return <span className="ink-inverse"><UnderlineFill link={internal(href) ? Link : 'a'} href={href}>{children}</UnderlineFill></span>
}
