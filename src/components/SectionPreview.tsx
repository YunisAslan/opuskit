'use client'
// A ready section rendered for real, with sample content, in a plan's tokens — the same component a Build Package ships.
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { ScaledFrame } from '@/components/ScaledFrame'
import { TokenScope } from '@/components/TokenScope'
import { AboutSection } from '@/sections/About'
import { ArticleSection } from '@/sections/Article'
import { ProductBuySection } from '@/sections/ProductBuy'
import { SpecsSection } from '@/sections/Specs'
import { NameWallSection } from '@/sections/NameWall'
import { StatementSection } from '@/sections/Statement'
import { StepsSection } from '@/sections/Steps'
import { CaseStudySection } from '@/sections/CaseStudy'
import { CategoriesSection } from '@/sections/Categories'
import { CollectionSection } from '@/sections/Collection'
import { ContactCtaSection } from '@/sections/ContactCta'
import { CtaBandSection } from '@/sections/CtaBand'
import { ColourChaptersSection } from '@/sections/ColourChapters'
import { FooterSection } from '@/sections/Footer'
import { TimelineSection } from '@/sections/Timeline'
import { DonateSection } from '@/sections/Donate'
import { ListenSection } from '@/sections/Listen'
import { CurriculumSection } from '@/sections/Curriculum'
import { OrbitHeroSection } from '@/sections/OrbitHero'
import { STICKERS } from '@/components/PieceDemo'
import { EditorialStorySection } from '@/sections/EditorialStory'
import { FaqSection } from '@/sections/Faq'
import { FeatureGridSection } from '@/sections/FeatureGrid'
import { FeatureRowsSection } from '@/sections/FeatureRows'
import { FeaturedWorkSection } from '@/sections/FeaturedWork'
import { GallerySection } from '@/sections/Gallery'
import { JournalSection } from '@/sections/Journal'
import { LocationSection } from '@/sections/Location'
import { LookbookSection } from '@/sections/Lookbook'
import { MenuSection } from '@/sections/Menu'
import { NewsletterSection } from '@/sections/Newsletter'
import { PressSection } from '@/sections/Press'
import { PricingSection } from '@/sections/Pricing'
import { ProductGridSection } from '@/sections/ProductGrid'
import { ProductHighlightSection } from '@/sections/ProductHighlight'
import { ReservationSection } from '@/sections/Reservation'
import { ScheduleSection } from '@/sections/Schedule'
import { ServicesSection } from '@/sections/Services'
import { StatsSection } from '@/sections/Stats'
import { TeamSection } from '@/sections/Team'
import { TestimonialsSection } from '@/sections/Testimonials'
import { TrustSection } from '@/sections/Trust'
import type { FooterStyleId, LayoutId, MediaPlacement, PaletteColors, PurposeId, SectionId, SectionTone, ShapeStyle, TypographyPairing } from '@/types/domain'

// Real photos already on disk (example sites' media), one set per "world" so a preview looks like the user's kind of site.
// Lowfield Nights: 0 hangar inside, 1 outdoor screening, 2 audience, 3 coast at dusk, 4 hangar outside.
const ph = ['venue-1', 'venue-2', 'venue-3', 'venue-4', 'location'].map((n) => `/examples/lowfield-nights/media/${n}.jpg`)
const players = ['artist-1', 'artist-2', 'artist-3', 'artist-4'].map((n) => `/examples/lowfield-nights/media/${n}.jpg`)
// Brasshand (a branding studio): 0 menu card, 1 posters, 2 coffee bags, 3 record sleeves, 4 wayfinding, 5 bakery window, 6 studio.
const brand = ['work-1', 'work-2', 'work-3', 'work-4', 'work-5', 'work-6', 'studio'].map((n) => `/examples/brasshand/media/${n}.jpg`)
const brandPeople = ['team-1', 'team-2', 'team-3'].map((n) => `/examples/brasshand/media/${n}.jpg`)
// Hexmint (books for small studios): renders of its own screens.
const app = ['render-invoices', 'render-expenses', 'render-books', 'render-close', 'hero-poster'].map((n) => `/examples/hexmint/media/${n}.jpg`)
// Sticky Weather: colourful work for the sticker orbit.
const sticky = ['work-1', 'work-2', 'work-3', 'work-4'].map((n) => `/examples/sticky-weather/media/${n}.jpg`)
const fire = ['hero', 'dish-1', 'dish-2', 'dish-3', 'room-1', 'room-2', 'farm', 'location'].map((n) => `/examples/fennwood/media/${n}.jpg`)
const kb = ['hero', 'product', 'product-2', 'row-1', 'row-2', 'row-3'].map((n) => `/examples/halvik/media/${n}.jpg`)
// Halvik has no people: the product world's founders are two Unsplash portraits kept for the kit (credits in public/kit/SOURCES.md).
const founders = ['founder-1', 'founder-2'].map((n) => `/kit/people/${n}.jpg`)
// Saint Ashe: 0 look, 1 jacket, 2 tee, 3 coat, 4 trousers, 5 bag, 6 boots, 7 shop, 8 tall look, 9 turtleneck, 10 cap.
const shop = ['look-1', 'product-2', 'product-3', 'product-1', 'product-4', 'product-6', 'product-5', 'shop', 'look-3', 'product-7', 'product-8'].map((n) => `/examples/saint-ashe/media/${n}.jpg`)
const ashePeople = ['team-1', 'team-2', 'team-3'].map((n) => `/examples/saint-ashe/media/${n}.jpg`)

/** The kind of site a preview is dressed as. */
export type World = 'studio' | 'food' | 'shop' | 'product' | 'software' | 'event'
const WORLD_OF: Partial<Record<PurposeId, World>> = {
  portfolio: 'studio', agency: 'studio', studio: 'studio', 'personal-brand': 'studio', experiment: 'studio', blog: 'studio',
  restaurant: 'food', hotel: 'food', fashion: 'shop', ecommerce: 'shop', product: 'product', saas: 'software', course: 'software',
  event: 'event', nonprofit: 'event', clinic: 'event', 'real-estate': 'event',
}
export const worldFor = (purpose?: PurposeId): World => (purpose && WORLD_OF[purpose]) || 'studio'

type Step = { name: string; text: string }
type Copy = {
  img: string[]; /** Portraits for team/about when the world's photos have no people. */ people?: string[]; label: string; statement: string; body: string; manifesto: string; attribution: string
  work: string; projects: [string, string][]; caseTitle: string; facts: [string, string][]; story: [string, string, string]
  offer: string; services: [string, string][]; process: (Step & { duration: string })[]; how: Step[]; howTitle: string
  aboutStatement: string; bio: string; galleryTitle: string; editorial: { title: string; caption: string; paragraphs: string[] }
  clientsTitle: string; clients: string[]; features: Step[]; featuresTitle: string; plans: [string, string, string, string[]][]; pricingTitle: string
  faq: [string, string][]; journal: [string, string, string][]; cta: [string, string, string]
  quotes: [string, string, string][]; team: [string, string, string][]; stats: [string, string][]; statsNote: string
  where: { title: string; address: string; hours: string[]; notes: string }
  // Newer parts: rows/cats carry the index of their photo in `img`.
  rowsTitle: string; rows: [string, string, number, string?][]; news: [string, string, string, string]
  catsTitle: string; cats: [string, string, number][]; press: [string, string][]; awards: string[]
  band: [string, string, string]; trust: [string, string][]; scheduleTitle: string; days: [string, [string, string, string?][]][]
  toolsTitle: string; toolsText: string; tools: string[]
  timelineTitle: string; timeline: [string, string, string][]
}
const FOOTER_INDEX = [['Studio', ['About', 'Team', 'Careers', 'Contact']], ['Work', ['Identities', 'Campaigns', 'Packaging', 'Archive']], ['Journal', ['Notes', 'Craft', 'Studio life', 'All posts']], ['Elsewhere', ['Newsletter', 'Instagram', 'Are.na', 'Press kit']]]
  .map(([title, links]) => ({ title: title as string, links: (links as string[]).map((label, i) => ({ label, href: '#', current: title === 'Work' && i === 0 })) }))
