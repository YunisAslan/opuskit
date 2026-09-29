import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Builder } from './Builder'

export const metadata: Metadata = { title: 'Showcase', description: 'Plan a site in three steps — style for every page, then each page top to bottom with ready sections and pieces — and get a recipe for any AI tool.' }

export default function KitPage() {
  return <Suspense><Builder /></Suspense>
}
