// Statement — split (magazine opener): the sentence large on the left in the display face, broken by hand, rising
// line by line; the paragraph set low on the right, following once the sentence has landed.
import type { ReactNode } from 'react'
import { After, Lines } from '@/components/motion/Reveal'

export function StatementSection({ label, lines, body, children }: { label?: string; lines: ReactNode[]; body?: string; children?: ReactNode }) {
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-8">
          {label && <p className="type-utility mb-6 text-(--color-muted)">{label}</p>}
          <Lines lines={lines} className="type-display text-[clamp(3rem,6.4vw,6.25rem)] leading-[0.9]" />
        </div>
        <After className="md:col-span-4 md:col-start-9 md:pb-2" delay={0.35}>
          {body && <p className="type-body max-w-[46ch] text-(--color-muted)">{body}</p>}
          {children}
        </After>
      </div>
    </section>
  )
}
