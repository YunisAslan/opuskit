import type { ElementType } from 'react'
// OpusKit section — CTA band: a slim mid-page offer — one line and one action — that keeps the page going rather than ending it.
export function CtaBandSection({ link: L = 'a', text, action, note }: { link?: ElementType; text: string; action: { label: string; href: string }; note?: string }) {
  return (
    <section className="px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <h2 className="type-heading text-balance [font-size:clamp(1.3rem,2.4vw,2rem)]">{text}</h2>
          {note && <p className="type-utility mt-2 text-(--color-muted)">{note}</p>}
        </div>
        <L href={action.href} className="type-body shrink-0 self-start rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background) md:self-auto">{action.label}</L>
      </div>
    </section>
  )
}
