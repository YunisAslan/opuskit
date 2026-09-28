import Link from 'next/link'
import Lines from '@/components/Lines'

export default function NotFound() {
  return (
    <section className="container-text flex min-h-svh flex-col justify-end pb-32 pt-40">
      <Lines as="h1" lines={['404.', 'This can', 'is empty.']} className="type-display" />
      <div className="mt-12 grid gap-6 border-t-2 border-border pt-6 md:grid-cols-12">
        <p className="type-body text-lg md:col-span-5">The page you asked for is not here. It may have moved, or the link may be wrong.</p>
        <div className="flex flex-wrap gap-4 md:col-span-6 md:col-start-7 md:justify-end">
          <Link href="/" className="btn btn-primary">Back to the film</Link>
          <Link href="/features" className="btn btn-secondary">See what is in the can</Link>
        </div>
      </div>
    </section>
  )
}
