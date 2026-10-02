import type { Metadata } from "next";
import { Chapter } from "@/components/Chapter";
import { Lines } from "@/components/Lines";
import { QuickBuy } from "@/components/QuickBuy";
import { SiteLink } from "@/components/SiteLink";
import { FeatureGridSection } from "@/components/sections/FeatureGrid";
import { HowItWorksSection } from "@/components/sections/HowItWorks";
import { ProductHighlightSection } from "@/components/sections/ProductHighlight";
import { ContactCtaSection } from "@/components/sections/ContactCta";
import { email } from "@/config/product";

export const metadata: Metadata = {
  title: "Features",
  description: "What Halvik 65 is made of: a machined aluminium case with a 6.5° angle, hot-swap sockets, double-shot PBT keycaps and the Halvik Dial.",
};

export default function Features() {
  return (
    <>
      <FeatureGridSection first
        title={<Chapter as="h1" effect slot={{ className: "size-[clamp(2.25rem,5vw,4.5rem)]", rotate: -8, first: true }} className="type-display [font-size:clamp(2.5rem,6vw,5.5rem)]">Made of six things</Chapter>}
        intro="No screens, no lights, no app to install. Just the parts that make a keyboard good to type on, done properly."
        features={[
          { name: "Machined aluminium case", text: "One block of 6063 aluminium, powder-coated fern green. It weighs 1.6 kg, so it never walks across the desk.", image: "product", imageClassName: "object-[50%_70%]" },
          { name: "A 6.5° angle, built in", text: "The slope is part of the case. No feet to fold out, nothing to break off.", image: "row1", imageClassName: "object-[50%_62%]" },
          { name: "Hot-swap sockets", text: "Five-pin sockets take almost any MX-style switch. Pull one out, push one in.", image: "row3" },
          { name: "65%, arrows kept", text: "67 keys: no number row lost, no arrow keys hidden behind a layer.", image: "product2", imageClassName: "object-[45%_45%]" },
          { name: "Double-shot PBT keycaps", text: "Cream letters, grey modifiers. The legends are moulded in, so they never wear off.", image: "hero", imageClassName: "object-[62%_45%]" },
          { name: "The Halvik Dial", text: "A sixteen-key pad with three knobs, sold with the keyboard or on its own.", image: "row2" },
        ]} />
      <HowItWorksSection id="how"
        title={<Chapter effect slot={{ className: "size-12", rotate: 6 }} className="type-heading max-w-[24ch]">From box to typing in ten minutes</Chapter>}
        steps={[
          { name: "Pick your switches", text: "Choose linear, tactile or silent, or pull them all and fit your own.", image: "row3", imageClassName: "object-[55%_50%]" },
          { name: "Plug in USB-C", text: "It works on Mac, Windows and Linux at once. One switch on the back sets the modifier keys.", image: "hero", imageClassName: "object-[70%_55%]" },
          { name: "Remap in the browser", text: "Open the Halvik page in Chrome or Edge to remap any key or knob. Nothing to install.", image: "row2", imageClassName: "object-[65%_50%]" },
        ]} />
      <ProductHighlightSection link={SiteLink} image="product2" imageClassName="object-[40%_45%]"
        name={<Chapter slot={{ className: "size-[clamp(2.75rem,5vw,5rem)]", rotate: 14 }} className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">Up close</Chapter>}
        text="Every edge is rounded and bead-blasted before coating, so nothing feels sharp under your palms. Under the caps, a polycarbonate plate and two layers of foam keep the sound low and soft."
        details={[
          { label: "Plate", value: "Polycarbonate" },
          { label: "Sockets", value: "5-pin hot-swap" },
          { label: "Connection", value: "USB-C, 1.8 m braided cable" },
          { label: "Works with", value: "Mac, Windows, Linux" },
        ]}>
        <QuickBuy id="features-qb" withLayout />
      </ProductHighlightSection>
      <ContactCtaSection link={SiteLink}
        headline={<Lines lines={["Ready when", "you are."]} className="type-display [font-size:clamp(2.75rem,8vw,7.5rem)]" />}
        action={{ label: "Add to bag", href: "#buy?build=complete" }} email={email} />
    </>
  );
}
