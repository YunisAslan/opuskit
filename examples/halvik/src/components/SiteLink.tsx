'use client'
// The link every ready section gets as `link`: in-site paths go through next/link (client navigation, basePath-safe);
// "#buy…" opens the buy panel instead of navigating; mailto/http stay plain anchors.
import Link from 'next/link'
import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { parseBuyHash, useBuy } from '@/components/Buy'

export function SiteLink({ href, onClick, ...rest }: ComponentProps<'a'> & { href: string }) {
  const openBuy = useBuy()
  const preset = parseBuyHash(href)
  if (preset) return <a href={href} {...rest} onClick={(e) => { e.preventDefault(); onClick?.(e); openBuy(preset) }} />
  if (/^(mailto:|https?:)/.test(href)) return <a href={href} onClick={onClick} {...rest} />
  return <Link href={href} onClick={onClick} {...rest} />
}

/** SiteLink as a motion component, for kit pieces that animate their link (UnderlineFill). */
export const MotionSiteLink = motion.create(SiteLink)
