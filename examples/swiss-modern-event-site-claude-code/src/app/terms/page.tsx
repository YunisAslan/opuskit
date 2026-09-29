import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms of Service"
      lines={["Terms of", "entry and use"]}
      updated="29 September 2026"
      sections={[
        { h: "Using this site", p: ["This site gives information about the Sheki Polo Weekend and lets invited guests reply. Do not use it to send spam, to reply for people without their consent, or to interfere with its operation."] },
        { h: "Your RSVP", p: ["An RSVP is a request for a seat, not a ticket. Your place is confirmed only by our confirmation email. Seats are personal and cannot be sold or transferred."] },
        { h: "On the ground", p: ["Follow the stewards' instructions at all times. Stay behind the boundary boards while play is on. The organisers may refuse entry or ask anyone to leave for safety reasons."] },
        { h: "Changes and cancellation", p: ["We may change the programme for weather, horse welfare or safety. If a day is cancelled, we tell you by email as early as we can. We are not liable for travel or hotel costs."] },
        { h: "Liability", p: ["Equestrian sport carries risk. Nothing in these terms limits liability that cannot be limited by law."] },
      ]}
    />
  )
}
