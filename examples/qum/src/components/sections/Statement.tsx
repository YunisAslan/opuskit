// OpusKit section — Statement: what this is, or what you believe, in one sentence. Three designs:
//   lead  — a small label beside the statement, a calm paragraph under it (an introduction).
//   giant — the statement in the display face across the whole grid (a point of view).
//   split — the statement large on the left, the paragraph set low on the right, like a magazine opener.
export function StatementSection({ tone, variant = 'lead', label, statement, body, attribution }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'lead' | 'giant' | 'split'; label?: string; statement: string; body?: string; attribution?: string }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'giant') return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*1.25)]">
      <blockquote className="mx-auto max-w-(--container)">
        {label && <p className="type-utility mb-8 text-(--color-muted)">{label}</p>}
        <p className="type-display text-balance [font-size:clamp(2.5rem,7vw,7rem)]">{statement}</p>
        {body && <p className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{body}</p>}
        {attribution && <footer className="type-utility mt-8 text-(--color-muted)">{attribution}</footer>}
      </blockquote>
    </section>
  )
  if (variant === 'split') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          {label && <p className="type-utility mb-6 text-(--color-muted)">{label}</p>}
          <p className="type-heading text-balance [font-size:clamp(2rem,4.6vw,4.25rem)] leading-[1.02]">{statement}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          {body && <p className="type-body text-(--color-muted)">{body}</p>}
          {attribution && <p className="type-utility mt-6 text-(--color-muted)">{attribution}</p>}
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-6 md:grid-cols-12">
        {label && <p className="type-utility text-(--color-muted) md:col-span-3">{label}</p>}
        <div className={label ? 'md:col-span-8' : 'md:col-span-9'}>
          <p className="type-heading text-balance [font-size:clamp(1.75rem,3.6vw,3.25rem)]">{statement}</p>
          {body && <p className="type-body mt-6 max-w-[60ch] text-(--color-muted)">{body}</p>}
          {attribution && <p className="type-utility mt-6 text-(--color-muted)">{attribution}</p>}
        </div>
      </div>
    </section>
  )
}
