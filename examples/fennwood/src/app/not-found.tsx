import { ChapterTitle } from '@/components/ChapterTitle'
import { TextLink } from '@/components/TextLink'

export default function NotFound() {
  return (
    <main id="main" className="px-5 pt-22 md:px-6">
      <div className="mx-auto max-w-[1200px] py-(--section-pad)">
        <ChapterTitle as="h1" display size={64}>This page has gone cold</ChapterTitle>
        <p className="type-body mt-8 max-w-[48ch] text-(--color-muted)">Whatever was here is not on the menu any more. The fire is still going, though.</p>
        <p className="type-body mt-6 flex flex-wrap gap-x-8 gap-y-2">
          <TextLink href="/">Back to the start</TextLink>
          <TextLink href="/menu">This week’s menu</TextLink>
          <TextLink href="/reservations">Book a table</TextLink>
        </p>
      </div>
    </main>
  )
}
