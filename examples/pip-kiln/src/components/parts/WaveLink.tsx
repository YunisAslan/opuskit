'use client'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { DrawnLink } from '@/components/pieces/DrawnLink'

/** The site's text link: the kit's wavy underline, with next/link for in-site addresses (usable from server parts). */
export function WaveLink(props: Omit<ComponentProps<typeof DrawnLink>, 'link'>) {
  return <DrawnLink link={props.href.startsWith('/') ? Link : 'a'} {...props} />
}
