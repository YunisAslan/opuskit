import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Builder } from './Builder'

export const metadata: Metadata = { title: 'Kit', description: 'Build a site in three steps — one style for every page, then sections and effects into your bag — and get a recipe for any AI tool.' }

export default function KitPage() {
  return <Suspense><Builder /></Suspense>
}
