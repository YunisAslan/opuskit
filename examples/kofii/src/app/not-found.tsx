import Link from 'next/link'
import { Lines } from '@/components/Lines'

export default function NotFound() {
  return (
    <section className="container-text grid min-h-[80svh] content-center gap-8 pb-32 pt-40">
      <Lines as="h1" lines={['Wrong turn']} mobile={['Wrong', 'turn']} className="type-display" />
      <p className="max-w-[44ch] text-lg" data-reveal="rise">This page does not exist, or it moved. The coffee is still where it was.</p>
      <div className="flex flex-wrap gap-4" data-reveal="rise">
        <Link href="/" className="btn">Back to the start</Link>
        <Link href="/menu" className="btn btn-secondary">See the menu</Link>
      </div>
    </section>
  )
}