// One product per world for the buy box, and the facts its Specs part lists.
const BUY: Record<World, { name: string; price: string; line: string; option: [string, string[]] }> = {
  studio: { name: 'Paper bag test, A2 print', price: '€45', line: 'Our test sheet, risograph-printed in two colours and signed by the three of us.', option: ['Size', ['A3', 'A2']] },
  food: { name: 'Wood-fire house blend', price: '€14', line: 'The coffee we pour after dinner — 250 g, roasted on Mondays.', option: ['Grind', ['Whole bean', 'Espresso', 'Filter']] },
  shop: { name: 'Narikala coat', price: '€640', line: 'Boiled wool, cut long and straight, made in a small run in Tbilisi.', option: ['Colour', ['Oat', 'Ink', 'Moss']] },
  product: { name: 'Halvik speaker', price: '€390', line: 'One room, one knob, a sound that fills it — no app to set up.', option: ['Finish', ['Chalk', 'Graphite']] },
  software: { name: 'Team plan', price: '€24 / month', line: 'Everything in Solo for up to ten people, billed once a month.', option: ['Billing', ['Monthly', 'Yearly']] },
  event: { name: 'Weekend pass', price: '€120', line: 'Both days, every stage, and the boat to the island on Sunday.', option: ['Day', ['Weekend', 'Saturday', 'Sunday']] },
}
const SPECS: Record<World, [string, [string, string][]]> = {
  studio: ['The project', [['Client', 'Salt & Ember'], ['Place', 'Lisbon'], ['Year', '2025'], ['Role', 'Name, identity, menus'], ['Team', 'Three people'], ['Length', 'Six weeks']]],
  food: ['The room', [['Seats', '40'], ['Counter', '12 seats'], ['Private room', 'Up to 14'], ['Kitchen', 'Wood fire'], ['Open', 'Tue–Sat, 18:00'], ['Dress', 'As you are']]],
  shop: ['Details', [['Fabric', '100% boiled wool'], ['Lining', 'Cupro'], ['Fit', 'Long, straight'], ['Length', '112 cm in size M'], ['Made in', 'Tbilisi'], ['Care', 'Dry clean']]],
  product: ['Specs', [['Size', '18 × 18 × 21 cm'], ['Weight', '2.1 kg'], ['Drivers', 'One 4" woofer, two tweeters'], ['Battery', '14 hours'], ['Connect', 'Bluetooth 5.3, line in'], ['In the box', 'Speaker, cable, a card']]],
  software: ['Limits', [['People', 'Up to 10'], ['Projects', 'Unlimited'], ['Storage', '200 GB'], ['History', '1 year'], ['Support', 'Within a day'], ['Data', 'Stored in the EU']]],
  event: ['The venue', [['Capacity', '1,200'], ['Stages', 'Three'], ['Doors', '16:00'], ['Last boat', '01:30'], ['Access', 'Step-free'], ['Age', 'All ages']]],
}
const W: Record<World, Copy> = {
  studio: {
    img: brand, people: brandPeople, label: 'The studio', statement: 'Names, identities and campaigns for food, music and culture — made by three people in one room.', body: 'A small branding studio. Thirty identities since 2019, most of them still in use.',
    manifesto: 'A good identity should still work on a paper bag.', attribution: 'From our first brief, 2019',
    work: 'Selected work', projects: [['Salt & Ember, a restaurant', '2025 · Identity'], ['Night Ferry festival', '2024 · Campaign'], ['Small Batch coffee', '2023 · Packaging']],
    caseTitle: 'Salt & Ember, a restaurant', facts: [['Client', 'A 40-seat restaurant'], ['Role', 'Name, identity, menus'], ['Outcome', 'Opened in March']], story: ['The kitchen had a fire before it had a name.', 'We drew one mark that works burnt into wood and printed on a receipt.', 'The menus are reprinted every week; the mark never changes.'],
    offer: 'What we do', services: [['Naming', 'Names that are easy to say and hard to forget'], ['Identity', 'A mark, type and colour that hold up everywhere'], ['Packaging', 'Bags, boxes and labels for small runs'], ['Campaigns', 'Posters and launches for culture']],
    process: [{ name: 'Listen', text: 'A day with you and your customers.', duration: '1 day' }, { name: 'One direction', text: 'One idea, argued properly, not a mood board.', duration: '2 weeks' }, { name: 'Make it real', text: 'Menus, signs, bags, the website.', duration: '4 weeks' }],
    howTitle: 'From brief to launch in three steps', how: [{ name: 'Tell us what it is', text: 'A few lines and a photo are enough.' }, { name: 'Pick a direction', text: 'Three routes, all adaptable.' }, { name: 'We make it', text: 'Fixed price, fixed date.' }],
    aboutStatement: 'Three of us, one long table and a drawer full of paper samples.', bio: 'We started with a bakery on our street; six years later we still say yes to the small ones.',
    galleryTitle: 'Recent work', editorial: { title: 'Why we test on a paper bag', caption: 'Proofs on the studio table', paragraphs: ['Every mark we draw gets printed on the cheapest bag we can find.', 'If it survives that, it survives anything.'] },
    clientsTitle: 'Worked with', clients: ['Salt & Ember', 'Night Ferry', 'Small Batch', 'Old Town Bakery', 'Low Tide Records', 'Harbour Museum', 'Long Table', 'Paper Moon'],
    featuresTitle: 'What every project includes', features: [{ name: 'One team', text: 'The same three people from brief to launch.' }, { name: 'Real tests', text: 'Printed, signed and worn before you see it.' }, { name: 'Every file', text: 'Masters and guidelines, yours to keep.' }],
    pricingTitle: 'Rates', plans: [['Name', '€1,800', 'project', ['A shortlist of five', 'Checks and domains']], ['Identity', '€6,500', 'project', ['Mark, type, colour', 'Two rounds', 'Guidelines']], ['Launch', '€12,000', 'project', ['Identity + campaign', 'Packaging', 'Website design']]],
    faq: [['Do you work outside the city?', 'Yes, most of our clients are elsewhere.'], ['Can you work with our printer?', 'Gladly — we send them the files ourselves.'], ['How soon can you start?', 'Usually within three weeks.']],
    journal: [['Why we test on a paper bag', '2 May', 'Notes'], ['Naming a ferry', '18 Apr', 'Craft'], ['A short history of our table', '3 Apr', 'Studio']],
    cta: ['Something to name', 'or make?', 'Tell us about it'],
    quotes: [['They gave our bakery a face people stop for.', 'Mira Holt', 'Old Town Bakery'], ['Calm in the room, exact on paper.', 'Jonas Reuter', 'Night Ferry'], ['The only studio that asked to see our receipts.', 'Ada Kern', 'Small Batch']],
    team: [['Leyla Aliyeva', 'Design', 'Draws the marks.'], ['Tural Mammadov', 'Words', 'Names things.'], ['Nigar Hasanova', 'Production', 'Talks to printers.'], ['Rauf Karimov', 'Strategy', 'Asks why first.']],
    stats: [['30', 'Identities since 2019'], ['6', 'Years together'], ['3', 'People'], ['1', 'Long table']], statsNote: 'Numbers from our own records, updated each season.',
    where: { title: 'Visit the studio', address: 'Studio 4, Old Town\nLisbon', hours: ['Mon–Fri, 10:00–18:00', 'By appointment'], notes: 'Ring the side door.' },
    rowsTitle: 'What a project gives you', rows: [['A name people can say', 'Short, easy to spell, and checked for domains and trademarks before you fall for it.', 0, 'See the names'], ['An identity that travels', 'One mark, one type family and a colour that works on a menu, a sign and a paper bag.', 2, 'See the identities'], ['Launch-ready files', 'Masters, guidelines and print-ready files for every piece, handed over at the end.', 4]],
    news: ['Notes from the table', 'One email a season: the work we finished and what we learned making it.', 'Subscribe', 'Four emails a year. Leave in one click.'],
    catsTitle: 'Browse the work', cats: [['Identities', '18 projects', 0], ['Campaigns', '7 projects', 1], ['Packaging', '9 projects', 2], ['Culture', '6 projects', 4]],
    press: [['Paper Moon', 'A studio that tests everything on a paper bag.'], ['Low Tide', 'The calmest branding studio in the Caucasus.'], ['Harbour Museum', 'They made our signs read from the far end of the hall.']], awards: ['Identity of the year, regional design prize 2025', 'Shortlisted, packaging prize 2024'],
    band: ['Booking spring projects now — two slots left.', 'Check dates', 'We reply within two days.'],
    trust: [['Fixed price', 'Agreed before we start.'], ['Every file', 'Masters and guidelines, yours.'], ['Two rounds', 'Of changes on every piece.'], ['Printed proofs', 'Before anything goes out.']],
    scheduleTitle: 'A project, week by week', days: [['Week one', [['Mon', 'Listening day', 'With you and your customers.'], ['Thu', 'Three routes']]], ['Weeks two and three', [['Mon', 'One direction'], ['Fri', 'Printed tests']]], ['Week six', [['Mon', 'Final files'], ['Fri', 'Launch', 'Every file, every format.']]]],
    toolsTitle: 'Delivered the way you work', toolsText: 'Files arrive ready for your printer, your website and your team.', tools: ['Guidelines PDF', 'Shared drives', 'Print-ready files', 'Web assets', 'Social templates', 'Colour swatches', 'Font licences', 'Signage specs', 'Packaging dielines'],
    timelineTitle: 'How we got here', timeline: [['2014', 'Two desks in a print shop', 'Posters for friends, paid in coffee.'], ['2017', 'First identity for a bank', 'Proof a small studio could carry a big brief.'], ['2021', 'A studio of eight', 'Naming, identity and campaigns under one roof.'], ['2026', 'Brands for three countries', 'Still drawn by hand first.']],
  },
  food: {
    img: fire, people: founders, label: 'Fennwood', statement: 'Cooked over one wood fire, with vegetables from two farms and bread from the same oven.', body: 'Forty seats, a menu that changes with the week, and a long table by the oven.',
    manifesto: 'One fire, cooked slowly.', attribution: 'Chalked above the oven',
    work: 'From the oven', projects: [['Embered vegetables', 'All week · Plate'], ['Oven bread', 'Every day · Bread'], ['Whole fish from the grill', 'Weekends · Main']],
    caseTitle: 'How the fire cooks', facts: [['Wood', 'Oak and apple'], ['Lit', '7 a.m.'], ['Out', 'After the last table']], story: ['Bread goes in at dawn while the bricks are hottest.', 'Vegetables follow, straight onto the embers.', 'By evening the fire has settled for fish and slow lamb.'],
    offer: 'On the menu', services: [['From the oven', 'Bread, flatbreads, roast vegetables'], ['From the grill', 'Whole fish, lamb, squash'], ['Small plates', 'What the farms sent this week'], ['Long table', 'The kitchen cooks for you']],
    process: [{ name: 'Book', text: 'Online, for up to six.', duration: '1 min' }, { name: 'Sit down', text: 'Bread first, always.', duration: '—' }, { name: 'Stay late', text: 'The fire keeps going.', duration: '—' }],
    howTitle: 'A table in three steps', how: [{ name: 'Pick a night', text: 'Wednesday to Sunday.' }, { name: 'Choose a time', text: 'From six until nine.' }, { name: 'Come in', text: 'Your table is by the fire.' }],
    aboutStatement: 'Ines and Karl built the oven before they built the dining room.', bio: 'Four years on, the bread still goes in at dawn and the menu still follows what the farms send.',
    galleryTitle: 'Around the fire', editorial: { title: 'The bread that comes out at dawn', caption: 'Monday’s first loaves', paragraphs: ['It started as a loaf for the staff.', 'Now every table starts with it, and the last ones go home in paper.'] },
    clientsTitle: 'You’ll find us in', clients: ['Weekend Table', 'City Plates', 'Night Guide', 'The Local', 'Slow Supper', 'Market Notes', 'Eat Here', 'Good Food Week'],
    featuresTitle: 'Every plate', features: [{ name: 'One fire', text: 'Everything touches the oven.' }, { name: 'Two farms', text: 'Both under an hour away.' }, { name: 'This week', text: 'The menu follows the harvest.' }],
    pricingTitle: 'Prices', plans: [['Small plates', '£9', 'each', ['From the oven', 'Bread included']], ['Mains', '£24', 'each', ['From the grill', 'Seasonal sides']], ['Long table', '£45', 'per person', ['The kitchen cooks for you', 'Five courses']]],
    faq: [['Do you cook for vegetarians?', 'Half the menu has no meat.'], ['Can I bring a group?', 'Up to six online, twelve by phone.'], ['Do you take walk-ins?', 'At the bar, most nights.']],
    journal: [['A morning at the farm', '2 May', 'Farms'], ['Why oak and apple', '18 Apr', 'Fire'], ['The new spring menu', '3 Apr', 'Menu']],
    cta: ['A table', 'by the fire?', 'Book a table'],
    quotes: [['The bread alone is worth the trip.', 'Leyla M.', 'Regular since 2022'], ['Every plate tastes of smoke, in the best way.', 'Omar K.', 'Neighbour'], ['Book the long table and let them cook.', 'City Plates', 'Review']],
    team: [['Ines', 'Chef', 'Lights the oven.'], ['Karl', 'Front of house', 'Knows every regular.'], ['Nigar', 'Baker', 'Up at five.'], ['Elvin', 'Grill', 'Reads the embers.']],
    stats: [['40', 'Seats'], ['2', 'Farms we buy from'], ['1', 'Wood fire'], ['4.9', 'Rating, 600 reviews']], statsNote: 'Counted last summer.',
    where: { title: 'Find us', address: '27 Larder Street\nBristol', hours: ['Wed–Sun, from 18:00', 'Sat–Sun lunch, 12:00–15:00'], notes: 'Ten minutes on foot from the station.' },
    rowsTitle: 'Why the oven is lit at seven', rows: [['Bread at dawn', 'The bricks are hottest in the morning, so the bread goes in first and the whole room smells of it.', 2, 'Read about the bread'], ['Straight onto the embers', 'Vegetables from the farms go onto the coals whole and come out soft and charred.', 1], ['Fish to finish', 'By evening the fire is gentle enough for whole fish with lemon.', 3, 'See this week’s menu']],
    news: ['This week’s menu, in your inbox', 'A short note each week: what the farms sent and the nights we have a table left.', 'Sign up', 'Once a week. No ads, ever.'],
    catsTitle: 'On the menu', cats: [['From the oven', '6 dishes', 1], ['Bread', 'Every day', 2], ['From the grill', '4 mains', 3], ['The farms', 'This week', 6]],
    press: [['Weekend Table', 'Forty seats and one very good fire.'], ['City Plates', 'Go for the bread, stay for the fish.'], ['Slow Supper', 'Cooking that follows the farms, week by week.']], awards: ['Best new kitchen, City Plates 2025', 'Slow Supper top ten, 2024'],
    band: ['Tables by the fire, this weekend.', 'Book a table', 'Up to six online.'],
    trust: [['Two farms', 'Both under an hour away.'], ['Baked daily', 'Bread out at dawn.'], ['Fair price', 'We pay the farms above market.'], ['Free tap water', 'Always, without asking.']],
    scheduleTitle: 'This week at Fennwood', days: [['Wednesday', [['18:00', 'New menu', 'What the farms sent on Monday.'], ['20:00', 'Long table', 'Five courses, eight places.']]], ['Friday', [['18:00', 'Fish night'], ['21:00', 'Late bar', 'Until midnight.']]], ['Sunday', [['12:00', 'Weekend lunch', 'Slow lamb and bread.'], ['15:00', 'Bread class', '£15, book ahead.']]]],
    toolsTitle: 'Book however suits you', toolsText: 'Online, by phone or at the bar.', tools: ['Book online', 'Phone ahead', 'Walk in', 'Gift cards', 'Private dining', 'Long table', 'Catering', 'Bread to take home', 'Pay by card'],
    timelineTitle: 'Fourteen years at the fire', timeline: [['2012', 'A wood oven in a barn', 'Bread on Saturdays, for the village.'], ['2016', 'The first dinner service', 'Six tables, one menu, what the farms sent.'], ['2020', 'Moved to the old forge', 'A longer table and a bigger fire.'], ['2025', 'A kitchen garden of our own', 'Half the vegetables now walk forty metres.']],
  },
  shop: {
    img: shop, people: ashePeople, label: 'Saint Ashe', statement: 'Black clothing cut in small runs in Tbilisi: heavy cotton, waxed wool and leather that ages with you.', body: 'Twenty-two pieces a season, forty of each. When a run sells out, it’s gone.',
    manifesto: 'Buy black once, wear it for years.', attribution: 'Stitched inside every label',
    work: 'This season', projects: [['The Narikala coat', 'Autumn · Outerwear'], ['The Sololaki rider', 'All year · Leather'], ['The slouch boot', 'Autumn · Shoes']],
    caseTitle: 'How a coat is cut', facts: [['Wool', 'Waxed, Italy'], ['Run', '40 pieces'], ['Cut', 'In Tbilisi']], story: ['We start from one cloth and cut around it.', 'Every seam is worn for a month before it ships.', 'Then we make forty and stop.'],
    offer: 'Shop by', services: [['Outerwear', 'Coats and leather, runs of 40'], ['Clothing', 'Heavy tees, knits, trousers'], ['Shoes', 'Boots resoled for life'], ['Bags', 'Leather that ages well']],
    process: [{ name: 'Order', text: 'Pick your size.', duration: '2 min' }, { name: 'We pack', text: 'In black paper, by hand.', duration: '1 day' }, { name: 'Delivered', text: 'Tracked, plastic-free.', duration: '3 days' }],
    howTitle: 'Find your size in three steps', how: [{ name: 'Measure one thing', text: 'Your chest, over a T-shirt.' }, { name: 'Match the chart', text: 'Between two? Go up.' }, { name: 'Free returns', text: 'For 30 days.' }],
    aboutStatement: 'Three of us, one cutting table and a wardrobe that was all black anyway.', bio: 'The workshop still makes everything in runs of forty, a short walk from the shop.',
    galleryTitle: 'Autumn 2026', editorial: { title: 'Cut close, worn loose', caption: 'The first coat, on Kote Afkhazi Street', paragraphs: ['We wanted one coat that would last ten winters.', 'So we cut it ourselves, and then twenty-one more pieces.'] },
    clientsTitle: 'As seen in', clients: ['Night Edition', 'Black Paper', 'Cut & Sewn', 'Old Town Notes', 'Slow Wardrobe', 'Tbilisi Weekly', 'The Fitting', 'Second Skin'],
    featuresTitle: 'Every piece', features: [{ name: 'Small runs', text: '40 pieces, then it’s gone.' }, { name: 'Repair for life', text: 'Send it back, we fix it.' }, { name: 'Plastic-free', text: 'Black paper and string.' }],
    pricingTitle: 'Shipping', plans: [['Georgia', '€0', 'over €200', ['2–3 days', 'Tracked']], ['Europe', '€25', 'order', ['4–6 days', 'Tracked']], ['Express', '€40', 'order', ['Next day', 'Tracked', 'Before noon']]],
    faq: [['How do sizes run?', 'Loose by design; between two, go down.'], ['Can I return it?', 'Free, within 30 days.'], ['Do you restock?', 'Rarely — each run is its own.']],
    journal: [['Wax that remembers where you sat', '2 May', 'Materials'], ['Twelve weeks on one machine', '18 Apr', 'Workshop'], ['Autumn run, first look', '3 Apr', 'New']],
    cta: ['Get the next run', 'first?', 'Join the letter'],
    quotes: [['The coat I reach for every single day.', 'Nino K.', 'Bought the Narikala coat'], ['They resoled my boots after three years, free.', 'Giorgi D.', 'Customer'], ['Small runs, done properly.', 'Cut & Sewn', 'Review']],
    team: [['Nino', 'Cutting', 'Starts from the cloth.'], ['Levan', 'Sewing', 'Wears every seam first.'], ['Tamar', 'Shop', 'Packs in black paper.'], ['Saba', 'Repairs', 'Fixes it for life.']],
    stats: [['40', 'Pieces per run'], ['14', 'Runs sold out'], ['30', 'Day free returns'], ['0', 'Plastic in the box']], statsNote: 'Since the first run, autumn 2021.',
    where: { title: 'Visit the shop', address: '14 Kote Afkhazi Street\nTbilisi', hours: ['Thu–Sat, 12:00–20:00'], notes: 'Try everything on; the workshop is upstairs.' },
    rowsTitle: 'Made to be kept', rows: [['Small runs', 'Forty pieces, then we stop. Nothing sits in a warehouse waiting for a sale.', 3, 'Shop the current run'], ['Repair for life', 'Send any piece back, any year. We fix zips, seams and soles for free.', 6, 'How repairs work'], ['Plastic-free', 'Black paper, string and a handwritten note. That’s the whole box.', 5]],
    news: ['Get the next run first', 'Runs sell out in days. The letter hears about each one a week before everyone else.', 'Join the letter', 'One letter a month.'],
    catsTitle: 'Shop by category', cats: [['Outerwear', '6 pieces', 3], ['Shoes', '3 pieces', 6], ['Bags', '4 pieces', 5], ['Trousers', '4 pieces', 4]],
    press: [['Night Edition', 'Small runs, cut properly, in Tbilisi.'], ['Black Paper', 'The heaviest tee we tested this year.'], ['Slow Wardrobe', 'Clothes that ask to be worn for a decade.']], awards: ['Outerwear design prize, 2025'],
    band: ['Free shipping in Georgia over €200, this week.', 'Shop the run', 'Ends Sunday at midnight.'],
    trust: [['Free shipping', 'In Georgia over €200.'], ['Free returns', 'Within 30 days.'], ['Repair for life', 'Send it back, we fix it.'], ['Plastic-free', 'Black paper only.']],
    scheduleTitle: 'The autumn run', days: [['Week one', [['Mon', 'The letter gets first look', 'A week before everyone.'], ['Thu', 'Run opens', '12:00, Tbilisi time.']]], ['Week two', [['Sat', 'Workshop open day', 'Try everything on.'], ['Sun', 'Last sizes', 'Whatever comes back from returns.']]]],
    toolsTitle: 'Pay and ship your way', toolsText: 'Checkout takes the cards and wallets you use; parcels go tracked.', tools: ['Cards', 'Wallet pay', 'Pay in three', 'Gift cards', 'Tracked courier', 'Pickup points', 'Collect in Tbilisi', 'Returns label', 'Repairs by post'],
    timelineTitle: 'Run by run', timeline: [['2019', 'Twelve coats, one colour', 'Cut in a Tbilisi flat, sold in a week.'], ['2021', 'The workshop on Leselidze', 'Our own cutting table and two machines.'], ['2023', 'Boots, then bags', 'Leather from a tannery we can visit.'], ['2026', 'The autumn run', 'Black, as always — in small numbers.']],
  },
  product: {
    img: kb, people: founders, label: 'Halvik', statement: 'A compact mechanical keyboard in a powder-coated aluminium case, made to stay on your desk.', body: '65% layout, hot-swap switches and a matching dial pad. Ships in five days.',
    manifesto: 'Fewer keys, better ones.', attribution: 'Printed inside every case',
    work: 'How it’s made', projects: [['Machined from one block', 'Step 1'], ['Powder-coated by hand', 'Step 2'], ['Built and tested', 'Step 3']],
    caseTitle: 'Eleven months on one case', facts: [['Case', 'Aluminium'], ['Layout', '65%, 67 keys'], ['Weight', '1.6 kg']], story: ['The first case rang like a bell.', 'A gasket mount and a cork base made it quiet.', 'We kept the shape and changed everything inside it.'],
    offer: 'Why it works', services: [['Hot-swap', 'Change switches without solder'], ['Gasket mount', 'A softer, quieter press'], ['Aluminium case', 'Heavy enough to stay put'], ['The Dial', 'Three knobs for volume, zoom and scroll']],
    process: [{ name: 'Machine', text: 'One block of aluminium.', duration: '3 h' }, { name: 'Coat', text: 'Powder, then the oven.', duration: '1 day' }, { name: 'Build', text: 'Switches, keys, a test.', duration: '40 min' }],
    howTitle: 'From box to desk in three steps', how: [{ name: 'Unbox', text: 'Keyboard, cable, keycap puller.' }, { name: 'Plug in', text: 'USB-C, no driver needed.' }, { name: 'Make it yours', text: 'Swap switches whenever you like.' }],
    aboutStatement: 'Ines and Karl wanted one keyboard that would last ten years.', bio: 'Two engineers, a borrowed lathe and forty prototypes later, there was Halvik.',
    galleryTitle: 'On real desks', editorial: { title: 'Forty prototypes and a borrowed lathe', caption: 'Prototype 31, the first quiet one', paragraphs: ['The first thirty rang, rattled or both.', 'Number 31 sounded like a pencil on paper, and we stopped there.'] },
    clientsTitle: 'Sold at', clients: ['Keyroom', 'Plinth Supply', 'Typewell', 'Northdesk', 'Low Profile Co.', 'Switchyard', 'Halftone Desk', 'Quietkey'],
    featuresTitle: 'In every box', features: [{ name: '67 keys', text: 'Arrows and a few extras.' }, { name: 'Hot-swap', text: 'Any 3- or 5-pin switch.' }, { name: 'USB-C', text: 'A detachable braided cable.' }],
    pricingTitle: 'Buy', plans: [['Barebones', '$159', 'case and plate', ['Bring your own switches', 'Free shipping']], ['Halvik 65', '$219', 'ready to type', ['Switches and keycaps', 'Free shipping']], ['With the Dial', '$279', 'keyboard + pad', ['Three-knob dial pad', 'Free shipping', 'Save $9']]],
    faq: [['Does it work with a Mac?', 'Yes — Mac, Windows and Linux, no driver.'], ['Can I change the switches?', 'Any 3- or 5-pin switch, no solder.'], ['How fast does it ship?', 'In five days, tracked.']],
    journal: [['Prototype 31', '2 May', 'Story'], ['Why gasket mounts are quieter', '18 Apr', 'Build'], ['New: the Dial', '3 Apr', 'News']],
    cta: ['Ten years', 'on one keyboard?', 'Add to bag'],
    quotes: [['It sounds like a pencil on paper.', 'Nina R.', 'Writer'], ['The only keyboard I haven’t replaced.', 'Tom B.', 'Developer'], ['Heavy, quiet and exactly the right size.', 'Keyroom', 'Stockist']],
    team: [['Ines', 'Co-founder', 'Designs the case.'], ['Karl', 'Co-founder', 'Tunes the sound.'], ['Aida', 'Support', 'Answers within a day.'], ['Sam', 'Workshop', 'Builds every board.']],
    stats: [['67', 'Keys'], ['1.6 kg', 'Weight'], ['5', 'Days to ship'], ['10 yr', 'Warranty']], statsNote: 'Halvik 65 with switches and keycaps.',
    where: { title: 'Workshop', address: 'Unit 4, Canal Yard\nLondon', hours: ['Sat, 10:00–16:00'], notes: 'Try every switch before you buy.' },
    rowsTitle: 'What’s in the case', rows: [['The typing angle', 'A six-degree tilt built into the case, so your wrists stay flat without feet.', 3, 'See the profile'], ['The Dial', 'A small pad with three knobs for volume, zoom and scroll. With the keyboard or on its own.', 4], ['Hot-swap switches', 'Pull a switch out, push another in. No solder, no tools beyond the puller in the box.', 5, 'Read the guide']],
    news: ['First look at new keycaps', 'Hear about new keycap sets and restocks before anyone else.', 'Subscribe', 'About once a month.'],
    catsTitle: 'Find your setup', cats: [['Halvik 65', 'Keyboard', 1], ['The Dial', 'Dial pad', 4], ['Keycaps', '4 sets', 2], ['Switches', '6 kinds', 5]],
    press: [['Typewell Weekly', 'The quietest 65% we tested this year.'], ['Desk Notes', 'Built like it will outlast the desk.'], ['Low Profile', 'A keyboard that asks for nothing.']], awards: ['Product design prize, 2025', 'Best new keyboard, 2024'],
    band: ['Free shipping on every order this week.', 'Add to bag', 'Ends Sunday at midnight.'],
    trust: [['Free shipping', 'Tracked, five days.'], ['30-day returns', 'Use it, then decide.'], ['10-year warranty', 'On the case and plate.'], ['Spare parts', 'Every part sold on its own.']],
    scheduleTitle: 'Summer workshop days', days: [['June', [['Sat 7', 'London', 'Workshop, 10:00–16:00.'], ['Sat 21', 'Bristol', 'Harbour market.']]], ['July', [['Sat 5', 'Manchester', 'Northern Quarter.'], ['Sat 19', 'Leeds', 'Kirkgate market.']]]],
    toolsTitle: 'Works with your setup', toolsText: 'Plug in and type; remap any key in the browser, no app to install.', tools: ['macOS', 'Windows', 'Linux', 'iPadOS', 'ChromeOS', 'Browser remapping', 'Open firmware', 'USB-C', 'Bluetooth adapter'],
    timelineTitle: 'From a sketch to your desk', timeline: [['2021', 'The first case, milled by hand', 'Six weeks for one keyboard.'], ['2022', 'Hot-swap sockets', 'Change a switch without a soldering iron.'], ['2024', 'The Dial', 'A knob for volume, zoom and timelines.'], ['2026', 'Halvik 65, second run', 'Fern green, powder-coated, built to stay.']],
  },
  software: {
    img: app, label: 'Ledger', statement: 'Close your books in one click — invoices, receipts and VAT, done while you work.', body: 'For studios and small teams. Connects to your bank in two minutes.',
    manifesto: 'Accounting should take minutes, not Sundays.', attribution: 'Our first pitch, 2022',
    work: 'What teams build with it', projects: [['Month-end in 10 minutes', 'Studio Nord'], ['VAT without a spreadsheet', 'Lumen Bakery'], ['One inbox for receipts', 'Foundry']],
    caseTitle: 'Studio Nord’s month-end', facts: [['Team', '12 people'], ['Before', '2 days a month'], ['After', '10 minutes']], story: ['Receipts lived in five inboxes and one shoebox.', 'Ledger matched them to the bank feed as they arrived.', 'Month-end is now a single review before lunch.'],
    offer: 'What it does', services: [['Invoices', 'Send, chase and match payments'], ['Receipts', 'Snap or forward, matched for you'], ['VAT', 'Filed from the numbers you already have'], ['Reports', 'Profit and cash, live']],
    process: [{ name: 'Connect your bank', text: 'Read-only, two minutes.', duration: '2 min' }, { name: 'Forward receipts', text: 'From any inbox.', duration: 'Ongoing' }, { name: 'Close the month', text: 'One review, one click.', duration: '10 min' }],
    howTitle: 'Set up in three steps', how: [{ name: 'Connect', text: 'Your bank, read-only.' }, { name: 'Import', text: 'Last year’s invoices, in one drop.' }, { name: 'Relax', text: 'It matches as money moves.' }],
    aboutStatement: 'Two accountants got tired of doing the same thing every month.', bio: 'So they wrote it down, then wrote the software. Today 3,000 teams close their books with Ledger.',
    galleryTitle: 'Inside Ledger', editorial: { title: 'Why we built it for studios', caption: 'The first customer’s shoebox of receipts', paragraphs: ['Our first customers were designers who hated spreadsheets.', 'Everything in Ledger is still built for them first.'] },
    clientsTitle: 'Used by', clients: ['Studio Nord', 'Lumen Bakery', 'Foundry', 'Atelier Six', 'Northfield', 'Kiln & Co', 'Brightside', 'Parcel'],
    featuresTitle: 'Everything month-end needs', features: [{ name: 'Bank feed', text: 'Every transaction, matched.' }, { name: 'Receipt inbox', text: 'Forward, snap, done.' }, { name: 'VAT returns', text: 'Filed from your numbers.' }],
    pricingTitle: 'Pricing', plans: [['Solo', '€9', 'month', ['1 user', 'Invoices and receipts']], ['Team', '€29', 'month', ['5 users', 'VAT returns', 'Bank feed']], ['Studio', '€79', 'month', ['Unlimited users', 'Reports', 'Priority help']]],
    faq: [['Is my data safe?', 'Read-only bank access, encrypted at rest.'], ['Can I switch from spreadsheets?', 'Yes — drop last year’s files in.'], ['Is there a free trial?', '30 days, no card.']],
    journal: [['Month-end in 10 minutes', '2 May', 'Guides'], ['What changed in VAT this year', '18 Apr', 'Updates'], ['New: receipt inbox', '3 Apr', 'Product']],
    cta: ['Close this month', 'in ten minutes?', 'Start free trial'],
    quotes: [['We got two days a month back.', 'Anna K.', 'Studio Nord'], ['The first finance tool our designers actually open.', 'Rui S.', 'Foundry'], ['Our accountant asked what changed.', 'Mia L.', 'Lumen Bakery']],
    team: [['Anna', 'Co-founder', 'Former accountant.'], ['Ravi', 'Co-founder', 'Writes the matching.'], ['Sofia', 'Design', 'Hates spreadsheets.'], ['Leo', 'Support', 'Answers in an hour.']],
    stats: [['3,000', 'Teams'], ['10 min', 'Average month-end'], ['98%', 'Receipts matched'], ['4.8', 'Rating, 900 reviews']], statsNote: 'From our own usage data, last quarter.',
    where: { title: 'Our office', address: 'Kanalstraße 8\nBerlin', hours: ['Mon–Fri, 09:00–18:00'], notes: 'Support answers within an hour.' },
    rowsTitle: 'Month-end, without the Sunday', rows: [['Your bank, matched', 'Connect read-only in two minutes. Every transaction lines up with its invoice or receipt as it lands.', 1, 'How bank feeds work'], ['Receipts, forwarded', 'Snap a photo or forward an email. Ledger reads it, files it and matches it — no shoebox.', 3, 'See the receipt inbox'], ['VAT from what you have', 'Your return is built from numbers already in Ledger. Review it, then file in one click.', 5]],
    news: ['One useful email a month', 'Tax dates, small-business guides and what changed in Ledger. Nothing else.', 'Subscribe', 'Monthly. Unsubscribe any time.'],
    catsTitle: 'Guides by topic', cats: [['Invoices', '14 guides', 0], ['Receipts', '9 guides', 2], ['VAT', '12 guides', 4], ['Payroll', '6 guides', 6]],
    press: [['Small Business Weekly', 'The first accounting tool designers will open willingly.'], ['The Founder Letter', 'Month-end in ten minutes is not a slogan — we timed it.'], ['Studio Finance', 'Bank matching that simply works.']], awards: ['Best finance app for small teams, 2025'],
    band: ['30 days free, no card needed.', 'Start free trial', 'Set up in two minutes.'],
    trust: [['30-day trial', 'No card needed.'], ['Read-only bank', 'We can’t move money.'], ['Encrypted', 'At rest and in transit.'], ['Human support', 'Answers within an hour.']],
    scheduleTitle: 'Launch week', days: [['Monday', [['10:00', 'Receipt inbox goes live', 'Rolling out to every team.'], ['16:00', 'Live demo', 'Thirty minutes, with questions.']]], ['Wednesday', [['11:00', 'VAT clinic', 'Bring your questions.'], ['15:00', 'Accountant session']]], ['Friday', [['15:00', 'Office hours', 'The founders, on a call.']]]],
    toolsTitle: 'Works with what you already use', toolsText: 'Connect your bank, payroll and payments in a few clicks.', tools: ['Bank feeds', 'Card payments', 'Payroll', 'Expense cards', 'Online shop', 'Time tracking', 'Spreadsheets', 'Your accountant', 'Email inbox'],
    timelineTitle: 'How it grew', timeline: [['2020', 'Built for our own studio', 'Invoices in a spreadsheet had to go.'], ['2022', 'The first hundred studios', 'Bank feeds and receipts by email.'], ['2024', 'One-click quarter close', 'Books ready for the accountant in minutes.'], ['2026', 'Payroll, built in', 'One place for every number a studio has.']],
  },
  event: {
    img: ph, people: players, label: 'Lowfield Nights', statement: 'Three nights of silent films with live scores, in a hangar the airfield forgot. Entry free with an RSVP.', body: '12–14 June 2027, the north coast. Doors at 19:00, the film at 20:30.',
    manifesto: 'One film a night, scored in the room.', attribution: 'The first programme, 2024',
    work: 'The programme', projects: [['Opening night', 'Saturday · 20:30'], ['Under the sky', 'Sunday · 22:30'], ['Last light', 'Monday · 22:30']],
    caseTitle: 'The first night, 2026', facts: [['Seats', '220'], ['Film', 'Silent, 1927'], ['Score', 'Written for the room']], story: ['The hangar doors stayed open to the sea.', 'The score was played once and never recorded.', 'Everyone walked to the shore together after.'],
    offer: 'The nights', services: [['Films', 'One silent film a night'], ['Scores', 'Written for the hangar, played live'], ['Shuttle', 'From the city, twice a night'], ['Long table', 'Bread and tea before the film']],
    process: [{ name: 'RSVP', text: 'Tell us which night.', duration: '2 min' }, { name: 'Take the shuttle', text: 'Or drive and park at the gate.', duration: '40 min' }, { name: 'Arrive', text: 'Doors at 19:00.', duration: 'On the night' }],
    howTitle: 'Your night in three steps', how: [{ name: 'RSVP', text: 'Up to four seats.' }, { name: 'Book the shuttle', text: 'Or park at the gate.' }, { name: 'Bring a layer', text: 'The sea wind comes in late.' }],
    aboutStatement: 'Three friends, one projector and a hangar nobody wanted.', bio: 'Every June since, the doors open for three nights and a score nobody has heard before.',
    galleryTitle: 'Last June', editorial: { title: 'The score that was played once', caption: 'The second night, doors open to the sea', paragraphs: ['Each score is written for the hangar and its echo.', 'It is played once, on the night, and never recorded.'] },
    clientsTitle: 'With thanks to', clients: ['Coast Film Club', 'Harbour Orchestra', 'Night Ferry', 'Old Airfield Trust', 'Shore Radio', 'Salt Print', 'Low Tide Press', 'Long Table Bakery'],
    featuresTitle: 'Everything the night needs', features: [{ name: 'Seats by RSVP', text: 'No tickets, no queues.' }, { name: 'Shuttle from the city', text: 'Twice a night, both ways.' }, { name: 'A score for the room', text: 'Played once, live.' }],
    pricingTitle: 'Seats', plans: [['Bench', 'Free', 'night', ['RSVP needed', 'Bench seat']], ['Blanket', 'Free', 'night', ['Outdoor screening', 'Bring your own']], ['Long table', '€25', 'night', ['Supper before the film', 'Shuttle seat']]],
    faq: [['Will it be cold?', 'The sea wind comes in late; bring a layer.'], ['Are the films subtitled?', 'They are silent; intertitles are read aloud.'], ['Can I bring children?', 'Yes, over eight.']],
    journal: [['Why silent films', '2 May', 'Programme'], ['Meet the players', '18 Apr', 'People'], ['A short history of the hangar', '3 Apr', 'History']],
    cta: ['Hold a seat', 'in the hangar?', 'RSVP now'],
    quotes: [['The most beautiful night of my summer.', 'Aysel M.', 'Guest, 2026'], ['A score you will never hear again.', 'Farid H.', 'Guest'], ['Stay for the walk to the shore.', 'Shore Radio', 'Review']],
    team: [['Kamran', 'Tar and tape loops', 'Scores from memory.'], ['Tural', 'Double bass', 'Plays it like a timetable.'], ['Ines', 'Piano and electronics', 'Writes for the echo.'], ['Nora', 'Voice and strings', 'Speaks for the film.']],
    stats: [['3', 'Nights'], ['4', 'Films'], ['220', 'Seats a night'], ['1', 'Hangar']], statsNote: 'For the 2027 nights.',
    where: { title: 'Getting there', address: 'Hangar 2, Lowfield airstrip\nNorth coast', hours: ['Doors 19:00', 'Film 20:30'], notes: 'Free shuttle from the city twice a night; park at the gate.' },
    rowsTitle: 'Three nights in the hangar', rows: [['A film a night', 'One silent film each night, on a screen at the back of the hangar, doors open to the sea.', 0, 'See the programme'], ['Scored in the room', 'Each score is written for the hangar and played once, live.', 2], ['The walk to the shore', 'After the last night everyone walks to the water together.', 3, 'How to get there']],
    news: ['Hear when RSVPs open', 'RSVPs open once a year. The list hears first, a week before anyone else.', 'Join the list', 'Three emails a year, all about the nights.'],
    catsTitle: 'The nights', cats: [['Films', '4 films', 1], ['Scores', '4 players', 2], ['The hangar', '220 seats', 0], ['The shore', 'Last light', 3]],
    press: [['Coast Film Club', 'The quietest, loudest night of the year.'], ['Shore Radio', 'A score written for a hangar and its echo.'], ['Salt Print', 'Worth the drive for the last night alone.']], awards: ['Event of the year, Salt Print 2026'],
    band: ['RSVPs close on 1 June.', 'RSVP now', 'Entry is free.'],
    trust: [['Seats by RSVP', 'No tickets, no queues.'], ['Free shuttle', 'Twice a night.'], ['Free parking', 'At the gate.'], ['Rain plan', 'Everything moves inside.']],
    scheduleTitle: 'The programme', days: [['Saturday 12 June', [['19:00', 'Doors and the long table'], ['20:30', 'Opening film', 'With a live score.'], ['22:40', 'Night set on the apron']]], ['Sunday 13 June', [['19:00', 'Doors'], ['22:30', 'Under the sky', 'The outdoor screen.']]], ['Monday 14 June', [['20:30', 'The last film'], ['22:30', 'Last light', 'The walk to the shore.']]]],
    toolsTitle: 'Plan the trip', toolsText: 'Your RSVP links straight to the shuttle, nearby stays and a calendar invite.', tools: ['Calendar invite', 'Shuttle seats', 'Nearby guesthouses', 'Taxi rank', 'Car hire', 'Bike racks', 'Accessible seating', 'Blankets on loan', 'Late shuttle'],
    timelineTitle: 'Seven summers in the hangar', timeline: [['2019', 'One night, one film', 'Ninety people on borrowed chairs.'], ['2021', 'Three nights, live scores', 'A band under the screen.'], ['2024', 'The long table', 'Dinner before the first film.'], ['2027', '12–14 June', 'Four films, three nights, still free.']],
  },
}
const a = { href: '#', label: 'Book a visit' }

