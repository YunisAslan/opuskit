import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"
import { site } from "@/config/site"

export const metadata: Metadata = { title: "Accessibility" }

export default function AccessibilityPage() {
  return (
    <LegalPage
      label="Accessibility"
      lines={["Readable,", "by everyone"]}
      updated="29 September 2026"
      sections={[
        { h: "Our standard", p: ["We aim for WCAG 2.2 level AA across the site. Body text is black on white, every control works with a keyboard, and every form field has a visible label and an error message in words."] },
        { h: "Motion", p: ["If your device asks for reduced motion, the film at the top of the home page stops following your scroll and shows a still frame. You can play it with the Play film button. Other animations become simple fades or are removed."] },
        { h: "Known limits", p: ["The home page film has no speech and no captions. Its messages are also written in the page as text. Some photographs are temporary and their descriptions will be updated."] },
        { h: "On the day", p: ["The west lawn, clubhouse and toilets are step-free. Golf buggies run from the east gate. Assistance dogs are welcome. Tell us your needs in your RSVP."] },
        { h: "Report a problem", p: [`Write to ${site.email} or call ${site.phone}. Tell us the page and what went wrong; we reply within two working days.`] },
      ]}
    />
  )
}
