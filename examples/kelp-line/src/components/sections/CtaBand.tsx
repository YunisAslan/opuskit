import type { ElementType } from 'react'
import { buttonVariants } from '@/components/ui/button'
// OpusKit section — CTA band, fitted to Kelp Line: a slim full-width band in the inverse tone (pale ink as ground) —
// one line and one action that keep the page going rather than ending it. Phones: the line above the button.
export function CtaBandSection({ tone, link: L = 'a', text, action, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; text: string; action: { label: string; href: string }; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-[clamp(40px,5vw,72px)]">
      <div data-fade className="frame flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0">
          <h2 className="type-heading max-w-[34ch] text-balance">{text}</h2>
          {note && <p className="type-caption mt-2 text-(--color-muted)">{note}</p>}
        </div>
        <L href={action.href} className={`${buttonVariants()} self-start md:self-auto`}>{action.label}</L>
      </div>
    </section>
  )
}
