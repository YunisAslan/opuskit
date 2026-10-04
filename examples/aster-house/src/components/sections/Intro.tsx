import type { ReactNode } from 'react'
// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
export function IntroSection({ label, statement, body }: { label?: ReactNode; statement: ReactNode; body?: string }) {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-12">
        {label && <p className="type-utility flex items-center gap-4 self-start text-(--color-muted) md:col-span-3 md:pt-4">{label}</p>}
        <div className={label ? 'md:col-span-8' : 'md:col-span-9'}>
          <p className="type-heading [font-size:clamp(1.9rem,4vw,3.6rem)] [font-weight:350] leading-[1.12]">{statement}</p>
          {body && <p data-reveal="rise" className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
    </section>
  )
}
