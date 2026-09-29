import type { Metadata } from "next"
import { ContactForm } from "@/components/ContactForm"
import { LineReveal } from "@/components/Reveal"
import { site } from "@/config/site"

export const metadata: Metadata = { title: "Contact", description: `Write to ${site.email} or call ${site.phone}.` }

export default function ContactPage() {
  return (
    <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
      {/* Closing CTA: one headline, one action, a real contact detail */}
      <div className="grid-page gap-y-10">
        <p className="type-utility col-span-4 sm:col-span-6 lg:col-span-3 lg:pt-4">Contact</p>
        <div className="col-span-4 sm:col-span-6 lg:col-span-9">
          <LineReveal as="h1" lines={["Questions?", "Write to us."]} className="type-display" />
          <a
            href={`mailto:${site.email}`}
            className="font-display mt-12 flex min-h-16 items-center border-y border-text py-4 text-[clamp(1.125rem,4.2vw,3rem)] leading-none tracking-[-0.02em] break-all transition-colors duration-150 hover:bg-text hover:text-background sm:break-normal"
          >
            {site.email}
          </a>
          <p className="mt-6 text-muted">
            Or call <a href={site.phoneHref} className="text-text underline-offset-4 hover:underline">{site.phone}</a>, weekdays 09:00 to 18:00. We reply to every message within two working days.
          </p>
        </div>
      </div>

      <div className="grid-page mt-24 gap-y-10 border-t border-border pt-16 lg:mt-32">
        <h2 className="type-heading col-span-4 sm:col-span-6 lg:col-span-3">Or use the form</h2>
        <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-4">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
