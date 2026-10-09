import { NewsletterForm } from '@/components/forms/NewsletterForm'
// OpusKit section — Newsletter, fitted to Kelp Line: one reason to subscribe beside an email field and a button, with
// a plain note on how often. No mail service is connected yet, so the form opens the visitor's own email app with the
// sign-up note filled in — and says so. Phones: field and button stack, full width.
export function NewsletterSection({ tone, title, text, placeholder, button, note, to }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text: string; placeholder: string; button: string; note?: string; to: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame grid gap-10 border-t border-(--color-border) pt-12 md:grid-cols-12 md:items-end md:gap-x-(--gutter) md:pt-16">
        <div data-fade className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[48ch] text-(--color-muted)">{text}</p>
        </div>
        <div data-fade style={{ ['--i' as string]: 1 }} className="md:col-span-5 md:col-start-8">
          <NewsletterForm placeholder={placeholder} button={button} note={note} to={to} />
        </div>
      </div>
    </section>
  )
}
