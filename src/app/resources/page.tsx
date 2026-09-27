import type { Metadata } from 'next'
import { PageIntro } from '@/components/ui'
import { Resources } from './Resources'

export const metadata: Metadata = { title: 'Resources', description: 'A curated toolbox of fonts, media, motion libraries and AI media tools — each with a reason to use it.' }

export default function ResourcesPage() {
  return (
    <>
      <PageIntro title="A toolbox, not a directory.">Every resource is here for a reason, with a note on when to use it and its license. Filter by what you&apos;re building.</PageIntro>
      <Resources />
    </>
  )
}
