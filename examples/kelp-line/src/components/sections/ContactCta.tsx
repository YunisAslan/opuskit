// OpusKit section — Closing CTA, "details" design, fitted to Kelp Line: the headline left with its quiet second line in
// the serif; the ways to reach you set large on the right — email (with copy), phone, address — and one action, which
// opens the postcard. Phones: stacked, every way to reach us a large tap target.
import { CopyButton } from '@/components/forms/CopyEmail'
import { PostcardDialog } from '@/components/forms/Postcard'
import { Lines } from '@/components/motion/Lines'

export function ContactCtaSection({ tone, headline, mobileHeadline, quiet, action, email, phone, address }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; headline: string[]; mobileHeadline?: string[]; quiet?: string; action: { label: string }; email?: string; phone?: string; address?: string
}) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame grid gap-12 border-t border-(--color-border) pt-14 md:grid-cols-12 md:items-end md:gap-x-(--gutter) md:pt-20">
        <div className="md:col-span-7">
          <Lines lines={headline} mobile={mobileHeadline} className="type-hero" />
          {quiet && <p data-fade className="type-heading mt-6 text-(--color-muted)">{quiet}</p>}
        </div>
        <div data-fade className="space-y-6 md:col-span-5">
          {email && (
            <p className="flex items-center gap-2">
              <a href={`mailto:${email}`} className="type-heading link-line min-w-0 [overflow-wrap:anywhere]">{email}</a>
              <CopyButton value={email} label="Copy the email address" />
            </p>
          )}
          {phone && <p><a href={`tel:${phone.replace(/\s/g, '')}`} className="type-heading link-line inline-flex min-h-11 items-center tabular-nums">{phone}</a></p>}
          {address && <p className="type-body text-(--color-muted)">{address}</p>}
          <div className="pt-2"><PostcardDialog label={action.label} /></div>
        </div>
      </div>
    </section>
  )
}
