import Link from 'next/link'
import { ChapterWord } from '@/components/site/motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <ChapterWord word="Lost" as="h1" />
      <section className="px-6 py-16 md:py-24">
        <p className="type-body max-w-[48ch]">This page is not on any route we have travelled. It may have moved, or it may never have existed. The essays are all still here.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/articles">Read the archive</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/">Back to the cover</Link></Button>
        </div>
      </section>
    </>
  )
}
