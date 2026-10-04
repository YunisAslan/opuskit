import type { ReactNode } from 'react'
// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
// `statement` may be pre-split into masked lines (see Lines); `media` sits under it on the grid.
export function IntroSection({ label, statement, body, media }: { label?: string; statement: ReactNode; body?: string; media?: ReactNode }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-12">
        {label && <p className="type-utility text-(--color-muted) md:col-span-3">{label}</p>}
        <div className={label ? 'md:col-span-9' : 'md:col-span-10'}>
          <p className="type-heading [font-size:clamp(1.375rem,3.6vw,3.25rem)]">{statement}</p>
          {body && <p className="type-body mt-6 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
      {media && <div className="mx-auto mt-16 max-w-[1440px] md:mt-24">{media}</div>}
    </section>
  )
}
