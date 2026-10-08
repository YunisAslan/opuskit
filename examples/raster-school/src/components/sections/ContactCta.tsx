// OpusKit section — Closing CTA, `statement`: the headline huge, one button and the real ways to reach the school.
// `tone="inverse"` ends the page on white with blue type. Fitted to Raster School: the headline runs eleven columns;
// the second line in the heading weight; under a hairline, the action on column 1 and the email, phone and address
// each on their own column line, the email copyable.
import { Section } from '@/components/site/SectionHead'
import { ApplyButton } from '@/components/site/Apply'
import { CopyEmail } from '@/components/site/CopyEmail'

export function ContactCtaSection({ tone, headline, quiet, action, email, phone, address }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'statement'; headline: string; quiet?: string
  action: { label: string; cohort?: string }; email?: string; phone?: string; address?: string
}) {
  return (
    <Section tone={tone} className="lg:py-[calc(var(--section-y)*1.25)]">
      <div className="raster">
        <h2 className="type-display col-span-4 sm:col-span-6 lg:col-span-11 [font-size:clamp(2.75rem,8vw,8rem)]">
          {headline}
          {quiet && <span className="type-heading mt-4 block [font-size:clamp(1.5rem,3.2vw,3rem)] leading-[1.05]">{quiet}</span>}
        </h2>
      </div>
      <div className="raster mt-12 items-center gap-y-6 border-t border-(--color-border) pt-6 lg:mt-20">
        <div className="col-span-4 sm:col-span-6 lg:col-span-3">
          <ApplyButton cohort={action.cohort} size="lg" className="w-full sm:w-auto">{action.label}</ApplyButton>
        </div>
        {email && <CopyEmail email={email} className="type-body col-span-4 sm:col-span-3 lg:col-span-3 lg:col-start-4" />}
        {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-body link-line col-span-4 flex min-h-11 items-center sm:col-span-3 lg:col-span-3 lg:col-start-7">{phone}</a>}
        {address && <p className="type-body col-span-4 sm:col-span-6 lg:col-span-3 lg:col-start-10">{address}</p>}
      </div>
    </Section>
  )
}
