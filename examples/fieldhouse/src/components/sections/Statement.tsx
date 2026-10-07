import { Lines, Reveal } from '@/components/motion'
// Statement — giant: the point of view in the display face across the grid, line by line. Lines are broken by hand
// for desktop and for phones.
export function StatementSection({ id, lines, mobile, attribution }: { id?: string; lines: string[]; mobile?: string[]; attribution?: string }) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <blockquote className="mx-auto max-w-(--container) md:py-[calc(var(--section-y)/4)]">
        <Lines as="p" lines={lines} mobile={mobile} className="type-display [font-size:clamp(2.5rem,5.6vw,5.75rem)] leading-[1.02]" />
        {attribution && <Reveal delay={0.5}><footer className="type-utility mt-10 flex items-center gap-3 text-(--color-muted)"><span aria-hidden className="h-px w-6 bg-(--color-accent)" />{attribution}</footer></Reveal>}
      </blockquote>
    </section>
  )
}
