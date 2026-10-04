import Link from 'next/link'
import { Spot } from '@/components/Drawings'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-center px-5 py-24 md:px-10">
      <Spot kind="moth" className="h-20 w-20 -rotate-12" />
      <h1 className="type-display mt-4 max-w-[12ch]">This page flew off.</h1>
      <p className="type-body mt-6 max-w-[44ch]">Moths do that. It might be on the bookshelf, or back where the story starts.</p>
      <p className="mt-10 flex flex-wrap gap-6 type-body">
        <Link href="/" className="underline underline-offset-4">Back to the inkwell</Link>
        <Link href="/books" className="underline underline-offset-4">See the books</Link>
      </p>
    </section>
  )
}
