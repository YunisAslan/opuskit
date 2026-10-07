import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/pieces/Logo'

// 404 in the same voice as the rest of the site.
export default function NotFound() {
  return (
    <section className="px-(--gutter) py-[calc(var(--section-y)*1.2)]">
      <div className="mx-auto max-w-(--container)">
        <Logo className="mb-10" />
        <h1 className="type-display text-balance [font-size:clamp(2.6rem,7vw,5.5rem)]">
          This hour is not on the shelf.
        </h1>
        <p className="type-body mt-6 max-w-[52ch] text-(--color-muted)">
          The page you asked for is not here — it may have been moved, or the link was mistyped. The five
          scents are all still where they should be.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/shop">Shop the five scents</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to the front</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}