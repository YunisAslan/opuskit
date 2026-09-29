'use client'
// A ready section rendered for real, with sample content, in a plan's tokens — the same component a Build Package ships.
import type { ReactNode } from 'react'
import { ScaledFrame } from '@/components/ScaledFrame'
import { TokenScope } from '@/components/TokenScope'
import { AboutSection } from '@/sections/About'
import { CaseStudySection } from '@/sections/CaseStudy'
import { ClientsSection } from '@/sections/Clients'
import { CollectionSection } from '@/sections/Collection'
import { ContactCtaSection } from '@/sections/ContactCta'
import { ColourChaptersSection } from '@/sections/ColourChapters'
import { FooterSection } from '@/sections/Footer'
import { OrbitHeroSection } from '@/sections/OrbitHero'
import { STICKERS } from '@/components/PieceDemo'
import { EditorialStorySection } from '@/sections/EditorialStory'
import { FaqSection } from '@/sections/Faq'
import { FeatureGridSection } from '@/sections/FeatureGrid'
import { FeaturedWorkSection } from '@/sections/FeaturedWork'
import { GallerySection } from '@/sections/Gallery'
import { HowItWorksSection } from '@/sections/HowItWorks'
import { IntroSection } from '@/sections/Intro'
import { JournalSection } from '@/sections/Journal'
import { LocationSection } from '@/sections/Location'
import { LookbookSection } from '@/sections/Lookbook'
import { ManifestoSection } from '@/sections/Manifesto'
import { MenuSection } from '@/sections/Menu'
import { PricingSection } from '@/sections/Pricing'
import { ProcessSection } from '@/sections/Process'
import { ProductGridSection } from '@/sections/ProductGrid'
import { ProductHighlightSection } from '@/sections/ProductHighlight'
import { ReservationSection } from '@/sections/Reservation'
import { ServicesSection } from '@/sections/Services'
import type { PaletteColors, SectionId, ShapeStyle, TypographyPairing } from '@/types/domain'

// Real photos already on disk (example sites' media).
const S = '/examples/swiss-modern-event-site-claude-code/media/photos/'
const C = '/examples/cheeky911/media/yourPhotos-'
const ph = ['arena', 'box', 'chestnut', 'gallop', 'groom', 'herd', 'jump', 'palomino', 'ponies', 'rider-grey', 'stables'].map((n) => `${S}${n}.jpg`)
const car = [1, 2, 3, 4, 5, 6, 7, 9].map((n) => `${C}${n}.jpg`)
const a = { href: '#', label: 'Book a visit' }

