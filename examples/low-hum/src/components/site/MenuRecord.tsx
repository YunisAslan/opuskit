'use client'
// The Menu page's menu: the same MenuSection, with the record beside it following the chosen side.
import type { ComponentProps } from 'react'
import { MenuSection } from '@/components/sections/Menu'
import { SleeveRecord } from './SleeveRecord'

export function MenuWithRecord(props: Omit<ComponentProps<typeof MenuSection>, 'aside'>) {
  return <MenuSection {...props} aside={(side) => <SleeveRecord side={side} sides={props.sides} />} />
}
