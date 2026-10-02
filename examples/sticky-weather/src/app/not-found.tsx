import Link from 'next/link'
import { Magnetic } from '@/components/pieces/Magnetic'
import { stickers } from '@/components/Stickers'

export default function NotFound() {
  return (
    <section className="grid min-h-[90svh] place-items-center px-5 pt-24 text-center md:px-6">
      <div>
        <div aria-hidden className="mx-auto w-32 -rotate-6">{stickers.drop}</div>
        <p className="type-body mt-8">This page came unstuck somewhere between here and the printer.</p>
        <h1 className="type-display mt-3">Lost sticker?<span className="block [font-weight:var(--type-heading-weight)]">Wrong page.</span></h1>
        <div className="mt-10"><Magnetic><Link href="/" className="type-body inline-flex h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 text-(--color-background) transition-colors hover:bg-(--color-muted) focus-visible:bg-(--color-muted)">Back to the studio</Link></Magnetic></div>
      </div>
    </section>
  )
}
