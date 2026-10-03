import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Stop } from '@/components/site/Stop'

export default function NotFound() {
  return (
    <Stop id="lost" name="Off the map" film>
      <section className="relative flex min-h-svh items-end px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto w-full max-w-[1440px]">
          <h1 className="type-display max-w-[12ch]">This stop isn’t on the map<span className="quiet block">Walk back to the light.</span></h1>
          <Button asChild size="lg" className="type-body mt-8"><Link href="/">Back to the start</Link></Button>
        </div>
      </section>
    </Stop>
  )
}
