// OpusKit section — Statement, "lead" design fitted to Low Hum: a small label beside the sentence, the sentence in the
// display face across eight columns, a calm paragraph under it. The block settles in on a spring as it arrives.
import { Reveal } from '@/components/site/Reveal'

export function StatementSection({ label, statement, body }: { variant?: 'lead'; label?: string; statement: string; body?: string }) {
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-6 md:grid-cols-12 md:gap-8">
        {label && <p className="type-utility text-(--color-muted) md:col-span-2 md:pt-3">{label}</p>}
        <Reveal className="md:col-span-9 md:col-start-3">
          <p className="type-display text-balance [font-size:clamp(2rem,4.6vw,4rem)] [line-height:1.04]">{statement}</p>
          {body && <p className="type-body mt-8 max-w-[58ch] text-(--color-muted) md:ml-[calc(100%/9*3)] md:max-w-[46ch]">{body}</p>}
        </Reveal>
      </div>
    </section>
  )
}
