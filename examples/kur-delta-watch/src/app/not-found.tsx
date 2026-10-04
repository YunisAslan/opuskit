import Link from 'next/link'
import { GiantWord } from '@/components/GiantWord'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <GiantWord as="h1" word="Silted up" label="Page not found" />
      <div className="px-5 py-16 md:px-10 md:py-24">
        <p className="type-body max-w-[46ch] text-[1.125rem]">This channel doesn’t go anywhere any more. The page may have moved, or the link was mistyped.</p>
        <div className="mt-8"><Button asChild size="lg"><Link href="/">Back to the river</Link></Button></div>
      </div>
    </>
  )
}