function sample(id: SectionId | 'orbit-hero'): ReactNode {
  switch (id) {
    case 'orbit-hero': return <OrbitHeroSection eyebrow="What we do" loud="All" quiet="in motion" line="Brands, people, attention — we set them moving." items={[...STICKERS, ...car.slice(0, 4), ...STICKERS.slice(0, 3)].map((src, i) => ({ src, alt: '', size: src.endsWith('.svg') ? 130 : 110, tilt: [-8, 6, -4, 10, -6, 4][i % 6] }))} />
    case 'chapters': return <ColourChaptersSection chapters={[{ eyebrow: 'Hard story? Easily told.', title: 'Animation', text: 'A technical process, a new product, a story even you are not sure about yet — we turn it into pictures people understand and remember.', media: { src: ph[8], alt: '' }, sticker: { src: STICKERS[0], alt: '' } }, { eyebrow: 'No talk. All pictures.', title: 'Video', text: 'Video should not just look good. It should do something.', media: { src: ph[4], alt: '' }, sticker: { src: STICKERS[3], alt: '' } }]} />
    case 'footer': return <FooterSection logo={<span className="type-display [font-size:5rem] italic">Studio</span>} columns={[{ title: 'Navigation', links: [{ label: 'About', href: '#' }, { label: 'Work', href: '#', current: true }, { label: 'Contact', href: '#' }] }, { title: 'Contact', links: [{ label: 'hello@example.com', href: '#' }, { label: '+31 13 000 00', href: '#' }] }, { title: 'Socials', links: [{ label: 'Instagram', href: '#' }, { label: 'Vimeo', href: '#' }] }]} legal={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]} copyright="© 2026 Studio" />
    case 'intro': return <IntroSection label="The studio" statement="We design small timber houses for steep, snowy ground — and stay until the first winter is over." body="Eleven people in a converted sawmill above Bolzano. Twenty-three houses since 2014." />
    case 'manifesto': return <ManifestoSection statement="Nothing we make should need explaining twice." attribution="From our first brief, 2014" />
    case 'featured-work': return <FeaturedWorkSection title="Selected work" projects={[{ title: 'Casa Larice', meta: '2024 · House', image: ph[10], alt: '', href: '#1' }, { title: 'Hut 7', meta: '2023 · Refuge', image: ph[4], alt: '', href: '#2' }, { title: 'The Barn', meta: '2022 · Studio', image: ph[0], alt: '', href: '#3' }]} />
    case 'case-study': return <CaseStudySection title="Casa Larice" image={ph[3]} alt="" facts={[{ label: 'Client', value: 'The Weiss family' }, { label: 'Role', value: 'Design, build' }, { label: 'Outcome', value: 'Passive house' }]} paragraphs={['A family of five, a site at 1,400 m, and a budget fixed before the land was bought.', 'We kept to one roof, one material and one stove.', 'Heating costs are a third of the valley average.']} />
    case 'services': return <ServicesSection title="What we do" items={[{ name: 'Houses', line: 'Timber homes on difficult sites' }, { name: 'Refuges', line: 'Mountain huts and shelters' }, { name: 'Renovation', line: 'Old barns, kept honest' }, { name: 'Furniture', line: 'Built-ins from the same wood' }]} />
    case 'process': return <ProcessSection title="How we work" steps={[{ name: 'Walk the site', text: 'A full day on the land before any drawing.', duration: '1 day' }, { name: 'One model', text: 'A single timber model, not renderings.', duration: '3 weeks' }, { name: 'Build', text: 'Our own carpenters, start to finish.', duration: '8 months' }]} />
    case 'how-it-works': return <HowItWorksSection title="From sketch to keys in three steps" steps={[{ name: 'Tell us about the land', text: 'Photos and a rough plot are enough.', image: ph[5], alt: '' }, { name: 'Choose a plan', text: 'Three plans, all adaptable.', image: ph[8], alt: '' }, { name: 'We build', text: 'Fixed price, fixed date.', image: ph[1], alt: '' }]} />
    case 'about': return <AboutSection title="About" image={ph[4]} alt="" statement="Lena and Tomas started with one hut and a borrowed truck." bio="Ten years later the studio is eleven people, two dogs and a workshop that smells of larch." />
    case 'gallery': return <GallerySection title="The season" photos={ph.slice(0, 7).map((src, i) => ({ src, alt: '', caption: i % 3 === 0 ? 'Sheki, June' : undefined }))} />
    case 'editorial-story': return <EditorialStorySection title="The horses arrive two weeks early" image={ph[9]} alt="" caption="Morning exercise on the lower field" paragraphs={['Every June the grooms bring the strings down from the hills a fortnight before the first chukka.', 'The field is cut short, rolled twice and left to rest.']} />
    case 'clients': return <ClientsSection title="Played with" names={['Sheki Polo Club', 'Caspian Riders', 'Ganja Stud', 'Lankaran Equestrian', 'Baku Hunt', 'Quba Farms', 'Zaqatala Grooms', 'Old Town Saddlery']} />
    case 'menu': return <MenuSection title="Tonight" groups={[{ name: 'Small', items: [{ name: 'Charred leeks', description: 'hazelnut, brown butter', price: '9' }, { name: 'Smoked trout', description: 'dill, rye', price: '12' }] }, { name: 'Large', items: [{ name: 'Lamb shoulder', description: 'for two, slow fire', price: '48' }, { name: 'Celeriac', description: 'salt-baked, walnut', price: '19' }] }]} note="Menu changes daily." />
    case 'reservation': return <ReservationSection title="Book a table" text="Twelve seats, one sitting a night." hours={['Wed–Sat, 19:00', 'Closed Sun–Tue']} phone="+994 12 000 00 00" bookingUrl="#" />
    case 'location': return <LocationSection title="Find us" address={'12 Istiglal Street\nSheki, Azerbaijan'} hours={['Gates open 10:00', 'First chukka 14:00']} notes="Parking on the upper field." mapUrl="#" image={ph[0]} alt="" />
    case 'collection': return <CollectionSection season="Summer 2027" title="The Field" text="Linen and waxed cotton for long days outdoors." image={ph[6]} alt="" pieces={ph.slice(1, 4).map((src, i) => ({ name: ['Field jacket', 'Riding shirt', 'Canvas bag'][i], price: ['€240', '€110', '€90'][i], image: src, alt: '', href: `#${i}` }))} />
    case 'lookbook': return <LookbookSection looks={[{ number: '01', image: ph[4], alt: '', detail: ph[1], pieces: 'Field jacket, riding shirt' }]} />
    case 'product-grid': return <ProductGridSection title="Shop" products={car.slice(0, 8).map((src, i) => ({ name: `911 print ${i + 1}`, price: `€${40 + i * 5}`, image: src, alt: '', href: `#${i}`, soldOut: i === 2 }))} />
    case 'product-highlight': return <ProductHighlightSection name="Print No. 4" text="Giclée on cotton rag, signed and numbered." image={car[3]} alt="" details={[{ label: 'Size', value: '50 × 70 cm' }, { label: 'Edition', value: '25' }, { label: 'Paper', value: 'Hahnemühle 308 g' }]} action={{ label: 'Add to bag', href: '#' }} />
    case 'feature-grid': return <FeatureGridSection title="Everything the evening needs" features={[{ name: 'Seats by RSVP', text: 'No tickets, no queues.' }, { name: 'Shuttle from Baku', text: 'Twice a day, both days.' }, { name: 'Grass-ground polo', text: 'Four chukkas a match.' }]} />
    case 'pricing': return <PricingSection title="Seats" plans={[{ name: 'Field', price: '€40', period: 'day', features: ['Standing, field side', 'Picnic allowed'], action: a }, { name: 'Stand', price: '€90', period: 'day', features: ['Covered seat', 'Lunch included', 'Shuttle'], action: a, recommended: true }, { name: 'Club', price: '€220', period: 'weekend', features: ['Both days', 'Dinner', 'Paddock visit'], action: a }]} />
    case 'faq': return <FaqSection title="Questions" items={[{ q: 'What should I wear?', a: 'Flat shoes for the divot stomp.' }, { q: 'Can I bring children?', a: 'Yes, under 12s go free.' }, { q: 'Is there parking?', a: 'On the upper field, free.' }]} />
    case 'journal': return <JournalSection title="Journal" entries={[{ title: 'Why the season starts in June', date: '2 May', category: 'Field notes', href: '#1', image: ph[3], alt: '' }, { title: 'Meet the grooms', date: '18 Apr', category: 'People', href: '#2', image: ph[4], alt: '' }, { title: 'A short history of the ground', date: '3 Apr', category: 'History', href: '#3', image: ph[0], alt: '' }]} />
    case 'contact-cta': return <ContactCtaSection headline="Something to set" quiet="in motion?" action={{ label: 'Tell us your story', href: '#' }} email="hello@example.com" inverse />
    default: return null
  }
}

export function SectionPreview({ id, colors, type, shape, chapters, className, auto, maxHeight, width }: { id: SectionId | 'orbit-hero'; colors: PaletteColors; type: TypographyPairing; shape: ShapeStyle; chapters?: readonly string[]; className?: string; auto?: boolean; maxHeight?: number; width?: number }) {
  return (
    <ScaledFrame className={className} auto={auto} maxHeight={maxHeight} width={width}>
      <TokenScope colors={colors} type={type} shape={shape} chapters={chapters}>{sample(id)}</TokenScope>
    </ScaledFrame>
  )
}
