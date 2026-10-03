// The sections' `link` for menu, footer and text links: next/link inside the site (client navigation, basePath),
// a plain <a> for mail and maps, and the kit's rolling letters on any text label.
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { TextRoll } from '@/components/pieces/TextRoll'
import { SwapButton } from '@/components/pieces/SwapButton'

export function RollLink({ href, children, ...rest }: ComponentProps<'a'> & { href: string }) {
  const inner = typeof children === 'string' ? <TextRoll>{children}</TextRoll> : children
  return href.startsWith('/') ? <Link href={href} {...rest}>{inner}</Link> : <a href={href} {...rest}>{inner}</a>
}

/** For a section whose action is a text link (ContactCta): the kit's hopping arrow button instead. */
export function SwapLink({ href, children }: { href: string; children: string }) {
  return <SwapButton href={href} label={children} className="[--color-text:var(--color-background)]" />
}
