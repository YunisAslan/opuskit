import { GiantWord } from '@/components/motion'
import { SwapButton } from '@/components/pieces/SwapButton'

export default function NotFound() {
  return (
    <div className="pt-20 pb-32 md:pt-28 md:pb-40">
      <GiantWord word="Burnt out" as="h1" />
      <div className="mx-auto mt-12 max-w-[1440px] px-4 md:px-10">
        <p className="type-body max-w-[44ch]">This page has gone to ash. The collection is still here.</p>
        <SwapButton href="/" label="Back to the start" className="mt-8 [--color-text:var(--color-background)]" />
      </div>
    </div>
  )
}
