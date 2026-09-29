import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"
import { site } from "@/config/site"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy Policy"
      lines={["What we keep,", "and why"]}
      updated="29 September 2026"
      sections={[
        { h: "What we collect", p: ["When you reply, we keep your name, email address, the day you chose, your arrival time, party size and any dietary or access notes you give us. When you write to us, we keep your message and contact details."] },
        { h: "How we use it", p: ["We use your details to plan seating, food, shuttles and access on the day, and to send your confirmation and any changes to the programme. We do not sell your details or use them for advertising."] },
        { h: "Who sees it", p: ["The event office, the catering team (dietary notes only) and the shuttle operator (party size only). Each works under a written agreement and deletes your details after the event."] },
        { h: "How long we keep it", p: ["RSVP details are deleted by 31 August 2027. Account details are kept until you delete your account."] },
        { h: "Your rights", p: [`You can ask to see, correct or delete your details at any time. Write to ${site.email} and we will reply within 30 days.`] },
      ]}
    />
  )
}
