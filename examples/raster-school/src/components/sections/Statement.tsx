// OpusKit section — Statement, `giant`: the point of view in the display face across the whole grid. Fitted to Raster
// School: it opens on the white rule like every part, the label sits on column 1, the sentence starts on column 1 and
// runs eleven columns, and the attribution hangs on the column lines below it.
import { Section } from '@/components/site/SectionHead'

export function StatementSection({ tone, label, statement, attribution }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'giant'; label?: string; statement: string; attribution?: string }) {
  return (
    <Section tone={tone}>
      <figure className="raster border-t border-(--color-text) pt-4">
        {label && <figcaption className="type-utility col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-12">{label}</figcaption>}
        <blockquote className="col-span-4 mt-10 sm:col-span-6 lg:col-span-11 lg:mt-16">
          <p className="type-display [font-size:clamp(2.5rem,7.2vw,7.25rem)]">{statement}</p>
        </blockquote>
        {attribution && <p className="type-utility col-span-4 mt-10 sm:col-span-3 lg:col-span-3 lg:mt-14">{attribution}</p>}
      </figure>
    </Section>
  )
}