/** The page's own tone and media placement for this part (from the recipe's rhythm), passed to the ready section. */
const dress = (node: ReactNode, tone?: SectionTone, media?: MediaPlacement, variant?: string) => (isValidElement(node) && (tone || media || variant) ? cloneElement(node as ReactElement<{ tone?: SectionTone; media?: MediaPlacement; variant?: string }>, { ...(tone ? { tone } : {}), ...(media ? { media } : {}), ...(variant ? { variant } : {}) }) : node)

function sample(id: SectionId | 'orbit-hero', world: World, brand?: string, footer?: FooterStyleId): ReactNode {
  const w = W[world], img = w.img, pick = (i: number) => img[i % img.length]
  switch (id) {
    case 'orbit-hero': return <OrbitHeroSection eyebrow="What we do" loud="All" quiet="in motion" line="Brands, people, attention — we set them moving." items={[...STICKERS, ...sticky, ...STICKERS.slice(0, 3)].map((src, i) => ({ src, alt: '', size: src.endsWith('.svg') ? 130 : 110, tilt: [-8, 6, -4, 10, -6, 4][i % 6] }))} />
    case 'chapters': return <ColourChaptersSection chapters={w.services.slice(0, 2).map(([title, text], i) => ({ eyebrow: i ? 'No talk. All pictures.' : 'Hard story? Easily told.', title, text, media: { src: pick(i + 3), alt: '' }, sticker: { src: STICKERS[i * 3], alt: '' } }))} />
    case 'footer': return <FooterSection variant={footer} brand={brand || 'Studio'} contact={[{ label: 'hello@example.com', href: '#' }, { label: '+994 12 345 67 89', href: '#' }]} logo={<span className={`type-display italic ${footer === "line" || footer === "contact" ? "[font-size:1.6rem]" : "[font-size:5rem]"}`}>{brand || "Studio"}</span>} columns={footer === 'index' ? FOOTER_INDEX : [{ title: 'Navigation', links: [{ label: 'About', href: '#' }, { label: 'Work', href: '#', current: true }, { label: 'Contact', href: '#' }] }, { title: 'Contact', links: [{ label: 'hello@example.com', href: '#' }] }]} legal={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]} copyright={`© 2026 ${brand || 'Studio'}`} />
    case 'intro': return <StatementSection variant="lead" label={brand || w.label} statement={w.statement} body={w.body} />
    case 'manifesto': return <StatementSection variant="giant" statement={w.manifesto} attribution={w.attribution} />
    case 'featured-work': return <FeaturedWorkSection title={w.work} projects={w.projects.map(([title, meta], i) => ({ title, meta, image: pick(i + 1), alt: '', href: `#${i}` }))} />
    case 'case-study': return <CaseStudySection title={w.caseTitle} image={pick(3)} alt="" facts={w.facts.map(([label, value]) => ({ label, value }))} paragraphs={w.story} />
    case 'services': return <ServicesSection title={w.offer} items={w.services.map(([name, line]) => ({ name, line }))} />
    case 'process': return <StepsSection variant="columns" title="How it works" steps={w.process} />
    case 'how-it-works': return <StepsSection variant="cards" title={w.howTitle} steps={w.how.map((s, i) => ({ ...s, image: pick(i + 4), alt: '' }))} />
    case 'about': return <AboutSection title="About" image={w.people?.[0] ?? pick(4)} alt="" statement={w.aboutStatement} bio={w.bio} />
    case 'gallery': return <GallerySection title={w.galleryTitle} photos={img.slice(0, 7).map((src) => ({ src, alt: '' }))} />
    case 'editorial-story': return <EditorialStorySection title={w.editorial.title} image={pick(5)} alt="" caption={w.editorial.caption} paragraphs={w.editorial.paragraphs} />
    case 'clients': return <NameWallSection variant="grid" title={w.clientsTitle} names={w.clients} />
    case 'testimonials': return <TestimonialsSection title="What people say" quotes={w.quotes.map(([quote, name, role]) => ({ quote, name, role }))} />
    case 'team': return <TeamSection title="The team" people={w.team.map(([name, role, line], i) => ({ name, role, line, image: w.people ? w.people[i % w.people.length] : pick(i + 2), alt: '' }))} />
    case 'stats': return <StatsSection title="In numbers" stats={w.stats.map(([value, label]) => ({ value, label }))} note={w.statsNote} />
    // Sections that belong to one kind of site keep that site's content whatever the plan is.
    case 'menu': return <MenuSection title="This week" groups={[{ name: 'From the oven', items: [{ name: 'Oven bread', description: 'cultured butter, flaky salt', price: '5' }, { name: 'Embered vegetables', description: 'whipped feta, burnt honey', price: '12' }] }, { name: 'From the grill', items: [{ name: 'Whole fish', description: 'lemon, charred courgette', price: '28' }, { name: 'Lamb shoulder', description: 'white beans, salsa verde', price: '26' }] }]} note="The menu changes with the week." />
    // The project builds these controls from shadcn/ui; the preview shows their resting look.
    case 'reservation': return <ReservationSection title="Book a table" text={world === 'food' ? 'Tables for up to six online; seven to twelve, please call.' : 'Seats by RSVP, one sitting a night.'} hours={w.where.hours} phone="+994 12 000 00 00" form={
      <div aria-hidden className="grid gap-4 sm:grid-cols-3">
        {[['Date', 'Pick a day'], ['Time', '19:00'], ['Guests', '2']].map(([l, v]) => <div key={l} className="type-utility">{l}<div className="type-body mt-1 rounded-(--radius-button) border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-(--color-muted)">{v}</div></div>)}
        <div className="type-body rounded-(--radius-button) bg-(--color-primary) px-5 py-3 text-center text-(--color-background) sm:col-span-3">Find a table</div>
      </div>} />
    case 'location': return <LocationSection title={w.where.title} address={w.where.address} hours={w.where.hours} notes={w.where.notes} mapUrl="#" image={pick(0)} alt="" />
    case 'collection': return <CollectionSection season="Autumn 2026" title="Ember" text="Twenty-two pieces in black, cut in runs of forty." image={shop[0]} alt="" pieces={[3, 1, 6].map((n, i) => ({ name: ['Narikala coat', 'Sololaki rider', 'Slouch boot'][i], price: ['€640', '€890', '€520'][i], image: shop[n], alt: '', href: `#${i}` }))} />
    case 'lookbook': return <LookbookSection looks={[{ number: '01', image: shop[8], alt: '', detail: shop[3], pieces: 'Narikala coat, Vake trouser' }]} />
    case 'product-grid': return <ProductGridSection title="Shop" products={[3, 1, 2, 4, 6, 5, 9, 10].map((n, i) => ({ name: ['Narikala coat', 'Sololaki rider', 'Heavy tee', 'Vake trouser', 'Slouch boot', 'Round bag', 'Rib turtleneck', 'Waxed cap'][i], price: `€${[640, 890, 85, 280, 520, 340, 190, 65][i]}`, image: shop[n], alt: '', href: `#${i}`, soldOut: i === 7 }))} />
    case 'product-highlight': return world === 'product'
      ? <ProductHighlightSection name="Halvik 65" text="A compact mechanical keyboard in a powder-coated aluminium case." image={kb[1]} alt="" details={[{ label: 'Layout', value: '65%' }, { label: 'Case', value: 'Aluminium' }, { label: 'Switches', value: 'Hot-swap' }]} action={{ label: 'Add to bag', href: '#' }} />
      : <ProductHighlightSection name="Narikala coat" text="Waxed wool, cut in Tbilisi, one run of forty." image={shop[3]} alt="" details={[{ label: 'Wool', value: 'Waxed' }, { label: 'Run', value: '40' }, { label: 'Made in', value: 'Tbilisi' }]} action={{ label: 'Add to bag', href: '#' }} />
    case 'feature-grid': return <FeatureGridSection title={w.featuresTitle} features={w.features} />
    case 'pricing': return <PricingSection title={w.pricingTitle} plans={w.plans.map(([name, price, period, features], i) => ({ name, price, period, features, action: a, recommended: i === 1 }))} />
    case 'faq': return <FaqSection title="Questions">{w.faq.map(([q, ans], i) => (
      <div key={q} className="border-b border-(--color-border)">
        <p className="type-heading flex items-center justify-between gap-6 py-5 [font-size:clamp(1.05rem,1.5vw,1.25rem)]">{q}<span aria-hidden className="text-(--color-muted)">{i ? '+' : '−'}</span></p>
        {i === 0 && <p className="type-body max-w-[62ch] pb-6 text-(--color-muted)">{ans}</p>}
      </div>))}</FaqSection>
    case 'journal': return <JournalSection title="Journal" entries={w.journal.map(([title, date, category], i) => ({ title, date, category, href: `#${i}`, image: pick(i + 2), alt: '' }))} />
    case 'contact-cta': return <ContactCtaSection headline={w.cta[0]} quiet={w.cta[1]} action={{ label: w.cta[2], href: '#' }} email="hello@example.com" inverse />
    case 'feature-rows': return <FeatureRowsSection title={w.rowsTitle} rows={w.rows.map(([name, text, n, label], i) => ({ name, text, image: pick(n), alt: '', link: label ? { label, href: `#${i}` } : undefined }))} />
    case 'newsletter': return <NewsletterSection title={w.news[0]} text={w.news[1]} placeholder="you@example.com" button={w.news[2]} note={w.news[3]} />
    case 'categories': return <CategoriesSection title={w.catsTitle} items={w.cats.map(([name, count, n], i) => ({ name, count, image: pick(n), alt: '', href: `#${i}` }))} />
    case 'press': return <PressSection title="Press" quotes={w.press.map(([outlet, quote]) => ({ outlet, quote }))} awards={w.awards} />
    case 'cta-band': return <CtaBandSection text={w.band[0]} action={{ label: w.band[1], href: '#' }} note={w.band[2]} />
    case 'trust': return <TrustSection items={w.trust.map(([title, text]) => ({ title, text }))} />
    case 'schedule': return <ScheduleSection title={w.scheduleTitle} days={w.days.map(([label, items]) => ({ label, items: items.map(([time, title, detail]) => ({ time, title, detail })) }))} />
    case 'integrations': return <NameWallSection variant="split" title={w.toolsTitle} text={w.toolsText} names={w.tools} />
    // A cause's own content (Kür Delta Watch) whatever the plan is; the project builds the form from shadcn/ui.
    case 'donate': return <DonateSection title="Give once, or every month" text="Every gift buys something we can show you on the bank." gifts={[{ amount: '10 AZN', what: 'One sack of rubbish out of the reeds' }, { amount: '45 AZN', what: 'A month of water tests, published', detail: 'Six points, one lab' }, { amount: '120 AZN', what: 'A boat day on the channels' }]}
      spend={[{ label: 'Cleanups and boats', share: 64 }, { label: 'The lab', share: 19 }, { label: 'Schools', share: 11 }, { label: 'Running costs', share: 6 }]} form={
      <div aria-hidden className="grid gap-4">
        <div className="type-body grid grid-cols-2 rounded-(--radius-button) border border-(--color-border)">{['Once', 'Monthly'].map((l, i) => <span key={l} className={`px-4 py-2 text-center ${i ? '' : 'bg-(--color-text) text-(--color-background)'}`}>{l}</span>)}</div>
        <div className="type-body grid grid-cols-3 gap-2">{['10', '45', '120'].map((v, i) => <span key={v} className={`rounded-(--radius-button) border px-3 py-2 text-center ${i === 1 ? 'border-(--color-text)' : 'border-(--color-border)'}`}>{v} AZN</span>)}</div>
        <div className="type-body rounded-(--radius-button) border border-(--color-border) bg-(--color-background) px-3 py-2 text-(--color-muted)">you@example.com</div>
        <div className="type-body rounded-(--radius-button) bg-(--color-primary) px-5 py-3 text-center text-(--color-background)">Give 45 AZN</div>
      </div>} />
    // A sound artist's own tracks (Sela Mor) whatever the plan is — they play for real.
    case 'listen': return <ListenSection title="Six tracks" text="Each is a short excerpt. Only one plays at a time." tracks={[['Northwind', 'wind-archive', 'A bare shore, January 2023'], ['Lathe Hymn No. 3', 'machine-hymns', 'A closed tool plant'], ['Rain over the Dome', 'rain-caspian', 'City rooftops, autumn 2023']].map(([title, file, recorded]) => ({ title, src: `/examples/sela-mor/media/tracks/${file}.mp3`, length: '1:15', details: [{ label: 'Recorded', value: recorded }] }))} />
    // A course's own syllabus (Night Shift) whatever the plan is.
    case 'product-buy': { const p = BUY[world], ims = world === 'shop' ? [shop[3], shop[1], shop[2]] : [pick(0), pick(1), pick(2)]
      return <ProductBuySection name={p.name} price={p.price} line={p.line} images={ims.map((src) => ({ src, alt: '' }))} option={{ label: p.option[0], values: p.option[1] }} details={[{ title: 'Delivery', text: 'Ships in two working days; free over €100.' }, { title: 'Returns', text: '30 days, in the box it came in.' }, { title: 'Care', text: 'Keep it dry, out of the sun.' }]} action={{ label: 'Add to bag', href: '#' }} note="Free delivery over €100." /> }
    case 'specs': return <SpecsSection title={SPECS[world][0]} text="Everything you would ask before deciding." specs={SPECS[world][1].map(([label, value]) => ({ label, value }))} />
    case 'article': return <ArticleSection kicker={w.journal[0][2]} title={w.editorial.title} dek={w.statement} author={{ name: w.team[0][0], role: w.team[0][1], image: (w.people ?? img)[0], bio: w.team[0][2] }} date={w.journal[0][1]} image={{ src: pick(5), alt: '', caption: w.editorial.caption }} body={[w.editorial.paragraphs[0], { quote: w.quotes[0][0], by: w.quotes[0][1] }, w.editorial.paragraphs[1] ?? w.body, { image: pick(2), alt: '', caption: w.galleryTitle }, w.body]} tags={[w.journal[0][2], w.journal[1][2]]} />
    case 'curriculum': return <CurriculumSection title="Eight weeks, one shot at a time" text="Live on Tuesday and Thursday evenings; every grade reviewed." modules={[['Week 1', 'Set up to see', 'Calibrating the monitor you own', 'A photo of your setup'], ['Week 2', 'Read the signal', 'Waveform, parade and the skin line', 'Scope notes on three frames'], ['Week 3', 'Lift, gamma, gain', 'Neutralising mixed street light', 'A matched pair of shots']].map(([label, title, lesson, handIn]) => ({ label, title, lessons: [lesson, 'Live review on Thursday'], outcome: { label: 'Hand in', value: handIn } }))} />
    case 'timeline': return <TimelineSection title={w.timelineTitle} steps={w.timeline.map(([when, title, detail]) => ({ when, title, detail }))} />
    default: return null
  }
}

export function SectionPreview({ id, colors, type, shape, chapters, className, auto, maxHeight, width, world = 'studio', brand, footer, layout, tone, media, variant }: { id: SectionId | 'orbit-hero'; footer?: FooterStyleId; layout?: LayoutId; tone?: SectionTone; media?: MediaPlacement; variant?: string; colors: PaletteColors; type: TypographyPairing; shape: ShapeStyle; chapters?: readonly string[]; className?: string; auto?: boolean; maxHeight?: number; width?: number; world?: World; brand?: string }) {
  return (
    <ScaledFrame className={className} auto={auto} maxHeight={maxHeight} width={width}>
      <TokenScope colors={colors} type={type} shape={shape} chapters={chapters} layout={layout}>{dress(sample(id, world, brand, footer), tone, media, variant)}</TokenScope>
    </ScaledFrame>
  )
}
