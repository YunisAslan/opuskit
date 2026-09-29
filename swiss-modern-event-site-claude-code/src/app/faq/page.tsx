import type { Metadata } from "next"
import { SectionHeader } from "@/components/SectionHeader"
import { FaqList, type Faq } from "@/components/FaqList"

export const metadata: Metadata = { title: "FAQ", description: "Tickets, dress, children, dogs, weather and access at the Sheki Polo Weekend." }

const faqs: Faq[] = [
  { id: "cost", q: "Does it cost anything to attend?", a: "No. Seats on the lawn and lunch in the clubhouse are free for invited guests and members. Reply once per party so we can plan food and shuttles." },
  { id: "dress", q: "What should I wear?", a: "Summer day dress: linen, cotton, a hat. Flat or block heels are best on grass, and you will need them for the divot stomp at half-time. Bring a layer for the evening." },
  { id: "children", q: "Can I bring children?", a: "Yes. Children under 12 need no RSVP of their own but count towards your party size. There is a shaded family area by the horse lines." },
  { id: "dogs", q: "Are dogs allowed?", a: "Only assistance dogs. Horses and dogs do not mix well on a match day." },
  { id: "weather", q: "What happens if it rains?", a: "Polo is played in light rain. In heavy rain the day moves to the covered arena and the clubhouse; we email everyone by 08:00." },
  { id: "access", q: "Is the ground step-free?", a: "The west lawn, clubhouse and toilets are step-free on firm matting. Golf buggies run from the east gate. Tell us your needs in the RSVP and we will reserve a viewing place." },
  { id: "change", q: "Can I change or cancel my RSVP?", a: "Yes, reply to your confirmation email up to 48 hours before the day. Someone else is waiting for your seat." },
  { id: "photos", q: "Can I take photographs?", a: "Yes, for personal use. No flash near the horses, and no drones: the airspace above the ground is closed." },
]

export default function FAQPage() {
  return (
    <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
      <SectionHeader as="h1" label="FAQ" lines={["Before you", "reply"]} />
      <div className="grid-page mt-16 lg:mt-24">
        <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-4">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  )
}
