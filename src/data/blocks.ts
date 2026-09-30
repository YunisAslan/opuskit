// Ready section code: every content section (all but navbar, hero and footer, which the recipe's own patterns
// define) ships as a React component in the Build Package's src/components/sections/. Written by OpusKit, tokens only —
// the builder passes real copy and media through props and adjusts proportions to the recipe layout.
import type { HeroId, SectionId } from '@/types/domain'

export type Block = { file: string; exportName: string; usage: string }
type ContentSection = Exclude<SectionId, 'navbar' | 'hero'>

const b = (file: string, usage: string): Block => ({ file: `${file}.tsx`, exportName: `${file}Section`, usage })

export const blocks: Record<ContentSection, Block> = {
  intro: b('Intro', '<IntroSection label="Studio" statement="…" body="…" />'),
  manifesto: b('Manifesto', '<ManifestoSection statement="…" attribution="…" />'),
  'featured-work': b('FeaturedWork', '<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />'),
  'case-study': b('CaseStudy', '<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />'),
  services: b('Services', '<ServicesSection title="Services" items={[{ name, line }]} />'),
  process: b('Process', '<ProcessSection title="How we work" steps={[{ name, text, duration }]} />'),
  'how-it-works': b('HowItWorks', '<HowItWorksSection title steps={[{ name, text, image, alt }]} />'),
  about: b('About', '<AboutSection title="About" image alt statement bio />'),
  gallery: b('Gallery', '<GallerySection photos={[{ src, alt, caption }]} />'),
  'editorial-story': b('EditorialStory', '<EditorialStorySection title image alt caption paragraphs={[…]} />'),
  testimonials: b('Testimonials', '<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />'),
  team: b('Team', '<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />'),
  stats: b('Stats', '<StatsSection title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />'),
  clients: b('Clients', '<ClientsSection title="Clients" names={["…"]} />'),
  menu: b('Menu', '<MenuSection title="Menu" groups={[{ name, items: [{ name, description, price }] }]} />'),
  reservation: b('Reservation', '<ReservationSection title text hours={["…"]} phone bookingUrl="https://…" />'),
  location: b('Location', '<LocationSection title address hours={["…"]} notes mapUrl image alt />'),
  collection: b('Collection', '<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />'),
  lookbook: b('Lookbook', '<LookbookSection looks={[{ number: "01", image, alt, detail, pieces: "…" }]} />'),
  'product-grid': b('ProductGrid', '<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />'),
  'product-highlight': b('ProductHighlight', '<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />'),
  'feature-grid': b('FeatureGrid', '<FeatureGridSection title features={[{ name, text, image, alt }]} />'),
  pricing: b('Pricing', '<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />'),
  faq: b('Faq', '<FaqSection title="Questions" items={[{ q, a }]} />'),
  journal: b('Journal', '<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />'),
  'contact-cta': b('ContactCta', '<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />'),
  chapters: b('ColourChapters', '<ColourChaptersSection chapters={[{ eyebrow, title, text, media: { src, alt, video }, sticker: { src, alt } }]} />'),
  footer: b('Footer', '<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />'),
}

/** Ready code for first screens that have it (the others are built from the hero pattern in the recipe). */
export const heroBlocks: Partial<Record<HeroId, Block>> = {
  'orbit-stickers': { file: 'OrbitHero.tsx', exportName: 'OrbitHeroSection', usage: '<OrbitHeroSection eyebrow loud="Everything" quiet="moves" line items={[{ src, alt, size, tilt }]} />' },
}

export const blockFor = (id: SectionId): Block | undefined => (blocks as Partial<Record<SectionId, Block>>)[id]
