// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
export function IntroSection({ label, statement, body }: { label?: string; statement: string; body?: string }) {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-12">
        {label && <p className="type-body text-(--color-muted) md:col-span-3">{label}</p>}
        <div className={label ? 'md:col-span-8' : 'md:col-span-9'}>
          <p className="type-heading text-balance">{statement}</p>
          {body && <p className="type-body mt-6 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
    </section>
  )
}
