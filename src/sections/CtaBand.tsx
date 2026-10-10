import type { ElementType } from 'react'
// OpusKit section — CTA band: a slim mid-page offer — one line and one action — that keeps the page going rather than ending it.
export function CtaBandSection({ tone, link: L = 'a', text, action, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; text: string; action: { label: string; href: string }; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-[calc(var(--section-y)*0.35)]">
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
