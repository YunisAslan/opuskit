import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'Page not found' }

// The 404, in the studio's voice: an empty room and the way back in.
export default function NotFound() {
  return (
    <section className="px-[5vw] section-y">
      <div className="grid md:grid-cols-12">
        <div className="rise md:col-span-6">
          <p className="type-utility text-(--color-muted)">A room that is not here</p>
          <h1 className="type-display mt-4">This room is empty.</h1>
          <p className="type-body mt-8 max-w-[44ch] text-(--color-muted)">The page you were looking for has moved, or never existed. The front door is this way.</p>
          <Button asChild className="mt-10"><Link href="/">Back to the front door</Link></Button>
        </div>
      </div>
    </section>
  )
}
