'use client'
// The link every ready section gets as `link`: in-site paths go through next/link (client navigation, basePath-safe);
// mailto/tel/hash stay plain anchors; outside links open in a new tab.
import Link from 'next/link'
import { motion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'

export function SiteLink({ href, ...rest }: ComponentProps<'a'> & { href: string }) {
  if (/^https?:/.test(href)) return <a href={href} target="_blank" rel="noreferrer" {...rest} />
  if (/^(mailto:|tel:|#)/.test(href)) return <a href={href} {...rest} />
  return <Link href={href} {...rest} />
}

/** SiteLink as a motion component, for kit pieces that animate their link (UnderlineFill). */
export const MotionSiteLink = motion.create(SiteLink)

/** The kit's filling underline as a plain `link` for ready sections (the footer's links). */
export function FillLink({ href, children }: { href: string; children: ReactNode }) {
  return <UnderlineFill href={href} link={MotionSiteLink}>{children}</UnderlineFill>
}
