import { Headline } from '@/components/site/motion'

// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
// `statement` is given as lines (one per sentence) so the line reveal follows the reading order.
export function IntroSection({ label, statement, body }: { label?: string; statement: string[]; body?: string }) {
  return (
    <section className="border-t border-(--color-border) px-6 py-12 first:border-t-0 md:py-16">
      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12">
        {label && <p className="type-utility text-(--color-muted) md:col-span-6 lg:col-span-3">{label}</p>}
        <div className="md:col-span-6 lg:col-span-8">
          <Headline as="p" lines={statement} className="type-heading [font-size:clamp(1.75rem,3.6vw,3.25rem)]" />
          {body && <p className="type-body mt-6 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
    </section>
  )
}
