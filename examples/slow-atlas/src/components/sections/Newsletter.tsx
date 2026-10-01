import { CutReveal } from '@/components/pieces/CutReveal'
import { SubscribeForm } from '@/components/site/SubscribeForm'
// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
export function NewsletterSection({ as = 'h2', title, text, placeholder, button, note, action, label = 'Email address' }: { as?: 'h1' | 'h2'; title: string; text: string; placeholder: string; button: string; note?: string; action?: string; label?: string }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <CutReveal as={as} className="type-heading text-balance [font-size:clamp(2rem,4vw,3.5rem)]">{title}</CutReveal>
          <p className="type-body mt-5 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <SubscribeForm action={action} placeholder={placeholder} button={button} label={label} note={note} />
        </div>
      </div>
    </section>
  )
}
