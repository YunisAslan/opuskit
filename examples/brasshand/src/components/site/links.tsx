'use client'
// The two link flavours the ready sections receive through their `link` prop.
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { Magnetic } from '@/components/pieces/Magnetic'
import { TextRoll } from '@/components/pieces/TextRoll'

type Props = ComponentProps<typeof Link>

/** Menu, footer and text links: the label rolls on hover. Non-string children pass through untouched. */
export function RollLink({ children, ...props }: Props) {
  return <Link {...props}>{typeof children === 'string' ? <TextRoll>{children}</TextRoll> : children}</Link>
}

/** The page's main action: leans toward the cursor. */
export function MagneticLink(props: Props) {
  return <Magnetic><Link {...props} /></Magnetic>
}
