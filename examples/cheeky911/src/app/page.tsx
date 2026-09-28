import Link from 'next/link'
import Hero from '@/components/Hero'
import PhotoRows from '@/components/PhotoRows'
import TitleCard from '@/components/TitleCard'

export default function Home() {
  return (
    <>
      <Hero />
      {/* The film releases into the page: a title card, then the cars drifting past */}
      <TitleCard label="After the film" lines={[['Ten cars,', 'stretch-wide'], ['one season', 'stretch-narrow']]}>
        <p>
          We find 911s worth keeping, photograph them where they live, and show them the way a house shows a collection.
          Each one is for sale, and each one comes with its story.
        </p>
      </TitleCard>
      <PhotoRows rows={3} label="Photographs of the ten cars" />
      <div className="py-32 text-center">
        <Link href="/collections" className="text-link type-heading inline-flex min-h-11 items-center">See the work</Link>
      </div>
    </>
  )
}
