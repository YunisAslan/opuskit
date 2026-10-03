import Link from 'next/link'
import { Chapter } from '@/components/site/Motif'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="glow flex min-h-svh items-center pb-24 pt-40">
      <div className="shell">
        <Chapter pose="hero"><h1 className="type-display max-w-[12ch]">Lost in the fog</h1></Chapter>
        <p className="type-body mt-8 max-w-[44ch] text-(--color-muted)">This path ends at the water. The page you were looking for is not here, but the house is just this way.</p>
        <Button asChild size="lg" className="mt-10"><Link href="/">Back to the house</Link></Button>
      </div>
    </section>
  )
}
