import Link from 'next/link'
import { TextEffect } from '@/components/pieces/TextEffect'
import { TextScramble } from '@/components/pieces/TextScramble'
import { ChapterLabel } from '@/components/site/ChapterLabel'

export default function NotFound() {
  return (
    <section className="console-grid-soft flex min-h-svh flex-col justify-center px-6 py-40">
      <div className="mx-auto w-full max-w-[1440px]">
        <ChapterLabel className="mb-4">// 404 Not on the books</ChapterLabel>
        <TextEffect as="h1" className="type-display max-w-[12ch]">This page never made it to the ledger.</TextEffect>
        <p className="type-body mt-6 max-w-[46ch] text-(--color-muted)">The link may be old or mistyped. Everything else is where you left it.</p>
        <Link href="/" className="type-body mt-10 inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-6 font-medium text-(--color-background)"><TextScramble>Back to home</TextScramble></Link>
      </div>
    </section>
  )
}
