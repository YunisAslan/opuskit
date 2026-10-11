import type { ElementType } from 'react'
// OpusKit section — CTA band: a slim mid-page offer — one line and one action — that keeps the page going rather than
// ending it. Three designs:
//   card — a quiet box on the surface colour, the action at its end.
//   line — no box: the line large between two rules, the action an underlined link.
//   loud — a full-width band in the ink colour, the line huge.
export function CtaBandSection({ tone, variant = 'card', link: L = 'a', text, action, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'card' | 'line' | 'loud'; link?: ElementType; text: string; action: { label: string; href: string }; note?: string }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'line') return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.4)]">
      <div className="mx-auto flex max-w-(--container) flex-col gap-4 border-y border-(--color-text) py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="type-display text-balance [font-size:clamp(1.8rem,4vw,3.4rem)] leading-[1.02]">{text}</h2>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </div>
        <L href={action.href} className="type-body shrink-0 underline decoration-1 underline-offset-[6px] hover:decoration-2">{action.label}</L>
      </div>
    </section>
  )
  if (variant === 'loud') return (
    <section data-tone="inverse" className="px-(--gutter) py-[calc(var(--section-y)*0.7)]">
      <div className="mx-auto flex max-w-(--container) flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="type-display text-balance [font-size:clamp(2.2rem,6vw,5.5rem)] leading-[0.95]">{text}</h2>
          {note && <p className="type-utility mt-4 text-(--color-muted)">{note}</p>}
        </div>
        <L href={action.href} className="type-body shrink-0 self-start rounded-(--radius-button) bg-(--color-text) px-6 py-3 text-(--color-background) md:self-auto">{action.label}</L>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*0.35)]">
      <div className="mx-auto flex max-w-(--container) flex-col gap-6 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <h2 className="type-heading text-balance [font-size:clamp(1.3rem,2.4vw,2rem)]">{text}</h2>
          {note && <p className="type-utility mt-2 text-(--color-muted)">{note}</p>}
        </div>
        <L href={action.href} className="type-body shrink-0 self-start rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-on-primary,var(--color-background)) md:self-auto">{action.label}</L>
      </div>
    </section>
  )
}
