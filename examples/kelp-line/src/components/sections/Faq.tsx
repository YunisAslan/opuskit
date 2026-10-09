// OpusKit section — FAQ, fitted to Kelp Line: real questions in a narrow column beside the title. The list itself is
// the project's own shadcn/ui Accordion (type="single" collapsible), passed as children.
import type { ReactNode } from 'react'

export function FaqSection({ tone, title, children, aside }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame grid gap-10 md:grid-cols-12 md:gap-x-(--gutter)">
        <div data-fade className="md:col-span-4">
          <h2 className="type-heading">{title}</h2>
          {aside && <div className="type-body mt-4 max-w-[30ch] text-(--color-muted)">{aside}</div>}
        </div>
        <div data-fade style={{ ['--i' as string]: 1 }} className="border-t border-(--color-border) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
