import { Chapter } from '@/components/site/Chapter'
import { MagneticLink } from '@/components/site/links'

export default function NotFound() {
  return (
    <>
      <Chapter word="Nameless" h1 />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <p className="type-heading max-w-[20ch]">This page has no name yet. Normally we would charge for that.</p>
        <p className="type-body mt-6 max-w-[48ch] text-(--color-muted)">The link may be old, or someone typed it from memory. Everything we have is one click away.</p>
        <div className="mt-10">
          <MagneticLink href="/" className="type-body inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-7 text-(--color-background)">Back to the studio</MagneticLink>
        </div>
      </section>
    </>
  )
}
