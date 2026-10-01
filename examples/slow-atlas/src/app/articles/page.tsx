import type { Metadata } from 'next'
import { Archive } from '@/components/site/Archive'

export const metadata: Metadata = { title: 'Essays', description: 'Every Slow Atlas essay, newest first: one place per essay, told slowly.' }

export default function Articles() {
  return <Archive page={1} />
}
