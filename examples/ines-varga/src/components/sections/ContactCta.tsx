// OpusKit section — Closing CTA, "Big invitation" (statement), made this site's own: the headline huge in the brush
// hand, the quiet second line in the heading hand, one action and the real email. A short marker arrow points from
// the quiet line to the action (annotations guide the eye). Home uses it on the surface tone to close the page.
import Link from 'next/link'
import { Draw, Lines } from '@/components/motion'
import { CopyEmail } from '@/components/site/CopyEmail'
import { buttonVariants } from '@/components/ui/button'

export function ContactCtaSection({ tone, headline, quiet, action }: {
  tone?: 'surface'; headline: string[]; quiet: string; action: { label: string; href: string }
}) {
  return (
    <section data-tone={tone} className="px-(--gutter) py-[calc(var(--section-y)*1.25)]">
      <div className="grid-site gap-y-10">
        <div className="col-span-full lg:col-span-10">
          <Lines lines={headline} className="type-display" />
          <p className="font-(family-name:--font-heading) mt-4 [font-size:clamp(1.75rem,3.4vw,3rem)] [font-weight:700] leading-[1.05]">{quiet}</p>
        </div>
        <Draw className="col-span-full flex flex-wrap items-center gap-x-8 gap-y-5">
          <svg viewBox="0 0 80 40" aria-hidden className="hidden h-10 w-20 shrink-0 overflow-visible text-(--color-accent) md:block">
            <path data-stroke pathLength={1} d="M4 6 C 14 30, 40 34, 70 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
            <path data-stroke pathLength={1} d="M60 16 L 72 24 L 60 31" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ '--d': 600 } as React.CSSProperties} />
          </svg>
          <Link href={action.href} className={buttonVariants({ size: 'lg' })}>{action.label}</Link>
          <CopyEmail className="type-body" />
        </Draw>
      </div>
    </section>
  )
}
