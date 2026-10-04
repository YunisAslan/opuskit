import Link from 'next/link'
import { TextScramble } from '@/components/pieces/TextScramble'

export default function NotFound() {
  return (
    <div className="hairline-grid px-6 pb-32 pt-44">
      <div className="mx-auto max-w-[1440px]">
        <p><TextScramble duration={0.6} className="type-utility text-(--color-muted)">{'// 404 No signal'}</TextScramble></p>
        <h1 className="type-display mt-8">No signal.</h1>
        <p className="type-body mt-6 max-w-[46ch] text-[1.125rem] text-(--color-muted)">There is nothing at this address. The page may have moved, or the link lost a frame on the way.</p>
        <Link href="/" className="type-utility mt-10 inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-6 text-[1rem] text-(--color-background) hover:bg-(--color-muted)">Back to the console</Link>
      </div>
    </div>
  )
}
