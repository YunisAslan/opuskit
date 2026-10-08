import Link from 'next/link'
import { TextEffect } from '@/components/pieces/TextEffect'
import { buttonVariants } from '@/components/ui/button'
import { notFound as c } from '@/content/site'

// The 404, in the building's voice: a plate set, never printed. Printer's crop marks frame the empty sheet.
export default function NotFound() {
  const mark = 'absolute size-6 border-(--color-text)'
  return (
    <section className="relative z-10 bg-(--color-background) px-(--gutter) pb-(--section-y) pt-[calc(var(--header-h)+var(--section-y)*0.5)]">
      <div className="relative mx-auto max-w-(--container) px-[clamp(20px,5vw,72px)] py-[clamp(48px,10vw,144px)]">
        <span aria-hidden className={`${mark} left-0 top-0 border-l border-t`} />
        <span aria-hidden className={`${mark} right-0 top-0 border-r border-t`} />
        <span aria-hidden className={`${mark} bottom-0 left-0 border-b border-l`} />
        <span aria-hidden className={`${mark} bottom-0 right-0 border-b border-r`} />
        <p className="type-utility text-(--color-muted)">404</p>
        <TextEffect as="h1" trigger="load" className="type-display mt-6 max-w-[12ch]">{c.title}</TextEffect>
        <p className="type-body mt-8 max-w-[52ch]">{c.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/" className={buttonVariants()}>{c.home}</Link>
          <Link href="/visit" className="type-utility link-on inline-flex min-h-11 items-center">{c.visit}</Link>
        </div>
      </div>
    </section>
  )
}
