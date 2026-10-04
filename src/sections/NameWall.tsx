// OpusKit section — Name wall: who you work with or what it connects to, real names set as type (no borrowed logos).
// Three designs:
//   grid   — names in ruled cells, a quiet wall of proof.
//   inline — the names run as one big paragraph, the way a credits list reads.
//   split  — a title and a line on the left, the names in cells on the right, each with its initial (tools, partners).
export function NameWallSection({ tone, variant = 'grid', title, text, names }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'grid' | 'inline' | 'split'; title: string; text?: string; names: string[] }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'split') return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.85)]">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading text-balance">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[40ch] text-(--color-muted)">{text}</p>}
        </div>
        <ul className="grid grid-cols-2 self-start border-l border-t border-(--color-border) sm:grid-cols-3 md:col-span-8">
          {names.map((n) => (
            <li key={n} className="type-body flex items-center gap-3 border-b border-r border-(--color-border) px-4 py-5 md:px-5 md:py-6">
              <span aria-hidden className="type-utility grid size-9 shrink-0 place-items-center rounded-(--radius-button) bg-(--color-surface)">{n[0]}</span>{n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  if (variant === 'inline') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        <ul className="mt-8 flex flex-wrap gap-x-[0.6em] gap-y-1 type-display text-balance [font-size:clamp(1.8rem,4.6vw,4.2rem)] leading-[1.05]">
          {names.map((n, i) => <li key={n} className={i % 2 ? 'text-(--color-muted)' : undefined}>{n}{i < names.length - 1 ? ',' : ''}</li>)}
        </ul>
        {text && <p className="type-body mt-8 max-w-[56ch] text-(--color-muted)">{text}</p>}
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.85)]">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{title}</h2>
        <ul className="mt-8 grid grid-cols-2 border-l border-t border-(--color-border) md:grid-cols-4">
          {names.map((n) => <li key={n} className="type-heading border-b border-r border-(--color-border) px-5 py-8 [font-size:clamp(1.05rem,1.6vw,1.35rem)]">{n}</li>)}
        </ul>
        {text && <p className="type-body mt-6 max-w-[56ch] text-(--color-muted)">{text}</p>}
      </div>
    </section>
  )
}
