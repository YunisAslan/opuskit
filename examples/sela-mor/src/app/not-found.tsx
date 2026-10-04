import Link from 'next/link'
import { ChapterWord } from '@/components/motion/ChapterWord'

export default function NotFound() {
  return (
    <section className="pb-(--section-gap) pt-36 md:pt-44">
      <ChapterWord word="Silence" as="h1" />
      <div className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="type-heading max-w-[24ch]">Nothing was recorded here. The page you asked for doesn’t exist.</p>
          <Link href="/" className="type-body mt-8 inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">Back to the start</Link>
        </div>
      </div>
    </section>
  )
}
