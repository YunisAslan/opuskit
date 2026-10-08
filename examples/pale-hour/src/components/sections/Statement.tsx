// Statement — Magazine opener (`split`): the sentence large on the left across 8 columns, the paragraph set low on
// the right in the reading measure. On Home it is the sheet of paper that slides over the hero photograph.
// Behaviour: the frame unmasks first, then the words follow line by line.
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'

export function StatementSection({ tone, label, statement, body, aside, className }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; label?: string; statement: string; body?: string; aside?: ReactNode; className?: string
}) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className={`relative z-10 bg-(--color-background) px-(--gutter) py-(--section-y) ${className ?? ''}`}>
      <Reveal className="mx-auto grid max-w-(--container) gap-x-(--gutter) gap-y-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          {label && <h2 className="type-utility rv-text mb-8 text-(--color-muted)" style={i(0)}>{label}</h2>}
          <p className="type-heading rv text-pretty [font-size:clamp(2rem,4.4vw,4rem)] leading-[1.04]">{statement}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          {body && <p className="type-body rv-text" style={i(3)}>{body}</p>}
          {aside && <div className="rv-text mt-8" style={i(4)}>{aside}</div>}
        </div>
      </Reveal>
    </section>
  )
}
