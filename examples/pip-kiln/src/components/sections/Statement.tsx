// OpusKit section — Statement, "giant": the point of view in the display face across the whole grid.
// Pip & Kiln: three short sentences, one per line, each line rising out of its mask; the last one pushed right so
// the sentence walks across the page. Phones keep the same three lines, sized to the width.
import { Lines } from '@/components/motion/Lines'

export function StatementSection({ statement, lines, attribution }: { statement: string; lines: string[]; attribution?: string }) {
  return (
    <section className="px-(--gutter) py-[calc(var(--section-y)*1.1)]">
      <blockquote className="mx-auto max-w-(--container)">
        <Lines as="p" text={statement} lines={lines}
          className="type-display leading-[0.82] [font-size:clamp(3.6rem,15.5vw,15rem)] md:[&_.line-mask:nth-child(2)]:pl-[16%] [&_.line-mask:nth-child(3)]:text-right" />
        {attribution && <footer className="t-action mt-10 md:mt-14 md:text-right">{attribution}</footer>}
      </blockquote>
    </section>
  )
}
