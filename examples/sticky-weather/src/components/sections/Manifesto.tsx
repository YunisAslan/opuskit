// OpusKit section — Manifesto: the point of view, display-size, spanning the grid. Lines are set by hand (and again
// for mobile) and arrive one by one.
import { Lines } from '@/components/motion'

export function ManifestoSection({ lines, mobileLines, attribution }: { lines: string[]; mobileLines?: string[]; attribution?: string }) {
  return (
    <section className="section-y px-5 md:px-6">
      <blockquote className="mx-auto max-w-[1200px]">
        <Lines lines={lines} mobile={mobileLines} className="type-display [font-size:clamp(2.5rem,7vw,6.5rem)]" />
        {attribution && <footer className="type-utility mt-8 text-(--color-muted)">{attribution}</footer>}
      </blockquote>
    </section>
  )
}
