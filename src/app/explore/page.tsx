import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageIntro } from '@/components/ui'
import { Explore } from './Explore'

export const metadata: Metadata = { title: 'Explore', description: 'Ten complete design recipes, the styles behind them, and the motion and components they use.' }

export default function ExplorePage() {
  return (
    <>
      <PageIntro title="Ten recipes, made to be built.">Each one is a complete design system with assets, motion and a build package. Start from one, or remix it into yours.</PageIntro>
      <Suspense><Explore /></Suspense>
    </>
  )
}
