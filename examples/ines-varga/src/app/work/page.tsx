import type { Metadata } from 'next'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { NameWallSection } from '@/components/sections/NameWall'
import { projects, work } from '@/content/site'

export const metadata: Metadata = {
  title: work.meta.title,
  description: work.meta.description,
  openGraph: { title: work.meta.title, description: work.meta.description, images: [{ url: '/media/featuredWork-1.jpg', width: 2400, height: 1682, alt: 'The Salt Isles, an ink map by Ines Varga' }] },
}

export default function WorkPage() {
  const items = projects.map((p, n) => ({ ...p, n }))
  return (
    <>
      <section className="px-(--gutter) pb-(--section-y) pt-32 md:pt-40">
        <FeaturedWorkSection variant="story" as="h1" title={`${work.title}, ${work.years}`} aside={work.intro} items={items}
          route={{ start: work.route.start, end: work.route.end, endHref: '/contact' }} />
      </section>
      <NameWallSection tone="surface" title={work.clients.title} text={work.clients.text} names={work.clients.names} />
    </>
  )
}
