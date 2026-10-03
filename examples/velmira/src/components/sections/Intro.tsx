import { Chapter } from '@/components/site/Motif'

// OpusKit section — Intro: what this is and who it is for, in one statement. Uses the recipe tokens only.
// The statement can be given as hand-broken lines: each line rises out of its own mask (line-by-line reveal).
export function IntroSection({ label, statement, body }: { label?: string; statement: string | string[]; body?: string }) {
  const lines = Array.isArray(statement) ? statement : [statement]
  return (
    <section data-reveal className="glow py-32 md:py-40">
      <div className="shell grid gap-6 md:grid-cols-12">
        {label && <Chapter className="md:col-span-3"><p data-rise className="type-utility text-(--color-muted)">{label}</p></Chapter>}
        <div className={label ? 'md:col-span-8' : 'md:col-span-9'}>
          <p className="type-display text-balance [font-size:clamp(1.75rem,3.5vw,3.1rem)] [line-height:1.08]">
            {lines.map((l, i) => <span key={i} data-line style={{ '--i': i } as React.CSSProperties}><span>{l} </span></span>)}
          </p>
          {body && <p data-rise style={{ '--i': lines.length + 2 } as React.CSSProperties} className="type-body mt-10 max-w-[52ch] text-(--color-muted)">{body}</p>}
        </div>
      </div>
    </section>
  )
}
