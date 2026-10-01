import type { Metadata } from 'next'
import { Archive } from './archive'

export const metadata: Metadata = { title: 'Articles', description: 'Every Slow Atlas essay, newest first. One place each.' }

// Articles: Journal (page 1 of the archive; later pages live at /articles/page/[page])
export default function ArticlesPage() {
  return <Archive page={1} />
}
