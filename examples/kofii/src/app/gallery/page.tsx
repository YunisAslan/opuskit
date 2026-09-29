import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { GlassCarousel } from '@/components/GlassCarousel'

export const metadata: Metadata = { title: 'Gallery' }

export default function GalleryPage() {
  return (
    <>
      <PageHeader lines={['What we', 'pour']}>
        <p>Nine things people order most. Drag the strip and look through the glass.</p>
      </PageHeader>
      <section aria-label="Photo gallery" className="pb-32">
        <GlassCarousel />
      </section>
    </>
  )
}
