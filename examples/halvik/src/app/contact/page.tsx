import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { ContactForm } from "@/components/ContactForm";
import { ContactCtaSection } from "@/components/sections/ContactCta";
import { FaqSection } from "@/components/sections/Faq";
import { email } from "@/config/product";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about Halvik 65 or the Halvik Dial? Write to hello@halvik.studio. We answer within one working day.",
};

export default function Contact() {
  return (
    <>
      <ContactCtaSection first email={email}
        headline={
          <div>
            <Chapter as="h1" effect slot={{ className: "size-[clamp(2.25rem,5vw,4.5rem)]", rotate: -8, first: true }} className="type-display text-balance [font-size:clamp(2.5rem,6.5vw,6rem)]">Ask us anything</Chapter>
            <p className="type-heading mt-4 [font-size:clamp(1.3rem,2.6vw,2.2rem)]">We answer within one working day.</p>
          </div>
        }>
        <ContactForm />
      </ContactCtaSection>
      <FaqSection id="faq"
        title={<Chapter effect slot={{ className: "size-10", rotate: 6 }} className="type-heading">Questions</Chapter>}
        items={[
          { q: "When will my order ship?", a: "Within five working days, tracked, from our workshop. You get the tracking link by email the day it leaves." },
          { q: "Can I use my own switches and keycaps?", a: "Yes. The sockets take any 3- or 5-pin MX-style switch, and any MX-stem keycap set for a 65% layout. The Barebones build comes without either." },
          { q: "Does it work with Mac and Windows?", a: "Both, and Linux too. A small switch on the back swaps the Command and Alt keys, so the modifiers sit where you expect." },
          { q: "Is there a wireless version?", a: "No, and on purpose: no battery to wear out, no pairing, no lag. It connects with the braided USB-C cable in the box." },
          { q: "How do I remap keys or the Dial’s knobs?", a: "Open the Halvik page in Chrome or Edge with the keyboard plugged in. Changes are saved on the keyboard itself, so they follow it to any computer." },
          { q: "What if it isn’t for me?", a: "Send it back within 30 days in the original box and we refund you in full. Return shipping is on us." },
          { q: "What does the warranty cover?", a: "Two years on the case, the board and the Dial’s knobs. Switches and keycaps are covered for one year." },
        ]} />
    </>
  );
}
