// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
// Fennwood: the label is the chapter title (with the travelling motif), and one key photo sits beside the statement.
import type { ReactNode } from 'react'

export function IntroSection({ label, statement, body, media }: { label?: ReactNode; statement: ReactNode; body?: string; media?: ReactNode }) {
  return (
    <section className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-x-6 gap-y-10 md:grid-cols-12">
        {label && <div className="md:col-span-12">{label}</div>}
        <div className={media ? 'md:col-span-7' : 'md:col-span-9'}>
          <div className="type-heading text-balance [font-size:clamp(1.75rem,3.6vw,3.25rem)]">{statement}</div>
          {body && <p className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
        {media && <div className="md:col-span-4 md:col-start-9">{media}</div>}
      </div>
    </section>
  )
}
