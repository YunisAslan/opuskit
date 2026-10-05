import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Library } from './Library'

export const metadata: Metadata = { title: 'Library', description: 'Sites, sections and effects, each drawn the way you would get it. Collect what you like; OpusKit makes it one site.' }

export default function LibraryPage() {
  return <Suspense><Library /></Suspense>
}
