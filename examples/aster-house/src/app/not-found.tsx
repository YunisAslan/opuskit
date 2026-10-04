import Link from 'next/link'
import { Motif } from '@/components/Motif'

export default function NotFound() {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="type-display [font-size:clamp(3rem,8vw,7rem)]">This room is dark.</h1>
        <p className="type-body mt-6 flex items-center gap-5 text-(--color-muted)"><Motif len={64} />There is no page here, at any hour.</p>
        <Link href="/" className="type-body mt-10 inline-flex min-h-14 items-center rounded-(--radius-button) border border-(--color-text) px-8 hover:bg-(--color-text) hover:text-(--color-background)">Back to the house</Link>
      </div>
    </section>
  )
}
