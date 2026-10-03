import { Chapter } from "@/components/Chapter";
import { MediaAsset } from "@/components/MediaAsset";
import { Lines } from "@/components/Lines";
import { QuickBuy } from "@/components/QuickBuy";
import { HomePricing } from "@/components/HomePricing";
import { BuyButton } from "@/components/Buy";
import { MotionSiteLink, SiteLink } from "@/components/SiteLink";
import { Magnetic } from "@/components/pieces/Magnetic";
import { Badge } from "@/components/ui/badge";
import { ProductHighlightSection } from "@/components/sections/ProductHighlight";
import { FeatureRowsSection } from "@/components/sections/FeatureRows";
import { PressSection } from "@/components/sections/Press";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { TrustSection } from "@/components/sections/Trust";
import { ContactCtaSection } from "@/components/sections/ContactCta";
import { builds, email, usd } from "@/config/product";

const specs = [
  { label: "Layout", value: "65%, 67 keys" },
  { label: "Case", value: "Aluminium" },
  { label: "Switches", value: "Hot-swap" },
  { label: "Ships", value: "In 5 days" },
];

function Hero() {
  return (
    <section className="px-5 pt-24 md:px-10 md:pt-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:grid md:grid-cols-12 md:items-center md:gap-x-8 md:gap-y-10">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Chapter as="h1" effect slot={{ className: "size-[clamp(2.25rem,6vw,5rem)]", rotate: -8, first: true }} className="type-display whitespace-nowrap">Halvik 65</Chapter>
          <div>
            <p className="type-heading text-balance [font-size:clamp(1.15rem,1.6vw,1.4rem)]">A small keyboard, made to stay on your desk.</p>
            <div className="mt-5 hidden flex-wrap items-center gap-5 md:flex">
              <Magnetic><BuyButton preset={{ build: "complete" }}>Add to bag</BuyButton></Magnetic>
              <p className="type-body"><span className="type-heading">{usd(builds.complete.price)}</span> <span className="text-(--color-muted)">or {usd(builds.barebones.price)} barebones</span></p>
            </div>
          </div>
        </div>
        {/* Product stage: phones show it first, cropped in on the top rows of keys (the photo's one sharp band;
            right-anchored, as the board runs off the photo's right edge). Tablet and desktop frame it beside the name,
            in a smaller frame, barely zoomed, so the shallow-focus photo is never magnified past what it holds. */}
        <MediaAsset id="hero" priority sizes="(min-width: 1024px) 50vw, (min-width: 768px) 75vw, 100vw" frameClassName="order-first aspect-[4/3] md:order-none md:col-span-5 md:aspect-square lg:aspect-[5/4]"
          className="object-[100%_0%] origin-[100%_15%] scale-[1.3] md:object-[100%_30%] md:origin-[100%_25%] md:scale-[1.08]" />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:col-span-12 lg:grid-cols-4">
          {specs.map((s) => (
            <li key={s.label} className="bg-(--color-background) px-5 py-4">
              <p className="type-utility text-(--color-muted)">{s.label}</p>
              <p className="type-heading mt-1 [font-size:clamp(1rem,1.3vw,1.15rem)]">{s.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProductHighlightSection link={SiteLink} image="product" imageClassName="object-[50%_60%]"
        name={<Chapter effect slot={{ className: "size-[clamp(2.75rem,4.5vw,4.5rem)]", rotate: 12 }} className="type-display [font-size:clamp(2.2rem,3.8vw,3.5rem)]" aside={<Badge variant="secondary" className="self-start">New</Badge>}>Fern green</Chapter>}
        text="The case is machined from one block of aluminium, then powder-coated a soft fern green that hides fingerprints. It sits on a cork base, so it stays put and sounds low."
        details={[
          { label: "Case", value: "6063 aluminium, powder-coated" },
          { label: "Size", value: "318 × 110 × 32 mm" },
          { label: "Weight", value: "1.6 kg, built" },
          { label: "Keycaps", value: "Double-shot PBT" },
        ]}>
        <QuickBuy id="home-qb" />
      </ProductHighlightSection>
      <FeatureRowsSection link={MotionSiteLink}
        title={<Chapter effect slot={{ className: "size-12", rotate: -4 }} className="type-heading max-w-[24ch]">Three things you feel every day</Chapter>}
        rows={[
          { name: "A 6.5° typing angle", text: "The slope is in the case itself, so there are no feet to fold out or lose. Your wrists stay low and the board stays flat on the desk.", image: "row1", imageClassName: "object-[50%_60%]", link: { label: "See every feature", href: "/features" } },
          { name: "The Halvik Dial", text: "Sixteen keys and three aluminium knobs for volume, scrubbing and zoom. Buy it with the keyboard, or on its own for the keyboard you have.", image: "row2", link: { label: "Add the Dial", href: "#buy?dial=1" } },
          { name: "Hot-swap switches", text: "Every switch pulls straight out with the tool in the box. Try a new feel in ten minutes, without solder.", image: "row3", link: { label: "How swapping works", href: "/features#how" } },
        ]} />
      <PressSection title="Press"
        quotes={[
          { outlet: "Keyline Weekly", quote: "A small board that feels heavier than it looks, in the best way." },
          { outlet: "Desk Notes", quote: "The cork base is a quiet stroke of genius. Nothing slides, nothing rattles." },
          { outlet: "Plate & Switch", quote: "Swapping all 67 switches took me twelve minutes. The Dial stayed on my desk." },
        ]}
        awards={["Desk Notes Editor’s Pick, 2026"]} />
      <TestimonialsSection title="What people say"
        quotes={[
          { quote: "I bought it for the colour and kept it for the sound. It’s the first keyboard I haven’t wanted to replace.", name: "Maren Holt", role: "illustrator" },
          { quote: "The angle fixed my wrists more than any rest I tried.", name: "Tomás Ferreira", role: "backend developer" },
          { quote: "I swapped to silent switches for the office in one lunch break.", name: "Aiko Brandt", role: "product designer" },
          { quote: "The Dial runs my timeline. I don’t touch the mouse to scrub anymore.", name: "Jonah Reyes", role: "video editor" },
        ]} />
      <HomePricing />
      <TrustSection items={[
        { title: "Free shipping", text: "On every order over $150." },
        { title: "30-day returns", text: "Free, in the original box." },
        { title: "2-year warranty", text: "Case, board and knobs." },
        { title: "Ships in 5 days", text: "Tracked, from our workshop." },
      ]} />
      <ContactCtaSection link={SiteLink}
        headline={<Lines lines={["Your desk,", "a little calmer."]} className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]" />}
        action={{ label: "Add to bag", href: "#buy?build=complete" }} email={email} />
    </>
  );
}
