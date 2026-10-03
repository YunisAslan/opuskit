// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
export function IntroSection({ label, statement, body }: { label?: string; statement: string; body?: string }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-12">
        {label && <p className="type-utility text-(--color-muted) md:col-span-3">{label}</p>}
        <div className={label ? 'md:col-span-8' : 'md:col-span-9'}>
          <p className="type-heading text-balance [font-size:clamp(1.75rem,3.6vw,3.25rem)]">{statement}</p>
          {body && <p className="type-body mt-6 max-w-[60ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
    </section>
  )
}
