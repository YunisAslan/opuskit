import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Creator } from '@/features/questionnaire/Creator'

export const metadata: Metadata = { title: 'Create your recipe' }

export default function CreatePage() {
  return <Suspense><Creator /></Suspense>
}
